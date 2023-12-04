const mutations = {
    UPDATE_DATA(state, payload) {
      state.data = payload;
      console.log('payload update data', payload);
    },

    ADMIN_DATA(state, payload) {
      state.user = payload
    },

    setAdminOnline(state, username){
      console.log('username di mutations', username);
      state.adminLoggedIn = username;
    }
}

  
  
  export default mutations;