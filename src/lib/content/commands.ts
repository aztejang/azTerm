export const commands = {
	help: {
		description: 'Shows all available commands'
	},
	about: {
		description: 'Who am I?'
	},
	projects: {
		description: 'Lists some of my projects'
	},
	clear: {
		description: 'Clear the terminal'
	},
	themes: {
		description: 'Change terminal theme'
	}
} as const;

export type Command = keyof typeof commands;
