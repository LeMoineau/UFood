<template>
    <div class="relative flex flex-row w-full justify-start bg-gray-200 py-16">
        <div class="px-10 md:px-40 flex flex-row">
            <user-icon class="w-24 h-24 lg:w-36 lg:h-36" :useremail="currentUserStore.user.email"></user-icon>
            <div class="flex flex-col h-full justify-center ml-4">
            <h2 class="font-semibold text-4xl"> {{ currentUserStore.user.name }} </h2>
            <div class="flex flex-row w-auto px-2 py-3">
                <p class="mr-5"> <b class="font-semibold text-gray-700"> {{ currentUserStore.user.rating }} </b> pts </p>
                <p class="mr-5"> <b class="font-semibold text-gray-700"> {{ currentUserStore.user.followers.length }} </b> followers </p>
                <p> <b class="font-semibold text-gray-700"> {{ currentUserStore.user.following.length }} </b> following </p>
            </div>
            <button class="text-left" @click="$emit('toggleForceEmpty')"> Show/Hide view without restaurants </button>
            </div>
        </div>
    </div>
</template>

<script>
import UserIcon from '../elements/UserIcon.vue';

import { currentUserStore } from '../../stores/currentUserStore';

export default {
    components: {
        "user-icon": UserIcon
    },
    data() {
        return {
            currentUserStore
        }
    }
}
</script>