<template>
    <div class="navbar">
        <li class="navbar-logo" style="padding: 0 1em">
            <!--<img src="../../images/tubestream_logo.webp" alt="Tubestream">-->
            Tubestream Logo
        </li>
        <ul class="navbar-items">
            <li class="navbar-item">
                <font-awesome-icon icon="bell" />
                473
            </li>
            <li class="navbar-item">|</li>
            <li class="navbar-item">
                Good Morning, Joel
                <font-awesome-icon :icon="['far', 'user']" />
            </li>
        </ul>
    </div>
</template>


<script>
export default {
    
}
</script>

<style scoped>

.navbar{
  background-color: #1D1A39;
  color: #E8BCB9;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 5vw;
  min-height: 2.5rem;
  max-height: 4rem;
}
.navbar-logo{
  list-style-type: none;
  margin: 0;
  max-height: 4em;
  flex-grow: 1;
  flex-basis: 5vw;
 }


.navbar-items{
  list-style-type: none;
  display: flex;
  margin: 0;
}

.navbar-item{
  padding: 0 2em;
}


</style>