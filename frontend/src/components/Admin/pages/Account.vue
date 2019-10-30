<template>
    <admin-template ref="template">
        <div v-if="changed" class="alert alert-warning fade show" role="alert">
            <strong>{{$lang("Attention")}}</strong> {{$lang("Don't forget to save changes before leaving")}}
        </div>
        <div class="row">
            <div class="col-md-9 col-sm-12">
                <div class="d-flex flex-row flex-wrap align-items-center">
                    <div class="mr-4 d-none d-lg-block">
                        <img v-if="(user.provider ? true : false)" :src="user.avatar" class="avatar-img">
                        <el-upload
                            v-else
                            v-loading="avatar_loading"
                            class="avatar-uploader d-flex align-items-center justify-content-center"
                            v-bind:class="{'color' : !user.avatar}"
                            :action="`${$constants.server_route}/uploads/image`"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="user.avatar" :src="user.avatar" class="avatar-img">
                            <span v-else class="avatar">
                                <template v-if="user.firstname&&user.lastname">{{user.firstname.substring(0, 1).toUpperCase()}}{{user.lastname.substring(0, 1).toUpperCase()}}</template>
                            </span>
                        </el-upload>
                    </div>
                    <div class="account">
                        <div class="d-flex flex-row align-items-center name">
                            <div class="name pb-1 capitalize">{{user.fullname}}</div>
                            <div class="account-type capitalize">{{$lang("free")}}</div>
                        </div>
                        <div class="id">ID {{user._id}}</div>
                    </div>
                </div>
                <div class="d-flex flex-column mb-4">
                    <div class="card w-100 mt-4">
                        <div class="card-header your-plan d-flex align-items-center justify-content-between">
                            <div class="capitalize"><i class="el-icon-user mr-2"></i>{{$lang("profile")}}</div>
                            <div v-if="!user_dialog_visible"><a href="#" @click.prevent="user_dialog_visible = true"><i class="el-icon-edit mr-2"></i>{{$lang("edit")}}</a></div>
                        </div>
                        <div class="card-body account">
                            <div class="row">
                                <div class="col-md-6 col-sm-12">
                                    <div class="row d-flex align-items-center">
                                        <label class="col-md-3 col-form-label label">{{$lang("Firstname")}}</label>
                                        <div class="col-sm-9">
                                            <input v-model="user.firstname" disabled class="value form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <div class="row d-flex align-items-center">
                                        <label class="col-md-3 col-form-label label">{{$lang("Lastname")}}</label>
                                        <div class="col-sm-9">
                                            <input v-model="user.lastname" disabled class="value form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-sm-12">
                                    <div class="row d-flex align-items-center">
                                        <label class="col-md-3 col-form-label label">{{$lang("Username")}}</label>
                                        <div class="col-sm-9">
                                            <input v-model="user.username" disabled class="value form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <div class="row d-flex align-items-center">
                                        <label class="col-md-3 col-form-label label">Email</label>
                                        <div class="col-sm-9">
                                            <input v-model="user.email" disabled class="value form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-sm-12">
                                    <div class="row d-flex align-items-center">
                                        <label class="col-md-3 col-form-label label">{{$lang("Phone")}}</label>
                                        <div class="col-sm-9">
                                            <input v-model="user.phone" disabled class="value form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <div class="row d-flex align-items-center">
                                        <label class="col-md-3 col-form-label label">{{$lang("Password")}}</label>
                                        <div class="col-sm-9">
                                            <input v-model="user.fake_pass" disabled class="value form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <el-dialog :visible.sync="user_dialog_visible">
                                <h1>MODAL</h1>
                            </el-dialog>
                        </div>
                    </div>
                    <div class="card w-100 mt-4" v-if="user.settings.length>0">
                        <div class="card-header your-plan capitalize">
                            <i class="el-icon-setting mr-2"></i>{{$lang("settings")}}
                        </div>
                        <div class="card-body settings d-flex flex-wrap">
                            <template v-for="(s,i) in user.settings">
                                <el-switch active-color="#13ce66" class="col-md-4 col-sm-12 mb-3"  :key="i"  v-model="user.settings[i].value" :active-text="s.index" />
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-12 mb-4">
                <div class="card h-100">
                    <div class="card-header your-plan capitalize">
                        <i class="el-icon-user mr-2"></i>{{$lang("plan")}}
                    </div>
                    <div class="card-body plan d-flex">
                        <div class="col-12">
                            <div class="d-flex align-items-center flex column">
                                <img class="col-md-1 px-0 icon" :src="plan_icon" />
                                <div class="col-md-11">
                                    <div class="label capitalize">{{$lang("plan")}}</div>
                                    <div class="type capitalize">{{$lang("free")}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
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
            user_dialog_visible : false,
            changed : false,
            loaded : false,
            settings : [],
            user : {
                _id : null,
                fullname : null,
                firstname : null,
                lastname : null,
                email : null,
                username : null,
                phone : null,
                settings : [],
                fake_pass : "***************"
            },
            // rulesAccount: {
            //     firstname: [{ required: true, message: this.$lang("%% is required field",[this.$lang("Firstname")]), trigger: 'change' }],
            //     lastname: [{ required: true, message: this.$lang("%% is required field",[this.$lang("Lastname")]), trigger: 'change' }],
            //     username: [{ required: true, message: this.$lang("%% is required field",[this.$lang("Username")]), trigger: 'change' }],
            //     email: [
            //         { required: true, message: this.$lang("%% is required field",[this.$lang("Lastname")]), trigger: 'change' },
            //         { type: "email", message: this.$lang("Type correct email address"), trigger: 'change' },
            //     ],
            // }
        }
    },
    computed : {
        plan_icon() {
            return "../public/assets/imgs/free.png"
        }
    },
    watch: {
        user : {
            handler(){
                if(!this.loaded) {
                    this.loaded = true   
                    return false                 
                }
                this.changed = true
            },
            deep : true
        }
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
                this.user.avatar = null   
                this.avatar_loading = false
            },1000)
        },
        handleAvatarSuccess(res, file) {
            this.user.avatar = res.file
            this.avatar_loading = false
        },
        beforeAvatarUpload(file) {
            const valids = ['image','jpeg','png']
            if (valids.includes(file.type)) return this.$message.error(this.$lang("%% have to be a valid image file",["Avatar"]))
            this.avatar_loading = true
            return true
        },
        getAccountData() {
            this.loading = this.$loading()
            this.$http.post(`${this.$constants.server_route}/account/get_data`,{type:'overview',user:this.$store.getters.auth.user}).then(res=>{
                res = res.data
                this.user._id = res.data._id
                this.user.fullname  = res.data.fullname
                this.user.firstname = res.data.firstname
                this.user.lastname  = res.data.lastname
                this.user.avatar    = res.data.avatar
                this.user.phone     = res.data.phone
                this.user.username  = res.data.username
                this.user.email     = res.data.email
                this.user.settings  = res.data.settings
                this.loading.close()
            }).catch( er => {
                console.log(er)
                this.loading.close()
            })
        },
    }
}
</script>
<style lang="scss">
.plan {
    .icon {
        width : 60px;
    }
    .type { 
        color: #311b92;
        font-weight: 600;
        font-size: 18px;
    }
    .label {
        color: #9a9a9a;
        font-weight: 500;
    }
}
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
    height : 140px;
    width : 140px;
}
.avatar-uploader {
    opacity : .5;
    transition : .5s;
    height : 140px;
    width : 140px;
    border: 1px dashed #d9d9d9;
    border-radius: 100%;
    cursor: pointer;
    position: relative;
    color : white;
    overflow: hidden;
    &:hover {
        opacity :1;
    }
    &.color {
        background-color : #78909C;
    }
    .avatar {
        font-weight: 500;
        font-size: 50px;
        border-radius: 100%;
        padding: 20px;
    }
}
.account {
    .value { 
        &:disabled {
            padding-left : 0px;
            border: unset;
            background-color: transparent;
            font-size: 18px;
            font-weight: 500;
        }
    }
    .label { 
        color: #c9c9c9;
        font-weight: 400;
    }
    .account-type {
        margin-left: 20px;
        border-radius: 20px;
        background-color: #311b92;
        color: white;
        padding: 0px 20px 2px 20px;
        font-weight: 100;
        font-size : 13px;
    }
    .name {
        font-size: 20px;
        font-weight: 600;
        color: #353a41;
    }
}
.your-plan{
    background-color:white;
    color: #9a9a9a;
    font-weight: 300;
    font-size: 18px;
}
</style>