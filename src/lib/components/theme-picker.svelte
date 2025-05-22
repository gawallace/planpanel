<script lang="ts">
	import { Theme, Themes } from '$lib/state';
	import ModeToggle from '$lib/components/mode-toggle.svelte';

	function handleChange(e: Event) {
		const newTheme = (e.target as HTMLSelectElement).value;
		Theme.set(newTheme);
	}
</script>

<div class="flex items-center gap-2 text-sm">
	<label for="theme-picker" class="text-muted-foreground">Theme:</label>
	<select
		id="theme-picker"
		on:change={handleChange}
		bind:value={Theme.value}
		class="rounded-md border px-2 py-1 bg-background text-foreground"
	>
		{#each Themes as t}
			<option value={t.value}>{t.label}</option>
		{/each}
	</select>
	<ModeToggle />
</div>