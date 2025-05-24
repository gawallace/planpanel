<script lang="ts">
	import DraggableResizable from '$lib/components/draggable-resizable.svelte';
	import WeatherWidget from '$lib/components/weather/weather-widget.svelte';
	import { Weather } from '$lib/state';
	import { onMount } from 'svelte';

	let iframeX = $state(200);
	let iframeY = $state(150);
	let iframeWidth = $state(829);
	let iframeHeight = $state(564);

	let wwX = $state(200);
	let wwY = $state(150);
	let wwWidth = $state(829);
	let wwHeight = $state(564);

	onMount(() => {
		if (!Weather.result && !Weather.loading) {
			Weather.refresh();
		}
	});
</script>

{#if Weather.result}
	<div class="flex flex-col gap-4 text-sm">
		<div class="flex items-center gap-4">
			<span>{Weather.result.name}</span>
			<span>{Weather.result.temp.toFixed(0)}°F</span>
			<img
				src={`https://openweathermap.org/img/wn/${Weather.result.icon}@2x.png`}
				alt="Weather icon"
				class="h-8 w-8"
				title={Weather.result.conditions.charAt(0).toUpperCase() +
					Weather.result.conditions.slice(1)}
			/>
			{Weather.overview?.weather_overview}
		</div>

		<DraggableResizable
			width={iframeWidth}
			height={iframeHeight}
			x={iframeX}
			y={iframeY}
			onResize={(event: { width: number; height: number }) => {
				iframeWidth = event.width;
				iframeHeight = event.height;
			}}
			onDrag={(event: { x: number; y: number }) => {
				iframeX = event.x;
				iframeY = event.y;
				console.log('Moved to:', iframeX, iframeY);
			}}
		>
			<iframe
				src={`https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=in&metricTemp=°F&metricWind=mph&zoom=5&overlay=rain&product=ecmwf&level=surface&lat=${Weather.full?.lat}&lon=${Weather.full?.lon}&message=true`}
				class="block"
				style={`width: ${iframeWidth}px; height: ${iframeHeight}px; pointer-events: auto;`}
				title="Weather map showing rain, temperature, and wind data"
				sandbox="allow-scripts allow-same-origin"
			></iframe>
		</DraggableResizable>
		<DraggableResizable
			width={wwWidth}
			height={wwHeight}
			x={wwX}
			y={wwY}
			onResize={(event: { width: number; height: number }) => {
				wwWidth = event.width;
				wwHeight = event.height;
			}}
			onDrag={(event: { x: number; y: number }) => {
				wwX = event.x;
				wwY = event.y;
				console.log('Moved to:', wwX, wwY);
			}}
		>
			<WeatherWidget
			></WeatherWidget>
		</DraggableResizable>
	</div>
{:else}
	<p class="text-muted-foreground text-sm">No data available.</p>
{/if}
