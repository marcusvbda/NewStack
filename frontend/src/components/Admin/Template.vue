<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <router-link  class="navbar-brand" :to="{name:'admin'}" v-html="$constants.app_title_html" ></router-link >
            <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#corNavbar01" aria-controls="corNavbar01" aria-expanded="false" aria-label="Alterna navegação">
            <span class="navbar-toggler-icon"></span>
            </button>

            <div class="navbar-collapse collapse" id="corNavbar01" style="">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item d-flex align-items-center" v-bind:class="{'active':$router.currentRoute.name.split('.')[0]=='admin'}">
                        <router-link class="nav-link" :to="{name:'admin'}">Dashboard<span class="sr-only"></span></router-link>
                    </li>
                    <li class="nav-item  d-flex align-items-center" v-bind:class="{'active':$router.currentRoute.name.split('.')[0]=='blank'}">
                        <router-link class="nav-link" :to="{name:'blank'}" >Page Blank<span class="sr-only"></span></router-link>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item d-flex align-items-center"><change-language class="mr-3 d-none d-lg-block" /></li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="text-white username mr-2">{{user.firstname}} {{user.lastname}}</span>
                            <img v-if="user.avatar" class="img-profile" :src="user.avatar" />
                            <span v-else class="text img-profile d-flex align-items-center text-center justify-content-center color">{{user.firstname.substring(0, 1).toUpperCase()}}{{user.lastname.substring(0, 1).toUpperCase()}}</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <router-link :to="{name:'account'}"  class="dropdown-item text-center capitalize">{{$lang('my account')}}</router-link>
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
                <el-alert v-for="(alert,i) in alerts" class="mb-3" :title="alert.title" :type="alert.type" :description="alert.text" :show-icon="alert.icon" />
                <slot></slot>
            </div>
        </main>
    </div>
</template>
<script>
export default {
    data() {
        return {
            alerts : [],
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
        font-size: 10px;
        &.color { 
            background-color: #78909C;
            font-weight: 500;
            color: white!important;
        }
    }
    .content {
        padding-left : 0px;
        padding-right : 0px;
        margin-right : 15px;
        margin-left : 15px;
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
</style>