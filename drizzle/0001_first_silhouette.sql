PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_events` (
	`id` integer PRIMARY KEY NOT NULL,
	`household_id` integer NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`start_time` text NOT NULL,
	`end_time` text,
	`location` text,
	`created_by` integer,
	`is_all_day` integer DEFAULT 0,
	`recurrence_rule` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`household_id`) REFERENCES `households`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`created_by`) REFERENCES `members`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_events`("id", "household_id", "title", "description", "start_time", "end_time", "location", "created_by", "is_all_day", "recurrence_rule", "created_at", "updated_at") SELECT "id", "household_id", "title", "description", "start_time", "end_time", "location", "created_by", "is_all_day", "recurrence_rule", "created_at", "updated_at" FROM `events`;--> statement-breakpoint
DROP TABLE `events`;--> statement-breakpoint
ALTER TABLE `__new_events` RENAME TO `events`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_notes` (
	`id` integer PRIMARY KEY NOT NULL,
	`household_id` integer NOT NULL,
	`title` text,
	`content` text,
	`pinned` integer DEFAULT 0,
	`created_by` integer,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`household_id`) REFERENCES `households`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`created_by`) REFERENCES `members`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_notes`("id", "household_id", "title", "content", "pinned", "created_by", "created_at", "updated_at") SELECT "id", "household_id", "title", "content", "pinned", "created_by", "created_at", "updated_at" FROM `notes`;--> statement-breakpoint
DROP TABLE `notes`;--> statement-breakpoint
ALTER TABLE `__new_notes` RENAME TO `notes`;--> statement-breakpoint
CREATE TABLE `__new_tasks` (
	`id` integer PRIMARY KEY NOT NULL,
	`household_id` integer NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`assigned_to` integer,
	`due_date` text,
	`priority` text DEFAULT 'medium',
	`status` text DEFAULT 'todo',
	`is_recurring` integer DEFAULT 0,
	`recurrence_rule` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`household_id`) REFERENCES `households`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`assigned_to`) REFERENCES `members`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_tasks`("id", "household_id", "title", "description", "assigned_to", "due_date", "priority", "status", "is_recurring", "recurrence_rule", "created_at", "updated_at") SELECT "id", "household_id", "title", "description", "assigned_to", "due_date", "priority", "status", "is_recurring", "recurrence_rule", "created_at", "updated_at" FROM `tasks`;--> statement-breakpoint
DROP TABLE `tasks`;--> statement-breakpoint
ALTER TABLE `__new_tasks` RENAME TO `tasks`;