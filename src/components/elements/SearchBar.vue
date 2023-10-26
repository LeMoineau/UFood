<template>
    <div :class="customClass" class="w-2/5">
        <input v-model="search" v-on:keypress.enter="pressEnter" type="text" :placeholder="placeholder"
            class="shadow w-full border-0 px-4 py-2 text-grey-400 rounded-md focus:outline-none">
    </div>
</template>

<script>
export default {
    props: {
        customClass: {
            type: String,
            required: false,
            default: ""
        },
        placeholder: {
            type: String,
            required: false,
            default: "Pizzaria, Fast-food..."
        },
        setSearchValue: String
    },
    emits: ['updateSearch', 'pressEnter'],
    data() {
        return {
            search: ""
        }
    },
    created() {
        this.search = this.setSearchValue
    },
    watch: {
        search(newValue) {
            this.$emit('updateSearch', newValue)
        },
        setSearchValue(newValue) {
            this.search = newValue
        }
    },
    methods: {
        pressEnter: function() {
            this.$emit('pressEnter', this.search)
        }
    }
}
</script>