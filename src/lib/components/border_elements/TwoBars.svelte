<script lang="ts">
    import "$lib/components/styles/BorderComponents.css";

    export let width: number;
</script>

<svg width={width} height="8" viewBox={`0 0 ${width} 8`} class="overflow-visible">
    <path d={`M 0,0 ${width},0`} class="thick-line" />
    <path d={`M 0,3 ${width},3`} class="thin-dark-line" />
    <path d={`M 0,8 ${width},8`} class="thick-line" />
</svg>
