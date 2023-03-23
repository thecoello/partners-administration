import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
import { renderToString } from 'react-dom/server';
import Logo from '../../assets/logo.png'

interface IProps {
  currency?: string,
  adminUser?: boolean,
  invoiceAvailable?: boolean
  editInvoice?: boolean
  companyName?: string,
  address?: string,
  zipCode?: string,
  country?: string,
  vatNumber?: string,
  sponsorCategory?: string,
  location?: string,
  subtotal?: number,
  iva?: number,
  ivaTotal?: number,
  total?: number,
  downloadInvoice?: boolean
  sellerName?: string,
  sellerAddress?: string,
  sellerCP?: string,
  sellerCity?: string,
  sellerCountry?: string,
  sellerVAT?: string,
  footerText?: string,
  invoiceNumber?: string
  invoiceDate?: string
  dueDate?: any
}

interface IinvoicePDF {

}

export default class InvoicePDF extends React.PureComponent<IProps, IinvoicePDF>{

  componentDidMount() {



  }

  constructor(props: IProps) {
    super(props)

  }

  invoice = () => {
    return (
      <div style={{ "width": "595px", "margin": "30px 0" }}>




        <div style={{ "width": "495px", "margin": "0 auto", "display": "flex", "flexDirection": "column", "justifyContent": "space-between" }}>
          <div className="row">
            <div className="col-8">

              <img style={{ "height": "20px" }} src={Logo} alt="" />

            </div>
            <div className="col-4">
              <p style={{ "fontSize": "0.5em", "margin": "5px 0", "textTransform": "uppercase" }}>
                <b>{this.props.sellerName}</b> <br />
                {this.props.sellerAddress} <br />
                {this.props.sellerCP} &nbsp; {this.props.sellerCity}<br />
                {this.props.sellerCountry} <br />
                CIF:&nbsp;{this.props.sellerVAT}</p>
            </div>
          </div>

          <br />

          <div className="row" style={{ "background": "#f7f7f7", "display": "flex", "alignItems": "center" }}>
            <div className="col">
              <p style={{ "fontSize": "0.6em", "margin": "10px 0", "textTransform": "uppercase" }}>
                <b>{this.props.companyName}</b> <br />
                {this.props.address} <br />
                {this.props.zipCode} <br />
                {this.props.country} <br />
                <b>NIF/VAT: {this.props.vatNumber}</b> <br /></p>
            </div>
            <div className="col">
              <p style={{ "fontSize": "1em", "margin": "0px 0" }}><b>INVOICE NUMBER: {this.props.invoiceNumber}</b></p>
              <p style={{ "fontSize": "0.6em", "margin": "0px 0" }}>INVOICE DATE: <b>{this.props.invoiceDate}</b></p>
              <p style={{ "fontSize": "0.6em", "margin": "0px 0" }}>DUE DATE: <b>{this.props.dueDate}</b></p>

            </div>
          </div>
          <br />


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
                <p style={{ "fontSize": "0.6em", "margin": "10px 0" }}><b>{this.props.sponsorCategory}</b></p>
                <p style={{ "fontSize": "0.6em", "margin": "10px 0" }}>{this.props.location}</p>
              </div>
              <div className="col-2">
                <p style={{ "fontSize": "0.6em", "margin": "10px 0", "textAlign": "center" }}>1</p>
              </div>
              <div className="col-2"><p style={{ "fontSize": "0.6em", "margin": "10px 0", "textAlign": "right" }}>{this.props.subtotal}&nbsp;{this.props.currency}</p></div>
            </div>

            <div className="row text-left" style={{ "borderTop": "1px solid #222222" }}>
              <div className="col-8">
              </div>
              <div className="col-2">
                <p style={{ "fontSize": "0.6em", "margin": "10px 0" }}>Subtotal:</p>
                {this.props.country === "Spain" ? <p style={{ "fontSize": "0.6em", "margin": "10px 0" }}>IVA: ({this.props.iva} %)</p> : null}
              </div>
              <div className="col-2">
                <p style={{ "fontSize": "0.6em", "margin": "10px 0", "textAlign": "right" }}>{this.props.subtotal}&nbsp;{this.props.currency}</p>
                {this.props.country === "Spain" ? <p style={{ "fontSize": "0.6em", "margin": "10px 0", "textAlign": "right" }}>{this.props.ivaTotal}&nbsp;{this.props.currency}</p> : null}
              </div>
            </div>

            <div className="row text-left">
              <div className="col-8">
              </div>
              <div className="col-2" style={{ "borderTop": "0.5px solid #222222" }}>
                <p style={{ "fontSize": "1em", "margin": "10px 0", "textAlign": "left" }}>Total</p>
              </div>
              <div className="col-2" style={{ "borderTop": "0.5px solid #222222", "textAlign": "right" }}>
                <p style={{ "fontSize": "1em", "margin": "10px 0", "textAlign": "right" }}>{this.props.total}&nbsp;{this.props.currency}</p>

              </div>
            </div>

            <br />
            <br />


            <div className="row text-left">

              <div className="col-12">
                <p style={{ "fontSize": "0.6em", "textAlign": "left" }}>
                  <b>Recipient Account: </b>ES50 2100 2502 7513 0020 0716 SWIFT: CAIXESBBXXX <br />
                  <b>Bank:</b> CAIXABANK, S.A. <br />
                  <b>Bank address:</b> Calle Dr. Esquerdo,97 (28007 Madrid) Recipient Name: TASMAN GRAPHICS <br />
                  <b>Company Information:</b> <br />
                  Tasman Graphics, S.L. <br />
                  Calle Pamplona 22, Local <br />
                  28039 Madrid <br />
                  SPAIN</p>
              </div>
            </div>
          </div>



          {/* FOOTER */}
          <div className="row" style={{ "position": "relative", "top": "170px" }}>
            <div className="col-12">
              <p style={{ "fontSize": "0.5em", "padding": "10px 0", "background": "#f7f7f7", "textAlign": "center" }}>{this.props.footerText}</p>
            </div>
          </div>

        </div>
      </ div>
    )
  }

  render(): React.ReactNode {
    return (
      <this.invoice />
    )
  }

}