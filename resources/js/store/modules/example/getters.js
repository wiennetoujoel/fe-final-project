
const getData = (state) => {
    return (state.data)
}

const getAdmin = (state) => {
    return (state.user)
};

const adminOnline = (state) =>{
    return (state.adminLoggedIn)
}


export default {
    getData, getAdmin, adminOnline
}