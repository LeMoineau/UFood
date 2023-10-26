<template>
    <center-modal :show="show" :grayMask="true" customClass="bg-transparent mx-32 box-border p-0 overflow-auto max-h-screen" @close="$emit('close')">
        <div v-if="restaurant" class="rounded-lg overflow-hidden w-full h-full">
            <img v-for="(picture, index) in restaurant.pictures" :key="index" class="ui fluid image" :src="picture">
        </div>
    </center-modal>
</template>

<script>
import CenterModal from '../CenterModal.vue';

export default {
    props: {
        show: Boolean,
        restaurant: Object
    },
    emits: ["close"],
    components: {
        "center-modal": CenterModal
    }
}
</script>