<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <h1>{{ response }}</h1> -->
       
          <div>
              <b-table striped hover :items="items" :fields="fields">
                <template slot="table-caption">
                    Transactions
                </template>
                <template slot="accountId" slot-scope="data">
                   {{getAccount(data.item.accountId)}}
                </template>
                 <template slot="delete" slot-scope="data">
                    <a @click="deleteTransaction(data.item.id)" href="#">Delete  </a>
                </template>
              </b-table>

            <div>
               <b-btn @click="modalShow = !modalShow">Add Transaction</b-btn>
               <!-- Modal Component -->
              <b-modal v-model="modalShow" id="modal1" title="Transaction Details" ok-title="Save" @ok="createTransaction()">
                  <b-form-input type="text" v-model="input.id" placeholder="Id" />
                  <b-form-input type="text" v-model="input.description" placeholder="Description" required />
                  <b-form-select  :options="accounts"  value-field="id" v-model="input.accountId" text-field="name"	 
                          placeholder="Account" required>
                  </b-form-select>
                  <b-form-input type="date" v-model="input.transactionDate" placeholder="Date" />
                  <b-form-select  :options="transactionTypes"  value-field="id" v-model="input.transactionTypeId" text-field="name"	 
                          placeholder="Deposit or Withdrawal" required>
                  </b-form-select>
                  <b-form-input type="amount" v-model="input.amount" placeholder="Total amount" />
              </b-modal>
            </div>
          </div>
     </div>
   
</template>

<script>
 import axios from "axios";

export default {
  name: 'Transactions',
  data () {
    return {
      msg: 'Transactions',
      response : "",
      items: [],
      transactionTypes: [
        { id: 1, name:"Deposit"},
        { id: 2, name:"Withdrawal"}
      ],
      accounts: [],
      input: {
                id:-1,
                description:"",
                accountId: null,
                transactionDate:new Date().toISOString().slice(0,10),                
                transactionTypeId: 1,
                amount: 0.00
                
                
            },
      fields: {
        transactionDate: {
          label: 'Date',
          sortable: true
        },
        description: {
          label: 'Description',
          sortable: false
        },
        accountId: {
          // This key overrides `foo`!
          key: "accountId", 
          label: 'Account',
          sortable: false
        },
        amount: {
          sortable: true
        }, 
        delete:
        { key: 'delete', label: '' }
      },
      

      modalShow: false,
      baseUrl: "https://2rtdu7y7ue.execute-api.us-west-2.amazonaws.com/Prod/" //http://localhost:5000/
      
    }
  },
  
  mounted() {
    this.init()
  },
        
  methods: {
    init() {

          this.loadAccounts();
          this.loadTransactions();
    },

    loadTransactions() {
          axios.get(this.baseUrl + "api/transactions").then(result => {
                this.items = result.data;
            }, error => {
                console.error(error);
            });
        
    },

    loadAccounts() {
          axios.get(this.baseUrl + "api/accounts").then(result => {
                this.accounts = result.data;
                if(this.accounts.length){
                  this.input.accountId = this.accounts[0].id;
                }

            }, error => {
                console.error(error);
            });
    },

    createTransaction() {
               
                axios({ method: "POST", "url": this.baseUrl + "api/transactions", "data": this.input, "headers": { "content-type": "application/json" } }).then(result => {
                    this.response = result.data;
                    if(this.response) {
                      this.items.push(this.response);
                    } 
                    
                }, error => {
                    console.error(error);
                });
                
    },

    deleteTransaction(id) {
      axios({ method: "DELETE", "url": this.baseUrl + "api/transactions/"+id }).then(result => {
                  var transaction =  this.items.find(t=>t.id == id);
                  if(transaction) {
                    this.items.splice(  this.items.indexOf(transaction), 1 );
                  }                    
                }, error => {
                    console.error(error);
                });
    }, 

    getAccount(id) {
       var account = this.accounts.find(a=>a.id = id);
       if(account) {
          return account.name;
       }
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
