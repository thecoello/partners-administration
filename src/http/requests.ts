import axios from "axios";

export default class RequestsRoutes {

    private url = import.meta.env.VITE_URL

    public async get(route:String | null) {

      return await axios.get(this.url + route)
      .then((response)=>{
        return response
      })
      .catch((error)=>{
        return error
      })
      
    }

}