<template>
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
</template>

<script>
</script>

<style scoped>

</style>