<template>
  <button @click="deleteEl" class="mx-auto">
    <i class="fa-solid fa-trash w-8 h-8"></i>
  </button>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useTaskStore } from "../store/task";
import { defineEmits } from "vue";

const props = defineProps(["taskId"]);
const emits = defineEmits(["reCheck"]);

const taskId = props.taskId;

const taskStore = useTaskStore();
const errMsg = ref(null);

// Eliminar tarea
const deleteEl = async () => {
  try {
    await taskStore.deleteTask(taskId);
  } catch (error) {
    errMsg.value = error.message;
    setTimeout(() => {
      errMsg.value = null;
    }, 5000);
  } finally {
    emits("reCheck");
  }
};
</script>

<style lang="scss" scoped></style>
