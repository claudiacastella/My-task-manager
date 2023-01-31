// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
    tasksCompleted: null,
    tasksToDo: null,
  }),
  actions: {
    // Recuperar tareas
    async fetchTasks() {
      const { data: tasks, error } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      if (error) throw error;
      this.tasks = tasks;
      this.tasksCompleted = this.tasks.filter((task) => task.is_complete);
      this.tasksToDo = this.tasks.filter((task) => !task.is_complete);
    },

    // Crear tarea
    async createTask(taskToInsert) {
      try {
        const { data, error } = await supabase.from("tasks").insert([
          {
            user_id: taskToInsert.user_id,
            title: taskToInsert.title,
            is_complete: taskToInsert.is_complete,
            details: taskToInsert.details,
            due_date: taskToInsert.due_date,
            priority: taskToInsert.priority,
          },
        ]);
        if (error) throw error;
        this.fetchTasks();
        return data;
      } catch (error) {
        throw error;
      }
    },

    // Editar tarea
    async editTask(taskToEdit) {
      try {
        const { data, error } = await supabase.from("tasks").update({
          title: taskToEdit.title,
          details: taskToEdit.details,
          due_date: taskToEdit.due_date,
          priority: taskToEdit.priority,
        });
        if (error) throw error;
        return data;
      } catch (error) {
        throw error;
      }
    },

    // Eliminar tarea
    async deleteTask(el) {
      try {
        const { data, error } = await supabase
          .from("tasks")
          .delete()
          .eq("id", el);
        if (error) throw error;
        this.fetchTasks();
        return data;
      } catch (error) {
        throw error;
      }
    },

    // Cambiar status de tarea
    async stateTask(el, state) {
      try {
        const { data, error } = await supabase
          .from("tasks")
          .update({ is_complete: state })
          .eq("id", el);
        if (error) throw error;
        this.fetchTasks();
        return data;
      } catch (error) {
        throw error;
      }
    },
  },
});