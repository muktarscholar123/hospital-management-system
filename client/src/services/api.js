/**
 * API Service Client
 * Standardized fetch wrapper for communicating with the Express backend (/api/v1).
 */

const API_BASE_URL = '/api/v1';

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
    credentials: 'include', // Includes HTTP-only session cookies
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error?.message || `HTTP Error ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error(`API Error on [${options.method || 'GET'} ${url}]:`, error);
    throw error;
  }
}
