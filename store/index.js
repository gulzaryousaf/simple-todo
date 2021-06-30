import Vue from 'vue'
import Vuex from 'vuex'
import applications from "./modules/applications";
import users from "./modules/users";
import groups from "./modules/groups";
import apiService from "../service/apiService";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        applications,
        users,
        groups
    },
    state: {
        user: {}
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        async login({commit}, credentials) {
            const user = (await apiService.post('/auth/login', credentials)).data;
            localStorage.setItem('token', user.tokens.access);
            commit('setUser', user)
        }
    },
})

export default store
