<template>
  <div class="font-sans antialiased bg-grey-lightest">
    <div v-if="!currentUserStore.connected" class="w-full bg-grey-lightest" style="padding-top: 4rem;">
      <div class="container mx-auto py-8">
        <div class="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
          <div class="py-4 px-8 text-black text-xl border-b border-grey-lighter">Register for a free account</div>
          <p class="text-red-500 font-bold"> {{ errorMessage }} </p>
          <div class="py-4 px-8">
            <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="last_name">Name</label>
                <input v-model="name" class="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                  id="last_name" type="text" placeholder="Your name">
            </div>
            <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="email">Email Address</label>
              <input v-model="email" class="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email"
                type="email" placeholder="Your email address">
            </div>
            <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="password">Password</label>
              <input v-model="password" class="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="password" type="password" placeholder="Your secure password">
            </div>
            <div class="flex items-center justify-between mt-8">
              <button @click="register" class="bg-blue-500 hover:bg-blue-dark text-blue-300 font-bold py-2 px-4 w-64"
                type="submit">
                Sign Up
              </button>
            </div>
          </div>
          <div class="py-4 px-8 text-black text-xl border-b border-grey-lighter">
            <router-link class="text-grey-dark text-sm no-underline hover:text-grey-darker" to="/login">I have an
              account
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full flex flex-col justify-center items-center">
        <p> You are already connected, diconnect to sign up back </p>
        <cubic-button bg-color="bg-red-400" @click="currentUserStore.disconnect"> Se connecter </cubic-button>
    </div>
  </div>
</template>

<script>
import CubicButton from '../elements/CubicButton.vue';

import { postSignUp } from '../../api/api-authentification';
import { currentUserStore } from '../../stores/currentUserStore';

const MAX_LENGTH_FIELD = 50;

export default {
  components: {
    "cubic-button": CubicButton
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errorMessage: "",
      currentUserStore
    }
  },
  methods: {
    register: async function() {
      if (this.name.length <= 0) {
        this.errorMessage = "Your name must not be empty"
      } else if (this.email <= 0) {
        this.errorMessage = "Your email must not be empty"
      } else if (this.password <= 0) {
        this.errorMessage = "Your password must not be empty"
      } else if (this.name.length > MAX_LENGTH_FIELD) {
        this.errorMessage = "Your name is too long"
      }else if (this.email.length > MAX_LENGTH_FIELD) {
        this.errorMessage = "Your email is too long"
      } else {
        let user = await postSignUp(this.name, this.email, this.password).catch(err => {
          this.errorMessage = "This email is already used"
        })
        if (user) {
          await currentUserStore.loginWithAuth(this.email, this.password)
          if (currentUserStore.connected) {
            this.$router.push({
              path: '/'
            })
          }
        }
      }
    }
  }
}
</script>