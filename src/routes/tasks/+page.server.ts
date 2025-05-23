import { db } from '$lib/server/db';
import { tasks } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  addTask: async ({ request }) => {
    const form = await request.formData();
    const title = form.get('title') as string;
    if (!title.trim()) return fail(400, { error: 'Title is required' });

    await db.insert(tasks).values({
      householdId: 1,
      title: title.trim(),
      status: 'todo',
      assignedTo: 1,
    }).execute();

    const updatedTasks = db.select().from(tasks).all();
    return { tasks: updatedTasks };
  },

  removeTask: async ({ request }) => {
    const form = await request.formData();
    const id = Number(form.get('id'));
    if (!id) return fail(400, { error: 'Invalid task ID' });

    await db.delete(tasks).where(eq(tasks.id, id)).execute();

    const updatedTasks = db.select().from(tasks).all();
    return { tasks: updatedTasks };
  }
};

export async function load() {
    const allTasks = db.select().from(tasks).all();
    return { tasks: allTasks };
}
