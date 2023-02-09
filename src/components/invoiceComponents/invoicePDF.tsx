import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
import { renderToString } from 'react-dom/server';

interface IProps {
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
      <div className="container-fluid">

        <div className="row">

          <div className="col">


            <div className="row">
              <div className="col bg-dark">

                <h3 className="text-light" id="header-invoice">2023 SMB INNOVATION SUMMIT</h3>

              </div>
            </div>

            <br />

            <div className="row">
              <div className="col-6">
                Company name: {this.props.companyName} <br />
                Addres: {this.props.address} <br />
                Zip/Postal Code: {this.props.zipCode} <br />
                Country: {this.props.country} <br />
                VAT: {this.props.vatNumber} <br />
              </div>
              <div className="col-6">
                VAT 046065132035 <br />
                Addres: C. de Pamplona, 22 <br />
                Zip/Postal Code: 28039 <br />
                Country: Spain, Madrid <br />
                Email: info@smbsummit.com
              </div>
            </div>
            <br />

            <div className="row bg-dark text-light">
              <div className="col">
                Incove number: 00000
              </div>
              <div className="col">
                Invoice date: 01/01/20203
              </div>
            </div>
            <br />

            <div className="row">
              <div className="col">
                <h3>Details</h3>
              </div>
            </div>
            <hr />

            <div className="row text-left">
              <div className="col-8">
                Description
              </div>
              <div className="col-2">
                Quantity
              </div>
              <div className="col-2">Subtotal</div>
            </div>
            <hr />

            <div className="row text-left">
              <div className="col-8">
                <p>{this.props.sponsorCategory}</p>
                <p>{this.props.location}</p>
              </div>
              <div className="col-2">
                1
              </div>
              <div className="col-2">{this.props.subtotal}</div>
            </div>

            <hr />

            <div className="row text-left">
              <div className="col-8">
              </div>
              <div className="col-2">
                <p>Subtotal:</p>
                <p>IVA: ({this.props.iva} %)</p>
              </div>
              <div className="col-2">
                <p>{this.props.subtotal}</p>
                <p>{this.props.ivaTotal}</p>
              </div>
            </div>

            <div className="row text-left">
              <div className="col-8">
              </div>
              <div className="col-2">
                <h3>Total:</h3>
              </div>
              <div className="col-2">
                <h3>{this.props.total}</h3>

              </div>
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