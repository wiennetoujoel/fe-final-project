const mutations = {
    UPDATE_DATA(state, payload) {
      state.data = payload;
      console.log('payload update data', payload);
    },
  };

  
  
  export default mutations;