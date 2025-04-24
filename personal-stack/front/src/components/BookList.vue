<template>
  <div class="p-10 overflow-y-scroll grid grid-cols-2 justify-items-center">
    <div class="flex items-center">
      <BookCard
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
          :portada="book.portada"
          :titulo="book.titulo"
          :autor="book.autor"
          :anioPublicacion="book.anioPublicacion"
          :isSelected="false"
          @click="selectedBook(book)"
        />
      </div>

      <button
        class="cursor-pointer inline-flex items-center justify-center px-3 py-2 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 z-20"
        @click="handleModal"
      >
        Añadir libro
      </button>
    </div>
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
import { ref, onMounted, Transition } from "vue";
import { getBooks } from "../services/bookService";
import BookCard from "./BookCard.vue";
import modalBook from "./modalBook.vue";

const booksList = ref([]);
const bookSelected = ref([]);
const openModal = ref(false);

const selectedBook = (book) => {
  const bookIndex = booksList.value.indexOf(book);
  if (bookIndex !== -1) {
    const retrieveBook = bookSelected.value.pop();
    bookSelected.value = booksList.value.splice(bookIndex, 1);
    booksList.value.splice(bookIndex, 0, retrieveBook);
  }
};

const handleModal = () => {
  openModal.value = !openModal.value;
};

const handleSelectedBookUptaded = (updatedBook) => {
  bookSelected.value[0] = updatedBook;
};

const handleNewBookCreated = (newBook) => {
  booksList.value.push(newBook);
};

const handleSelectedBookDeleted = () => {
  bookSelected.value = booksList.value.splice(0, 1);
};

onMounted(async () => {
  booksList.value = await getBooks();
  bookSelected.value = booksList.value.splice(0, 1);
});
</script>

<style scoped></style>
