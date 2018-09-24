<template>
   <div class="hello">
    
    <!-- <h1>{{ response }}</h1> -->
       
          <div>
    <b-form @submit.prevent="signup" inline>
      
        <b-form-input id="emailInput"
                      type="email"
                      v-model="input.email"
                      required
                      placeholder="Enter email">
        </b-form-input>
        <b-form-input id="passwordInput"
                      type="password"
                      v-model="input.password"
                      required
                      placeholder="Enter password">
        </b-form-input>
        <b-button type="submit" variant="primary">Sign Up</b-button>
    </b-form>
  </div>
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
