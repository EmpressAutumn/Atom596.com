<script>
    import Corner from "$lib/components/border_elements/Corner.svelte";
    import TwoBars from "$lib/components/border_elements/TwoBars.svelte";
    import SimpleDecorationOne from "$lib/components/border_elements/SimpleDecorationOne.svelte";
</script>

<style>
    #testing-box > * {
        position: absolute;
    }
</style>

<div id="testing-box" style="margin: 20px; width: calc(100% - 40px); height: 100px; position: relative;">
    <div><Corner/></div>
    <div style="left: 60px;"><TwoBars width=60 /></div>
    <div style="left: 120px;"><SimpleDecorationOne/></div>
</div>
