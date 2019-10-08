<template>
    <admin-template ref="template">
        <h1>PAGE BLANK</h1>
    </admin-template>
</template>
<script>
export default {
    components : {
        'admin-template' : require("../Template.vue")
    },
    mounted() {
        this.$root.sublinks = []
    }
}
</script>