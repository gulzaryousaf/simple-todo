<template>
    <div class="bg-blue-500 text-white">
        <div class="w-4/6 mx-auto flex items-center justify-between">
            <div>
                <router-link class="inline-block p-3 hover:underline" to="/dashboard">Dashboard</router-link>
            </div>
            
            <div>
                <span class="inline-block p-3 cursor-pointer hover:underline" @click="userLogout">Logout</span>
            </div>
        </div>
    </div>

    <div class="container mx-auto">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Main',
    methods: {
        userLogout(){
        this.$store.dispatch('logout').then(response => {
            this.$toast.show(response)
            this.$router.push('/')
        })
        }
    },
}
</script>
