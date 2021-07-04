<template>
  <Main>
    <div class="home">
      <h1 class="text-center text-3xl font-semibold text-gray-600 mt-10" @click="loadMore">Todo Listing</h1>

      <div class="w-4/6 mx-auto mt-10">
        <div class="flex items-center justify-between">
          <router-link to="/addtodo" type="button" class="px-4 rounded-sm py-2 bg-blue-600 text-white hover:bg-blue-700">Add new</router-link>
          <input v-model="search" class="border py-2 px-3 w-96 border-gray-200" placeholder="Search">
        </div>

        <table class="table w-full mx-auto text-left mt-5">
          <thead class="text-gray-600">
            <tr>
              <th class="p-3 border border-gray-200 bg-purple-200">ID</th>
              <th class="p-3 border border-gray-200 bg-purple-200">Title</th>
              <th class="p-3 border border-gray-200 bg-purple-200">Description</th>
              <th class="p-3 border border-gray-200 bg-purple-200">Actions</th>
            </tr>
          </thead>

          <tbody class="text-gray-500">
            <tr v-for="todo in matchedTodos" :key="todo.id">
              <td class="p-3 border border-gray-200">{{todo.id}}</td>
              <td class="p-3 border border-gray-200">{{todo.title}}</td>
              <td class="p-3 border border-gray-200">{{todo.description}}</td>
              <td class="p-3 border border-gray-200">
                <div class="flex items-center">
                  <router-link :to="'/todo/'+todo.id"><EyeIcon class="h-5 w-5 text-blue-500"/></router-link>
                  <span @click="deleteTodo" :data-id="todo.id" class="inline-block cursor-pointer"><TrashIcon class="h-5 w-5 ml-2 text-red-500"/></span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Main>
</template>

<script>
import Main from '../components/Main';
import {mapActions} from 'vuex'
import { EyeIcon, TrashIcon } from '@heroicons/vue/outline'

export default {
  name: 'dashboard',
  components: {
    Main,
    EyeIcon,
    TrashIcon
  },
  data(){
    return{
      allTodos: this.$store.state.todos.tasks,
      loadedTodos: [],
      search: '',
      itemsLength: 0
    }
  },
  computed: {
    matchedTodos: {
      get: function () {
        return this.loadedTodos.filter(todo => todo.title.toLowerCase().includes(this.search.toLowerCase()))
      },
      set: function (newTodos) {
        this.loadedTodos = newTodos
      }
    }
  },
  methods: {
    ...mapActions('todos', {removeTodo: 'removeTodo'}),
    loadMore: function () {
      this.itemsLength += 20;
      let startItems = this.itemsLength - 20;
      
      if(this.loadedTodos.length >= this.allTodos.length){
        return false
      }else{
        let allTodos = JSON.parse(JSON.stringify(this.allTodos));
        let loaditems = allTodos.slice(startItems, this.itemsLength);
        this.matchedTodos = this.matchedTodos.concat(loaditems);
      }
    },

    callLoadMore: function(){
      let scrollHeight = window.scrollY + window.innerHeight;
      let docHeight = document.body.clientHeight;
      if(scrollHeight >= docHeight && !(this.loadedTodos.length >= this.allTodos.length)){
        this.loadMore();
        this.$toast.show("Items loaded")
      }
    },

    deleteTodo: function (e) {
      if(confirm("Are you sure you want to delete it?")){
        let todoID = Number(e.currentTarget.dataset.id);
        this.removeTodo(todoID).then(resp => {
            if(resp){
              this.$toast.info(resp.msg);
              let data = JSON.parse(JSON.stringify(resp.data));
              this.allTodos = data;
  
              let loadedData = JSON.parse(JSON.stringify(data));
              loadedData.length = this.loadedTodos.length;
              this.matchedTodos = loadedData;
            }
          })
      }
    },
  },
  beforeMount(){
    this.loadMore();
  },
  mounted(){
    window.addEventListener("scroll", this.callLoadMore, true)
  },
  beforeUnmount(){
    window.removeEventListener("scroll", this.callLoadMore, true)
  }
}
</script>
