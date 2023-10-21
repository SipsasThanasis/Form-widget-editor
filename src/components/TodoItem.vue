<script setup>
import { ref } from "vue";
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
  <div class="todo-item-container card mb-3">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h4 class="mb-0">Form Preview</h4>
    </div>
    <div class="card-body settings-panel">
      <div class="settings-content">
        <div class="edit-title">
          <li class="list-group-item">
            <div class="todo">
              <input
                v-if="todo.isEditing"
                type="text"
                :value="todo.title"
                @input="$emit('update-title', $event.target.value, index)"
              />
              <span
                v-else
                :class="{'completed-title': todo.isCompleted}"
                :style="{ color: todo.titleTextColor }"
              >
                {{ todo.title }}
              </span>
            </div>
            <div class="title-actions">
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
        <div class="edit-subtitle">
          <li class="list-group-item">
            <div class="todo">
              <input
                v-if="todo.isEditing"
                type="text"
                :value="todo.subtitle"
                @input="$emit('update-subtitle', $event.target.value, index)"
              />
              <span
                v-else
                :class="{'completed-subtitle': todo.isCompleted}"
                :style="{ color: todo.subtitleTextColor }"
              >
                {{ todo.subtitle }}
              </span>
            </div>
            <div class="subtitle-actions">
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
      <form>
          <div class="form-group">
            <input type="FirstName" class="form-control" id="firstName" aria-describedby="emailHelp" placeholder="Your first name">
          </div>
          <div class="form-group">
            <input type="LastName" class="form-control" id="LastName" aria-describedby="emailHelp" placeholder="Your last name">           
          </div>
          <div class="form-group">
            <input class="form-control" id="id_email" name="email" placeholder="E-mail" required="required" title="" type="email" />
          </div>
      </form>
        <div class="form-panel card mt-3" :style="{ backgroundColor: todo.color }">
          <button
            class="btn btn-primary button-text"
            :style="{ backgroundColor: todo.color }"
            @click="submit"
          >
            {{ todo.todo }}
          </button>
          <div class="todo-actions">
            <Icon
              v-if="todo.isEditing"
              icon="ph:check-circle"
              class="icon check-icon"
              color="41b080"
              width="22"
              @click="$emit('edit-todo', index)"
            />
            <Icon
              v-else
              icon="ph:pencil-fill"
              class="icon edit-icon"
              color="41b080"
              width="22"
              @click="$emit('edit-todo', index)"
            />
          </div>
        </div>
      </div>
    </div>
    <button class="btn btn-primary mt-3" @click="saveFormData">Save</button>
  </div>
</template>


<style scoped>
@import 'bootstrap/dist/css/bootstrap.css';

.todo {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  padding: 5px 10px;
}

.todo-item-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  padding: 20px;
  border-radius: 5px;
}

.todo-item-container.card.mb-3 {
  background-color: #e4e4e4;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.settings-panel {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  padding: 14px 50px;
  background-color: #f1f1f1;
  border: #f1f1f1;
  border-radius: 15px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.settings-content {
  padding: 10px;
}

.edit-title {
  font-size: 20px;
}

.edit-subtitle {
  font-size: 15px;
}

.button-text {
  border: none;
  padding: 10px;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
}

.form-panel {
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-group{
  margin-bottom: 5px;;
}
.card-header{
  background-color: #e4e4e4;
  
}
</style>

