const mutations = {
    UPDATE_DATA(state, payload) {
      state.data = payload;
      console.log(payload);
    },
  };
  
  export default mutations;