import React from "react";
import Forms from "./selectors";
import RequestsRoutes from "../../http/requests";

interface IProps {
  invoiceTableState: any
}
interface IState {
  category: JSX.Element[];
  locations: JSX.Element[];
  route: string | null;
  routeUser: string | null;
}

export default class InvoiceForm extends React.Component<IProps, IState>{

  constructor(props: IProps) {
    super(props);
    this.state = {
      category: [],
      locations: [],
      route: "packages",
      routeUser: "users"
    };
  }

  getPackInfo(): void {
    new RequestsRoutes().get(this.state.route).then((response) => {

      let category: JSX.Element[] = [];
      let locations: JSX.Element[] = [];

      response.data.packinfo.forEach((data, i) => {
        category.push(<option key={i}>{data.pack_name}</option>)
      })

      response.data.locations.forEach((data, i) => {
        locations.push(<option key={i}>{data.location_name}</option>)
      })

      this.setState({category: category})
      this.setState({locations: locations})
    })

  }

  getUser(): void {
    new RequestsRoutes().get(this.state.route).then((response) => {

      let category: JSX.Element[] = [];
      let locations: JSX.Element[] = [];

      response.data.packinfo.forEach((data, i) => {
        category.push(<option key={i}>{data.pack_name}</option>)
      })

      response.data.locations.forEach((data, i) => {
        locations.push(<option key={i}>{data.location_name}</option>)
      })

      this.setState({category: category})
      this.setState({locations: locations})
    })

  }


  componentDidMount(): void {
    this.getPackInfo()
  }

  public render(): React.ReactNode {
    return (

      <>
        <div className="d-flex search mt-4 mb-4">

          <h3 className="m-0">Create Invoice</h3>

          <button onClick={this.props.invoiceTableState}
              className="btn btn-outline-secondary btn-dark text-light ms-4"
              type="button">
              Cancel
            </button>
            

        </div>

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
            <Forms />
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">Vat Number *</label>
            <input type="text" className="form-control" id="country" aria-describedby="country" />
          </div>

          <h3>Pack Price</h3>
              <br />

              <div className="row">
                <div className="col-3">
                  <div className="mb-3">
                    <label htmlFor="sponsorshipCategory" className="form-label">
                      Sponsorship Category *
                    </label>
                    <select className="form-select" name="category">
                    {this.state.category}
                    </select>
                  </div>
                </div>
                <div className="col-3">
                  <div className="mb-3">
                    <label htmlFor="sponsorshipCategory" className="form-label">
                      Location *
                    </label>
                    <select className="form-select" name="location">
                      {this.state.locations}
                    </select>
                  </div>
                </div>
                <div className="col-3">
                  <div className="mb-3">
                    <label htmlFor=">pricetype" className="form-label">
                      Price type *
                    </label>
                    <select className="form-select" name="price">
                      <option value=""></option>
                    </select>{" "}
                  </div>
                </div>
                <div className="col-3">
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Price *
                    </label>
                    <select className="form-select" name="price">
                      <option value=""></option>
                    </select>{" "}
                  </div>
                </div>
              </div>

          <button type="submit" className="btn btn-dark">Submit</button>
        </form>
      </>

    )
  }

}