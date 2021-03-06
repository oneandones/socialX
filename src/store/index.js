import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import qs from "qs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isAuthenticated: false,
    username: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isAuthenticated = true;
    },
    LOGOUT(state) {
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  actions: {
    login({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            "/users/authenticate",
            qs.stringify({ email: data.email, password: data.password }),
            {
              headers: {
                "Access-Control-Allow-Origin": "*"
              }
            }
          )
          .then(function (result) {
            commit("SET_USER", result.data.data);
            resolve(result);
          }).catch(
          function (err) {
            reject({error: err, message: "Invalid details"});
          }
          );
      })

    },
    register({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            "/users/register",
            qs.stringify({
              name: data.name,
              email: data.email,
              username: data.username,
              password: data.password
            })
          )
          .then(function (res) {
            resolve(res)
          })
          .catch(err => {
            reject({error: err, message: "Username not available"})
          });
      })
    }
  },
  modules: {}
});
