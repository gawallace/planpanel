CREATE TABLE households (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE members (
    id INTEGER PRIMARY KEY,
    household_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    avatar_url TEXT,
    role TEXT DEFAULT 'member', -- e.g., 'admin', 'member'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (household_id) REFERENCES households(id) ON DELETE CASCADE
);

CREATE TABLE tasks (
    id INTEGER PRIMARY KEY,
    household_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    assigned_to INTEGER,
    due_date TIMESTAMP,
    priority TEXT DEFAULT 'medium', -- e.g., 'low', 'medium', 'high'
    status TEXT DEFAULT 'todo', -- e.g., 'todo', 'in_progress', 'done'
    is_recurring BOOLEAN DEFAULT false,
    recurrence_rule TEXT, -- e.g., 'daily', 'weekly', ISO RRULE, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (household_id) REFERENCES households(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES members(id) ON DELETE SET NULL
);

CREATE TABLE chores (
    id INTEGER PRIMARY KEY,
    task_id INTEGER NOT NULL,
    last_completed_at TIMESTAMP,
    next_due_at TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);

CREATE TABLE events (
    id INTEGER PRIMARY KEY,
    household_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    location TEXT,
    created_by INTEGER,
    is_all_day BOOLEAN DEFAULT false,
    recurrence_rule TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (household_id) REFERENCES households(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES members(id)
);

CREATE TABLE event_attendees (
    event_id INTEGER NOT NULL,
    member_id INTEGER NOT NULL,
    PRIMARY KEY (event_id, member_id),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);

CREATE TABLE notes (
    id INTEGER PRIMARY KEY,
    household_id INTEGER NOT NULL,
    title TEXT,
    content TEXT,
    pinned BOOLEAN DEFAULT false,
    created_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (household_id) REFERENCES households(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES members(id)
);
