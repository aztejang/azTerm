export const TERMINAL = {
	MIN_WIDTH: 441,
	MIN_HEIGHT: 302,
	MOBILE_MIN_WIDTH: 320,
	MOBILE_MIN_HEIGHT: 200,
	DEFAULT_WIDTH: 800,
	DEFAULT_HEIGHT: 500,
	DEFAULT_LEFT: 'calc(50vw - 400px)',
	DEFAULT_TOP: 'calc(50vh - 250px)'
} as const;

export const CSS_VARIABLES = {
	TERMINAL_WIDTH: '--terminal-width',
	TERMINAL_HEIGHT: '--terminal-height',
	TERMINAL_LEFT: '--terminal-left',
	TERMINAL_TOP: '--terminal-top',
	TERMINAL_MIN_WIDTH: '--terminal-min-width',
	TERMINAL_MIN_HEIGHT: '--terminal-min-height',
	TERMINAL_MOBILE_MIN_WIDTH: '--terminal-mobile-min-width',
	TERMINAL_MOBILE_MIN_HEIGHT: '--terminal-mobile-min-height',
	THEME_BG: '--theme-bg',
	THEME_FG: '--theme-fg',
	THEME_ACCENT: '--theme-accent',
	THEME_HEADER: '--theme-header',
	THEME_COMMAND: '--theme-command',
	THEME_PATH: '--theme-path',
	THEME_SELECTION: '--theme-selection',
	THEME_OPACITY: '--theme-opacity',
	THEME_BLUR: '--theme-blur',
	THEME_BG_RGB: '--theme-bg-rgb'
} as const;

export const STORAGE_KEYS = {
	SELECTED_THEME: 'selectedTheme'
} as const;

export const CSS_VALUES = {
	BORDER_RADIUS: '6px',
	BOX_SHADOW: '0 10px 20px rgba(0, 0, 0, 0.3)',
	FONT_FAMILY: "'Fira Code', 'Consolas', 'Monaco', monospace",
	BORDER: '1px solid #333',
	PADDING: '16px',
	LINE_HEIGHT: '1.4',
	ASCII_ART_FONT_SIZE: '0.7em',
	ASCII_ART_LINE_HEIGHT: '1.2',
	ASCII_ART_LETTER_SPACING: '0.5px'
} as const;
