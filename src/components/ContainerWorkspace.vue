<script>
export default {
  props: ["isActive", "itemTitle", "itemSize", "itemCoords", "index"],
  // emits: ["modal-window", "modal-content-window", "change-active", "mousedown(e)"],

};
</script>

<template>
  <!-- draggable,  draggable="true" -->

  <li class=" bg-white border-2  cursor-grab transition-colors max-w-[1070px] absolute"
    v-bind:class="{ 'border-black': isActive, 'z-10': isActive }" @click="$emit('change-active', index)"
    @mousedown="$emit('mousedown-res', $event, index)"
    v-bind:style="{ width: itemSize[1] + 'px', height: itemSize[0] + 'px', top: itemCoords[0] + 'px', left: itemCoords[1] + 'px' }">

    <div class="flex justify-end ">
      {{ itemTitle }}
      <button class="p-2" v-on:click="$emit('modal-content-window', index)">
        <i class="fa-solid fa-pencil"></i>
      </button>
      <button class="p-2" v-on:click="$emit('modal-window', index)">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
    <div @mousedown="$emit('mousedown-resizing', $event, index)">
      <div class="resizer ne"></div>
      <div class="resizer nw"></div>
      <div class="resizer sw"></div>
      <div class="resizer se"></div>
    </div>


  </li>

</template>
