<template>
  <h3 class="container-title">3rd Party Instruction :)</h3>
  <div class="container-subtitle">
    <div class="subtitle">
      <div class="vendor-management">Vendor Management</div>
      <span>&gt;</span>
      <div class="party-instruction">3rd Party Instruction</div>
    </div>
    <div class="subtitle-buttons">
      <button type="button" class="email-button" @click="sendEmail">
        <font-awesome-icon :icon="['fas', 'paper-plane']" style="color: #ae445a" />
        Send Email
      </button>
      <button type="button" class="export-button" @click="exportExcel">
        <font-awesome-icon :icon="['fas', 'file-export']" style="color: #ae445a" />
        Export
      </button>
    </div>
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
      console.log("send email")
      this.popupEmailShow = true
    },
    closePopupEmail() {
      this.popupEmailShow = false;
    },
    exportExcel() {
      console.log("export excel")
    },
    
  }
}
</script>

<style>
.container-title {
  font-weight: 550;
}

.container-subtitle {
  display: flex;
  flex-direction: row;
  padding-bottom: 1em;
}

.container-subtitle .subtitle {
  width: 50%;
  display: flex;
  flex-direction: row;
}

.container-subtitle .subtitle-buttons {
  display: flex;
  justify-content: flex-end;
  width: 50%;
  gap: 30px;
}

.subtitle .vendor-management {
  padding-right: 0.55em;
  opacity: 0.7;
}

.subtitle .party-instruction {
  padding-left: 0.55em;
  opacity: 1;
  transition: ease-in-out;
}

.subtitle .vendor-management:hover,
.subtitle .party-instruction:hover {
  cursor: pointer;
  transform: scale(1.01);
  opacity: 1;
  text-decoration: underline;
  color: #662549;
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