
</<template>
    <div class="login">
        <h1 class="title">饿了么</h1>
        <p class="smallTitle">Everything 30'</p>
        <div class="tab">
            <div class="phoneLogin" @click="tab(1)">
                <span :class="{'active': tabIndex==1}">短信登录</span>
            </div>
            <div class="passLogin" @click="tab(2)">
                <span :class="{'active': tabIndex==2}">密码登录</span>
            </div>
        </div>
        <div class="pass-login-box">
            <form>
                <input type="text" placeholder="手机" class="phone" v-model="passForm.phone">
                <input type="password" placeholder="密码" class="pass" v-model="passForm.password">
                <button type="button" class="btn" @click="login()">登录</button>
            </form> 
        </div>
        <p class="aboutUs">关于我们</p>
    </div>
</template>

<script>
    import Storage from '../../common/js/storage';
    export default {
        data() {
            return {
                tabIndex: 1,
                passForm: {
                    'phone': '',
                    'password': ''
                }
            }
        },
        methods: {
            tab(index) {
                this.tabIndex = index;
            },
            login() {
                if(this.passForm.phone === '') {
                    alert('手机号不为空');
                    return false;
                }
                if(this.passForm.password === '') {
                    alert('密码不为空');
                    return false;
                }
                if(!this.checkPhone(this.passForm.phone)) {
                    alert('请输入正确的手机号');
                    return false;
                }
                this.token = true;
                Storage.set('token', '123456');
                this.$router.push({ path: 'goods' });
            },
            checkPhone(phone) {
                let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!myreg.test(phone)) {
                return false;
                } else {
                return true;
                }
            }
        }
    }
</script>

<style lang="scss">
    .login{
        line-height: 0;
        font-size: 0;
        .aboutUs{
            margin-top: 0.5rem;
            text-align: center;
            color: #999;
            font-size: 0.24rem;
        }
        .pass-login-box{
            text-align: center;
            margin-top: 0.5rem;
            padding: 0 0.5rem;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            .btn{
                margin-top: 0.5rem;
                display: block;
                width: 100%;
                height: 0.88rem;
                border-radius: 4px;
                background: #4cd96f;
                color: #fff;
                cursor: pointer;
                text-align: center;
                font-size: 0.36rem;
                line-height: 0.88rem;
                border: 1px solid #4cd96f;
            }
            .phone,.pass{
                width: 100%;
                height: 0.88rem;
                padding: 0 0.24rem;
                border: 1px solid rgba(7, 17, 27, 0.1);
                margin:0.18rem 0;
                border-radius:4px; 
                -moz-border-radius:4px; 
                -webkit-border-radius:4px;
                box-sizing: border-box;
            }
            
        }
        .tab{
            display: flex;
            margin-top: 1rem;
            .phoneLogin{
                flex: 1;
                font-size: 0.3rem;
                text-align: right;
                padding-right: 0.5rem;
                .active{
                    color: #2395ff;
                    border-bottom: 0.04rem solid #2395ff
                }
            }
            .passLogin{
                flex: 1;
                font-size: 0.3rem;
                padding-left: 0.5rem;
                .active{
                    color: #2395ff;
                    border-bottom: 0.04rem solid #2395ff
                }
            }
        }
        .title{
            font-weight: 700;
            color: #2395ff;
            text-align: center;
            font-size: 0.6rem;
            margin-top: 1.5rem;
        }
        .smallTitle{
            margin: 0;
            padding: 0;
            font-size: 0.26rem;
            height: 0.26rem;
            line-height: 0.26rem;
            color: #2395ff;
            text-align: center;
            margin-top: 0.12rem;
        }
    }
</style>



