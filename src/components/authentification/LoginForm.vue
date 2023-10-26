<template>
    <div class="font-sans antialiased bg-grey-lightest">
        <div v-if="!currentUserStore.connected" class="w-full bg-grey-lightest pt-4">
            <div class="container mx-auto py-8">
                <div class="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
                    <p v-if="errorMessage" class="text-red-500 font-bold"> {{ errorMessage }} </p>
                    <div class="py-4 px-8 text-black text-xl border-b border-grey-lighter"> Connexion </div>
                    <div class="py-4 px-8">
                        <div class="mb-4">
                            <label class="block text-grey-darker text-sm font-bold mb-2" for="email"> Email </label>
                            <input v-model="email"
                                class="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email"
                                type="email" placeholder="Your email address">
                        </div>
                        <div class="mb-4">
                            <label class="block text-grey-darker text-sm font-bold mb-2" for="password"> Password </label>
                            <input v-model="password"
                                class="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="password"
                                type="password" placeholder="Your secure password">
                        </div>
                        <div class="flex items-center justify-between mt-8">
                            <button @click="login"
                                class="bg-blue-500 hover:bg-blue-dark text-blue-300 font-bold py-2 px-4 w-64"
                                type="submit">
                                connexion
                            </button>

                        </div>
                    </div>
                    <div class="py-4 px-8 text-black text-xl border-b border-grey-lighter">
                        <router-link class="text-grey-dark text-sm no-underline hover:text-grey-darker" to="/signup">I
                            haven't an account
                        </router-link>
                    </div>

                </div>

            </div>

        </div>
        <div v-else class="w-full flex flex-col justify-center items-center">
            <p> You are already connected, diconnect to login back </p>
            <cubic-button bg-color="bg-red-400" @click="currentUserStore.disconnect"> Se connecter </cubic-button>
        </div>
    </div>
</template>

<script>
import { currentUserStore } from '../../stores/currentUserStore';

import CubicButton from '../elements/CubicButton.vue';

export default {
    components: {
        "cubic-button": CubicButton
    },
    data() {
        return {
            email: "",
            password: "",
            errorMessage: "",
            currentUserStore
        }
    },
    mounted() {
        if (this.currentUserStore.connected) {
            this.$router.push({
                path: '/'
            })
        }
    }, 
    methods: {
        login: async function() {
            if (this.email.length <= 0) {
                this.errorMessage = "Your email must not be empty"
            } else if (this.password.length <= 0) {
                this.errorMessage = "Your password must not be empty"
            } else {
                let user = await currentUserStore.loginWithAuth(this.email, this.password, _ => {
                    this.errorMessage = "Wrong email or password"
                })
                if (user) {
                    this.$router.push({ 
                        path: '/' 
                    });
                }
            }
        }

    }
}
</script>

<style scoped>

</style>