import React from "react";
import CreateUser from "./components/createUser";
import FileUpload from "./components/fileUpload";
import Invoice from "./components/invoice";
import Menu from "./components/menu"

interface IProps {

}


interface IStateMenu {
  home?:boolean,
  invoices?:boolean,
  filesUpload?: boolean,
  createUser?: boolean
}


export default class App extends React.Component <IProps,IStateMenu> {

  constructor(props: any) {
    super(props)
    this.state = {
      home: false,
      invoices: true,
      filesUpload: false,
      createUser: false
    }

  }


  showInvoices = () => {
    this.setState({ createUser: false })
    this.setState({ invoices: true })
  }

  showCreateUser = () => {
    this.setState({ invoices: false })
    this.setState({ createUser: true })
  }


  render(): React.ReactNode {
    return (

      <div className="cotainerfluid" id="main">
        <div className="row">
          <div className="col-2">
            <Menu
            home={this.state.home}
            invoices={this.showInvoices}
            filesUpload={this.state.filesUpload}
            createUser={this.showCreateUser()}
            />
          </div>
          <div className="col-10" id="content-view">
            <div className="container">

            {this.state.invoices ? <Invoice />  : null}
            {this.state.createUser ? <CreateUser />  : null}
            </div>

          </div>
        </div>
      </div>

    )
  }

}