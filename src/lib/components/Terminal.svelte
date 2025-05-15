<script lang="ts">
	import { onMount } from 'svelte';
	import { currentTheme } from '$lib/stores/theme.store';
	import { ui } from '$lib/content/ui';
	import { terminalState } from '$lib/stores/terminal.store';
	import { TERMINAL, CSS_VARIABLES } from '$lib/constants/terminal.constants';
	import { focusAndScroll } from '$lib/utils/terminal.utils';
	import TerminalHeader from './terminal/TerminalHeader.svelte';
	import TerminalOutput from './terminal/TerminalOutput.svelte';
	import TerminalResizeMove from './terminal/TerminalResizeMove.svelte';
	import {
		processCommand,
		handleThemeSelection,
		handleProjectSelection,
		handleSelectionCancel
	} from '$lib/services/command.service';

	let terminalContent: HTMLDivElement;
	let terminal: HTMLDivElement;
	const WELCOME_MESSAGE: string = ui.welcomeMessage;
	const ASCII_ART: string = ui.asciiArt;
	let isMobile: boolean = false;

	function checkMobile() {
		isMobile = window.innerWidth <= 768;
	}

	function handleCommand(cmd: string) {
		processCommand(cmd);
		focusAndScroll('input', terminalContent);
	}

	function handleSelection(type: 'theme' | 'project', event: CustomEvent<{ index: number }>) {
		if (type === 'theme') {
			handleThemeSelection(event.detail.index);
		} else {
			handleProjectSelection(event.detail.index);
		}
		focusAndScroll('input', terminalContent);
	}

	function handleCancel(type: 'theme' | 'project') {
		handleSelectionCancel(type);
		focusAndScroll('input', terminalContent);
	}

	function handleResize(
		event: CustomEvent<{ width: number; height: number; left: number; top: number }>
	) {
		const { width, height, left, top } = event.detail;
		terminal.style.width = `${width}px`;
		terminal.style.height = `${height}px`;
		terminal.style.left = `${left}px`;
		terminal.style.top = `${top}px`;
	}

	function handleMove(event: CustomEvent<{ left: number; top: number }>) {
		const { left, top } = event.detail;
		terminal.style.left = `${left}px`;
		terminal.style.top = `${top}px`;
	}

	onMount(() => {
		// Set CSS custom properties for terminal dimensions
		document.documentElement.style.setProperty(
			CSS_VARIABLES.TERMINAL_WIDTH,
			`${TERMINAL.DEFAULT_WIDTH}px`
		);
		document.documentElement.style.setProperty(
			CSS_VARIABLES.TERMINAL_HEIGHT,
			`${TERMINAL.DEFAULT_HEIGHT}px`
		);
		document.documentElement.style.setProperty(CSS_VARIABLES.TERMINAL_LEFT, TERMINAL.DEFAULT_LEFT);
		document.documentElement.style.setProperty(CSS_VARIABLES.TERMINAL_TOP, TERMINAL.DEFAULT_TOP);
		document.documentElement.style.setProperty(
			CSS_VARIABLES.TERMINAL_MIN_WIDTH,
			`${TERMINAL.MIN_WIDTH}px`
		);
		document.documentElement.style.setProperty(
			CSS_VARIABLES.TERMINAL_MIN_HEIGHT,
			`${TERMINAL.MIN_HEIGHT}px`
		);
		document.documentElement.style.setProperty(
			CSS_VARIABLES.TERMINAL_MOBILE_MIN_WIDTH,
			`${TERMINAL.MOBILE_MIN_WIDTH}px`
		);
		document.documentElement.style.setProperty(
			CSS_VARIABLES.TERMINAL_MOBILE_MIN_HEIGHT,
			`${TERMINAL.MOBILE_MIN_HEIGHT}px`
		);

		// Check initial mobile state
		checkMobile();

		// Add resize listener for mobile detection
		window.addEventListener('resize', checkMobile);

		// Set initial output with ASCII art and appropriate welcome message
		const welcomeText = isMobile ? WELCOME_MESSAGE + ui.mobileMessage : WELCOME_MESSAGE;
		terminalState.replaceOutput([ASCII_ART, '', welcomeText]);

		// Focus the input on mount
		const inputElement = document.querySelector('input');
		if (inputElement) inputElement.focus();

		// Cleanup
		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	class="terminal"
	style="
		{CSS_VARIABLES.THEME_BG}: {$currentTheme.background};
		{CSS_VARIABLES.THEME_FG}: {$currentTheme.foreground};
		{CSS_VARIABLES.THEME_ACCENT}: {$currentTheme.accent};
		{CSS_VARIABLES.THEME_HEADER}: {$currentTheme.header};
		{CSS_VARIABLES.THEME_COMMAND}: {$currentTheme.command};
		{CSS_VARIABLES.THEME_PATH}: {$currentTheme.path};
		{CSS_VARIABLES.THEME_SELECTION}: {$currentTheme.selection};
		{CSS_VARIABLES.THEME_OPACITY}: {$currentTheme.opacity};
		{CSS_VARIABLES.THEME_BLUR}: {$currentTheme.blur};
		{CSS_VARIABLES.THEME_BG_RGB}: {$currentTheme.backgroundRGB};
	"
	bind:this={terminal}
	role="application"
	tabindex="0"
>
	<TerminalHeader on:move={handleMove} />

	<div class="terminal-content" bind:this={terminalContent}>
		<TerminalOutput
			on:select={(e) => {
				const customEvent = new CustomEvent('select', { detail: { index: e.detail.index } });
				handleSelection(e.detail.type, customEvent);
			}}
			on:cancel={(e) => handleCancel(e.detail.type)}
			on:command={(e) => handleCommand(e.detail)}
		/>
	</div>

	<TerminalResizeMove
		{terminal}
		minWidth={TERMINAL.MIN_WIDTH}
		minHeight={TERMINAL.MIN_HEIGHT}
		on:resize={handleResize}
		on:move={handleMove}
	/>
</div>

<style>
	.terminal {
		width: var(--terminal-width, 800px);
		height: var(--terminal-height, 500px);
		background-color: var(--theme-bg);
		border-radius: 6px;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
		font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
		overflow: hidden;
		border: 1px solid #333;
		position: absolute;
		left: var(--terminal-left, calc(50vw - 400px));
		top: var(--terminal-top, calc(50vh - 250px));
		cursor: default;
		min-width: var(--terminal-min-width, 441px);
		min-height: var(--terminal-min-height, 302px);
		user-select: none;
		backdrop-filter: blur(var(--theme-blur, 0px));
		background-color: rgba(var(--theme-bg-rgb), var(--theme-opacity));
	}

	.terminal:focus {
		outline: none;
	}

	.terminal-content {
		padding: 16px;
		color: var(--theme-fg);
		height: calc(100% - 60px);
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		user-select: none;
	}

	@media (max-width: 768px) {
		.terminal {
			width: 95vw !important;
			height: 90vh !important;
			left: 2.5vw !important;
			top: 5vh !important;
			min-width: var(--terminal-mobile-min-width, 320px) !important;
			min-height: var(--terminal-mobile-min-height, 200px) !important;
			font-size: 14px;
		}

		.terminal-content {
			padding: 12px;
		}
	}

	@media (max-width: 480px) {
		.terminal {
			width: 100vw !important;
			height: 100vh !important;
			left: 0 !important;
			top: 0 !important;
			border-radius: 0;
			font-size: 12px;
		}

		.terminal-content {
			padding: 8px;
		}
	}
</style>
