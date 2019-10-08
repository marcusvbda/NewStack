<template>
    <select class="ml-auto mr-2" v-model="language">
      <option value="EN">{{$lang("English USA")}}</option>
      <option value="PTBR">{{$lang("Portuguese Brazil")}}</option>
    </select>  
</template>
<script>
export default {
    data() {
        return {
            language : this.$store.getters.language
        }
    },
    watch : {
        language(val) {
            this.$store.commit("language",val)
        }
    }
}
</script>
<style scoped lang="scss">
select {
    border: unset;
    font-size: 12px;
    padding: 5px 10px 7px 10px;
    color: gray;
    font-weight: 100;
}
</style>