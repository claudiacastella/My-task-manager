<template>
  <section>
    <Navbar></Navbar>
    <router-view /> <!-- your routes will load inside of these tags -->    
  </section>
</template>

<script setup>
import { onMounted , ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from './store/user.js'
import Navbar from "./components/NavBar.vue"

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

onMounted(async () => {
  try {
    await userStore.fetchUser() // here we call fetch user
    if ( userStore.user === null ) {
      console.log("user value is null")
      // redirect them to logout if the user is not there
      router.push({ path: '/auth' });
    } else {
      // continue to dashboard
      router.push({ path: '/dashboard' });
    }
  } catch (e) {
    console.log(e)
  }
});
</script>


