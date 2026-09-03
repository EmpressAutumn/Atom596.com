<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
    import "$lib/assets/styles/global.css";
    import NavButton from "$lib/components/NavButton.svelte";
    import { onMount } from "svelte";

	let { children } = $props();

    let topbar: HTMLDivElement;

    onMount(() => {
        const updateHeight = () => {
            document.documentElement.style.setProperty(
                "--topbar-height",
                `${topbar.getBoundingClientRect().height}px`
            );
        };

        const observer = new ResizeObserver(updateHeight);
        observer.observe(topbar);

        updateHeight();

        return () => observer.disconnect();
    });
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div id="top-section" bind:this={topbar}>
    <p id="top-title">Atom596.com</p>
    <div id="navbar" style="vertical-align:middle;">
        <!-- <div class="navbar-extra">
            <p>Atom596.com</p>
        </div> -->
        <NavButton text="Home" onClick={() => { window.location.href = "/"; }} />
        <NavButton text="Dev Notes" onClick={() => { window.location.href = "/devnotes"; }} />
        <!-- <div class="navbar-extra">
            <NavButton text="Settings" onClick={() => {}} />
        </div> -->
    </div>
</div>

<div id="content-section">
    <div id="contents">
        {@render children()}
    </div>
</div>
