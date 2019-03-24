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
export default {
  name: 'HelloWorld',
  data() {

    return {
      loginedAccount: ''
    }
  },
  props: {
    msg: String
  },
  mounted() {
    window.onLoginSuccess = this.handleLoginSuccess.bind(this)
  },
  methods: {
    handleLoginSuccess(result) {
      this.loginedAccount = JSON.stringify(result)
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
