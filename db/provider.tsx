import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLJsDatabase } from "drizzle-orm/sql-js";
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { initialize } from "./drizzle";
import { initializeApp } from "./services/app.service";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "./migrations/migrations";

type ContextType = { db: SQLJsDatabase | ExpoSQLiteDatabase | null };

const DatabaseContext = React.createContext<ContextType>({ db: null });

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }
  return context;
}

export function DatabaseProvider({ children }: PropsWithChildren) {
  const [db, setDb] = useState<SQLJsDatabase | ExpoSQLiteDatabase | null>(null);

  useEffect(() => {
    if (db) return;
    const init = async () => {
      try {
        const newDb = await initialize();
        await migrate(newDb as ExpoSQLiteDatabase, migrations);
        await initializeApp(newDb);
        setDb(newDb);
      } catch (error) {
        console.error("Error initializing database:", error);
      }
    };
    init();
  }, []);

  return (
    <DatabaseContext.Provider value={{ db }}>
      {children}
    </DatabaseContext.Provider>
  );
}
