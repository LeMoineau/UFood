<template>
    <div>
        <div @click="modalOpen = true"
                v-if="currentUserStore.connected"
                class="flex flex-row items-center cursor-pointer"> 
            <p class="p-0 m-0 mr-4"> {{ currentUserStore.user.name }} </p>
            <user-icon class="w-10 h-10" :useremail="currentUserStore.user.email"></user-icon>
        </div>
    
        <Teleport to="body">
            <navigation-user-bubble-modal :show="modalOpen" @close="closeModal">
                <div class="fixed flex flex-col items-end top-16 right-4 ml-4 bg-white py-4 px-6 shadow-center-md rounded-md font-medium">
                    <router-link to="/user" @click="closeModal">
                        To your profil
                    </router-link>
                    <router-link to="/" @click="() => {currentUserStore.disconnect(); closeModal()}" class="mt-2 text-red-500">
                        Disconnect
                    </router-link>
                </div>
            </navigation-user-bubble-modal>
        </Teleport>
    </div>
</template>

<script>
import NavigationUserBubbleModal from './NavigationUserBubbleModal.vue';
import UserIcon from '../elements/UserIcon.vue';

import { currentUserStore } from '../../stores/currentUserStore';

export default {
    components: {
        "navigation-user-bubble-modal": NavigationUserBubbleModal,
        "user-icon": UserIcon
    },
    data() {
        return {
            currentUserStore,
            modalOpen: false
        }
    },
    methods: {
        closeModal: function() {
            this.modalOpen = false;
        }
    }
}
</script>