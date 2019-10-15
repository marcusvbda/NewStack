<template>
    <admin-template ref="template">
        <div class="d-flex flex-row mt-4 justify-content-start">
            <div class="col-md-3 col-sm-12 container">
                <div class="card h-100">
                    <div class="card-body">
                        <div class="d-flex justify-content-center mt-3">
                            <img v-if="(ruleForm.provider ? true : false)" :src="ruleForm.avatar" class="avatar-img">
                            <el-upload
                                v-else
                                v-loading="avatar_loading"
                                class="avatar-uploader d-flex align-items-center justify-content-center"
                                v-bind:class="{'color' : !ruleForm.avatar}"
                                :action="`${$constants.server_route}/uploads/image`"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar-img">
                                <span v-else class="avatar">
                                    <template v-if="ruleForm.firstname&&ruleForm.lastname">{{ruleForm.firstname.substring(0, 1).toUpperCase()}}{{ruleForm.lastname.substring(0, 1).toUpperCase()}}</template>
                                </span>
                            </el-upload>
                        </div>
                        <div class="text-center" v-if="ruleForm.avatar">
                            <a href="#" @click.prevent="removeAvatar" class="link">{{$lang('Remove %%',['Avatar'])}}</a>
                        </div>
                        <div class="d-flex justify-content-center mt-3">
                            <div>{{$lang('Hello')}}, <b>{{ruleForm.firstname}} {{ruleForm.lastname}}</b></div>
                        </div>
                        <div class="d-flex justify-content-center mt-2">
                            <div class="id-content">ID.: {{ruleForm._id}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-8 col-sm-12 container">
                <div class="card h-100">
                    <template v-if="provider">
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
            avatar_loading : false,
            loading : false,
            provider : null,
            ruleForm : {
                _id : null,
                username  : null,
                avatar    : null,
                firstname : null,
                lastname  : null,
                password  : null,
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
            {active : true, name : this.$lang("User Data"), route : "account"}
        ]
    },
    beforeCreate() {
        this.$update_csrf(res => this.getAccountData("overview"))
    },
    methods : {
        removeAvatar() {
            this.avatar_loading = true
            setTimeout(() => {
                this.ruleForm.avatar = null   
                this.avatar_loading = false
            },1000)
        },
        handleAvatarSuccess(res, file) {
            this.ruleForm.avatar = res.file
            this.avatar_loading = false
      },
      beforeAvatarUpload(file) {
        const valids = ['image','jpeg','png']
        if (valids.includes(file.type)) return this.$message.error(this.$lang("%% have to be a valid image file",["Avatar"]))
        this.avatar_loading = true
        return true
      },
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
                    this.refresh()
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
                this.ruleForm.avatar    = res.data.avatar
                this.ruleForm.username  = res.data.username
                this.loading.close()
            }).catch( er => {
                console.log(er)
                this.loading.close()
            })
        },
        refresh() {
            let user  = this.$store.getters.auth.user
            user.avatar = this.ruleForm.avatar
            user.firstname = this.ruleForm.firstname
            user.lastname  = this.ruleForm.lastname
            this.$store.commit('login',user)
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
.avatar-img {
    border-radius : 100%;
    height : 100px;
    width : 100px;
}
.avatar-uploader {
    height : 100px;
    width : 100px;
    border: 1px dashed #d9d9d9;
    border-radius: 100%;
    cursor: pointer;
    position: relative;
    color : white;
    overflow: hidden;
    &.color {
        background-color : #78909C;
    }
    .avatar {
        font-weight: 500;
        font-size: 40px;
        border-radius: 100%;
        padding: 20px;
    }
}
</style>