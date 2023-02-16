import axios from "axios";
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
  url?: string
  data?: any
  createEditUser?: boolean
  createUser?: boolean
  updateUser?: boolean
  password?:string
  userType?:string
}

export default class createAndUpdateUser extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      priceInputDisabled: true,
      name: "",
      contact: "",
      email: "",
      password:"",
      userType:undefined,
      sponsorCategory: "",
      location: "",
      priceType: "",
      price: "",
      url: "http://localhost:8000",
      data: [],
      createEditUser: false,
      createUser: false,
      updateUser: false
    }
  }

  componentDidMount(): void {
    axios.get(this.state.url + "/api/getusers")
      .then((response) => {
        this.setState({ data: response.data })
      })
  }

  listUsers = () => {

    const listUsersDiv: JSX.Element[] = []

    this.state.data.forEach((user: any, i: number) => {
      listUsersDiv.push(<div key={i} className="row list-item" >
        <div className="col-4">{user.name}</div>
        <div className="col-4">{user.email}</div>
        <div className="col-4 text-right" id="actions">
          <button className="btn btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" onClick={() => {
            this.setState({ updateUser: true })
            this.setState({ name: user.name })
            this.setState({ contact: user.contact })
            this.setState({ email: user.email })
            this.setState({ password: ""})
            this.setState({ userType: user.user_type.toString()})
            this.setState({ createEditUser: true })
          }}>Edit user</button>
        </div>
      </div>)
    });

    return <>{listUsersDiv}</>

  }

  createAndUpdateUser = () => {
    return (
      <form >
        <br />

        <div className="container">
          <div className="row">
            <div className="col-3"> <div className="mb-3">
              <label className="form-label">Name*</label>
              <input value={this.state.name} onChange={(e) => {
                this.setState({ name: e.target.value })
              }} type="text" className="form-control" />
            </div>
            </div>
            <div className="col-2"> <div className="mb-3">
              <label className="form-label">Contact*</label>
              <input value={this.state.contact} onChange={(e) => {
                this.setState({ contact: e.target.value })
              }} type="text" className="form-control" />
            </div>
            </div>

            <div className="col-3">  <div className="mb-3">
              <label className="form-label">Email*</label>
              <input value={this.state.email} onChange={(e) => {
                this.setState({ email: e.target.value })
              }} type="text" className="form-control" />
            </div>
            </div>
            <div className="col-2"> <div className="mb-3">
              <label className="form-label">Password*</label>
              <input value={this.state.name} onChange={(e) => {
                this.setState({ name: e.target.value })
              }} type="text" className="form-control" />
            </div>

            </div>
            <div className="col-2"> <div className="mb-3">
              <label className="form-label">User Type*</label>
              <select onChange={(e)=>{
                this.setState({userType: e.target.value})
              }} value={this.state.userType == "0" || this.state.userType == "1" ? this.state.userType : "DEFAULT"} className="form-select" id="floatingSelectDisabled" aria-label="Floating label disabled select example">
                <option value="DEFAULT">Select a option</option>
                <option value="0">User</option>
                <option value="1">Admin</option>

              </select>
            </div>
            </div>
          </div>

        </div>


        <hr />

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
              <input type="text" className="form-control" value={this.state.price} onChange={(e) => {
                this.setState({
                  price: e.target.value
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
                    {this.state.createUser ? <button onClick={() => {
                    }} className="btn btn-success" >Create User</button> : null}

                    {this.state.updateUser ? <button onClick={() => {
                    }} className="btn btn-success" >Update User</button> : null}


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
          <div id="createAndUpdateUser">
            <div className="container">
              <div className="row">
                <div className="col-6">  <h3>Users</h3></div>
                <div className="col-6 text-end">
                  <button className="btn btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" onClick={() => {
                    this.setState({ createUser: true })
                    this.setState({ createEditUser: true })
                    this.setState({ name: '' })
                    this.setState({ contact: '' })
                    this.setState({ email: '' })
                    this.setState({ password: '' })
                    this.setState({ userType: '' })


                  }}>Create new user</button>
                </div>
              </div>

              <hr />

              <div className="container container-lists">

                <div className="row">
                  <div className="col-4">Usuario</div>
                  <div className="col-4">Email</div>
                  <div className="col-4 text-right" id="actions">Actions</div>
                </div>
              </div>

              <hr />

              <div className="container container-lists">
                <this.listUsers />
              </div>
            </div>

            <div className="offcanvas offcanvas-bottom h-50" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
              <div className="offcanvas-header bg-black text-white
">
                <h3 className="offcanvas-title" id="offcanvasBottomLabel">{this.state.createUser ? "New User" : "Update User"}</h3>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => {
                  this.setState({ updateUser: false })
                  this.setState({ createUser: false })
                }}></button>
              </div>
              <div className="d-flex flex-column justify-content-center container">

                {this.state.createEditUser ? <this.createAndUpdateUser /> : null}

              </div>
            </div>
          </div>
        </div>

      </>
    )
  }


}