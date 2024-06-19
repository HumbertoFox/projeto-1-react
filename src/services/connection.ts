const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({
    connectionString: "postgres://default:mpKCr3Vsqvi9@ep-white-sea-a4bono27-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require?sslmode=require",
});