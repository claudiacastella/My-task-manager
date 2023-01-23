<template>
  <div class="errorMsg" v-if="errMsg">{{ errMsg }}</div>
  <form
    @submit.prevent="register"
    class="bg-slate-200 p-8 max-w-md mx-auto rounded-lg shadow-lg m-8"
  >
    <h1 class="text-3xl font-bold mb-8">Register</h1>
    <div class="mb-4">
      <label for="email" class="text-xl block font-bold mb-2 text-gray-700"
        >Email</label
      >
      <input
        type="email"
        v-model="email"
        class="block w-full p-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500"
        required
      />
    </div>
    <div class="mb-4">
      <label for="password" class="text-xl block font-bold mb-2 text-gray-700"
        >Password</label
      >
      <input
        type="password"
        v-model="password"
        class="block w-full p-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500"
        required
      />
    </div>
    <div class="mb-4">
      <label for="password" class="text-xl block font-bold mb-2 text-gray-700"
        >Repeat Password</label
      >
      <input
        type="password"
        v-model="repeatPassword"
        class="block w-full p-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500"
        required
      />
    </div>
    <input
      type="submit"
      class="mt-6 py-2 px-6 rounded-lg self-start text-md bg-emerald-300 hover:bg-emerald-500 text-white font-bold duration-200" :value="loading ? 'Loading' : 'Register'" :disabled="loading"
    />
  </form>
</template>

<script setup>
import { ref, watch } from "vue";
import { supabase } from "../supabase";
import { useUserStore } from "../store/user.js";
import { useRouter } from "vue-router";

const email = ref(null);
const password = ref(null);
const repeatPassword = ref(null);
const errMsg = ref(null);
const router = useRouter();
const loading = ref(false);

const user = useUserStore();

watch(email, (newEmail) => {
  if (newEmail.length < 6) {
    errMsg.value = "The email should have at least 6 characters.";
  } else if (!newEmail.includes("@")) {
    errMsg.value = "The email should have an @";
  } else if (newEmail.indexOf(".") < newEmail.indexOf("@")) {
    errMsg.value = "The email should have a . after the @";
  } else errMsg.value = null;
  setTimeout(() => {
        errMsg.value = null;
      }, 5000);
});

watch(repeatPassword, (newRepeatPassword) => {
  if (newRepeatPassword !== password.value) {
    errMsg.value = "Passwords don't match";
  } else errMsg.value = null;
});

// Register function

const register = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value
      });
      if (error) throw error;
      router.push({ name: "Home" });
  } catch (error) {
    errMsg.value = error.message;
    setTimeout(() => {
      errMsg.value = null;
    }, 5000);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.errorMsg {
  color: chocolate;
  height: 50px;
  padding: 4px;
  margin-bottom: 10px;
  border: 1px solid chocolate;
  border-radius: 25%;  
}
</style>
