<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let terminal: HTMLDivElement;
	export let minWidth: number = 441;
	export let minHeight: number = 302;

	const dispatch = createEventDispatcher<{
		resize: { width: number; height: number; left: number; top: number };
		move: { left: number; top: number };
	}>();

	let isDragging: boolean = false;
	let isResizing: boolean = false;
	let startX: number = 0;
	let startY: number = 0;
	let startLeft: number = 0;
	let startTop: number = 0;
	let startWidth: number = 0;
	let startHeight: number = 0;
	let resizeDirection: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw' | null = null;

	function handleMouseDown(event: MouseEvent) {
		if (event.target instanceof HTMLElement) {
			const resizeHandle = event.target.closest('.resize-handle');
			if (resizeHandle) {
				isResizing = true;
				resizeDirection = resizeHandle.getAttribute('data-direction') as any;
				startX = event.clientX;
				startY = event.clientY;
				const style = window.getComputedStyle(terminal);
				startWidth = parseFloat(style.width);
				startHeight = parseFloat(style.height);
				startLeft = parseFloat(style.left);
				startTop = parseFloat(style.top);
			} else if (event.target.closest('.terminal-header')) {
				isDragging = true;
				startX = event.clientX;
				startY = event.clientY;
				const style = window.getComputedStyle(terminal);
				startLeft = parseFloat(style.left);
				startTop = parseFloat(style.top);
			}
		}
	}

	function handleMouseMove(event: MouseEvent) {
		if (isResizing && resizeDirection) {
			const dx = event.clientX - startX;
			const dy = event.clientY - startY;

			let newWidth = startWidth;
			let newHeight = startHeight;
			let newLeft = startLeft;
			let newTop = startTop;

			// Handle horizontal resizing
			if (resizeDirection.includes('e')) {
				newWidth = Math.max(minWidth, startWidth + dx);
			}
			if (resizeDirection.includes('w')) {
				const widthChange = Math.min(dx, startWidth - minWidth);
				newWidth = startWidth - widthChange;
				newLeft = startLeft + widthChange;
			}

			// Handle vertical resizing
			if (resizeDirection.includes('s')) {
				newHeight = Math.max(minHeight, startHeight + dy);
			}
			if (resizeDirection.includes('n')) {
				const heightChange = Math.min(dy, startHeight - minHeight);
				newHeight = startHeight - heightChange;
				newTop = startTop + heightChange;
			}

			dispatch('resize', { width: newWidth, height: newHeight, left: newLeft, top: newTop });
		} else if (isDragging) {
			const dx = event.clientX - startX;
			const dy = event.clientY - startY;
			dispatch('move', { left: startLeft + dx, top: startTop + dy });
		}
	}

	function handleMouseUp() {
		isDragging = false;
		isResizing = false;
		resizeDirection = null;
	}

	// Add global mouse event listeners
	if (typeof window !== 'undefined') {
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="resize-container" on:mousedown={handleMouseDown}>
	<div class="resize-handle n" data-direction="n" role="none"></div>
	<div class="resize-handle s" data-direction="s" role="none"></div>
	<div class="resize-handle e" data-direction="e" role="none"></div>
	<div class="resize-handle w" data-direction="w" role="none"></div>
	<div class="resize-handle ne" data-direction="ne" role="none"></div>
	<div class="resize-handle nw" data-direction="nw" role="none"></div>
	<div class="resize-handle se" data-direction="se" role="none"></div>
	<div class="resize-handle sw" data-direction="sw" role="none"></div>
</div>

<style>
	.resize-container {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;
	}

	.resize-handle {
		position: absolute;
		background: transparent;
		z-index: 10;
		pointer-events: auto;
	}

	.resize-handle.n {
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		cursor: ns-resize;
	}

	.resize-handle.s {
		bottom: 0;
		left: 0;
		right: 0;
		height: 4px;
		cursor: ns-resize;
	}

	.resize-handle.e {
		top: 0;
		right: 0;
		bottom: 0;
		width: 4px;
		cursor: ew-resize;
	}

	.resize-handle.w {
		top: 0;
		left: 0;
		bottom: 0;
		width: 4px;
		cursor: ew-resize;
	}

	.resize-handle.ne {
		top: 0;
		right: 0;
		width: 8px;
		height: 8px;
		cursor: ne-resize;
	}

	.resize-handle.nw {
		top: 0;
		left: 0;
		width: 8px;
		height: 8px;
		cursor: nw-resize;
	}

	.resize-handle.se {
		bottom: 0;
		right: 0;
		width: 8px;
		height: 8px;
		cursor: se-resize;
	}

	.resize-handle.sw {
		bottom: 0;
		left: 0;
		width: 8px;
		height: 8px;
		cursor: sw-resize;
	}
</style>
