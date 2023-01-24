// /store/user.js

import { defineStore } from 'pinia';
import { supabase } from '../supabase';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),

  actions: {
    // Recuperar user
    async fetchUser () {
      const {data: {user}} = await supabase.auth.getUser();
      this.user = user;
    },

    // Registrar user
    async signUp (email, password ) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) this.user = user;
    },

    // Hacer sign in
    async signIn () {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) this.user = user;
    },

    // Hacer sign out
    async signOut (){
      let {error} = await supabase.auth.signOut();
      if (error) throw error;
      this.user = null;
      console.log(this.user)
    },

    // Persist user
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'user',
          storage: localStorage
        }
      ]
    },
}});
