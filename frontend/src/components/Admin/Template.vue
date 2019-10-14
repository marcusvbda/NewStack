<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
            <router-link  class="navbar-brand" :to="{name:'admin'}" v-html="$constants.app_title_html" ></router-link >
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item  d-flex align-items-center" v-bind:class="{'active':$router.currentRoute.name.split('.')[0]=='admin'}">
                        <router-link class="nav-link" :to="{name:'admin'}">Dashboard<span class="sr-only"></span></router-link>
                    </li>
                    <li class="nav-item  d-flex align-items-center" v-bind:class="{'active':$router.currentRoute.name.split('.')[0]=='blank'}">
                        <router-link class="nav-link" :to="{name:'blank'}" >Page Blank<span class="sr-only"></span></router-link>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="ml-auto nav-item dropdown d-flex flex-row align-items-center">
                        <change-language class="mr-3" />
                        <a @click.prevent="" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link dropdown-toggle d-flex align-items-center">
                            <span class="text-white username mr-2">{{user.firstname}} {{user.lastname}}</span>
                            <img v-if="user.avatar" class="img-profile" :src="user.avatar" />
                            <span v-else class="text img-profile d-flex align-items-center text-center justify-content-center">{{user.firstname.substring(0, 1).toUpperCase()}}{{user.lastname.substring(0, 1).toUpperCase()}}</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown01">
                            <router-link :to="{name:'account'}"  class="dropdown-item" href="#" @click.prevent="">
                                <div class="d-flex justify-content-between  text-center">
                                    <div class="mr-3">{{$lang('Account')}}</div>
                                    <div class="text-center id">{{user._id}}</div>
                                </div>
                            </router-link>
                            <a class="dropdown-item text-center" href="#" @click.prevent="logout">{{$lang('Logout')}}</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="submenu nav-scroller bg-white shadow-sm" v-if="$root.sublinks.length>0">
            <nav class="nav nav-underline">
                <router-link v-for="link in $root.sublinks" class="nav-link" v-bind:class="{'active' : link.active}" :to="{name:link.route}">{{link.name}}</router-link>
            </nav>
        </div>
        <main role="main" class="flex-shrink-0">
            <div class="content">
                <slot></slot>
            </div>
        </main>
    </div>
</template>
<script>
export default {
    data() {
        return {
            user : this.$store.getters.auth.user,
            active_menu : null
        }
    },
    components : {
        'change-language' : require("../Global/ChangeLanguage.vue")
    },
    methods : {
        logout() {
            this.$confirm(this.$lang("Are you sure you want to quit ?"), this.$lang("Confirm"), {
                confirmButtonText: this.$lang("Yes"),
                cancelButtonText: this.$lang("Não"),
                type: 'warning'
            }).then(() => {
                let loading = this.$loading()
                this.$router.replace({name:"login"})
                this.$store.commit('logout')
                loading.close()
            })
        }
    }
}
</script>
<style scoped lang="scss">
    .username {
        text-transform: capitalize;
    }
    .img-profile {
        border-radius: 100%;
        height: 35px;
        width: 35px;
        background-color: #78909C;
        font-weight: 500;
        color: white!important;
        font-size: 10px;
    }
    .content {
        padding-left : 0px;
        padding-right : 0px;
        margin-right : 15px;
        margin-left : 15px;
    }
    .navbar  {
        height: 50px;
        padding-bottom : 0px;
        padding-top : 0px;
        padding-right : 10px;
        .nav-item {
            &.active {
                height: 50px;
                border-bottom: 2px solid #66B1FF;
                margin-bottom: -5px;
                background-color : #43484b;
            }
        }
    }
    .submenu { 
        width : 100%;
        font-weight: 100;
        font-size: 14px;
        .active {
            font-weight : 400;
        }
        a {
            color: #9c9999;
        }
        margin-bottom: 20px;
    }
    .dropdown-menu {
        &.dropdown-menu-right {
            width : 320px;
            .id {
                background-color : #e2e2e2;
                padding-left : 10px;
                padding-right : 10px;
            }
        }
    }
</style>