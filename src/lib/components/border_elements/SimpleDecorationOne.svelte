<script lang="ts">
    import "$lib/components/styles/ComponentsGlobal.css";
</script>

<svg width=10 height=8 viewBox="0 0 10 8" class="overflow-visible">
    <!-- Connecting Bars -->
    <path d="M 0,0 88,0" class="thick-line" />
    <path d="M 0,3 3,3 4,4 84,4, 85,3 88,3" class="thin-dark-line" />
    <path d="M 0,8 8,8" class="thick-line" />
    <path d="M 80,8 88,8" class="thick-line" />

    <!-- Main Decoration Piece -->
    <path d="M 4,0 16,12 24,4 32,12 44,0 56,12 64,4 72,12 84,0" class="thin-dark-line" />
    <path d="M 12,12 24,0 36,12 44,4 52,12 64,0 76,12" class="thin-dark-line" />
    <path d="M 0,0 12,12 36,12" class="thick-line" />
    <path d="M 52,12 76,12 88,0" class="thick-line" />

    <!-- Central Diamond -->
    <polygon points="44,7 39,12 44,17 49,12" class="thin-dark-line" />
    <polygon points="44,4 36,12 44,20 52,12" class="thick-line" />
</svg>
