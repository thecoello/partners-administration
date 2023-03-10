import jsPDF from "jspdf";
import React from "react";
import InvoicePDF from "./invoiceComponents/invoicePDF"
import ReactDOMServer from "react-dom/server"
import axios from "axios";
import FormData from "form-data"
import qs, { stringify } from "qs"

interface IProps {

}

interface IState {
  url?: string
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
  data?: any
  userId?: any
}

export default class Invoice extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)

    this.state = {
      url: "http://localhost:8000",
      currency: "€",
      adminUser: true,
      invoiceAvailable: false,
      editInvoice: false,
      companyName: "",
      address: "",
      zipCode: "",
      country: "",
      vatNumber: "",
      sponsorCategory: "",
      location: "",
      subtotal: 1000,
      iva: 0,
      ivaTotal: 0,
      total: 0,
      downloadInvoice: false,
      sellerName: "",
      sellerAddress: "",
      sellerCP: "",
      sellerCity: "",
      sellerCountry: "",
      sellerVAT: "",
      footerText: "",
      invoiceNumber: "",
      invoiceDate: "",
      data: [],
      userId: ""
    }

  }

  getEventInfo() {
    axios.get(this.state.url + "/api/eventinfo").then((response) => {
      const eventInfo = response.data[0]
      this.setState({ sellerName: eventInfo.seller_name })
      this.setState({ sellerAddress: eventInfo.seller_address })
      this.setState({ sellerCP: eventInfo.seller_zip })
      this.setState({ sellerCity: eventInfo.seller_city })
      this.setState({ sellerCountry: eventInfo.seller_country })
      this.setState({ sellerVAT: eventInfo.seller_vat })
      this.setState({ footerText: eventInfo.seller_footer })
    })
  }

  getInvoiceAll() {
    axios.get(this.state.url + "/api/getusersinvoices").then((response) => {
      this.setState({ data: response.data })
    })
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
    this.getEventInfo()
    this.getInvoiceAll()
  }

  selectorCountry = () => {
    return (
      <select value={this.state.country} onChange={(e) => {
        this.setState({ country: e.target.value })

        if (e.target.value === "Spain") {
          this.setState({ iva: 21 }, () => {
            this.setState({ ivaTotal: (Number(this.state.subtotal) * Number(this.state.iva)) / 100 }, () => {
              this.setState({ total: Number(this.state.subtotal) + Number(this.state.ivaTotal) })
            })
          })
        } else {
          this.setState({ iva: 0 })
          this.setState({ ivaTotal: 0 })
          this.setState({ total: Number(this.state.subtotal) })
        }

      }} className="form-select form-control" id="floatingSelectDisabled" aria-label="Floating label disabled select example" required>
        <option value="null">Select country</option>
        <option value="Afghanistan">Afghanistan</option>
        <option value="Aland Islands">Aland Islands</option>
        <option value="Albania">Albania</option>
        <option value="Algeria">Algeria</option>
        <option value="American Samoa">American Samoa</option>
        <option value="Andorra">Andorra</option>
        <option value="Angola">Angola</option>
        <option value="Anguilla">Anguilla</option>
        <option value="Antarctica">Antarctica</option>
        <option value="Antigua and Barbuda">Antigua and Barbuda</option>
        <option value="Argentina">Argentina</option>
        <option value="Armenia">Armenia</option>
        <option value="Aruba">Aruba</option>
        <option value="Australia">Australia</option>
        <option value="Austria">Austria</option>
        <option value="Azerbaijan">Azerbaijan</option>
        <option value="Bahamas">Bahamas</option>
        <option value="Bahrain">Bahrain</option>
        <option value="Bangladesh">Bangladesh</option>
        <option value="Barbados">Barbados</option>
        <option value="Belarus">Belarus</option>
        <option value="Belgium">Belgium</option>
        <option value="Belize">Belize</option>
        <option value="Benin">Benin</option>
        <option value="Bermuda">Bermuda</option>
        <option value="Bhutan">Bhutan</option>
        <option value="Bolivia">Bolivia</option>
        <option value="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</option>
        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
        <option value="Botswana">Botswana</option>
        <option value="Bouvet Island">Bouvet Island</option>
        <option value="Brazil">Brazil</option>
        <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
        <option value="Brunei Darussalam">Brunei Darussalam</option>
        <option value="Bulgaria">Bulgaria</option>
        <option value="Burkina Faso">Burkina Faso</option>
        <option value="Burundi">Burundi</option>
        <option value="Cambodia">Cambodia</option>
        <option value="Cameroon">Cameroon</option>
        <option value="Canada">Canada</option>
        <option value="Cape Verde">Cape Verde</option>
        <option value="Cayman Islands">Cayman Islands</option>
        <option value="Central African Republic">Central African Republic</option>
        <option value="Chad">Chad</option>
        <option value="Chile">Chile</option>
        <option value="China">China</option>
        <option value="Christmas Island">Christmas Island</option>
        <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
        <option value="Colombia">Colombia</option>
        <option value="Comoros">Comoros</option>
        <option value="Congo">Congo</option>
        <option value="Congo, Democratic Republic of the Congo">Congo, Democratic Republic of the Congo</option>
        <option value="Cook Islands">Cook Islands</option>
        <option value="Costa Rica">Costa Rica</option>
        <option value="Cote D'Ivoire">Cote D'Ivoire</option>
        <option value="Croatia">Croatia</option>
        <option value="Cuba">Cuba</option>
        <option value="Curacao">Curacao</option>
        <option value="Cyprus">Cyprus</option>
        <option value="Czech Republic">Czech Republic</option>
        <option value="Denmark">Denmark</option>
        <option value="Djibouti">Djibouti</option>
        <option value="Dominica">Dominica</option>
        <option value="Dominican Republic">Dominican Republic</option>
        <option value="Ecuador">Ecuador</option>
        <option value="Egypt">Egypt</option>
        <option value="El Salvador">El Salvador</option>
        <option value="Equatorial Guinea">Equatorial Guinea</option>
        <option value="Eritrea">Eritrea</option>
        <option value="Estonia">Estonia</option>
        <option value="Ethiopia">Ethiopia</option>
        <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
        <option value="Faroe Islands">Faroe Islands</option>
        <option value="Fiji">Fiji</option>
        <option value="Finland">Finland</option>
        <option value="France">France</option>
        <option value="French Guiana">French Guiana</option>
        <option value="French Polynesia">French Polynesia</option>
        <option value="French Southern Territories">French Southern Territories</option>
        <option value="Gabon">Gabon</option>
        <option value="Gambia">Gambia</option>
        <option value="Georgia">Georgia</option>
        <option value="Germany">Germany</option>
        <option value="Ghana">Ghana</option>
        <option value="Gibraltar">Gibraltar</option>
        <option value="Greece">Greece</option>
        <option value="Greenland">Greenland</option>
        <option value="Grenada">Grenada</option>
        <option value="Guadeloupe">Guadeloupe</option>
        <option value="Guam">Guam</option>
        <option value="Guatemala">Guatemala</option>
        <option value="Guernsey">Guernsey</option>
        <option value="Guinea">Guinea</option>
        <option value="Guinea-Bissau">Guinea-Bissau</option>
        <option value="Guyana">Guyana</option>
        <option value="Haiti">Haiti</option>
        <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
        <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
        <option value="Honduras">Honduras</option>
        <option value="Hong Kong">Hong Kong</option>
        <option value="Hungary">Hungary</option>
        <option value="Iceland">Iceland</option>
        <option value="India">India</option>
        <option value="Indonesia">Indonesia</option>
        <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
        <option value="Iraq">Iraq</option>
        <option value="Ireland">Ireland</option>
        <option value="Isle of Man">Isle of Man</option>
        <option value="Israel">Israel</option>
        <option value="Italy">Italy</option>
        <option value="Jamaica">Jamaica</option>
        <option value="Japan">Japan</option>
        <option value="Jersey">Jersey</option>
        <option value="Jordan">Jordan</option>
        <option value="Kazakhstan">Kazakhstan</option>
        <option value="Kenya">Kenya</option>
        <option value="Kiribati">Kiribati</option>
        <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
        <option value="Korea, Republic of">Korea, Republic of</option>
        <option value="Kosovo">Kosovo</option>
        <option value="Kuwait">Kuwait</option>
        <option value="Kyrgyzstan">Kyrgyzstan</option>
        <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
        <option value="Latvia">Latvia</option>
        <option value="Lebanon">Lebanon</option>
        <option value="Lesotho">Lesotho</option>
        <option value="Liberia">Liberia</option>
        <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
        <option value="Liechtenstein">Liechtenstein</option>
        <option value="Lithuania">Lithuania</option>
        <option value="Luxembourg">Luxembourg</option>
        <option value="Macao">Macao</option>
        <option value="Macedonia, the Former Yugoslav Republic of">Macedonia, the Former Yugoslav Republic of</option>
        <option value="Madagascar">Madagascar</option>
        <option value="Malawi">Malawi</option>
        <option value="Malaysia">Malaysia</option>
        <option value="Maldives">Maldives</option>
        <option value="Mali">Mali</option>
        <option value="Malta">Malta</option>
        <option value="Marshall Islands">Marshall Islands</option>
        <option value="Martinique">Martinique</option>
        <option value="Mauritania">Mauritania</option>
        <option value="Mauritius">Mauritius</option>
        <option value="Mayotte">Mayotte</option>
        <option value="Mexico">Mexico</option>
        <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
        <option value="Moldova, Republic of">Moldova, Republic of</option>
        <option value="Monaco">Monaco</option>
        <option value="Mongolia">Mongolia</option>
        <option value="Montenegro">Montenegro</option>
        <option value="Montserrat">Montserrat</option>
        <option value="Morocco">Morocco</option>
        <option value="Mozambique">Mozambique</option>
        <option value="Myanmar">Myanmar</option>
        <option value="Namibia">Namibia</option>
        <option value="Nauru">Nauru</option>
        <option value="Nepal">Nepal</option>
        <option value="Netherlands">Netherlands</option>
        <option value="Netherlands Antilles">Netherlands Antilles</option>
        <option value="New Caledonia">New Caledonia</option>
        <option value="New Zealand">New Zealand</option>
        <option value="Nicaragua">Nicaragua</option>
        <option value="Niger">Niger</option>
        <option value="Nigeria">Nigeria</option>
        <option value="Niue">Niue</option>
        <option value="Norfolk Island">Norfolk Island</option>
        <option value="Northern Mariana Islands">Northern Mariana Islands</option>
        <option value="Norway">Norway</option>
        <option value="Oman">Oman</option>
        <option value="Pakistan">Pakistan</option>
        <option value="Palau">Palau</option>
        <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
        <option value="Panama">Panama</option>
        <option value="Papua New Guinea">Papua New Guinea</option>
        <option value="Paraguay">Paraguay</option>
        <option value="Peru">Peru</option>
        <option value="Philippines">Philippines</option>
        <option value="Pitcairn">Pitcairn</option>
        <option value="Poland">Poland</option>
        <option value="Portugal">Portugal</option>
        <option value="Puerto Rico">Puerto Rico</option>
        <option value="Qatar">Qatar</option>
        <option value="Reunion">Reunion</option>
        <option value="Romania">Romania</option>
        <option value="Russian Federation">Russian Federation</option>
        <option value="Rwanda">Rwanda</option>
        <option value="Saint Barthelemy">Saint Barthelemy</option>
        <option value="Saint Helena">Saint Helena</option>
        <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
        <option value="Saint Lucia">Saint Lucia</option>
        <option value="Saint Martin">Saint Martin</option>
        <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
        <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
        <option value="Samoa">Samoa</option>
        <option value="San Marino">San Marino</option>
        <option value="Sao Tome and Principe">Sao Tome and Principe</option>
        <option value="Saudi Arabia">Saudi Arabia</option>
        <option value="Senegal">Senegal</option>
        <option value="Serbia">Serbia</option>
        <option value="Serbia and Montenegro">Serbia and Montenegro</option>
        <option value="Seychelles">Seychelles</option>
        <option value="Sierra Leone">Sierra Leone</option>
        <option value="Singapore">Singapore</option>
        <option value="Sint Maarten">Sint Maarten</option>
        <option value="Slovakia">Slovakia</option>
        <option value="Slovenia">Slovenia</option>
        <option value="Solomon Islands">Solomon Islands</option>
        <option value="Somalia">Somalia</option>
        <option value="South Africa">South Africa</option>
        <option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
        <option value="South Sudan">South Sudan</option>
        <option value="Spain">Spain</option>
        <option value="Sri Lanka">Sri Lanka</option>
        <option value="Sudan">Sudan</option>
        <option value="Suriname">Suriname</option>
        <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
        <option value="Swaziland">Swaziland</option>
        <option value="Sweden">Sweden</option>
        <option value="Switzerland">Switzerland</option>
        <option value="Syrian Arab Republic">Syrian Arab Republic</option>
        <option value="Taiwan, Province of China">Taiwan, Province of China</option>
        <option value="Tajikistan">Tajikistan</option>
        <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
        <option value="Thailand">Thailand</option>
        <option value="Timor-Leste">Timor-Leste</option>
        <option value="Togo">Togo</option>
        <option value="Tokelau">Tokelau</option>
        <option value="Tonga">Tonga</option>
        <option value="Trinidad and Tobago">Trinidad and Tobago</option>
        <option value="Tunisia">Tunisia</option>
        <option value="Turkey">Turkey</option>
        <option value="Turkmenistan">Turkmenistan</option>
        <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
        <option value="Tuvalu">Tuvalu</option>
        <option value="Uganda">Uganda</option>
        <option value="Ukraine">Ukraine</option>
        <option value="United Arab Emirates">United Arab Emirates</option>
        <option value="United Kingdom">United Kingdom</option>
        <option value="United States">United States</option>
        <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
        <option value="Uruguay">Uruguay</option>
        <option value="Uzbekistan">Uzbekistan</option>
        <option value="Vanuatu">Vanuatu</option>
        <option value="Venezuela">Venezuela</option>
        <option value="Viet Nam">Viet Nam</option>
        <option value="Virgin Islands, British">Virgin Islands, British</option>
        <option value="Virgin Islands, U.s.">Virgin Islands, U.s.</option>
        <option value="Wallis and Futuna">Wallis and Futuna</option>
        <option value="Western Sahara">Western Sahara</option>
        <option value="Yemen">Yemen</option>
        <option value="Zambia">Zambia</option>
        <option value="Zimbabwe">Zimbabwe</option>
      </select>
    )
  }

  clearInputs() {
    this.setState({ userId: "" })
    this.setState({ companyName: "" })
    this.setState({ address: "" })
    this.setState({ zipCode: "" })
    this.setState({ country: "" })
    this.setState({ vatNumber: "" })
    this.setState({ invoiceNumber: "" })
    this.setState({ sponsorCategory: "" })
    this.setState({ location: "" })
    this.setState({ subtotal: 0 })
    this.setState({ ivaTotal: 0 })
    this.setState({ total: 0 })
    this.setState({ invoiceDate: "" })
    this.setState({ iva: 0 })
  }

  generateInvoice = () => {
    return (
      <>
        <div className="mb-3">
          <div className="d-flex flex-column text-center ">
            <button onClick={(e) => {

              e.preventDefault()


              axios.get(this.state.url + "/api/puteventinfo/1").then((response) => {
                let data;
                let number;

                if (response.data[0].invoice_number < 10) {
                  number = "00" + response.data[0].invoice_number.toString()
                } else if (response.data[0].invoice_number > 10 && response.data[0].invoice_number < 100) {
                  number = "0" + response.data[0].invoice_number.toString()
                } else {
                  number = response.data[0].invoice_number.toString()
                }

                this.setState({ invoiceNumber: response.data[0].invoice_pre + number })

                let date = new Date();
                data = qs.stringify({
                  "company_name": this.state.companyName,
                  "address": this.state.address,
                  "zip": this.state.zipCode,
                  "country": this.state.country,
                  "vat": this.state.vatNumber,
                  "invoice_number": response.data[0].invoice_pre + number,
                  "quantity": 1,
                  "iva": this.state.ivaTotal,
                  "total": this.state.total,
                  "invoice_date": date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear()
                })

                axios.put(this.state.url + "/api/putinvoice/" + this.state.userId, data)
                  .then((response) => {
                    if (response.statusText === "OK") {
                      alert("Invoice " + this.state.invoiceNumber + " Created")
                      this.downloadInvoice()
                      this.clearInputs()
                      this.getInvoiceAll()
                     
                    }
                  })
                  .catch(function (error) {
                    Object.keys(error.response.data).forEach((key: any) => {
                      alert(error.response.data[key])
                    })
                  })



              })


            }} type="submit" className="btn btn-success" data-bs-dismiss="offcanvas">Generate Invoice</button>
          </div>
        </div>
      </>
    )
  }

  downloadInvoice(){
    this.setState({ downloadInvoice: true })

    const doc = new jsPDF('p', 'px', [595, 842]);

    doc.html(ReactDOMServer.renderToString(<InvoicePDF
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
        doc.save("pdf_name");
      }
    });
  }


  downloadInvoiceBtn = () => {


    return (
      <>
        <div className="mb-3">
          <div className="d-flex flex-column text-center ">
            <span onClick={() => {

             this.downloadInvoice()

            }} className="btn btn-success" >Download Invoice</span>
          </div>
        </div>
      </>
    )
  }

  editInvoice = () => {
    return (
      <>
        <div className="mb-3">
          <div className="d-flex flex-column text-center ">
            <button onClick={() => {
              this.setState({ editInvoice: true })
              this.enableInput()
            }} className="btn btn-dark" >Edit invoice</button>
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
            <button onClick={(e) => {

              e.preventDefault()

              let data = qs.stringify({
                "company_name": this.state.companyName,
                "address": this.state.address,
                "zip": this.state.zipCode,
                "country": this.state.country,
                "vat": this.state.vatNumber,
                "iva": this.state.ivaTotal,
                "total": this.state.total
              })

              axios.put(this.state.url + "/api/putinvoicedetails/" + this.state.userId, data)
                .then((response) => {
                  console.log(response)
                  if (response.statusText === "OK") {
                    alert("Invoice " + response.data.invoice_number + " Updated")
                  }
                })
                .catch(function (error) {
                  Object.keys(error.response.data).forEach((key: any) => {
                    alert(error.response.data[key])
                  })
                })

              this.setState({ editInvoice: false })
              this.downloadInvoice()
              this.getInvoiceAll()
              this.disableInput()
            }} className="btn btn-primary" data-bs-dismiss="offcanvas">Update invoice</button>
          </div>
        </div>
      </>
    )
  }

  setIva = () => {
    return <p>IVA ({this.state.iva} %): {this.state.ivaTotal}&nbsp;{this.state.currency}</p>
  }

  invoiceInfoColect = () => {
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


            <div className="col">
              <div className="mb-3">
                <h6 className="form-label">Price</h6>
                <p>{this.state.subtotal + " " + this.state.currency}</p>
              </div>
            </div>
          </div>
        </div>

        <hr /><br /><br />

        <div className="container">
          <div className="row">

            <div className="col-6">
              {!this.state.invoiceAvailable ? <div className="col-6">{this.state.total ? <this.generateInvoice /> : null}</div> : <div className="col-6"> {this.state.editInvoice ? <this.finishEditInvoice /> : <this.editInvoice />}   <this.downloadInvoiceBtn /></div>}
            </div>

            <div className="col-4">
              {this.state.total ? <div className="mb-3 text-end">
                <h5><b>Resumen</b></h5>
                <div className="d-flex flex-column">
                  <p>Subtotal: {this.state.subtotal} &nbsp; {this.state.currency}
                  </p>


                  {this.state.country === "Spain" ? <><this.setIva /></> : null}
                </div>
              </div> : null}
            </div>

            <div className="col-2 ">
              {this.state.total ? <div className="mb-3">
                <div className="d-flex flex-column text-center ">

                  <h5><b>Total:</b></h5>
                  <h3>{this.state.total}&nbsp; {this.state.currency}</h3>

                </div>
              </div> : null}
            </div>

          </div>
        </div>
      </form>
    )
  }



  lisInvoices = () => {
    const listInvoicesDiv: JSX.Element[] = []

    this.state.data.forEach((invoice: any, i: number) => {

      listInvoicesDiv.push(
        <div key={i} className="row list-item">
          <div className="col-2">{invoice.contact} <br /><p style={{ fontSize: "12px" }}>{invoice.name}</p></div>
          <div className="col-2">{invoice.invoice_number} </div>
          <div className="col-2">{invoice.location}<br /><p style={{ fontSize: "12px" }}>{invoice.category}</p></div>
          <div className="col-2">{invoice.email}</div>
          <div className="col-2">{invoice.total}</div>
          <div className="col-2 text-right" id="actions">
            <button
              className="btn btn-dark"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasBottom"
              aria-controls="offcanvasBottom"
              onClick={() => {

                this.setState({ userId: invoice.id })
                this.setState({ companyName: invoice.company_name })
                this.setState({ address: invoice.address })
                this.setState({ zipCode: invoice.zip })
                this.setState({ country: invoice.country })
                this.setState({ vatNumber: invoice.vat })
                this.setState({ sponsorCategory: invoice.category })
                this.setState({ location: invoice.location })
                this.setState({ subtotal: invoice.subtotal })
                this.setState({ ivaTotal: invoice.iva })
                this.setState({ total: invoice.total })
                this.setState({ invoiceDate: invoice.invoice_date })

                if (invoice.country === "Spain") {
                  this.setState({ iva: 21 }, () => {
                    this.setState({ ivaTotal: (Number(this.state.subtotal) * Number(this.state.iva)) / 100 }, () => {
                      this.setState({ total: Number(this.state.subtotal) + Number(this.state.ivaTotal) })
                    })
                  })
                } else {
                  this.setState({ iva: 0 })
                  this.setState({ ivaTotal: 0 })
                  this.setState({ total: Number(invoice.subtotal) })
                }

                if (invoice.invoice_number) {
                  this.disableInput()
                  this.setState({ invoiceAvailable: true })
                  this.setState({ invoiceNumber: invoice.invoice_number })

                } else {
                  this.setState({ invoiceAvailable: false })
                  this.setState({})

                }
              }}
            >
              {invoice.invoice_number ? (<>Edit Invoice</>) : (<>Create Invoice</>)}
            </button>
          </div>
        </div>
      )
    })

    return <>{listInvoicesDiv}</>
  }


  render(): React.ReactNode {
    return (
      <>
        <div className="section">

          <div className="container">
            <div className="row">
              <div className="col-6">  <h3>Invoices</h3></div>
              <div className="col-6 text-end">
                {/* <button className="btn btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Create Invoice</button> */}
              </div>
            </div>
          </div>

          <br />

          <div className="container container-lists">
            <div className="row">
              <div className="col-2">Company name</div>
              <div className="col-2">Invoice #</div>
              <div className="col-2">Pack</div>

              <div className="col-2">Email</div>
              <div className="col-2">Total</div>

              <div className="col-2 text-right" id="actions">
                Actions
              </div>
            </div>
          </div>

          <hr />

          <div className="container container-lists">
            <div className="container container-lists">
              <this.lisInvoices />
            </div>
          </div>

          <div className="offcanvas offcanvas-bottom h-100" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
            <div className="offcanvas-header bg-black text-white">
              <h3 className="offcanvas-title" id="offcanvasBottomLabel">New Invoice</h3>



              <div className="row">
                <div className="col d-flex">
                  <button onClick={() => {
                    this.clearInputs()
                  }} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-center h-100 container">


              <this.invoiceInfoColect />

            </div>
          </div>
        </div>
      </>
    )
  }


}


