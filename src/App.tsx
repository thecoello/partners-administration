import React from "react";
import Menu from "./components/menu";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserTable from "./components/tables/userTable";
import UserForm from "./components/formsElements/userForm";
import InvoiceTable from "./components/tables/invoiceTable";
import InvoiceForm from "./components/formsElements/invoiceForm";

interface IProps { }

interface IState {
  loader?: boolean;
}

export default class App extends React.Component<IProps, IState> {
  router: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      loader: true
    }
    this.router = createBrowserRouter([
      {
        path: "/",
        element: <InvoiceTable />,
      },
      {
        path: "/invoices",
        element: <InvoiceTable />,
      },
      {
        path: "/invoices/create",
        element: <InvoiceForm />,
      },
      {
        path: "/users",
        element: <UserTable />,
      },
      {
        path: "/users/create",
        element: <UserForm />,
      },
    ]);
  }
 
  render(): React.ReactNode {
    return (
      <>
        <Menu />
        <div className="cotainerfluid">
          <div className="row">
            <div className="col-12" id="content-view">
              <div className="container">
                <RouterProvider router={this.router} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
