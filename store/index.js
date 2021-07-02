import {createStore} from 'vuex'
// import users from "./modules/users";

const store = createStore({
    strict: true,
    modules: {
        // users,
    },
    state: {
        isAuthenticated: false,
        cred: {
            email: '',
            password: ''
          },
        dummyUser: {email: 'g.arts@live.com', password: '123456',  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ'}
    },
    mutations: {
        setAuth(state, loggedData){
            localStorage.setItem('user', JSON.stringify(loggedData))
            state.isAuthenticated = true;
        },
        userAuth(state, userData){
            let loggedUser = userData;

            if(loggedUser){
                loggedUser = JSON.parse(loggedUser);
                if(loggedUser.email === state.dummyUser.email && loggedUser.token === state.dummyUser.token){
                    state.isAuthenticated = true;
                }else{
                    state.isAuthenticated = false;
                }
            }

            return state.isAuthenticated;
        },

        setUserCred(state, userData){
            if(typeof userData == 'string'){
                let user = JSON.parse(userData)
                state.cred[user.name] = user.value
            }else{
                state.cred = userData;
            }
        },
        
        logoutUser(state){
            localStorage.clear();
            state.isAuthenticated = false;
            state.cred = {
                email: '',
                password: ''
            }
        }
    },
    actions: {
        login({commit}, credentials) {
            return new Promise((resolve, reject) => {
                let dummyUser= this.state.dummyUser;
                if(credentials.email === dummyUser.email && credentials.password === dummyUser.password){
                    let loggedData = {email:dummyUser.email, token: dummyUser.token}
                    commit('setAuth', loggedData);
                    resolve("Logged in successfully!")
                }else{
                    reject("Please fill the Email and Password correctly!")
                }
            })
        },
        
        logout({commit}) {
            return new Promise(resolve =>{
                commit('logoutUser')
                // commit('setUserCred', {email: '', password: ''})
                resolve("User logged out!")
            })
        },

        checkAuth({commit}, userData){
            commit('userAuth', userData)
            return this.state.isAuthenticated
        }
    },
})

export default store
