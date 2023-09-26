import React from "react";
import RequestsRoutes from "../../http/requests";
import { stringify } from "qs";

interface IProps {
  userTableState: any;
}

interface IState {
  route: null | string,

}

export default class UserForm extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      route: "users",
    };
  }

  formSend(e: any) {
    e.preventDefault();
    new RequestsRoutes().post(this.state.route,e.target)
    .then(response=>{

      response.status === 200 ? alert("User created") :  Object.keys(response.response.data).map((key)=>{
        alert(response.response.data[key])
      })

    })
  }

  public render(): React.ReactNode {
    return (
          <>
            <div className="d-flex search mt-4 mb-4">
              <h3 className="m-0">Create User</h3>

              <button
                onClick={this.props.userTableState}
                className="btn btn-outline-secondary btn-dark text-light ms-4"
                type="button"
              >
                Cancel
              </button>
            </div>

            <form className="needs-validation" onSubmit={this.formSend.bind(this)}>
              <div className="row">
                <div className="col-4">
                  <div className="mb-3">
                    <label htmlFor="contact" className="form-label">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="contact"
                      name="contact" required
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name" required
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email" required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password *
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password" required
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div className="mb-3">
                    <label htmlFor="user_type" className="form-label">
                      User Type *
                    </label>
                    <select className="form-select" name="user_type" required>
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
          );
  }
}