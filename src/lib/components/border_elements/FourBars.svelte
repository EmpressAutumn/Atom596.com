<script lang="ts">
    export let width: number;
</script>

<svg width={width} height="24" viewBox={`0 0 ${width} 24`} class="overflow-visible">
    <path style="fill: none; stroke: goldenrod; stroke-width: 2;" d={`M 0,-8 ${width},-8`} />
    <path style="fill: none; stroke: goldenrod; stroke-width: 2;" d={`M 0,-4 ${width},-4`} />
    <path style="fill: none; stroke: goldenrod; stroke-width: 2;" d={`M 0,12 ${width},12`} />
    <path style="fill: none; stroke: goldenrod; stroke-width: 2;" d={`M 0,16 ${width},16`} />
</svg>
