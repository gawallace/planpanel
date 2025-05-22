import { db } from '$lib/server/db';
import { tasks } from '$lib/server/db/schema';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const title = form.get('title') as string;
    if (!title.trim()) return fail(400, { error: 'Title is required' });

    await db.insert(tasks).values({
      householdId: 1,
      title: title.trim(),
      status: 'todo',
      assignedTo: 1,
    }).execute();

    const updatedTasks = await db.select().from(tasks).all();
    return { tasks: updatedTasks };
  }
};

export async function load() {
    const allTasks = db.select().from(tasks).all();
    return { tasks: allTasks };
}
