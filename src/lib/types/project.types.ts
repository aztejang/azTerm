export interface Project {
	name: string;
	description: string;
	technologies: string[];
	link?: string;
	[key: string]: unknown;
}
