<template>
    <div class="rounded-full bg-gray-500"
        :style="`background-image: url(${url}); background-size: cover;`">
    </div>
</template>

<script>
import md5 from 'md5'

export default {
    props: {
        useremail: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            required: false,
            default: 80
        }
    },
    data() {
        return {
            url: ""
        }
    },
    created() {
        let hash = md5(this.useremail.trim().toLowerCase())
        this.url = `https://www.gravatar.com/avatar/${hash}?s=${this.size}`
    }
}
</script>