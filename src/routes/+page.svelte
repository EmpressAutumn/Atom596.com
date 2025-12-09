<h1>Atom596.com</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<script lang="ts">
    export let onClick: (() => void) | undefined = undefined;

    import SvgButton from "./SvgButton.svelte";
</script>

<SvgButton onClick={() => alert("Clicked!")}>
    Hover me
</SvgButton>
