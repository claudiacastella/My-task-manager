<template>
  <div class="sm:mt-24">
    <Login v-if="login" />
    <Register v-else />
    <div class="flex flex-col items-center max-w-md mx-auto">
      <div>
        <p>{{ account }}</p>
      </div>
      <div>
        <button
          class="cursor-pointer text-stone-400 font-bold p-2 bg-white rounded-lg"
          @click="change"
        >
          {{ buttonTitle }}
        </button>
      </div>
    </div>
    <div class="flex flex-col items-center max-w-md mx-auto">
      <p>Have you forgotten your password?</p>
      <button v-if="!forgotten" @click="forgotten = true" class="cursor-pointer text-stone-400 font-bold p-2 bg-white rounded-lg">Recover account</button>
      <div v-if="forgotten">
        <input type="email" v-model="email" placeholder="Registered email"/>
        <button type="submit" @click="sendEmail(email)" class="cursor-pointer text-stone-400 font-bold p-2 bg-white rounded-lg">Send email</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import Login from "../components/LoginForm.vue";
import Register from "../components/RegisterForm.vue";
import { useUserStore } from "../store/user";

const login = ref(true);
const buttonTitle = ref("Register");
const account = ref("Haven't registered yet?");
function change() {
  login.value = !login.value;
  buttonTitle.value === "Register"
    ? (buttonTitle.value = "Login")
    : (buttonTitle.value = "Register");
  account.value === "Haven't registered yet?"
    ? (account.value = "Already have an account?")
    : (account.value = "Haven't registered yet?");
}

const forgotten = ref(false);
const userStore = useUserStore();
const email = ref(null);

const sendEmail = async () => {
  try {
    await userStore.sendEmail(email.value);
    //router.push({ name: "Dashboard" });
  } catch (error) {
    console.log("error to send email");
    } 
};

// beforeRouteEnter(to, from, next);{
//     if (from.query.param) {
//       next("/new-page");
//     } else {
//       next();
//     };
//   };

</script>

<style scoped></style>
