import axios from "axios";

const getAllData = async (context) => {
    let response = await axios.get("/api/getAllData");
    console.log('isi context', context)

    context.commit("UPDATE_DATA", response.data);
}

const getAdminData = async (context) => {
  let response = await axios.get("/api/getAdminData");
  console.log('isi context', context)

  context.commit("ADMIN_DATA", response.data);
  
}


  export default {
    getAllData, getAdminData
};