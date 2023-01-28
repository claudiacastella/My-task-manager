<template>
    <div>
        <div v-if="blankPage" class="mb-4 p-4 mx-auto">
            <p>Wow! You don't have any task yet.<br />Start creating one</p>
        </div>

        <div v-for="el in tasksArray" class="flex">
            <div>
                <time id="timestamp" class="timestamp">{{ el.due_date }}</time>
                <p id="title" class="">{{ el.title }}</p>
                <p id="priority" class="">{{ el.priority }}</p>
                <p id="details" class="">{{ el.details }}</p>
            </div>
            <div id="edit" class="flex border-2 border-solid border-red-500">
                <button class="mx-auto" @click="edit">
                <i class="fa-regular fa-pen-to-square w-16 h-16"></i>
                </button>
                <button @click="stateTask" class="mx-auto">
                <i :class="checked" class="fa-circle-check w-16 h-16"> </i>
                </button>
                <DeleteTask :taskId="el.id" @reCheck="reCheck"></DeleteTask>
            </div>
            <EditTask v-if="editForm" :title="el.title" :details="el.details" :dueDate="el.due_date" :priority="el.priority"></EditTask>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch, toRefs } from "vue";
import { useTaskStore } from "../store/task";
import EditTask from "./EditTask.vue";
import DeleteTask from "./DeleteTask.vue"

const taskStore = useTaskStore();

const tasksArray = ref([]);
const blankPage = ref(false);
const errMsg = ref(null);

const checked = ref("fa-regular");

// Pasar a vista edición 
const editForm = ref(false);

function edit() {
  editForm.value = true;
}

// Checkear tareas
onMounted(async () => {
  try {
    await taskStore.fetchTasks();
    tasksArray.value = taskStore.tasks;
    if (tasksArray.length === 0) {
      blankPage.value = true;
    } else blankPage.value = false;
  } catch (error) {
    console.log("Error retrieving tasks");
  }
});

// Volver a checkear/ updatear lista

const reCheck = async () => {
    await taskStore.fetchTasks();
    tasksArray.value = taskStore.tasks;
}


// Marcar como completado/desmarcar
const stateTask = async () => {
  try {
    console.log(el.id + " " + el.is_complete);
    await taskStore.stateTask(el);
    checked.value === "fa-regular"
      ? (checked.value = "fa-solid")
      : (checked.value = "fa-regular");
  } catch (error) {
    if (error instanceof Error) {
      errMsg.value = error.message;
      setTimeout(() => {
        errMsg.value = null;
      }, 5000);
    }
  }
};
</script>

<style lang="scss" scoped></style>
