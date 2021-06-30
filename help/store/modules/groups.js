import apiService from "../../service/apiService";

export default {
    namespaced: true,
    state: () => ({
        group: {},
        search: {},
        groups: {
            loading: false,
            results: []
        },
        users: {
            loading: false,
            results: []
        },
        applications: {
            loading: false,
            results: []
        },
        directories: {
            loading: false,
            results: []
        },
        rules: {
            loading: false,
            results: []
        }
    }),
    mutations: {
        setGroups(state, groups) {
            state.groups = groups
        },
        setGroup(state, group) {
            state.group = group;
        },
        setUsers(state, users) {
            state.users = users
        },
        setApplications(state, applications) {
            state.applications = applications
        },
        setSearch(state, search) {
            state.search = search
        },
        setLoading(state, {field, loading = false}) {
            state[field].loading = loading
        },
    },
    actions: {
        async getGroups({commit}, {page = 1, page_size = 20, search = {}}) {
            //TODO update api url according to search
            console.log(search)
            commit('setLoading', {field: 'groups', loading: true})
            const groups = (await apiService.get(`/group/get-group-dashboard-data?page=${page}&page_size=${page_size}`)).data;
            commit('setGroups', groups)
            commit('setLoading', {field: 'groups'})
        },
        async getGroup({commit, state}, id) {
            const group = state.groups.results.find(group => group.id === id);
            commit('setGroup', group)
        },
        async saveGroup({dispatch}, data) {
            await apiService.post(`/group/create-group/`, data);
            dispatch('getGroups');
        },
        async getUsers({commit}, {id, page = 1, page_size = 20}) {
            commit('setLoading', {field: 'users', loading: true})
            let users = (await apiService.get(`/group/get-all-users-by-group-id/${id}?page=${page}&page_size=${page_size}`)).data
            commit('setUsers', users)
            commit('setLoading', {field: 'users'})
        },
        async getApplications({commit}, {id, page = 1, page_size = 20}) {
            commit('setLoading', {field: 'applications', loading: true})
            let applications = (await apiService.get(`/group/get-all-apps-by-group-id/${id}?page=${page}&page_size=${page_size}`)).data
            commit('setApplications', applications)
            // commit('setLoading', {field: 'applications'})
        }
    },
    getters: {}
}
