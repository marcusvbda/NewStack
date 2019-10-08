<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <router-link  class="navbar-brand" :to="{name:'admin'}" v-html="$constants.app_title_html" ></router-link >
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item" v-bind:class="{'active':$router.currentRoute.name.split('.')[0]=='admin'}">
                        <router-link class="nav-link" :to="{name:'admin'}">Dashboard<span class="sr-only"></span></router-link>
                    </li>
                    <li class="nav-item" v-bind:class="{'active':$router.currentRoute.name.split('.')[0]=='blank'}">
                        <router-link class="nav-link" :to="{name:'blank'}" >Page Blank<span class="sr-only"></span></router-link>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="ml-auto nav-item dropdown d-flex flex-row align-items-center">
                        <change-language class="mr-3" />
                        <a @click.prevent="" class="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{user.firstname}} {{user.lastname}}</a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown01">
                            <a class="dropdown-item" href="#" @click.prevent="">
                                <div class="d-flex justify-content-between">
                                    <div class="mr-3">{{$lang('Account')}}</div>
                                    <div class="text-center id">ID : {{user._id}}</div>
                                </div>
                            </a>
                            <a class="dropdown-item" href="#" @click.prevent="logout">{{$lang('Logout')}}</a>
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
        <main role="main" class="flex-shrink-0" v-bind:class="{'mt-5' : $root.sublinks.length>0, 'mt-3' : $root.sublinks.length<=0}">
            <div class="content pt-5">
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
        position : fixed;
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