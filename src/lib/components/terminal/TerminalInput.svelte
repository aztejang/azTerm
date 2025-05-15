<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { ui } from '$lib/content/ui';

	export let input: string = '';
	const dispatch = createEventDispatcher<{
		command: string;
	}>();

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			if (input.trim()) {
				dispatch('command', input);
				input = ''; // Clear the input
			}
		}
	}
</script>

<div class="input-container">
	<span class="prompt">
		<span class="">#</span>
		<span class="user">{ui.prompt.user}</span>
		<span class="">@</span>
		<span class="host">{ui.prompt.host}</span>
		<span class="path">{ui.prompt.path}</span>
		<span class="symbol">$</span>
	</span>
	<input
		type="text"
		bind:value={input}
		on:keydown={handleKeydown}
		placeholder=""
		autocomplete="off"
		spellcheck="false"
	/>
</div>

<style>
	.input-container {
		display: flex;
		align-items: center;
		gap: 0px;
		margin-top: 8px;
	}

	.prompt {
		white-space: nowrap;
		display: flex;
		align-items: center;
		gap: 0;
	}

	.prompt span {
		margin: 0;
		padding: 0;
	}

	.prompt .user {
		color: var(--theme-command);
	}

	.prompt .host {
		color: var(--theme-fg);
	}

	.prompt .path {
		color: var(--theme-path);
	}

	.prompt .symbol {
		color: var(--theme-accent);
		margin-right: 8px;
	}

	input {
		flex-grow: 1;
		background: none;
		border: none;
		color: var(--theme-fg);
		font-family: inherit;
		font-size: inherit;
		outline: none;
	}

	input::placeholder {
		color: var(--theme-fg);
		opacity: 0.5;
	}
</style>
