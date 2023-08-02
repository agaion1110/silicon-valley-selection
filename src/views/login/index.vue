<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12">站位的位子</el-col>
            <el-col :span="12">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password"  show-password :prefix-icon="Lock" v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { reactive,ref } from 'vue';
import { useRouter} from 'vue-router';
import { ElNotification } from 'element-plus';
//引入获取当前时间的函数
import { getTime } from '@/utils/time';
// 引入用户相关的小仓库
import useStore from "../../store/modules/user";
let useUser = useStore();
// 获取路由器
let $router = useRouter();
// 收集表单账号与密码的数据
let loginForm = reactive({
  username: '',
  password: '',
})
//获取el-form组件
let loginForms = ref();
//定义变量控制按钮加载效果
let loading = ref(false);
// 登录按钮的回调
const login = async () => {
  //保证全部表单相校验通过再发请求
  await loginForms.value.validate()
  //加载效果:开始加载
  loading.value = true;
  //点击登录按钮以后干什么?
  //通知仓库发登录请求
  //请求成功->首页展示数据的地方
  //请求失败->弹出登录失败信息
  try {
    //保证登录成功
    await useUser.login(loginForm);
    //编程式导航跳转到展示数据首页
    $router.push('/');
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `Hello,${getTime()}好`
    })
    loading.value = false;
  } catch (error) {
    loading.value = false;
    ElNotification({
      type: 'error',
      message: (error as Error).message
    })
  }
}
// 自定义校验规则
const validatorUserName = (_rule: any, value: any, callback: any) => {
  //rule:即为校验规则对象
  //value:即为表单元素文本内容
  //函数:如果符合条件callBack放行通过即为
  //如果不符合条件callBack方法,注入错误提示信息
  if (value.length >= 3&& value.length <= 10) {
    callback();
  } else {
    callback(new Error('账号长度在3到10位之间'));
  }
}
const validatorUserPassword = (_rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback();
  } else {
    callback(new Error('密码长度在至少是6位'));
  }
}
const rules = {
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    // { min: 3, max: 10, message: '长度必须在3到10个字符之间', trigger: 'change' },
    {trigger: 'change', validator: validatorUserName}
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {trigger: 'change', validator: validatorUserPassword}
  ],
}

</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>