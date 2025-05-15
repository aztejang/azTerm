export const commands = {
	help: {
		description: 'Shows all available commands'
	},
	about: {
		description: 'Whoami?'
	},
	projects: {
		description: 'Lists my latest projects'
	},
	clear: {
		description: 'Housecleaning!'
	},
	themes: {
		description: 'Change terminal theme - ooo, fancy'
	}
} as const;

export type Command = keyof typeof commands;
