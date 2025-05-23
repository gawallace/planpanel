<script lang="ts">
	import { Weather } from '$lib/state';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let iframeWidth = $state(829);
	let iframeHeight = $state(564);

	let resizing = false;
	let startX: number;
	let startY: number;
	let startWidth: number;
	let startHeight: number;

	function startResize(event: MouseEvent | TouchEvent) {
		resizing = true;

		if (event instanceof MouseEvent) {
			startX = event.clientX;
			startY = event.clientY;
		} else if (event instanceof TouchEvent) {
			startX = event.touches[0].clientX;
			startY = event.touches[0].clientY;
		}

		startWidth = iframeWidth;
		startHeight = iframeHeight;

		window.addEventListener('mousemove', onResize);
		window.addEventListener('mouseup', stopResize);

		window.addEventListener('touchmove', onResize);
		window.addEventListener('touchend', stopResize);
	}

	function onResize(event: MouseEvent | TouchEvent) {
		if (!resizing) return;

		let clientX, clientY;

		if (event instanceof MouseEvent) {
			clientX = event.clientX;
			clientY = event.clientY;
		} else if (event instanceof TouchEvent) {
			clientX = event.touches[0].clientX;
			clientY = event.touches[0].clientY;
		}

		if (clientX !== undefined && clientY !== undefined) {
			iframeWidth = startWidth + (clientX - startX);
			iframeHeight = startHeight + (clientY - startY);
		}
	}

	function stopResize() {
		resizing = false;
		window.removeEventListener('mousemove', onResize);
		window.removeEventListener('mouseup', stopResize);

		window.removeEventListener('touchmove', onResize);
		window.removeEventListener('touchend', stopResize);
	}

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

		<div
			class="relative inline-block rounded border shadow"
			style={`width: ${iframeWidth}px; height: ${iframeHeight}px; overflow: hidden;`}
		>
			<iframe
				src={`https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=in&metricTemp=°F&metricWind=mph&zoom=5&overlay=rain&product=ecmwf&level=surface&lat=${Weather.full?.lat}&lon=${Weather.full?.lon}&message=true`}
				class="block"
				style={`width: ${iframeWidth}px; height: ${iframeHeight}px; pointer-events: auto;`}
				title="Weather map showing rain, temperature, and wind data"
				sandbox="allow-scripts allow-same-origin"
			></iframe>

			<!-- Resize handle (accessible) -->
			<div
				role="button"
				tabindex="0"
				aria-label="Resize weather map"
				class="absolute right-0 bottom-0 h-8 w-8 cursor-se-resize bg-gray-500"
				onmousedown={startResize}
				ontouchstart={startResize}
			></div>
		</div>
	</div>
{:else}
	<p class="text-muted-foreground text-sm">No data available.</p>
{/if}
