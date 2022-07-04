<script>
import Header from "./components/Header.vue";
import ContainerList from "./components/ContainerList.vue";
import ContainerWorkspace from "./components/ContainerWorkspace.vue";
import ModalDel from "./components/ModalDel.vue";
import ModalContent from "./components/ModalContent.vue";
import Droppabble from "./components/Droppabble.vue";
export default {
  components: {
    // регистрация компонентов
    Header,
    ContainerList,
    ContainerWorkspace,
    ModalDel,
    ModalContent,
    Droppabble
  },
  // создание переменных
  data() {
    return {
      containerItems: [
        {
          title: "Контейнер 1",
          active: true,
          width: "200px",
          heigth: "200px",
          top: 0,
          left: 0
        },
      ],
      modalDel: false,
      modalContent: false,
      indexItem: undefined,
    };
  },
  // 
  methods: {
    addNewContainer() {
      this.containerItems.push({
        title: `контейнер ${this.containerItems.length + 1}`,
        active: false,
        width: "200px",
        heigth: "200px",
        top: "0",
        left: "200px",
      });
    },
    changeActiveItem(index) {
      this.containerItems[index].active = true;
      this.containerItems.forEach((item, i) => {
        if (i != index) {
          item.active = false;
        }
      });
    },
    delModalWindow(index) {
      this.modalDel = true;
      // state.todoItems.splice(index, 1);
      this.indexItem = index;
    },
    modalCont(index) {
      this.modalContent = true;
      console.log(index);
    },
    delContainerItem() {
      this.containerItems.splice(this.indexItem, 1);
      this.indexItem = undefined;
      // console.log(state.indexItem);
      this.closeModal();
    },
    delActiveItem() {
      this.containerItems.forEach((item, index) => {
        if (item.active === true) {
          this.modalDel = true;
          this.indexItem = index;
          // console.log(state.indexItem);
        }
      });
    },
    closeModal() {
      this.modalDel = false;
      this.modalContent = false;
    },
  },
};
</script>

<template>
  <div data-theme="light" class="min-h-screen bg-primary-content text-neutral">
    <div class="w-[1200px] mx-auto pt-4">
      <Header @add-container="addNewContainer" @del-active-container="delActiveItem" />

      <div class="flex mt-4">
        <ul class="flex flex-col">
          <ContainerList v-for="(containerItem, index) in containerItems" :itemTitle="containerItem.title"
            :isActive="containerItem.active" @change-active="changeActiveItem(index)" />
        </ul>
        <div class="">
          <Droppabble v-for="(containerItem, index) in containerItems"
            :itemSize="[containerItem.heigth, containerItem.width]"
            :itemCoords="[containerItem.top, containerItem.left]" :itemTitle="containerItem.title"
            @modal-window="delModalWindow(index)" @modal-content-window="modalCont(index)"
            :isActive="containerItem.active" @change-active="changeActiveItem(index)" />
        </div>
        <!-- <ul class="flex flex-row flex-wrap mb-10 ">
          <ContainerWorkspace
            v-for="(containerItem, index) in containerItems"
            :itemSize="[containerItem.heigth, containerItem.width]"
            :itemCoords="[containerItem.top, containerItem.left]"
            :itemTitle="containerItem.title"
            @modal-window="delModalWindow(index)"
            @modal-content-window="modalCont(index)"
            :isActive="containerItem.active"
            @change-active="changeActiveItem(index)"
          />
        </ul> -->
      </div>
    </div>
    <ModalDel :switchModal="modalDel" @del-container-item="delContainerItem" @close-modal="closeModal" />
    <ModalContent :switchModal="modalContent" @close-modal="closeModal" />

  </div>
</template>
