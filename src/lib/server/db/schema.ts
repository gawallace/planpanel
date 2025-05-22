// 1. Table definitions
import {
  sqliteTable,
  integer,
  text,
  primaryKey,
} from 'drizzle-orm/sqlite-core';
import { relations } from "drizzle-orm/relations";

//#region 1. Table definitions
export const households = sqliteTable('households', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP'),
});

// Members
export const members = sqliteTable('members', {
  id: integer('id').primaryKey(),
  householdId: integer('household_id').notNull().references(() => households.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  email: text('email').unique(),
  avatarUrl: text('avatar_url'),
  role: text('role').default('member'),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP'),
});

// Tasks
export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey(),
  householdId: integer('household_id').notNull().references(() => households.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  assignedTo: integer('assigned_to').references(() => members.id, { onDelete: 'set null' }),
  dueDate: text('due_date'),
  priority: text('priority').default('medium'),
  status: text('status').default('todo'),
  isRecurring: integer('is_recurring').default(0),
  recurrenceRule: text('recurrence_rule'),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP'),
});

// Chores
export const chores = sqliteTable('chores', {
  id: integer('id').primaryKey(),
  taskId: integer('task_id').notNull().references(() => tasks.id, { onDelete: 'cascade' }),
  lastCompletedAt: text('last_completed_at'),
  nextDueAt: text('next_due_at'),
});

// Events
export const events = sqliteTable('events', {
  id: integer('id').primaryKey(),
  householdId: integer('household_id').notNull().references(() => households.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  startTime: text('start_time').notNull(),
  endTime: text('end_time'),
  location: text('location'),
  createdBy: integer('created_by').references(() => members.id),
  isAllDay: integer('is_all_day').default(0),
  recurrenceRule: text('recurrence_rule'),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP'),
});

// Event Attendees (join table)
export const eventAttendees = sqliteTable('event_attendees', {
  eventId: integer('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  memberId: integer('member_id').notNull().references(() => members.id, { onDelete: 'cascade' }),
}, (table) => ({
  pk: primaryKey({ columns: [table.eventId, table.memberId] }),
}));

// Notes
export const notes = sqliteTable('notes', {
  id: integer('id').primaryKey(),
  householdId: integer('household_id').notNull().references(() => households.id, { onDelete: 'cascade' }),
  title: text('title'),
  content: text('content'),
  pinned: integer('pinned').default(0),
  createdBy: integer('created_by').references(() => members.id),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP'),
});
//#endregion 1. Table definitions

//#region 2. Table relations
export const householdRelations = relations(households, ({ many }) => ({
	members: many(members),
	tasks: many(tasks),
	events: many(events),
	notes: many(notes),
}));

export const memberRelations = relations(members, ({ one, many }) => ({
	household: one(households, {
		fields: [members.householdId],
		references: [households.id],
	}),
	tasks: many(tasks, { relationName: 'assignedTasks' }),
	eventsCreated: many(events, { relationName: 'createdEvents' }),
	notesCreated: many(notes, { relationName: 'createdNotes' }),
	attendingEvents: many(eventAttendees),
}));

export const taskRelations = relations(tasks, ({ one, many }) => ({
	household: one(households, {
		fields: [tasks.householdId],
		references: [households.id],
	}),
	assignedTo: one(members, {
		fields: [tasks.assignedTo],
		references: [members.id],
		relationName: 'assignedTasks',
	}),
	chores: many(chores),
}));

export const choreRelations = relations(chores, ({ one }) => ({
	task: one(tasks, {
		fields: [chores.taskId],
		references: [tasks.id],
	}),
}));

export const eventRelations = relations(events, ({ one, many }) => ({
	household: one(households, {
		fields: [events.householdId],
		references: [households.id],
	}),
	createdBy: one(members, {
		fields: [events.createdBy],
		references: [members.id],
		relationName: 'createdEvents',
	}),
	attendees: many(eventAttendees),
}));

export const eventAttendeeRelations = relations(eventAttendees, ({ one }) => ({
	event: one(events, {
		fields: [eventAttendees.eventId],
		references: [events.id],
	}),
	member: one(members, {
		fields: [eventAttendees.memberId],
		references: [members.id],
	}),
}));

export const noteRelations = relations(notes, ({ one }) => ({
	household: one(households, {
		fields: [notes.householdId],
		references: [households.id],
	}),
	createdBy: one(members, {
		fields: [notes.createdBy],
		references: [members.id],
		relationName: 'createdNotes',
	}),
}));
//#endregion 2. Relation definitions