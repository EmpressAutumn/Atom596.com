<script lang="ts">
    import Button from "./Button.svelte";

    function test_button() {
        console.log("test_button");
    }
</script>

<Button
        text="Test"
        width={200}
        onClick={test_button}
/>
