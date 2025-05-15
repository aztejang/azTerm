export const ui = {
	asciiArt: `  @@@@@@  @@@@@@@@ @@@@@@@ @@@@@@@@ @@@@@@@  @@@@@@@@@@ 
 @@!  @@@      @@!   @@!   @@!      @@!  @@@ @@! @@! @@!
 @!@!@!@!    @!!     @!!   @!!!:!   @!@!!@!  @!! !!@ @!@
 !!:  !!!  !!:       !!:   !!:      !!: :!!  !!:     !!:
  :   : : :.::.: :    :    : :: :::  :   : :  :      :  `,
	welcomeMessage: `\nWelcome to azTerm v1.0\nType <span class="help-text">help</span> to see available commands`,
	mobileMessage: `\n<span class="accent">💻 Best experienced on a computer</span>`,
	prompt: {
		user: 'usr',
		host: 'azra.nu',
		path: '~'
	},
	error: {
		commandNotFound: 'Command not found.',
		invalidInput: 'Invalid input.'
	},
	selection: {
		projectCancelled: 'Project selection cancelled',
		themeCancelled: 'Theme selection cancelled',
		themeChanged: 'Theme changed to {theme}',
		selectProject: 'Select a project with arrow keys and Enter. To cancel, press Escape.',
		selectTheme: 'Select a theme with arrow keys and Enter. To cancel, press Escape.'
	},
	terminal: {
		title: 'azTerm'
	}
} as const;
