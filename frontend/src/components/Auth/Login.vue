<template>
    <div class="p-4">
        <change-language />
        <div class="login container">
            <div class="d-flex align-items-center justify-content-center">
                <div class="col-md-9 col-sm-12">
                    <div class="card card-signin flex-row my-5">
                        <div class="card-img-left d-none d-md-flex"></div>
                        <div class="card-body">
                            <h5 class="card-title text-center">
                                <div v-html="$constants.app_title_html"></div>
                                <div class="mt-2 sub-title">{{$lang("Fill in your credentials and sign in")}}</div>
                            </h5>
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="form-signin mb-1">
                                <div class="form-label-group">
                                    <el-form-item prop="username">
                                        <template slot="label" class="mb-0"><b>{{$lang("Username or Email")}}</b></template>
                                        <el-input v-model="ruleForm.username"  :placeholder="$lang('Username or Email')" autofocus></el-input>
                                    </el-form-item>
                                </div>

                                <div class="form-label-group">
                                    <el-form-item prop="password" class="mb-1">
                                        <template slot="label" class="mb-0"><b>{{$lang("Password")}}</b></template>
                                        <el-input v-model="ruleForm.password" type="password" :placeholder="$lang('Password')" ></el-input>
                                    </el-form-item>
                                </div>
                                
                                <div class="d-flex flex-column text-right mt-4">
                                    <div class="d-flex flex-row">
                                        <button href="#" class="button primary mr-auto" type="button" @click="submitForm">{{$lang("Login")}}</button>
                                    </div>
                                    <div class="d-flex justify-content-between flex-row mt-3 flex-wrap">
                                        <fb-signin-button
                                            class="social-btn facebook"
                                            v-if="$constants.facebook_app_id"
                                            :params="{}"
                                            @success="onSignInSuccessFacebook"
                                            @error="onSignInError">
                                            <div class="d-flex align-items-center">
                                                <img class="icon mr-2" src="../public/assets/imgs/facebook.png"/> {{$lang('Sign in with')}} Facebook
                                            </div>
                                        </fb-signin-button>
                                        <g-signin-button
                                            class="social-btn google"
                                            v-if="$constants.google_app_id"
                                            :params="{client_id:$constants.google_app_id,secret_key:$constants.google_app_secret}"
                                            @success="onSignInSuccessGoogle"
                                            @error="onSignInError">
                                            <div class="d-flex align-items-center">
                                                <img class="icon mr-2" src="../public/assets/imgs/google.png"/> {{$lang('Sign in with')}} Google
                                            </div>
                                        </g-signin-button>
                                    </div>
                                    <div class="mt-3 text-center">
                                        <span class="ml-3 dont-have">
                                            {{$lang("Don't have an account ?")}}
                                        </span>
                                        <router-link class="link mt-2" :to="{name:'signup'}">{{$lang("Create your account")}}</router-link>
                                    </div>
                                    <router-link class="link mt-4 text-center" :to="{name:'recovery'}">{{$lang('Forget my password')}}</router-link>
                                </div>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import FBSignInButton from 'vue-facebook-signin-button'
import GSignInButton from 'vue-google-signin-button'
Vue.use(FBSignInButton)
Vue.use(GSignInButton)
export default {
    data() {
        return {
            loading : false,
            ruleForm : {
                username : this.$router.currentRoute.query ? (this.$router.currentRoute.query.username ? this.$router.currentRoute.query.username : null) : null,
                password : null,
                provider : null,
                provider_id : null,
            },
            rules: {
                username: [{ required: true, message: this.$lang("%% is required field",[this.$lang("Username or Email")]), trigger: 'change' }],
                password: [{ required: true, message: this.$lang("%% is required field",[this.$lang("Password")]), trigger: 'change' }],
            }
        }
    },
    components : {
        'change-language' : require("../Global/ChangeLanguage.vue")
    },
    beforeCreate() {
        if(this.$constants.facebook_app_id) {
            window.fbAsyncInit = () => {
                FB.init({
                    appId      : this.$constants.facebook_app_id,
                    cookie     : true, 
                    xfbml      : true,  
                    version    : this.$constants.facebook_app_version 
                })
            }
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0]
                if (d.getElementById(id)) return
                js = d.createElement(s)
                js.id = id
                js.src = "//connect.facebook.net/en_US/sdk.js"
                fjs.parentNode.insertBefore(js, fjs)
            }(document, 'script', 'facebook-jssdk'))
        }    
    },
    mounted() {
        this.$store.commit('logout')
    },
    methods: {
        onSignInSuccessFacebook (response) {
            FB.api('/me', user => {
                this.ruleForm.provider = "facebook"
                this.ruleForm.username = user.name
                this.ruleForm.provider_id = user.id
                this.login()
            })
        },
        onSignInSuccessGoogle (googleUser) {
            let user = googleUser.getBasicProfile() 
            this.ruleForm.provider = "google"
            this.ruleForm.username = user.ig
            this.ruleForm.provider_id = user.Eea
            this.login()
        },
        onSignInError (error) {
            console.log('ERROR', error)
        },
        login() {
            this.$update_csrf(() => {
                this.loading = this.$loading()
                this.$http.post(`${this.$constants.server_route}/auth/login`,this.ruleForm).then(res=>{
                    res = res.data
                    if(res.message) this.$message({showClose: true, message : this.$lang(res.message.content,res.message.params),type: res.message.type})
                    if(!res.success)  return this.loading.close()
                    let user = res.data
                    this.$store.commit('login',user)
                    this.$router.push({name:"admin"})
                    this.loading.close()
                }).catch( er => {
                    console.log(er)
                    this.$store.commit('logout',{})
                    this.loading.close()
                })
            })
        },
        submitForm() {
            this.ruleForm.provider = null
            this.ruleForm.provider_id = null
            this.$refs.ruleForm.validate((valid) => {
                if (!valid) return;
                this.login()
            })
        }
    }
}
</script>

<style lang="scss" scoped>

.login {
    .social-btn {
        border-radius: unset!important;
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 100;
        .icon {
            width: 18px;
        }
        &.google {
            border: 1px solid #efe7e7;
            background-color: #fbfbfb;
            color : black;
        }
        &.facebook {
            background-color: #4267b2;
            color: #fff;
        }
    }
    .icon {
        width: 150px;
    }
    --input-padding-x: 1.5rem;
    --input-padding-y: .75rem;
    .dont-have {
        font-weight: 100;
        font-size: 12px;
    }
    .card-signin {
        // border: 0;
        // border-radius: 1rem;
        box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .card-signin .card-title {
        margin-bottom: 2rem;
        font-weight: 300;
        font-size: 1.5rem;
    }

    .card-signin .card-img-left {
        width: 45%;
        background: scroll center url('../public/assets/imgs/loginback.jpg');
        background-size: cover;
    }

    .card-signin {
        .card-body {
            padding: 2rem;
        }
    }

    .form-signin {
        width: 100%;
    }

    .form-signin .btn {
        font-size: 80%;
        border-radius: 5rem;
        letter-spacing: .1rem;
        font-weight: bold;
        padding: 1rem;
        transition: all 0.2s;
    }

    .form-label-group {
        position: relative;
        margin-bottom: 1rem;
    }

    .form-label-group {
        input {
            height: auto;
            border-radius: 2rem;
        }
    }

    .form-label-group>input,
    .form-label-group>label {
        padding: var(--input-padding-y) var(--input-padding-x);
    }

    .form-label-group>label {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    margin-bottom: 0;
    /* Override default `<label>` margin */
    line-height: 1.5;
    color: #495057;
    border: 1px solid transparent;
    border-radius: .25rem;
    transition: all .1s ease-in-out;
    }

    .form-label-group input::-webkit-input-placeholder {
    color: transparent;
    }

    .form-label-group input:-ms-input-placeholder {
    color: transparent;
    }

    .form-label-group input::-ms-input-placeholder {
    color: transparent;
    }

    .form-label-group input::-moz-placeholder {
    color: transparent;
    }

    .form-label-group input::placeholder {
    color: transparent;
    }

    .form-label-group input:not(:placeholder-shown) {
    padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
    padding-bottom: calc(var(--input-padding-y) / 3);
    }

    .form-label-group input:not(:placeholder-shown)~label {
    padding-top: calc(var(--input-padding-y) / 3);
    padding-bottom: calc(var(--input-padding-y) / 3);
    font-size: 12px;
    color: #777;
    }

    .btn-google {
    color: white;
    background-color: #ea4335;
    }

    .btn-facebook {
    color: white;
    background-color: #3b5998;
    }
}
</style>