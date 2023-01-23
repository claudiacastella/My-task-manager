<template>
    <header class="bg-emerald-300 text-slate-800 ">
        <nav class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
            <div id="logo" class="flex items-center gap-x-4">
                <img src="" alt="">
                <h1 class="text-lg">CCG Task Manager</h1>
            </div>
            <ul class=" flex flex-1 justify-end gap-x-10">
                <router-link class="cursor-pointer" :to="{name : 'Home'}">Home</router-link>
                <li class="cursor-pointer"><button @click="logOut">Logout</button></li>
                <button></button>
            </ul>
        </nav>
    </header>
</template>

<script setup>
import { ref, watch } from "vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";

const userStore = useUserStore();
const router = useRouter();

function logOut() { 
    userStore.signOut();
    router.push({name: "Auth"});
}


</script>

<style scoped>

</style>