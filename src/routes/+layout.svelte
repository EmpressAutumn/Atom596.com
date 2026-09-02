<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
    import "$lib/styles/global.css"

	let { children } = $props();

    export const prerender = true;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<h1>Atom596.com</h1>

{@render children()}
