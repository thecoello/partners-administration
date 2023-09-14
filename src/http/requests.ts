import axios from "axios";

export default class RequestsRoutes {

    url = import.meta.url

    async get(route:String) {
        
        try {
            const response = await axios.get(this.url + route);
            return response;
          } catch (error) {
            return error;
          }
    }

}