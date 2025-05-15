export type ThemeName = 'Classic' | 'Neo' | 'Dracula';

export interface Theme {
	name: ThemeName;
	background: string;
	backgroundRGB: string;
	foreground: string;
	accent: string;
	header: string;
	command: string;
	path: string;
	selection: string;
	opacity: number;
	blur: string;
	[key: string]: unknown;
}
