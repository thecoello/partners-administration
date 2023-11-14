import jsPDF from "jspdf";
import { renderToString } from 'react-dom/server';
import Logo from '../../assets/logo.png'
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { HtmlHTMLAttributes } from "react";

export default class InvoicePDF{

  data: any;
  event: any;

  constructor(data:any, event: any){
    this.data = data
    this.event = event

  }

   generateInvoice(){
    const doc = new jsPDF('p', 'pt');
    const name = "invoice_" + this.data.invoice_number
    doc.html(renderToString(this.invoice(this.data, this.event)), {
 
      async callback(doc) {
        doc.save(name);
      }
    });
  }
  
  sellerBankInfo(event:any){
    return {__html: event.seller_bankinfo}
  }


  private invoice = (data: any, event: any) => {
    return (
      <div style={{ "width": "595px", "margin": "30px 0" }}>
        <div style={{ "width": "495px", "margin": "0 auto", "display": "flex", "flexDirection": "column", "justifyContent": "space-between" }}>
          <div className="row">
            <div className="col-8">

              <img style={{ "height": "20px" }} src={Logo} alt="" />

            </div>
            <div className="col-4">
              <p style={{ "fontSize": "0.5em", "margin": "5px 0", "textTransform": "uppercase" }}>
                <b>{event.seller_name}</b> <br />
                {event.seller_address} <br />
                {event.seller_zip} &nbsp; {}<br />
                {event.seller_country} <br />
                CIF:&nbsp;{event.seller_vat}</p>
            </div>
          </div>

          <br />

          <div className="row" style={{ "background": "#f7f7f7", "display": "flex", "alignItems": "center" }}>
            <div className="col">
              <p style={{ "fontSize": "0.6em", "margin": "10px 0", "textTransform": "uppercase" }}>
                <b>{data.company_name}</b> <br />
                {data.address} <br />
                {data.zip} <br />
                {data.country} <br />
                <b>NIF/VAT: {data.vat}</b> <br /></p>
            </div>
            <div className="col">
              <p style={{ "fontSize": "1em", "margin": "0px 0" }}><b>INVOICE NUMBER: {data.invoice_number}</b></p>
              <p style={{ "fontSize": "0.6em", "margin": "0px 0" }}>INVOICE DATE: <b>{data.invoice_date}</b></p>
              <p style={{ "fontSize": "0.6em", "margin": "0px 0" }}>DUE DATE: <b>{data.invoice_date}</b></p>

            </div>
          </div>

          {/* BODY */}

          <div>

            <div className="row">
              <div className="col-12">
                <p style={{ "fontSize": "0.8em", "margin": "10px 0" }}>Details</p>
              </div>
            </div>

            <div className="row text-left" style={{ "borderTop": "1px solid #222222", "borderBottom": "1px solid #222222" }}>

              <div className="col-8">
                <p style={{ "fontSize": "0.6em", "margin": "0px 0", "textAlign": "left" }}>Description</p>
              </div>
              <div className="col-2">
                <p style={{ "fontSize": "0.6em", "margin": "0px 0", "textAlign": "center" }}>Quantity</p>
              </div>
              <div className="col-2">
                <p style={{ "fontSize": "0.6em", "margin": "0px 0", "textAlign": "right" }}>Subtotal</p></div>
            </div>

            <div className="row text-left">
              <div className="col-8">
                <p style={{ "fontSize": "0.6em", "margin": "2px 0" }}><b>{data.category}</b></p>
                <p style={{ "fontSize": "0.6em", "margin": "2px 0" }}>{data.location}</p>
                <p style={{ "fontSize": "0.6em", "margin": "2px 0" }}>{data.pricetype}</p>

              </div>
              <div className="col-2">
                <p style={{ "fontSize": "0.6em", "margin": "10px 0", "textAlign": "center" }}>1</p>
              </div>
              <div className="col-2"><p style={{ "fontSize": "0.6em", "margin": "10px 0", "textAlign": "right" }}>{data.subtotal}&nbsp;{event.symbol}</p></div>
            </div>

            <div className="row text-left" style={{ "borderTop": "1px solid #222222" }}>
              <div className="col-8">
              </div>
              <div className="col-2">
                <p style={{ "fontSize": "0.6em", "margin": "2px 0" }}>Subtotal:</p>
                {data.country === "Spain" ? <p style={{ "fontSize": "0.6em", "margin": "2px 0" }}>IVA: ({event.iva} %)</p> : null}
              </div>
              <div className="col-2">
                <p style={{ "fontSize": "0.6em", "margin": "2px 0", "textAlign": "right" }}>{data.subtotal}&nbsp;{event.symbol}</p>
                {data.country === "Spain" ? <p style={{ "fontSize": "0.6em", "margin": "2px 0", "textAlign": "right" }}>{data.iva}&nbsp;{event.symbol}</p> : null}
              </div>
            </div>

            <div className="row text-left">
              <div className="col-8">
              </div>
              <div className="col-2" style={{ "borderTop": "0.5px solid #222222" }}>
                <p style={{ "fontSize": "1em", "margin": "10px 0", "textAlign": "left" }}>Total</p>
              </div>
              <div className="col-2" style={{ "borderTop": "0.5px solid #222222", "textAlign": "right" }}>
                <p style={{ "fontSize": "1em", "margin": "10px 0", "textAlign": "right" }}>{data.total}&nbsp;{event.symbol}</p>

              </div>
            </div>

  

            <div className="row text-left">

              <div className="col-12">
                <p style={{ "fontSize": "0.6em", "textAlign": "left" }} dangerouslySetInnerHTML={this.sellerBankInfo(event)}>
                  
                </p>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="row" style={{ "position": "relative", "top": "170px" }}>
            <div className="col-12">
              <p style={{ "fontSize": "0.5em", "padding": "10px 0", "background": "#f7f7f7", "textAlign": "center" }}>{event.seller_footer}</p>
            </div>
          </div>

        </div>
      </ div>
    )
  }
}