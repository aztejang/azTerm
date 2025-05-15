import type { Project } from '$lib/types/project.types';

export const projects: Project[] = [
	{
		name: 'azTerm',
		description: 'A terminal-style personal website built with SvelteKit',
		technologies: ['SvelteKit', 'TypeScript']
	},
	{
		name: 'Synsam',
		description:
			'A tool for Synsam employees to handle eyewear subscriptions, payments and membership',
		technologies: ['Angular', 'TypeScript', 'C#', 'Azure']
	},
	{
		name: 'Climateview',
		description:
			'An application to help cities and municipalities manage and plan their climate actions',
		technologies: ['Angular', 'TypeScript', 'Angular Material']
	},
	{
		name: 'Toptracer',
		description:
			'A backoffice tool for Toptracer range owners to manage bays, over-net shot alarms, events and range-specific data',
		technologies: ['Angular', 'TypeScript', 'Python']
	}
];
