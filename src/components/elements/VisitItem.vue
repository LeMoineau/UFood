<template>
    <div>
        <hr class="w-full mt-4 mb-2">
        <div class="flex flex-row flex-wrap">
            <div>
                <p class="font-semibold"> {{ printPrettyDate(visit.date) }} </p>
                <p> {{ prettyRating }} </p>
                <cubic-button @click="openVisitModal" bgColor="bg-white shadow-md mt-2" textColor="text-black"> Open modal </cubic-button>
            </div>
            <div class="pl-4">
                <p> {{ visit.comment }} </p>
            </div>
        </div>
        <restaurant-visit-modal :show="showVisitModal" :visit="visit" :readOnly="true" @close="closeVisitModal"></restaurant-visit-modal>
    </div>
</template>

<script>
import CubicButton from './CubicButton.vue'
import RestaurantVisitModal from './modals/RestaurantVisitModal.vue'

export default {
    props: {
        visit: Object
    },
    components: {
        "cubic-button": CubicButton,
        "restaurant-visit-modal": RestaurantVisitModal
    },
    data() {
        return {
            showVisitModal: false
        }
    },
    computed: {
        prettyRating() {
            let ratingStr = ""
            for (let i = 1; i<this.visit.rating; i++) {
                ratingStr += "⭐"
            }
            return ratingStr
        }
    },
    methods: {
        printPrettyDate(date) {
            const currentDate = new Date(date)
            const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

            return currentDate.toLocaleDateString('en-US', options);
        },
        openVisitModal: function() {
            this.showVisitModal = true
        },
        closeVisitModal: function() {
            this.showVisitModal = false
        }
    }
}
</script>