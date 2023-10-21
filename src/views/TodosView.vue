<script setup>
import { Icon } from "@iconify/vue";
import { uid } from "uid";
import { ref, computed } from "vue";
import TodoItem from "../components/TodoItem.vue";
import Edit from "../components/Edit.vue";

const todoList = ref([]);
const title = ref({});
const subtitle = ref({});

const todosCompleted = computed(() => {
  return todoList.value.every((todo) => todo.isCompleted);
});

const fetchTodoList = () => {
  const savedTodoList = JSON.parse(localStorage.getItem("todoList"));
  if (savedTodoList) {
    todoList.value = savedTodoList;
  }
};

// Fetch Todo's on page load
fetchTodoList();

const setTodoListLocalStorage = () => {
  localStorage.setItem("todoList", JSON.stringify(todoList.value));
};

const submitButtonText = "Create";

const createTodo = (todo, color, buttonText, titleTextColor) => {
  todoList.value.push({
    id: uid(),
    todo,
    isCompleted: false,
    isEditing: null,
    color,
    submitButtonText: buttonText,
    titleTextColor,
    subtitleTextColor: '', // Missing from your provided code
  });
  setTodoListLocalStorage();
};

const toggleEditTitle = (todoPos) => {
  todoList.value[todoPos].isEditing = !todoList.value[todoPos].isEditing;
  setTodoListLocalStorage();
};

const toggleEditSubtitle = (todoPos) => {
  todoList.value[todoPos].isEditing = !todoList.value[todoPos].isEditing;
  setTodoListLocalStorage();
};

const toggleEditTodo = (todoPos) => {
  todoList.value[todoPos].isEditing = !todoList.value[todoPos].isEditing;
  setTodoListLocalStorage();
};

const updateTodo = (todoVal, todoPos) => {
  todoList.value[todoPos].todo = todoVal;
  setTodoListLocalStorage();
};

const toggleTodoComplete = (todoPos) => {
  todoList.value[todoPos].isCompleted = !todoList.value[todoPos].isCompleted;
  setTodoListLocalStorage();
};

const createSubmitButton = (newButtonLabel) => {
  // Handle the creation of the Submit button
  // You need to implement this function
};

const deleteTodo = (todo) => {
  todoList.value = todoList.value.filter(
    (todoFilter) => todoFilter.id !== todo.id
  );
  setTodoListLocalStorage();
};

const updateTitle = (newTitle, todoPos) => {
  todoList.value[todoPos].title = newTitle;
  setTodoListLocalStorage();
};

const updateSubtitle = (newSubtitle, todoPos) => {
  todoList.value[todoPos].subtitle = newSubtitle;
  setTodoListLocalStorage();
};

const titleTextColor = computed(() => todoList.value[0]?.titleTextColor);

const updateTitleTextColor = (value) => {
  if (todoList.value[0]) {
    todoList.value[0].titleTextColor = value;
    setTodoListLocalStorage();
  }
};
</script>

<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="title-sidebar">
            <Edit
              v-if="todoList.length > 0"
              :todo="todoList[0]"
              :index="0"
              :titleTextColor="titleTextColor"
              @edit-todo="toggleEditTodo"
              @update-todo="updateTodo"
              @update-title="updateTitle"
              @edit-title="toggleEditTitle"
              @edit-subtitle="toggleEditSubtitle"
              @update-subtitle="updateSubtitle"
              @update-title-text-color="updateTitleTextColor"
            />
          </div>
        </div>
        <div class="col-md-9">
          <ul class="todo-list">
            <TodoItem
              v-if="todoList.length > 0"
              :todo="todoList[0]"
              :buttonText="todoList[0].submitButtonText"
              :buttonLabel="todoList[0].submitButtonLabel"
              @edit-todo="toggleEditTodo"
              @update-todo="updateTodo"
              @delete-todo="deleteTodo"
              @create-submit-button="createSubmitButton"
              @update-selected-color="updateSelectedColor"
              @edit-title="toggleEditTitle"
              @edit-subtitle="toggleEditSubtitle"
              @update-title="updateTitle"
              @update-subtitle="updateSubtitle"
              @update-title-text-color="updateTitleTextColor"
              @save-form-data="saveTodoData"
            />
          </ul>
        </div>
      </div>
    </div>
    <p v-if="todosCompleted && todoList.length > 0" class="todos-msg">
      <Icon icon="noto-v1:party-popper" />
      <span>You have completed all your todos!</span>
    </p>
  </main>
</template>

<style scoped lang="scss">
@import 'bootstrap/dist/css/bootstrap.css';

.main {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 16px;
}

.title-sidebar {
  list-style: none;
  margin-top: 24px;
  padding-right: 50px;
  justify-content: flex-start;
}

.todo-list {
  display: flex;
  flex-direction: column;
  list-style: none;
  margin-top: 24px;
  padding-left: 100px;
  gap: 20px;
}

.todos-msg {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}
</style>
