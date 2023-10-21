<script setup>
import { Icon } from "@iconify/vue";
import axiosInstance from "/axios-config.js";

const props = defineProps({
  todo: {
    type: Object,
    default: () => ({
      title: "Title",
      subtitle: "Subtitle",
      titleTextColor: "#000000",
      subtitleTextColor: "#000000",
      todo: "Submit",
      color: "#000000",
    }),
  },
  index: {
    type: Number,
    default: 0,
  },
});

defineEmits([
  "edit-todo",
  "update-todo",
  "toggle-complete",
  "delete-todo",
  "edit-title",
  "update-title",
  "edit-subtitle",
  "update-subtitle",
  "update-title-text-color",
]);

const saveFormData = async () => {
  // Define the data you want to save to your API endpoint
  const formData = {
  title: props.todo.title,
  subtitle: props.todo.subtitle,
  titleTextColor: props.todo.titleTextColor,
  subtitleTextColor: props.todo.subtitleTextColor,
  todo: props.todo.todo,
  color: props.todo.color,
};

  try {
    // Send a POST request to your API endpoint
    const response = await axiosInstance.post('/api/settings', formData);

    // Handle the response if needed
    console.log(response.data);
  } catch (error) {
    console.error(error);
    // Handle the error
  }
};
</script>



<template>
  <div class="title-container card mb-2">
    <div class="card-header d-flex justify-content-between align-items-center mt-0">
      <h5 class="mb-0">Edit Title</h5>
    </div>
    <div class="card-body">
      <li class="list-group-item">
        <div class="todo">
        <input
          v-if="todo.isEditing"
          type="text"
          class="form-control"
          :value="todo.title" 
          @input="$emit('update-title', $event.target.value, index)"
        />
        <span
        v-else
        :class="{
          'completed-title': todo.isCompleted,
        }"
      >
          {{ todo.title }}
        </span>
      </div>
      
      <div class="todo-actions">
        <Icon
          v-if="todo.isEditing"
          icon="ph:check-circle"
          class="icon check-icon"
          color="55aac2"
          width="22"
          @click="$emit('edit-title', index)" 
        />
        <Icon
          v-else
          icon="ph:pencil-fill"
          class="icon edit-icon"
          color="55aac2"
          width="22"
          @click="$emit('edit-title', index)" 
        />
      </div>
    </li>
  </div>
    <div class="card-body">
      <li class="list-group-item">
        <div class="color-wrap">
          <input 
          type="color" 
          v-model="todo.titleTextColor" 
          @input="$emit('update-title-text-color', $event.target.value)" />
        </div>
      </li>
    </div>
  
    <div class="card-header d-flex justify-content-between align-items-center mt-0">
      <h5 class="mb-0">Edit Subtitle</h5>
    </div>
    <div class="card-body">
      <li class="list-group-item">
      <div class="todo">
        <input
          v-if="todo.isEditing"
          type="text"
          class="form-control"
          :value="todo.subtitle" 
          @input="$emit('update-subtitle', $event.target.value, index)"
        />
        <span
        v-else
        :class="{
          'completed-subtitle': todo.isCompleted,
        }"
      >
          {{ todo.subtitle }}
        </span>
      </div>
      <div class="todo-actions">
        <Icon
          v-if="todo.isEditing"
          icon="ph:check-circle"
          class="icon check-icon"
          color="55aac2"
          width="22"
          @click="$emit('edit-subtitle', index)" 
        />
        <Icon
          v-else
          icon="ph:pencil-fill"
          class="icon edit-icon"
          color="55aac2"
          width="22"
          @click="$emit('edit-subtitle', index)" 
        />
      </div>
    </li>
  </div>
  <div class="card-body">
      <li class="list-group-item">
        <div class="color-wrap">
          <input 
          type="color" 
          v-model="todo.subtitleTextColor" 
          @input="$emit('update-subtitle-text-color', $event.target.value)" />
        </div>
      </li>
    </div>
  <div class="card-header d-flex justify-content-between align-items-center mt-0">
      <h5 class="mb-0">Submit Button</h5>
    </div>
    <div class="card-body">
      <li class="list-group-item">
    <div class="todo">
      <input
        v-if="todo.isEditing"
        type="text"
        class="form-control"
        :value="todo.todo"
        @input="$emit('update-todo', $event.target.value, index)"
      />
      <span
        v-else
        :class="{
          'completed-todo': todo.isCompleted,
        }"
      >
        {{ todo.todo }}
      </span>
    </div>
    <div class="todo-actions">
      <Icon
        v-if="todo.isEditing"
        icon="ph:check-circle"
        class="icon check-icon"
        color="55aac2"
        width="22"
        @click="$emit('edit-todo', index)"
      />
      <Icon
        v-else
        icon="ph:pencil-fill"
        class="icon edit-icon"
        color="55aac2"
        width="22"
        @click="$emit('edit-todo', index)"
      />
    </div>
  </li>
  <li>
    <div class="color-wrap">
    <input type="color" v-model="todo.color" />
  </div>
  </li>
  </div>
  <button class="btn btn-primary mt-1" @click="saveFormData">Save</button>
</div>
</template>

<style lang="scss" scoped>
.title-container {
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  padding: 10px;
}

.card-body {
  padding: 7px;
}

li {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.75rem 1.25rem;
  background-color: #f1f1f1;
  box-shadow: 0 10px 15px -5px rgb(0 0 0 / 0.1),
    0 4px 5px -3px rgb(0 0 0 / 0.1);
  &:hover {
    .todo-actions {
      opacity: 1;
    }
  }
}

.todo {
  width: 100%;
  input[type="text"] {
    width: 70%;
  }
}
  
  .todo-actions {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 10px;
    opacity: 0;
    transition: 150ms ease-in-out;
    .icon {
      cursor: pointer;
    }
  }

</style>