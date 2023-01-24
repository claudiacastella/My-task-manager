<template>
  <div>
    <div v-if="blankPage" class="mb-4 p-4 mx-auto">
        <p>Wow! You don't have any task yet.<br>Start creating one</p>
    </div>

    <div v-for="el in tasksArray" class="">
      <div>
        <time datetime={{el.due_date}} id="timestamp" class="timestamp">{{
          el.due_date
        }}</time>
        <p id="title" class="">{{ el.title }}</p>
        <p id="priority" class="">{{ el.priority }}</p>
        <p id="short-desc" class="">{{ el.details }}</p>
        <a id="learn-more" href="" class="">Show more</a>
      </div>
      <!-- <div id="edit" v-if="view" @mouseover="view">
        <i class="fa-regular fa-pen-to-square" @click="updateTask"></i>
        <img src="" alt="" @click="stateTask" />
        <img src="" alt="" @click="deleteTask" />
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, toRefs } from "vue";
import { useUserStore } from "../store/user";
import { useTaskStore } from "../store/task";

const userStore = useUserStore();
const taskStore = useTaskStore();

const tasksArray = ref([]);
const blankPage = ref(false);

// Checkear tareas
onMounted( async () => {
    try {
        await taskStore.fetchTasks();
        tasksArray.value = taskStore.tasks;
        if (tasksArray.length === 0) {
         blankPage.value = true;
        } else blankPage.value = false;
    }
    catch (error) {
        console.log("Error retrieving tasks")
    }
});

// 


</script>

<style lang="scss" scoped></style>
