import React from "react";

interface IState {
}

interface IProps {
  invoiceState: any;
  userState: any;
}

export default class Menu extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  currentYear(): any {
    return <b>{new Date().getFullYear()}</b>;
  }

  render(): React.ReactNode {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand text-light" href="#">
            Sponsor Administration {this.currentYear()}
          </a>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link text-light " aria-current="page" onClick={this.props.invoiceState}>
                  Invoices
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light " aria-current="page" onClick={this.props.userState}>
                  Users
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
