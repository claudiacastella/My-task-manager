<template class="bg-orange-100">
  <div class="container relative">
    <!-- Botón para refrescar el componente de los listados -->
    <div class="absolute top-4 right-12">
      <button @click="reCheck" class="">
        <i class="fa-solid fa-arrows-rotate"></i>
      </button>
    </div>

    <!-- Si no hay tareas, blank page -->
    <div v-if="blankPage" class="max-w-sm mt-8 p-4 mx-auto">
      <p>
        Welcome to our platform, where you can stay organized and achieve your
        goals with ease! Our platform provides you with a simple and intuitive
        way to manage your tasks and stay on top of your to-do list. Whether you
        are a busy professional, a student, or just looking to streamline your
        daily routine, our platform has everything you need to get things done.
        With features like task prioritization, deadline reminders, and progress
        tracking, you'll never miss a beat. So why wait? Start organizing your
        tasks and taking control of your day today!
      </p>
    </div>

    <!-- Si hay tareas, listados -->
    <div v-else class="">
      <div class="absolute mt-8 pt-4 px-8 container mx-auto">
        <!-- Listado de tareas To Do-->
        <div class="mb-12">
          <h3 class="text-xl border-b-4 mb-6">Tasks To Do</h3>
          <div
            v-for="(el, index) in tasksToDo"
            :key="el.id"
            class="flex justify-between py-4 border-b-slate-200 border-b"
          >
            <div v-if="!el.edit" class="flex">
              <div class="mr-12">
                <time id="timestamp" class="timestamp">{{ el.due_date }}</time>
                <p id="priority" class="">{{ el.priority }}</p>
              </div>
              <div>
                <h2 id="title" class="font-medium">{{ el.title }}</h2>
                <p id="details" class="">{{ el.details }}</p>
              </div>
            </div>
            <div v-else class="mx-24 bg-stone-100 w-full relative p-8">
              <button @click="el.edit = false" class="absolute right-4 top-4">
                <i class="fa-solid fa-xmark"></i>
              </button>
              <form @submit.prevent="updateTask(el)">
                <div class="flex flex-row mr-8">
                  <div class="flex flex-col flex-none mr-8 bg-white rounded">
                    <input
                      type="date"
                      class="max-w-fit p-2 rounded-lg"
                      v-model="el.due_date"
                      required
                    />

                    <select
                      class="max-w-fit p-2 rounded-lg w-100"
                      v-model="el.priority"
                      required
                    >
                      <option value="High">High</option>
                      <option value="Hedium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div class="flex flex-col grow bg-white rounded">
                    <input
                      type="text"
                      class="p-2 border-b-2 border-stone-100"
                      v-model="el.title"
                      required
                    />

                    <textarea
                      type="text"
                      class="p-2 rounded-lg"
                      v-model="el.details"
                      required
                    >
                    </textarea>
                  </div>
                </div>
                
                <button
                  type="submit"
                  class="mt-8 py-2 px-6 rounded-lg self-start text-md bg-stone-500 hover:bg-stone-400 text-white font-bold duration-200"
                >
                  Save
                </button>
                <div class="errorMsg text-center inline" v-if="errMsg">{{ errMsg }}</div>
                <div class="succesMsg text-center inline" v-if="sucMsg">{{ sucMsg }}</div>
              </form>
            </div>

            <div id="edit" class="flex-row flex-nowrap sm:flex-col min-w-fit" v-if="!el.edit">
              <button class="mx-auto" @click="el.edit = true">
                <i class="fa-regular fa-pen-to-square w-8 h-8"></i>
              </button>
              <StatusTask
                :taskId="el.id"
                :status="el.is_complete"
                @reCheck="reCheck"
              ></StatusTask>
              <DeleteTask :taskId="el.id" @reCheck="reCheck"></DeleteTask>
            </div>
          </div>
        </div>

        <!-- Listado de tareas completadas-->
        <div>
          <h3 class="text-xl border-b-4 mb-6">Tasks Completed</h3>
          <div
            v-for="el in tasksCompleted"
            :key="el.id"
            class="flex justify-between pt-4 border-b-slate-200 border-b"
          >
            <div class="flex">
              <div class="mr-12">
                <time id="timestamp" class="timestamp">{{ el.due_date }}</time>
                <p id="priority" class="">{{ el.priority }}</p>
              </div>
              <div>
                <h2 id="title" class="font-medium">{{ el.title }}</h2>
                <p id="details" class="">{{ el.details }}</p>
              </div>
            </div>
            <div id="edit" class="flex">
              <button class="mx-auto" @click="openEdit(el)">
                <i class="fa-regular fa-pen-to-square w-8 h-8"></i>
              </button>
              <StatusTask
                :taskId="el.id"
                :status="el.is_complete"
                @reCheck="reCheck"
              ></StatusTask>
              <DeleteTask :taskId="el.id" @reCheck="reCheck"></DeleteTask>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, toRefs } from "vue";
import { useTaskStore } from "../store/task";
import DeleteTask from "./DeleteTask.vue";
import StatusTask from "./StatusTask.vue";

const taskStore = useTaskStore();

const tasksArray = ref([]);
const tasksToDo = ref([]);
const tasksCompleted = ref([]);

const blankPage = ref(null);
const errMsg = ref(null);
const sucMsg = ref(null);

// Checkear tareas
onMounted(async () => {
  try {
    await taskStore.fetchTasks();
    tasksArray.value = taskStore.tasks;
    tasksToDo.value = taskStore.tasksToDo;
    tasksCompleted.value = taskStore.tasksCompleted;
    if (tasksArray.value.length === 0) {
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
  tasksToDo.value = taskStore.tasksToDo;
  tasksCompleted.value = taskStore.tasksCompleted;
};

// Funcion update Task
const updateTask = async (el) => {
  try {
    await taskStore.editTask(el);
    sucMsg.value="Task successfully edited";
    setTimeout(() => {
        sucMsg.value = null;
      }, 5000);
  } catch (error) {
    errMsg.value = error.message;
    setTimeout(() => {
      errMsg.value = null;
    }, 5000);
  } finally {
    setTimeout(() => {
      el.edit = false;
      }, 5000);
  }
};

</script>

<style lang="scss" scoped></style>
