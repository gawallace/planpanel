<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';

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
		<Button type="submit" variant="default" size="sm" formaction="?/addTask">Add Task</Button>
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
			<!-- Scrollable container with max height -->
			<div class="max-h-80 overflow-y-auto rounded-md border">
				<ul class="divide-y">
					{#each tasks as task (task.title)}
						<li class="hover:bg-muted flex items-center justify-between px-4 py-2">
							<span class="truncate">{task.title}</span>

							<input type="hidden" name="id" value={task.id} />
							<AlertDialog.Root>
								<AlertDialog.Trigger
									class={buttonVariants({ variant: 'destructive' })}
									type="button"
								>
									Remove
								</AlertDialog.Trigger>
								<AlertDialog.Content>
									<AlertDialog.Header>
										<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
										<AlertDialog.Description>
											This action cannot be undone. This will permanently delete your account and
											remove your data from our servers.
										</AlertDialog.Description>
									</AlertDialog.Header>
									<AlertDialog.Footer>
										<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
										<form method="POST" use:enhance>
											<input type="hidden" name="id" value={task.id} />
											<Button type="submit" formaction="?/removeTask" variant="destructive">
												Remove
											</Button>
										</form>
									</AlertDialog.Footer>
								</AlertDialog.Content>
							</AlertDialog.Root>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</section>
</main>
