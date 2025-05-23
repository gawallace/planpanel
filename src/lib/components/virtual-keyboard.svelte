<script lang="ts">
  export let value = '';
  export let onInput: (newValue: string) => void = () => {};

  let shift = false;

  const rows = [
    ['1','2','3','4','5','6','7','8','9','0', '-','='],
    ['q','w','e','r','t','y','u','i','o','p'],
    ['a','s','d','f','g','h','j','k','l'],
    ['⇧','z','x','c','v','b','n','m','⌫'],
    ['space']
  ];

  function handleKeyPress(key: string) {
    if (key === '⇧') {
      shift = !shift;
    } else if (key === '⌫') {
      value = value.slice(0, -1);
    } else if (key === 'space') {
      value += ' ';
    } else {
      value += shift ? key.toUpperCase() : key;
    }

    onInput(value);
  }
</script>

<div class="space-y-2">
  {#each rows as row}
    <div class="flex justify-center gap-1">
      {#each row as key}
        <button
          on:click={() => handleKeyPress(key)}
          class="bg-gray-200 text-lg px-3 py-2 rounded shadow w-10 h-12 flex items-center justify-center active:bg-gray-300"
          class:w-20={key === 'space'}
        >
          {#if key === 'space'}
            ␣
          {:else if key === '⇧' || key === '⌫'}
            {key}
          {:else}
            {shift ? key.toUpperCase() : key}
          {/if}
        </button>
      {/each}
    </div>
  {/each}
</div>
