<template>
    <div class="w-full flex flex-row flex-wrap px-10 md:px-40 pt-5">
        <user-item 
            v-for="u in currentUserStore.user.followers" 
            :key="u.id" 
            :user="u"
            @unfollow="unfollow">
        </user-item>
        <p v-if="currentUserStore.user.followers.length <= 0" class="pt-5 w-full text-center">
            You have no followers..
        </p>
    </div>
</template>

<script>
import UserItem from '../elements/UserItem.vue';

import { currentUserStore } from '../../stores/currentUserStore';

export default {
    components: {
        "user-item": UserItem
    },
    data() {
        return {
            currentUserStore
        }
    },
    methods: {
        unfollow: async function(followerId) {
            await deleteUnfollow(followerId)
            let index = currentUserStore.user.followers.findIndex(f => f.id === followerId)
            if (index !== -1) {
                currentUserStore.user.followers.splice(index, 1)
            }
        }
    }
}
</script>