<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-4">
        <h3 class="text-center">Identifiez-vous à l'aide de votre compte Paris Connect</h3>
        <form @submit="login(user)">
          <div class="form-group" ng-class="{ 'has-error': loginForm.email.$dirty && loginForm.email.$invalid }">
            <label for="login-email" class="sr-only">Email</label>
            <input type="email" class="form-control" id="login-email" name="email" ng-model="credentials.email"
                   placeholder="Votre adresse email" v-model="user.email" required autofocus>
          </div>
          <div class="form-group" ng-class="{ 'has-error': loginForm.pwd.$dirty && loginForm.pwd.$invalid }">
            <label for="login-password" class="sr-only">Mot de passe</label>
            <input type="password" class="form-control" id="login-password" name="pwd" ng-model="credentials.pwd"
                   placeholder="Votre mot de passe" v-model="user.pwd" required>
          </div>
          <button type="button" class="float-right btn btn-link" @click="forgotPwd()"><em>mot de passe perdu ?</em></button>

          <p class="help-block" ng-show="!!errorMsgLogin"><span class="text-danger">{{errorMsgLogin}}</span></p>
          <button type="submit" class="btn btn-lg btn-primary btn-block" ng-disabled="loginForm.$invalid" @click="login(user)">M'identifier</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import 'vue-awesome/icons'
  import Icon from 'vue-awesome/components/Icon'
  import Vue from 'vue'

  // import ClickConfirm from 'click-confirm'

  const data = { 
    user: {
      email: '',
      pwd: ''
    },
    errorMsgLogin: ''
  }
  export default {
    data:function() {
      return data
    },
    computed: mapGetters({
    }),
    methods: mapActions([
      'login', 'isAuthenticated', 'forgotPwd'
    ]),
    created () {
      //this.$store.dispatch('isAuthenticated')
    },
    components: {
      Icon
    }
  }

</script>