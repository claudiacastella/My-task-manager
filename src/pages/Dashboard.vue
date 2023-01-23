<template>
    <div id="tasks" class="flex-column bg-orange-100 h-auto">
        <div class="errorMsg" v-if="errorMsg">{{ errorMsg.value }}</div>
        <div class="statusMsg" v-if="statusMsg">{{ statusMsg.value }}</div>
        
        <div v-if="blankPage" class="mb-4 p-4 mx-auto">
            <p>Start here! Create your first task</p>
        </div>
        <button class="my-2 p-2 bg-green-400 rounded-sm ml-3" @click="create" v-if="!createOk">
            <i class="fa-solid fa-plus"></i>
            Create new task
        </button>
        <CreateTask v-if="createOk"></CreateTask>

        
        <!-- <article class="">
            <div v-for="el in tasks" class="">
                <div>
                    <time datetime="07/02/2022" id="timestamp" class="timestamp">{{ el.dueDate }}</time>
                    <p id="title" class="">{{el.title}}</p>
                    <p id="priority" class="">{{ el.priority }}</p>
                    <p id="short-desc" class="">{{el.details}}</p>
                    <a id="learn-more" href="" class="">Show more</a>
                </div>
                <div id="edit" v-if="view" @mouseover="view">
                    <img src="" alt="" @click="updateTask">
                    <img src="" alt="" @click="stateTask">
                    <img src="" alt="" @click="deleteTask">
                </div>
            </div>
        </article> -->
       
        
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { ref, watch } from "vue";
import { useUserStore } from "../store/user";
import { useTaskStore } from "../store/task";
import CreateTask from "../components/CreateTask.vue";

const user = useUserStore();
const tasks = useTaskStore();
const blankPage = ref(false);
const errorMsg =ref(null);
const createOk = ref(false);

function create() {
    createOk.value = true;
}

// Checkear tareas
onMounted( async () => {
    try {
        await tasks.fetchTasks();
        if (!tasks.value) {
            blankPage.value = true;
        } else blankPage.value = false;
    }
    catch (error){
        console.log("Error retrieving tasks")
    }
});

// 

</script>

<style scoped>
.errorMsg {
  color: chocolate;
  height: 50px;
  padding-top: 20px;
}
/* .statusMsg {
    color:darkcyan;
    height: 50px;
    padding-top: 20px;
} */
</style>