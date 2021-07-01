import {createStore} from 'vuex'
// import users from "./modules/users";

const store = createStore({
    strict: true,
    modules: {
        // users,
    },
    state: {
        isLogged: false,
        cred: {
            email: '',
            password: ''
          },
        dummyUser: {email: 'g.arts@live.com', password: '123456',  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ'}
    },
    mutations: {
        setAuth(state, loggedData){
            localStorage.setItem('user', JSON.stringify(loggedData))
            state.isLogged = true;
        },
        checkAuth(state, userData){
            if(!state.isLogged){
                let loggedUser = userData;

                if(loggedUser){
                    loggedUser = JSON.parse(loggedUser);
                    if(loggedUser.email === state.dummyUser.email && loggedUser.token === state.dummyUser.token){
                        state.isLogged = true
                    }else{
                        state.isLogged = false
                    }
                }
            }
        },

        updateUserCred(state, userData){
            if(typeof userData == 'string'){
                let user = JSON.parse(userData)
                state.cred[user.name] = user.value
            }else{
                state.cred = userData;
            }
        },
        
        logoutUser(state, message){
            localStorage.clear();
            state.isLogged = false;
            state.cred = {
                email: '',
                password: ''
            }
            alert(message)
        }
    },
    actions: {
        async login({commit}, credentials) {
            let dummyUser= this.state.dummyUser;
            if(credentials.email === dummyUser.email && credentials.password === dummyUser.password){
                let loggedData = {email:dummyUser.email, token: dummyUser.token}
                commit('setAuth', loggedData);
                alert("Logged in")
            }else{
                alert("You email or passowrd is wrong!")
            }
        },
        
        async logout({commit}) {
            commit('logoutUser', "User logged out!")
            commit('updateUserCred', {email: '', password: ''})
        },

        async checkUser( {commit}, userData){
            commit('checkAuth', userData)            
        }
    },
})

export default store
