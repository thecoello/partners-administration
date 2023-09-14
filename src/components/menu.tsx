import React from "react";

interface IState {}

interface IProps {
  _home?: any;
  _invoices?: any;
  _filesUpload?: any;
  _createUser?: any;
  _logout?: any;
  userType?: any;
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
      <nav className="navbar navbar-expand-lg bg-black bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand text-light" href="#">
            Sponsor Administration {this.currentYear()}
          </a>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link text-light " aria-current="page" href="#">
                  Invoices
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
