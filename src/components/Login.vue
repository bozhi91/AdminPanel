<template>

  <div class="container">
    <!-- Modal -->
    <div id="myModal" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="form-signin-heading"><center>Please sign in</center></h4>
          </div>
          <div class="modal-body">
            <form class="form-signin">
              <label class="sr-only" for="inputEmail">Email address</label>
              <input v-model=username id="inputEmail" class="form-control" type="email" autofocus="" required="" placeholder="Email address">
              <label class="sr-only" for="inputPassword">Password</label>
              <input v-model=pass id="inputPassword" class="form-control" type="password" required="" placeholder="Password">
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-lg btn-primary btn-block" @click="login">Sign in</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End of login template -->

  <div v-if="error === 401">
  </div>

</template>

<script>
  import store from '../services/Store.js'
  import addCountry from './addCountry.vue'

  const userService = store.userService
  export default {
    data () {
      return {
        country: addCountry,
        error: null,
        logged: false,
        username: 'info@papayapods.com',
        pass: 'XQZa52WynGJHCZ7T'
      }
    },
    methods: {
      login () {
        // do some validatio
        this.fetchData(this.username, this.pass)
      },
      fetchData (user, password) {
        this.error = this.logged = null
        this.loading = true
        console.log('username: ' + user.toString)
        let loginPromise = userService.login('info@papayapods.com', 'XQZa52WynGJHCZ7T')
        loginPromise.then(email => {
          console.log('Logged in!', email)
          this.logged = true
          this.$route._router.go('/country')
        }).catch(err => {
          console.log('Error here!', err.status)
          this.error = err.status
          this.logged = false
        })
      }
    },
    created () {
    },
    watch: {
      // call again the method if the route changes
      '$route': 'fetchData'
    }
  }
</script>
