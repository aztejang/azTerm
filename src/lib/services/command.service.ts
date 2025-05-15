import { currentTheme, themes } from '$lib/stores/theme.store';
import { commands, type Command } from '$lib/content/commands';
import { projects } from '$lib/content/project';
import { about } from '$lib/content/about';
import { ui } from '$lib/content/ui';
import { terminalState } from '$lib/stores/terminal.store';
import { focusElement } from '$lib/utils/terminal.utils';

export interface CommandResult {
	output: string[];
	showThemeSelector?: boolean;
	showProjectSelector?: boolean;
	selectedThemeIndex?: number;
	selectedProjectIndex?: number;
	shouldClear?: boolean;
}

export function processCommand(cmd: string): void {
	if (!cmd.trim()) return;

	const command = cmd.trim().toLowerCase() as Command;
	const result: CommandResult = {
		output: [`#${ui.prompt.user}@${ui.prompt.host}${ui.prompt.path}$ ${cmd}`]
	};

	switch (command) {
		case 'help':
			result.output = [
				...result.output,
				'',
				...Object.entries(commands).map(
					([cmd, info]) => `<span class="command">${cmd}</span>\n    ${info.description}`
				)
			];
			break;

		case 'about':
			result.output = [
				...result.output,
				`<span class="accent">${about.name}</span>`,
				`${about.bio}`,
				`<span class="accent">Skills:</span>`,
				...about.skills.map((skill) => `- ${skill}`),
				`<span class="accent">Contact:</span>`,
				`Email: <a href="mailto:${about.contact.email}">${about.contact.email}</a>`,
				`GitHub: <a href="${about.contact.github}" target="_blank">${about.contact.github}</a>`,
				`LinkedIn: <a href="${about.contact.linkedin}" target="_blank">${about.contact.linkedin}</a>`
			];
			break;

		case 'projects':
			result.showProjectSelector = true;
			result.output = [
				...result.output,
				`<span class="accent">${ui.selection.selectProject}</span>`
			];
			break;

		case 'themes':
			result.showThemeSelector = true;
			let currentThemeName = '';
			currentTheme.subscribe((theme) => {
				currentThemeName = theme.name;
			})();
			result.selectedThemeIndex = Object.values(themes).findIndex(
				(theme) => theme.name === currentThemeName
			);
			result.output = [...result.output, `<span class="accent">${ui.selection.selectTheme}</span>`];
			break;

		case 'clear':
			result.output = [ui.asciiArt, '', ui.welcomeMessage];
			result.shouldClear = true;
			break;

		default:
			result.output = [...result.output, `${ui.error.commandNotFound}`];
	}

	// Update terminal state
	if (result.shouldClear) {
		terminalState.replaceOutput(result.output);
	} else {
		terminalState.appendOutput(result.output);
	}

	// Handle selectors
	if (result.showThemeSelector) {
		terminalState.setThemeSelector(true, result.selectedThemeIndex);
		setTimeout(() => focusElement('.selector'), 0);
	}

	if (result.showProjectSelector) {
		terminalState.setProjectSelector(true);
		setTimeout(() => focusElement('.selector'), 0);
	}
}

export function handleThemeSelection(selectedThemeIndex: number): void {
	const themeList = Object.values(themes);
	const selectedTheme = themeList[selectedThemeIndex];
	currentTheme.set(selectedTheme);
	terminalState.setThemeSelector(false);

	// Replace the last line (selection prompt) with the result
	terminalState.update((state) => ({
		...state,
		output: [
			...state.output.slice(0, -1),
			`<span class="accent">${ui.selection.themeChanged.replace('{theme}', selectedTheme.name)}</span>`
		]
	}));
}

export function handleProjectSelection(selectedProjectIndex: number): void {
	const selectedProject = projects[selectedProjectIndex];
	terminalState.setProjectSelector(false);

	// Replace the last line (selection prompt) with the result
	terminalState.update((state) => ({
		...state,
		output: [
			...state.output.slice(0, -1),
			`<span class="accent">${selectedProject.name}</span>`,
			`${selectedProject.description}`,
			`<span class="accent">Technologies:</span>`,
			...selectedProject.technologies.map((tech) => `- ${tech}`)
		]
	}));
}

export function handleSelectionCancel(type: 'theme' | 'project'): void {
	if (type === 'theme') {
		terminalState.setThemeSelector(false);
		// Replace the last line (selection prompt) with the cancellation message
		terminalState.update((state) => ({
			...state,
			output: [...state.output.slice(0, -1), `${ui.selection.themeCancelled}`]
		}));
	} else {
		terminalState.setProjectSelector(false);
		// Replace the last line (selection prompt) with the cancellation message
		terminalState.update((state) => ({
			...state,
			output: [...state.output.slice(0, -1), `${ui.selection.projectCancelled}`]
		}));
	}
}
