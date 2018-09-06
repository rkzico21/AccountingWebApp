<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <h1>{{ response }}</h1> -->
    <div id="form">
       <input type="text" v-model="input.id" placeholder="id" />
       <input type="text" v-model="input.name" placeholder="Name" />
       <input type="text" v-model="input.description" placeholder="description" />
       <input type="text" v-model="input.accountTypeId" placeholder="Account Type Id" />
       <input type="text" v-model="input.groupId" placeholder="Group Id" />
       <button v-on:click="sendData()">Send</button>
    </div>
    <div id="accounts">
      <div :id="item.id"  v-for="item in items">
       Name:  {{ item.name }}
        
       <span v-if="item.description" > Desc:  {{ item.description }}</span>
       </div>
     </div>
    </div>
</template>

<script>
 import axios from "axios";

export default {
  name: 'Accounts',
  data () {
    return {
      msg: 'Accounts Page',
      response : "",
      items: [],
      input: {
                id:0,
                name:"",
                description:"",
                accountTypeId: 1,
                groupId: 1,
                baseUrl: "https://2rtdu7y7ue.execute-api.us-west-2.amazonaws.com/Prod/" //http://localhost:5000/
            }
    }
  },
  
  mounted() {
    axios.get(this.baseUrl + "api/accounts").then(result => {
                this.response = result.data;
                this.items = this.response;
            }, error => {
                console.error(error);
            });
        },
        methods: {
            sendData() {
                axios({ method: "POST", "url": this.baseUrl +"api/accounts", "data": this.input, "headers": { "content-type": "application/json" } }).then(result => {
                    this.response = result.data;
                    this.items.push(this.response);
                }, error => {
                    console.error(error);
                });
            }
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
