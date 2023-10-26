<template>
    <div class="w-full flex flex-row flex-wrap pl-10 md:pl-40 bg-gray-200">
        <div v-for="(tab, index) in tabs" :key="index" 
                @click="$emit('selectTab', tab.name)"
                :class="{'isActive': tab.isActive}"  
                class="mr-12 py-3 border-b-2 cursor-pointer">
            {{ tab.name }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        tabs: Object
    }
}
</script>

<style scoped>
    .isActive {
        border-color: black;
        font-weight: 600;
    }
</style>