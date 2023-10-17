import React from "react";
import Forms from "./selectors";
import RequestsRoutes from "../../http/requests";
import { Check } from "@mui/icons-material";

interface IProps {
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
  packData: any
  userId: any
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
      categoryInput: null,
      locationInput: null,
      priceTypeInput: null,
      packData: null,
      userId: ''
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
          
          if(data.user_type != 1){
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


  public render(): React.ReactNode {
    return (
      <>
        <div className="d-flex search mt-4 mb-4">
          <h3 className="m-0">Create Invoice</h3>
          <a href="/invoices" className="btn btn-outline-secondary btn-dark text-light ms-4" type="button" > Cancel </a>
        </div>

        <br />

        <h3>Find User</h3>
        <form>

          <input type="hidden" name="user_id" value={this.state.userId} />
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
          <h3>Upload contract</h3>
                  <div className="mb-3">
                    <label htmlFor="contract_file" className="form-label"> Company Name{" "} </label>
                    <input type="file" className="form-control" id="contract_file" aria-describedby="companyName" />
                  </div>

          <br />
          <h3>Pack Price</h3>
          <div className="row">
            <div className="col-3">
              <div className="mb-3">
                <label htmlFor="sponsorshipCategory" className="form-label"> Sponsorship Category * </label>
                <select onChange={(e) => {
                  this.setState({ categoryInput: e.target.value })
                }} className="form-select" name="category" required> <option value="">Select option</option> {this.state.category} </select>
              </div>
            </div>
            <div className="col-3">
              <div className="mb-3">
                <label htmlFor="sponsorshipCategory" className="form-label"> Location * </label>
                <select onChange={(e) => {
                  this.setState({ locationInput: e.target.value })
                }} className="form-select" name="location" required> <option value="">Select option</option> {this.state.locations} </select>
              </div>
            </div>
            <div className="col-3">
              <div className="mb-3">
                <label htmlFor=">pricetype" className="form-label"> Price type * </label>
                <select onChange={(e) => {
                  this.setState({ priceTypeInput: e.target.value })
                }} className="form-select" name="price" required>
                  <option value="">Select Option</option>
                  <option value="0">Regular</option>
                  <option value="1">Early Bird</option>
                </select>
              </div>
            </div>
            <div className="col-3">
              <div className="mb-3">
                <label htmlFor="price" className="form-label"> Price * </label>
                <input value={this.state.price} onChange={(e) => {
                  this.setState({ price: Number(e.target.value) })
                }} type="text" className="form-control" id="price" aria-describedby="price" required />
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
