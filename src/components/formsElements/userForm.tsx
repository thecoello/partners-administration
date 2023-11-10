import React from "react"
import RequestsRoutes from "../../http/requests"
import { IState, IProps } from "../../models/users/model.usersForm"

export default class UserForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      route: "users",
      title: "",
      companyName: "",
      name: "",
      email: "",
      password: "",
      userType: "",
    }
  }

  getUserData = (id: any) => {
    new RequestsRoutes().get(this.state.route + "/" + id).then((response) => {
      response.data.forEach((data: any) => {
        this.setState({ companyName: data.contact })
        this.setState({ name: data.name })
        this.setState({ email: data.email })
        this.setState({ userType: data.user_type })
      })
    })
  }

  formCreate(e: any) {
    e.preventDefault()
    new RequestsRoutes().post(this.state.route, e.target).then((response) => {
      if(response.status === 200){
        alert("User created")
        window.location.href = "/users"
      }
    }).catch((error)=>{
      alert(error)
    })
  }

  formUpdate(e: any) {
    e.preventDefault()
    new RequestsRoutes()
      .put(this.state.route + "/" + this.props.getUserId(), e.target).then((response) => {
        if(response.status === 200){
          alert("User Updated")
          window.location.href = "/users"
        }
      }).catch((error)=>{
        alert(error)
      })
  }

  componentDidMount(): void {
    if (this.props.getUserId()) {
      this.setState({ title: "Update user" })
      this.getUserData(this.props.getUserId())
    } else {
      this.setState({ title: "Create user" })
    }
  }

  public render(): React.ReactNode {
    return (
      <>
        <div className="d-flex search mt-4 mb-4">
          <h3 className="m-0">{this.state.title}</h3>
          <a
            href="/users"
            className="btn btn-outline-secondary btn-dark text-light ms-4"
            type="button"
          >
            Cancel
          </a>
        </div>

        <form
          className="needs-validation"
          onSubmit={
            this.props.getUserId()
              ? this.formUpdate.bind(this)
              : this.formCreate.bind(this)
          }
        >
          <div className="row">
            <div className="col-4">
              <div className="mb-3">
                <label htmlFor="contact" className="form-label">
                  Company Name {this.props.getUserId() ? null : "*"}
                </label>
                <input
                  onChange={(e) => {
                    this.setState({ companyName: e.target.value })
                  }}
                  value={
                    this.props.getUserId() ? this.state.companyName : undefined
                  }
                  required={this.props.getUserId() ? false : true}
                  type="text"
                  className="form-control"
                  id="contact"
                  name="contact"
                />
              </div>
            </div>
            <div className="col-4">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name {this.props.getUserId() ? null : "*"}
                </label>
                <input
                  onChange={(e) => {
                    this.setState({ name: e.target.value })
                  }}
                  value={this.props.getUserId() ? this.state.name : undefined}
                  required={this.props.getUserId() ? false : true}
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                />
              </div>
            </div>
            <div className="col-4">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email {this.props.getUserId() ? null : "*"}
                </label>
                <input
                  onChange={(e) => {
                    this.setState({ email: e.target.value })
                  }}
                  value={this.props.getUserId() ? this.state.email : undefined}
                  required={this.props.getUserId() ? false : true}
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password {this.props.getUserId() ? null : "*"}
                </label>
                <input
                  onChange={(e) => {
                    this.setState({ password: e.target.value })
                  }}
                  value={
                    this.props.getUserId() ? this.state.password : undefined
                  }
                  required={this.props.getUserId() ? false : true}
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                />
              </div>
            </div>
            <div className="col-4">
              <div className="mb-3">
                <label htmlFor="user_type" className="form-label">
                  User Type {this.props.getUserId() ? null : "*"}
                </label>

                <select
                  onChange={(e) => {
                    this.setState({ userType: e.target.value })
                  }}
                  value={
                    this.props.getUserId() ? this.state.userType : undefined
                  }
                  className="form-select"
                  name="user_type"
                  required
                >
                  <option value="">Select option</option>
                  <option value="0">User</option>
                  <option value="1">Admin</option>
                </select>
              </div>
            </div>
          </div>

          <hr />

          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
      </>
    )
  }
}
