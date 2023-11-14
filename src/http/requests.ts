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

    public async post(route:String | null,data: any) {
      return await axios.post(this.url + route, data,{headers:{
        'Content-Type': 'multipart/form-data'
      }})
      .then((response)=>{
        return response
      })
      .catch((error)=>{
        return error
      })
      
    }


    public async put(route:String | null,data: any) {
      return await axios.put(this.url + route, data,{headers:{
      }})
      .then((response)=>{
        console.log(data)
        return response
      })
      .catch((error)=>{
        return error
      })
      
    }

    public async putPost(route:String | null,data: any) {

      let formData = new FormData(data)
      formData.append('_method','PUT')
      
      return await axios.post(this.url + route,formData,{headers:{
        'Content-Type': 'multipart/form-data'
      }},)
      .then((response)=>{
        console.log(data)
        return response
      })
      .catch((error)=>{
        return error
      })
      
    }


    public async delete(route:String | null) {

      return await axios.delete(this.url + route)
      .then((response)=>{
        return response
      })
      .catch((error)=>{
        return error
      })
      
    }

}