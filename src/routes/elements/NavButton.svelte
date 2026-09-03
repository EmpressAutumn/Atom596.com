<script lang="ts">
    export let text = "Button";
    export let width = 200;

    export let onClick: () => void = () => {};
</script>

<button class="group relative p-3 select-none cursor-pointer" on:click={onClick} >
    <svg width={width} height="60" viewBox={`0 0 ${width} 60`} class="overflow-visible pointer-events-none" >
        <g>
            <polygon id="text-area"
                     style="fill:maroon;stroke:goldenrod;stroke-width:1"
                     points={`28,10 8,30 28,50 ${width-28},50 ${width-8},30 ${width-28},10`}
            />
            <g id="left-triangle">
                <path style="fill:none;stroke:goldenrod;stroke-width:1" d="M 20,18 26,18" />
                <path style="fill:none;stroke:goldenrod;stroke-width:1" d="M 16,22 26,22" />
                <path style="fill:none;stroke:goldenrod;stroke-width:1" d="M 12,26 26,26" />
                <path style="fill:none;stroke:goldenrod;stroke-width:1" d="M 8,30 26,30" />
                <path style="fill:none;stroke:goldenrod;stroke-width:1" d="M 12,34 26,34" />
                <path style="fill:none;stroke:goldenrod;stroke-width:1" d="M 16,38 26,38" />
                <path style="fill:none;stroke:goldenrod;stroke-width:1" d="M 20,42 26,42" />
                <path style="fill:none;stroke:darkgoldenrod;stroke-width:1" d="M 26,48 26,12" />
            </g>
            <g id="right-triangle">
                <path style="fill:none;stroke:goldenrod;stroke-width:1" d={`M ${width-20},18 ${width-26},18`} />
                <path style="fill:none;stroke:goldenrod;stroke-width:1" d={`M ${width-16},22 ${width-26},22`} />
                <path style="fill:none;stroke:goldenrod;stroke-width:1" d={`M ${width-12},26 ${width-26},26`} />
                <path style="fill:none;stroke:goldenrod;stroke-width:1" d={`M ${width-8},30 ${width-26},30`} />
                <path style="fill:none;stroke:goldenrod;stroke-width:1" d={`M ${width-12},34 ${width-26},34`} />
                <path style="fill:none;stroke:goldenrod;stroke-width:1" d={`M ${width-16},38 ${width-26},38`} />
                <path style="fill:none;stroke:goldenrod;stroke-width:1" d={`M ${width-20},42 ${width-26},42`} />
                <path style="fill:none;stroke:darkgoldenrod;stroke-width:1" d={`M ${width-26},48 ${width-26},12`} />
            </g>
            <g id="left-bracket">
                <polygon
                        style="fill:antiquewhite;stroke:darkgoldenrod;stroke-width:1"
                        points="30,0 0,30 30,60 30,52 8,30 30,8"
                />
                <path
                        style="fill:none;stroke:darkgoldenrod;stroke-width:2"
                        d="M 26,12.5 30,8.5 30,0 0,30 30,60 30,51.5 26,47.5"
                />
            </g>
            <g id="right-bracket">
                <polygon
                        style="fill:antiquewhite;stroke:darkgoldenrod;stroke-width:1"
                        points={`${width-30},0 ${width},30 ${width-30},60 ${width-30},52 ${width-8},30 ${width-30},8`}
                />
                <path
                        style="fill:none;stroke:darkgoldenrod;stroke-width:2"
                        d={`M ${width-26},12.5 ${width-30},8.5 ${width-30},0 ${width},30 ${width-30},60 ${width-30},51.5 ${width-26},47.5`}
                />
            </g>
        </g>
        <foreignObject
                x="26"
                y="5"
                width={width-52}
                height="50"
                class="pointer-events-none"
        >
            <div
                    class="w-full h-full flex items-center justify-center font-semibold text-lg"
                    style="color:antiquewhite"
            >
                <slot>{text}</slot>
            </div>
        </foreignObject>
    </svg>
</button>
