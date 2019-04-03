<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <button class="ontid-signin some-other-class" data-onsuccess="onLoginSuccess">Sign in with Ontology</button>

    <p>
      Response of sign in: 
    </p>
    <textarea name="" id="" cols="50" rows="10" v-model="loginedAccount"></textarea>
  </div>
</template>

<script>
import * as b64 from 'base64-url';
export default {
  name: 'HelloWorld',
  data() {

    return {
      loginedAccount: '',
      msg: 'Welcome to our Awesome DApp'
    }
  },
  mounted() {
    window.onLoginSuccess = this.handleLoginSuccess.bind(this)
  },
  methods: {
    handleLoginSuccess(result) {
      this.loginedAccount = JSON.stringify(result)

      // verify signature
      const jwt = result.access_token;
      const jwtStrs = jwt.split('.');
      const msg = jwtStrs[0] + '.' + jwtStrs[1]
      const msgHex = Ont.utils.str2hexstr(msg)
      const decodeSig = b64.decode(jwtStrs[2])
      const signature = Ont.Crypto.Signature.deserializeHex(decodeSig)
      const ontid_backend_pk = new Ont.Crypto.PublicKey('026d3557e55fffe7bc5a9a8fc0c7361bc48590c17bf4d0d345e3f354bb64a0452a')
      const verifyResult = ontid_backend_pk.verify(msgHex, signature)
      console.log(verifyResult)
      // then send token to the backend
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
