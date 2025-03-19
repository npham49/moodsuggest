import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { createSelectSchema } from "drizzle-zod";

// Moods Table
export const moodsTable = sqliteTable("moods", {
  id: text("id")
    .$defaultFn(() => createId())
    .notNull(),
  mood: text("mood").notNull().unique(), // E.g., "Happy", "Sad"
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

// Actions Table
export const actionsTable = sqliteTable("actions", {
  id: text("id")
    .$defaultFn(() => createId())
    .notNull(),
  moodId: text("mood_id")
    .references(() => moodsTable.id)
    .notNull(),
  action: text("action").notNull().unique(), // E.g., "Exercise", "Read"
  reason: text("reason"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

// Table type declarations
export const subjectsTable = sqliteTable("subjects", {
  id: text("id")
    .$defaultFn(() => createId())
    .notNull(),
  actionId: text("action_id")
    .references(() => actionsTable.id)
    .notNull(), // Required reference to action
  name: text("name").notNull().unique(), // E.g., "Dog", "Book"
  locationId: text("location_id"), // Will be updated after locationsTable is defined
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

// Locations Table
export const locationsTable = sqliteTable("locations", {
  id: text("id")
    .$defaultFn(() => createId())
    .notNull(),
  actionId: text("action_id")
    .references(() => actionsTable.id)
    .notNull(), // Required reference to action
  subjectId: text("subject_id").references(() => subjectsTable.id), // Optional reference to subject
  name: text("name").notNull().unique(), // E.g., "Home", "Park"
  latitude: text("latitude"),
  longitude: text("longitude"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const suggestionsTable = sqliteTable("suggestions", {
  id: text("id")
    .$defaultFn(() => createId())
    .notNull(),
  moodId: text("mood_id")
    .references(() => moodsTable.id)
    .notNull(),
  actionId: text("action_id")
    .references(() => actionsTable.id)
    .notNull(), // Required reference to action
  subjectId: text("subject_id")
    .references(() => subjectsTable.id)
    .notNull(), // Required reference to subject
  locationId: text("location_id")
    .references(() => locationsTable.id)
    .notNull(), // Required reference
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const logsTable = sqliteTable("logs", {
  id: text("id")
    .$defaultFn(() => createId())
    .notNull(),
  note: text("note"),
  ratings: integer("ratings"),
  moodId: text("mood_id")
    .references(() => moodsTable.id)
    .notNull(),
  actionId: text("action_id")
    .references(() => actionsTable.id)
    .notNull(), // Required reference to action
  subjectId: text("subject_id").references(() => subjectsTable.id), // Required reference to subject
  locationId: text("location_id").references(() => locationsTable.id), // Required reference
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const MoodSchema = createSelectSchema(moodsTable);
export const MoodInsertSchema = MoodSchema.omit({
  id: true,
  createdAt: true,
});

export type MoodInsertSchema = typeof MoodInsertSchema._type;

export type Mood = typeof MoodSchema._type;

export const ActionSchema = createSelectSchema(actionsTable);
export const ActionInsertSchema = ActionSchema.omit({
  id: true,
  createdAt: true,
});

export type ActionInsertSchema = typeof ActionInsertSchema._type;

export type Action = typeof ActionSchema._type;

export const SubjectSchema = createSelectSchema(subjectsTable);
export const SubjectInsertSchema = SubjectSchema.omit({
  id: true,
  createdAt: true,
});

export const LocationSchema = createSelectSchema(locationsTable);
export const LocationInsertSchema = LocationSchema.omit({
  id: true,
  createdAt: true,
});

export const SuggestionSchema = createSelectSchema(suggestionsTable);
export const SuggestionInsertSchema = SuggestionSchema.omit({
  id: true,
  createdAt: true,
});

export const LogSchema = createSelectSchema(logsTable);
export const LogInsertSchema = LogSchema.omit({
  id: true,
  createdAt: true,
});
