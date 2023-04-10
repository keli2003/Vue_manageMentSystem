<template>
  <div>
    <el-form
      ref="form"
      label-width="70px"
      :inline="true"
      class="login-container"
      :model="form"
      :rules="rules"
    >
      <h3 class="login_title">系统登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit" type="primary" class="login_submit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { getMenu } from "../api";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      // 表单验证
      rules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "请输入用户名",
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "请输入密码",
          },
        ],
      },
    };
  },
  methods: {
    // 登录
    submit() {
      // token信息
      // const token = Mock.Random.guid();
      // // // token信息存入cookie用于不同页面之间的通信
      // Cookie.set("token", token);

      // form表单的校验通过
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.form).then(({ data }) => {
            console.log(data);
            console.log(this.form);
            if (data.code === 20000) {
              // token信息存入cookie用于不同页面之间的通信
              Cookie.set("token", data.data.token);
              // 跳转到首页
              this.$router.push("/home");
            } else {
              this.$message.error(data.data.message);
            }
          });
          // getMenu();
        }
      });

      // 跳转到首页
      // this.$router.push("/home");
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  .el-input {
    width: 198px;
  }
  .login_title {
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login_submit {
    margin-left: 105px;
  }
}
</style>