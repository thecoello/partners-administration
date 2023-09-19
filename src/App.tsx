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

  eventsMenu = new MenuEvents();

  constructor(props: IProps) {
    super(props);
    this.state = {
      users: false,
      invoices: true,
    };

    this.eventsMenu.invoiceState = this.eventsMenu.invoiceState.bind(this)
    this.eventsMenu.userState = this.eventsMenu.userState.bind(this)  
  }

  render(): React.ReactNode {
    return (
      <>
        <Menu invoiceState={this.eventsMenu.invoiceState} userState={this.eventsMenu.userState} />
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
