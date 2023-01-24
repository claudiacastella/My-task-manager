<template>
    <div id="tasks" class="flex-column bg-orange-100 h-auto">
        <div class="errorMsg" v-if="errorMsg">{{ errorMsg.value }}</div>
        <!-- <div class="statusMsg" v-if="statusMsg">{{ statusMsg.value }}</div> -->
        
        
        <button class="my-2 p-2 bg-green-400 rounded-sm ml-3" @click="create" v-if="!createOk">
            <i class="fa-solid fa-plus"></i>
            Create new task
        </button>

        <!-- Aquí el componente de crear tareas -->
        <CreateTask v-if="createOk"></CreateTask>
   
        <!-- Aquí el componente de listado de tareas -->
        <Tasks></Tasks>
        
    </div>
</template>

<script setup>
import { onMounted, ref, watch, toRefs } from "vue";
import CreateTask from "../components/CreateTask.vue";
import Tasks from "../components/Tasks.vue";

const errorMsg =ref(null);
const createOk = ref(false);

function create() {
    createOk.value = true;
}

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