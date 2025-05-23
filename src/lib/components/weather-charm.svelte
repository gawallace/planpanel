<script lang="ts">
	import { RefreshCw } from '@lucide/svelte';
	import { Weather } from '$lib/state';
	import { Button } from '$lib/components/ui/button';

/* 	let interval: ReturnType<typeof setInterval> | null = null;
	
	$effect(() => {
		Weather.refresh();
		interval = setInterval(Weather.refresh, 10 * 60 * 1000);

		if (import.meta.hot) {
			import.meta.hot.dispose(() => {
				if (interval) clearInterval(interval);
			});
		}
	}); */
</script>

{#if Weather.result}
	<div class="flex items-center gap-4 text-sm">
		<Button variant="ghost" size="icon" onclick={() => Weather.refresh()} aria-label="Refresh">
			<RefreshCw />
		</Button>
		<span>{Weather.result.name}</span>
		<span>{Weather.result.temp.toFixed(0)}°F</span>
		<img
			src={`https://openweathermap.org/img/wn/${Weather.result.icon}@2x.png`}
			alt="icon"
			class="h-8 w-8"
			title="{String(Weather.result.conditions).charAt(0).toUpperCase() + String(Weather.result.conditions).slice(1)}"
		/>
	</div>
{:else if Weather.loading}
	<p class="text-muted-foreground text-sm">Loading...</p>
{/if}