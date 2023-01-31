<template>
  <div
    class="bg-stone-100 p-8 w-2/3 mx-auto rounded-lg shadow-lg m-8 relative mt-0"
  >
    <button @click="$emit('close')" class="absolute right-4 top-4">
      <i class="fa-solid fa-xmark"></i>
    </button>

    <form @submit.prevent="updateTask">
      <h3 class="text-xl font-bold">Edit Task</h3>

      <div class="my-4">
        <label for="title" class="text-lg font-bold my-2 mr-2 text-gray-700"
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
        <label
          for="description"
          class="text-lg font-bold my-2 mr-2 text-gray-700"
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
        <label for="dueDate" class="text-lg font-bold my-2 mr-2 text-gray-700"
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
        <label for="priority" class="text-lg font-bold my-2 mr-2 text-gray-700"
          >Priority</label
        >
        <select
          class="w-2/3 p-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500"
          v-model="priority"
          required
        >
          <option value="High">High</option>
          <option value="Hedium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <button
        type="submit"
        class="mt-6 py-2 px-6 rounded-lg self-start text-md bg-stone-500 hover:bg-stone-400 text-white font-bold duration-200"
      >
        Save
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from "vue";
import { useTaskStore } from "../store/task";
import { defineEmits } from "vue";

const emit = defineEmits(["close"]);

const props = defineProps(["id","title", "details", "dueDate", "priority"]);

const taskId = props.id;
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

watch( title, (newTitle) => {
  if (newTitle !== title){
    editedTitle.value = newTitle;
  }
});
watch((newDetails, details) => {
  editedDetails.value = newDetails;
});
watch((newDueDate, dueDate) => {
  editedDueDate.value = newDueDate;
});
watch((newPriority, priority) => {
  editedPriority.value = newPriority;
});

const updateTask = async () => {
  try {
    console.log(editedTitle.value);
    // const taskToEdit = {
    //   id: taskId,
    //   title: editedTitle.value,
    //   details: editedDetails.value,
    //   due_date: editedDueDate.value,
    //   priority: editedPriority.value,
    // };
    // console.log(taskToEdit.title);
    // await taskStore.editTask(taskToEdit);
  } catch (error) {
    errMsg.value = error.message;
    setTimeout(() => {
      errMsg.value = null;
    }, 5000);
  }
};
</script>

<style lang="scss" scoped></style>
