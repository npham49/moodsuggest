import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLJsDatabase } from "drizzle-orm/sql-js";
import { suggestionsTable } from "../schema";

export async function createNewSuggestion(
  db: SQLJsDatabase | ExpoSQLiteDatabase<Record<string, never>>,
  data: {
    moodId: string;
    actionId: string;
    subjectId: string;
    locationId: string;
  }
) {
  const response = await db.insert(suggestionsTable).values(data).returning();
  return response;
}
