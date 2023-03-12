import React from "react";

interface IState {

}

interface IProps {
  _home?: any,
  _invoices?: any,
  _filesUpload?: any,
  _createUser?: any
  _logout?: any
  userType?: any
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
  logout(){
    this.props._logout()
  }
  
  render(): React.ReactNode {
    return (
      <div id="sidebar">
        <div id="logo">
          <h6>SAP Partner Summit for SME</h6>
          <p>{<this.currentYear />}​</p>

        </div>
        <nav>
          <ul>
            {this.props.userType == 0 ? <li onClick={() => {
              this.showHome()
            }}>Home</li>: null}
            <li onClick={() => {
              this.showInvoice()
            }}>Invoices</li>
         {/*    <li onClick={() => {
              this.showFiles()
            }}>Files Upload</li> */}
           {this.props.userType == 1 ?  <li onClick={()=>{
              this.showUsers()
            }}>Users</li>: null}
          </ul>

        </nav>

        <div onClick={()=>{
              this.logout()
            }} id="logout">
          <span> Log out</span>
        </div>
      </div>
    )
  }

}