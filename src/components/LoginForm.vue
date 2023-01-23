<template>
  <div class="errorMsg" v-if="showError">{{ errMsg }}</div>
  <form
    @submit.prevent="signIn"
    class="bg-slate-200 p-8 max-w-md mx-auto rounded-lg shadow-lg m-8"
  >
    <h1 class="text-3xl font-bold mb-8 mx-auto">Login</h1>
    <div class="mb-4 ">
      <label for="email" class="text-xl block font-bold mb-2 text-gray-700 "
        >Email</label
      >
      <input
        type="text"
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
    <input
      type="submit"
      class="mt-6 py-2 px-6 rounded-lg self-start text-md bg-emerald-300 hover:bg-emerald-500 text-white font-bold duration-200" :value="loading ? 'Loading' : 'Login'" :disabled="loading"
    />
  </form>
</template>

<script setup>
import { ref, watch } from "vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
const user = useUserStore();
const router = useRouter();
const showError = ref(false);
const email = ref(null);
const password = ref(null);
const errMsg = ref(null);

const loading = ref(false);

watch(email, (newEmail) => {
  if (newEmail.length < 6) {
    showError.value = true;
    errMsg.value = "The email should have at least 6 characters.";
  } else if (!newEmail.includes("@")) {
    showError.value = true;
    errMsg.value = "The email should have an @";
  } else if (newEmail.indexOf(".") < newEmail.indexOf("@")) {
    showError.value = true;
    errMsg.value = "The email should have a . after the @";
  } else showError.value = false;
  setTimeout(() => {
    errMsg.value = null;
  }, 5000);
});

const signIn = async () => {
  try {
    loading.value = true;
    user.signIn();
    router.push({ name: "Dashboard" });
  } catch (error) {
    if (error instanceof Error) {
        errMsg.value = error.message;
        setTimeout(() => {
          errMsg.value = null;
        }, 5000);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style>
.errorMsg {
  color: chocolate;
  height: 50px;
  padding-top: 20px;
}
</style>
