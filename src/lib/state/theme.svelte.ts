export const themes = [
	{ value: 'default', label: 'Default' },
	{ value: 'theme-red', label: 'Red' },
	{ value: 'theme-rose', label: 'Rose' },
	{ value: 'theme-orange', label: 'Orange' },
	{ value: 'theme-green', label: 'Green' },
	{ value: 'theme-blue', label: 'Blue' },
	{ value: 'theme-yellow', label: 'Yellow' },
	{ value: 'theme-violet', label: 'Violet' },
];

export const themeState = $state<{
	value: string;
	set: (newTheme: string) => void;
}>({
	value: typeof window !== 'undefined' ? localStorage.getItem('theme') || 'default' : 'default',
	set: (newTheme: string) => applyTheme(newTheme)
});

function applyTheme(value: string) {
	if (typeof document !== 'undefined') {
		document.documentElement.classList.remove(...themes.map((t) => t.value));
		document.documentElement.classList.add(value);
	}

	if (typeof window !== 'undefined') {
		localStorage.setItem('theme', value);
	}

	themeState.value = value;
}
