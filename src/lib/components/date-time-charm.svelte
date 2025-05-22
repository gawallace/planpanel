<script lang="ts">
	import { onMount } from 'svelte';

	let date = new Date();
	let formatted = formatDate(date);

	onMount(() => {
		const interval = setInterval(() => {
			date = new Date();
			formatted = formatDate(date);
		}, 1000);

		return () => clearInterval(interval);
	});

	function formatDate(date: Date) {
		return date.toLocaleString('en-US', {
			weekday: 'short',
			day: '2-digit',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: true
		});
	}
</script>

<span class="text-md">
	{formatted}
</span>
