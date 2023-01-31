<template>
    <div id="tasks" class="container mx-auto pt-4 flex-column h-auto" >
        <div class="errorMsg" v-if="errorMsg">{{ errorMsg.value }}</div>

        
        
        <button class="my-2 ml-8 p-2  py-2 px-6 rounded-lg self-start text-md bg-stone-500 hover:bg-stone-400 text-white font-bold duration-200" @click="create" v-if="!createOk">
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

</script>

<style scoped>
.errorMsg {
  color: chocolate;
  height: 50px;
  padding-top: 20px;
}

</style>