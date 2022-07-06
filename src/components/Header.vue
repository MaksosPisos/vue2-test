<script>
// defineEmits(["add-container", "del-active-container"]);
export default {
  props: ["activeButton"],
};
</script>

<template>
  <div class="bg-base-300 p-4">
    <div class="flex items-center gap-2">
      <button class="text-xl" v-on:click="$emit('history-return')" :class="{'opacity-50': !activeButton[0], ' pointer-events-none': !activeButton[0]}">
        <i class="fa-solid fa-arrow-rotate-left"></i>
      </button>
      <button class="text-xl" v-on:click="$emit('history-next')" :class="{'opacity-50': !activeButton[1] , ' pointer-events-none': !activeButton[1]}">
        <i class="fa-solid fa-arrow-rotate-right"></i>
      </button>
      <button class="text-xl" v-on:click="$emit('history-save')">
        <i class="fa-solid fa-floppy-disk"></i>
      </button>
      <button class="text-xl" v-on:click="$emit('add-container')">
        <i class="fa-solid fa-plus"></i>
      </button>
      <button class="text-xl" v-on:click="$emit('del-active-container')">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  </div>
</template>
