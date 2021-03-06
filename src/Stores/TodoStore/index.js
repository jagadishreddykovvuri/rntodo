import { observable, action, computed } from "mobx";
import { filterValues } from "../../constant.js";
import TodoModel from "../TodoModel";
import i18n from "../../I18n";
import { persist } from "mobx-persist";

class TodoStore {
  @observable todos = [];
  @persist @observable language;
  @observable showTodos = false;
  @observable todoFilter = filterValues.all;
  @observable isLoading = true;
  constructor() {
    this.todos = [];
  }
  @action.bound changeLanguage(value) {
    this.language = value;
  }
  @action.bound getTodos() {
    if (this.todos.length === 0) {
      fetch("https://api.myjson.com/bins/nhomr")
        .then(response => response.json())
        .then(responseJson => {
          responseJson.map(item => {
            const todoModel = new TodoModel();
            todoModel.setConstructor(item.description, item.completed);
            this.todos.push(todoModel);
            this.isLoading = false;
          });
        })
        .catch(e => {
          this.isLoading = false;
        });
    }
  }

  @action.bound addTodo(description) {
    const todoModel = new TodoModel();
    todoModel.setConstructor(description, false);
    this.todos.push(todoModel);
  }
  @action.bound deleteTodo(todoObject) {
    this.todos.remove(todoObject);
    console.log(this.todos);
  }
  @action.bound changeFilter(filterValue) {
    this.todoFilter = filterValue;
  }
  @action.bound changeshowTodos() {
    this.showTodos = !this.showTodos;
  }
  @computed get filteredTodos() {
    if (this.todoFilter === filterValues.completed) {
      return this.todos.filter(todo => todo.status === true);
    } else if (this.todoFilter === filterValues.active) {
      return this.todos.filter(todo => todo.status === false);
    } else {
      return this.todos;
    }
  }
  @action.bound clearCompleted() {
    this.todos = this.todos.filter(todo => todo.status === false);
  }
  @computed get undoneLeft() {
    return this.todos.filter(todo => todo.status === false).length;
  }
}

export default TodoStore;
