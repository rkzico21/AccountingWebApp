<template>
  <div class="hello">
    
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
                <b-button-group>
                  <b-dropdown right split text="Add Transaction">
                   <b-dropdown-item @click="modalShow = !modalShow" v-if="modalShow">Add Income/Expense</b-dropdown-item>
                   <b-dropdown-item @click="modalShowJournal = !modalShowJournal">Add Journal</b-dropdown-item>
                 </b-dropdown>
                </b-button-group>
               <!-- Modal Component -->
             <!-- <b-modal v-model="modalShow" id="modal1" title="Transaction Details" ok-title="Save" @ok="createTransaction(false)">
                  <b-form-input type="text" v-model="input.description" placeholder="Description" required />
                  <b-form-select  :options="accounts"  value-field="id" v-model="input.accountId" text-field="name"	 
                          placeholder="Account" required>
                  </b-form-select>
                  <b-form-input type="date" v-model="input.transactionDate" placeholder="Date" />
                  <b-form-select  :options="transactionTypes"  value-field="id" v-model="input.transactionTypeId" text-field="name"	 
                          placeholder="Deposit or Withdrawal" required>
                  </b-form-select>
                  <b-form-input type="amount" v-model="input.amount" placeholder="Total amount" />
              </b-modal> -->
              <b-modal v-model="modalShowJournal" id="modal2" title="Transaction Details" ok-only="true">
                  <b-form @submit.prevent="createTransaction(true)">
                  <b-form-input type="text" v-model="journal.description" placeholder="Description" required />
                  <b-form-row>
                    <b-col sm="6">
                  <b-form-input type="date" v-model="journal.transactionDate" placeholder="Date" />
                    </b-col>
                  <b-col sm="5"><b-form-text>Amount:</b-form-text> 
                  <b-form-text><b>{{amount}}</b></b-form-text>
                  </b-col>
                  </b-form-row>
                  <b-list-group>
                   <b-list-group-item v-for="credit in journal.credits" :key="'credit'+credit.creditId">
                     <b-form-select  :options="accounts"  v-model="credit.accountId" 	 
                          placeholder="Account" required v-on:change="signalDropdwonChange">
                         
                     </b-form-select>
                     <b-form-input type="number" v-model="credit.amount" placeholder="Credit amount" v-on:change="signalChange"/>
                     <a href="#" @click="removeCredit(credit.creditId)">Remove Credit</a> 
                   </b-list-group-item>
                  </b-list-group>
                  <a href="#" @click="addCredit()">Add Credit</a>
                  <b-list-group>
                   <b-list-group-item v-for="debit in journal.debits" :key="'debit'+debit.debitId">
                     <b-form-select  :options="accounts"  v-model="debit.accountId" 
                          placeholder="Account" required v-on:change="signalDropdwonChange">
                           
                     </b-form-select>
                     <b-form-input type="number" v-model="debit.amount" placeholder="Debit amount" v-on:change="signalChange"/>
                     <a href="#" @click="removeDebit(debit.debitId)">Remove Debit</a> 
                   </b-list-group-item>
                  </b-list-group>
                  <a href="#" @click="addDebit()">Add Debit</a>
                  <b-form-row class="my-1">
                      <b-button type="submit" variant="primary" size="sm">Save</b-button>
                      <b-button variant="secondary" size="sm" @click="closeModal()">Cancel</b-button>
         
                  </b-form-row>
                  </b-form>
                   <div slot="modal-footer" class="w-100">
                    <!-- To disable cancel and ok button > -->     
                   </div>
              </b-modal>
            </div>
          </div>
     </div>
   
</template>

<script>

export default {
  name: 'Transactions',
  data () {
    return {
      msg: 'Transactions',
      response : "",
      items: [],
      transactionTypes: [
        { id: 1, name:"Deposit"},
        { id: 2, name:"Withdrawal"},
        
      ],
      amount:"0.00",
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
      
     journal: {
                id:-1,
                description:"",
                transactionDate:new Date().toISOString().slice(0,10),                
                transactionTypeId: 3,
                amount: 0.00,
                debits: [
                  {
                    debitId: this.$uuid.v4(),
                    accountId: null,
                    amount: 0,
                    transactionType: "debit"
                  }],
                credits:[
                  {
                    creditId: this.$uuid.v4(),
                    accountId: null,
                    amount: 0,
                    transactionType: "credit"
                  }
                ]},

      modalShow: false,

      modalShowJournal: false
      
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

    closeModal() {
      this.modalShowJournal = false;
    },

    loadTransactions() {
          this.$http.get("transactions").then(result => {
                this.items = result.data;
            }, error => {
                console.error(error);
            });
        
    },

    loadAccounts() {
          this.$http.get("accounts").then(result => {
                
                this.accounts = [];
                if(result.data.length > 0) {
                
                for(var i = 0; i< result.data.length; i++)
                {
                      this.accounts.push({"value": result.data[i].id, text: result.data[i].name})
                }
                }

                console.log(this.accounts[0]);
            }, error => {
                console.error(error);
            });
        
    },

    createTransaction(journal) {
               var data = this.input;

               if(journal) {
                 data = this.journal;
               }
                console.log(data);
                this.$http({ method: "POST", "url": "transactions", "data": data, "headers": { "content-type": "application/json" } }).then(result => {
                    this.response = result.data;
                    if(this.response) {
                      this.items.push(this.response);
                      
                      this.journal.credits = [];
                      this.journal.debits = [];
                      this.addCredit();
                      this.addDebit();
                      this.journal.description = "";
                      this.journal.amount = "0.00";
                      this.modalShowJournal = false;
                    } 
                    
                }, error => {
                    console.error(error);
                    this.modalShowJournal = journal;
                });
                
    },

    deleteTransaction(id) {
      this.$http({ method: "DELETE", "url": "transactions/"+id }).then(result => {
                  var transaction =  this.items.find(t=>t.id == id);
                  if(transaction) {
                    this.items.splice(  this.items.indexOf(transaction), 1 );
                  }                    
                }, error => {
                    console.error(error);
                });
    }, 

    addCredit() {
        this.journal.credits.push({creditId: this.$uuid.v4(), accountId:this.input.accountId, amount:0, transactionType:"credit" });
    },

    addDebit() {
        this.journal.debits.push({debitId: this.$uuid.v4(), accountId:this.input.accountId, amount:0, transactionType:"debit" });
    },

    removeCredit(id) {
      
        if(this.journal.credits.length <=1)
           return; 

        var credit =  this.journal.credits.find(t=>t.creditId == id);
        console.log(credit);
                  if(credit) {
                    this.journal.credits.splice(  this.journal.credits.indexOf(credit), 1 );
                    this.calculateAmount();
                  }
    },

    removeDebit(id) {
      if(this.journal.debits.length <=1)
           return;
       var debit =  this.journal.debits.find(t=>t.debitId == id);
                  if(debit) {
                    this.journal.debits.splice(  this.journal.debits.indexOf(debit), 1 );
                    this.calculateAmount();
                  } 
    },

    getAccount(id) {
       var account = this.accounts.find(a=>a.id = id);
       if(account) {
          return account.name;
       }
    },

    signalChange: function(evt){
        this.calculateAmount();
    },

    signalDropdwonChange: function(evt){
        console.log("Changing");
    },

    //Todo: make it standard
    calculateAmount() {
        var creditAmount = 0.00;
        for(var i =0; i< this.journal.credits.length; i++)
        {
            creditAmount += parseFloat(this.journal.credits[i].amount);
        }

        console.log(creditAmount);

        var debitAmount = 0.00;
        for(var i =0; i< this.journal.debits.length; i++)
        {
            debitAmount += parseFloat(this.journal.debits[i].amount);
        }

        if(creditAmount == debitAmount)
        {
            this.amount = creditAmount;
        }
        else
        {
           this.amount = "Unbalanced"
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
