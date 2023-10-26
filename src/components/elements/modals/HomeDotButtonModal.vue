<template>
    <div class="flex flex-col items-end">
        <router-link :to="{name: 'Restaurant', params: {restaurantId: restaurant.id}}"> More informations </router-link>
        <a v-if="currentUserStore.connected" class="cursor-pointer mt-2" @click="showVisitModal = true"> Post a visit </a>
        <a v-if="currentUserStore.connected" class="cursor-pointer mt-2" @click="showAddingToListModal = true"> Add to favorites list </a>
        <restaurant-visit-modal :restaurant="restaurant" :show="showVisitModal" @close="showVisitModal = false"></restaurant-visit-modal>
        <adding-to-favorites-list-modal :restaurant="restaurant" :show="showAddingToListModal" @close="showAddingToListModal = false"></adding-to-favorites-list-modal>
    </div>
</template>

<script>
import RestaurantVisitModal from './RestaurantVisitModal.vue';
import AddingToFavoritesListModalVue from './AddingToFavoritesListModal.vue';

import { currentUserStore } from '../../../stores/currentUserStore';

export default {
    props: {
        restaurant: Object
    },
    components: {
        "restaurant-visit-modal": RestaurantVisitModal,
        "adding-to-favorites-list-modal": AddingToFavoritesListModalVue
    },
    data() {
        return {
            showVisitModal: false,
            showAddingToListModal: false,
            currentUserStore
        }
    }
}
</script>