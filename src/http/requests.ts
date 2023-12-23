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

  public async resetPass(route: String | null, data: any) {
    return await axios.put(this.url + route, data, {
      headers: {
        'Content-Type': 'application/json',
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
    if(localStorage.getItem('Authtoken')){
      return await axios.get(this.url + 'authuser', {
        headers: {
          'Authtoken': localStorage.getItem('Authtoken')
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
    if(localStorage.getItem('Authtoken')){
      return await axios.get(this.url + route, {
        headers: {
          'Authtoken': localStorage.getItem('Authtoken')
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
    if(localStorage.getItem('Authtoken')){
      return await axios.post(this.url + route, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authtoken': localStorage.getItem('Authtoken')
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
    if(localStorage.getItem('Authtoken')){
      return await axios.put(this.url + route, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authtoken': localStorage.getItem('Authtoken')
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
    if(localStorage.getItem('Authtoken')){
      return await axios.post(this.url + route, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authtoken': localStorage.getItem('Authtoken')
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
    if(localStorage.getItem('Authtoken')){
      return await axios.delete(this.url + route, {
        headers: {
          'Authtoken': localStorage.getItem('Authtoken')
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