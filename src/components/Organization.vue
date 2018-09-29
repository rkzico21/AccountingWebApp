<template>
   <div class="hello">
    
    <!-- <h1>{{ response }}</h1> -->
       
          <div>
            <b-row>
        <b-col></b-col>
        <b-col>
    <b-form @submit.prevent="signup">
      
      <b-form-row class="my-1">
         
        <b-form-input id="nameInput"
                      type="text"
                      v-model="input.name"
                      required
                      placeholder="Enter Business Name">
        </b-form-input>
         </b-form-row>
         <b-form-row class="my-1">
          <b-button type="submit" variant="primary">Create</b-button>
         </b-form-row>
    </b-form>
        </b-col>
        <b-col></b-col>
            </b-row>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Organization',
  data () {
    return {
       input: 
          {
            name: null,
          }
    }
  },

  methods: {
      signup: function () {
         this.$http({ method: "POST", "url": "organizations", "data": this.input, "headers": { "content-type": "application/json" } }).then(result => {
                    var response = result.data;
                    localStorage.setItem("organizationId", response.id);
                    this.$router.push('/');
                    
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
