import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLJsDatabase } from "drizzle-orm/sql-js";
import { ActionInsertSchema, actionsTable } from "../schema";
import { eq } from "drizzle-orm";

export async function getActionsWithMoodId(
  db: SQLJsDatabase | ExpoSQLiteDatabase<Record<string, never>>,
  moodId: string
) {
  const response = await db
    .select()
    .from(actionsTable)
    .where(eq(actionsTable.moodId, moodId));
  return response;
}

export async function getAllActions(
  db: SQLJsDatabase | ExpoSQLiteDatabase<Record<string, never>>
) {
  const response = await db.select().from(actionsTable);
  return response;
}

export async function createNewActionWithMoodId(
  db: SQLJsDatabase | ExpoSQLiteDatabase<Record<string, never>>,
  moodId: string,
  data: ActionInsertSchema
) {
  const response = await db.insert(actionsTable).values(data).returning();
  return response;
}
