import React from "react";

interface IState {

}

interface IProps {
  _home?: any,
  _invoices?: any,
  _filesUpload?: any,
  _createUser?: any
}

export default class Menu extends React.Component<IProps, IState > {
  constructor(props: any) {
    super(props)
    this.showHome.bind(this)
    this.showInvoice.bind(this)
    this.showFiles.bind(this)
    this.showUsers.bind(this)
  }

  currentYear(): any {
    return <b>{new Date().getFullYear()}</b>
  }

  showHome(){
    this.props._home()
  }
  showInvoice(){
    this.props._invoices()
  }
  showFiles(){
    this.props._filesUpload()
  }
  showUsers(){
    this.props._createUser()
  }
  
  render(): React.ReactNode {
    return (
      <div id="sidebar">
        <div id="logo">

          <p>{<this.currentYear />} SMB INNOVATION SUMMIT</p>
          <span>Partner administrator</span>

        </div>
        <nav>
          <ul>
            <li onClick={() => {
              this.showHome()
            }}>Home</li>
            <li onClick={() => {
              this.showInvoice()
            }}>Invoices</li>
            <li onClick={() => {
              this.showFiles()
            }}>Files Upload</li>
            <li onClick={()=>{
              this.showUsers()
            }}>Users</li>
          </ul>

        </nav>

        <div id="logout">
          <span> Log out</span>
        </div>
      </div>
    )
  }

}