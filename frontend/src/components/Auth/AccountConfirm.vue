<template>
    <div class="d-flex justify-content-center align-items-center h-100" style="display:none!important;" ref="content">
        <div class="col-md-4 col-sm-12">
            <div class="card congrats">
                <div class="card-body d-flex flex-column">
                    <h1 class="text-center">{{$lang('Account Activated Successfully !!')}}</h1>
                    <i class="icon el-icon-circle-check text-center"></i>
                    <span class="mt-3 msg">{{$lang('Your account has been activated, you will be redirected to the login page in %% seconds',[seconds])}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            token : this.$router.currentRoute.params.token,
            username : null,
            seconds : 5,
            loading : false
        }
    },
    beforeCreate() {
        this.$update_csrf()
    },
    mounted(){
        this.getUser()
    },
    methods: {
        getUser() {
            this.loading = this.$loading()
            this.$http.post(`${this.$constants.server_route}/auth/confirm_user`,{token:this.token}).then(res=>{
                res = res.data
                this.username = res.username
                this.loading = this.$loading()
                this.loading.close()
                this.redirected()
            }).catch( er => {
                console.log(er)
                this.loading.close()
                this.$router.push({name:"login"})
            })
        },
        redirected() {
            this.$refs.content.style.display = "block"
            let interval = setInterval(()=> {
                if(this.seconds>0){
                    this.seconds-- 
                } else {
                    this.loading = this.$loading()
                    setTimeout(() => {
                        this.$router.push({name:"login",query:{username:this.username}})
                        clearInterval(interval)
                        this.loading.close()
                    },1000)
                }
            },1000)
        }
    }
}
</script>
<style lang="scss" scoped>
    .congrats {
        h1 {
            color: #7eeb7e;
            font-weight: 100;
        }
        .icon {
            font-size: 200px;
            color:#7eeb7e;
        }
        .msg { 
            font-weight: 100;
        }
    }
</style>