<template>
  <div class="p-10 overflow-y-scroll grid grid-cols-2 justify-items-center">
    <div class="flex items-center">
      <BookCard
        v-if="bookSelected.length > 0"
        :id="bookSelected[0]?.id"
        :portada="bookSelected[0]?.portada"
        :titulo="bookSelected[0]?.titulo"
        :autor="bookSelected[0]?.autor"
        :anioPublicacion="bookSelected[0]?.anioPublicacion"
        :isSelected="true"
        @bookUpdated="handleSelectedBookUptaded"
        @bookDeleted="handleSelectedBookDeleted"
      />
    </div>
    <div class="flex flex-col justify-center relative">
      <div
        class="overflow-y-auto max-h-[40rem] space-y-4 mb-5 relative z-0 rounded-lg"
      >
        <BookCard
          v-for="book in booksList"
          v-bind:key="book.id"
          :id="book.id"
          :portada="book.portada"
          :titulo="book.titulo"
          :autor="book.autor"
          :anioPublicacion="book.anioPublicacion"
          :isSelected="false"
          @click="selectedBook(book)"
        />
      </div>
    </div>
    <button
      class="cursor-pointer fixed bottom-32 left-1/2 transform -translate-x-1/2 w-32 inline-flex items-center justify-center px-3 py-2 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 z-20"
      @click="handleModal"
    >
      Añadir libro
    </button>
    <Transition name="fade-rotate">
      <modalBook
        v-if="openModal"
        :handleModal="handleModal"
        @bookCreated="handleNewBookCreated"
        class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col z-50"
      />
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, Transition } from "vue"; // para trabajar con reactividad y animaciones
import { getBooks } from "../services/bookService";
import BookCard from "./BookCard.vue";
import modalBook from "./modalBook.vue";

const booksList = ref([]); // lista de libros
const bookSelected = ref([]); // libro seleccionado
const openModal = ref(false); // controla la apertura y cierre del modal

/*
Selecciona un libro de la lista y lo pasa a la izquierda, quitándolo también de la lista principal.
*/
const selectedBook = (book) => { 
  const bookIndex = booksList.value.indexOf(book);
  if (bookIndex !== -1) {
    const retrieveBook = bookSelected.value.pop();
    bookSelected.value = booksList.value.splice(bookIndex, 1);
    booksList.value.splice(bookIndex, 0, retrieveBook);
  }
};
// Maneja el estado del modal
const handleModal = () => {
  openModal.value = !openModal.value;
};

// Maneja la actualización del libro seleccionado
const handleSelectedBookUptaded = (updatedBook) => {
  bookSelected.value[0] = updatedBook;
};

// Maneja la creación de un nuevo libro, en caso de que no haya en la base de datos y se cree manualmente, pasa directamente a la izquierda
const handleNewBookCreated = (newBook) => {
  if (bookSelected.value.length === 0 && booksList.value.length === 0) {
    bookSelected.value = [newBook];
  } else {
    booksList.value.push(newBook);
  }
};
// Maneja la eliminación del libro seleccionado
const handleSelectedBookDeleted = () => {
  bookSelected.value = booksList.value.splice(0, 1);
};
// Obtiene los libros de la base de datos y en caso de que haya asigna el primero a la izquierda, todo esto cuando el componente se monta
onMounted(async () => {
  booksList.value = await getBooks();
  bookSelected.value = booksList.value.splice(0, 1);
});
</script>
