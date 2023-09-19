import React from "react";
import InvoiceForm from "./formsElements/invoiceForm";
import InvoiceTable from "./tables/invoiceTable";

interface IProps {}
interface IState {}

export default class Invoice extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      url: import.meta.env.VITE_URL,
    };
  }

  render(): React.ReactNode {
    return (
      <div className="container">
      {/* {new InvoiceForm().form()} */}
      {<InvoiceTable />}
      </div>
    )
  }
}