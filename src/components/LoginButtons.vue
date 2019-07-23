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
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="이메일 주소"
          required
          single-line
          solo
          style="width:240px; margin: auto;"
          ></v-text-field>

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
      await FirebaseServices.createUserWithEmail(this.email, this.password)
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
