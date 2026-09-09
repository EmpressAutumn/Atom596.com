<script lang="ts">
    export let width: number;
</script>

<svg width={width} height="8" viewBox={`0 0 ${width} 8`} class="overflow-visible">
    <path style="fill: none; stroke: goldenrod; stroke-width: 2;" d={`M 0,0 ${width},0`} />
    <path style="fill: none; stroke: goldenrod; stroke-width: 2;" d={`M 0,8 ${width},8`} />
</svg>
