<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import ThemePicker from '$lib/components/theme-picker.svelte';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import WeatherCharm from '$lib/components/weather-charm.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import DateTimeCharm from '$lib/components/date-time-charm.svelte';

	import "../app.css";
</script>

<ModeWatcher />

<Sidebar.Provider style="--sidebar-width: 160px;">
	<AppSidebar />
	<Sidebar.Inset>
		<header class="sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
			<Sidebar.Trigger class="-ml-1" />
			<Separator orientation="vertical" class="mr-2 h-4" />
			<WeatherCharm />
			<Separator orientation="vertical" class="mr-2 h-4" />
			<DateTimeCharm />
			<div class="ml-auto">
				<div class="flex items-center gap-4 text-sm">
					<span><ThemePicker /></span>
				</div>
			</div>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4">
			<slot />
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>