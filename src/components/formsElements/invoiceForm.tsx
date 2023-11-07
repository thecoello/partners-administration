import React from "react";
import Forms from "./selectors";
import RequestsRoutes from "../../http/requests";
import { Check } from "@mui/icons-material";

interface IProps {
  getInvoiceId: any
}
interface IState {
  category: JSX.Element[]
  locations: JSX.Element[]
  routePacks: string | null
  routeUser: string | null
  search: string
  usersRows: JSX.Element[]
  userFounded: boolean
  userData: any
  price: number
  packName: String
  categoryInput: any
  locationInput: any
  priceTypeInput: any
  categoryValue: any
  locationValue: any
  priceTypeValue: any
  packData: any
  userId: any
  route: any
  title: String
}

export default class InvoiceForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      category: [],
      locations: [],
      routePacks: "packages",
      routeUser: "users",
      search: "",
      usersRows: [],
      userFounded: false,
      userData: null,
      price: 0,
      packName: '',
      categoryInput: '',
      locationInput: '',
      priceTypeInput: '',
      categoryValue: '',
      locationValue: '',
      priceTypeValue: '',
      packData: null,
      userId: '',
      route: "invoices",
      title: ""
    };
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
    prevState.routePacks != this.state.routePacks ? this.getUsers() : null;
    if ((this.state.categoryInput != prevState.categoryInput) || (this.state.locationInput != prevState.locationInput) || (this.state.priceTypeInput != prevState.priceTypeInput)) {
      this.priceCalculation()
    }
  }

  componentDidMount(): void {
    this.getPackInfo()
    if (this.props.getInvoiceId()) {
      this.setState({ title: "Update Invoice" })
    } else {
      this.setState({ title: "Create Invoice" })
    }
  }

  priceCalculation(): void {
    this.state.packData.forEach((pack: any) => {
      if (pack.pack_name === this.state.categoryInput) {

        if (this.state.locationInput == 0 && this.state.priceTypeInput == 0) {
          this.setState({ price: pack.price_normal })
        } else if (this.state.locationInput == 0 && this.state.priceTypeInput == 1) {
          this.setState({ price: pack.price_early })
        } else if (this.state.locationInput == 1 && this.state.priceTypeInput == 0) {
          this.setState({ price: pack.price_all_normal })
        } else if (this.state.locationInput == 1 && this.state.priceTypeInput == 1) {
          this.setState({ price: pack.price_all_early })
        }
      } else if (!this.state.categoryInput || !this.state.locationInput || !this.state.priceTypeInput) {
        this.setState({ price: 0 })
      }
    });
  }



  getUsers(): void {
    new RequestsRoutes().get(this.state.routePacks).then((response) => {
      let usersRow: JSX.Element[] = [];

      if (response.status === 200) {
        response.data.data.forEach((data: any, i: any) => {

          if (data.user_type != 1) {
            usersRow.push(<tr key={i + 'user'} className={data.id == this.state.userId ? "p-2 align-middle bg-success text-light" : "p-2 align-middle"}>
              <th scope="col">
                <h6 className="m-0">
                  <b>{data.contact}</b>
                </h6>
              </th>
              <th scope="col">
                <p className="m-0">
                  <b>{data.name}</b>
                </p>
              </th>
              <th scope="col">
                <p className="m-0">{data.user_type == 1 ? "Admin" : "User"}</p>
              </th>
              <th scope="col">
                <p className="m-0">{data.email}</p>
              </th>
              <th scope="col">
                <div className="d-flex">
                  <button onClick={() => {
                    this.setState({ userData: data })
                    this.setState({ userId: data.id })
                    this.getUsers()
                  }} type="button" className="btn-dark btn btn-sm">
                    <Check />
                  </button>
                </div>
              </th>
            </tr>);
          }

        });
        this.setState({ userFounded: true });
        this.setState({ usersRows: usersRow });
      } else {
        alert(response.data.message)
      }
    });
  }

  getPackInfo(): void {
    new RequestsRoutes().get(this.state.routePacks).then((response) => {
      let category: JSX.Element[] = [];
      let locations: JSX.Element[] = [];

      this.setState({ packData: response.data.packinfo })

      response.data.packinfo.forEach((data: any, i: any) => {
        category.push(<option key={i + 'packinfo'} value={data.pack_name}>{data.pack_name}</option>);
      });

      response.data.locations.forEach((data: any, i: any) => {
        locations.push(<option key={i + 'location'} value={data.type}>{data.location_name}</option>);
      });

      this.setState({ category: category });
      this.setState({ locations: locations });
    });
  }


  formCreate(e: any) {
    e.preventDefault()

    if (this.state.userId) {
      new RequestsRoutes().post(this.state.route, e.target).then((response) => {
        if (response.status === 200) {
          alert("Invoice created")
          window.location.href = "/invoices"
        }
      }).catch((error) => {
        alert(error)
      })
    } else {
      alert("You must assign a user to the invoice")
    }
  }

  formUpdate(e: any) {
    if (this.state.userId) {
      new RequestsRoutes()
        .put(this.state.route + "/" + this.props.getInvoiceId(), e.target).then((response) => {
          if (response.status === 200) {
            alert("Invoice Updated")
            window.location.href = "/invoices"
          }
        }).catch((error) => {
          alert(error)
        })
    } else {
      alert("You must assign a user to the invoice")
    }
  }


  public render(): React.ReactNode {
    return (
      <>
        <div className="d-flex search mt-4 mb-4">
          <h3 className="m-0">{this.state.title}</h3>
          <a href="/invoices" className="btn btn-outline-secondary btn-dark text-light ms-4" type="button" > Cancel </a>
        </div>

        <br />

        <h3>Find and select user</h3>
        <form encType="multipart/form-data" onSubmit={
          this.props.getInvoiceId()
            ? this.formUpdate.bind(this)
            : this.formCreate.bind(this)
        }>

          <input type="hidden" name="user_id" value={this.state.userId} />
          <input type="hidden" name="category" value={this.state.categoryValue} />
          <input type="hidden" name="location" value={this.state.locationValue} />
          <input type="hidden" name="pricetype" value={this.state.priceTypeValue} />

          <div className="mb-3">
            <div className="input-group w-100">

              <input onChange={(e) => { this.setState({ search: e.target.value }); }} onKeyDown={(e) => { e.code == "Enter" || e.code == "NumpadEnter" ? this.state.search == "" ? this.setState({ routePacks: "users" }) : this.setState({ routePacks: "users/search/" + this.state.search.split(".")[0], }) : null; }} type="text" className="form-control" placeholder="Find by User name, email or Company Name" />

              <button className="btn btn-outline-secondary btn-dark text-light " type="button" onClick={() => { this.state.search ? this.setState({ routePacks: "users/search/" + this.state.search, }) : this.setState({ routePacks: "users" }); }} > Search </button>
            </div>
          </div>
          {this.state.userFounded ? (<table className="table ">
            <thead>
              <tr>
                <th scope="col">Company Name</th>
                <th scope="col">Name</th>
                <th scope="col">User type</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>{this.state.usersRows}</tbody>
          </table>) : null}

          <br />
          <h3>Upload contract *</h3>
          <div className="mb-3">
            <input type="file" className="form-control" name="contract_file" id="contract_file" aria-describedby="contract_file" required/>
          </div>

          <br />
          <h3>Sponsorship pack price</h3>
          <div className="row">
            <div className="col-3">
              <div className="mb-3">
                <label htmlFor="category-null" className="form-label"> Sponsorship Category * </label>
                <select onChange={(e) => {
                  this.setState({ categoryInput: e.target.value })
                  this.setState({ categoryValue: e.target.selectedOptions})
                }} className="form-select" name="category-null" id="category-null" aria-describedby="category-null" required> <option value="">Select option</option> {this.state.category} </select>
              </div>
            </div>
            <div className="col-3">
              <div className="mb-3">
                <label htmlFor="location-null" className="form-label"> Location * </label>
                <select onChange={(e) => {
                  this.setState({ locationInput: e.target.value })
                  this.setState({ locationValue: e.target.selectedOptions})

                }} className="form-select" name="location-null" id="location-null" aria-describedby="location-null" required> <option value="">Select option</option> {this.state.locations} </select>
              </div>
            </div>
            <div className="col-3">
              <div className="mb-3">
                <label htmlFor="pricetype-null" className="form-label"> Price type * </label>
                <select onChange={(e) => {

                  console.log(e.target)
                  this.setState({ priceTypeInput: e.target.value })
                  this.setState({ priceTypeValue: e.target.selectedIndex})

                  this
                }} className="form-select" name="pricetype-null" id="pricetype-null" aria-describedby="pricetype-null" required>
                  <option value="">Select Option</option>
                  <option value="0">Regular</option>
                  <option value="1">Early Bird</option>
                </select>
              </div>
            </div>
            <div className="col-3">
              <div className="mb-3">
                <label htmlFor="subtotal" className="form-label"> Price * </label>
                <input value={this.state.price} onChange={(e) => {
                  this.setState({ price: Number(e.target.value) })
                }} type="text" className="form-control" name="subtotal" id="subtotal" aria-describedby="subtotal" required />
              </div>
            </div>
          </div>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"> Add partner's tax information </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <h3>Partner Invoice Information </h3>
                  <div className="mb-3">
                    <label htmlFor="companyName" className="form-label"> Company Name{" "} </label>
                    <input type="text" className="form-control" id="companyName" aria-describedby="companyName" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label"> Address{" "} </label>
                    <input type="text" className="form-control" id="address" aria-describedby="addresss" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="zipCode" className="form-label"> ZIP/Postal Code{" "} </label>
                    <input type="text" className="form-control" id="zipCode" aria-describedby="zipCode" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="country" className="form-label"> Country{" "} </label>
                    <Forms />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="country" className="form-label"> Vat Number{" "} </label>
                    <input type="text" className="form-control" id="country" aria-describedby="country" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br /><br />
          <button type="submit" className="btn btn-dark"> Submit </button>
        </form>
      </>
    );
  }
}
