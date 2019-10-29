<template>
    <admin-template ref="template">
        <div class="d-flex">
            <div class="col-md-8 col-sm-12">
                <div class="d-flex flex-row flex-wrap">
                    <div class="mr-4">
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
                            <div class="account-type">Diamante</div>
                        </div>
                        <div class="id">ID {{frmAccount._id}}</div>
                        <div class="status-content d-flex mt-3">
                            <div class="status active status active d-flex aling-items-center">
                                <div class="icon-ball mr-2 active"></div>ATIVO
                            </div>
                        </div>
                    </div>
                    <div class="md-flex flex-column text-center flex-grow-1 company">
                        <h4 class="title">Empresa</h4>
                        <h4 class="name">Nome da empresa</h4>
                    </div>
                </div>
                <div class="follower-counter d-flex flex-row mt-4">
                    <div class="follower-item col-md-3 col-sm-12">
                        <div class="label">Seguidores No Instagram</div>
                        <div class="count">25k</div>
                    </div>
                    <div class="follower-item col-md-3 col-sm-12 bordered">
                        <div class="label">Seguidores No Instagram</div>
                        <div class="count">25k</div>
                    </div>
                    <div class="follower-item col-md-3 col-sm-12 bordered">
                        <div class="label">Seguidores No Instagram</div>
                        <div class="count">25k</div>
                    </div>
                    <div class="follower-item col-md-3 col-sm-12 bordered">
                        <div class="label">Seguidores No Instagram</div>
                        <div class="count">25k</div>
                    </div>
                </div>
                <div class="d-flex flex-column">
                    <div class="card w-100 mt-4">
                        <div class="card-header your-plan">
                            <i class="el-icon-user mr-2"></i>PERFIL
                        </div>
                        <div class="card-body account">
                            <div class="d-flex mb-3">
                                <div class="col-md-6 col-sm-12 d-flex flex-row">
                                    <div class="label col-3 text-right">Nome</div>
                                    <div class="value capitalize col-9">{{frmAccount.firstname}} {{frmAccount.lastname}}</div>
                                </div>
                                <div class="col-md-6 col-sm-12 d-flex flex-row">
                                    <div class="label col-3 text-right">Email</div>
                                    <div class="value col-9">{{frmAccount.email}}</div>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="col-md-6 col-sm-12 d-flex flex-row">
                                    <div class="label col-3 text-right">Usuário</div>
                                    <div class="value col-9">{{frmAccount.username}}</div>
                                </div>
                                <div class="col-md-6 col-sm-12 d-flex flex-row">
                                    <div class="label col-3 text-right">Senha</div>
                                    <div class="value col-9">****************</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card w-100 mt-4">
                        <div class="card-header your-plan">
                            <i class="el-icon-setting mr-2"></i>CONFIGURAÇÕES
                        </div>
                        <div class="card-body settings d-flex flex-wrap">
                            <el-switch active-color="#13ce66" class="col-md-4 col-sm-12 mb-3" v-for="i in 20" :key="i"  v-model="settings[i]" :active-text="`Setting ${i}`" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="card h-100">
                    <div class="card-header your-plan">
                        <i class="el-icon-user mr-2"></i>SEU PLANO
                    </div>
                    <div class="card-body plan d-flex">
                        <div class="col-12">
                            <div class="d-flex align-items-center flex column">
                                <img class="col-md-1 px-0 icon" src="../public/assets/imgs/diamond.png" />
                                <div class="col-md-11">
                                    <div class="label">Plano</div>
                                    <div class="type">Diamante</div>
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
        padding: 0px 20px 5px 20px;
        font-weight: 100;
        font-size : 13px;
    }
    .name {
        font-size: 20px;
        font-weight: 600;
        color: #353a41;
    }
}
.company {
    .title {
        color: #353a41;
        font-weight: 900;
    }
    .name {
        font-size: 15px;
        font-weight: 400;
    }
}
.your-plan{
    background-color:white;
    color: #9a9a9a;
    font-weight: 300;
    font-size: 18px;
}
.status-content {
    .status {
        background-color:white;
        border-radius : 50px;
        padding: 2px 10px 2px 10px;
        font-size : 12px;
        &.active {
            color: #45c55e;
        }
        .icon-ball {
            height : 18px;
            width : 18px;
            background-color : black;
            border-radius : 100px;
            &.active {
                background-color: #45c55e;
            }
        }
    }
}
.follower-counter {
    border-bottom: 2px solid #d9d9d9;
    .follower-item {
        &.bordered {
            border-left: 2px solid #d9d9d9;
        }
        .count {
            font-size: 25px;
            font-weight: 600;
            padding-bottom: 20px;
        }
        .label {
            color: #b4b4b4;
            font-weight: 400;
            font-size: 18px;
            margin-bottom: 10px;
        }
    }
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