import axios from 'axios';

export default class RequestsRoutes {

  private url = import.meta.env.VITE_API_URL

  public async login(route: String | null, data: any) {
    return await axios.post(this.url + route, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error
      })
  }
  

  public async authUser() {
    if(localStorage.getItem('Authorization')){
      return await axios.get(this.url + 'authuser', {
        headers: {
          'Authorization': localStorage.getItem('Authorization')
        }
      })
        .then((response) => {
          return response
        })
        .catch((error) => {
          return error
        })
    }
  }

  public async get(route: String | null) {
    if(localStorage.getItem('Authorization')){
      return await axios.get(this.url + route, {
        headers: {
          'Authorization': localStorage.getItem('Authorization')
        }
      })
        .then((response) => {
          return response
        })
        .catch((error) => {
          return error
        })
    }
  }

  public async post(route: String | null, data: any) {
    if(localStorage.getItem('Authorization')){
      return await axios.post(this.url + route, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem('Authorization')
        }
      })
        .then((response) => {
          return response
        })
        .catch((error) => {
          return error
        })
    }

  }


  public async put(route: String | null, data: any) {
    if(localStorage.getItem('Authorization')){
      return await axios.put(this.url + route, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('Authorization')
        }
      })
        .then((response) => {
          return response
        })
        .catch((error) => {
          return error
        })
      }
    
  }

  public async putPost(route: String | null, data: any) {
    if(localStorage.getItem('Authorization')){
      return await axios.post(this.url + route, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem('Authorization')
        }
      },)
        .then((response) => {
          return response
        })
        .catch((error) => {
          return error
        })
    }
    
  }

  public async delete(route: String | null) {
    if(localStorage.getItem('Authorization')){
      return await axios.delete(this.url + route, {
        headers: {
          'Authorization': localStorage.getItem('Authorization')
        }
      })
        .then((response) => {
          return response
        })
        .catch((error) => {
          return error
        })
    }
    
  }
}