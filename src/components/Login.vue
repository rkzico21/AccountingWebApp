<template>
  <div class="hello">
    
    <!-- <h1>{{ response }}</h1> -->
    <div>

    <b-row>
        <b-col></b-col>
        <b-col>

    <b-form @submit.prevent="login">
        <b-form-row class="my-1">
          <b-form-input id="emailInput"
                      type="email"
                      v-model="input.email"
                      required
                      placeholder="Email">
          </b-form-input>
        </b-form-row>
        <b-form-row class="my-1">
        <b-form-input id="passwordInput"
                      type="password"
                      v-model="input.password"
                      required
                      placeholder="Password">
        </b-form-input>
        </b-form-row>
        <b-form-row class="my-1">
          <b-button type="submit" variant="primary" size="sm">Login</b-button>
         
        </b-form-row>
        </b-form>
         <b-link to="SignUp">SignUp</b-link>
    </b-col>
    <b-col></b-col>
    </b-row>
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
        
          if(localStorage.getItem('organizationId')){
              this.$router.push('/')
          } else {
              this.$router.push('/Organization')
          }
     
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
