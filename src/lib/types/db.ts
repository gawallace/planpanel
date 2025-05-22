export interface Household {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Task {
  id?: number;
  household_id: number;
  title: string;
  description?: string | null;
  assigned_to?: number | null;
  due_date?: string | null;  // ISO date string
  priority?: string;
  status?: string;
  is_recurring?: boolean;
  recurrence_rule?: string | null;
  created_at?: string;
  updated_at?: string;
}