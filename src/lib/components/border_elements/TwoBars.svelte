<script lang="ts">
    import "$lib/components/styles/ComponentsGlobal.css";
    import {onMount} from "svelte";

    let container: HTMLElement;
    let width = 0;

    export let barNumber: number;
    export let direction: string;

    onMount(() => {
        const observer = new ResizeObserver((entries) => {
            updateAppearance(entries[0].contentRect.width);
        });

        observer.observe(container);

        return () => observer.disconnect();
    });

    function updateAppearance(newWidth: number) {
        width = newWidth;
    }
</script>

<div bind:this={container} id="{direction}Bar{barNumber}" style="position:absolute;">
    <svg width={width} height="8" viewBox={`0 0 ${width} 8`} class="overflow-visible">
        <path d={`M 0,0 ${width},0`} class="thick-line" />
        <path d={`M 0,3 ${width},3`} class="thin-dark-line" />
        <path d={`M 0,8 ${width},8`} class="thick-line" />
    </svg>
</div>
