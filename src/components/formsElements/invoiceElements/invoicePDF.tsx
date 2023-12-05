import jsPDF from 'jspdf';
import { renderToString } from 'react-dom/server';
import Logo from '../../../assets/logo.png'
import Invoice from '../../../models/invoices/model.invoice';
import Event from '../../../models/event/model.event';

export default class InvoicePDF{

  _invoice = new Invoice()
  _event = new Event()
  priceFormat = new Intl.NumberFormat('es-ES',{style: 'currency',currency: 'EUR'})

  constructor(_invoice:any, _event: any){
    this._invoice = _invoice
    this._event = _event
  }

   generateInvoice(){
    const doc = new jsPDF('p', 'pt');
    const name = 'invoice_' + this._invoice.invoice_number
    doc.html(renderToString(this.invoice(this._invoice, this._event)), {
 
      async callback(doc) {
        doc.save(name);
      }
    });
  }
  
  sellerBankInfo(event:any){
    return {__html: event.seller_bankinfo}
  }


  private invoice = (_invoice: any, event: any) => {
    return (
      <div style={{ 'width': '595px', 'margin': '30px 0' }}>
        <div style={{ 'width': '495px', 'margin': '0 auto', 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'space-between' }}>
          <div className='row'>
            <div className='col-8'>

              <img style={{ 'height': '20px' }} src={Logo} alt='' />

            </div>
            <div className='col-4'>
              <p style={{ 'fontSize': '0.5em', 'margin': '5px 0', 'textTransform': 'uppercase' }}>
                <b>{event.seller_name}</b> <br />
                {event.seller_address} <br />
                {event.seller_zip} &nbsp; {}<br />
                {event.seller_country} <br />
                CIF:&nbsp;{event.seller_vat}</p>
            </div>
          </div>

          <br />

          <div className='row' style={{ 'background': '#f7f7f7', 'display': 'flex', 'alignItems': 'center' }}>
            <div className='col'>
              <p style={{ 'fontSize': '0.6em', 'margin': '10px 0', 'textTransform': 'uppercase' }}>
                <b>{_invoice.company_name}</b> <br />
                {_invoice.address} <br />
                {_invoice.zip} <br />
                {_invoice.country} <br />
                <b>NIF/VAT: {_invoice.vat}</b> <br /></p>
            </div>
            <div className='col'>
              <p style={{ 'fontSize': '1em', 'margin': '0px 0' }}><b>INVOICE NUMBER: {_invoice.invoice_number}</b></p>
              <p style={{ 'fontSize': '0.6em', 'margin': '0px 0' }}>INVOICE DATE: <b>{_invoice.invoice_date}</b></p>
              <p style={{ 'fontSize': '0.6em', 'margin': '0px 0' }}>DUE DATE: <b>{new Date(_invoice.invoice_date.toString().split('/')[2],_invoice.invoice_date.toString().split('/')[1],_invoice.invoice_date.toString().split('/')[0]).toLocaleDateString()}</b></p>

            </div>
          </div>

          {/* BODY */}

          <div>

            <div className='row'>
              <div className='col-12'>
                <p style={{ 'fontSize': '0.8em', 'margin': '10px 0' }}>Details</p>
              </div>
            </div>

            <div className='row text-left' style={{ 'borderTop': '1px solid #222222', 'borderBottom': '1px solid #222222' }}>

              <div className='col-8'>
                <p style={{ 'fontSize': '0.6em', 'margin': '0px 0', 'textAlign': 'left' }}>Description</p>
              </div>
              <div className='col-2'>
                <p style={{ 'fontSize': '0.6em', 'margin': '0px 0', 'textAlign': 'center' }}>Quantity</p>
              </div>
              <div className='col-2'>
                <p style={{ 'fontSize': '0.6em', 'margin': '0px 0', 'textAlign': 'right' }}>Subtotal</p></div>
            </div>

            <div className='row text-left'>
              <div className='col-8'>
                <p style={{ 'fontSize': '0.6em', 'margin': '2px 0' }}><b>{_invoice.category}</b></p>
                <p style={{ 'fontSize': '0.6em', 'margin': '2px 0' }}>{_invoice.location}</p>
                <p style={{ 'fontSize': '0.6em', 'margin': '2px 0' }}>{_invoice.pricetype}</p>

              </div>
              <div className='col-2'>
                <p style={{ 'fontSize': '0.6em', 'margin': '10px 0', 'textAlign': 'center' }}>1</p>
              </div>
              <div className='col-2'><p style={{ 'fontSize': '0.6em', 'margin': '10px 0', 'textAlign': 'right' }}>{this.priceFormat.format(_invoice.subtotal)}</p></div>
            </div>

            <div className='row text-left' style={{ 'borderTop': '1px solid #222222' }}>
              <div className='col-8'>
              </div>
              <div className='col-2'>
                <p style={{ 'fontSize': '0.6em', 'margin': '2px 0' }}>Subtotal:</p>
                {_invoice.country === 'Spain' ? <p style={{ 'fontSize': '0.6em', 'margin': '2px 0' }}>IVA: ({event.iva} %)</p> : null}
              </div>
              <div className='col-2'>
                <p style={{ 'fontSize': '0.6em', 'margin': '2px 0', 'textAlign': 'right' }}>{this.priceFormat.format(_invoice.subtotal)}</p>
                {_invoice.country === 'Spain' ? <p style={{ 'fontSize': '0.6em', 'margin': '2px 0', 'textAlign': 'right' }}>{this.priceFormat.format(_invoice.iva)}</p> : null}
              </div>
            </div>

            <div className='row text-left'>
              <div className='col-8'>
              </div>
              <div className='col-2' style={{ 'borderTop': '0.5px solid #222222' }}>
                <p style={{ 'fontSize': '1em', 'margin': '10px 0', 'textAlign': 'left' }}>Total</p>
              </div>
              <div className='col-2' style={{ 'borderTop': '0.5px solid #222222', 'textAlign': 'right' }}>
                <p style={{ 'fontSize': '1em', 'margin': '10px 0', 'textAlign': 'right' }}>{this.priceFormat.format(_invoice.total)}</p>

              </div>
            </div>

  

            <div className='row text-left'>

              <div className='col-12'>
                <p style={{ 'fontSize': '0.6em', 'textAlign': 'left' }} dangerouslySetInnerHTML={this.sellerBankInfo(event)}>
                  
                </p>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className='row' style={{ 'position': 'relative', 'top': '170px' }}>
            <div className='col-12'>
              <p style={{ 'fontSize': '0.5em', 'padding': '10px 0', 'background': '#f7f7f7', 'textAlign': 'center' }}>{event.seller_footer}</p>
            </div>
          </div>

        </div>
      </ div>
    )
  }
}