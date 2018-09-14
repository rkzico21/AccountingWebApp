<template>
  <div class="hello">
    
    <!-- <h1>{{ response }}</h1> -->
       
          <div>
    <b-form @submit.prevent="login" inline>
      
        <b-form-input id="emailInput"
                      type="email"
                      v-model="input.email"
                      required
                      placeholder="Enter email">
        </b-form-input>
        <b-form-input id="passwordInput"
                      type="text"
                      v-model="input.password"
                      required
                      placeholder="Enter password">
        </b-form-input>
        <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
     </div>
   
</template>

<script>

  export default {
    name: 'Login',
    data () {
      return {
        input: 
          {
            email: null,
            password: null
          }
      }
    },
    methods: {
      login: function () {
        const { email, password } = this.input;
        this.$store.dispatch('login', { email, password }).then(() => {
        this.$router.push('/')
        })
      }
    },
  }
    

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
