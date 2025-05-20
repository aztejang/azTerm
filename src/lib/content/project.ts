import type { Project } from '$lib/types/project.types';

export const projects: Project[] = [
	{
		name: 'azTerm',
		description: 'A terminal-style personal website built with SvelteKit',
		technologies: ['SvelteKit', 'TypeScript', 'Gitub']
	},
	{
		name: 'Synsam',
		description:
			'A tool for Synsam employees to handle eyewear subscriptions, payments and products',
		technologies: ['Angular', 'TypeScript', 'C#', 'Azure']
	},
	{
		name: 'Climateview',
		description:
			'An application to help cities and municipalities manage and plan their journey towards net zero emissions',
		technologies: ['Angular', 'TypeScript', 'Angular Material', 'Azure']
	},
	{
		name: 'Toptracer',
		description:
			'A backoffice tool for Toptracer range owners to manage bays, over-net shot alarms, events and range-specific data',
		technologies: ['Angular', 'TypeScript', 'PostgreSQL', 'Docker', 'Python (Flask)']
	},
	{
		name: 'COLIVE',
		description:
			'A back office tool used to create and manage future and current co-living apartment properties.',
		technologies: ['React', 'Styled Components', 'Typescript', 'Heroku', 'PostgreSQL', 'Bootstrap']
	}
];
