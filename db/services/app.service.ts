import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLJsDatabase } from "drizzle-orm/sql-js";
import { seedInitialData } from "./seed.service";
import {
  logsTable,
  moodsTable,
  actionsTable,
  subjectsTable,
  locationsTable,
  suggestionsTable,
} from "../schema";

const APP_INIT_KEY = "app_initialized";

type Database = ExpoSQLiteDatabase | SQLJsDatabase;

async function isAppInitialized() {
  try {
    const value = await AsyncStorage.getItem(APP_INIT_KEY);
    return value === "true";
  } catch (error) {
    console.error("Error checking app initialization:", error);
    return false;
  }
}

export async function initializeApp(db: Database) {
  try {
    const isInitialized = await isAppInitialized();

    if (!isInitialized) {
      // Run initial seeding
      await seedInitialData(db);
      // Mark app as initialized
      await AsyncStorage.setItem(APP_INIT_KEY, "true");
    }

    return true;
  } catch (error) {
    console.error("Error initializing app:", error);
    return false;
  }
}

export async function deleteAllData(db: Database) {
  try {
    // Delete data from all tables in the correct order to handle foreign key constraints
    await db.delete(suggestionsTable);
    await db.delete(logsTable);
    await db.delete(locationsTable);
    await db.delete(subjectsTable);
    await db.delete(actionsTable);
    await db.delete(moodsTable);

    // Reset the initialization flag
    await AsyncStorage.removeItem(APP_INIT_KEY);

    return true;
  } catch (error) {
    console.error("Error deleting data:", error);
    return false;
  }
}
