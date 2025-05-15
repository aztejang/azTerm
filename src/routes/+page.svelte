<script lang="ts">
	import Terminal from '$lib/components/Terminal.svelte';
	import { currentTheme } from '$lib/stores/theme.store';
</script>

<div
	class="desktop"
	class:classic={$currentTheme.name === 'Classic'}
	class:neo={$currentTheme.name === 'Neo'}
	class:dracula={$currentTheme.name === 'Dracula'}
>
	<Terminal />
</div>

<style>
	.desktop {
		width: 100vw;
		height: 100vh;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		position: relative;
		overflow: hidden;
	}

	.classic {
		background-image: url('/images/background-classic.jpg');
	}

	.neo {
		background-image: url('/images/background-neo.png');
	}

	.dracula {
		background-image: url('/images/background-dracula.png');
	}

	:global(body) {
		margin: 0;
		padding: 0;
		overflow: hidden;
	}
</style>
