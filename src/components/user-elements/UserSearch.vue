<template>
    <div class="w-full px-10 md:px-40 flex flex-col justify-center items-center">        
        <search-bar 
            @pressEnter="makeSearch" 
            placeholder="Alain, John..."
            class="mt-5 w-1/2 min-w-300px">
        </search-bar>
        <div class="w-full flex-row flex-wrap">
            <user-item 
                v-for="u in users" 
                :key="u.id" 
                :user="u"
                :canUnfollow="false"
                :canFollow="true"
                @follow="follow">
            </user-item>
        </div>
        <p v-if="users.length <= 0" class="w-full pt-10 text-center text-gray-400">
            Search for a user by typing their name...
        </p>
    </div>
</template>

<script>
import SearchBar from '../elements/SearchBar.vue';
import UserItem from '../elements/UserItem.vue';

import { getUserFromSearch, postFollow } from '../../api/api-user';
import { currentUserStore } from '../../stores/currentUserStore';

export default {
    components: {
        "search-bar": SearchBar,
        "user-item": UserItem
    },
    data() {
        return {
            currentUserStore,
            users: []
        }
    },
    methods: {
        makeSearch: async function(search) {
            if (!search || search.length <= 0) {
                this.users = []
            } else {
                this.users = (await getUserFromSearch(search)).items
            }
        },
        follow: async function(followId) {
            let user = await postFollow(followId)
            currentUserStore.user.following = user.following
        }
    }
}
</script>