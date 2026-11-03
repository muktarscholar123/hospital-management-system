# Instructions for AI coding assistants working on this HMS

You are assisting with the development of a staff-only Hospital Management System for one private hospital location.

## Read these documents first
1. `README.md`
2. `documentation/SRS.md`
3. `documentation/SYSTEM_DESIGN.md`
4. `documentation/WORKFLOWS.md`
5. `documentation/DATABASE_DESIGN.md`
6. `documentation/DEVELOPMENT_ROADMAP.md`

## Project stack
- Frontend: React.js with Vite.
- Backend: Node.js with Express.js.
- Database: MySQL.
- ORM: Prisma.
- JavaScript is acceptable initially; do not introduce TypeScript unless the developer explicitly chooses it.

## Important project rules
1. Do not replace React/Node.js/Express/MySQL with Laravel or another stack.
2. Do not generate the entire system in one response or one code change.
3. Work incrementally, one feature at a time.
4. Explain commands and code in beginner-friendly language.
5. Before implementing a feature, identify the relevant SRS requirement and workflow.
6. Do not invent hospital clinical protocols, medical thresholds, treatment recommendations or diagnostic logic.
7. Clinical forms and workflows must be confirmed by authorised hospital personnel.
8. Enforce authentication and authorisation in the backend. Frontend hiding is not security.
9. Use fictional test data only. Never request or use real patient records, credentials or secrets.
10. Do not hard-code secrets. Use environment variables and keep `.env` out of Git.
11. Use Prisma migrations for database changes.
12. Use transactions for operations that must be atomic, especially payments and inventory movements.
13. Preserve audit history. Do not silently delete or overwrite finalised clinical or financial records.
14. Keep maternity pregnancy episodes separate. Never overwrite previous pregnancies. A delivery must support multiple newborns.
15. Reception and cashier must not receive unrestricted access to clinical or maternity details.
16. Add validation and tests for every important feature.
17. If a requirement is unclear, ask a focused question rather than guessing.
18. Update the documentation when an approved requirement or design changes.

## Coding standards
- Keep routes, controllers, services, validation and database access separated.
- Use clear names and small functions.
- Return consistent API responses.
- Handle loading, empty, error and success states in React.
- Add pagination to potentially large lists.
- Avoid unnecessary dependencies.
- Do not claim a feature is secure or production-ready without appropriate testing and review.

## First task
Do not start implementing department features yet. First inspect the repository and help the developer verify the local environment. Then create the minimal React and Express project skeleton and confirm both run locally. Explain each step before asking the developer to execute commands.
