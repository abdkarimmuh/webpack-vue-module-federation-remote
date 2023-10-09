<template>
  <div class="bg-blue-500 p-4">
    <h1 class="text-white">Hello from Vue and Tailwind CSS!</h1>
  </div>
  <div class="pt-4">
    <button
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
      @click="minus"
    >
      -
    </button>
    <h4>{{ count }}</h4>
    <button
      type="button"
      class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      @click="plus"
    >
      +
    </button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
};
</script>

<script setup>
import { computed, defineExpose } from "vue";
import { useStore } from "vuex";

const store = useStore();

const count = computed({
  get() {
    return store.getters["counter/getCounter"];
  },
  set(value) {
    store.commit("counter/setCounter", value);
  },
});

const plus = () => {
  store.dispatch("counter/increment");
};

const minus = () => {
  store.dispatch("counter/decrement");
};

defineExpose({ count, plus, minus });
</script>


<style scoped>
@import "@/assets/css/tailwind.css";
</style>