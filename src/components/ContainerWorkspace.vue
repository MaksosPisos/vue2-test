<script>
export default {
  props: ["isActive", "itemTitle", "itemSize", "itemCoords", "index"],
  // emits: ["modal-window", "modal-content-window", "change-active", "mousedown(e)"],

};
</script>

<template>
  <!-- draggable,  draggable="true" -->

  <li class=" bg-white border-2  cursor-grab transition-colors max-w-[1060px] min-w-[50px] min-h-[50px] absolute select-none"
    v-bind:class="{ 'border-black': isActive, 'z-10': isActive }"
    @mousedown="$emit('mousedown-res', $event, index), $emit('change-active', index)"
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
    <div @mousedown="$emit('mousedown-resizing', $event, index)" class="">
      <div class="resizer ne  bg-base-300"  v-bind:class="{ 'bg-black': isActive, 'z-10': isActive }"></div>
      <div class="resizer nw  bg-base-300"  v-bind:class="{ 'bg-black': isActive, 'z-10': isActive }"></div>
      <div class="resizer sw  bg-base-300"  v-bind:class="{ 'bg-black': isActive, 'z-10': isActive }"></div>
      <div class="resizer se  bg-base-300"  v-bind:class="{ 'bg-black': isActive, 'z-10': isActive }"></div>
    </div>


  </li>

</template>
