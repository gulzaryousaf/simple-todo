<template>
    <div class="text-center container mx-auto mt-10">
        <h1 class="text=center text-3xl">
            Welcome
        </h1>

        <div class="inline-grid grid-cols-2 gap-5 mt-10">
            <div>
                <router-link class="inline-block rounded-sm bg-blue-400 text-white px-4 py-2" to="/login">Login</router-link> 
            </div>
            <div>
                <router-link class="inline-block rounded-sm bg-blue-400 text-white px-4 py-2" to="/register">Register</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'welcome',
}
</script>
