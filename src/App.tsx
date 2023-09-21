import React from "react";
import Invoice from "./components/invoice";
import Menu from "./components/menu";
import axios from "axios";
import Users from "./components/users";
import MenuEvents from "./components/eventHandler/menuEvents";

interface IProps {
}

interface IState {
  users?: boolean;
  invoices?: boolean;
}

export default class App extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      users: false,
      invoices: true,
    };
    this.invoiceState = this.invoiceState.bind(this)
    this.userState = this.userState.bind(this)  
  }

  invoiceState() {
    this.setState({ invoices: true })
    this.setState({ users: false })
  }

  userState() {
    this.setState({ invoices: false })
    this.setState({ users: true })
  }

  render(): React.ReactNode {
    return (
      <>
        <Menu invoiceState={this.invoiceState} userState={this.userState} />
        <div className="cotainerfluid">
          <div className="row">
            <div className="col-12" id="content-view">
                {this.state.invoices ? <Invoice /> : null}
                {this.state.users ? <Users /> : null}
            </div>
          </div>
        </div>
      </>
    );
  }
}
