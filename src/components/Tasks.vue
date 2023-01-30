<template>
  <div>
    <div v-if="blankPage" class="mb-4 p-4 mx-auto">
      <p>Wow! You don't have any task yet.<br />Start creating one</p>
    </div>
    <div class="relative">
      <div class="absolute top-4 right-4">
        <button @click="reCheck" class="">
          <i class="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>
      <div class="absolute container pt-8 pl-8 mx-auto">
        <div
          v-for="el in tasksArray"
          class="flex justify-between pt-4 border-b-slate-400 border-b"
        >
          <div class="flex">
            <div class="mr-8">
              <time id="timestamp" class="timestamp">{{ el.due_date }}</time>
              <p id="priority" class="">{{ el.priority }}</p>
            </div>
            <div>
              <p id="title" class="">{{ el.title }}</p>
              <p id="details" class="">{{ el.details }}</p>
            </div>
          </div>
          <div id="edit" class="flex">
            <button class="mx-auto" @click="edit">
              <i class="fa-regular fa-pen-to-square w-16 h-16"></i>
            </button>
            <StatusTask
              :taskId="el.id"
              :status="el.is_complete"
              @reCheck="reCheck"
            ></StatusTask>
            <DeleteTask :taskId="el.id" @reCheck="reCheck"></DeleteTask>
          </div>
        </div>
        <!-- <EditTask
            v-if="editForm"
            :title="el.title"
            :details="el.details"
            :dueDate="el.due_date"
            :priority="el.priority"
          ></EditTask> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, toRefs } from "vue";
import { useTaskStore } from "../store/task";
import EditTask from "./EditTask.vue";
import DeleteTask from "./DeleteTask.vue";
import StatusTask from "./StatusTask.vue";

const taskStore = useTaskStore();

const tasksArray = ref([]);
const blankPage = ref(false);
const errMsg = ref(null);



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
};
</script>

<style lang="scss" scoped></style>
