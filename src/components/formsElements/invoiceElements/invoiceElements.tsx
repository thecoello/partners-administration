import { Check, Warning } from '@mui/icons-material';
import InvoicePDF from './invoicePDF';
import CountrySelector from './CountrySelector';
import Invoice from '../../../models/invoices/model.invoice';
import Packs from '../../../models/event/model.packsAndLocations';
import User from '../../../models/users/model.users';
import Event from '../../../models/event/model.event';

export default class InvoiceElements {

  _userId?: number
  priceFormat = new Intl.NumberFormat('es-ES',{style: 'currency',currency: 'EUR'})

  setUserId(id?: number) {
    this._userId = id
  }

  getUserID() {
    return this._userId
  }

  infoInvoice(condition: any, informationToShow: any, informationTitle: any, symbol: any) {
    if (condition) {
      return <><b>{informationTitle + ': '} </b> {informationToShow} {symbol}</>
    } else {
      return <><b>{informationTitle + ': '} </b> <span>Missing information</span> <Warning /> </>
    }
  }

  invoiceResume(data: Invoice, event: Event) {
    let invoiceTable: JSX.Element[] = [];
    [data].forEach((dataInvoice: any) => {
      invoiceTable.push(
        <div key={'invoice' + dataInvoice.invoice_number} className='card'>
          <div className='card-body'>
            <div className='row'>
              <div className='col-4'>
                <h2 className='m-0'>Invoice {dataInvoice.invoice_number}</h2>
                {dataInvoice.payment_status == 'Payed' ? <span className='badge rounded-pill text-bg-success'> Payed</span> : <span className='badge rounded-pill text-bg-danger'> Unpayed </span>}
              </div>
              <div className='col-4'>
                <p className='m-0'>{this.infoInvoice(dataInvoice.invoice_date != null && dataInvoice.invoice_date != undefined, dataInvoice.invoice_date, 'Invoice date',null)}</p>
                <p className='m-0'>{this.infoInvoice(dataInvoice.payment_method != null || dataInvoice.payment_method != undefined, dataInvoice.payment_method, 'Payment method', null)}</p>
                {dataInvoice.voucher ? <a target='_blank' href={import.meta.env.VITE_URL_SIMPLE + dataInvoice.voucher} className='btn btn-success mt-2'>Proof of payment</a> : null}
              </div>
              <div className='col-2'>
                {dataInvoice.company_name && dataInvoice.address && dataInvoice.zip && dataInvoice.country && dataInvoice.vat ? <button onClick={() => {
                  new InvoicePDF(dataInvoice, event).generateInvoice();
                }} className='btn btn-dark m-1 w-100'>Download Invoice</button> : <p className='text-danger'>In order to generate the invoice, the tax information is required</p>}
              </div>
              <div className='col-2'>
                <a target='_blank' href={import.meta.env.VITE_URL_SIMPLE + dataInvoice.contract_file} className='btn btn-outline-dark m-1 w-100'>Download contract</a>
              </div>
            </div>
            <hr />
            <div className='row'>
              <div className='col-3'>
                <span className='badge rounded-pill text-bg-dark mb-1'>
                  Tax Information
                </span>
                <p className='m-0'>{this.infoInvoice(dataInvoice.company_name.length != 0, dataInvoice.company_name, 'Company name',null)}</p>
                <p className='m-0'>{this.infoInvoice(dataInvoice.vat.length != 0, dataInvoice.vat,'VAT',null)}</p>
                <p className='m-0'>{this.infoInvoice(dataInvoice.address.length != 0, dataInvoice.address, 'Address',null)}</p>
                <p className='m-0'>{this.infoInvoice(dataInvoice.zip.length != 0, dataInvoice.zip, 'Zip',null)}</p>
                <p className='m-0'>{this.infoInvoice(dataInvoice.country.length != 0, dataInvoice.country, 'Country',null)}</p>
              </div>
              <div className='col-3'>
                <span className='badge rounded-pill text-bg-dark mb-1'>
                  Pack Information
                </span>
                <p className='m-0'>{this.infoInvoice(dataInvoice.category != null && dataInvoice.category != undefined, dataInvoice.category, 'Category',null)}</p>
                <p className='m-0'>{this.infoInvoice(dataInvoice.location != null && dataInvoice.location != undefined, dataInvoice.location, 'Location',null)}</p>
                <p className='m-0'>{this.infoInvoice(dataInvoice.pricetype != null && dataInvoice.pricetype != undefined, dataInvoice.pricetype, 'Pricetype',null)}</p>
              </div>
              <div className='col-3'>
                <span className='badge rounded-pill text-bg-dark mb-1'>User Information</span>
                <p className='m-0'>{this.infoInvoice(dataInvoice.contact != null && dataInvoice.contact != undefined, dataInvoice.contact, 'Company name',null)}</p>
                <p className='m-0'>{this.infoInvoice(dataInvoice.name != null && dataInvoice.name != undefined, dataInvoice.name, 'Name',null)}</p>
                <p className='m-0'>{this.infoInvoice(dataInvoice.email != null && dataInvoice.email != undefined, dataInvoice.email, 'Email',null)}</p>
              </div>
              <div className='col-3'>
                <span className='badge rounded-pill text-bg-dark mb-1'>Description and price</span>
                <p className='m-0'>{this.infoInvoice(dataInvoice.pricetype, dataInvoice.pricetype, 'Price type',null)}</p>
                <hr />
                <h5 className='m-0'>{this.infoInvoice(this.priceFormat.format(dataInvoice.subtotal), this.priceFormat.format(dataInvoice.subtotal), 'Subtotal',null)}</h5>
                {dataInvoice.iva ? <h5 className='m-0'>{this.infoInvoice(dataInvoice.company_name && dataInvoice.country, this.priceFormat.format(dataInvoice.iva), 'IVA', '')}</h5> : null}
                
                <h5 className='m-0'>{this.infoInvoice(dataInvoice.company_name && dataInvoice.country, this.priceFormat.format(dataInvoice.total), 'Total', '')}</h5>
                <hr />
                <p>{dataInvoice.company_name != undefined && dataInvoice.country != undefined ? null : 'It is necessary to fill in the tax information to calculate the total price.'}</p>
              </div>
            </div>
            {dataInvoice.coupons ? <div className='row'>
              <div className='col-6'>
                <div className='border rounded p-4 bg-dark text-light'><p className='m-0'><b>Coupons:</b> {dataInvoice.coupons}</p></div>
              </div>
            </div> : null}
          </div>
        </div>)
    });
    return invoiceTable
  }

  taxinfoInputs(title: any, model: Invoice, invoiceID: any) {

    return (
      <>
        {model?.company_name && model?.address && model?.zip && model?.country ? <div className='card mb-4 bg-green'>
          <div className='card-body'>
            <div className='mb-3'>
              <label htmlFor='voucher' className='form-label'> <h5>Upload the proof of payment here</h5> </label>
              <input type='file' className='form-control' name='voucher' id='voucher' aria-describedby='voucher' />
            </div>
          </div>
        </div> : null}

        {model?.company_name && model?.address && model?.zip && model?.country ? <><h3 className='m-0'>You have already provided your tax information</h3> <p>If you have missed any information, you can update it.</p></> : null}

        <h6 className='mb-4 mt-4 p-4 rounded bg-dark text-light border'>Remember that it is necessary for this invoice to be valid for accounting purposes to provide all the information required in this form, please do not leave any field empty.</h6>

        {!model.invoice_date ? <input type='hidden' defaultValue={new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/'+ new Date().getFullYear()} className='form-control' name='invoice_date' id='invoice_date' aria-describedby='invoice_date' /> : null}
                
        <div className='mb-3'>
          <label htmlFor='company_name' className='form-label'> Company Name </label>
          <input type='text' defaultValue={model.company_name} className='form-control' name='company_name' id='company_name' aria-describedby='company_name' required={!invoiceID || !model.contact? false  : true} />
        </div>
        <div className='mb-3'>
          <label htmlFor='address' className='form-label'> Address </label>
          <input type='text' onChange={(e) => { model.address = e.target.value }} defaultValue={model.address} className='form-control' name='address' id='address' aria-describedby='address' required={!invoiceID || !model.contact? false  : true}  />
        </div>
        <div className='mb-3'>
          <label htmlFor='zip' className='form-label'> ZIP/Postal Code </label>
          <input type='text' onChange={(e) => { model.zip = e.target.value }} defaultValue={model.zip} className='form-control' name='zip' id='zip' aria-describedby='zip' required={!invoiceID || !model.contact? false  : true}  />
        </div>
        <div className='mb-3'>
          <label htmlFor='country' className='form-label'> Country </label>
          <select onChange={(e) => { model.country = e.target.value }} defaultValue={model.country} className='form-select' name='country' key={`${Math.floor((Math.random() * 1000))}-min`} required={!invoiceID || !model.contact? false  : true} >
            <CountrySelector />
          </select>
        </div>
        <div className='mb-3'>
          <label htmlFor='vat' className='form-label'> Vat Number </label>
          <input type='text' onChange={(e) => { model.vat = e.target.value }} defaultValue={model.vat} className='form-control' name='vat' id='vat' aria-describedby='vat' required={!invoiceID || !model.contact? false  : true} />
          <p style={{ 'fontSize': '0.9rem' }}>If you do not have or do not need a VAT number for this invoice to be valid for accounting purposes, place a dash (-) in the VAT NUMBER field.</p>
        </div>
      </>
    )
  }

  getCategory(data: Packs) {
    let category: JSX.Element[] = []
    data.packinfo?.forEach((_data: any, i: any) => {
      category.push(<option key={i + 'packinfo'} value={_data?.pack_name}>{_data?.pack_name}</option>);
    });
    return category
  }

  getLocations(data: Packs) {
    let locations: JSX.Element[] = [];
    data.locations?.forEach((_data: any, i: any) => {
      locations.push(<option key={i + 'location'} value={_data?.type}>{_data?.location_name}</option>);
    });
    return locations
  }

  getUsers(user: Array<User>, invoice: Invoice, userIdMethod: any) {
    let usersRow: JSX.Element[] = []

    user.forEach((_data: any) => {
      _data.forEach((data: any)  => {
        if (data?.user_type != 1) {
          usersRow.push(
            <tr key={`${Math.floor((Math.random() * 1000))}-min`} className={
  
              data?.id == invoice.user_id ? 'p-2 align-middle bg-success text-light' : this.getUserID() == data?.id ? 'p-2 align-middle bg-primary text-light' : 'p-2 align-middle'
  
            }>
              <th scope='col'>
                <h6 className='m-0'>
                  <b>{data?.contact}</b>
                </h6>
              </th>
              <th scope='col'>
                <p className='m-0'>
                  <b>{data?.name}</b>
                </p>
              </th>
              <th scope='col'>
                <p className='m-0'>{data?.user_type == 1 ? 'Admin' : 'User'}</p>
              </th>
              <th scope='col'>
                <p className='m-0'>{data?.email}</p>
              </th>
              <th scope='col'>
                <div className='d-flex'>
                  <button onClick={() => {
                    this.setUserId(data.id)
                    this.getUserID
                    userIdMethod()
                  }} type='button' className='btn-dark btn btn-sm'>
                    <Check />
                  </button>
                </div>
              </th>
            </tr>
          )
        }
      });
    });

    return (
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Company Name</th>
            <th scope='col'>Name</th>
            <th scope='col'>User type</th>
            <th scope='col'>Email</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>{usersRow}</tbody>
      </table>
    )
  }
}