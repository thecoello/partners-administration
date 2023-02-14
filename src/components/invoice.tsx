import jsPDF from "jspdf";
import React from "react";
import InvoicePDF from "./invoiceComponents/invoicePDF"
import ReactDOMServer from "react-dom/server"

interface IProps {

}

interface IState {
  currency?:string,
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
  downloadInvoice?: boolean,
  sellerName?: string,
  sellerAddress?: string,
  sellerCP?: string,
  sellerCity?: string,
  sellerCountry?: string,
  sellerVAT?: string,
  footerText?: string,
  invoiceNumber?: string,
  invoiceDate?: string
}

export default class Invoice extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)

    this.state = {
      currency: "€",
      adminUser: true,
      invoiceAvailable: true,
      editInvoice: false,
      companyName: 'NOMBRE EMPRESA',
      address: 'C/ CON DIRECCIÓN 5',
      zipCode: '28033',
      country: 'SPAIN',
      vatNumber: '0116851',
      sponsorCategory: 'Gold Sponsor',
      location: 'Panama (NA + LAC) + Bangkok (APJ + GC) + Vienna (EMEA + MEE)',
      subtotal: 1000,
      iva: 21,
      ivaTotal: 0,
      total: 0,
      downloadInvoice: false,
      sellerName: "TASMAN GRAPHICS, S.L.",
      sellerAddress: "C/ Pamplona, 22 Local",
      sellerCP: "28039",
      sellerCity: "Madrid",
      sellerCountry: "España",
      sellerVAT: "ESB86062312",
      footerText: "Tasman Graphics, S.L. - Inscrita en el Registro Mercantil de Madrid, Tomo 28272, Folio 36, Sección 8, Hoja No M-509184 - C.I.F.: B86062312",
      invoiceNumber: "000000",
      invoiceDate: "01/01/2023"
    }

  }

  disableInput = () => {
    const inputs = document.querySelectorAll('.form-control')
    inputs.forEach((input, i) => {
      input.setAttribute('disabled', '')
    });
  }


  enableInput = () => {
    const inputs = document.querySelectorAll('.form-control')
    inputs.forEach((input, i) => {
      input.removeAttribute('disabled')
    });
  }

  componentDidMount(): void {
    this.state.invoiceAvailable ? this.disableInput() : null;
  }

  selectorCountry = () => {
    return (
      <select value={this.state.country} onChange={(e) => {
        this.setState({ country: e.target.value })
      }} className="form-select form-control" id="floatingSelectDisabled" aria-label="Floating label disabled select example" required>
        <option value="null">Select country</option>
        <option value="AF">Afghanistan</option>
        <option value="AX">Aland Islands</option>
        <option value="AL">Albania</option>
        <option value="DZ">Algeria</option>
        <option value="AS">American Samoa</option>
        <option value="AD">Andorra</option>
        <option value="AO">Angola</option>
        <option value="AI">Anguilla</option>
        <option value="AQ">Antarctica</option>
        <option value="AG">Antigua and Barbuda</option>
        <option value="AR">Argentina</option>
        <option value="AM">Armenia</option>
        <option value="AW">Aruba</option>
        <option value="AU">Australia</option>
        <option value="AT">Austria</option>
        <option value="AZ">Azerbaijan</option>
        <option value="BS">Bahamas</option>
        <option value="BH">Bahrain</option>
        <option value="BD">Bangladesh</option>
        <option value="BB">Barbados</option>
        <option value="BY">Belarus</option>
        <option value="BE">Belgium</option>
        <option value="BZ">Belize</option>
        <option value="BJ">Benin</option>
        <option value="BM">Bermuda</option>
        <option value="BT">Bhutan</option>
        <option value="BO">Bolivia</option>
        <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
        <option value="BA">Bosnia and Herzegovina</option>
        <option value="BW">Botswana</option>
        <option value="BV">Bouvet Island</option>
        <option value="BR">Brazil</option>
        <option value="IO">British Indian Ocean Territory</option>
        <option value="BN">Brunei Darussalam</option>
        <option value="BG">Bulgaria</option>
        <option value="BF">Burkina Faso</option>
        <option value="BI">Burundi</option>
        <option value="KH">Cambodia</option>
        <option value="CM">Cameroon</option>
        <option value="CA">Canada</option>
        <option value="CV">Cape Verde</option>
        <option value="KY">Cayman Islands</option>
        <option value="CF">Central African Republic</option>
        <option value="TD">Chad</option>
        <option value="CL">Chile</option>
        <option value="CN">China</option>
        <option value="CX">Christmas Island</option>
        <option value="CC">Cocos (Keeling) Islands</option>
        <option value="CO">Colombia</option>
        <option value="KM">Comoros</option>
        <option value="CG">Congo</option>
        <option value="CD">Congo, Democratic Republic of the Congo</option>
        <option value="CK">Cook Islands</option>
        <option value="CR">Costa Rica</option>
        <option value="CI">Cote D'Ivoire</option>
        <option value="HR">Croatia</option>
        <option value="CU">Cuba</option>
        <option value="CW">Curacao</option>
        <option value="CY">Cyprus</option>
        <option value="CZ">Czech Republic</option>
        <option value="DK">Denmark</option>
        <option value="DJ">Djibouti</option>
        <option value="DM">Dominica</option>
        <option value="DO">Dominican Republic</option>
        <option value="EC">Ecuador</option>
        <option value="EG">Egypt</option>
        <option value="SV">El Salvador</option>
        <option value="GQ">Equatorial Guinea</option>
        <option value="ER">Eritrea</option>
        <option value="EE">Estonia</option>
        <option value="ET">Ethiopia</option>
        <option value="FK">Falkland Islands (Malvinas)</option>
        <option value="FO">Faroe Islands</option>
        <option value="FJ">Fiji</option>
        <option value="FI">Finland</option>
        <option value="FR">France</option>
        <option value="GF">French Guiana</option>
        <option value="PF">French Polynesia</option>
        <option value="TF">French Southern Territories</option>
        <option value="GA">Gabon</option>
        <option value="GM">Gambia</option>
        <option value="GE">Georgia</option>
        <option value="DE">Germany</option>
        <option value="GH">Ghana</option>
        <option value="GI">Gibraltar</option>
        <option value="GR">Greece</option>
        <option value="GL">Greenland</option>
        <option value="GD">Grenada</option>
        <option value="GP">Guadeloupe</option>
        <option value="GU">Guam</option>
        <option value="GT">Guatemala</option>
        <option value="GG">Guernsey</option>
        <option value="GN">Guinea</option>
        <option value="GW">Guinea-Bissau</option>
        <option value="GY">Guyana</option>
        <option value="HT">Haiti</option>
        <option value="HM">Heard Island and Mcdonald Islands</option>
        <option value="VA">Holy See (Vatican City State)</option>
        <option value="HN">Honduras</option>
        <option value="HK">Hong Kong</option>
        <option value="HU">Hungary</option>
        <option value="IS">Iceland</option>
        <option value="IN">India</option>
        <option value="ID">Indonesia</option>
        <option value="IR">Iran, Islamic Republic of</option>
        <option value="IQ">Iraq</option>
        <option value="IE">Ireland</option>
        <option value="IM">Isle of Man</option>
        <option value="IL">Israel</option>
        <option value="IT">Italy</option>
        <option value="JM">Jamaica</option>
        <option value="JP">Japan</option>
        <option value="JE">Jersey</option>
        <option value="JO">Jordan</option>
        <option value="KZ">Kazakhstan</option>
        <option value="KE">Kenya</option>
        <option value="KI">Kiribati</option>
        <option value="KP">Korea, Democratic People's Republic of</option>
        <option value="KR">Korea, Republic of</option>
        <option value="XK">Kosovo</option>
        <option value="KW">Kuwait</option>
        <option value="KG">Kyrgyzstan</option>
        <option value="LA">Lao People's Democratic Republic</option>
        <option value="LV">Latvia</option>
        <option value="LB">Lebanon</option>
        <option value="LS">Lesotho</option>
        <option value="LR">Liberia</option>
        <option value="LY">Libyan Arab Jamahiriya</option>
        <option value="LI">Liechtenstein</option>
        <option value="LT">Lithuania</option>
        <option value="LU">Luxembourg</option>
        <option value="MO">Macao</option>
        <option value="MK">Macedonia, the Former Yugoslav Republic of</option>
        <option value="MG">Madagascar</option>
        <option value="MW">Malawi</option>
        <option value="MY">Malaysia</option>
        <option value="MV">Maldives</option>
        <option value="ML">Mali</option>
        <option value="MT">Malta</option>
        <option value="MH">Marshall Islands</option>
        <option value="MQ">Martinique</option>
        <option value="MR">Mauritania</option>
        <option value="MU">Mauritius</option>
        <option value="YT">Mayotte</option>
        <option value="MX">Mexico</option>
        <option value="FM">Micronesia, Federated States of</option>
        <option value="MD">Moldova, Republic of</option>
        <option value="MC">Monaco</option>
        <option value="MN">Mongolia</option>
        <option value="ME">Montenegro</option>
        <option value="MS">Montserrat</option>
        <option value="MA">Morocco</option>
        <option value="MZ">Mozambique</option>
        <option value="MM">Myanmar</option>
        <option value="NA">Namibia</option>
        <option value="NR">Nauru</option>
        <option value="NP">Nepal</option>
        <option value="NL">Netherlands</option>
        <option value="AN">Netherlands Antilles</option>
        <option value="NC">New Caledonia</option>
        <option value="NZ">New Zealand</option>
        <option value="NI">Nicaragua</option>
        <option value="NE">Niger</option>
        <option value="NG">Nigeria</option>
        <option value="NU">Niue</option>
        <option value="NF">Norfolk Island</option>
        <option value="MP">Northern Mariana Islands</option>
        <option value="NO">Norway</option>
        <option value="OM">Oman</option>
        <option value="PK">Pakistan</option>
        <option value="PW">Palau</option>
        <option value="PS">Palestinian Territory, Occupied</option>
        <option value="PA">Panama</option>
        <option value="PG">Papua New Guinea</option>
        <option value="PY">Paraguay</option>
        <option value="PE">Peru</option>
        <option value="PH">Philippines</option>
        <option value="PN">Pitcairn</option>
        <option value="PL">Poland</option>
        <option value="PT">Portugal</option>
        <option value="PR">Puerto Rico</option>
        <option value="QA">Qatar</option>
        <option value="RE">Reunion</option>
        <option value="RO">Romania</option>
        <option value="RU">Russian Federation</option>
        <option value="RW">Rwanda</option>
        <option value="BL">Saint Barthelemy</option>
        <option value="SH">Saint Helena</option>
        <option value="KN">Saint Kitts and Nevis</option>
        <option value="LC">Saint Lucia</option>
        <option value="MF">Saint Martin</option>
        <option value="PM">Saint Pierre and Miquelon</option>
        <option value="VC">Saint Vincent and the Grenadines</option>
        <option value="WS">Samoa</option>
        <option value="SM">San Marino</option>
        <option value="ST">Sao Tome and Principe</option>
        <option value="SA">Saudi Arabia</option>
        <option value="SN">Senegal</option>
        <option value="RS">Serbia</option>
        <option value="CS">Serbia and Montenegro</option>
        <option value="SC">Seychelles</option>
        <option value="SL">Sierra Leone</option>
        <option value="SG">Singapore</option>
        <option value="SX">Sint Maarten</option>
        <option value="SK">Slovakia</option>
        <option value="SI">Slovenia</option>
        <option value="SB">Solomon Islands</option>
        <option value="SO">Somalia</option>
        <option value="ZA">South Africa</option>
        <option value="GS">South Georgia and the South Sandwich Islands</option>
        <option value="SS">South Sudan</option>
        <option value="ES">Spain</option>
        <option value="LK">Sri Lanka</option>
        <option value="SD">Sudan</option>
        <option value="SR">Suriname</option>
        <option value="SJ">Svalbard and Jan Mayen</option>
        <option value="SZ">Swaziland</option>
        <option value="SE">Sweden</option>
        <option value="CH">Switzerland</option>
        <option value="SY">Syrian Arab Republic</option>
        <option value="TW">Taiwan, Province of China</option>
        <option value="TJ">Tajikistan</option>
        <option value="TZ">Tanzania, United Republic of</option>
        <option value="TH">Thailand</option>
        <option value="TL">Timor-Leste</option>
        <option value="TG">Togo</option>
        <option value="TK">Tokelau</option>
        <option value="TO">Tonga</option>
        <option value="TT">Trinidad and Tobago</option>
        <option value="TN">Tunisia</option>
        <option value="TR">Turkey</option>
        <option value="TM">Turkmenistan</option>
        <option value="TC">Turks and Caicos Islands</option>
        <option value="TV">Tuvalu</option>
        <option value="UG">Uganda</option>
        <option value="UA">Ukraine</option>
        <option value="AE">United Arab Emirates</option>
        <option value="GB">United Kingdom</option>
        <option value="US">United States</option>
        <option value="UM">United States Minor Outlying Islands</option>
        <option value="UY">Uruguay</option>
        <option value="UZ">Uzbekistan</option>
        <option value="VU">Vanuatu</option>
        <option value="VE">Venezuela</option>
        <option value="VN">Viet Nam</option>
        <option value="VG">Virgin Islands, British</option>
        <option value="VI">Virgin Islands, U.s.</option>
        <option value="WF">Wallis and Futuna</option>
        <option value="EH">Western Sahara</option>
        <option value="YE">Yemen</option>
        <option value="ZM">Zambia</option>
        <option value="ZW">Zimbabwe</option>
      </select>
    )
  }

  generateInvoice = () => {
    return (
      <>
        <div className="mb-3">
          <div className="d-flex flex-column text-center ">
            <button type="submit" className="btn btn-success">Generate Invoice</button>
          </div>
        </div>
      </>
    )
  }


  downloadInvoice = () => {


    return (
      <>
        <div className="mb-3">
          <div className="d-flex flex-column text-center ">
            <span onClick={() => {

              this.setState({ downloadInvoice: true })

              const doc = new jsPDF('p','px',[595, 842]);

              doc.html(ReactDOMServer.renderToString( <InvoicePDF
                currency={this.state.currency}
                invoiceNumber={this.state.invoiceNumber}
                invoiceDate={this.state.invoiceDate}
                companyName={this.state.companyName}
                address={this.state.address}
                zipCode={this.state.zipCode}
                country={this.state.country}
                vatNumber={this.state.vatNumber}
                sponsorCategory={this.state.sponsorCategory}
                location={this.state.location}
                subtotal={this.state.subtotal}
                iva={this.state.iva}
                ivaTotal={this.state.ivaTotal}
                total={this.state.total}
                sellerName={this.state.sellerName}
                sellerAddress={this.state.sellerAddress}
                sellerCP={this.state.sellerCP}
                sellerCity={this.state.sellerCity}
                sellerCountry={this.state.country}
                sellerVAT={this.state.sellerVAT}
                footerText={this.state.footerText}
              />), {
                async callback(doc) {
                  console.log(doc)
                  doc.save("pdf_name");
                }
              });

            }} className="btn btn-success" >Download Invoice</span>
          </div>
        </div>
      </>
    )
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {



  }


  editInvoice = () => {
    return (
      <>
        <div className="mb-3">
          <div className="d-flex flex-column text-center ">
            <button onClick={() => {
              this.setState({ editInvoice: true })
              this.enableInput()
            }} className="btn btn-dark" >Edit Invoice</button>
          </div>
        </div>
      </>
    )
  }

  finishEditInvoice = () => {
    return (
      <>
        <div className="mb-3">
          <div className="d-flex flex-column text-center ">
            <button onClick={() => {
              this.setState({ editInvoice: false })
              this.disableInput()
            }} className="btn btn-primary" >Finish edit invoice</button>
          </div>
        </div>
      </>
    )
  }

  setIva = () => {
    return <p>IVA ({this.state.iva} %): {this.state.ivaTotal}&nbsp;{this.state.currency}</p>
  }

  invoiceList = () => {
    return (
      <form className="needs-validation">
        <h5><b>Company information</b></h5>
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-4"> <div className="mb-3">
              <label className="form-label">Company Name*</label>
              <input value={this.state.companyName} onChange={(e) => {
                this.setState({ companyName: e.target.value })
              }} type="text" className="form-control" required />
            </div></div>
            <div className="col-8"> <div className="mb-3">
              <label className="form-label">Address*</label>
              <input value={this.state.address} onChange={(e) => {
                this.setState({ address: e.target.value })
              }} type="text" className="form-control" required />
            </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col">  <div className="mb-3">
              <label className="form-label">ZIP/Postal Code*</label>
              <input value={this.state.zipCode} onChange={(e) => {
                this.setState({ zipCode: e.target.value })
              }} type="text" className="form-control" required />
            </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Country*</label>
                <this.selectorCountry />
              </div>
            </div>

            <div className="col">
              <div className="mb-3">
                <label className="form-label">VAT Number</label>
                <input value={this.state.vatNumber} onChange={(e) => {
                  this.setState({ vatNumber: e.target.value })
                }} type="text" className="form-control" />
              </div>
            </div>
          </div>
        </div>

        <br /><br />

        <h5><b>Pack information</b></h5>
        <hr />

        <div className="container">
          <div className="row">

            <div className="col">
              <div className="mb-3">
                <h6 className="form-label">Sponsorship category</h6>
                <p>{this.state.sponsorCategory}</p>

              </div>
            </div>

            <div className="col">
              <div className="mb-3">
                <h6 className="form-label">Location</h6>
                <p>{this.state.location}</p>
              </div>
            </div>
          </div>
        </div>

        <hr /><br /><br />

        <div className="container">
          <div className="row">

            <div className="col-6">
              {!this.state.invoiceAvailable ? <div className="col-6"><this.generateInvoice /></div> : <div className="col-6"> {this.state.editInvoice ? <this.finishEditInvoice /> : <this.editInvoice />}   <this.downloadInvoice /></div>}
            </div>

            <div className="col-4">
              <div className="mb-3 text-end">
                <h5><b>Resumen</b></h5>
                <div className="d-flex flex-column">
                  <p>Subtotal: {this.state.subtotal} &nbsp; {this.state.currency}
                  </p>

                  
                  {this.state.country === "SPAIN" ? <><this.setIva /></> : null}
                </div>
              </div>
            </div>

            <div className="col-2 ">
              <div className="mb-3">
                <div className="d-flex flex-column text-center ">

                  <h5><b>Total:</b></h5>
                  <h3>{this.state.total}&nbsp; {this.state.currency}</h3>

                </div>
              </div>
            </div>

          </div>
        </div>
      </form>
    )
  }




  render(): React.ReactNode {
    return (
      <>
        <div className="section">

          <div className="container">
            <div className="row">
              <div className="col-6">  <h3>Invoices</h3></div>
              <div className="col-6 text-end">
                <button className="btn btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Create Invoice</button>
              </div>
            </div>
          </div>

          <div className="offcanvas offcanvas-bottom h-100" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
            <div className="offcanvas-header bg-black text-white">
              <h3 className="offcanvas-title" id="offcanvasBottomLabel">New Invoice</h3>

              <div className="row">
                <div className="col d-flex">
                  <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-center h-100 container">


        <this.invoiceList />

            </div>
          </div>
        </div>
      </>
    )
  }


}


