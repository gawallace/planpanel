INSERT INTO households (name) VALUES ('The Wallaces');

INSERT INTO members (household_id, name, email, role) VALUES
(1, 'Madison Wallace', 'maddie@example.com', 'admin'),
(1, 'Gabriel Wallace', 'gabe@example.com', 'admin');

INSERT INTO tasks (
    household_id, title, description, assigned_to, due_date, priority, status, is_recurring, recurrence_rule
) VALUES
(1, 'Take out trash', 'Take trash bins to the curb before 7 AM.', 1, '2025-05-21 06:30:00', 'medium', 'todo', true, 'weekly'),
(1, 'Grocery shopping', 'Buy milk, eggs, and bread.', 2, '2025-05-22 17:00:00', 'high', 'in_progress', false, NULL),
(1, 'Clean kitchen', 'Wipe counters, mop floor, clean sink.', NULL, '2025-05-23 19:00:00', 'medium', 'todo', true, 'daily'),
(1, 'Pay electricity bill', 'Due at the end of the month.', 1, '2025-05-30 23:59:59', 'high', 'todo', false, NULL),
(1, 'Walk the dog', '30-minute walk around the neighborhood.', 2, '2025-05-21 07:30:00', 'low', 'done', true, 'daily');