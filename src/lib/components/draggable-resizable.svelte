<script lang="ts">
  const {
    width = 300,
    height = 200,
    x = 100,
    y = 100,
    minWidth = 100,
    minHeight = 100,
    onResize = null,
    onDrag = null
  } = $props();

  let resizing = false;
  let dragging = false;
  let startX: number;
  let startY: number;
  let startWidth: number;
  let startHeight: number;
  let startLeft: number;
  let startTop: number;

  function getClientPoint(event: MouseEvent | TouchEvent) {
    if (event instanceof TouchEvent) {
      return { x: event.touches[0].clientX, y: event.touches[0].clientY };
    } else {
      return { x: event.clientX, y: event.clientY };
    }
  }

  function startResize(event: MouseEvent | TouchEvent) {
    resizing = true;
    const { x: clientX, y: clientY } = getClientPoint(event);
    startX = clientX;
    startY = clientY;
    startWidth = width;
    startHeight = height;

    window.addEventListener('mousemove', onResizeMove);
    window.addEventListener('mouseup', stopResize);
    window.addEventListener('touchmove', onResizeMove);
    window.addEventListener('touchend', stopResize);
  }

  function onResizeMove(event: MouseEvent | TouchEvent) {
    if (!resizing) return;
    const { x: clientX, y: clientY } = getClientPoint(event);
    const newWidth = Math.max(minWidth, startWidth + (clientX - startX));
    const newHeight = Math.max(minHeight, startHeight + (clientY - startY));
    onResize?.({ width: newWidth, height: newHeight });
  }

  function stopResize() {
    resizing = false;
    window.removeEventListener('mousemove', onResizeMove);
    window.removeEventListener('mouseup', stopResize);
    window.removeEventListener('touchmove', onResizeMove);
    window.removeEventListener('touchend', stopResize);
  }

  function startDrag(event: MouseEvent | TouchEvent) {
    dragging = true;
    const { x: clientX, y: clientY } = getClientPoint(event);
    startX = clientX;
    startY = clientY;
    startLeft = x;
    startTop = y;

    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchmove', onDragMove);
    window.addEventListener('touchend', stopDrag);
  }

  function onDragMove(event: MouseEvent | TouchEvent) {
    if (!dragging) return;
    const { x: clientX, y: clientY } = getClientPoint(event);
    const newX = startLeft + (clientX - startX);
    const newY = startTop + (clientY - startY);
    onDrag?.({ x: newX, y: newY });
  }

  function stopDrag() {
    dragging = false;
    window.removeEventListener('mousemove', onDragMove);
    window.removeEventListener('mouseup', stopDrag);
    window.removeEventListener('touchmove', onDragMove);
    window.removeEventListener('touchend', stopDrag);
  }
</script>

<div
  class="absolute border shadow bg-white"
  style="left: {x}px; top: {y}px; width: {width}px; height: {height}px;"
>
  <div
    class="drag-handle"
    role="button"
    tabindex="0"
    onmousedown={startDrag}
    ontouchstart={startDrag}
  >
    Drag me
  </div>

  <div class="w-full h-full overflow-hidden">
    <slot />
  </div>

  <div
    class="absolute right-0 bottom-0 h-6 w-6 cursor-se-resize bg-gray-500"
    role="button"
    tabindex="0"
    onmousedown={startResize}
    ontouchstart={startResize}
  ></div>
</div>

<style>
  .drag-handle {
    cursor: move;
    background-color: #333;
    color: white;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }
</style>
