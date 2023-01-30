<template>
  <button @click="stateTask" class="mx-auto">
    <i :class="checked" class="fa-circle-check w-16 h-16 "> </i>
  </button>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../store/task";
import { defineEmits } from "vue";
import { defineProps } from "vue";

const props = defineProps(["taskId", "status"]);
const emits = defineEmits(["reCheck"]);

const taskId = props.taskId;
let state = props.status;

const taskStore = useTaskStore();

const errMsg = ref(null);

const checked = ref(null);
if (state === false) {
    checked.value = "fa-regular";
} else checked.value = "fa-solid";

// Marcar como completado/desmarcar
const stateTask = async () => {
  try {
    state = !state ;
    await taskStore.stateTask(taskId, state);
    checked.value === "fa-regular"
     ? checked.value = "fa-solid text-green-500"
     : checked.value = "fa-regular";
  } catch (error) {
    if (error instanceof Error) {
      errMsg.value = error.message;
      setTimeout(() => {
        errMsg.value = null;
      }, 5000);
    }
  } finally {
    emits("reCheck");
  }
};
</script>

<style lang="scss" scoped></style>
