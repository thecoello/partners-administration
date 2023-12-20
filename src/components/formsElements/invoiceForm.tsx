import React from "react"
import RequestsRoutes from "../../http/requests"
import InvoiceElements from "./invoiceElements/invoiceElements"
import Invoice from "../../models/invoices/model.invoice"
import Packs from "../../models/event/model.packsAndLocations"
import User from "../../models/users/model.users"
import Event from "../../models/event/model.event"

interface IState {
  routePacks: string
  routeUser: string
  search: string
  userFounded: boolean
  price: number | undefined
  categoryInput: any
  locationInput: any
  priceTypeInput: any
  route: string
  title: string
  loaded: boolean
  userId: number | undefined
  disableDiv?: string
}

interface IProps {
  getInvoiceId: any
}

export default class InvoiceForm extends React.Component<IProps, IState> {

  _invoiceElements = new InvoiceElements()
  _invoice = new Invoice()
  _packs = new Packs()
  _user = new User()
  _event = new Event()


  private constructor(props: IProps) {
    super(props)
    this.state = {
      routePacks: "packages",
      routeUser: "users",
      search: "",
      userFounded: false,
      price: 0,
      categoryInput: '',
      locationInput: '',
      priceTypeInput: '',
      route: "invoice",
      title: "",
      loaded: false,
      userId: 0
    }
  }

  getSetUserId = () => {
    this.setState({ userId: this._invoiceElements.getUserID() })
  }

  componentDidMount(): void {
    this.getPackData()

    if (this.props.getInvoiceId()) {
      this.setState({ title: "Update price to user" })
      this.getInvoiceData(this.props.getInvoiceId())
      this.loadTime()
    } else {
      this.setState({ title: "Assign price to user" })
      this.getPackData()
      this.loadTime()
    }

  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
    if ((prevState.categoryInput != this.state.categoryInput) || (prevState.locationInput != this.state.locationInput) || (prevState.priceTypeInput != this.state.priceTypeInput)) {
      this.priceCalculation()
    }
  }

  loadTime() {
    this.setState({ loaded: false })
    setTimeout(() => {
      this.setState({ loaded: true })
    }, 500);
  }

  searchUserData(search: any) {
    new RequestsRoutes().get(this.state.routeUser + "/search/" + search).then((response) => {
      this._user = response.data.data
      this.setState({ userFounded: true })
    })
  }

  getUserData(id: any) {
    new RequestsRoutes().get(this.state.routeUser + "/" + id).then((response) => {
      this._user = response.data.data[0]
    })
  }

  getInvoiceData(id: any) {
    new RequestsRoutes().get(this.state.route + "/" + id).then((response) => {
      this._invoice = response.data.invoices.data[0]
      this._event = response.data.eventinfo[0]
      this.setState({ userId: this._invoice.user_id })
      this.setState({ price: this._invoice.subtotal })
      this.loadTime()
    });
  }

  private getPackData() {
    new RequestsRoutes().get(this.state.routePacks).then((response) => {
      this._packs = response.data
    })
  }

  private priceCalculation(): void {
    this._packs.packinfo?.forEach((pack: any) => {
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
    })
  }

  private formCreate(e: any) {
    e.preventDefault()
    if (this.state.userId) {
      new RequestsRoutes().post(this.state.route, e.target).then((response) => {
        if (response.status === 200) {
          alert("Invoice created")
          this.setState({disableDiv: ' pe-auto opacity-100 '})
          window.location.href = "/"
        }
      }).catch((error) => {
        alert(error)
      })
    } else {
      alert("You must assign a user to the invoice")
    }
  }

  private formUpdate(e: any) {
    e.preventDefault()

    if (this.state.userId) {
      new RequestsRoutes().putPost(this.state.route + "/" + this.props.getInvoiceId(), e.target).then((response) => {
        if (response.status === 200) {
          alert("Invoice Updated")
          this.getInvoiceData(this.props.getInvoiceId())
          this.setState({disableDiv: ' pe-auto opacity-100 '})
        }
      }).catch((error) => {
        alert(error)
      })
    } else {
      alert("You must assign a user to the invoice")
    }
  }

  private preRender() {
    return (
      <div className={this.state.disableDiv}>
        {this.props.getInvoiceId() ? this._invoiceElements.invoiceResume(this._invoice, this._event) : null}


        <div className="d-flex search mt-4 mb-4">
          <h3 className="m-0">{this.state.title}</h3>
          <a href="/invoices" className="btn btn-outline-secondary btn-dark text-light ms-4" type="button" > Cancel </a>
        </div>

        <h5>Find and select user</h5>

        <div className="mb-3">
          <div className="input-group w-100">
            <input onChange={(e) => { this.setState({ search: e.target.value }) }} type="text" className="form-control" placeholder="Find by User name, email or Company Name" />
            <button className="btn btn-outline-secondary btn-dark text-light " type="button" onClick={() => {
              this.state.search ? this.setState({ routePacks: "users/search/" + this.state.search.split(".")[0] }) : this.setState({ routePacks: "users" })
              this.searchUserData(this.state.search)
            }} > Search </button>
          </div>
        </div>

        <div key={`${Math.floor((Math.random() * 1000))}-min`}>
          {this.state.userFounded ? this._invoiceElements.getUsers([this._user], this._invoice, this.getSetUserId) : null}
        </div>


        <form encType="multipart/form-data" className="needs-validation" onSubmit={this.props.getInvoiceId() ? this.formUpdate.bind(this) : this.formCreate.bind(this)}>

          {this.props.getInvoiceId() && this._invoice.voucher?.length ?
            <>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label htmlFor="country" className="form-label"> Payment status </label>
                    <select className="form-select" onChange={(e) => { this._invoice.payment_status = e.target.value }} defaultValue={this._invoice.payment_status} name="payment_status">
                      <option value="">Select option</option>
                      <option value="Payed">Payed</option>
                      <option value="Unpayed">Unpayed</option>
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label htmlFor="country" className="form-label"> Payment method </label>
                    <select className="form-select" onChange={(e) => { this._invoice.payment_method = e.target.value }} defaultValue={this._invoice.payment_method} name="payment_method" >
                      <option value="">Select option</option>
                      <option value="Bank transfer">Bank transfer</option>
                      <option value="PayPal">PayPal</option>
                    </select>
                  </div>
                </div>
              </div>

              {this.props.getInvoiceId() && this._invoice.voucher?.length > 0 ? <div className="col bg-dark p-4 mt-2 mb-2 rounded">
                <div className="mb-3">
                  <label htmlFor="coupons" className="form-label text-light"><h4>Add Coupons</h4> (For multiple coupons separate them by comma) </label>
                  <input type="text" className="form-control" onChange={(e) => { this._invoice.coupons = e.target.value }} defaultValue={this._invoice.coupons} name="coupons" id="coupons" aria-describedby="coupons" />
                </div>
              </div> : null}
            </>
            : null}

          <input type="hidden" name="user_id" value={this.state.userId} />
          <input type="hidden" name="category" value={this._invoice.category} />
          <input type="hidden" name="location" value={this._invoice.location} />
          <input type="hidden" name="pricetype" value={this._invoice.pricetype} />


          <div className="row">

            <div className="col">
              <div className="mb-3">
                <label htmlFor="contract_file" className="form-label"> Upload contract (PDF - 2MB Max) * </label>
                <input onChange={(e:any) => {

                  const fileExt = e.target.value.split('.')[e.target.value.split('.').length - 1].toUpperCase()

                  if (!["PDF"].includes(fileExt)) {
                    e.target.value = ''
                    alert('The contract file must be a PDF file.')
                  }
                  if(Math.round(e.target.files[0].size / 1024) > 2000){
                    e.target.value = ''
                    alert('The contract file size should not exceed 2MB')
                  }

                }} type="file" className="form-control" name="contract_file" id="contract_file" aria-describedby="contract_file" required={this.props.getInvoiceId() ? false : true} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <div className="mb-3">
                <label htmlFor="categorynull" className="form-label"> Sponsorship Category * </label>
                <select onChange={(e) => {
                  this.setState({ categoryInput: e.target.value })
                  this._invoice.category = e.target.options[e.target.options.selectedIndex].text
                }} className="form-select" id="categorynull" aria-describedby="categorynull" required={this.props.getInvoiceId() ? false : true}> <option value="">Select option</option> {this._invoiceElements.getCategory(this._packs)} </select>
              </div>
            </div>
            <div className="col-3">
              <div className="mb-3">
                <label htmlFor="locationnull" className="form-label"> Location * </label>
                <select onChange={(e) => {
                  this.setState({ locationInput: e.target.value })
                  this._invoice.location = e.target.options[e.target.options.selectedIndex].text
                }} className="form-select" id="locationnull" aria-describedby="locationnull" required={this.props.getInvoiceId() ? false : true}> <option value="">Select option</option> {this._invoiceElements.getLocations(this._packs)} </select>
              </div>
            </div>
            <div className="col-3">
              <div className="mb-3">
                <label htmlFor="pricetypenull" className="form-label"> Price type * </label>
                <select onChange={(e) => {
                  this.setState({ priceTypeInput: e.target.value })
                  this._invoice.pricetype = e.target.options[e.target.options.selectedIndex].text
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
                <input type="text" onChange={(e) => { this.setState({ price: Number(e.target.value) }) }} value={this.state.price} className="form-control" name="subtotal" id="subtotal" aria-describedby="subtotal" required />
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
                  {this._invoiceElements.taxinfoInputs(this.state.title, this._invoice, this.props.getInvoiceId(),1)}
                </div>
              </div>
            </div>
          </div>
          <br /><br />
          <button type="submit" className="btn btn-dark" onClick={()=>{
            this.setState({disableDiv: ' pe-none opacity-25 '})
          }}> Submit </button>
        </form>
      </div>
    )
  }

  public render(): React.ReactNode {

    return (
      <>
        {(this.state.loaded && this._packs) || (this.state.loaded && this._invoice && this._packs) ? this.preRender() : <div className="d-flex align-items-center justify-content-center" style={{ width: '100%', height: '80vh' }}><div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div></div>}
      </>
    )
  }
}