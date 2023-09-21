import React from "react";
import InvoiceForm from "./formsElements/invoiceForm";
import InvoiceTable from "./tables/invoiceTable";

interface IProps {}
interface IState {
  invoiceTable: boolean
  invoiceForm: boolean
}

export default class Invoice extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      invoiceTable: true,
      invoiceForm: false
    };

    this.createInvoice = this.createInvoice.bind(this)  
    this.showInvoices = this.showInvoices.bind(this)  
  }

  createInvoice() {
    this.setState({ invoiceTable: false })
    this.setState({ invoiceForm: true })
  }

  showInvoices() {
    this.setState({ invoiceTable: true })
    this.setState({ invoiceForm: false })
  }

  render(): React.ReactNode {
    return (
      <div className="container">

      {this.state.invoiceTable ? <InvoiceTable  invoiceFormState={this.createInvoice}/> : null}
      {this.state.invoiceForm ?  <InvoiceForm invoiceTableState={this.showInvoices} /> : null}
      
      </div>
    )
  }
}