CREATE TABLE `actions` (
	`id` text NOT NULL,
	`mood_id` text NOT NULL,
	`action` text NOT NULL,
	`reason` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`mood_id`) REFERENCES `moods`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `locations` (
	`id` text NOT NULL,
	`action_id` text NOT NULL,
	`subject_id` text,
	`name` text NOT NULL,
	`latitude` text,
	`longitude` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`action_id`) REFERENCES `actions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `logs` (
	`id` text NOT NULL,
	`note` text,
	`ratings` integer,
	`mood_id` text NOT NULL,
	`action_id` text NOT NULL,
	`subject_id` text,
	`location_id` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`mood_id`) REFERENCES `moods`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`action_id`) REFERENCES `actions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `moods` (
	`id` text NOT NULL,
	`mood` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `subjects` (
	`id` text NOT NULL,
	`action_id` text NOT NULL,
	`name` text NOT NULL,
	`location_id` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`action_id`) REFERENCES `actions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `suggestions` (
	`id` text NOT NULL,
	`mood_id` text NOT NULL,
	`action_id` text NOT NULL,
	`subject_id` text NOT NULL,
	`location_id` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`mood_id`) REFERENCES `moods`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`action_id`) REFERENCES `actions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE no action
);
