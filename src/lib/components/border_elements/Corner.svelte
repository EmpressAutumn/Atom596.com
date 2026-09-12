<script lang="ts">
    import "$lib/components/styles/ComponentsGlobal.css";
</script>

<svg width=60 height=60 viewBox="0 0 60 60" class="overflow-visible">
    <!-- Radiating Bars -->
    <path d={`M 8,8 ${46/3},${134/3}`} class="thin-dark-line" />
    <path d={`M 8,8 ${68/3},${112/3}`} class="thin-dark-line" />
    <path d="M 8,8 30,30" class="thin-dark-line" />
    <path d={`M 8,8 ${112/3},${68/3}`} class="thin-dark-line" />
    <path d={`M 8,8 ${134/3},${46/3}`} class="thin-dark-line" />

    <!-- Corner Bracket -->
    <path d="M 60,3 57,3 56,4 4,4 4,56 3,57 3,60" class="thin-dark-line" />
    <polygon points="60,0 0,0 0,60" class="thick-line" />
    <path d="M 60,8 8,8 8,60" class="thick-line" />
</svg>
