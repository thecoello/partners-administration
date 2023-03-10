import React from "react";

export default class CreateUser extends React.Component {

  constructor(props: any) {
    super(props)
  }

  invoiceList() {
    return (
      <form >
        <br />
          <h5><b>Partner information</b></h5>
      <hr />
      <div className="container">
        <div className="row">
          <div className="col"> <div className="mb-3">
            <label className="form-label">Name*</label>
            <input type="text" className="form-control" />
          </div></div>
          <div className="col"> <div className="mb-3">
            <label className="form-label">Contact*</label>
            <input type="text" className="form-control" />
          </div>
          </div>

          <div className="col">  <div className="mb-3">
            <label className="form-label">Email*</label>
            <input type="text" className="form-control" />
          </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">

          <div className="col">
            <div className="mb-3">
              <label className="form-label">Sponsorship category*</label>
              <select className="form-select" id="floatingSelectDisabled" aria-label="Floating label disabled select example">
                <option selected disabled>Select a option</option>
                <option value="1">Gold Sponsor</option>
                <option value="2">Silver Sponsor</option>
                <option value="3">Bronze Sponsor</option>
                <option value="3">SSP (Service Solution Partner)</option>
              </select>
            </div>
          </div>

          <div className="col">
            <div className="mb-3">
              <label className="form-label">Location*</label>
              <select className="form-select" id="floatingSelectDisabled" aria-label="Floating label disabled select example">
                <option selected disabled>Select a option</option>
                <option value="1">Panama (NA + LAC)</option>
                <option value="2">Bangkok (APJ + GC)</option>
                <option value="3">Vienna (EMEA + MEE)</option>
                <option value="3">Panama (NA + LAC) + Bangkok (APJ + GC) + Vienna (EMEA + MEE)</option>
              </select>
            </div>
          </div>

          <div className="col">
            <div className="mb-3">
              <label className="form-label">Price type*</label>
              <select className="form-select" id="floatingSelectDisabled" aria-label="Floating label disabled select example">
                <option selected disabled>Select a option</option>
                <option value="1">Regular</option>
                <option value="2">Early bird</option>

              </select>
            </div>
          </div>
        </div>
      </div>

    </form>
    )
  }

  render(): React.ReactNode {
    return (
      <>
        <div id="createUser">



          <div className="container">
            <div className="row">
              <div className="col-6">  <h3>Create user</h3></div>
              <div className="col-6 text-end">
                <button className="btn btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Create new user</button>
              </div>
            </div>
          </div>

          <div className="offcanvas offcanvas-bottom h-100" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
            <div className="offcanvas-header bg-black text-white
">
              <h3 className="offcanvas-title" id="offcanvasBottomLabel">New User</h3>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="d-flex flex-column justify-content-center container">
              <this.invoiceList />
            </div>
          </div>





        </div>
      </>
    )
  }


}