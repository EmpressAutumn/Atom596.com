<script lang="ts">
    import "$lib/styles/NavButton.css"

    export let text = "Button";
    export let width = 200;
    export let onClick: () => void = () => {};
</script>

<button class="group relative p-3 select-none cursor-pointer" on:click={onClick} >
    <svg width={width} height="60" viewBox={`0 0 ${width} 60`} class="overflow-visible" >
        <!-- Text Polygon -->
        <polygon id="text-area" points={`28,10 8,30 28,50 ${width-28},50 ${width-8},30 ${width-28},10`} />

        <!-- Left Triangle -->
        <path class="triangle-horizontal" d="M 20,18 26,18" />
        <path class="triangle-horizontal" d="M 16,22 26,22" />
        <path class="triangle-horizontal" d="M 12,26 26,26" />
        <path class="triangle-horizontal" d="M 8,30 26,30" />
        <path class="triangle-horizontal" d="M 12,34 26,34" />
        <path class="triangle-horizontal" d="M 16,38 26,38" />
        <path class="triangle-horizontal" d="M 20,42 26,42" />
        <path class="triangle-vertical" d="M 26,48 26,12" />

        <!-- Right Triangle -->
        <path class="triangle-horizontal" d={`M ${width-20},18 ${width-26},18`} />
        <path class="triangle-horizontal" d={`M ${width-16},22 ${width-26},22`} />
        <path class="triangle-horizontal" d={`M ${width-12},26 ${width-26},26`} />
        <path class="triangle-horizontal" d={`M ${width-8},30 ${width-26},30`} />
        <path class="triangle-horizontal" d={`M ${width-12},34 ${width-26},34`} />
        <path class="triangle-horizontal" d={`M ${width-16},38 ${width-26},38`} />
        <path class="triangle-horizontal" d={`M ${width-20},42 ${width-26},42`} />
        <path class="triangle-vertical" d={`M ${width-26},48 ${width-26},12`} />

        <!-- Left Bracket -->
        <polygon class="bracket" points="30,0 0,30 30,60 30,52 8,30 30,8" />
        <path class="bracket-sheath" d="M 26,12.5 30,8.5 30,0 0,30 30,60 30,51.5 26,47.5" />

        <!-- Right Bracket -->
        <polygon class="bracket" points={`${width-30},0 ${width},30 ${width-30},60 ${width-30},52 ${width-8},30 ${width-30},8`} />
        <path class="bracket-sheath" d={`M ${width-26},12.5 ${width-30},8.5 ${width-30},0 ${width},30 ${width-30},60 ${width-30},51.5 ${width-26},47.5`} />

        <!-- Text -->
        <foreignObject x="26" y="5" width={width-52} height="50">
            <div class="w-full h-full flex items-center justify-center font-semibold text-lg" style="color:antiquewhite">
                <slot>{text}</slot>
            </div>
        </foreignObject>
    </svg>
</button>
