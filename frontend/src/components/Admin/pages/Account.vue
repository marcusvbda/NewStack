<template>
    <admin-template ref="template">
        <div class="col-md-6 col-sm-12 container mt-4">
            <div class="card">
                <template v-if="provider">
                    <div class="card-header">
                        <div class="d-flex justify-content-center align-items-center">
                            <img class="ml-2 provider icon mr-2" :class="provider" :src="`../public/assets/imgs/${provider}.png`" />
                        </div>
                    </div>
                    <div class="card-body">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="form-signin mt-3">
                            <div class="d-flex">
                                <div class="col-md-6 col-sm-12">
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
                            <div class="d-flex flex-column mt-4" >
                                <button href="#" class="button primary ml-auto" type="button" @click="submitForm">{{$lang("Save")}}</button>
                            </div>
                        </el-form>
                    </div>
                </template>
                <template v-else>
                    <div class="card-header">
                        <div class="d-flex justify-content-center align-items-center">
                            <h5 class="mb-0">{{$lang("User Data")}}</h5>
                            <span class="id-content">{{ruleForm._id}}</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="form-signin mt-3">
                            <div class="d-flex">
                                <div class="col-md-6 col-sm-12">
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
                                <div class="col-md-6 col-sm-12">
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
                            <div class="d-flex flex-column mt-4">
                                <button href="#" class="button primary ml-auto" type="button" @click="submitForm">{{$lang("Save")}}</button>
                            </div>
                        </el-form>
                    </div>
                </template>
            </div>
        </div>
    </admin-template>
</template>
<script>
export default {
    components : {
        'admin-template' : require("../Template.vue")
    },
    data() {
        return {
            loading : false,
            provider : null,
            ruleForm : {
                _id : null,
                firstname : null,
                lastname : null,
                password : null,
                retype_password : null
            },
            rules: {
                retype_password: [{ validator : this.retype_confirm_pass, trigger: 'change' }],
                username: [{ required: true, message: this.$lang("%% is required field",[this.$lang("Username")]), trigger: 'change' }],
                firstname: [{ required: true, message: this.$lang("%% is required field",[this.$lang("Password")]), trigger: 'change' }],
            }
        }
    },
    watch: {
        "ruleForm.password"(val) {
            if(!val) this.ruleForm.retype_password = null
        },
    },
    mounted() {
        this.$root.sublinks = [
            {active : true, name : this.$lang("User Data"), route : "account"},
            {active : false, name : this.$lang("Settings"), route : "settings"},
        ]
        this.getAccountData("overview")
    },
    beforeCreate() {
        this.$update_csrf()
    },
    methods : {
        retype_confirm_pass(rule, value, callback) {
            if(!this.ruleForm.password) return callback()
            if(this.ruleForm.password!=this.ruleForm.retype_password) return callback(new Error(this.$lang("Password not match")))
            return callback()
        },
        submitForm() {
            this.$refs.ruleForm.validate((valid) => {
                if (!valid) return
                this.loading = this.$loading()
                this.$http.put(`${this.$constants.server_route}/account/put_data`,this.ruleForm).then(res=>{
                    res = res.data
                    if(res.message) this.$message({showClose: true, message : this.$lang(res.message.content,res.message.params),type: res.message.type})
                    if(!res.success) return this.loading.close()
                    this.ruleForm.password = null
                    this.loading.close()
                }).catch( er => {
                    console.log(er)
                    this.loading.close()
                })
            })
        },
        getAccountData() {
            this.loading = this.$loading()
            this.$http.post(`${this.$constants.server_route}/account/get_data`,{type:'overview',user:this.$store.getters.auth.user}).then(res=>{
                res = res.data
                this.provider = res.data.provider
                this.ruleForm._id = res.data._id
                this.ruleForm.firstname = res.data.firstname
                this.ruleForm.lastname  = res.data.lastname
                this.loading.close()
            }).catch( er => {
                console.log(er)
                this.loading.close()
            })
        }
    }
}
</script>
<style scoped lang="scss">
.provider {
    &.icon {
        width: 30px;
        &.facebook {
            -webkit-filter: invert(100%);
            filter: invert(100%);
        }
    }
}
.id-content {
    margin-left: 10px;
    background-color: #e0e0e0;
    padding: 5px 10px 5px 10px;
}
</style>