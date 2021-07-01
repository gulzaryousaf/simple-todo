export default {
    namespaced: true,
    state: () => ({
        user: {
            id: ''
        },
        users: [],
        search: {}
    }),
    mutations: {
        setSearch(state, search) {
            state.search = search
        },
        setUser(state, user) {
            state.user = user
        }
    },
    actions: {
            getUser({state, commit}, id) {
            const user = state.users.results.find(user => user.id === id);
            commit('setUser', user)
        }
    },
    getters: {}
}
