<template>
  <form
    class="bg-white max-w-md mx-auto flex flex-col items-center rounded-3xl border-2 border-black text-black p-5 space-y-3"
    @submit.prevent
  >
    <div class="relative z-0 w-full mb-5 flex justify-center">
      <input
        type="text"
        name="portadaInput"
        v-model="portadaInput"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none dark:focus:border-[#5CBBF2] focus:outline-none focus:ring-0 focus:border-[#5CBBF2] peer"
        placeholder=" "
        :required="!isUpdating"
      />
      <label
        for="portadaInput"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#5CBBF2] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Portada</label
      >
    </div>
    <div class="relative z-0 w-full mb-5 flex justify-center">
      <input
        type="text"
        name="tituloInput"
        v-model="tituloInput"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none dark:focus:border-[#5CBBF2] focus:outline-none focus:ring-0 focus:border-[#5CBBF2] peer"
        placeholder=" "
        :required="!isUpdating"
      />
      <label
        for="tituloInput"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#5CBBF2] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Titulo</label
      >
    </div>
    <div class="relative z-0 w-full mb-5 flex justify-center">
      <input
        type="text"
        name="autorInput"
        v-model="autorInput"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none dark:focus:border-[#5CBBF2] focus:outline-none focus:ring-0 focus:border-[#5CBBF2] peer"
        placeholder=" "
        :required="!isUpdating"
      />
      <label
        for="autorInput"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#5CBBF2] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Autor</label
      >
    </div>
    <div class="relative z-0 w-full mb-5 flex justify-center">
      <input
        type="number"
        min="0"
        max="2030"
        name="anioPublicacionInput"
        v-model="anioPublicacionInput"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none dark:focus:border-[#5CBBF2] focus:outline-none focus:ring-0 focus:border-[#5CBBF2] peer"
        placeholder=" "
        :required="!isUpdating"
      />
      <label
        for="anioPublicacionInput"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#5CBBF2] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Año de publicación</label
      >
    </div>
    <p v-if="nothingToChange">No hay ningún campo diferente para actualizar</p>
    <div class="space-x-2">
      <button
        v-if="isUpdating"
        class="cursor-pointer inline-flex items-center justify-center px-3 py-2 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none"
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
  </form>
</template>

<script setup>
import { ref, watch } from "vue";
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
const nothingToChange = ref(false);
const ogBookData = ref({
  id: props.id,
  portada: props.portada,
  titulo: props.titulo,
  autor: props.autor,
  anioPublicacion: props.anioPublicacion,
});
const emit = defineEmits(["bookUpdated", "bookCreated"]);

const handleUpdate = async () => {
  const updatedbookData = {
    id: props.id,
    portada: portadaInput.value,
    titulo: tituloInput.value,
    autor: autorInput.value,
    anioPublicacion: Number(anioPublicacionInput.value),
  };

  for (const key in updatedbookData) {
    if (updatedbookData[key] !== ogBookData.value[key]) {
      await updateBook(props.id, updatedbookData);
      emit("bookUpdated", updatedbookData);
      nothingToChange.value = false;
    }
  }
  
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

watch(
  () => ({ ...props }), // o incluso solo un array de props individuales
  (newProps) => {
    portadaInput.value = newProps.portada;
    tituloInput.value = newProps.titulo;
    autorInput.value = newProps.autor;
    anioPublicacionInput.value = newProps.anioPublicacion;
    ogBookData.value = {
      id: newProps.id,
      portada: newProps.portada,
      titulo: newProps.titulo,
      autor: newProps.autor,
      anioPublicacion: newProps.anioPublicacion,
    };
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>
