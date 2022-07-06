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
          width: 200,
          heigth: 200,
          top: 92,
          left: 140,
          width: 200,
          heigth: 200
        },
      ],
      modalDel: false,
      modalContent: false,
      indexItem: undefined,
      isResizing: false,
      historyPrev: [],
      historyNext: [],
      activeButtonNext: false,
      activeButtonPrev: false,
    };
  },
  // 
  methods: {
    addNewContainer() {
      this.historyPrev.push(this.containerItems.map(item => item))
      this.activeButtonPrev = true
      this.containerItems.push({
        title: `контейнер ${this.containerItems.length + 1}`,
        active: false,
        width: 200,
        heigth: 200,
        top: 92,
        left: 360,
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
      this.historyPrev.push(this.containerItems.map(item => item))
      this.activeButtonPrev = true
      this.containerItems.splice(this.indexItem, 1);
      this.indexItem = undefined;
      // console.log(state.indexItem);
      this.closeModal();
    },
    delActiveItem() {
      this.historyPrev.push(this.containerItems.map(item => item))
      this.activeButtonPrev = true
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
    prevHistory() {
      // if (this.historyPrev.length === 0) {
      //   return this.activeButtonPrev = false
      // }
      this.activeButtonNext = true
      this.historyNext.push(this.containerItems.map(item => item))
      this.containerItems = this.historyPrev.pop(this.historyPrev.at(-1), 1)
      if (this.historyPrev.length === 0) {
        return this.activeButtonPrev = false
      }

    },
    nextHistory() {
      // if (this.historyNext.length === 0) {
      //   return this.activeButtonNext = false
      // }
      this.activeButtonPrev = true
      this.historyPrev.push(this.containerItems.map(item => item))
      this.containerItems = this.historyNext.pop(this.historyNext.at(-1), 1)
      if (this.historyNext.length === 0) {
        return this.activeButtonNext = false
      }
    },
    saveHistory() {
      this.activeButtonNext = false
      this.activeButtonPrev = false
      this.historyPrev = [];
      this.historyNext = [];
    },

    mousedown(event, index) {
      //  this.historyPrev.push(this.containerItems.map(item => item))
      //  console.log(this.containerItems[index].left, this.containerItems[index].top)
      //  console.log(this.historyPrev);
      // 
      let prevX = event.clientX;
      let prevY = event.clientY;
      // let test = this;
      // console.log(test.containerItems)
      const mousemove = (e) => {
        if (!this.isResizing) {
          let newX = prevX - e.clientX;
          let newY = prevY - e.clientY;
          // this.historyPrev.push(this.containerItems.map(item => item))
          // this.activeButtonPrev = true
          this.containerItems[index].left -= newX
          this.containerItems[index].top -= newY
          prevX = e.clientX;
          prevY = e.clientY;
        }
      }
      const mouseup = () => {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      }

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

    },
    mousedownResizing(event, index) {
      let currentResizer = event.target;
      this.isResizing = true;
      // console.log(currentResizer);
      let prevX = event.clientX;
      let prevY = event.clientY;
      // console.log(prevX, prevY);
      console.log(`x${prevX}, y${prevY}`)
      const mousemove = (e) => {
        if(currentResizer.classList.contains("se")){
          console.log(this.containerItems[index].width);
          this.containerItems[index].width = e.clientX - prevX;
          this.containerItems[index].heigth = e.clientY - prevY;
        }else if(currentResizer.classList.contains("sw")){
           this.containerItems[index].width = e.clientX
           this.containerItems[index].heigth = e.clientY - 110;
           this.containerItems[index].left = e.clientX
        }else if(currentResizer.classList.contains("ne")){
           this.containerItems[index].width = e.clientX
           this.containerItems[index].heigth = e.clientY - 110;
           this.containerItems[index].top = e.clientY
        }else {
           this.containerItems[index].width = e.clientX
           this.containerItems[index].heigth = e.clientY - 110;
           this.containerItems[index].top = e.clientX
           this.containerItems[index].left = e.clientX
        }


      }
      const mouseup = () => {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
        this.isResizing = false;
      }

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);
    },
  }
}
</script>

<template>

  <div data-theme="light" class="min-h-screen bg-primary-content text-neutral test">
    <div class="w-[1200px] mx-auto pt-4 relative">
      <Header @add-container="addNewContainer" @del-active-container="delActiveItem" @history-return="prevHistory"
        @history-next="nextHistory" @history-save="saveHistory" :activeButton="[activeButtonPrev, activeButtonNext]" />

      <div class="flex mt-4">
        <ul class="flex flex-col">
          <ContainerList v-for="(containerItem, index) in containerItems" :itemTitle="containerItem.title"
            :isActive="containerItem.active" @change-active="changeActiveItem(index)" />
        </ul>
        <ul class="flex flex-row flex-wrap mb-10 ">
          <ContainerWorkspace v-for="(containerItem, index) in containerItems" :indexItem="index"
            :itemSize="[containerItem.heigth, containerItem.width]"
            :itemCoords="[containerItem.top, containerItem.left]" :itemTitle="containerItem.title"
            :isActive="containerItem.active" @modal-window="delModalWindow(index)"
            @modal-content-window="modalCont(index)" @change-active="changeActiveItem(index)"
            @mousedown-res="mousedown($event, index)" @mousedown-resizing="mousedownResizing($event, index)" />
        </ul>
      </div>
    </div>
    <ModalDel :switchModal="modalDel" @del-container-item="delContainerItem" @close-modal="closeModal" />
    <ModalContent :switchModal="modalContent" @close-modal="closeModal" />

  </div>
</template>
