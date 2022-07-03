<script>
// defineEmits(["add-container", "del-active-container"]);
export default {};
</script>

<template>
  <div class="bg-base-300 p-4">
    <div class="flex items-center gap-2">
      <button class="text-xl">
        <i class="fa-solid fa-arrow-rotate-left"></i>
      </button>
      <button class="text-xl">
        <i class="fa-solid fa-arrow-rotate-right"></i>
      </button>
      <button class="text-xl">
        <i class="fa-solid fa-floppy-disk"></i>
      </button>
      <button class="text-xl" v-on:click="() => $emit('add-container')">
        <i class="fa-solid fa-plus"></i>
      </button>
      <button class="text-xl" v-on:click="() => $emit('del-active-container')">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  </div>
</template>
