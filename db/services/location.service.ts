import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLJsDatabase } from "drizzle-orm/sql-js";
import { locationsTable } from "../schema";

export async function createNewLocation(
  db: SQLJsDatabase | ExpoSQLiteDatabase<Record<string, never>>,
  data: {
    actionId: string;
    name: string;
  }
) {
  const response = await db.insert(locationsTable).values(data).returning();
  return response;
}
