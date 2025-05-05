import { Client } from "pg";

export const dbClient = () => {
  return new Client({
    host: "localhost",
    user: "postgres",
    password: "root",
    database: "serverless",
    port: 5432,
  });
};
