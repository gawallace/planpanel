<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Skeleton } from '$lib/components/ui/skeleton';

	const { data } = $props();

	let tasks = $state(data.tasks);
    let loading = $state(true);

	// Update tasks when `data` changes
	$effect(() => {
		if (data?.tasks) {
			tasks = data.tasks;
			loading = false;
		}
	});
</script>

<main class="mx-auto flex max-w-3xl flex-1 flex-col gap-6 p-6">
	<section class="mb-4">
		<h1 class="mb-1 text-3xl font-extrabold">Tasks</h1>
		<p>Tasks are a way to keep track of things you need to do.</p>
	</section>
	<form method="POST" use:enhance>
		<Input type="text" name="title" placeholder="Task name" required class="flex-grow" />
		<Button type="submit" variant="default" size="sm">Add Task</Button>
	</form>
	<section class="flex flex-col gap-3">
		{#if loading}
			<!-- Skeleton Loading State -->
			<ul class="space-y-4">
				{#each Array(3) as _, i}
					<li class="flex items-center space-x-4">
						<Skeleton class="h-6 w-6 rounded-full" />
						<Skeleton class="h-4 w-full max-w-sm" />
					</li>
				{/each}
			</ul>
		{:else if tasks.length === 0}
			<p class="italic">No tasks found. Add some below!</p>
		{:else}
			<ul class="divide-y divide-gray-200 rounded-md border border-gray-300">
				{#each tasks as task (task.title)}
					<li
						class="bg-primary text-primary-foreground hover:bg-primary/90 cursor-default px-4 py-2 shadow-xs"
					>
						{task.title}
					</li>
				{/each}
			</ul>
		{/if}
	</section>
</main>
