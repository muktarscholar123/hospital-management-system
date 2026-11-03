/**
 * HTTP Server Entrypoint
 * Loads environment variables and starts listening on the configured PORT.
 */
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`  HMS Backend Server running on port ${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/api/v1/health`);
  console.log(`  Environment:  ${process.env.NODE_ENV || 'development'}`);
  console.log(`===============================================`);
});

