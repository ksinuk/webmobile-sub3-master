<template>
  <v-layout>
    <v-flex>
      <!-- login provider -->
      <v-flex>
        <div id="loginProvider">
          <v-btn depressed small style="color: #0F9D58;"
            @click="googleLogin">
            <v-icon right dark style="
              margin-left: 0px;
              margin-right: 7px;
              ">fab fa-google</v-icon>
            Google로 로그인
          </v-btn>
        </div>

        <div id="loginProvider">
          <v-btn depressed small style="color: #3b5998;"
            @click="facebookLogin">
            <v-icon right dark style="
              margin-left: 0px;
              margin-right: 7px;
            ">fab fa-facebook-square</v-icon>
            Facebook으로 로그인
          </v-btn>   
        </div>
      </v-flex>

      <v-divider></v-divider>
      <!-- email with password -->
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        >

        <!-- email -->
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="이메일 주소"
          required
          single-line
          solo
          style="width:240px; margin: auto;"
          ></v-text-field>

        <!-- displayName -->
        <!-- 회원가입 폼에서만 보임 -->
        <v-text-field
          name="nameForm"
          v-show="viewSign"
          v-model="displayName"
          :rules="nameRules"
          label="이름"
          required
          single-line
          solo
          style="width:240px; margin: auto;"
          v-on:keyup="characterCheck()"
          v-on:keydown="characterCheck()"
          ></v-text-field>

        <!-- password -->
        <v-text-field
          v-model="password"
          :append-icon="pwShow ? 'visibility' : 'visibility_off'"
          :type="pwShow ? 'text' : 'password'"
          :rules="pwRules"
          label="비밀번호"
          hint="At least 8 characters"
          counter
          @click:append="pwShow = !pwShow"
          single-line
          solo
          style="width:240px; margin: auto;"
          ></v-text-field>

        <v-btn
          v-show="viewSign"
          :loading="loading"
          :disabled="loading"
          color="success"
          @click="loader = 'loading'"
        >
          가입
        </v-btn>

        <v-btn
          v-show="!viewSign"
          :loading="loading"
          :disabled="loading"
          color="success"
          @click="loader = 'loading'"
        >
          로그인
        </v-btn>
      </v-form>

    </v-flex>
  </v-layout>
</template>

<script>
import FirebaseServices from '../services/FirebaseServices'
import router from '../router'

export default {
  name: 'Loginbuttons',
  components: {
  },
  props:['viewSign'],
  data () {
    return {
      // input rules
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      valid: true,
      displayName: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      // pw rule
      pwShow: false,
      password: '',
      pwRules: [
        v => !!v || 'Required.',
        v => v.length >= 8 || 'Min 8 characters',
      ],
      // loading button
      loader: null,
      loading: false,
    }
  },
  watch: {
    loader () {
      if (this.loader === 'loading') {
        if(this.viewSign == true) {
          this.createUserWithEmail()
        } else {
          this.emailLogin()
        }
        
      }
      const thisCopy = this
      const l = thisCopy.loader
      thisCopy[l] = !thisCopy[l]
      setTimeout(function () {
        thisCopy[l] = false
        thisCopy.goHome()
        }, 3000)
      thisCopy.loader = null
    }
  },
  methods: {
    async createUserWithEmail() {
      await FirebaseServices.createUserWithEmail(this.email, this.password, this.displayName)
    },
    emailLogin(){
      FirebaseServices.loginUserWithEmail(this.email, this.password)
    },
    googleLogin() {
      FirebaseServices.loginUserWithGoogle()
    },
    facebookLogin() {
      FirebaseServices.loginUserWithFacebook()
    },
    goHome() {
      this.$router.push('/')
    },
    // 유저네임 특수문자 제한
    characterCheck() {
      let RegExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi
      let obj = document.getElementsByName("nameForm")[0]
      if (RegExp.test(obj.value)) {
        // 현재 데이터와 연결해서 특수문자 입력을 받으면 마지막 문자를 제거
        this.displayName = obj.value.substring(0, obj.value.length - 1)
        alert('특수문자는 입력하실 수 없습니다.')
      }
    }
  }
}
</script>

<style>
.v-btn {
  width:240px;
}
.v-divider {
  margin: 20px;
}
.v-text-field__details {
  display: none;
}
#loginProvider {
  height: 30px;
}
</style>
