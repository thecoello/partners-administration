import React from "react";

interface IState {
}

interface IProps {
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
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand text-light" href="#">
              Sponsor Administration {this.currentYear()}
            </a>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href="/invoices" className="nav-link text-light " aria-current="page">
                    Invoices
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/informationtable" className="nav-link text-light " aria-current="page">
                    Stands information
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/users" className="nav-link text-light " aria-current="page">
                    Users
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/eventinformation" className="nav-link text-light " aria-current="page">
                    Event information
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
}
