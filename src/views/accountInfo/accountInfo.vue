<template>
  <div>

    <div>
      banker信息：
      <br>
      <input id="banker_name" type="text" name="result" disabled="disabled">
      <br>
      <input id="banker_secret" type="text" name="result" disabled="disabled">

      <br>
      <br>
      <br>

    </div>

    <div>

      <span>修改密码：</span>

    </div>

    <div class="loginform">
      <form>
        <div class="a">
          <!-- 输入文本框 -->
          <!-- 做市的channel -->

          <span>用户名:</span>
          <input v-model="username">

        </div>
        <div class="a">
          <!-- 输入文本框 -->
          <!-- 做市的channel -->

          <span>登录密码:</span>
          <input v-model="loginpwd" type="password">

        </div>
        <div class="a">
          <!-- 输入文本框 -->
          <!-- 做市的channel -->

          <span>做市控制密码:</span>
          <input v-model="marketmakepwd" type="password">

        </div>
        <div class="a">
          <!-- 输入文本框 -->
          <!-- 做市的channel -->

          <span>新登录密码:</span>
          <input v-model="newloginpwd" type="password">

        </div>

        <hr>

        <input type="button" value="修改登录密码" @click="updateloginpwd">

      </form>
    </div>

    <div class="marketmakeform">
      <form>
        <div class="a">
          <!-- 输入文本框 -->
          <!-- 做市的channel -->

          <span>用户名:</span>
          <input v-model="username">

        </div>
        <div class="a">
          <!-- 输入文本框 -->
          <!-- 做市的channel -->

          <span>登录密码:</span>
          <input v-model="loginpwd" type="password">

        </div>
        <div class="a">
          <!-- 输入文本框 -->
          <!-- 做市的channel -->

          <span>做市控制密码:</span>
          <input v-model="marketmakepwd" type="password">

        </div>

        <div class="a">
          <!-- 输入文本框 -->
          <!-- 做市的channel -->

          <span>新做市密码:</span>
          <input v-model="newmarketmakepwd" type="password">

        </div>

        <hr>

        <input type="button" value="修改做市密码" @click="updatemarketmakepwd">

      </form>
    </div>

  </div>

</template>

<script>
import { changeLoginPws, changeMarketMakePwd } from '@/api/changepwd.js'
import { getBankerInfo } from '@/api/banker.js'

export default {

  data() {
    return {
      username: '',
      loginpwd: '',
      marketmakepwd: '',
      newloginpwd: '',
      newmarketmakepwd: ''
    }
  },
  mounted() {
    this.getbanker()
  },

  methods: {
    getbanker() {
      const params = {
        // 直接访问页面
      }
      getBankerInfo(params).then(res => {
        document.getElementById('banker_name').value = res.banker_name
        document.getElementById('banker_secret').value = res.banker_secret
      })
    },
    updateloginpwd() {
      const self = this

      const params = {
        // 直接访问页面
        'username': self.username,
        'loginpwd': self.loginpwd,
        'marketmakepwd': self.marketmakepwd,
        'newloginpwd': self.newloginpwd
      }
      changeLoginPws(params).then(res => {
        self.handleRequest(res, self.deal_response)
      })
    },
    updatemarketmakepwd() {
      const self = this

      const params = {
        // 直接访问页面
        'username': self.username,
        'loginpwd': self.loginpwd,
        'marketmakepwd': self.marketmakepwd,
        'newmarketmakepwd': self.newmarketmakepwd
      }
      changeMarketMakePwd(params).then(res => {
        self.handleRequest(res, self.deal_response)
      })
    },

    handleRequest(res, func) {
      func(res)
    },
    deal_response(data) {
      if (data.code === 20000) {
        console.log(data)
        if (data.res === 1) {
          alert('修改密码成功')
        } else {
          alert('账号或密码错误')
        }
      }
    }

  }
}
</script>

<style type="text/css">
  .loginform{
    float:left;
    width: 50%;
    border: 10px dashed #FFF;
    border-right: 2px dashed #FFF

  }
  .marketmakeform{
    float:right;
    width: 50%;
    border: 10px dashed #FFF;
    border-right: 2px dashed #FFF
  }
  .a {
    margin-top: 10px;
  }

</style>
