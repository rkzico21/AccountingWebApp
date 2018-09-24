<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <h1>{{ response }}</h1> -->
    
    <b-card no-body>
      <b-tabs card>
        <!-- Render Tabs -->
        <b-tab :title="item.name" v-for="item in items" :key="item.id" @click="()=>loadAccountTypes(item.id)">
          <h4>{{item.name}} Accounts </h4> 
          <div>
           <div  v-for="type in categories" :key="'account_type'+type.id"> 
              <b>{{type.name}}</b>
              <div v-for="account in type.accounts" :key="'account'+account.id">
                 <i> {{account.name}} </i>
              </div>
            </div> 
            <div>
               <b-btn @click="modalShow = !modalShow">Add New Account</b-btn>
               <!-- Modal Component -->
              <b-modal v-model="modalShow" id="modal1" title="Account Form" ok-title="Save" @ok="createAccount()">
                  <b-form-input type="text" v-model="input.name" placeholder="Name" required />
                  <b-form-select  :options="categories"  value-field="id" v-model="input.accountTypeId" text-field="name"	 
                          placeholder="Account Type" required>
                    <template slot="first">
                      <!-- this slot appears above the options from 'options' prop -->
                      <option :value="null" disabled>-- Please select an option --</option>
                    </template>
                  </b-form-select>
                  <b-form-input type="text" v-model="input.description" placeholder="Description" />
              </b-modal>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>


    </div>
   
</template>

<script>

export default {
  name: 'Accounts',
  data () {
    return {
      msg: 'Accounts',
      response : "",
      items: [],
      categories:[],
      input: {
                name:"",
                description:"",
                accountTypeId: null,
                groupId: -1
                
            },
      

      modalShow: false,
      
    }
  },
  
  mounted() {
     this.$http.get("accountcategory").then(result => {
                this.items = result.data;
                if(this.items.length){
                  this.input.groupId = items[0].id;
                }

            }, error => {
                console.error(error);
            });
        },
        
  methods: {
    loadAccountTypes(id) {
        this.input.groupId = id;
        var groupQuery = "group="+id;
        var orgQuery = "&orgid=" + (localStorage.getItem('organizationId'));
        this.$http.get("accountcategory/types?" + groupQuery + orgQuery ).then(result => {
        this.response = result.data;
        this.categories = this.response;
        }, error => {
                console.error(error);
        });
        },

     createAccount() {

                 this.$http({ method: "POST", "url": "accounts", "data": this.input, "headers": { "content-type": "application/json" } }).then(result => {
                    this.response = result.data;
                    if(this.response) {
                      var accountType =  this.categories.find(t=>t.id == this.response.accountTypeId);
                      if(accountType) {
                         accountType.accounts.push(this.response); 
                      }
                    } 
                    
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
