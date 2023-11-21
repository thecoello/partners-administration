import React from "react";
import RequestsRoutes from "../../http/requests";
import { IProps, IState } from "../../models/invoices/model.invoicesForm";
import InvoiceElements from "./invoiceElements/invoiceElements";
import Invoice from "../../models/invoices/model.invoice";

export default class InvoiceFormPartner extends React.Component<IProps, IState> {

  _invoiceElements = new InvoiceElements()
  _invoice = new Invoice()

  constructor(props: IProps, states: IState) {
    super(props);

    this.state = {
      route: "invoices",
      invoiceData: null,
      loaded: false
    };
  }

  getInvoiceData(id: any) {
    new RequestsRoutes().get(this.state.route + "/" + id).then((response) => {
      this.setState({ invoiceData: response.data })
      this._invoice = this.state.invoiceData.invoices.data[0]
    });
  } 

  componentDidMount(): void {
    if (this.props.getInvoiceId()) {
      this.getInvoiceData(this.props.getInvoiceId())
      this.setState({ title: "Fill your tax information " })
    } else {
      window.location.href = "/"
    }
  }

  formUpdate(e: any) {
    e.preventDefault()
    if (this.props.getInvoiceId()) {
      new RequestsRoutes().putPost(this.state.route + "/user/" + this.props.getInvoiceId(), e.target).then((response) => {
        if (response.status === 200) {
          alert("Invoice Updated")
          this.getInvoiceData(this.props.getInvoiceId())
        }
      }).catch((error) => {
        alert(error)
      })
    } else { 
      alert("You must assign a user to the invoice")
    }
  }

  preRender() { 
    return (
      <>
        {this._invoiceElements.invoiceResume(this.state.invoiceData)}
        <div className="border rounded p-4 pt-0 mt-2">
          <div className="d-flex search mt-4 mb-4">
            <h3 className="m-0">Partner invoice information</h3>
            <a href="/invoices" className="btn btn-outline-secondary btn-dark text-light ms-4" type="button" > Cancel </a>
          </div>
          <form encType="multipart/form-data" className="needs-validation" onSubmit={this.formUpdate.bind(this)}>         
            {this._invoiceElements.taxinfoInputs({...this.state.invoiceData.invoices.data[0]},this.state.title, this._invoice)}
            <button type="submit" className="btn btn-dark"> Submit </button>
          </form>
        </div>
      </>
    )
  }

  public render(): React.ReactNode {
    return (
      <>{this.state.invoiceData ? this.preRender() : null}</>
    );
  }
}