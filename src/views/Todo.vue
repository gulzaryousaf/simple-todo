<template>
    <div class="mx-auto bg-gray-200 w-full p-8 mt-20 rounded-lg shadow-lg" style="max-width: 500px">
        <div class="text-center text-2xl font-semibold">View / Update</div>
        <div class="mt-5 w-full">
          <label> Title
          <input class="w-full mt-1 p-3 rounded-md border border-gray-400" @input="updateCurrentTodo" :value="currentTodo.title" type="text" autocomplete="title" placeholder="Title" name="title" />
          </label>
        </div>
        <div class="mt-3 w-full">
          <label> Description
          <textarea rows="4" :value="currentTodo.description" @input="updateCurrentTodo" class="w-full mt-1 p-3 rounded-md border border-gray-400" autocomplete="description" placeholder="Description" name="description"></textarea>
          </label>
        </div>
        <div class="mt-5 w-full text-center"><button @click="saveTodo" class="px-4 rounded-sm py-2 bg-blue-200 hover:bg-blue-300">Update</button></div>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
 export default {
    name: 'todo',
    data() {
      return {
        allTodos: this.$store.state.todos.tasks,
        todoId: this.$route.params.id,
        updatedTodo: {}
      }
    },
    mounted(){
        this.updatedTodo = JSON.parse(JSON.stringify(this.currentTodo))
    },
    computed: {
      currentTodo: {
        get: function(){
          return this.allTodos.filter(todo => todo.id == this.todoId)[0]
        }
      }
    },
    methods: {
      ...mapActions('todos', {updateTodo: 'updateTodo'}),
      
      updateCurrentTodo(e){
        this.updatedTodo[e.target.name] = e.target.value;
      },

      saveTodo(){
        this.updateTodo(this.updatedTodo).then(resp => {
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