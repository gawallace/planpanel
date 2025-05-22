<script lang="ts">
	import { Weather } from '$lib/state';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!Weather.result && !Weather.loading) {
			Weather.refresh();
		}
	});
</script>

{#if Weather.loading}
	<p class="text-muted-foreground text-sm">Loading...</p>
{:else if Weather.result}
	<div class="flex items-center gap-4 text-sm">
		<span>{Weather.result.name}</span>
		<span>{Weather.result.temp.toFixed(0)}°F</span>
		<img
			src={`https://openweathermap.org/img/wn/${Weather.result.icon}@2x.png`}
			alt="Weather icon"
			class="h-8 w-8"
			title={Weather.result.conditions.charAt(0).toUpperCase() + Weather.result.conditions.slice(1)}
		/>
	</div>
{:else}
	<p class="text-muted-foreground text-sm">No data available.</p>
{/if}
