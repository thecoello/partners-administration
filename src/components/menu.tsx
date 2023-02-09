import React from "react";

interface IStatesMenu {
  home?: boolean,
  invoices?: boolean,
  filesUpload?: boolean,
  createUser?: boolean
}

interface IPropsMenu {
  home?: boolean,
  invoices?: boolean,
  filesUpload?: boolean,
  createUser?: boolean
}

export default class Menu extends React.Component<IPropsMenu, IStatesMenu> {
  constructor(props: any) {
    super(props)
    this.state = {
      invoices: this.props.invoices,
      createUser: this.props.createUser
    }


  }

  currentYear(): any {
    return <b>{new Date().getFullYear()}</b>
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
            <li>Home</li>
            <li onClick={() => {
              this.props.invoices


            }}>Invoices</li>
            <li>Files Upload</li>
            <li onClick={()=>{
              this.props.createUser
            }}>Create User</li>
          </ul>

        </nav>

        <div id="logout">
          <span> Log out</span>
        </div>
      </div>
    )
  }

}