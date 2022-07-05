<script>
import Header from "./components/Header.vue";
import ContainerList from "./components/ContainerList.vue";
import ContainerWorkspace from "./components/ContainerWorkspace.vue";
import ModalDel from "./components/ModalDel.vue";
import ModalContent from "./components/ModalContent.vue";
// import Droppabble from "./components/Droppabble.vue";
export default {
  components: {
    // регистрация компонентов
    Header,
    ContainerList,
    ContainerWorkspace,
    ModalDel,
    ModalContent,
    // Droppabble
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
          left: 0,
          width: "200px",
          heigth: "200px"
        },
      ],
      modalDel: false,
      modalContent: false,
      indexItem: undefined,
      isResizing: false,
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
    changeActiveItem: function (index) {
      this.containerItems[index].active = true;
      this.containerItems.forEach((item, i) => {
        if (i != index) {
          item.active = false;
        }
      });
    },
    delModalWindow: function (index) {
      this.modalDel = true;
      // state.todoItems.splice(index, 1);
      this.indexItem = index;
    },
    modalCont: function (index) {
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
    mousedown:
      function (event, index) {
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);
        // 
        let prevX = event.clientX;
        let prevY = event.clientY;
        console.log(prevX)
        function mousemove(e) {
          if (!this.isResizing) {

            let newX = prevX - e.clientX;
            let newY = prevY - e.clientY;
           
            this.containerItems[index].left = this.containerItems.left - newX + 'px'
            this.containerItems[index].top = this.containerItems.top - newY + 'px'
            prevX = e.clientX;
            prevY = e.clientY;
          }
        }
        function mouseup() {
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      },

  }
}
</script>

<template>

  <div data-theme="light" class="min-h-screen bg-primary-content text-neutral test">
    <div class="w-[1200px] mx-auto pt-4">
      <Header @add-container="addNewContainer" @del-active-container="delActiveItem" />

      <div class="flex mt-4">
        <ul class="flex flex-col">
          <ContainerList v-for="(containerItem, index) in containerItems" :itemTitle="containerItem.title"
            :isActive="containerItem.active" @change-active="changeActiveItem(index)" />
        </ul>
        <ul class="flex flex-row flex-wrap mb-10 ">
          <ContainerWorkspace v-for="(containerItem, index) in containerItems"
            :itemSize="[containerItem.heigth, containerItem.width]"
            :itemCoords="[containerItem.top, containerItem.left]" :itemTitle="containerItem.title"
            :isActive="containerItem.active" @modal-window="delModalWindow(index)"
            @modal-content-window="modalCont(index)" @change-active="changeActiveItem(index)"
            @mousedown-res="mousedown($event, index)" />
        </ul>
      </div>
    </div>
    <ModalDel :switchModal="modalDel" @del-container-item="delContainerItem" @close-modal="closeModal" />
    <ModalContent :switchModal="modalContent" @close-modal="closeModal" />

  </div>
</template>
