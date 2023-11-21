import React from "react"
import RequestsRoutes from "../../http/requests"
import { Check, Warning, WarningAmber } from "@mui/icons-material"
import { IProps, IState } from "../../models/invoices/model.invoicesForm"
import InvoiceElements from "./invoiceElements/invoiceElements"

export default class InvoiceForm extends React.Component<IProps, IState> {

  _invoiceElements = new InvoiceElements()

  constructor(props: IProps, states: IState) {
    super(props)

    this.state = {
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
      paymentStatus: '',
      paymentMethod: '',
      loaded: false
    }
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {

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
    this.getPackData()
    if (this.props.getInvoiceId()) {
      this.setState({ title: "Update Invoice" })
      this.getInvoiceData(this.props.getInvoiceId())
      this.setState({loaded: true})
    } else {
      this.setState({ title: "Create Invoice" })
      this.setState({ loaded: true })
    }

  }

  getInvoiceData(id: any) {
    new RequestsRoutes().get(this.state.route + "/" + id).then((response) => {
      this.setState({ invoiceData: response.data })
    })
  }

  getUserData(id: any) {
    new RequestsRoutes().get(this.state.route + "/" + id).then((response) => {
      this.setState({ userData: response.data })
    })
  }

  getPackData() {
    new RequestsRoutes().get(this.state.routePacks).then((response) => {
      this.setState({ packData: response.data })
    })
  }

  priceCalculation(): void {
    this.state.packData.forEach((pack: any) => {
      if (pack.pack_name === this.state.categoryInput) {
        if (this.state.locationInput == 0 && this.state.priceTypeInput == 0) {
          return pack.price_normal
        } else if (this.state.locationInput == 0 && this.state.priceTypeInput == 1) {
          return pack.price_early
        } else if (this.state.locationInput == 1 && this.state.priceTypeInput == 0) {
          return pack.price_all_normal
        } else if (this.state.locationInput == 1 && this.state.priceTypeInput == 1) {
          return pack.price_all_early
        }
      } else if (!this.state.categoryInput || !this.state.locationInput || !this.state.priceTypeInput) {
        return 0
      }
    })
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
          this.setState({ loaded: false })
          alert("Invoice Updated")
          this.getInvoiceData(this.props.getInvoiceId())
        }
      }).catch((error) => {
        alert(error)
      })
    } else {
      alert("You must assign a user to the invoice")
    }
  }

  preRender() {
    return (
        <>
        {this.props.getInvoiceId() ? this._invoiceElements.invoiceResume(this.state.invoiceData) : null}

          <div className="d-flex search mt-4 mb-4">
            <h3 className="m-0">{this.state.title}</h3>
            <a href="/invoices" className="btn btn-outline-secondary btn-dark text-light ms-4" type="button" > Cancel </a>
          </div>

          <h5>Find and select user</h5>

          <div className="mb-3">
            <div className="input-group w-100">
              <input onChange={(e) => { this.setState({ search: e.target.value }) }} onKeyDown={(e) => { e.code == "Enter" || e.code == "NumpadEnter" ? this.state.search == "" ? this.setState({ routePacks: "users" }) : this.setState({ routePacks: "users/search/" + this.state.search.split(".")[0], }) : null }} type="text" className="form-control" placeholder="Find by User name, email or Company Name" />
              <button className="btn btn-outline-secondary btn-dark text-light " type="button" onClick={() => { this.state.search ? this.setState({ routePacks: "users/search/" + this.state.search, }) : this.setState({ routePacks: "users" }) }} > Search </button>
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

                {this.props.getInvoiceId() ? <div className="col bg-dark p-4 mt-2 mb-2 rounded">
                  <div className="mb-3">
                    <label htmlFor="coupons" className="form-label text-light"><h4>Add Coupons</h4> (For multiple coupons separate them by comma) </label>
                    <input type="text" className="form-control" onChange={(e) => {
                      this.setState({ coupons: e.target.value })
                    }} value={this.props.getInvoiceId() ? this.state.coupons : ''} name="coupons" id="coupons" aria-describedby="coupons" />
                  </div>
                </div> : null}
              </>
              : null}

            <input type="hidden" name="user_id" value={this.state.userId} />
            <input type="hidden" name="category" value={this.state.categoryValue} />
            <input type="hidden" name="location" value={this.state.locationValue} />
            <input type="hidden" name="pricetype" value={this.state.priceTypeValue} />

            {this.state.userFounded ? this._invoiceElements.getUsers(this.state.userData, this.state.userId): null}

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
                  }} className="form-select" id="categorynull" aria-describedby="categorynull" required={this.props.getInvoiceId() ? false : true}> <option value="">Select option</option> {this._invoiceElements.getCategory(this.state.packData)} </select>
                </div>
              </div>
              <div className="col-3">
                <div className="mb-3">
                  <label htmlFor="locationnull" className="form-label"> Location * </label>
                  <select onChange={(e) => {
                    this.setState({ locationInput: e.target.value })
                    this.setState({ locationValue: e.target.options[e.target.options.selectedIndex].text })

                  }} className="form-select" id="locationnull" aria-describedby="locationnull" required={this.props.getInvoiceId() ? false : true}> <option value="">Select option</option> {this._invoiceElements.getLocations(this.state.packData)} </select>
                </div>
              </div>
              <div className="col-3">
                <div className="mb-3">
                  <label htmlFor="pricetypenull" className="form-label"> Price type * </label>
                  <select onChange={(e) => {
                    this.setState({ priceTypeInput: e.target.value })
                    this.setState({ priceTypeValue: e.target.options[e.target.options.selectedIndex].text })
                  }} className="form-select" id="pricetypenull" aria-describedby="pricetypenull" required={this.props.getInvoiceId() ? false : true}>
                    <option value="">Select Option</option>
                    <option value="0">Regular</option>
                    <option value="1">Early Bird</option>
                  </select>
                </div>
              </div>
              <div className="col-3">
                <div className="mb-3">
                  <label htmlFor="subtotal" className="form-label"> Price * </label>
                  <input type="text" className="form-control" name="subtotal" id="subtotal" aria-describedby="subtotal" required />
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
                    {this._invoiceElements.taxinfoInputs(this.state.invoiceData, this.state.title)}
                  </div>
                </div>
              </div>
            </div>
            <br /><br />
            <button type="submit" className="btn btn-dark"> Submit </button>
          </form>
        </>
    )
  }

  public render(): React.ReactNode {

    return (
      <>
        {this.state.loaded  && this.state.packData? this.preRender() : <div className="d-flex align-items-center justify-content-center" style={{ width: '100%', height: '80vh' }}><div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div></div>}
      </>
    )
  }
}