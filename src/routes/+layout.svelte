<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";

    import "$lib/assets/styles/layout.css";
    import "$lib/assets/styles/global.css";

    import NavButton from "$lib/components/NavButton.svelte";
    import {type Component, onMount} from "svelte";

    // Border Components
    import Corner from "$lib/components/border_elements/Corner.svelte";
    import Edge from "$lib/components/border_elements/Edge.svelte";
    import SimpleDecorationOne from "$lib/components/border_elements/SimpleDecorationOne.svelte";

	let { children } = $props();

    let topbar: HTMLDivElement;
    let cornerLength = 60;

    const borderDecorations: Record<string, [Component, number]> = {
        "simpleOne": [SimpleDecorationOne, 88]
    };

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

<div id="main-section">
    <div id="border-container">
        <div id="content-box"> {@render children()} </div>

        <!-- Border corners -->
        <!-- Top Left --> <div class="border-component" style="top:0; left:0;"><Corner/></div>
        <!-- Top Right --> <div class="border-component" style="top:0; left:100%; rotate:90deg;"><Corner/></div>
        <!-- Bottom Right --> <div class="border-component" style="top:100%; left:100%; rotate:180deg;"><Corner/></div>
        <!-- Bottom Left --> <div class="border-component" style="top:100%; left:0; rotate:270deg;"><Corner/></div>

        <!-- Border edges -->
        <!-- Top --> <div class="border-component" style="top:0; left:{cornerLength}px;">
            <Edge direction="up"
                    simpleDecoration={borderDecorations["simpleOne"]}
                    grandDecoration={borderDecorations["simpleOne"]}
                    cornerLength={cornerLength}
            />
        </div>

        <!-- Right --> <div class="border-component" style="top:{cornerLength}px; left:100%;">
            <Edge direction="right"
                  simpleDecoration={borderDecorations["simpleOne"]}
                  grandDecoration={borderDecorations["simpleOne"]}
                  cornerLength={cornerLength}
            />
        </div>
        <!-- Bottom --> <div class="border-component" style="top:100%; left:calc(100% - {cornerLength}px);">
            <Edge direction="down"
                  simpleDecoration={borderDecorations["simpleOne"]}
                  grandDecoration={borderDecorations["simpleOne"]}
                  cornerLength={cornerLength}
            />
        </div>
        <!-- Left --> <div class="border-component" style="top:calc(100% - {cornerLength}px); left:0;">
            <Edge direction="left"
                  simpleDecoration={borderDecorations["simpleOne"]}
                  grandDecoration={borderDecorations["simpleOne"]}
                  cornerLength={cornerLength}
            />
        </div>
    </div>
</div>

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
