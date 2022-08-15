<script lang="ts">
	import { onMount } from 'svelte';
	import { RenderMFE } from '$lib/RenderMfe';

	const host = 'http://localhost:3000';
	onMount(async () => {
		const name = 'sample';
		const windowObject = window as { [key: string]: any };
		await RenderMFE(name, host);
		windowObject[`unmount${name}`] && windowObject[`unmount${name}`](`${name}-container`);
	});
</script>

<main id="sample-container">
	<div id="sample-container">
		<h1>Sample</h1>
	</div>
</main>
