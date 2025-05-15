<script lang="ts">
	import { terminalState } from '$lib/stores/terminal.store';
	import { ui } from '$lib/content/ui';
	import TerminalSelector from './TerminalSelector.svelte';
	import TerminalInput from './TerminalInput.svelte';
	import { currentTheme, themes } from '$lib/stores/theme.store';
	import { projects } from '$lib/content/project';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		select: { type: 'theme' | 'project'; index: number };
		cancel: { type: 'theme' | 'project' };
		command: string;
	}>();

	const themeList = Object.values(themes);
	const ASCII_ART: string = ui.asciiArt;
	let input = '';

	function handleThemeSelect(event: CustomEvent<{ index: number }>) {
		dispatch('select', { type: 'theme', index: event.detail.index });
	}

	function handleProjectSelect(event: CustomEvent<{ index: number }>) {
		dispatch('select', { type: 'project', index: event.detail.index });
	}
</script>

<div class="output-container">
	{#each $terminalState.output as line}
		<div class="output-line" class:ascii-art={line === ASCII_ART}>
			{@html line}
		</div>
	{/each}

	{#if $terminalState.showThemeSelector}
		<TerminalSelector
			items={themeList}
			bind:selectedIndex={$terminalState.selectedThemeIndex}
			type="theme"
			currentItem={$currentTheme.name}
			on:select={handleThemeSelect}
			on:cancel={() => dispatch('cancel', { type: 'theme' })}
		/>
	{/if}

	{#if $terminalState.showProjectSelector}
		<TerminalSelector
			items={projects}
			bind:selectedIndex={$terminalState.selectedProjectIndex}
			type="project"
			on:select={handleProjectSelect}
			on:cancel={() => dispatch('cancel', { type: 'project' })}
		/>
	{/if}

	{#if !$terminalState.showThemeSelector && !$terminalState.showProjectSelector}
		<TerminalInput bind:input on:command={(e) => dispatch('command', e.detail)} />
	{/if}
</div>

<style>
	.output-container {
		flex-grow: 1;
		user-select: text;
	}

	.output-line {
		white-space: pre-wrap;
		line-height: 1.4;
		margin-top: 8px;
	}

	.ascii-art {
		font-size: 0.7em;
		line-height: 1.2;
		letter-spacing: 0.5px;
		color: var(--theme-command);
	}

	.output-line :global(.command) {
		color: var(--theme-command);
	}

	.output-line :global(.help-text) {
		color: var(--theme-command);
	}

	.output-line :global(.accent) {
		color: var(--theme-accent);
	}

	.output-line :global(a) {
		color: var(--theme-accent);
		text-decoration: underline;
		position: relative;
	}

	.output-line :global(a:hover) {
		text-decoration: underline;
		cursor: pointer;
	}
</style>
