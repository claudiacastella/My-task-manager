<template>
    <Login v-if="login" />
    <Register v-else />
    <div class="flex flex-col items-center max-w-md mx-auto">
      <div>
        <p>{{ account }}</p>
      </div>
      <div>
        <button class="cursor-pointer text-emerald-500 p-2 bg-white rounded-lg" @click="change">{{buttonTitle}}</button>
      </div>
    </div>
  </template>
    
  <script setup>
  import { ref } from "vue";
  import Login from "../components/LoginForm.vue";
  import Register from "../components/RegisterForm.vue";
  
  const login = ref(true);
  const buttonTitle = ref("Register");
  const account = ref("Haven't registered yet?")
  function change() {
    login.value = !login.value;
    buttonTitle.value === "Register" ? buttonTitle.value = "Login" : buttonTitle.value = "Register";
    account.value === "Haven't registered yet?" ? account.value = "Already have an account?" : account.value = "Haven't registered yet?" ;
  }
  </script>
    
  <style scoped>
  </style>