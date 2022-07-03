<script>
    // defineEmits(["change-active"])
    export default {
        props: ['itemTitle', "isActive"],
    }
</script>

<template>
    <li class="w-[120px] transition-all cursor-pointer p-2 mr-2" v-bind:class="{'bg-neutral':isActive, 'text-white':isActive}" v-on:click="$emit('change-active', index)">
        {{itemTitle}}
    </li>
</template>