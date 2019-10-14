<template>
    <div :loading="loading" class="p-4">
        <change-language />
        <div class="signup container">
            <div class="d-flex align-items-center justify-content-center">
                <div class="col-12 pt-4">
                    <span class="have_account">{{$lang('Already have an account?')}}</span><router-link :to="{name:'login'}" class="ml-2 link">{{$lang("Go to login page")}}</router-link>
                    <div class="card card-signin flex-row">
                        <div class="card-img-left d-none d-md-flex"></div>
                        <div class="card-body">
                            <h5 class="card-title text-center mb-2">
                                <div v-html="$constants.app_title_html"></div>
                                <div class="mt-2 sub-title">{{$lang("Sign up now and test for free")}}</div>
                            </h5>
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="form-signin mt-3">
                                <div class="d-flex">
                                    <div class="col-md-6 col-sm-12 pl-0">
                                        <div class="form-label-group mb-2">
                                            <el-form-item prop="firstname" class="mb-1">
                                                <template slot="label"><b>{{$lang("Firstname")}}</b></template>
                                                <el-input v-model="ruleForm.firstname"  :placeholder="$lang('Firstname')" autofocus></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-12 pr-0">
                                        <el-form-item prop="lastname" class="mb-1">
                                            <template slot="label"><b>{{$lang("Lastname")}}</b></template>
                                            <el-input v-model="ruleForm.lastname"  :placeholder="$lang('Lastname')" autofocus></el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col-md-6 col-sm-12 pl-0">
                                        <div class="form-label-group mb-2">
                                            <el-form-item prop="username" class="mb-1">
                                                <template slot="label"><b>{{$lang("Username")}}</b></template>
                                                <el-input v-model="ruleForm.username" @keydown.native.space="(e) => e.preventDefault()" :placeholder="$lang('Username')" autofocus></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-12 pr-0">
                                        <div class="form-label-group mb-2">
                                            <el-form-item prop="phone" class="mb-1">
                                                <template slot="label"><b>{{$lang("Phone")}}</b></template>
                                                <el-input  v-mask="['(##) ####-####', '(##) #####-####']" v-model="ruleForm.phone"  :placeholder="$lang('Phone')"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-label-group mb-2">
                                    <el-form-item prop="email" class="mb-1">
                                        <template slot="label"><b>Email</b></template>
                                        <el-input v-model="ruleForm.email" placeholder="Email" type="email"></el-input>
                                    </el-form-item>
                                </div>
                                
                                <div class="d-flex">
                                    <div class="col-md-6 col-sm-12 pl-0">
                                        <div class="form-label-group mb-2">
                                            <el-form-item prop="password">
                                                <template slot="label"><b>{{$lang("Password")}}</b></template>
                                                <el-input v-model="ruleForm.password"  :placeholder="$lang('Password')" type="password" show-password></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-12 pr-0" v-if="ruleForm.password">
                                        <div class="form-label-group mb-2">
                                            <el-form-item prop="retype_password">
                                                <template slot="label"><b>{{$lang("Retype Password")}}</b></template>
                                                <el-input v-model="ruleForm.retype_password"  :placeholder="$lang('Retype Password')" type="password" show-password></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                </div> 

                                <el-checkbox v-model="ruleForm.confirm">
                                    {{$lang("I agree to")}} <router-link :to="{name:'use_terms'}" target="_BLANK" class="link">{{$lang("the use terms")}}</router-link>
                                </el-checkbox>

                                <div class="d-flex flex-column mt-5">
                                    <button :disabled="!ruleForm.confirm" href="#" class="button primary mr-auto" type="button" @click="submitForm">{{$lang("Create")}}</button>
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

import {TheMask,mask} from 'vue-the-mask'
export default {
    data() {
        return {
            loading : false,
            ruleForm : {
                firstname : null,
                lastname  : null,
                username  : null,
                email     : null,
                phone     : null,
                retype_password : null,
                password : null,
                confirm  : false
            },
            rules: {
                retype_password: [
                    { required: true, message: this.$lang("%% is required field",[this.$lang("Retype Password")]), trigger: 'change' },
                    { validator : this.confirm_pass, trigger: 'change' },
                ],
                password: [{ required: true, message: this.$lang("%% is required field",[this.$lang("Password")]), trigger: 'change' }],
                lastname: [{ required: true, message: this.$lang("%% is required field",[this.$lang("Password")]), trigger: 'change' }],
                firstname: [{ required: true, message: this.$lang("%% is required field",[this.$lang("Password")]), trigger: 'change' }],
                username: [{ required: true, message: this.$lang("%% is required field",[this.$lang("Username")]), trigger: 'change' }],
                email   : [
                    { required: true, message: this.$lang("%% is required field",[this.$lang("Email")]), trigger: 'change' },
                    { type: 'email', message: this.$lang("Input correct email address"), trigger: ['blur', 'change'] }
                ],
            }
        }
    },
    directives: {mask},
    components : {
        'change-language' : require("../Global/ChangeLanguage.vue"),
        'the-mask' : TheMask
    },
    beforeCreate() {
        this.$update_csrf()
    },
    methods: {
        confirm_pass(rule, value, callback) {
            if(this.ruleForm.password!=value) return callback(new Error(this.$lang("Password not match")))
            return callback()
        },
        submitForm() {
            this.$refs.ruleForm.validate((valid) => {
                if (!valid) return
                this.loading = this.$loading()
                this.$http.post(`${this.$constants.server_route}/auth/signup`,this.ruleForm).then(res=>{
                    res = res.data
                    if(res.message) this.$message({showClose: true, message : this.$lang(res.message.content,res.message.params),type: res.message.type})
                    if(!res.success) return this.loading.close()
                    this.$router.push({name:"login", query : { username:this.ruleForm.username }})
                    this.loading.close()
                }).catch( er => {
                    console.log(er)
                    this.loading.close()
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.signup {
    .have_account {
        font-weight : 100;
        font-size : 13px;
    }
    .card-signin {
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
        // border-radius: 5rem;
        letter-spacing: .1rem;
        font-weight: bold;
        padding: 1rem;
        transition: all 0.2s;
    }

    .form-label-group {
        position: relative;
        margin-bottom: 1rem;
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