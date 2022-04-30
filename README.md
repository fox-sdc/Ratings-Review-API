# Ratings-Review-API

### Overview of Complete API
![alt text](https://github.com/10-dapper-dogwood/ProductsAPI/blob/main/Screen%20Shot%202021-04-10%20at%2011.24.13%20AM.png?raw=true)

### Project Overview
I inherited a legacy codebase for a fashion e-commerce application. My task was to redesign and replace the backend for the product Ratings & Reviews module. My goal was to improve database performance for data sets of 20M+ records and optimize the deployment infrastructure to handle production level traffic of 1,000+ requests per second.

Once I have designed and built the backend and configured the PostgreSQL database, I deployed the application on AWS EC2 instances and horizontally scaled my services to be able to handle 1,000+ requests per second with a 0% error rate.

## Technologies Used
1. Express.js
2. NodeJS
3. PostGres
4. MySQL
6. NGINX
7. Loader.io
8. K6
9. Jest/Supertest
10. Amazon EC2