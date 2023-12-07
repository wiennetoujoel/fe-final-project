<template>
  <h3 class="container-title">3rd Party Instruction :)</h3>
  <div class="container-subtitle">
    <div class="subtitle">
      <div class="vendor-management">Vendor Management</div>
      <span>&gt;</span>
      <div class="party-instruction" @click="navigateToHome">3rd Party Instruction</div>
    </div>
    <!-- <BtnEmailExcel /> -->
  </div>
</template>

<script>
import BtnEmailExcel from './BtnEmailExcel.vue';
export default {
  components: {
    BtnEmailExcel,
  },
  methods:{
    navigateToHome() {
            this.$router.push({
                path: "/home",
                name: "home"
            });
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
</style>