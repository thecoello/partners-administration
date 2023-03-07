import axios from "axios";
import React from "react";
import FormData from "form-data";
interface IProps { }

interface IState {
  priceInputDisabled?: boolean;
  name?: string;
  contact?: string;
  email?: string;
  sponsorCategoryData?: any;
  sponsorCategory: string;
  location?: string;
  locationData?: any;
  priceType?: string;
  price_normal?: string;
  price_all_normal?: string;
  price_all_early?: string;
  price_early?: string;
  priceTotal?: string;
  url?: string;
  data?: any;
  createEditUser?: boolean;
  createUser?: boolean;
  updateUser?: boolean;
  password?: string;
  userType?: string;
  userId?: string;
}

export default class createAndUpdateUser extends React.Component<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      priceInputDisabled: true,
      name: "",
      contact: "",
      email: "",
      password: "",
      userType: undefined,
      sponsorCategoryData: [],
      sponsorCategory: "",
      locationData: [],
      location: "",
      priceType: "",
      price_normal: "",
      price_all_normal: "",
      price_all_early: "",
      price_early: "",
      priceTotal: "",
      url: "http://localhost:8000",
      data: [],
      createEditUser: false,
      createUser: false,
      updateUser: false,
      userId: "",
    };
  }

  componentDidMount(): void {
    axios.get(this.state.url + "/api/getusers").then((response) => {
      this.setState({ data: response.data });
    });

    axios.get(this.state.url + "/api/getpackages").then((response) => {
      this.setState({ sponsorCategoryData: response.data });
    });

    axios.get(this.state.url + "/api/getlocations").then((response) => {
      this.setState({ locationData: response.data });
    });
  }

  componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: any
  ): void {
    if (this.state.sponsorCategory != prevState.sponsorCategory) {
      this.updatePrice();
    } else if (this.state.location != prevState.location) {
      this.updatePrice();
    } else if (this.state.priceType != prevState.priceType) {
      this.updatePrice();
    }
  }

  createUser() {
    var data = new FormData();

    data.append("name", this.state.name);
    data.append("contact", this.state.contact);
    data.append("email", this.state.email);
    data.append("password", this.state.password);
    data.append("user_type", this.state.userType);


    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: this.state.url + "/api/postuser",
      headers: {
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updatePrice = () => {
    console.log(
      Number(this.state.sponsorCategory) +
      " " +
      Number(this.state.location) +
      " " +
      Number(this.state.priceType)
    );

    if (
      Number(this.state.sponsorCategory) > 0 &&
      Number(this.state.location) > 0 &&
      Number(this.state.priceType) > 0
    ) {
      if (
        Number(this.state.priceType) === 1 &&
        Number(this.state.location) < 4
      ) {
        this.setState({ priceTotal: this.state.price_normal });
      }
      if (
        Number(this.state.priceType) === 2 &&
        Number(this.state.location) < 4
      ) {
        this.setState({ priceTotal: this.state.price_early });
      }
      if (
        Number(this.state.priceType) === 1 &&
        Number(this.state.location) === 4
      ) {
        this.setState({ priceTotal: this.state.price_all_normal });
      }
      if (
        Number(this.state.priceType) === 2 &&
        Number(this.state.location) === 4
      ) {
        this.setState({ priceTotal: this.state.price_all_early });
      }
    }
  };

  /*   deleteUser(){
      axios.delete(this.state.url + "/api/deleteuser/" + this.state.userId)
      .then((response) => {
        alert(this.state.sponsorCategoryData)
      })
    } */

  listUsers = () => {
    const listUsersDiv: JSX.Element[] = [];

    this.state.data.forEach((user: any, i: number) => {
      listUsersDiv.push(
        <div key={i} className="row list-item">
          <div className="col-4">{user.name}</div>
          <div className="col-4">{user.email}</div>
          <div className="col-4 text-right" id="actions">
            <button
              className="btn btn-dark"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasBottom"
              aria-controls="offcanvasBottom"
              onClick={() => {
                this.setState({ updateUser: true });
                this.setState({ name: user.name });
                this.setState({ contact: user.contact });
                this.setState({ email: user.email });
                this.setState({ password: "" });
                this.setState({ userType: user.user_type.toString() });
                this.setState({ createEditUser: true });
                this.setState({ userId: user.id });
              }}
            >
              Edit user
            </button>
          </div>
        </div>
      );
    });

    return <>{listUsersDiv}</>;
  };

  getCategorySponsor = () => {
    const sponsorCategoryData: JSX.Element[] = [];

    this.state.sponsorCategoryData.forEach((category: any, i: number) => {
      sponsorCategoryData.push(
        <option onChange={(e) => { }} key={i++} value={i + 1}>
          {category.pack_name}
        </option>
      );
    });

    return <>{sponsorCategoryData}</>;
  };

  getLocations = () => {
    const locationsData: JSX.Element[] = [];

    this.state.locationData.forEach((category: any, i: number) => {
      locationsData.push(
        <option onClick={() => { }} key={i++} value={i + 1}>
          {category.location_name}
        </option>
      );
    });

    return <>{locationsData}</>;
  };

  createAndUpdateUser = () => {
    return (
      <form>
        <br />

        <div className="container">
          <div className="row">
            <div className="col-3">
              {" "}
              <div className="mb-3">
                <label className="form-label">Name*</label>
                <input
                  value={this.state.name}
                  onChange={(e) => {
                    this.setState({ name: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-2">
              {" "}
              <div className="mb-3">
                <label className="form-label">Contact*</label>
                <input
                  value={this.state.contact}
                  onChange={(e) => {
                    this.setState({ contact: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>

            <div className="col-3">
              {" "}
              <div className="mb-3">
                <label className="form-label">Email*</label>
                <input
                  value={this.state.email}
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-2">
              {" "}
              <div className="mb-3">
                <label className="form-label">Password*</label>
                <input
                  value={this.state.password}
                  onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-2">
              {" "}
              <div className="mb-3">
                <label className="form-label">User Type*</label>
                <select
                  onChange={(e) => {
                    this.setState({ userType: e.target.value });
                  }}
                  value={
                    this.state.userType == "0" || this.state.userType == "1"
                      ? this.state.userType
                      : "DEFAULT"
                  }
                  className="form-select"
                  id="floatingSelectDisabled"
                  aria-label="Floating label disabled select example"
                >
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
                <select
                  onChange={(e) => {
                    this.setState({ sponsorCategory: e.target.value });

                    let categorySelected =
                      this.state.sponsorCategoryData[
                      Number(e.target.value) - 1
                      ];

                    this.setState({
                      price_normal: categorySelected.price_normal,
                    });
                    this.setState({
                      price_early: categorySelected.price_early,
                    });
                    this.setState({
                      price_all_normal: categorySelected.price_all_normal,
                    });
                    this.setState({
                      price_all_early: categorySelected.price_all_early,
                    });
                  }}
                  defaultValue={"DEFAULT"}
                  className="form-select"
                  id="floatingSelectDisabled"
                  aria-label="Floating label disabled select example"
                >
                  <option value="DEFAULT">Select a option</option>
                  <this.getCategorySponsor />
                </select>
              </div>
            </div>

            <div className="col">
              {Number(this.state.sponsorCategory) > 0 ? (
                <div className="mb-3">
                  <label className="form-label">Location*</label>
                  <select
                    onChange={(e) => {
                      this.setState({ location: e.target.value });
                    }}
                    defaultValue={"DEFAULT"}
                    className="form-select"
                    id="floatingSelectDisabled"
                    aria-label="Floating label disabled select example"
                  >
                    <option value="DEFAULT">Select a option</option>
                    <this.getLocations />
                  </select>
                </div>
              ) : null}
            </div>

            <div className="col">
              {Number(this.state.location) > 0 ? (
                <div className="mb-3">
                  <label className="form-label">Price type*</label>
                  <select
                    onChange={(e) => {
                      this.setState({ priceType: e.target.value });
                    }}
                    defaultValue={"DEFAULT"}
                    className="form-select"
                    id="floatingSelectDisabled"
                    aria-label="Floating label disabled select example"
                  >
                    <option value="DEFAULT">Select a option</option>
                    <option value="1">Regular</option>
                    <option value="2">Early bird</option>
                  </select>
                </div>
              ) : null}
            </div>

            <div className="col">
              {" "}
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.priceTotal}
                  onChange={(e) => {
                    this.setState({
                      priceTotal: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <br />

          <div className="container">
            <div className="row">
              <div className="col-2">
                <div className="mb-3">
                  <div className="d-flex flex-column text-center ">
                    {this.state.createUser ? (
                      <button onClick={(e) => {
                        e.preventDefault()
                        this.createUser()
                      }} className="btn btn-success">
                        Create User
                      </button>
                    ) : null}

                    {this.state.updateUser ? (
                      <button onClick={() => { }} className="btn btn-success">
                        Update User
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-2">
                {this.state.updateUser ? (
                  <button
                    onClick={() => {
                      /*                  this.deleteUser()
                       */
                    }}
                    className="btn btn-white text-danger"
                  >
                    Delete user
                  </button>
                ) : null}
              </div>
              <div className="col-8"></div>
            </div>
          </div>
        </div>
      </form>
    );
  };

  render(): React.ReactNode {
    return (
      <>
        <div className="section">
          <div id="createAndUpdateUser">
            <div className="container">
              <div className="row">
                <div className="col-6">
                  {" "}
                  <h3>Users</h3>
                </div>
                <div className="col-6 text-end">
                  <button
                    className="btn btn-dark"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasBottom"
                    aria-controls="offcanvasBottom"
                    onClick={() => {
                      this.setState({ createUser: true });
                      this.setState({ createEditUser: true });
                      this.setState({ name: "" });
                      this.setState({ contact: "" });
                      this.setState({ email: "" });
                      this.setState({ password: "" });
                      this.setState({ userType: "" });
                    }}
                  >
                    Create new user
                  </button>
                </div>
              </div>

              <hr />

              <div className="container container-lists">
                <div className="row">
                  <div className="col-4">Usuario</div>
                  <div className="col-4">Email</div>
                  <div className="col-4 text-right" id="actions">
                    Actions
                  </div>
                </div>
              </div>

              <hr />

              <div className="container container-lists">
                <this.listUsers />
              </div>
            </div>

            <div
              className="offcanvas offcanvas-bottom h-50"
              id="offcanvasBottom"
              aria-labelledby="offcanvasBottomLabel"
            >
              <div className="offcanvas-header bg-black text-white">
                <h3 className="offcanvas-title" id="offcanvasBottomLabel">
                  {this.state.createUser ? "New User" : "Update User"}
                </h3>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  onClick={() => {
                    this.setState({ updateUser: false });
                    this.setState({ createUser: false });
                  }}
                ></button>
              </div>
              <div className="d-flex flex-column justify-content-center container">
                {this.state.createEditUser ? (
                  <this.createAndUpdateUser />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
