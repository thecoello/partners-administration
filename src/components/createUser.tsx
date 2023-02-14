import React from "react";

interface IProps {

}

interface IState {
  priceInputDisabled?: boolean,
  name?: string
  contact?: string
  email?: string
  sponsorCategory?: string
  location?: string
  priceType?: string
  price?: string
}

export default class CreateUser extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      priceInputDisabled: true,
      name: "",
      contact: "",
      email: "",
      sponsorCategory: "",
      location: "",
      priceType: "",
      price: ""
    }
  }

  invoiceList = () => {
    return (
      <form >
        <br />
        <h5><b>Create new user</b></h5>
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
                <select defaultValue={'DEFAULT'} className="form-select" id="floatingSelectDisabled" aria-label="Floating label disabled select example">
                  <option value="DEFAULT">Select a option</option>
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
                <select defaultValue={'DEFAULT'} className="form-select" id="floatingSelectDisabled" aria-label="Floating label disabled select example">
                  <option value="DEFAULT">Select a option</option>
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
                <select defaultValue={'DEFAULT'} className="form-select" id="floatingSelectDisabled" aria-label="Floating label disabled select example">
                  <option value="DEFAULT">Select a option</option>
                  <option value="1">Regular</option>
                  <option value="2">Early bird</option>
                </select>
              </div>
            </div>

            <div className="col">  <div className="mb-3">
              <label className="form-label">Price</label>
              <input type="text" className="form-control" value={this.state.price} onChange={(e)=>{
                this.setState({price: e.target.value
                })
              }} />
            </div>

            </div>
          </div>

          <br />

          <div className="container">
            <div className="row">
              <div className="col-2">
                <div className="mb-3">
                  <div className="d-flex flex-column text-center ">
                    <button onClick={() => {
                    }} className="btn btn-success" >Create User</button>
                  </div>
                </div>
              </div>
              <div className="col-10"></div>
            </div>
          </div>

        </div>


      </form>
    )
  }

  render(): React.ReactNode {
    return (
      <>
        <div className="section">
          <div id="createUser">
            <div className="container">
              <div className="row">
                <div className="col-6">  <h3>Users</h3></div>
                <div className="col-6 text-end">
                  <button className="btn btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Create new user</button>
                </div>
              </div>
            </div>

            <div className="offcanvas offcanvas-bottom h-50" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
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
        </div>
      </>
    )
  }


}