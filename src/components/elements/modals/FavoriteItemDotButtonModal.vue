<template>
    <div class="flex flex-col items-end">
        <a @click="$emit('openFavoritesList', favorite)"> Open favorites list </a>
        <a class="cursor-pointer mt-2" @click="openConfirmModal"> Delete the list </a>
        <center-modal :show="showConfirmModal" @close="closeConfirmModal" :grayMask="true">
            <h1 class="font-semibold text-xl mb-4"> Delete "<b> {{ favorite.name }} </b>" </h1>
            <p> Are you sure you want to delete the list "<b> {{ favorite.name }} </b>" </p>
            <div class="flex flex-row justify-between">
                <cubic-button bgColor="bg-gray-200 w-min mt-4 self-end text-lg px-6 py-2" @click="closeConfirmModal"> Cancel </cubic-button>
                <cubic-button bgColor="bg-red-400 w-min mt-4 self-end text-lg px-6 py-2" @click="deleteFavoritesList"> Confirm </cubic-button>
            </div>
        </center-modal>
    </div>
</template>

<script>
import { deleteFavoritesList } from '../../../api/api-favorites';
import CenterModal from '../CenterModal.vue';
import CubicButton from '../CubicButton.vue';

export default {
    props: {
        favorite: Object
    },
    components: {
        "center-modal": CenterModal,
        "cubic-button": CubicButton
    },
    emits: ['openFavoritesList', 'deleteFavoritesList'],
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
        deleteFavoritesList: async function() {
            await deleteFavoritesList(this.favorite.id)
            console.log(`favorites list ${this.favorite.name} deleted!`)
            this.closeConfirmModal()
            this.$emit('deleteFavoritesList', this.favorite)
        }
    }
}
</script>