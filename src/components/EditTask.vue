<template>
  <form
    @submit.prevent="updateTask"
    class="bg-slate-200 p-8 w-2/3 mx-auto rounded-lg shadow-lg m-8"
  >
    <div class="my-4">
      <label for="title" class="text-xl font-bold my-2 mr-2 text-gray-700"
        >Title</label
      >
      <input
        type="text"
        class="w-2/3 p-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500"
        v-model="title"
        required
      />
    </div>
    <div class="my-4">
      <label for="description" class="text-xl font-bold my-2 mr-2 text-gray-700"
        >Details</label
      >
      <input
        type="text"
        class="w-2/3 p-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500"
        v-model="details"
        required
      />
    </div>
    <div class="my-4">
      <label for="dueDate" class="text-xl font-bold my-2 mr-2 text-gray-700"
        >Due Date</label
      >
      <input
        type="date"
        class="w-2/3 p-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500"
        v-model="dueDate"
        required
      />
    </div>
    <div class="my-4">
      <label for="priority" class="text-xl font-bold my-2 mr-2 text-gray-700"
        >Priority</label
      >
      <select
        class="w-2/3 p-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500"
        v-model="priority"
        required
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
    <button
      type="submit"
      class="mt-6 py-2 px-6 rounded-lg self-start text-md bg-emerald-300 hover:bg-emerald-500 text-white font-bold duration-200"
    >
      Save
    </button>
  </form>
</template>

<script setup>
import { ref, defineProps, watch } from "vue";
import { useTaskStore } from "../store/task";

const props = defineProps(["title", "details", "dueDate", "priority"]);

const title = props.title;
const details = props.details;
const dueDate = props.dueDate;
const priority = props.priority;

const editedTitle = ref();
const editedDetails = ref();
const editedDueDate = ref();
const editedPriority = ref();

const taskStore = useTaskStore();
const errMsg = ref(null);

watch(title, (newTitle) => {
  if (newTitle !== title) {
    editedTitle.value = newTitle;
  } else editedTitle.value = title;
});

watch(details, (newDetails) => {
  if (newDetails !== details) {
    editedDetails.value = newDetails;
  } else editedDetails.value = details;
});
watch(dueDate, (newDueDate) => {
  if (newDueDate !== dueDate) {
    editedDueDate.value = newDueDate;
  } else editedDueDate.value = dueDate;
});
watch(priority, (newPriority) => {
  if (newPriority !== priority) {
    editedPriority.value = newPriority;
  } else editedPriority.value = priority;
});

const updateTask = async () => {
  try {
    const taskToEdit = {
      title: editedTitle,
      details: editedDetails,
      due_date: editedDueDate,
      priority: editedPriority,
    };
    console.log(taskToEdit.title);
    await taskStore.editTask(taskToEdit);
  } catch (error) {
    errMsg.value = error.message;
    setTimeout(() => {
      errMsg.value = null;
    }, 5000);
  }
};
</script>

<style lang="scss" scoped></style>
