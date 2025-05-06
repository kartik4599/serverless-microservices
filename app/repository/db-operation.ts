import { dbClient } from "app/utility/db-client";

export class DBOperation {
  async executeQuery(queryString: string, values: unknown[]) {
    const client = dbClient();
    await client.connect();
    const result = await client.query(queryString, values);
    await client.end();

    return result;
  }
}
