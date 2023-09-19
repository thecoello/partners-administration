import React from "react";
import Forms from "./selectors";

export default class InvoiceForm extends React.Component{


  public form(): React.ReactNode {
    return (
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
          { new Forms().countrySelector()}
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">Vat Number *</label>
          <input type="text" className="form-control" id="country" aria-describedby="country" />
        </div>
        <button type="submit" className="btn btn-dark">Submit</button>
      </form>
    )
  }

}