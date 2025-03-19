import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLJsDatabase } from "drizzle-orm/sql-js";
import { moodsTable, actionsTable } from "../schema";

type Database = ExpoSQLiteDatabase | SQLJsDatabase;

const initialMoods = [
  { mood: "Happy 😊" },
  { mood: "Sad 😢" },
  { mood: "Excited 🎉" },
  { mood: "Anxious 😰" },
  { mood: "Relaxed 😌" },
  { mood: "Angry 😠" },
  { mood: "Grateful 🙏" },
  { mood: "Tired 😴" },
];

const initialActions = [
  { action: "Take a walk", reason: "Physical activity helps clear the mind" },
  { action: "Meditate", reason: "Helps reduce stress and anxiety" },
  { action: "Call a friend", reason: "Social connection improves mood" },
  { action: "Listen to music", reason: "Music can lift spirits" },
  {
    action: "Write in journal",
    reason: "Expressing feelings helps process emotions",
  },
  { action: "Deep breathing", reason: "Calms the nervous system" },
  { action: "Read a book", reason: "Distraction from negative thoughts" },
  { action: "Exercise", reason: "Releases endorphins" },
];

export async function seedInitialData(db: Database) {
  try {
    // Seed moods
    const moodResponses = await Promise.all(
      initialMoods.map(async (mood) => {
        return db.insert(moodsTable).values(mood).returning();
      })
    );

    // Seed actions with mood associations
    const moodIds = moodResponses.map((response) => response[0].id);

    await Promise.all(
      initialActions.map(async (action, index) => {
        // Associate each action with 2-3 moods randomly
        const numMoods = Math.floor(Math.random() * 2) + 2; // 2-3 moods
        const selectedMoodIds = [...moodIds]
          .sort(() => Math.random() - 0.5)
          .slice(0, numMoods);

        await Promise.all(
          selectedMoodIds.map(async (moodId) => {
            return db
              .insert(actionsTable)
              .values({
                ...action,
                moodId,
              })
              .returning();
          })
        );
      })
    );

    return true;
  } catch (error) {
    console.error("Error seeding initial data:", error);
    return false;
  }
}
