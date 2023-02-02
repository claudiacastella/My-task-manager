// /store/user.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    // Recuperar user
    async fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      this.user = user;
    },

    // Registrar user
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) this.user = user;
    },

    // Hacer sign in
    async signIn() {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) this.user = user;
    },

    // Hacer sign out
    async signOut() {
      let { error } = await supabase.auth.signOut();
      if (error) throw error;
      this.user = null;
    },

    // Recuperar contraseña
    async sendEmail(email) {
      let { data, error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    },

    // Cambiar contraseña
    async updateUser(email, password) {
      const { error } = await supabase.auth.updateUser({
        email: email,
        password: password,
      });
      if (error) throw error;
    },

    // Persist user
    persist: {
      enabled: true,
      strategies: [
        {
          key: "user",
          storage: localStorage,
        },
      ],
    },
  },
});
