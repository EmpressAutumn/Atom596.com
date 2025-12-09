<script lang="ts">
    export let onClick: (() => void) | undefined = undefined;
</script>

<button
        class="group relative p-3 select-none"
        on:click={onClick}
>
    <svg
            width="200"
            height="60"
            viewBox="0 0 200 60"
            class="overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
    >
        <!-- Background rectangle -->
        <rect
                x="0"
                y="0"
                width="200"
                height="60"
                rx="10"
                class="fill-blue-600 transition-colors duration-300
             group-hover:fill-blue-700"
        />

        <!-- Left sliding panel -->
        <rect
                x="0"
                y="0"
                width="80"
                height="60"
                class="fill-blue-500 transition-transform duration-300
             group-hover:-translate-x-[10px]"
        />

        <!-- Right sliding panel -->
        <rect
                x="120"
                y="0"
                width="80"
                height="60"
                class="fill-blue-500 transition-transform duration-300
             group-hover:translate-x-[10px]"
        />

        <!-- Text (slot contents) -->
        <foreignObject
                x="0"
                y="0"
                width="200"
                height="60"
                class="pointer-events-none"
        >
            <div
                    class="w-full h-full flex items-center justify-center
               text-white font-semibold text-lg
               transition-transform duration-300
               group-hover:-translate-y-[2px]"
            >
                <slot>Button</slot>
            </div>
        </foreignObject>
    </svg>
</button>
