import React from "react";
import CountrySelector from "./selectors";
import RequestsRoutes from "../../http/requests";
import { Check, Warning, WarningAmber } from "@mui/icons-material";
import { IProps, IState } from "../../models/invoices/model.invoicesForm";
import InvoicePDF from "../invoiceComponents/invoicePDF";

export default class InvoiceForm extends React.Component<IProps, IState> {
  constructor(props: IProps, states: IState) {
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
      title: "",
      invoiceTable: [],
      invoiceData: null,
      eventData: null,
      companyName: '',
      address: '',
      zip: '',
      country: '',
      vat: '',
      coupons: '',
      paymentStatus: null,
      paymentMethod: ''

    };
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
    prevState.routePacks != this.state.routePacks ? this.getUsers() : null;
    if ((this.state.categoryInput != prevState.categoryInput) || (this.state.locationInput != prevState.locationInput) || (this.state.priceTypeInput != prevState.priceTypeInput)) {
      this.priceCalculation()
    }

    if (this.props.getInvoiceId() && this.state.invoiceData != prevState.invoiceData) {
      this.setState({ userId: this.state.invoiceData.user_id })
      this.setState({ categoryValue: this.state.invoiceData.category })
      this.setState({ locationValue: this.state.invoiceData.location })
      this.setState({ priceTypeValue: this.state.invoiceData.pricetype })
      this.setState({ price: this.state.invoiceData.subtotal })
      this.setState({ companyName: this.state.invoiceData.company_name })
      this.setState({ address: this.state.invoiceData.address })
      this.setState({ zip: this.state.invoiceData.zip })
      this.setState({ country: this.state.invoiceData.country })
      this.setState({ vat: this.state.invoiceData.vat })
      this.setState({ coupons: this.state.invoiceData.coupons })
      this.setState({ paymentStatus: this.state.invoiceData.payment_status })
      this.setState({ paymentMethod: this.state.invoiceData.payment_method })



    }
  }

  componentDidMount(): void {
    this.getPackInfo()
    if (this.props.getInvoiceId()) {
      this.setState({ title: "Update Invoice" })
      this.getInvoiceData(this.props.getInvoiceId())
    } else {
      this.setState({ title: "Create Invoice" })
    }

  }

  getInvoiceData = (id: any) => {
    new RequestsRoutes().get(this.state.route + "/" + id).then((response) => {
      let invoiceTable: JSX.Element[] = [];

      const invoice = response.data.invoices.data[0]
      const event = response.data.eventinfo[0]

      this.setState({ eventData: event })
      this.setState({ invoiceData: invoice })

      invoiceTable.push(
        <div key={"invoice" + invoice.invoice_number} className="card">
          <div className="card-body">

            <div className="row">
              <div className="col-4">            <h2 className="m-0">Invoice {invoice.invoice_number}</h2>
                {invoice.payment_status == "Payed"  ? (
                  <span className="badge rounded-pill text-bg-success">
                    Payed
                  </span>
                ) : (
                  <span className="badge rounded-pill text-bg-danger">
                    Unpayed
                  </span>
                )}
              </div>
              <div className="col-4">            <p className="m-0"><b>{invoice.invoice_date != null ? null : <Warning />} Invoice date:</b> {invoice.invoice_date != null ? invoice.invoice_date : <span>Missing information</span>}</p>
                <p className="m-0"><b>{invoice.payment_method != null ? null : <Warning />} Payment method:</b> {invoice.payment_method != null ? invoice.payment_method : <span>Missing information</span>}</p>
              </div>
              <div className="col-2">
                {invoice.company_name && invoice.address && invoice.zip && invoice.country && invoice.vat ? <button onClick={() => {
                  new InvoicePDF(invoice, event).generateInvoice();
                }} className="btn btn-dark m-1 w-100">Download Invoice</button> : <p className="text-danger">In order to generate the invoice, the tax information is required</p>}

              </div>
              <div className="col-2">


                <a target="_blank" href={'http://localhost:8000/' + invoice.contract_file} className="btn btn-outline-dark m-1 w-100">Download contract</a>
              </div>
            </div>

            <hr />

            <div className="row">
              <div className="col-3">
                <span className="badge rounded-pill text-bg-dark mb-1">
                  Tax Information
                </span>
                <p className="m-0"><b> {invoice.company_name != null ? null : <Warning />} Company name:</b> {invoice.company_name != null ? invoice.company_name : <span>Missing information</span>}</p>
                <p className="m-0"><b>{invoice.vat != null ? null : <Warning />} VAT:</b> {invoice.vat != null ? invoice.vat : <span>Missing information</span>}</p>
                <p className="m-0"><b>{invoice.address != null ? null : <Warning />} Address:</b> {invoice.address != null ? invoice.address : <span>Missing information</span>}</p>
                <p className="m-0"><b>{invoice.zip != null ? null : <Warning />} Zip:</b> {invoice.zip != null ? invoice.zip : <span>Missing information</span>}</p>
                <p className="m-0"><b>{invoice.country != null ? null : <Warning />} Country:</b> {invoice.country != null ? invoice.country : <span>Missing information</span>}</p>
              </div>

              <div className="col-3">
                <span className="badge rounded-pill text-bg-dark mb-1">
                  Pack Information
                </span>
                <p className="m-0"><b>{invoice.category != null ? null : <Warning />} Cateogry:</b> {invoice.category != null ? invoice.category : <span>Missing information</span>}</p>
                <p className="m-0"><b>{invoice.location != null ? null : <Warning />} Location:</b> {invoice.location != null ? invoice.location : <span>Missing information</span>}</p>
                <p className="m-0"><b>{invoice.pricetype != null ? null : <Warning />} Pricetype:</b> {invoice.pricetype != null ? invoice.pricetype : <span>Missing information</span>}</p>

              </div>

              <div className="col-3">
                <span className="badge rounded-pill text-bg-dark mb-1">
                  User Information
                </span>
                <p className="m-0"><b>{invoice.contact != null ? null : <Warning />} Company name:</b> {invoice.contact != null ? invoice.contact : <span>Missing information</span>}</p>
                <p className="m-0"><b>{invoice.name != null ? null : <Warning />} Name:</b> {invoice.name != null ? invoice.name : <span>Missing information</span>}</p>
                <p className="m-0"><b>{invoice.email != null ? null : <Warning />} Email:</b> {invoice.email != null ? invoice.email : <span>Missing information</span>}</p>

              </div>

              <div className="col-3">
                <span className="badge rounded-pill text-bg-dark mb-1">
                  Description and price
                </span>
                <p className="m-0"><b>{invoice.category && invoice.location && invoice.pricetype != null ? null : <Warning />} </b> {invoice.category && invoice.location && invoice.pricetype != null ? invoice.quantity + " - " + invoice.category + " - " + invoice.location + " - (" + invoice.pricetype + ")" : <span>Missing information</span>}</p>
                <hr />
                <h5 className="m-1"><b>{invoice.subtotal != null ? null : <Warning />} Subtotal:</b> {invoice.subtotal != null ? invoice.subtotal + event.symbol : <span>Missing information</span>}</h5>
                <h5 className="m-1"><b>{invoice.iva != null ? null : <Warning />} IVA:</b> {invoice.iva != null ? invoice.iva + event.symbol : <span>Missing information</span>}</h5>
                <h5 className="m-1"><b>{invoice.total != null ? null : <Warning />} Total:</b> {invoice.total != null ? invoice.total + event.symbol : <span>Missing information</span>}</h5>
              </div>
            </div>

            {invoice.coupons ? <div className="row">
              <div className="col-12">
                <p>Coupons: {invoice.coupons}</p>
              </div>
            </div> : null}
          </div>
        </div>)
      this.setState({ invoiceTable: invoiceTable })
    });
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
          window.location.href = "/" + this.state.route
        }
      }).catch((error) => {
        alert(error)
      })
    } else {
      alert("You must assign a user to the invoice")
    }
  }

  formUpdate(e: any) {
    e.preventDefault()
    if (this.state.userId) {
      new RequestsRoutes().putPost(this.state.route + "/" + this.props.getInvoiceId(), e.target).then((response) => {
        if (response.status === 200) {
          alert("Invoice Updated")
          window.location.href = "/" + this.state.route
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

        {this.props.getInvoiceId() ? this.state.invoiceTable : null}

        <div className="d-flex search mt-4 mb-4">
          <h3 className="m-0">{this.state.title}</h3>
          <a href="/invoices" className="btn btn-outline-secondary btn-dark text-light ms-4" type="button" > Cancel </a>
        </div>

        <h5>Find and select user</h5>

        <div className="mb-3">
          <div className="input-group w-100">

            <input onChange={(e) => { this.setState({ search: e.target.value }); }} onKeyDown={(e) => { e.code == "Enter" || e.code == "NumpadEnter" ? this.state.search == "" ? this.setState({ routePacks: "users" }) : this.setState({ routePacks: "users/search/" + this.state.search.split(".")[0], }) : null; }} type="text" className="form-control" placeholder="Find by User name, email or Company Name" />

            <button className="btn btn-outline-secondary btn-dark text-light " type="button" onClick={() => { this.state.search ? this.setState({ routePacks: "users/search/" + this.state.search, }) : this.setState({ routePacks: "users" }); }} > Search </button>
          </div>
        </div>

        <form encType="multipart/form-data" className="needs-validation" onSubmit={this.props.getInvoiceId() ? this.formUpdate.bind(this) : this.formCreate.bind(this)}>

        

          {this.props.getInvoiceId() ? 
         <>
          <div className="row">
          <div className="col-6">
            <div className="mb-3">
            <label htmlFor="country" className="form-label"> Payment status </label>
            <select className="form-select" onChange={(e) => {
              this.setState({ paymentStatus: e.target.value })
            }} value={this.props.getInvoiceId() ? this.state.paymentStatus : ''} name="payment_status">
              <option value="">Select option</option>
              <option value="Payed">Payed</option>
              <option value="Unpayed">Unpayed</option>
            </select>
          </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
            <label htmlFor="country" className="form-label"> Payment method </label>
            <select className="form-select" onChange={(e) => {
              this.setState({ paymentMethod: e.target.value })
            }} value={this.props.getInvoiceId() ? this.state.paymentMethod : ''} name="payment_method" >
              <option value="">Select option</option>
              <option value="Bank transfer">Bank transfer</option>
              <option value="PayPal">PayPal</option>
            </select>
          </div>
          </div>
        </div>
          
          <div className="col bg-dark p-4 mt-2 mb-2 rounded">
            <div className="mb-3">
              <label htmlFor="coupons" className="form-label text-light"><h4>Add Coupons</h4> (For multiple coupons separate them by comma) </label>
              <input type="text" className="form-control" onChange={(e) => {
                this.setState({ coupons: e.target.value })
              }} value={this.props.getInvoiceId() ? this.state.coupons : ''} name="coupons" id="coupons" aria-describedby="coupons" />
            </div>
          </div>
         </> 
          : null}

          <input type="hidden" name="user_id" value={this.state.userId} />
          <input type="hidden" name="category" value={this.state.categoryValue} />
          <input type="hidden" name="location" value={this.state.locationValue} />
          <input type="hidden" name="pricetype" value={this.state.priceTypeValue} />

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

          <div className="row">

            <div className="col">
              <div className="mb-3">
                <label htmlFor="contract_file" className="form-label"> Upload contract </label>
                <input type="file" className="form-control" name="contract_file" id="contract_file" aria-describedby="contract_file" required={this.props.getInvoiceId() ? false : true} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <div className="mb-3">
                <label htmlFor="categorynull" className="form-label"> Sponsorship Category * </label>
                <select onChange={(e) => {
                  this.setState({ categoryInput: e.target.value })
                  this.setState({ categoryValue: e.target.options[e.target.options.selectedIndex].text })
                }} className="form-select" name="categorynull" id="categorynull" aria-describedby="categorynull" required={this.props.getInvoiceId() ? false : true}> <option value="">Select option</option> {this.state.category} </select>
              </div>
            </div>
            <div className="col-3">
              <div className="mb-3">
                <label htmlFor="locationnull" className="form-label"> Location * </label>
                <select onChange={(e) => {
                  this.setState({ locationInput: e.target.value })
                  this.setState({ locationValue: e.target.options[e.target.options.selectedIndex].text })

                }} className="form-select" name="locationnull" id="locationnull" aria-describedby="locationnull" required={this.props.getInvoiceId() ? false : true}> <option value="">Select option</option> {this.state.locations} </select>
              </div>
            </div>
            <div className="col-3">
              <div className="mb-3">
                <label htmlFor="pricetypenull" className="form-label"> Price type * </label>
                <select onChange={(e) => {
                  this.setState({ priceTypeInput: e.target.value })
                  this.setState({ priceTypeValue: e.target.options[e.target.options.selectedIndex].text })
                }} className="form-select" name="pricetypenull" id="pricetypenull" aria-describedby="pricetypenull" required={this.props.getInvoiceId() ? false : true}>
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
                    <label htmlFor="company_name" className="form-label"> Company Name </label>
                    <input type="text" className="form-control" onChange={(e) => {
                      this.setState({ companyName: e.target.value })
                    }} value={this.props.getInvoiceId() ? this.state.companyName : ''} name="company_name" id="company_name" aria-describedby="company_name" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label"> Address </label>
                    <input type="text" className="form-control" onChange={(e) => {
                      this.setState({ address: e.target.value })
                    }} value={this.props.getInvoiceId() ? this.state.address : ''} name="address" id="address" aria-describedby="addresss" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="zip" className="form-label"> ZIP/Postal Code </label>
                    <input type="text" className="form-control" onChange={(e) => {
                      this.setState({ zip: e.target.value })
                    }} value={this.props.getInvoiceId() ? this.state.zip : ''} name="zip" id="zip" aria-describedby="zip" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="country" className="form-label"> Country </label>
                    <select className="form-select" onChange={(e) => {
                      this.setState({ country: e.target.value })
                    }} value={this.props.getInvoiceId() ? this.state.country : ''} name="country" key={'country-selector'}>
                      <CountrySelector />
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="vat" className="form-label"> Vat Number </label>
                    <input type="text" className="form-control" onChange={(e) => {
                      this.setState({ vat: e.target.value })
                    }} value={this.props.getInvoiceId() ? this.state.vat : ''} name="vat" id="vat" aria-describedby="vat" />
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