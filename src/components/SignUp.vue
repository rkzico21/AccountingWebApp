<template>
   <div>
    
    <!-- <h1>{{ response }}</h1> -->
       
          <b-row>
        <b-col></b-col>
        <b-col>

    <b-form @submit.prevent="signup">
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
          <b-button type="submit" variant="primary" size="sm">Sign Up</b-button>
         
        </b-form-row>
        </b-form>
        <b-link to="Login">Login</b-link>
    </b-col>
    <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
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
      signup: function () {
         this.$http({ method: "POST", "url": "signup", "data": this.input, "headers": { "content-type": "application/json" } }).then(result => {
                    
                    this.$router.push('/Login');
                    
                }, error => {
                    console.error(error);
                });
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
