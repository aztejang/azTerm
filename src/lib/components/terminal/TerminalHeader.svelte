<script lang="ts">
	import { ui } from '$lib/content/ui';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		move: { left: number; top: number };
	}>();

	let isDragging = false;
	let startX = 0;
	let startY = 0;
	let startLeft = 0;
	let startTop = 0;

	function handleMouseDown(event: MouseEvent) {
		isDragging = true;
		startX = event.clientX;
		startY = event.clientY;
		const terminal = document.querySelector('.terminal') as HTMLElement;
		const style = window.getComputedStyle(terminal);
		startLeft = parseFloat(style.left);
		startTop = parseFloat(style.top);
	}

	function handleMouseMove(event: MouseEvent) {
		if (isDragging) {
			const dx = event.clientX - startX;
			const dy = event.clientY - startY;
			dispatch('move', { left: startLeft + dx, top: startTop + dy });
		}
	}

	function handleMouseUp() {
		isDragging = false;
	}

	if (typeof window !== 'undefined') {
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="terminal-header" on:mousedown={handleMouseDown}>
	<div class="terminal-buttons">
		<div class="button close"></div>
		<div class="button minimize"></div>
		<div class="button maximize"></div>
	</div>
	<div class="terminal-title">{ui.terminal.title}</div>
</div>

<style>
	.terminal-header {
		background-color: var(--theme-header);
		padding: 8px;
		position: relative;
		display: flex;
		align-items: center;
		border-top-left-radius: 6px;
		border-top-right-radius: 6px;
		cursor: move;
		user-select: none;
		z-index: 1;
	}

	.terminal-buttons {
		display: flex;
		gap: 6px;
		z-index: 1;
	}

	.button {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}

	.close {
		background-color: #ff5f56;
	}

	.minimize {
		background-color: #ffbd2e;
	}

	.maximize {
		background-color: #27c93f;
	}

	.terminal-title {
		color: #fff;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		text-align: center;
		font-size: 14px;
		pointer-events: none;
	}
</style>
