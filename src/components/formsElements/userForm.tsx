import React from "react";

export default class UserForm extends React.Component {

  public form(): React.ReactNode {
    return (
      <form>
        <h3>User Information</h3><br />
        <div className="row">
          <div className="col-4">
            <div className="mb-3">
              <label htmlFor="companyName" className="form-label">Company Name *</label>
              <input type="text" className="form-control" id="companyName" aria-describedby="companyName" />
            </div>
          </div>
          <div className="col-4">
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">Name *</label>
              <input type="text" className="form-control" id="Name" aria-describedby="Name" />
            </div>
          </div>
          <div className="col-4">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email *</label>
              <input type="email" className="form-control" id="email" aria-describedby="email" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password *</label>
              <input type="password" className="form-control" id="password" aria-describedby="password" />
            </div>
          </div>
          <div className="col-4">
            <div className="mb-3">
              <label htmlFor="userType" className="form-label">User Type *</label>
              <select className="form-select">
                <option value=""></option>
              </select>
            </div>
          </div>
        </div>

        <hr />

        <h3>Pack Price</h3><br />

        <div className="row">
          <div className="col-3">
            <div className="mb-3">
              <label htmlFor="sponsorshipCategory" className="form-label">Sponsorship Category *</label>
              <select className="form-select">
                <option value=""></option>
              </select>
            </div>
          </div>
          <div className="col-3">
            <div className="mb-3">
              <label htmlFor="sponsorshipCategory" className="form-label">Location *</label>
              <select className="form-select">
                <option value=""></option>
              </select>
            </div>
          </div>
          <div className="col-3">
            <div className="mb-3">
              <label htmlFor=">pricetype" className="form-label">Price type *</label>
              <input type="pricetype" className="form-control" id="pricetype" aria-describedby="pricetype" />
            </div>
          </div>
          <div className="col-3">
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price *</label>
              <select className="form-select" for="price">
                <option value=""></option>
              </select>            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-dark">Submit</button>

      </form>
    )
  }
}