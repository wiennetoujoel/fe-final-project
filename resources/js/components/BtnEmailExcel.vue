<template>
  <div class="subtitle-buttons">
    <button type="button" class="email-button" @click="sendEmail">
      <font-awesome-icon :icon="['fas', 'paper-plane']" style="color: #ae445a" />
      Send Email
    </button>
  </div>

  <!-- popup email -->
  <div v-if="popupEmailShow">
    <PopupEmail @emit-closePopupEmail="closePopupEmail" />
  </div>
</template>

<script>
import PopupEmail from './PopupEmail.vue'

export default {
  components: {
    PopupEmail,
  },
  data() {
    return {
      popupEmailShow: false,
    }
  },
  methods: {
    sendEmail() {
      this.popupEmailShow = true
    },
    closePopupEmail() {
      this.popupEmailShow = false;
    },
    
  }
}
</script>

<style scoped>
.subtitle-buttons {
  display: flex;
  justify-content: flex-end;
  width: 50%;
  gap: 30px;
}
.subtitle-buttons .email-button,
.subtitle-buttons .export-button {
  border: 0.6px solid #ccc;
  background-color: white;
  font-size: 90%;
  font-weight: 400;
}
.email-button:hover,
.export-button:hover {
  font-weight: 500;
  background-color: #e8bcb9;
  border: 0.6px solid black;
  transform: scale(1.01);
}
</style>