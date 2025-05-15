import { writable } from 'svelte/store';
import type { Theme, ThemeName } from '../types/theme.types';
import { STORAGE_KEYS } from '$lib/constants/terminal.constants';

export const themes: Record<ThemeName, Theme> = {
	Classic: {
		name: 'Classic',
		background: '#000000',
		backgroundRGB: '0, 0, 0',
		foreground: '#00ff00',
		accent: '#00ff00',
		header: '#333333',
		command: '#00ff00',
		path: '#00ff00',
		selection: 'rgba(255, 255, 255, 0.0)',
		opacity: 1,
		blur: '0px'
	},
	Neo: {
		name: 'Neo',
		background: '#0a1929',
		backgroundRGB: '10, 25, 41',
		foreground: '#61afef',
		accent: '#ff79c6',
		header: '#333333',
		command: '#ff79c6',
		path: '#ff79c6',
		selection: 'rgba(255, 255, 255, 0.0)',
		opacity: 0.85,
		blur: '5px'
	},
	Dracula: {
		name: 'Dracula',
		background: '#282a36',
		backgroundRGB: '40, 42, 54',
		foreground: '#f8f8f2',
		accent: '#bd93f9',
		header: '#44475a',
		command: '#ff79c6',
		path: '#50fa7b',
		selection: 'rgba(255, 255, 255, 0.0)',
		opacity: 0.95,
		blur: '0px'
	}
};

// Get the saved theme from localStorage or default to Neo
const savedTheme =
	typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.SELECTED_THEME) : null;

const initialTheme = savedTheme ? themes[savedTheme as ThemeName] : themes.Neo;

const { subscribe, set } = writable<Theme>(initialTheme);

export const currentTheme = {
	subscribe,
	set: (theme: Theme) => {
		localStorage.setItem(STORAGE_KEYS.SELECTED_THEME, theme.name);
		set(theme);
	}
};
