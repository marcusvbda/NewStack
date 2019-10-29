<template>
    <admin-template ref="template">
        <div class="row">
            <div class="col-md-8 col-sm-12">
                <div class="d-flex flex-row flex-wrap align-items-center">
                    <div class="mr-4 d-none d-lg-block">
                        <img v-if="(frmAccount.provider ? true : false)" :src="frmAccount.avatar" class="avatar-img">
                        <el-upload
                            v-else
                            v-loading="avatar_loading"
                            class="avatar-uploader d-flex align-items-center justify-content-center"
                            v-bind:class="{'color' : !frmAccount.avatar}"
                            :action="`${$constants.server_route}/uploads/image`"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="frmAccount.avatar" :src="frmAccount.avatar" class="avatar-img">
                            <span v-else class="avatar">
                                <template v-if="frmAccount.firstname&&frmAccount.lastname">{{frmAccount.firstname.substring(0, 1).toUpperCase()}}{{frmAccount.lastname.substring(0, 1).toUpperCase()}}</template>
                            </span>
                        </el-upload>
                    </div>
                    <div class="account">
                        <div class="d-flex flex-row align-items-center name">
                            <div class="name pb-1">{{frmAccount.firstname}} {{frmAccount.lastname}}</div>
                            <div class="account-type capitalize">{{$lang("free")}}</div>
                        </div>
                        <div class="id">ID {{frmAccount._id}}</div>
                    </div>
                </div>
                <div class="d-flex flex-column mb-4">
                    <div class="card w-100 mt-4">
                        <div class="card-header your-plan">
                            <i class="el-icon-user mr-2"></i>{{$lang("profile")}}
                        </div>
                        <div class="card-body account">
                            account info
                        </div>
                    </div>
                    <div class="card w-100 mt-4">
                        <div class="card-header your-plan">
                            <i class="el-icon-setting mr-2 capitalize"></i>{{$lang("settings")}}
                        </div>
                        <div class="card-body settings d-flex flex-wrap">
                            <el-switch active-color="#13ce66" class="col-md-4 col-sm-12 mb-3" v-for="i in 10" :key="i"  v-model="settings[i]" :active-text="`Setting ${i}`" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12 mb-4">
                <div class="card h-100">
                    <div class="card-header your-plan">
                        <i class="el-icon-user mr-2 capitalize"></i>{{$lang("plan")}}
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
            settings : [],
            frmAccount : {
                _id : null,
                firstname : null,
                lastname : null,
                email : null,
                username : null,
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
        "frmAccount.password"(val) {
            if(!val) this.frmAccount.retype_password = null
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
                this.frmAccount.avatar = null   
                this.avatar_loading = false
            },1000)
        },
        handleAvatarSuccess(res, file) {
            this.frmAccount.avatar = res.file
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
                this.frmAccount._id = res.data._id
                this.frmAccount.firstname = res.data.firstname
                this.frmAccount.lastname  = res.data.lastname
                this.frmAccount.avatar    = res.data.avatar
                this.frmAccount.username  = res.data.username
                this.frmAccount.email     = res.data.email
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
    height : 140px;
    width : 140px;
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
        font-size: 50px;
        border-radius: 100%;
        padding: 20px;
    }
}
.account {
    .value { 
        color: #353a41;
        font-weight: 700;
        margin-left: 10px;
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
.custom-form {
    .el-form-item__label { 
        color: #c9c9c9;
        font-weight: 400;
        font-size: 16px;
    }
    .el-input__inner { 
        border:unset;
        font-size: 16px;
        font-weight: 600;
        &:focus {
            border: 1px solid #DCDFE6;
        }
    }
}
</style>