import apiService from "../../service/apiService";

export default {
    namespaced: true,
    state: () => ({
        search: {},
        applications: [],
        application: {},
        users: {
            loading: false,
            results: []
        },
        roles: {
            loading: false,
            results: []
        },
        permissions: {
            loading: false,
            results: []
        },
        groups: {
            loading: false,
            results: []
        }
    }),
    mutations: {
        setApplications(state, applications) {
            state.applications = applications
        },
        setApplicationUsers(state, users) {
            state.users = users
        },
        setApplication(state, application) {
            state.application = {...application}
        },
        setRoles(state, roles) {
            state.roles = roles
        },
        setPermissions(state, permissions) {
            state.permissions = {...permissions}
        },
        setGroups(state, groups) {
            state.groups = {...groups}
        },
        setSearch(state, search) {
            state.search = search
        },
        setLoading(state, {field, loading = false}) {
            state[field].loading = loading
        }
    },
    actions: {
        async getApplications({commit}, {page = 1, page_size = 20, search = '', app_type = ''}) {
            commit('setLoading', {field: 'applications', loading: true})
            const applications = (await apiService.get(`apps/get-all-applications?page=${page}&page_size=${page_size}&search=${search}&app_type=${app_type}`)).data;
            commit('setApplications', applications)
            commit('setLoading', {field: 'applications'})
        },
        async getApplicationUsers({commit, state}, {id, page_size = 20, page = 1, search = state.search}) {
            commit('setLoading', {field: 'users', loading: true})
            const applicationUsers = (await apiService.post(`apps/get-all-users-from-application/${id}?page=${page}&page_size=${page_size}`, {...search})).data
            commit('setLoading', {field: 'users'})
            commit('setApplicationUsers', applicationUsers)
        },
        async getApplication({commit, state}, id) {
            let application = state.applications.results.find(application => application.id === Number(id));
            if (!application) {
                application = {
                    id
                }
            }
            commit('setApplication', application);
        },
        async getRoles({commit}, {id, page = 1, page_size = 20}) {
            commit('setLoading', {field: 'roles', loading: true})
            const roles = (await apiService.get(`apps/get-all-roles-from-application/${id}?page=${page}&page_size=${page_size}`)).data
            commit('setLoading', {field: 'roles'})
            commit('setRoles', roles)
        },
        async getPermissions({commit}, {id, page = 1, page_size = 20}) {
            commit('setLoading', {field: 'permissions', loading: true})
            const permissions = (await apiService.get(`apps/get-all-permissions-from-application/${id}?page=${page}&page_size=${page_size}`)).data
            commit('setLoading', {field: 'roles'})
            commit('setPermissions', permissions)
        },
        async getGroups({commit}, {application_id, page = 1, page_size = 20}) {
            commit('setLoading', {field: 'groups', loading: true});
            // TODO change api groups api url
            const groups = (await apiService.get(`groups/${application_id}?page=${page}&page_size=${page_size}`));
            commit('setGroups', groups);
            commit('setLoading', {field: 'groups'})
        },
        async saveRole({dispatch, state}, role) {
            await apiService.post(`/apps/create-role`, role);
            dispatch('getRoles', {id: state.application.id})
        },
        async savePermission({dispatch, state}, permission) {
            await apiService.post('/apps/create-permission', permission)
            dispatch('getPermissions', {id: state.application.id})
        }
    },
    getters: {}
}
