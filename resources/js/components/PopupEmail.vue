<template>
  <div class="modal-overlay" @click="closePopupEmail">
    <div id="popup-container" class="px-4 py-3 rounded">
      <button type="button" class="float-end btn btn-light" @click="closePopupEmail">
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </button>
      <h3 class="text-center">Send Email</h3>
    
      <form action="" class="mt-4">
        <div class="d-inline-block">
          <label for="contractor-name">Contractor</label> <br>
          <input type="text" id="contractor-name" class="p-1" placeholder="Contractor name" required>
        </div>
        <div class="d-inline-block float-end">
          <label for="contractor-email" class="form-label" style="margin-bottom: 0px;">Contractor Email</label> <br>
          <input type="email" id="contractor-email" class="p-1" placeholder="contractor@example.com" required>
        </div>
        <div class="mt-2">
          <label for="recipients">Recipients</label>
          <select id="recipients" class="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div class="mt-2">
          <label for="attachment">Attachment</label>
          <input type="file" class="form-control" id="attachment">
        </div>
        <div class="mt-5 float-end">
          <button class="btn btn-light me-2" @click="closePopupEmail">Cancel</button>
          <button type="submit" class="btn btn-success">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closePopupEmail() {
      this.$emit('emit-closePopupEmail')
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* Ensure it's above other content */
}
#popup-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  z-index: 10;
  background-color: white;
  width: 50%;
}
#contractor-name,
#contractor-email {
  width: 15rem;
}
</style>