import React from "react";

export default class MenuEvents extends React.Component {

  invoiceState() {
    this.setState({ invoices: true })
    this.setState({ users: false })

  }

  userState() {
    this.setState({ invoices: false })
    this.setState({ users: true })
  }


}