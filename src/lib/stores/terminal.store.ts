import { writable } from 'svelte/store';
import { ui } from '$lib/content/ui';

interface TerminalState {
	output: string[];
	selectedThemeIndex: number;
	showThemeSelector: boolean;
	selectedProjectIndex: number;
	showProjectSelector: boolean;
}

const initialState: TerminalState = {
	output: [ui.asciiArt, '', ui.welcomeMessage],
	selectedThemeIndex: 0,
	showThemeSelector: false,
	selectedProjectIndex: 0,
	showProjectSelector: false
};

const { subscribe, set, update } = writable<TerminalState>(initialState);

export const terminalState = {
	subscribe,
	set,
	update,
	clear: () => set(initialState),
	appendOutput: (newOutput: string[]) =>
		update((state) => ({ ...state, output: [...state.output, ...newOutput] })),
	replaceOutput: (newOutput: string[]) => update((state) => ({ ...state, output: newOutput })),
	setThemeSelector: (show: boolean, index: number = 0) =>
		update((state) => ({ ...state, showThemeSelector: show, selectedThemeIndex: index })),
	setProjectSelector: (show: boolean, index: number = 0) =>
		update((state) => ({ ...state, showProjectSelector: show, selectedProjectIndex: index }))
};
