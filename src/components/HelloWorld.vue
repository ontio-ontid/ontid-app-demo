<style>
.payment-btn {
  margin-top: 20px;
}
</style>


<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <button class="ontid-signin some-other-class" data-onsuccess="onLoginSuccess">Sign in with Ontology</button>

    <p>
      Response of sign in: 
    </p>
    <textarea name="" id="" cols="50" rows="10" v-model="loginedAccount"></textarea>

    <div class="payment-btn">
      <button class="btn" @click="toInvokeSc">To do Payment/Invoke smart contract</button>
    </div>
  </div>
</template>

<script>
import * as b64 from 'base64-url';
import axios from 'axios'
import { ONTID_BACKEND, ONTID_FRONTEND } from '../common/config'

export default {
  name: 'HelloWorld',
  data() {
    const loginedAccount = {
      access_token: sessionStorage.getItem('access_token')|| '',
      ontid: sessionStorage.getItem('ontid') || ''
    }
    return {
      loginedAccount: JSON.stringify(loginedAccount),
      msg: 'Welcome to our Awesome DApp'
    }
  },
  mounted() {
    window.onLoginSuccess = this.handleLoginSuccess.bind(this)
    if(sessionStorage.getItem('access_token')) {
      this.fetchUserInfoWithToken()
    }
  },
  methods: {
    handleLoginSuccess(result) {
      // verify signature
      const jwt = result.access_token;
      sessionStorage.setItem('access_token', jwt)
      sessionStorage.setItem('ontid', result.ontid)
      this.loginedAccount = JSON.stringify({
        access_token: result.access_token,
        ontid: result.ontid
      })
      const jwtStrs = jwt.split('.');
      const msg = jwtStrs[0] + '.' + jwtStrs[1]
      const msgHex = Ont.utils.str2hexstr(msg)
      const decodeSig = b64.decode(jwtStrs[2])
      const signature = Ont.Crypto.Signature.deserializeHex(decodeSig)
      const ontid_backend_pk = new Ont.Crypto.PublicKey('026d3557e55fffe7bc5a9a8fc0c7361bc48590c17bf4d0d345e3f354bb64a0452a')
      const verifyResult = ontid_backend_pk.verify(msgHex, signature)
      console.log(verifyResult)
      // then send token to the backend
    },
    fetchUserInfoWithToken() {
        // fetch user info with access_token
      const url = ONTID_BACKEND + '/api/v1/ontid/info'
      axios.post(url,{
        ontid: sessionStorage.getItem('ontid')
      } , {
        headers: {
          access_token: sessionStorage.getItem('access_token')
        }
      }).then(res => {
        console.log(res)
        const wallet = res.data.result.wallet[0]
        sessionStorage.setItem('wallet', JSON.stringify(wallet))
      })
    },

    toInvokeSc() {
      if(!sessionStorage.getItem('ontid')) {
        alert('Please sign in first.')
      } else {
        this.$router.push({name: 'InvokeSc'})
      }
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
