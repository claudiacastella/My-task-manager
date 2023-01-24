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
            </ul>
        </nav>
    </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";

const userStore = useUserStore();
const router = useRouter();

async function logOut() { 
    await userStore.signOut();
    router.push({name: "Home"});
}


</script>

<style scoped>

</style>