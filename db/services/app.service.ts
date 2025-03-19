import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLJsDatabase } from "drizzle-orm/sql-js";
import { seedInitialData } from "./seed.service";

type Database = ExpoSQLiteDatabase | SQLJsDatabase;

const APP_INIT_KEY = "@app_initialized";

export async function isAppInitialized(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(APP_INIT_KEY);
    return value === "true";
  } catch {
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
