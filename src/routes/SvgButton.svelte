<script lang="ts">
    export let onClick: (() => void) | undefined = undefined;
</script>

<button
        class="group relative p-3 select-none"
        on:click={onClick}
>
    <svg
        width="240"
        height="80"
        viewBox="0 0 240 80"
        class="overflow-visible"
    >
        <path
            style="fill:none;stroke:#d6a929;stroke-width:1"
            d="M 45,75 10,40 45,5 195,5 230,40 195,75 45,75"
        />
        <path
            style="fill:none;stroke:#d6a929;stroke-width:1"
            d="M 40,70 10,40 40,10"
            class="transition-transform duration-300 group-hover:-translate-x-[10px]"
        />
        <path
            style="fill:none;stroke:#d6a929;stroke-width:1"
            d="M 200,10 230,40 200,70"
            class="transition-transform duration-300 group-hover:translate-x-[10px]"
        />
        <foreignObject
            x="20"
            y="5"
            width="200"
            height="70"
            class="pointer-events-none"
        >
            <div class="w-full h-full flex items-center justify-center text-white font-semibold text-lg" >
                <slot>Button</slot>
            </div>
        </foreignObject>
    </svg>
</button>
