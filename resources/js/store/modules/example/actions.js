import axios from "axios";

const getAllData = async (context) => {
    let response = await axios.get("/api/getAllData");

    context.commit("UPDATE_DATA", response.data);
}


export default {
    getAllData
} 