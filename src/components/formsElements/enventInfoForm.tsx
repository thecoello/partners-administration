import React from "react"
import Event from "../../models/event/model.event"
import RequestsRoutes from "../../http/requests"
import Locations from "../../models/event/model.locations"
import PacksAndPrice from "../../models/event/model.packsAndPrice"

interface IProps {
}

interface IState {
  loaded: boolean
  idLocation?: number
  idPackAndPrice?: number
  invoiceShow: boolean
  locationShow: boolean
  pricePackShow: boolean
  resetEvent: boolean
  showAuth: boolean
}

export default class EventInfoForm extends React.Component<IProps, IState> {

  _event: Event = new Event()
  _locations: Array<Locations> = []
  _packinformation: Array<PacksAndPrice> = []

  constructor(props: IProps) {
    super(props)
    this.state = {
      loaded: false,
      idLocation: undefined,
      idPackAndPrice: undefined,
      invoiceShow: true,
      locationShow: false,
      pricePackShow: false,
      resetEvent: false,
      showAuth: false
    }
  }

  componentDidMount(): void {
    this.getEventInformation()
    this.getLocationsInformation()
    this.getPackInformation()
    this.loadTime()
  }

  getPackInformation() {
    new RequestsRoutes().get('packages').then((response) => {
      this._packinformation = response.data.packinfo
      this.loadTime()
    })
  }

  getEventInformation() {
    new RequestsRoutes().get('eventinfo').then((response) => {
      this._event = response.data[0]
      this.loadTime()
    })
  }

  getLocationsInformation() {
    new RequestsRoutes().get('locations').then((response) => {
      this._locations = response.data
      this.loadTime()
    })
  }

  formUpdate(e: any) {
    e.preventDefault()
    new RequestsRoutes().put('eventinfo', e.target).then((response) => {
      if (response.status === 200) {
        alert("Booth Information created")
        this.getEventInformation()
      }
    })
  }

  formLocationUpdate(e: any) {
    e.preventDefault()
    new RequestsRoutes().put('locations/' + this.state.idLocation, e.target).then((response) => {
      if (response.status === 200) {
        alert("Locations updated")
        this.getLocationsInformation()
      }
    })
  }

  formPricePackUpdate(e: any) {
    e.preventDefault()
    new RequestsRoutes().put('packages/' + this.state.idPackAndPrice, e.target).then((response) => {
      if (response.status === 200) {
        alert("Price and Pack updated")
        this.getPackInformation()
      }
    })
  }

  locationInformation() {

    return (<div className="row justify-content-center">
      <h4>Locations</h4>

      <div className="row border p-2 rounded mt-3">

        <p><b>Multilocation: </b>{this._locations[3].location_name}</p>

        <form className="needs-validation col-4" onSubmit={this.formLocationUpdate.bind(this)}>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="location_name" className="form-label">
                  Location in America
                </label>
                <input defaultValue={this._locations[0].location_name} type="text" className="form-control" id="location_name" name="location_name" />
              </div>
              <button onClick={() => {
                this.setState({ idLocation: this._locations[0].id })
              }} type="submit" className="btn btn-dark">
                Update location

              </button>
            </div>

          </div>
        </form>

        <form className="needs-validation col-4" onSubmit={this.formLocationUpdate.bind(this)}>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="location_name" className="form-label">
                  Location in Asia
                </label>
                <input defaultValue={this._locations[1].location_name} type="text" className="form-control" id="location_name" name="location_name" />
              </div>
              <button onClick={() => {
                this.setState({ idLocation: this._locations[1].id })
              }} type="submit" className="btn btn-dark">
                Update location

              </button>
            </div>

          </div>

        </form>

        <form className="needs-validation col-4" onSubmit={this.formLocationUpdate.bind(this)}>
          <div className="row ">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="location_name" className="form-label">
                  Location in Europe
                </label>
                <input defaultValue={this._locations[2].location_name} type="text" className="form-control" id="location_name" name="location_name" />
              </div>
              <button onClick={() => {
                this.setState({ idLocation: this._locations[2].id })
              }} type="submit" className="btn btn-dark">
                Update location

              </button>
            </div>

          </div>

        </form>
      </div>

    </div>)
  }

  invoiceInformation() {
    return (<div className="row justify-content-center">
      <h4>Invoice Information</h4>

      <form className="needs-validation" onSubmit={this.formUpdate.bind(this)}>
        <div className="row border p-2 rounded mt-3">
          <div className="row" >
            <div className="col-6">
              <div className="mb-3">
                <label htmlFor="event_name" className="form-label">
                  Event name
                </label>
                <input defaultValue={this._event.event_name} type="text" className="form-control" id="event_name" name="event_name" />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <label htmlFor="seller_name" className="form-label">
                  Seller name
                </label>
                <input defaultValue={this._event.seller_name} type="text" className="form-control" id="seller_name" name="seller_name" />
              </div>
            </div>
          </div>

          <div className="row" >
            <div className="col-3">
              <div className="mb-3">
                <label htmlFor="seller_address" className="form-label">
                  Seller Address
                </label>
                <input defaultValue={this._event.seller_address} type="text" className="form-control" id="seller_address" name="seller_address" />
              </div>
            </div>
            <div className="col-3">
              <div className="mb-3">
                <label htmlFor="seller_zip" className="form-label">
                  Seller ZIP code
                </label>
                <input defaultValue={this._event.seller_zip} type="text" className="form-control" id="seller_zip" name="seller_zip" />
              </div>
            </div>
            <div className="col-3">
              <div className="mb-3">
                <label htmlFor="seller_country" className="form-label">
                  Seller Country
                </label>
                <input defaultValue={this._event.seller_country} type="text" className="form-control" id="seller_country" name="seller_country" />
              </div>
            </div>
            <div className="col-3">
              <div className="mb-3">
                <label htmlFor="seller_city" className="form-label">
                  Seller city
                </label>
                <input defaultValue={this._event.seller_city} type="text" className="form-control" id="seller_city" name="seller_city" />
              </div>
            </div>
          </div>
        </div>


        <div className="row border p-2 rounded mt-3">
          <div className="col-3">
            <div className="mb-3">
              <label htmlFor="seller_vat" className="form-label">
                Seller VAT
              </label>
              <input defaultValue={this._event.seller_vat} type="text" className="form-control" id="seller_vat" name="seller_vat" />
            </div>
          </div>

          <div className="col-1">
            <div className="mb-3">
              <label htmlFor="iva" className="form-label">
                IVA
              </label>
              <input defaultValue={this._event.iva} type="text" className="form-control" id="iva" name="iva" />
            </div>
          </div>

          <div className="col-1">
            <div className="mb-3">
              <label htmlFor="symbol" className="form-label">
                Symbol
              </label>
              <input defaultValue={this._event.symbol} type="text" className="form-control" id="symbol" name="symbol" />
            </div>
          </div>
          <div className="col-3">
            <div className="mb-3">
              <label htmlFor="invoice_pre" className="form-label">
                Invoice prefix
              </label>
              <input defaultValue={this._event.invoice_pre} type="text" className="form-control" id="invoice_pre" name="invoice_pre" />
            </div>
          </div>
          <div className="col-3">
            <div className="mb-3">
              <label htmlFor="invoice_number" className="form-label">
                Invoice number
              </label>
              <input defaultValue={this._event.invoice_number} type="text" className="form-control" id="invoice_number" name="invoice_number" />
            </div>
          </div>
        </div>

        <div className="row  border p-2 rounded mt-3">
          <div className="col-12">
            <div className="mb-3">
              <label htmlFor="seller_footer" className="form-label">
                Invoice Footer text
              </label>
              <input defaultValue={this._event.seller_footer} type="text" className="form-control" id="seller_footer" name="seller_footer" />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-3">
              <label htmlFor="iva" className="form-label">
                Bank information
              </label>
              <textarea rows={5} defaultValue={this._event.seller_bankinfo} className="form-control" id="seller_bankinfo" name="seller_bankinfo">
              </textarea>
            </div>
          </div>
        </div>

        <br />

        <button type="submit" className="btn btn-dark">
          Update
        </button>
      </form>
    </div>)
  }

  pricePackInformation() {
    return (<div className="row justify-content-center">
      <h4>Price and Packs</h4>

      <div className="row border p-2 rounded mt-3">

        <form className="needs-validation col-12 pb-4" onSubmit={this.formPricePackUpdate.bind(this)}>
          <div className="row">
            <div className="col-3">
              <div className="mb-3">
                <label htmlFor="pack_name" className="form-label">
                  Pack name
                </label>
                <input defaultValue={this._packinformation[0].pack_name} type="text" className="form-control" id="pack_name" name="pack_name" />
              </div>
            </div>
            <div className="col-2">
              <div className="mb-3">
                <label htmlFor="pack_name" className="form-label">
                  Regular price
                </label>
                <input defaultValue={this._packinformation[0].price_normal} type="text" className="form-control" id="pack_name" name="price_normal" />
              </div>
            </div>
            <div className="col-2">
              <div className="mb-3">
                <label htmlFor="pack_name" className="form-label">
                  Earlybird price
                </label>
                <input defaultValue={this._packinformation[0].price_early} type="text" className="form-control" id="pack_name" name="price_early" />
              </div>
            </div>
            <div className="col-2">
              <div className="mb-3">
                <label htmlFor="pack_name" className="form-label">
                  Regular price <span style={{ fontSize: '0.7rem' }}>(All locations)</span>
                </label>
                <input defaultValue={this._packinformation[0].price_all_normal} type="text" className="form-control" id="pack_name" name="price_all_normal" />
              </div>
            </div>
            <div className="col-2">
              <div className="mb-3">
                <label htmlFor="pack_name" className="form-label">
                  Earlybird price <span style={{ fontSize: '0.7rem' }}>(All locations)</span>
                </label>
                <input defaultValue={this._packinformation[0].price_all_early} type="text" className="form-control" id="pack_name" name="price_all_early" />
              </div>
            </div>

          </div>
          <div className="row">
            <div className="col-12 d-flex">
              <button onClick={() => {
                this.setState({ idPackAndPrice: this._packinformation[0].id })
              }} type="submit" className="btn btn-dark m-0 p-2">
                Update price
              </button>
            </div>
          </div>
        </form>

        <hr />

        <form className="needs-validation col-12 pb-4" onSubmit={this.formPricePackUpdate.bind(this)}>
          <div className="row">
            <div className="col-3">
              <div className="mb-3">
                <label htmlFor="pack_name" className="form-label">
                  Pack name
                </label>
                <input defaultValue={this._packinformation[1].pack_name} type="text" className="form-control" id="pack_name" name="pack_name" />
              </div>
            </div>
            <div className="col-2">
              <div className="mb-3">
                <label htmlFor="pack_name" className="form-label">
                  Regular price
                </label>
                <input defaultValue={this._packinformation[1].price_normal} type="text" className="form-control" id="pack_name" name="price_normal" />
              </div>
            </div>
            <div className="col-2">
              <div className="mb-3">
                <label htmlFor="pack_name" className="form-label">
                  Earlybird price
                </label>
                <input defaultValue={this._packinformation[1].price_early} type="text" className="form-control" id="pack_name" name="price_early" />
              </div>
            </div>
            <div className="col-2">
              <div className="mb-3">
                <label htmlFor="pack_name" className="form-label">
                  Regular price <span style={{ fontSize: '0.7rem' }}>(All locations)</span>
                </label>
                <input defaultValue={this._packinformation[1].price_all_normal} type="text" className="form-control" id="pack_name" name="price_all_normal" />
              </div>
            </div>
            <div className="col-2">
              <div className="mb-3">
                <label htmlFor="pack_name" className="form-label">
                  Earlybird price <span style={{ fontSize: '0.7rem' }}>(All locations)</span>
                </label>
                <input defaultValue={this._packinformation[1].price_all_early} type="text" className="form-control" id="pack_name" name="price_all_early" />
              </div>
            </div>

          </div>
          <div className="row">
            <div className="col-12 d-flex">
              <button onClick={() => {
                this.setState({ idPackAndPrice: this._packinformation[1].id })
              }} type="submit" className="btn btn-dark m-0 p-2">
                Update price
              </button>
            </div>
          </div>
        </form>

        <hr />

        <form className="needs-validation col-12 pb-4" onSubmit={this.formPricePackUpdate.bind(this)}>
          <div className="row">
            <div className="col-3">
              <div className="mb-3">
                <label htmlFor="pack_name" className="form-label">
                  Pack name
                </label>
                <input defaultValue={this._packinformation[2].pack_name} type="text" className="form-control" id="pack_name" name="pack_name" />
              </div>
            </div>
            <div className="col-2">
              <div className="mb-3">
                <label htmlFor="pack_name" className="form-label">
                  Regular price
                </label>
                <input defaultValue={this._packinformation[2].price_normal} type="text" className="form-control" id="pack_name" name="price_normal" />
              </div>
            </div>
            <div className="col-2">
              <div className="mb-3">
                <label htmlFor="pack_name" className="form-label">
                  Earlybird price
                </label>
                <input defaultValue={this._packinformation[2].price_early} type="text" className="form-control" id="pack_name" name="price_early" />
              </div>
            </div>
            <div className="col-2">
              <div className="mb-3">
                <label htmlFor="pack_name" className="form-label">
                  Regular price <span style={{ fontSize: '0.7rem' }}>(All locations)</span>
                </label>
                <input defaultValue={this._packinformation[2].price_all_normal} type="text" className="form-control" id="pack_name" name="price_all_normal" />
              </div>
            </div>
            <div className="col-2">
              <div className="mb-3">
                <label htmlFor="pack_name" className="form-label">
                  Earlybird price <span style={{ fontSize: '0.7rem' }}>(All locations)</span>
                </label>
                <input defaultValue={this._packinformation[2].price_all_early} type="text" className="form-control" id="pack_name" name="price_all_early" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 d-flex">
              <button onClick={() => {
                this.setState({ idPackAndPrice: this._packinformation[2].id })
              }} type="submit" className="btn btn-dark m-0 p-2">
                Update price
              </button>
            </div>
          </div>
        </form>
        <hr />


        <form className="needs-validation col-12 pb-4" onSubmit={this.formPricePackUpdate.bind(this)}>
          <div className="row">
            <div className="col-3">
              <div className="mb-3">
                <label htmlFor="pack_name" className="form-label">
                  Pack name
                </label>
                <input defaultValue={this._packinformation[3].pack_name} type="text" className="form-control" id="pack_name" name="pack_name" />
              </div>
            </div>
            <div className="col-2">
              <div className="mb-3">
                <label htmlFor="pack_name" className="form-label">
                  Regular price
                </label>
                <input defaultValue={this._packinformation[3].price_normal} type="text" className="form-control" id="pack_name" name="price_normal" />
              </div>
            </div>
            <div className="col-2">
              <div className="mb-3">
                <label htmlFor="pack_name" className="form-label">
                  Earlybird price
                </label>
                <input defaultValue={this._packinformation[3].price_early} type="text" className="form-control" id="pack_name" name="price_early" />
              </div>
            </div>
            <div className="col-2">
              <div className="mb-3">
                <label htmlFor="pack_name" className="form-label">
                  Regular price <span style={{ fontSize: '0.7rem' }}>(All locations)</span>
                </label>
                <input defaultValue={this._packinformation[3].price_all_normal} type="text" className="form-control" id="pack_name" name="price_all_normal" />
              </div>
            </div>
            <div className="col-2">
              <div className="mb-3">
                <label htmlFor="pack_name" className="form-label">
                  Earlybird price <span style={{ fontSize: '0.7rem' }}>(All locations)</span>
                </label>
                <input defaultValue={this._packinformation[3].price_all_early} type="text" className="form-control" id="pack_name" name="price_all_early" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 d-flex">
              <button onClick={() => {
                this.setState({ idPackAndPrice: this._packinformation[3].id })
              }} type="submit" className="btn btn-dark m-0 p-2">
                Update price
              </button>
            </div>
          </div>
        </form>

      </div>

    </div>)
  }

  autorizathion(e: any) {
    e.preventDefault()

    const form = new FormData()

    new RequestsRoutes().login('login', e.target).then((response) => {
      if (response.status === 200) {
        if (response.data.Authorization === window.localStorage.getItem('Authorization')) {
          new RequestsRoutes().authUser().then((response) => {
            form.append("id",response.data.id)
            if (response.status === 200) {
              if (confirm("Are you sure you want to reset the event, this action cannot be reversed")) {
                new RequestsRoutes().post('resetevent',form).then((response)=> {
                  console.log(response)
                  if(response.status === 200){
                    alert("Event reseted")
                    window.location.href = "/"
                  }else{
                    alert(response.statusText)
                  }
                })
              }
            } 
          }).catch((error) => {
            alert(error)
          }) 
        } else {
          alert('You are not the user logged, please use your credentials')
        }

      }else{
        alert("Email or password wrong")
      }
    }).catch((error) => {
      alert(error)
    })
  }

  resetEvent() {
    return (<div className="row justify-content-center">
      <h4>Reset event</h4>

      <div className="row border p-2 rounded mt-3">

        <div className="col-4">
          <p><b>Here you can restart the event:</b> <br />
            -Invoice number will be set to 0. <br />
            -All invoices will be deleted. <br />
            -All Booth information will be deleted. <br />
            -Users will not be deleted.</p>

          <button onClick={() => {
            this.setState({ showAuth: true })
          }} type="submit" className="btn btn-danger">
            Reset event
          </button>
        </div>

        {this.state.showAuth ? <form encType='multipart/form-data' onSubmit={this.autorizathion.bind(this)} className='needs-validation d-flex align-items-start justify-content-center flex-column w-50 border rounded p-4 mt-4 mb-4'>
          <div className='w-100'>
            <p><b>Authorization is required to restart the event</b></p>

            <div className='mb-3 w-100'>
              <input name='email' type='email' className='form-control' id='email' placeholder='Email' aria-describedby='email' required />
            </div>
            <div className='mb-3 w-100'>
              <input name='password' type='password' className='form-control' placeholder='Password' id='password' required />
            </div>

            <button type='submit' className='btn btn-dark w-100'>Confirm Reset</button>
          </div>
        </form> : null}

      </div>





    </div>)
  }

  preRender() {
    return (
      <>

        <div className="container p-0 m-0">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a onClick={() => {
                this.setState({ invoiceShow: true })
                this.setState({ locationShow: false })
                this.setState({ pricePackShow: false })
                this.setState({ resetEvent: false })

              }} className={this.state.invoiceShow ? "nav-link active" : "nav-link"} aria-current="page" href="#">Event information</a>
            </li>
            <li className="nav-item">
              <a onClick={() => {
                this.setState({ invoiceShow: false })
                this.setState({ locationShow: true })
                this.setState({ pricePackShow: false })
                this.setState({ resetEvent: false })

              }} className={this.state.locationShow ? "nav-link active" : "nav-link"} href="#">Locations</a>
            </li>
            <li className="nav-item">
              <a onClick={() => {
                this.setState({ invoiceShow: false })
                this.setState({ locationShow: false })
                this.setState({ pricePackShow: true })
                this.setState({ resetEvent: false })

              }} className={this.state.pricePackShow ? "nav-link active" : "nav-link"} href="#">Prices & Packs information</a>
            </li>

            <li className="nav-item">
              <a onClick={() => {
                this.setState({ invoiceShow: false })
                this.setState({ locationShow: false })
                this.setState({ pricePackShow: false })
                this.setState({ resetEvent: true })

              }} className={this.state.resetEvent ? "nav-link active" : "nav-link"} href="#">Reset event</a>
            </li>

          </ul>
          <div className="col-12 p-4 border rounded">

            {this.state.invoiceShow ? this.invoiceInformation() : null}
            {this.state.locationShow ? this.locationInformation() : null}
            {this.state.pricePackShow ? this.pricePackInformation() : null}
            {this.state.resetEvent ? this.resetEvent() : null}

          </div>
        </div>
      </>
    )
  }

  loadTime() {
    this.setState({ loaded: false })
    setTimeout(() => {
      this.setState({ loaded: true })
    }, 500);
  }

  render(): React.ReactNode {
    return (
      <>
        {(this.state.loaded && this._event) ? this.preRender() : <div className="d-flex align-items-center justify-content-center" style={{ width: '100%', height: '80vh' }}><div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div></div>}
      </>
    )
  }
}