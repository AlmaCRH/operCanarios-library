<template>
  <div
    :class="{ isSelected: isSelected }"
    class="max-w-lg w-52 p-6 text-white bg-[#bbbbbbbe] rounded-lg shadow-sm text-center flex items-center flex-col mb-3"
  >
    <img :src="portada" class="mb-3" />
    <h5 class="text-2xl mb-2">{{ titulo }}</h5>
    <p class="mb-3">{{ autor }}</p>
    <p class="mb-3">{{ anioPublicacion }}</p>
    <div class="space-x-2">
      <a
        v-if="isSelected"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-white rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none"
        @click="handleModal"
        :id="id"
      >
        Editar libro
      </a>
      <a
        v-if="isSelected"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none0"
        @click="handleDeleteBook"
      >
        Eliminar libro
      </a>
    </div>
    <Transition name="fade-rotate">
      <modalBook
        v-if="openModal"
        class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col z-50"
        :id="id"
        :anioPublicacion="anioPublicacion"
        :portada="portada"
        :titulo="titulo"
        :autor="autor"
        @bookUpdated="handleBookUpdated"
        :handleModal="handleModal"
        :isUpdating="true"
      />
    </Transition>
  </div>
</template>

<script setup>
import { ref, Transition } from "vue";
import modalBook from "./modalBook.vue";
import { deleteBook } from "../services/bookService";
const props = defineProps({
  id: Number,
  portada: String,
  titulo: String,
  autor: String,
  anioPublicacion: Number,
  isSelected: Boolean,
});

const openModal = ref(false);

const handleModal = () => {
  openModal.value = !openModal.value;
};

const emit = defineEmits(["bookUpdated", "bookDeleted"]);

const handleBookUpdated = (updatedBook) => {
  emit("bookUpdated", updatedBook);
};


const handleDeleteBook = () => {
  deleteBook(props.id);
  emit("bookDeleted", props.id);
};
</script>

<style scoped>
.isSelected {
  background-color: #918181;
  height: auto;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
