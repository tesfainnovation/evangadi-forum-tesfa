import axios from 'axios'




const api = axios.create({
  // baseURL:'http://localhost:3000/Api'
  baseURL: "https://eva-deploy-3.onrender.com",
});
 




export default api