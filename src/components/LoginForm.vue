<template>
  <div class="errorMsg text-center" v-if="errMsg">{{ errMsg }}</div>
  <form
    @submit.prevent="signIn"
    class="bg-stone-100 p-8 max-w-md mx-auto rounded-lg shadow-lg m-8"
  >
    <h1 class="text-3xl font-bold mb-8 mx-auto">Login</h1>
    <div class="mb-4">
      <label for="email" class="text-xl block font-bold mb-2 text-gray-700"
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
      class="mt-6 py-2 px-6 rounded-lg self-start text-md bg-stone-500 hover:bg-stone-400 text-white font-bold duration-200"
      :value="loading ? 'Loading' : 'Login'"
      :disabled="loading"
    />
  </form>
</template>

<script setup>
import { ref , watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";

const userStore = useUserStore();
const router = useRouter();
const email = ref(null);
const password = ref(null);
const errMsg = ref(null);

const loading = ref(false);

watch(email, (newEmail) => {
  if (newEmail.length < 6) {
    errMsg.value = "The email should have at least 6 characters.";
  } else if (!newEmail.includes("@")) {
    errMsg.value = "The email should have an @";
  } else if (newEmail.indexOf(".") < newEmail.indexOf("@")) {
    errMsg.value = "The email should have a . after the @";
  } else errMsg.value = false;
  setTimeout(() => {
    errMsg.value = null;
  }, 5000);
});

const signIn = async () => {
  try {
    loading.value = true;
    await userStore.signIn(email.value, password.value);
    router.push({ name: "Dashboard" });
  } catch (error) {
    if (error instanceof Error) {
      errMsg.value = error.message;
      console.log(error.message)
      setTimeout(() => {
        errMsg.value = null;
      }, 10000);
    }
  } finally {
    loading.value = false;
  }
  return;
};
</script>

<style>

</style>
