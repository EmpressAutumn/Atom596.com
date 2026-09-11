<script lang="ts">
    export let width: number;
</script>

<svg width={width} height="8" viewBox={`0 0 ${width} 8`} class="overflow-visible">
    <path d={`M 0,0 ${width},0`} style="fill: none; stroke: goldenrod; stroke-width: 2;" />
    <path d={`M 0,8 ${width},8`} style="fill: none; stroke: goldenrod; stroke-width: 2;" />
</svg>
