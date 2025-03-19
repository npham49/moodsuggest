import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLJsDatabase } from "drizzle-orm/sql-js";
import { moodsTable } from "../schema";

export async function getAllMoods(
  db: SQLJsDatabase | ExpoSQLiteDatabase<Record<string, never>>
) {
  const response = await db.select().from(moodsTable).execute();
  return response;
}

export async function createNewMood(
  db: SQLJsDatabase | ExpoSQLiteDatabase<Record<string, never>>,
  mood: string
) {
  const response = await db
    .insert(moodsTable)
    .values({
      mood,
    })
    .returning();
  return response;
}
