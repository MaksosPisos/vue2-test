<template>
    <div id="app">
   


            <VueDragResize :w="200" :h="200" :x="300" :y="88" :stickSize="10" v-on:resizing="resize"
                v-on:dragging="resize" class="transition-colors bg-black/50 cursor-grab"
                v-bind:class="{ 'bg-red': isActive }" v-on:mousedown="$emit('change-active', index)">

                <div class="flex justify-end ">
                    {{ itemTitle }}
                    <button class="p-2" v-on:click="$emit('modal-content-window', index)">
                        <i class="fa-solid fa-pencil"></i>
                    </button>
                    <button class="p-2" v-on:click="$emit('modal-window', index)">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
        

        </VueDragResize>

    </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize';

export default {
    name: 'app',
    props: ["isActive", "itemTitle", "itemSize", "itemCoords"],
    emits: ["modal-window", "modal-content-window", "change-active"],
    components: {
        VueDragResize
    },

    data() {
        return {
            width: 200,
            height: 200,
            top: 0,
            left: 100
        }
    },

    methods: {
        resize(newRect) {
            this.width = newRect.width;
            this.height = newRect.height;
            this.top = newRect.top;
            this.left = newRect.left;
        }
    }
}
</script>