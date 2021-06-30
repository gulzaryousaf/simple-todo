import apiService from "../../service/apiService";

export default {
    namespaced: true,
    state: () => ({
        user: {
            id: ''
        },
        users: [],
        applications: [],
        roles: {
            loading: false,
            results: []
        },
        permissions: {
            loading: false,
            results: []
        },
        activities: {
            loading: false,
            results: []
        },
        approvals: {
            loading: false,
            results: []
        },
        unassignedRoles: {
            loading: false,
            results: []
        },
        unassignedPermissions: {
            loading: false,
            results: []
        },
        search: {}
    }),
    mutations: {
        setUsers(state, users) {
            state.users = users
        },
        setApplications(state, applications) {
            state.applications = applications
        },
        setRoles(state, roles) {
            state.roles = roles
        },
        setPermissions(state, permissions) {
            state.permissions = permissions
        },
        setActivities(state, activities) {
            state.activities = activities
        },
        setApprovals(state, approvals) {
            state.approvals = approvals
        },
        setLoading(state, {field, loading = false}) {
            state[field].loading = loading
        },
        setUnassignedRoles(state, roles) {
            state.unassignedRoles = roles
        },
        setUnassignedPermissions(state, permissions) {
            state.unassignedPermissions = permissions
        },
        setUserId(state, id) {
            state.user.id = id;
        },
        setSearch(state, search) {
            state.search = search
        },
        setUser(state, user) {
            state.user = user
        }
    },
    actions: {
        async getUsers({commit, state}, {page = 1, page_size = 20, search = state.search}) {
            commit('setLoading', {field: 'users', loading: true})
            const users = (await apiService.post(`user/get-all-users?page=${page}&page_size=${page_size}`, {...search})).data;
            commit('setUsers', users)
            commit('setLoading', {field: 'users'})
        },
        async getApplications({commit}, id) {
            const applications = (await apiService.get(`user/applications/${id}`)).data.apps;
            commit('setApplications', applications)
            const data = {
                results: applications
            }
            commit('applications/setApplications', data, {root: true})
        },
        async getRoles({commit}, {id, page = 1, page_size = 20}) {
            commit('setLoading', {field: 'roles', loading: true})
            const roles = (await apiService.get(`/user/application-roles/${id}?page=${page}&page_size=${page_size}`)).data;
            commit('setRoles', roles)
            commit('setLoading', {field: 'roles'})
        },
        async getPermissions({commit}, {id, page = 1, page_size = 20}) {
            const permissions = (await apiService.get(`/user/application-permissions/${id}?page=${page}&page_size=${page_size}`)).data;
            commit('setPermissions', permissions)
        },
        async getActivities({commit}, {id, page = 1, page_size = 20}) {
            const activities = (await apiService.get(`/user/application-activities/${id}?page=${page}&page_size=${page_size}`)).data;
            commit('setActivities', activities)
        },
        async getApprovals({commit}, {id, page = 1, page_size = 20}) {
            const approvals = (await apiService.get(`/user/application-approvals/${id}?page=${page}&page_size=${page_size}`)).data;
            commit('setApprovals', approvals)
        },
        async saveUser({dispatch}, user) {
            await apiService.post(`/user/create-user`, user);
            dispatch('getUsers', {})
        },
        async getUnassignedRoles({commit}, {user_id, application_id, page = 1, page_size = 10, search = ''}) {
            commit('setLoading', {field: 'unassignedRoles', loading: true})
            const unassignedRoles = (await apiService.get(`/user/${user_id}/get-unassigned-roles/${application_id}?page=${page}&page_size=${page_size}&search=${search}`)).data
            commit('setUnassignedRoles', unassignedRoles)
            commit('setLoading', {field: 'unassignedRoles'})
        },
        async getUnassignedPermissions({commit}, {user_id, application_id, page = 1, page_size = 10, search = ''}) {
            commit('setLoading', {field: 'unassignedPermissions', loading: true})
            const unassignedPermissions = (await apiService.get(`/user/${user_id}/get-unassigned-permissions/${application_id}?page=${page}&page_size=${page_size}&search=${search}`)).data
            commit('setUnassignedPermissions', unassignedPermissions)
            commit('setLoading', {field: 'unassignedPermissions'})
        },
        /**
         *
         * @param {Object} data
         * @param {number||string} data.user_id user_id
         * @param {number||string} data.app_id application_id
         * @param {Array} data.permission_ids role id's array
         */
        async assignPermissions({dispatch, state}, data) {
            await apiService.post(`/user/assign-permissions/`, data)
            dispatch('getPermissions', {id: state.user.id})
        },
        async assignRoles({dispatch, state}, data) {
            await apiService.post('/user/assign-roles/', data)
            dispatch('getRoles', {id: state.user.id})
        },
        async unAssignRoles({dispatch, state}, data) {
            await apiService.delete(`/user/un-assign-roles/`, {
                data: {...data}
            });
            dispatch('getRoles', {id: state.user.id})
        },
        async unAssignPermissions({dispatch, state}, data) {
            await apiService.delete(`/user/un-assign-permissions/`, {
                data: {...data}
            });
            dispatch('getPermissions', {id: state.user.id});
        },
        getUser({state, commit}, id) {
            const user = state.users.results.find(user => user.id === id);
            commit('setUser', user)
        }
    },
    getters: {}
}
