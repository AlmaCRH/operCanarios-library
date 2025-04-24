<template>
  <div
    class="bg-white rounded-3xl border-2 border-black text-black max-h-fit p-5 space-y-3"
  >
    <label>
      <span>Portada: </span>
      <input
        v-model="portadaInput"
        type="text"
        placeholder="https://exampleimg.com"
      />
    </label>
    <label>
      <span>Titulo: </span>
      <input v-model="tituloInput" type="text" placeholder="Titulo" />
    </label>
    <label>
      <span>Autor: </span>
      <input v-model="autorInput" type="text" placeholder="Autor" />
    </label>
    <label>
      <span>Año de publicación: </span>
      <input
        v-model="anioPublicacionInput"
        type="number"
        min="0"
        max="2030"
        placeholder="Año de publicación"
      />
    </label>
    <div class="space-x-2">
      <button
        v-if="isUpdating"
        class="cursor-pointer inline-flex items-center justify-center px-3 py-2 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
        @click="handleUpdate"
      >
        Actualizar libro
      </button>
      <button
        v-else
        class="cursor-pointer inline-flex items-center justify-center px-3 py-2 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
        @click="handleCreate"
      >
        Añadir libro
      </button>
      <button
        class="cursor-pointer inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none0"
        @click="handleModal"
      >
        Cerrar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { updateBook, createBook } from "../services/bookService";
const props = defineProps({
  id: Number,
  portada: String,
  titulo: String,
  autor: String,
  anioPublicacion: Number,
  handleModal: Function,
  isUpdating: Boolean,
});

const portadaInput = ref(props.portada);
const tituloInput = ref(props.titulo);
const autorInput = ref(props.autor);
const anioPublicacionInput = ref(props.anioPublicacion);

const emit = defineEmits(["bookUpdated", "bookCreated"]);

const handleUpdate = async () => {
  const updatedbookData = {
    portada: portadaInput.value,
    titulo: tituloInput.value,
    autor: autorInput.value,
    anioPublicacion: anioPublicacionInput.value,
  };
  await updateBook(props.id, updatedbookData);

  emit("bookUpdated", updatedbookData);
};

const handleCreate = async () => {
  const updatedbookData = {
    portada: portadaInput.value,
    titulo: tituloInput.value,
    autor: autorInput.value,
    anioPublicacion: anioPublicacionInput.value,
  };
  await createBook(updatedbookData);
  emit("bookCreated", updatedbookData);
};
</script>
