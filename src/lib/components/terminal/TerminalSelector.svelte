<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { Theme } from '$lib/types/theme.types';
	import type { Project } from '$lib/types/project.types';

	export let items: (Theme | Project)[] = [];
	export let selectedIndex: number = 0;
	export let type: 'theme' | 'project' = 'theme';
	export let currentItem: string | undefined = undefined;

	let selector: HTMLDivElement;

	const dispatch = createEventDispatcher<{
		select: { index: number };
		cancel: void;
	}>();

	function getIndicator(item: Theme | Project): string {
		return selectedIndex === items.indexOf(item) ? '>' : ' ';
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			selectedIndex = (selectedIndex - 1 + items.length) % items.length;
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			selectedIndex = (selectedIndex + 1) % items.length;
		} else if (event.key === 'Enter') {
			event.preventDefault();
			dispatch('select', { index: selectedIndex });
		} else if (event.key === 'Escape') {
			event.preventDefault();
			dispatch('cancel');
		}
	}

	onMount(() => {
		selector?.focus();
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="selector" bind:this={selector} on:keydown={handleKeydown} tabindex="0">
	{#each items as item, i}
		<div class="option" class:selected={i === selectedIndex}>
			<span class="indicator">{getIndicator(item)}</span>
			<span class="name">{item.name}</span>
			{#if type === 'theme' && currentItem === item.name}
				<span class="current">(current)</span>
			{/if}
		</div>
	{/each}
</div>

<style>
	.selector {
		margin-top: 8px;
		margin-bottom: 8px;
		outline: none;
	}

	.option {
		padding: 4px 8px;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.option:hover {
		background-color: var(--theme-selection);
	}

	.option.selected {
		background-color: var(--theme-selection);
	}

	.indicator {
		width: 12px;
		display: inline-block;
		color: var(--theme-accent);
	}

	.name {
		color: var(--theme-fg);
	}

	.current {
		color: var(--theme-fg);
		opacity: 0.7;
		font-size: 0.9em;
		margin-left: 4px;
	}
</style>
