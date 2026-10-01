<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";

    import "$lib/assets/styles/layout.css";
    import "$lib/assets/styles/global.css";

    import NavButton from "$lib/components/NavButton.svelte";
    import {type Component, mount, onMount, tick} from "svelte";

    // Border Components
    import TwoBars from "$lib/components/border_elements/TwoBars.svelte";
    import Corner from "$lib/components/border_elements/Corner.svelte";
    import SimpleDecorationOne from "$lib/components/border_elements/SimpleDecorationOne.svelte";

    const simpleDecorations: Record<string, [Component, number]> = {
        "one": [SimpleDecorationOne, 88]
    };

    const grandDecorations: Record<string, [Component, number]> = {
        "one": [SimpleDecorationOne, 88]
    };

	let { children } = $props();

    let topbar: HTMLDivElement;

    onMount(() => {
        const findBestDecoration = (
            decorationList: Record<string, [Component, number]>, // List of allowed decorations
            sectionWidth: number,
            desiredBarRatio: number,
            childDecorationList: Record<string, [Component, number]>={} // List of allowed decorations for potential children
        ): string[] => {
            // Data for the calculated best decoration
            let bestDecorationName = "";
            let bestDecorationWidth = 0;
            let bestDecorationNumFit = -1;
            let bestDecorationBarRatio: number | undefined;

            // Data for 3- and 5-decoration configurations in case a 4-decoration configuration is optimal
            let bestDecorationThreeBarRatio = 0;
            let bestDecorationFiveBarRatio = 0;

            // Find the best-fitting decoration
            for (let decorationName in decorationList) {
                const decorationWidth = decorationList[decorationName][1];
                let decorationBarRatio: number | undefined;
                let decorationNumFit = 0;

                let decorationThreeBarRatio = 0;
                let decorationFiveBarRatio = 0;

                // Find the best-fitting number of this decoration
                let numDecorations = 1;
                while (true) {
                    const thisFitBarRatio = decorationWidth * (numDecorations + 1) /
                        (sectionWidth - numDecorations * decorationWidth);

                    // Set data for 3- and 5-decoration configurations
                    if (numDecorations == 3) {
                        decorationThreeBarRatio = thisFitBarRatio;
                    } else if (numDecorations == 5) {
                        decorationFiveBarRatio = thisFitBarRatio;
                    }

                    if (decorationBarRatio == undefined ||
                        Math.abs(desiredBarRatio - thisFitBarRatio) < Math.abs(desiredBarRatio - decorationBarRatio)
                    ) {
                        // Store data if this numDecorations is an improvement
                        decorationBarRatio = thisFitBarRatio;
                        decorationNumFit = numDecorations;
                    } else {
                        // Break out of the loop if the thisFitBarRatio isn't improving
                        if (numDecorations == 5) {
                            decorationFiveBarRatio = thisFitBarRatio;
                        }
                        break;
                    }

                    numDecorations++;
                }

                if (bestDecorationBarRatio == undefined ||
                    Math.abs(desiredBarRatio - decorationBarRatio) < Math.abs(desiredBarRatio - bestDecorationBarRatio)
                ) {
                    // Store this decoration if it is an improvement
                    bestDecorationName = decorationName;
                    bestDecorationWidth = decorationWidth;
                    bestDecorationNumFit = decorationNumFit;
                    bestDecorationBarRatio = decorationBarRatio;

                    bestDecorationThreeBarRatio = decorationThreeBarRatio;
                    bestDecorationFiveBarRatio = decorationFiveBarRatio;
                }
            }

            // Create the return list
            let toReturn = [];
            if (bestDecorationNumFit < 3 || Object.keys(children).length == 0) {
                // If only 1 or 2 decorations fit, there are no child decorations
                for (let _ = 0; _ < bestDecorationNumFit; _++) {
                    toReturn.push(bestDecorationName);
                }
            } else {
                // If a 4-decoration configuration is optimal, change to a 3- or 5-decoration configuration
                if (bestDecorationNumFit == 4) {
                    if (Math.abs(desiredBarRatio - bestDecorationThreeBarRatio) < Math.abs(desiredBarRatio - bestDecorationFiveBarRatio)) {
                        // A 3-decoration configuration is more optimal
                        bestDecorationNumFit = 3;
                    } else {
                        // A 5-decoration configuration is more optimal
                        bestDecorationNumFit = 5;
                    }
                }

                // Get the best fitting child decoration
                const bestChildDecorationName = findBestDecoration(
                    childDecorationList,
                    (sectionWidth - bestDecorationNumFit * bestDecorationWidth) / (bestDecorationNumFit + 1),
                    desiredBarRatio
                )[0];


                if (bestDecorationNumFit % 3 == 0) {
                    for (let _ = 0; _ < bestDecorationNumFit / 3; _++) {
                        toReturn.push(bestDecorationName);
                        toReturn.push(bestChildDecorationName);
                        toReturn.push(bestDecorationName);
                    }
                } else if (bestDecorationNumFit % 3 == 1) {
                    toReturn.push(bestDecorationName);
                    for (let _ = 0; _ < bestDecorationNumFit / 2; _++) {
                        toReturn.push(bestChildDecorationName);
                        toReturn.push(bestDecorationName);
                    }
                } else {
                    toReturn.push(bestDecorationName);
                    toReturn.push(bestDecorationName);
                    for (let _ = 0; _ < bestDecorationNumFit / 3; _++) {
                        toReturn.push(bestChildDecorationName);
                        toReturn.push(bestDecorationName);
                        toReturn.push(bestDecorationName);
                    }
                }
            }

            return toReturn;
        }

        const updateHeight = () => {
            document.documentElement.style.setProperty(
                "--topbar-height",
                `${topbar.getBoundingClientRect().height}px`
            );
        };

        async function createContentFrame() {
            await tick();

            let borderContainer = document.getElementById("border-container") as HTMLDivElement;
            if (borderContainer) {
                observer.observe(borderContainer);
                const { width, height } = borderContainer.getBoundingClientRect();
                let barWidth = width - 120;
                let barHeight = height - 120;

                // Add corners
                const topLeftCornerContainer = document.createElement("div");
                topLeftCornerContainer.className = "border-component";
                topLeftCornerContainer.style = "top:0;";
                mount(Corner, {target: topLeftCornerContainer});
                borderContainer.appendChild(topLeftCornerContainer);

                const topRightCornerContainer = document.createElement("div");
                topRightCornerContainer.className = "border-component";
                topRightCornerContainer.style = `top:0; left:${barWidth + 60}px; rotate:90deg;`;
                mount(Corner, {target: topRightCornerContainer});
                borderContainer.appendChild(topRightCornerContainer);

                const bottomRightCornerContainer = document.createElement("div");
                bottomRightCornerContainer.className = "border-component";
                bottomRightCornerContainer.style = `top:${barHeight + 60}px; left:${barWidth + 60}px; rotate:180deg;`;
                mount(Corner, {target: bottomRightCornerContainer});
                borderContainer.appendChild(bottomRightCornerContainer);

                const bottomLeftCornerContainer = document.createElement("div");
                bottomLeftCornerContainer.className = "border-component";
                bottomLeftCornerContainer.style = `top:${barHeight + 60}px; rotate:270deg;`;
                mount(Corner, {target: bottomLeftCornerContainer});
                borderContainer.appendChild(bottomLeftCornerContainer);

                const horizontalDecorations = findBestDecoration(
                    simpleDecorations,
                    barWidth,
                    3,
                    grandDecorations
                );
                const verticalDecorations = findBestDecoration(
                    simpleDecorations,
                    barHeight,
                    3,
                    grandDecorations
                );

                // Create top bar
                /*
                const node = document.createElement("div");
                node.className = "content-box";
                const textnode = document.createTextNode("Water");
                node.appendChild(textnode);
                contentBox.appendChild(node);
                */

                // Create bottom bar
            }
        }

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

<div id="main-section">
    <div id="border-container">
        <div id="content-box"> {@render children()} </div>
        <!-- Border elements go here -->
    </div>
</div>
