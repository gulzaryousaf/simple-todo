<template>
    <div class="mx-auto bg-gray-200 w-full p-8 mt-20 rounded-lg shadow-lg" style="max-width: 500px">
        <div class="text-center text-2xl font-semibold">View / Update</div>
        <div class="mt-5 w-full">
          <label> Title
          <input class="w-full mt-1 p-3 rounded-md border border-gray-400" @input="updateCurrentTodo" type="text" autocomplete="title" placeholder="Title" name="title" />
          </label>
        </div>
        <div class="mt-3 w-full">
          <label> Description
          <textarea rows="4" @input="updateCurrentTodo" class="w-full mt-1 p-3 rounded-md border border-gray-400" autocomplete="description" placeholder="Description" name="description"></textarea>
          </label>
        </div>
        <div class="mt-5 w-full text-center"><button @click="saveTodo" class="px-4 rounded-sm py-2 bg-blue-200 hover:bg-blue-300">Add</button></div>
    </div>
</template>
<script>
 export default {
    name: 'addtodo',
    data() {
      return {
        newTodo: {
            id: this.$store.state.todos.tasks[this.$store.state.todos.tasks.length - 1].id + 1,
            title: '',
            description: ''
        }
      }
    },
    methods: {
      updateCurrentTodo(e){
        this.newTodo[e.target.name] = e.target.value;
      },

      saveTodo(){
        this.$store.dispatch('todos/addTodo', this.newTodo).then(resp => {
          if(resp){
            this.$toast.success(resp);
            this.$router.push('/dashboard')
          }
        })
      }
    }
  }
</script>

<style scoped>
textarea{
  resize: none;
}
</style>