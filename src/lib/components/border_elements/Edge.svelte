<script lang="ts">
    import {type Component, mount, onMount} from "svelte";

    import TwoBars from "$lib/components/border_elements/TwoBars.svelte";

    export let direction="top";
    export let simpleDecoration: [Component, number];
    export let grandDecoration: [Component, number];
    export let cornerLength: number;

    let container: HTMLElement;
    let length: number;
    let rotation: number;

    const avgDecoWidth = (simpleDecoration[1] + grandDecoration[1]) / 2;
    const desiredBarRatio = 2;

    let decorationNumFit = 0;
    let decorationList: string[] = [];

    onMount(() => {
        const observer = new ResizeObserver((entries) => {
            updateAppearance(entries[0].contentRect.width, entries[0].contentRect.height);
        });

        const parent = container.parentElement;

        if (parent) {
            const grandparent = parent.parentElement;
            if (grandparent) {
                observer.observe(grandparent);
            }
        }

        rotation = (direction == "right") ? 90:
            (direction == "bottom") ? 180:
            (direction == "left") ? 270: 0;

        return () => observer.disconnect();
    });

    function updateAppearance(width: number, height: number) {
        if (direction == "right" || direction == "left") {
            length = height - 2 * cornerLength;
        } else {
            length = width - 2 * cornerLength;
        }
        length = width - 2 * cornerLength;
        console.log(direction, length);

        let decorationBarRatio: number | undefined;
        let newDecorationNumFit = 0;

        // Find the best-fitting number of this decoration
        let testingNumFit = 0;
        while (true) {
            // Calculate ratio of bar width to decoration width
            const testingBarRatio = (length - testingNumFit * avgDecoWidth) /
                (avgDecoWidth * (testingNumFit + 1));

            if (decorationBarRatio == undefined ||
                Math.abs(desiredBarRatio - testingBarRatio) < Math.abs(desiredBarRatio - decorationBarRatio)
            ) {
                // Store data if this numDecorations is an improvement
                decorationBarRatio = testingBarRatio;
                newDecorationNumFit = testingNumFit;
            } else {
                // Break out of the loop if the thisFitBarRatio isn't improving
                break;
            }

            testingNumFit++;
        }

        // There is no need to recalculate the order of decorations
        if (newDecorationNumFit != decorationNumFit) {
            if (newDecorationNumFit < 3) {
                // If only 1 or 2 simple decorations fit, there are no grand decorations
                decorationList = [];
                for (let _ = 0; _ < newDecorationNumFit; _++) {
                    decorationList.push("simple");
                }
            } else if (newDecorationNumFit == 4) {
                decorationList = ["grand", "simple", "simple", "grand"];
            } else {
                if (newDecorationNumFit % 3 == 0) {
                    decorationList = [];
                    for (let _ = 0; _ < newDecorationNumFit / 3; _++) {
                        decorationList.push("simple");
                        decorationList.push("grand");
                        decorationList.push("simple");
                    }
                } else if (newDecorationNumFit % 3 == 1) {
                    decorationList = ["simple"];
                    for (let _ = 0; _ < newDecorationNumFit / 2; _++) {
                        decorationList.push("grand");
                        decorationList.push("simple");
                    }
                } else {
                    decorationList = ["simple", "simple"];
                    for (let _ = 0; _ < Math.round(newDecorationNumFit / 3 - 0.5); _++) {
                        decorationList.push("grand");
                        decorationList.push("simple");
                        decorationList.push("simple");
                    }
                }
            }

            // Add or remove components
            if (newDecorationNumFit > decorationNumFit) {
                // Add new components
                for (let componentNumber = decorationNumFit + 1; componentNumber <= newDecorationNumFit; componentNumber++) {
                    // Create decoration
                    mount(
                        (decorationList[componentNumber - 1] == "simple") ? simpleDecoration[0] : grandDecoration[0], {
                            target: container,
                            props: {
                                "decorationNumber": componentNumber
                            }
                        }
                    );

                    // Create bar
                    mount(
                        TwoBars, {
                            target: container,
                            props: {
                                "barNumber": componentNumber
                            }
                        }
                    );
                }
            } else {
                // Remove excess components
                for (let componentNumber = decorationNumFit; componentNumber > newDecorationNumFit; componentNumber--) {
                    document.getElementById(`deco${componentNumber}`)?.remove();
                    document.getElementById(`bar${componentNumber}`)?.remove();
                }
            }

            decorationNumFit = newDecorationNumFit;
        }

        // Resize bars and move all the decorations
        let barLength = length;
        for (let decoration in decorationList) {
            barLength -= (decoration == "simple") ? simpleDecoration[1] : grandDecoration[1];
        }
        barLength /= decorationNumFit + 1;

        const bar0 = document.getElementById("bar0");
        if (bar0 != null) {
            bar0.style.width = `${barLength + 1}px`;
        }

        let usedWidth = barLength;
        for (let componentNumber = 1; componentNumber <= decorationNumFit; componentNumber++) {
            const thisDecoration = document.getElementById(`deco${componentNumber}`);
            if (thisDecoration != null) {
                thisDecoration.style.left = `${usedWidth}px`;
                usedWidth += (decorationList[componentNumber - 1] == "simple") ? simpleDecoration[1] : grandDecoration[1];
            }

            const thisBar = document.getElementById(`bar${componentNumber}`);
            if (thisBar != null) {
                thisBar.style.width = `${barLength + 1}px`;
                thisBar.style.left = `${usedWidth}px`;
                usedWidth += barLength;
            }
        }
    }
</script>

<div bind:this={container} style="position:relative; transform-origin:top left; rotate:{rotation}deg;">
    <TwoBars barNumber={0} />
</div>
