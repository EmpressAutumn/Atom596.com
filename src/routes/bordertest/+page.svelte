<script>
    import Corner from "$lib/components/border_elements/Corner.svelte";
    import TwoBars from "$lib/components/border_elements/TwoBars.svelte";
    import FourBarTransition from "$lib/components/border_elements/FourBarTransition.svelte";
    import FourBars from "$lib/components/border_elements/FourBars.svelte";
</script>

<style>
    #testing-box > * {
        position: absolute;
    }
</style>

<div id="testing-box" style="margin: 20px; width: calc(100% - 40px); height: 100px; position: relative;">
    <div><Corner/></div>
    <div style="left: 60px;"><TwoBars width=120 /></div>
    <div style="left: 180px;"><FourBarTransition/></div>
    <div style="left: 192px;"><FourBars width=60 /></div>
</div>
