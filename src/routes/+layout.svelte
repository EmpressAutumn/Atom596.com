<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
    import "$lib/assets/styles/global.css";
    import NavButton from "$lib/components/NavButton.svelte";
    import {type Component, onMount} from "svelte";

    // Border Components
    import TwoBars from "$lib/components/border_elements/TwoBars.svelte";
    import Corner from "$lib/components/border_elements/Corner.svelte";
    import SimpleDecorationOne from "$lib/components/border_elements/SimpleDecorationOne.svelte";

    const borderComponents: Record<string, Record<string, [Component, number]>> = {
        "simpleDecorations": {
            "one": [SimpleDecorationOne, 88]
        }
    }

	let { children } = $props();

    let topbar: HTMLDivElement;

    const findBestDecoration = (decorationList: Record<string, [Component, number]>, width: number) => {
        let closestBarRatio: Record<string, number> = ["", 0];
        for (let decorationName in decorationList) {
            const decorationWidth = decorationList[decorationName][1];
            const barRatio = (width - decorationWidth) / (2 * decorationWidth);

            if () // abs(3 - barRatio) < abs(3 - closestBarRatio

            console.log(closestBarRatio);
            // Get decoration width
        }
    }

    onMount(() => {
        const updateHeight = () => {
            document.documentElement.style.setProperty(
                "--topbar-height",
                `${topbar.getBoundingClientRect().height}px`
            );
        };

        const createContentFrame = () => {
            let contentBox = document.getElementById("content-box");
            if (contentBox) {
                let barWidth = contentBox.offsetWidth - 120;
                let barHeight = contentBox.offsetHeight - 120;

                findBestDecoration(borderComponents["simpleDecorations"], barWidth);
                // Create top bar
                // Create bottom bar
            }
        };

        const observer = new ResizeObserver(updateHeight);
        observer.observe(topbar);

        updateHeight();
        createContentFrame();

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
        <NavButton text="Autumn Insights" onClick={() => { window.location.href = "/autumn_insights"; }} />
        <!-- <div class="navbar-extra">
            <NavButton text="Settings" onClick={() => {}} />
        </div> -->
    </div>
</div>

<div id="content-section">
    <div id="content-box">
            {@render children()}
    </div>
</div>
