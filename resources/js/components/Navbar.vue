<template>
  <div class="navbar">
      <li class="navbar-logo" style="padding: 0 1em">
          <img id="tubestream-logo" src="./../../images/tubestreamLogo.png" alt="tubestream logo">
      </li>
      <ul class="navbar-items">
          <li class="navbar-item bell-icon">
            <font-awesome-icon id="bell-icon" icon="bell" />
          </li>
          <li class="navbar-item">
            <span>473</span>
          </li>
          <li class="navbar-item">|</li>
          <li class="navbar-item">
            <span>Good Morning, Joel</span>
          </li>
          <li>
            <font-awesome-icon id="user-icon" :icon="['far', 'user']" />
          </li>
      </ul>
  </div>
</template>

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
padding: 0 2em;
}
.navbar-item {
margin: 4px 10px
}
.bell-icon {
margin-right: 0;
}
#tubestream-logo {
border-radius: 20px;
width: 20%;
background-color: #E8BCB9;
}
#bell-icon {
color: yellow;
}
#user-icon {
border: 1px solid pink;
padding: 8px;
border-radius: 50%;
}
</style>