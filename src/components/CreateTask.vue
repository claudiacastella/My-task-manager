<template>
  <div class="errorMsg text-center" v-if="errMsg">{{ errMsg }}</div>
  <div class="successMsg text-center" v-if="sucMsg">{{ sucMsg }}</div>
  <div
    class="bg-stone-100 p-8 w-2/3 mx-auto rounded-lg shadow-lg m-8 relative mt-0"
  >
    <button @click="$emit('close')" class="absolute right-4 top-4">
      <i class="fa-solid fa-xmark"></i>
    </button>

    <form @submit.prevent="createTask">
      <h3 class="text-xl font-bold">New Task</h3>
      <div>
        <div class="my-4">
        <label for="title" class="text-lg font-bold my-2 mr-2 text-gray-700 "
          >Title</label
        >
        <input
          type="text"
          class="w-2/3 p-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500"
          v-model="newTitle"
          required
        />
      </div>
      <div class="my-4">
        <label
          for="description"
          class="text-lg font-bold my-2 mr-2 text-gray-700 "
          >Details</label
        >
        <input
          type="text"
          class="w-2/3 p-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500"
          v-model="newDetails"
          required
        />
      </div>
      </div>
      <div>
        <div class="my-4">
        <label for="dueDate" class="text-lg font-bold my-2 mr-2 text-gray-700"
          >Due Date</label
        >
        <input
          type="date"
          class="w-2/3 p-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500"
          v-model="newDueDate"
          required
        />
      </div>
      <div class="my-4">
        <label for="priority" class="text-lg font-bold my-2 mr-2 text-gray-700"
          >Priority</label
        >
        <select
          class="w-2/3 p-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500"
          v-model="newPriority"
          required
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div></div>
      <button
        type="submit"
        class="mt-6 py-2 px-6 rounded-lg self-start text-md bg-stone-500 hover:bg-stone-400 text-white font-bold duration-200"
      >
        Create
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import { useTaskStore } from "../store/task";
import { defineEmits } from "vue";

const emit = defineEmits(["close"]);
const userStore = useUserStore();
const taskStore = useTaskStore();

const newTitle = ref("New Task");
const newDetails = ref("Details of the task");
const newDueDate = ref(null);
const newPriority = ref(null);
const newStatus = ref(false);

const errMsg = ref(null);
const sucMsg = ref(null);

const createTask = async () => {
  try {
    await taskStore.createTask({
      user_id: userStore.user.id,
      title: newTitle.value,
      is_complete: newStatus.value,
      details: newDetails.value,
      due_date: newDueDate.value,
      priority: newPriority.value,
    });
    sucMsg.value="Task successfully created";
    setTimeout(() => {
        sucMsg.value = null;
      }, 5000);
  } catch (error) {
    if (error instanceof Error) {
      errMsg.value = error.message;
      setTimeout(() => {
        errMsg.value = null;
      }, 5000);
    }
  } finally {
    newTitle.value = "New Task";
    newDetails.value = "Details of the task";
    newDueDate.value = null;
    newPriority.value = null;
    newStatus.value = false;
    emit('close');
  }
};
</script>

<style lang="scss" scoped></style>
