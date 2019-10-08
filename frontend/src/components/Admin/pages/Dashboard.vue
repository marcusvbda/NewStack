<template>
    <admin-template>
        <div class="d-flex flex-column">
            <div class="d-flex flex-wrap align-items-center">
                <h4 class="title">{{$lang("My Bots")}}</h4>
                <div class="d-flex flex-grow-1 justify-content-end align-items-center">
                    <a href="#" class="link mr-3">{{$lang("Show all")}}</a>
                    <a class="button primary">{{$lang("Create a new Bot")}}</a>
                </div>
            </div>
            <div class="d-flex justify-content-center align-items-center flex-column oh_noh mt-4">
                <img class="robot" src="../public/assets/imgs/robot.svg" />
                <h5 class="title">{{$lang('Oh, No!')}}</h5>
                <span class="sub_title">{{$lang('You dont have any bot yet')}}</span>
                <a href="#" class="button primary mt-3">{{$lang('New Bot')}}</a>
            </div>
        </div>
    </admin-template>
</template>
<script>
export default {
    components : {
        'admin-template' : require("../Template.vue")
    },
    mounted() {
        this.$root.sublinks = [{active : true, name : "Dashboard", route : "admin"}]
    }
}
</script>
<style lang="scss" scoped>
    .title {
        font-weight : 400;
    }
    .oh_noh {
        .robot {
            width : 300px;
        }
        .title {
            font-weight : 600;
            font-size : 20px;
        }
        .sub_title {
            font-weight : 300;
            font-size : 14px;
        }
    }
</style>