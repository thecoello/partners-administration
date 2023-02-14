import React from "react";
import CreateUser from "./components/createUser";
import FileUpload from "./components/fileUpload";
import Home from "./components/home";
import Invoice from "./components/invoice";
import Menu from "./components/menu"

interface IProps {

}

interface IState {
  home?:boolean,
  invoices?:boolean,
  filesUpload?: boolean,
  createUser?: boolean
}


export default class App extends React.Component <IProps,IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      home: true,
      invoices: false,
      filesUpload: false,
      createUser: false
    }
  }

  stateHome=()=>{
    this.setState({home: true})
    this.setState({invoices: false})
    this.setState({filesUpload: false})
    this.setState({createUser: false})
  }

  stateInvoice=()=>{
    this.setState({home: false})
    this.setState({invoices: true})
    this.setState({filesUpload: false})
    this.setState({createUser: false})
  }

  stateFiles=()=>{
    this.setState({home: false})
    this.setState({invoices: false})
    this.setState({filesUpload: true})
    this.setState({createUser: false})
  }

  stateUsers=()=>{
    this.setState({home: false})
    this.setState({invoices: false})
    this.setState({filesUpload: false})
    this.setState({createUser: true})
  }

  render(): React.ReactNode {
    return (

      <div className="cotainerfluid" id="main">
        <div className="row" id="renderer">
          <div className="col-2">
            <Menu
            _home={()=>{
              this.stateHome()
            }}
            _invoices={()=>{
              this.stateInvoice()
            }}
            _filesUpload={()=>{
              this.stateFiles()
            }}
            _createUser={()=>{
              this.stateUsers()
            }}
            />
          </div>
          <div className="col-10" id="content-view">
            <div className="container">

            {this.state.home ? <Home />: null}
            {this.state.invoices ? <Invoice />  : null}
            {this.state.filesUpload ? <FileUpload />  : null}
            {this.state.createUser ? <CreateUser />  : null}
            </div>

          </div>
        </div>
      </div>

    )
  }

}