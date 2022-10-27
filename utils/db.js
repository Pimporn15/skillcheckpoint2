// This code is in the file server/utils/db.js
import dotenv from "dotenv";
import * as pg from "pg";

dotenv.config();
const { Pool } = pg.default;

const pool = new Pool({
  connectionString: `postgresql://postgres:${process.env.PG_PASSWORD}@localhost:5432/skillcheckpoint`,
});

// export { pool };
// import dotenv from "dotenv";
// import * as pg from "pg";
// const { Pool } = pg.default;
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "skillcheckpoint",
//   password: "
//   port: 5432,
// });
export { pool };
