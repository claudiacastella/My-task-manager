// /store/task.js

import { defineStore } from 'pinia';
import { supabase } from '../supabase';

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: null
  }),
  actions: {

    // Recuperar tareas
    async fetchTasks () {
      const { data: tasks , error } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });
      if (error) throw error;
      this.tasks = tasks;
    },

    // Crear tarea
    async createTask(taskToInsert) {
      try {
        const {data , error} = await supabase.from('tasks').insert([
          {
            user_id: taskToInsert.user_id,
            title: taskToInsert.title,
            is_complete: taskToInsert.is_complete,
            details: taskToInsert.details,
            due_date: taskToInsert.due_date,
            priority: taskToInsert.priority,
          }
        ]);
        if (error) throw error;
        this.fetchTasks();
        return data;
      } catch (error) {
        throw error; 
      }
    },

    // Editar tarea

    // Eliminar tarea

    // Cambiar status de tarea

  }
});

