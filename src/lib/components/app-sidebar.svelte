<script lang="ts" module>
	import CalendarDays from '@lucide/svelte/icons/calendar';
	import BrushCleaning from '@lucide/svelte/icons/brush-cleaning';
	import ListCheck from '@lucide/svelte/icons/list-check';
	import List from '@lucide/svelte/icons/list';
	import Image from '@lucide/svelte/icons/image';
	import Utensils from '@lucide/svelte/icons/utensils';
	import ThermometerSun from '@lucide/svelte/icons/thermometer-sun';

	// This is sample data
	const data = {
		user: {
			name: 'MadGab',
			email: 'madgab.fam@gmail.com',
			avatar: '/avatars/generic-avatar.jpg'
		},
		navMain: [
			{
				title: 'Calendar',
				url: '/calendar',
				icon: CalendarDays,
				isActive: true
			},
			{
				title: 'Tasks',
				url: '/tasks',
				icon: ListCheck,
				isActive: true
			},
			{
				title: 'Chores',
				url: '/chores',
				icon: BrushCleaning,
				isActive: false
			},
			{
				title: 'Lists',
				url: '/lists',
				icon: List,
				isActive: false
			},
			{
				title: 'Pictures',
				url: '/pictures',
				icon: Image,
				isActive: false
			},
			{
				title: 'Meals',
				url: '/meals',
				icon: Utensils,
				isActive: false
			},
			{
				title: 'Weather',
				url: '/weather',
				icon: ThermometerSun,
				isActive: false
			}
		]
	};
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import NavUser from '$lib/components/nav-user.svelte';
	import { useSidebar } from '$lib/components/ui/sidebar/context.svelte.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Command from '@lucide/svelte/icons/command';
	import { tick, type ComponentProps } from 'svelte';
	import { Settings } from '@lucide/svelte';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	let activeItem = $state(data.navMain[0]);
	let showTitles = $state(false);

	const sidebar = useSidebar();

	$effect(() => {
		if (sidebar.open) {
			(async () => {
				await tick();
				setTimeout(() => {
					showTitles = true; // ✅ this now triggers reactive updates
				}, 100);
			})();
		} else {
			showTitles = false;
		}
	});
</script>

<!-- This is the first sidebar -->
<!-- We disable collapsible and adjust width to icon. -->
<!-- This will make the sidebar appear as icons. -->
<Sidebar.Root bind:ref collapsible="icon" class="flex-1 border-r md:flex" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg" class="md:h-8 md:p-0" onclick={() => goto('/')}>
					{#snippet child({ props })}
						<a {...props}>
							<div
								class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
							>
								<Command class="size-8" />
							</div>
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-semibold">Plan Panel</span>
								<span class="truncate text-xs">Wallaces</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>

	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupContent class="px-1.5 md:px-0 touch-pan-y">
				<Sidebar.Menu
					class={`grid flex-1 transition-all duration-300 ease-in-out gap-y-4 ${sidebar.open ? 'mt-9' : ''}`}
				>
					{#each data.navMain as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton
								tooltipContentProps={{ hidden: sidebar.open }}
								onclick={() => {
									activeItem = item;
									goto(item.url);
								}}
								isActive={activeItem.title === item.title}
								class={`px-2.5 transition-all duration-300 ease-in-out md:h-16 md:px-2
								${activeItem.title === item.title ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
								style={`${activeItem.title === item.title ? 'color: var(--color-primary);' : ''}`}
							>
								{#snippet tooltipContent()}
									{item.title}
								{/snippet}

								<div
									class={`transition-all duration-300 ease-in-out
									${
										sidebar.open
											? 'flex h-full w-full flex-col items-center justify-center gap-2'
											: 'flex h-full w-full items-center'
									}`}
								>
									<item.icon size={sidebar.open ? 32 : 24} />
									{#if sidebar.open}
										{#if showTitles}
											<span class="text-center text-sm">{item.title}</span>
										{/if}
									{/if}
								</div>
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>

	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
</Sidebar.Root>
