import React from "react";
import Menu from "./components/menu";

import UserTable from "./components/tables/userTable";
import UserForm from "./components/formsElements/userForm";

import InvoiceTable from "./components/tables/invoiceTable";
import InvoiceForm from "./components/formsElements/invoiceForm";
import InformationTable from "./components/tables/InformationTable";
import InformationForm from "./components/formsElements/informationForm";

import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import InvoiceFormPartner from "./components/formsElements/invoiceFormPartner";

interface IProps { 
}

interface IState {
  userId: any
  invoiceId: any
}

export default class App extends React.Component<IProps, IState> {
  router: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      userId: "",
      invoiceId: ""
    }
    

    this.router = createBrowserRouter([
      {
        path: "/",
        element: <InvoiceTable setInvoiceId={this.setInvoiceId} />,
      },
      {
        path: "/invoices",
        element: <InvoiceTable setInvoiceId={this.setInvoiceId} />,
      },
      {
        path: "/invoices/form",
        element: <InvoiceForm getInvoiceId={this.getInvoiceId} />,
      },
      {
        path: "/invoices/updatepartner",
        element: <InvoiceFormPartner getInvoiceId={this.getInvoiceId} />,
      },
      {
        path: "/users",
        element: <UserTable setUserID={this.setUserId} />,
      },
      {
        path: "/users/form",
        element:  <UserForm getUserId={this.getUserId}/>,
      },
      {
        path: "/informationtable",
        element: <InformationTable setUserID={this.setUserId}  />,
      },
      {
        path: "/informationtable/create",
        element: <InformationForm getUserId={this.getUserId} />,
      },
    

    ]);


  }
  
  setUserId=(id:any)=>{
    this.setState({userId: id})
  }

  getUserId=()=>{
    return this.state.userId
  }

  setInvoiceId=(id:any)=>{
    this.setState({invoiceId: id})
  }

  getInvoiceId=()=>{
    return this.state.invoiceId
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
