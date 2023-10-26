<template>
    <div class="flex flex-col items-end">
        <router-link :to="{name: 'Restaurant', params: {restaurantId: restaurant.id}}"> More informations</router-link>
        <a class="cursor-pointer mt-2" @click="openConfirmModal"> Remove from the list </a>
        <center-modal :show="showConfirmModal" @close="closeConfirmModal" :grayMask="true">
            <h1 class="font-semibold text-xl mb-4"> Remove "<b> {{ restaurant.name }} </b>" from the list </h1>
            <p> Are you sure you want to remove {{ restaurant.name }} from the list "<b> {{ favorite.name }} </b>" </p>
            <div class="flex flex-row justify-between">
                <cubic-button bgColor="bg-gray-200 w-min mt-4 self-end text-lg px-6 py-2" @click="closeConfirmModal"> Cancel </cubic-button>
                <cubic-button bgColor="bg-red-400 w-min mt-4 self-end text-lg px-6 py-2" @click="removeRestaurantFromTheList"> Confirm </cubic-button>
            </div>
        </center-modal>
    </div>
</template>

<script>
import { deleteRemoveRestaurantFromList } from '../../../api/api-favorites';
import CenterModal from '../CenterModal.vue';
import CubicButton from '../CubicButton.vue';

export default {
    props: {
        favorite: Object,
        restaurant: Object
    },
    components: {
        "center-modal": CenterModal,
        "cubic-button": CubicButton
    },
    emits: ['openFavoritesList', 'removeRestaurantFromTheList'],
    data() {
        return {
            showConfirmModal: false
        }
    },
    methods: {
        openConfirmModal: function() {
            this.showConfirmModal = true
        },
        closeConfirmModal: function() {
            this.showConfirmModal = false
        },
        openFavoritesList: function() {
            this.$emit('openFavoritesList', this.favorite)
        },
        removeRestaurantFromTheList: async function() {
            await deleteRemoveRestaurantFromList(this.favorite.id, this.restaurant.id)
            console.log(`restaurant #${this.restaurant.id} removed from the list #${this.favorite.id}`)
            this.closeConfirmModal()
            this.$emit('removeRestaurantFromTheList', this.restaurant)
        }
    }
}
</script>