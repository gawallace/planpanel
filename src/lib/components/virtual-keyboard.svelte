<script lang="ts">
	export let value = '';
	export let onInput: (newValue: string) => void = () => {};

	let shift = false;

	type KeyDef = { normal: string; shift?: string; code?: string };

	const rows: KeyDef[][] = [
		[
			{ normal: '1', shift: '!' },
			{ normal: '2', shift: '@' },
			{ normal: '3', shift: '#' },
			{ normal: '4', shift: '$' },
			{ normal: '5', shift: '%' },
			{ normal: '6', shift: '^' },
			{ normal: '7', shift: '&' },
			{ normal: '8', shift: '*' },
			{ normal: '9', shift: '(' },
			{ normal: '0', shift: ')' },
			{ normal: '-', shift: '_' },
			{ normal: '=', shift: '+' }
		],
		[
			{ normal: 'q' },
			{ normal: 'w' },
			{ normal: 'e' },
			{ normal: 'r' },
			{ normal: 't' },
			{ normal: 'y' },
			{ normal: 'u' },
			{ normal: 'i' },
			{ normal: 'o' },
			{ normal: 'p' },
      { normal: '[', shift: '{' },
      { normal: ']', shift: '}' }
		],
		[
			{ normal: 'a' },
			{ normal: 's' },
			{ normal: 'd' },
			{ normal: 'f' },
			{ normal: 'g' },
			{ normal: 'h' },
			{ normal: 'j' },
			{ normal: 'k' },
			{ normal: 'l' },
      { normal: ';', shift: ':' },
      { normal: '\'', shift: '"' }
		],
		[
			{ normal: '⇧', code: 'shift' },
			{ normal: 'z' },
			{ normal: 'x' },
			{ normal: 'c' },
			{ normal: 'v' },
			{ normal: 'b' },
			{ normal: 'n' },
			{ normal: 'm' },
      { normal: ',', shift: '<' },
      { normal: '.', shift: '>' },
      { normal: '/', shift: '?' },
			{ normal: '⌫', code: 'backspace' }
		],
		[{ normal: 'space', code: 'space' }]
	];

	function handleKeyPress(key: KeyDef) {
		const code = key.code || key.normal;

		if (code === 'shift') {
			shift = !shift;
		} else if (code === 'backspace') {
			value = value.slice(0, -1);
		} else if (code === 'space') {
			value += ' ';
		} else {
			value += shift && key.shift ? key.shift : shift ? key.normal.toUpperCase() : key.normal;
		}

		onInput(value);
	}
</script>

{#each rows as row}
	<div class="flex justify-center gap-1">
		{#each row as key}
			<button
				on:click={() => handleKeyPress(key)}
				class="flex h-14 w-12 items-center justify-center rounded bg-gray-200 px-3 py-2 text-lg shadow active:bg-gray-300"
				class:w-20={key.code === 'space'}
			>
				{#if key.code === 'space'}
					␣
				{:else if key.code === 'shift' || key.code === 'backspace'}
					{key.normal.toUpperCase()}
				{:else}
					{shift && key.shift ? key.shift : shift ? key.normal.toUpperCase() : key.normal}
				{/if}
			</button>
		{/each}
	</div>
{/each}
