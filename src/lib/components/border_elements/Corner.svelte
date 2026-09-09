<script lang="ts">
    function diagonalBar(numBars: number, barNumber: number): string {
        const barDifference = (44 / (numBars + 1));
        return `${8 + barNumber * barDifference},${52 - barNumber * barDifference}`;
    }
</script>

<svg width=60 height=60 viewBox="0 0 60 60" class="overflow-visible">
    <!-- Radiating Bars -->
    <path d={`M 8,8 ${diagonalBar(5, 1)}`} style="fill:none;stroke:darkgoldenrod;stroke-width:1" />
    <path d={`M 8,8 ${diagonalBar(5, 2)}`} style="fill:none;stroke:darkgoldenrod;stroke-width:1" />
    <path d={`M 8,8 ${diagonalBar(5, 3)}`} style="fill:none;stroke:darkgoldenrod;stroke-width:1" />
    <path d={`M 8,8 ${diagonalBar(5, 4)}`} style="fill:none;stroke:darkgoldenrod;stroke-width:1" />
    <path d={`M 8,8 ${diagonalBar(5, 5)}`} style="fill:none;stroke:darkgoldenrod;stroke-width:1" />

    <!-- Corner Bracket -->
    <path d="M 56,4 4,4 4,56" style="fill:none;stroke:darkgoldenrod;stroke-width:1" />
    <polygon points="60,0 0,0 0,60" style="fill:none;stroke:goldenrod;stroke-width:2" />
    <path d="M 60,8 8,8 8,60" style="fill:none;stroke:goldenrod;stroke-width:2" />
</svg>
