import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLJsDatabase } from "drizzle-orm/sql-js";
import { subjectsTable } from "../schema";

export async function createNewSubject(
  db: SQLJsDatabase | ExpoSQLiteDatabase<Record<string, never>>,
  data: {
    actionId: string;
    name: string;
    locationId?: string;
  }
) {
  const response = await db.insert(subjectsTable).values(data).returning();
  return response;
}
