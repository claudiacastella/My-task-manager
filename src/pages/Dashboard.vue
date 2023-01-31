<template>
    <div id="tasks" class="container mx-auto pt-4 flex-column h-auto" >
        <div class="errorMsg" v-if="errorMsg">{{ errorMsg.value }}</div>

        
        
        <button class="my-2 p-2 bg-green-400 rounded-sm ml-3" @click="create" v-if="!createOk">
            <i class="fa-solid fa-plus"></i>
            Create new task
        </button>

        <!-- Aquí el componente de crear tareas -->
        <CreateTask v-if="createOk" @close="closeCreate"></CreateTask>
   
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
function closeCreate(){
    createOk.value = false;
}

function refreshTasks(){

}

</script>

<style scoped>
.errorMsg {
  color: chocolate;
  height: 50px;
  padding-top: 20px;
}

</style>