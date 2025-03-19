import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLJsDatabase } from "drizzle-orm/sql-js";
import {
  logsTable,
  moodsTable,
  actionsTable,
  subjectsTable,
  locationsTable,
} from "../schema";
import { eq, desc } from "drizzle-orm";

type Database = ExpoSQLiteDatabase | SQLJsDatabase;

export async function createNewLog(
  db: SQLJsDatabase | ExpoSQLiteDatabase<Record<string, never>>,
  data: {
    note?: string;
    ratings?: number;
    moodId: string;
    actionId: string;
    subjectId?: string;
    locationId?: string;
  }
) {
  const response = await db.insert(logsTable).values(data).returning();
  return response;
}

export async function getLogsWithRelations(db: Database) {
  return db
    .select()
    .from(logsTable)
    .leftJoin(moodsTable, eq(logsTable.moodId, moodsTable.id))
    .leftJoin(actionsTable, eq(logsTable.actionId, actionsTable.id))
    .leftJoin(subjectsTable, eq(logsTable.subjectId, subjectsTable.id))
    .leftJoin(locationsTable, eq(logsTable.locationId, locationsTable.id))
    .orderBy(desc(logsTable.createdAt))
    .all();
}
