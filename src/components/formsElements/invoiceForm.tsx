import React from "react";
import Forms from "./selectors";

interface IProps {
  invoiceTableState: any
}

interface IState {

}

export default class InvoiceForm extends React.Component<IProps, IState>{


  public render(): React.ReactNode {
    return (

      <>
        <div className="d-flex search mt-4 mb-4">

          <h3 className="m-0">Create Invoices</h3>

          <button onClick={this.props.invoiceTableState}
              className="btn btn-outline-secondary btn-dark text-light ms-4"
              type="button">
              Cancel
            </button>
            

        </div>

        <form>
          <div className="mb-3">
            <label htmlFor="companyName" className="form-label">Company Name *</label>
            <input type="text" className="form-control" id="companyName" aria-describedby="companyName" />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address *</label>
            <input type="text" className="form-control" id="address" aria-describedby="addresss" />
          </div>
          <div className="mb-3">
            <label htmlFor="zipCode" className="form-label">ZIP/Postal Code *</label>
            <input type="text" className="form-control" id="zipCode" aria-describedby="zipCode" />
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">Country *</label>
            <Forms />
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">Vat Number *</label>
            <input type="text" className="form-control" id="country" aria-describedby="country" />
          </div>
          <button type="submit" className="btn btn-dark">Submit</button>
        </form>
      </>

    )
  }

}