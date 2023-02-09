import React from "react";

export default class Menu extends React.Component {
  constructor(props: any) {
    super(props)
  }

  currentYear():any{
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
            <li>Invoices</li>
            <li>Files Upload</li>
            <li>Create User</li>
          </ul>

        </nav>

        <div id="logout">
          <span> Log out</span>
        </div>
      </div>
    )
  }
  
}