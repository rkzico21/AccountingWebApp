<template>
  <div id="app">
    <b-container>
    
    <div>
  <b-navbar type="dark" variant="primary" toggleable v-if="authenticated">
    <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_dropdown_collapse">
      <b-navbar-nav>
        <b-nav-item  to="/">Home</b-nav-item>
        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="Accounting" right>
          <b-dropdown-item to="/Transactions">Transactions</b-dropdown-item>
          <b-dropdown-item to="/Accounts">Chart of Accounts</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item href="#">Account</b-dropdown-item>
          <b-dropdown-item href="#">Settings</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item  @click="logout()">Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
    <router-view/>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: { 
    authenticated: function () {
      // `this` points to the vm instance
      return this.$store.getters.isLoggedIn
    }
   
  },
  methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/Login')
        })
      }
    },
   created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout)
        }
        throw err;
      });
    });
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
