<script>


export default {
    props: ["isActive", "itemTitle", "itemSize", "itemCoords"],
    emits: ["modal-window", "modal-content-window", "change-active"],

};
</script>

<template>
  <!-- draggable,  draggable="true" -->
  <li class=" bg-white border-2 resize overflow-hidden cursor-grab draggable transition-colors max-w-[1070px] ball"
    v-bind:class="{ 'border-black': isActive, 'z-10': isActive }" v-on:mousedown="$emit('change-active', index)"
    v-bind:style="{ width: itemSize[0], height: itemSize[1], top: itemCoords[0], left: itemCoords[1] }">
      <div class="flex justify-end ">
        {{ itemTitle }}
        <button class="p-2" v-on:click="$emit('modal-content-window', index)">
          <i class="fa-solid fa-pencil"></i>
        </button>
        <button class="p-2" v-on:click="$emit('modal-window', index)">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
        
  </li>

</template>
