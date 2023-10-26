<template>
    <div class="flex flex-row flex-wrap w-full justify-between items-center my-3 mb-5 md:mb-3">
        <router-link :to="`/user/${user.id}`" class="flex flex-row items-center h-full">
            <user-icon class="w-20 h-20" :useremail="user.email"></user-icon>
            <div class="flex flex-col justify-center items-start ml-3">
                <p class="font-semibold"> {{ user.name }} </p>
                <p class="text-gray-500"> {{ user.email }} </p>
            </div>
        </router-link>
        <div v-if="canUnfollow" class="cursor-pointer bg-gray-400 text-white rounded-md md:w-auto w-full text-center px-4 py-2" @click="unfollow">
            Unfollow
        </div>
        <div v-if="canFollow" class="cursor-pointer bg-blue-400 text-white rounded-md md:w-auto w-full px-4 py-2" @click="follow">
            Follow
        </div>
    </div>
</template>

<script>
import UserIcon from './UserIcon.vue';

export default {
    components: {
        "user-icon": UserIcon
    },
    props: {
        user: {
            type: Object,
            required: true
        },
        canUnfollow: {
            type: Boolean,
            required: false,
            default: true
        },
        canFollow: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    emits: ['unfollow', 'follow'],
    methods: {
        unfollow: function() {
            this.$emit('unfollow', this.user.id)
        },
        follow: function() {
            this.$emit('follow', this.user.id)
        }
    }
}
</script>