<template>
  <form
    class="bg-white max-w-[381px] min-w-[294px] mx-auto flex flex-col items-center rounded-3xl border-2 border-black text-black p-5 space-y-3"
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
    <p v-if="hasErrors">Tiene un error en alguno de los campos</p>

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
const props = defineProps({ //esta función nos permitirá recoger los props definidos en el padre
  id: Number,
  portada: String,
  titulo: String,
  autor: String,
  anioPublicacion: Number,
  handleModal: Function,
  isUpdating: Boolean,
});

const portadaInput = ref(props.portada); //portadaInput es una variable reactiva que se inicializa con el valor de la propiedad portada, así sucesivamente
const tituloInput = ref(props.titulo);
const autorInput = ref(props.autor);
const anioPublicacionInput = ref(props.anioPublicacion);
const hasErrors = ref(false); // variable reactiva que se inicializa en false para indicar si hay errores

const ogBookData = ref({ // objeto reactiva que contiene los datos originales del libro
  id: props.id,
  portada: props.portada,
  titulo: props.titulo,
  autor: props.autor,
  anioPublicacion: props.anioPublicacion,
});
const emit = defineEmits(["bookUpdated", "bookCreated"]); //emitimos los eventos al padre

const handleUpdate = async () => { //maneja la actualización del libro
  const updatedbookData = { // objeto que contiene los nuevos datos del libro
    id: props.id,
    portada: portadaInput.value,
    titulo: tituloInput.value,
    autor: autorInput.value,
    anioPublicacion: Number(anioPublicacionInput.value),
  };

  if (isDifferentFromOgData()) { //si los datos son diferentes de los originales se llama a la API para actualizarlos y emitimos el evento al padre
    await updateBook(props.id, updatedbookData);
    emit("bookUpdated", updatedbookData);
    hasErrors.value = false; // se establece en false para indicar que no hay errores
  } else {
    hasErrors.value = true; // se establece en true para indicar que hay errores
  }
};

const isDifferentFromOgData = () => { //función que comprueba si los datos son diferentes de los originales o si el campo del año corresponde a un número entre 0 y 2030
  return (
    portadaInput.value !== ogBookData.value.portada ||
    tituloInput.value !== ogBookData.value.titulo ||
    autorInput.value !== ogBookData.value.autor ||
    anioPublicacionInput.value !== ogBookData.value.anioPublicacion ||
    anioPublicacionInput.value > 2030 ||
    anioPublicacionInput.value < 0
  );
};

const isAFieldEmpty = () => { //función que comprueba si alguno de los campos está vacío o si el campo del año corresponde a un número entre 0 y 2030
  return (
    !portadaInput.value?.trim() ||
    !tituloInput.value?.trim() ||
    !autorInput.value?.trim() ||
    !anioPublicacionInput.value === null ||
    !anioPublicacionInput.value === undefined ||
    !anioPublicacionInput.value === "" ||
    anioPublicacionInput.value > 2030 ||
    anioPublicacionInput.value < 0
  );
};

const handleCreate = async () => { //maneja la creación de un nuevo libro
  const bookData = { // objeto que contiene los datos del libro
    portada: portadaInput.value,
    titulo: tituloInput.value,
    autor: autorInput.value,
    anioPublicacion: anioPublicacionInput.value,
  };
  if (isAFieldEmpty()) { //si alguno de los campos está vacío se establece en true para indicar que hay errores
    hasErrors.value = true;
    return;
  } else { //si los datos son correctos se llama a la API para crear el libro y emitimos el evento al padre
    const newBook = await createBook(bookData);
    emit("bookCreated", newBook);
    hasErrors.value = false; // se establece en false para indicar que no hay errores
  }
};

watch(//watch se utiliza para observar cambios en las propiedades del componente
  () => ({ ...props }), //se pasa un objeto con las propiedades del componente
  (newProps) => {  //se pasa una función que se ejecuta cuando las propiedades cambian

    //se actualizan los valores de las variables reactivas
    portadaInput.value = newProps.portada;
    tituloInput.value = newProps.titulo;
    autorInput.value = newProps.autor;
    anioPublicacionInput.value = newProps.anioPublicacion;

    //se actualizan los valores de la variable reactiva
    ogBookData.value = {
      id: newProps.id,
      portada: newProps.portada,
      titulo: newProps.titulo,
      autor: newProps.autor,
      anioPublicacion: newProps.anioPublicacion,
    };
  },
  {
    immediate: true, //se ejecuta la función inmediatamente
    deep: true, //se ejecuta la función de manera recursiva
  }
);
</script>
