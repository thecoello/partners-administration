import React from "react";
import Home from "./components/Home";
import CreateUser from "./components/users";
import FileUpload from "./components/fileUpload";
import Invoice from "./components/invoice";
import Menu from "./components/menu"
import axios from "axios"
import qs from "qs"
import Cookies from "js-cookie";

axios.defaults.withCredentials = true


interface IProps {

}

interface IState {
  home?: boolean
  invoices?: boolean
  filesUpload?: boolean
  createUser?: boolean
  userType?: any
  userID?: any
  logged?: boolean
  email?: string
  password?: string

}


export default class App extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      home: false,
      invoices: false,
      filesUpload: false,
      createUser: false,
      userType: "",
      userID: "",
      logged: false,
    }
  }

  stateLogin = () => {
    this.setState({ userType: false })
    this.setState({ userID: false })
    this.setState({ logged: false })
  }

  stateHome = () => {
    this.setState({ home: true })
    this.setState({ invoices: false })
    this.setState({ filesUpload: false })
    this.setState({ createUser: false })
  }

  stateInvoice = () => {
    this.setState({ home: false })
    this.setState({ invoices: true })
    this.setState({ filesUpload: false })
    this.setState({ createUser: false })
  }

  stateFiles = () => {
    this.setState({ home: false })
    this.setState({ invoices: false })
    this.setState({ filesUpload: true })
    this.setState({ createUser: false })
  }

  stateUsers = () => {
    this.setState({ home: false })
    this.setState({ invoices: false })
    this.setState({ filesUpload: false })
    this.setState({ createUser: true })
  }

  logout = () => {
    this.setState({ home: false })
    this.setState({ invoices: false })
    this.setState({ filesUpload: false })
    this.setState({ createUser: false })
    this.setState({ logged: false})
    this.logOutAction()
    Cookies.remove('logged')
  }

  logOutAction=()=>{
    var data = qs.stringify({
      'token': import.meta.env.VITE_TOKEN
    });


  axios.post(import.meta.env.VITE_URL,data,{withCredentials: true})
    .then((response)=> {

      if(response.status === 200){
        this.setState({userID:""})
        this.setState({userType:""})
      }
    })
    .catch((error)=> {
      console.log(error);
    });
    
    
  }

  loginAction=()=>{
    var data = qs.stringify({
      'email': this.state.email,
      'password': this.state.password,
      'token': import.meta.env.VITE_TOKEN
    });

    var config = {
      method: 'post',
      url: import.meta.env.VITE_URL,
      data : data,
      withCredentials: true,
    };

    const instance = axios.create({
      baseURL: import.meta.env.VITE_URL,
      withCredentials: true,
   })

  instance(config)
    .then((response)=> {
      if(response.status === 200){
        this.setState({userID:response.data.id})
        this.setState({userType:response.data.user_type})
        if(response.data.user_type == 1){
          this.setState({home: false})
          this.setState({invoices: true})
        }else{
          this.setState({home: true})
          this.setState({invoices: false})
        }
        this.setState({logged: true})
        document.cookie = "logged=true"
      }
    })
    .catch((error)=> {
      console.log(error);
    });
    
    
  }

  componentDidMount(): void {

    Cookies.remove('logged')

    if(document.cookie.includes("logged") && this.state.userID){
      this.setState({logged: true})
    }else{
      this.setState({logged: false})
    }
    
  }

  login=()=>{
    return (
      <>
        <div className="col-12 h-100">

          <div id="login" className="d-flex  justify-content-center  align-items-center flex-column">

            <div className="row">
              <div className="col-12">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input onChange={(e) => {
                      this.setState({ email: e.target.value })
                    }} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input onChange={(e) => {
                      this.setState({ password: e.target.value })
                    }} type="password" className="form-control" id="exampleInputPassword1" />
                  </div>

                  <button onClick={(e) => {
                    e.preventDefault()

                    this.loginAction()

                  }} className="btn btn-light">Login</button>
                </form>
              </div>
            </div>

          </div>

        </div>
      </>
    )
  }

  render(): React.ReactNode {
    return (

      <div className="cotainerfluid" id="main">
        <div className="row" id="renderer">


          {this.state.logged ? <><div className="col-2">

            <Menu
              userType={this.state.userType}
              _home={() => {
                this.stateHome()
              }}
              _invoices={() => {
                this.stateInvoice()
              }}
              _filesUpload={() => {
                this.stateFiles()
              }}
              _createUser={() => {
                this.stateUsers()
              }}

              _logout={() => {
                this.logout()
              }}
            />
          </div><div className="col-10" id="content-view">
              <div className="container">

                {this.state.home ? <Home userID={this.state.userID} userType={this.state.userType} /> : null}
                {this.state.invoices ? <Invoice userID={this.state.userID} userType={this.state.userType} /> : null}
                {this.state.filesUpload ? <FileUpload /> : null}
                {this.state.createUser ? <CreateUser /> : null}
              </div>

            </div></> : <this.login />}



        </div>
      </div>

    )
  }

}