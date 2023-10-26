<template>
    <center-modal :show="show" @close="closeModal">
        <!-- Message d'erreur not connected -->
        <div v-if="!currentUserStore.connected" class="flex flex-col">            
            <h1 class="font-semibold text-xl mb-4"> Post a visit </h1>
            <p> You need to be connected to post a new visit for a restaurant </p>
            <cubic-button 
                @click="closeModal"
                bgColor="bg-gray-100" 
                textColor="text-black" 
                class="w-min mt-4 self-end text-lg px-6 py-2"> Ok </cubic-button>
        </div>

        <!-- Post a new visit modal -->
        <div v-else-if="!readOnly" class="flex flex-col justify-start">
            <h1 class="font-semibold text-xl mb-4"> Post a visit </h1>
            <p class="text-xs mb-1"> date </p>
            <input v-model="date" :readonly="readOnly" 
                type="date" class="shadow-center-md w-full h-12 rounded-md mb-6 px-4" >
            <p class="text-xs mb-1"> rating </p>
            <input v-model="rating" :readonly="readOnly" 
                type="number" min="0" max="5" class="shadow-center-md w-full h-12 rounded-md mb-6 px-4">
            <p class="text-xs mb-1"> comment </p>
            <input v-model="comment" :readonly="readOnly" 
                type="text" placeholder="Your comment" class="shadow-center-md w-full h-12 rounded-md mb-6 px-4">
            <p class="text-red-300 self-center"> {{ errorMessage }} </p>
            <cubic-button bgColor="bg-green-400 w-min mt-4 self-end text-lg px-6 py-2" @click="sendRestaurantVisit"> Confirm </cubic-button>
        </div>
        
        <!-- Readonly visit modal -->
        <div v-else class="flex flex-col justify-start">
            <h1 class="font-semibold text-xl mb-4"> Post a visit </h1>
            <p class="text-xs mb-1"> date </p>
            <input :value="visit.date.substr(0, 10)" :readonly="readOnly" 
                type="date" class="shadow-center-md w-full h-12 rounded-md mb-6 px-4" >
            <p class="text-xs mb-1"> rating </p>
            <input :value="visit.rating" :readonly="readOnly" 
                type="number" min="0" max="5" class="shadow-center-md w-full h-12 rounded-md mb-6 px-4">
            <p class="text-xs mb-1"> comment </p>
            <input :value="visit.comment" :readonly="readOnly" 
                type="text" placeholder="Your comment" class="shadow-center-md w-full h-12 rounded-md mb-6 px-4">
            <p class="text-red-300 self-center"> {{ errorMessage }} </p>
            <cubic-button bgColor="bg-green-400 w-min mt-4 self-end text-lg px-6 py-2 whitespace-nowrap" @click="sendRestaurantVisit"> Close Modal </cubic-button>
        </div>
    </center-modal>
</template>

<script>
import CenterModal from '../CenterModal.vue';
import CubicButton from '../CubicButton.vue';

import { postNewRestaurantVisit } from '../../../api/api-user';
import { currentUserStore } from '../../../stores/currentUserStore';

export default {
    props: {
        show: Boolean,
        readOnly: {
            type: Boolean,
            required: false,
            default: false
        },
        visit: Object,
        restaurant: Object
    },
    components: {
        "center-modal": CenterModal,
        "cubic-button": CubicButton
    },
    data() {
        return {
            date: "",
            rating: 3,
            comment: "",
            errorMessage: "",
            currentUserStore
        }
    },
    methods: {
        sendRestaurantVisit: async function() {
            if (this.readOnly) {
                this.closeModal()
                return
            }
            if (!this.currentUserStore.connected) {
                this.errorMessage = "You need to be connected to post a visit"
                return   
            }
            if (!this.date || this.date.length <= 0) {
                this.errorMessage = "A valid date is needed to post a visit"
                return
            }
            if (new Date(this.date) > new Date()) {
                this.errorMessage = "The visit date cannot be greater than today's"
                return
            }
            if (this.rating <= 0 || this.rating > 5) {
                this.errorMessage = "Rating of restaurant must be between 0 and 5"
                return
            }
            if (this.comment.length <= 0) {
                this.errorMessage = "You need to put a comment to post a visit"
                return
            }
            this.errorMessage = ""
            await postNewRestaurantVisit(currentUserStore.id, 
                this.restaurant.id, this.date, this.rating, this.comment)
            console.log("visit posted!")
            this.closeModal()
        },
        closeModal: function() {
            this.$emit('close')
        }
    }
}
</script>