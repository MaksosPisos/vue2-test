<script>
//   defineProps(["isActive", "itemTitle", "itemSize"])
//   defineEmits(["modal-window", "modal-content-window", "change-active"])
export default {
  props: ["isActive", "itemTitle"],
  emits: ["modal-window", "modal-content-window", "change-active"],
};
</script>

<template>
<!-- draggable,  draggable="true" -->
  <li
    class="w-[200px] h-[200px] border-2 resize overflow-hidden cursor-grab  transition-colors max-w-[1070px]"
    v-bind:class="{ 'border-black': isActive }"
    v-on:click="$emit('change-active', index)"
  >
    <div class="flex justify-end">
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
