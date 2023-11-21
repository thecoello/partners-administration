import React from "react";
import RequestsRoutes from "../../http/requests";

interface IProps {
  getInvoiceId: any
  
}
interface IState {
  route: string
  standInformation: any
  locations: any
  invoice: any
  locationType: any
}

export default class InhtmlFormationForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      route: "standinformation",
      standInformation: '',
      locations: '',
      invoice: '',
      locationType: ''
    }
  }

  componentDidMount(): void {
    if (this.props.getInvoiceId()) {
      this.getStandInformation(this.props.getInvoiceId())
    }else{
      window.location.href = "/informationtable"
    }
  }

  getStandInformation(id:any){
    new RequestsRoutes().get(this.state.route + "/" + id).then((response) => {
      this.setState({standInformation: response.data.standinformation[0]})
      this.setState({locations: response.data.locations})
      this.setState({invoice: response.data.invoice[0]})
      
      this.state.locations.forEach((location:any) => {
        
        if(location.location_name == this.state.invoice.location){
            this.setState({locationType: location.type})
        }

      });

    })
  }

  formCreate(e: any) {
    e.preventDefault()
    if (this.props.getInvoiceId()) {
      new RequestsRoutes().post(this.state.route, e.target).then((response) => {
        if (response.status === 200) {
          alert("Stand Information created")
          this.getStandInformation(this.props.getInvoiceId())
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
    if (this.props.getInvoiceId()) {
      new RequestsRoutes().putPost(this.state.route + "/" + this.props.getInvoiceId(), e.target).then((response) => {
        if (response.status === 200) {
          alert("Stand Information updated")
          this.getStandInformation(this.props.getInvoiceId())
        }
      }).catch((error) => {
        alert(error)
      })
    } else {
      alert("You must assign a user to the invoice")
    }
  }

  public render(): React.ReactNode {
    return (

      <div className="d-flex align-item-center justify-content-center">
        <form encType="multipart/form-data" className="needs-validation" onSubmit={this.state.standInformation ? this.formUpdate.bind(this) : this.formCreate.bind(this)} style={{ 'width': '70%' }} >

          <input type="hidden" name="invoice_id" value={this.props.getInvoiceId()}/>

          <div className="row border rounded p-4 mb-4">


            <h4>Stand information</h4>

            <div className="mb-3">
              <label htmlFor="logo" className="form-label"><b>Company or Solution Logo</b> <span style={{ 'fontSize': '0.8rem' }}>that you want to be displayed
                on your booth. Please upload a vectorized format (eps. Illustrator) or a high resolution image (jpg, png,
                tiff). <b>Less than 5MB</b></span></label>
              <div className="row">
                <div className="col-12">
                  <input className="form-control" type="file" name="logo" id="logo" multiple />
                </div>
              </div>
            </div>

            <div>
              <h5>Information for {this.state.locations ? this.state.locations[0].location_name : null}</h5>
              <div className="mb-3">
                <label htmlFor="examplehtmlFormControlTextarea1" className="form-label"><b>Headline (max. 75 characters)</b></label>
                <textarea className="form-control" rows={5} name="headline" id="headline" maxLength={75}></textarea>
              </div>
              <input className="form-control" name="city" id="city" type="hidden"/>
              <div className="mb-3">
                <label className="form-label"><b>3 bullet points (max. 50 characters each)</b></label>
                <div className="row">
                  <div className="col-12 mb-2"> <input className="form-control"  name="bullet1" id="bullet1" type="text"
                    maxLength={50} />
                  </div>
                  <div className="col-12 mb-2"> <input className="form-control"  name="bullet2" id="bullet2" type="text"
                    maxLength={50} />
                  </div>
                  <div className="col-12"> <input className="form-control"  name="bullet3" id="bullet3" type="text"
                    maxLength={50} />
                  </div>
                </div>
              </div>

            </div>

            {this.state.locationType == 1 ?          
            <>
            <div>
              <hr />
              <h5>Information for {this.state.locations ? this.state.locations[1].location_name : null} </h5>
              <div className="mb-3">
                <label htmlFor="examplehtmlFormControlTextarea1" className="form-label"><b>Headline (max. 75 characters)</b></label>
                <textarea className="form-control" rows={5} name="headline-2" id="headline-2" maxLength={75}></textarea>
              </div>
              <input className="form-control" name="city2" id="city2" type="hidden"/>
              <div className="mb-3">
                <label className="form-label"><b>3 bullet points (max. 50 characters each)</b></label>
                <div className="row">
                  <div className="col-12 mb-2"> <input className="form-control"  name="bullet1-2" id="bullet1-2" type="text"
                    maxLength={50} />
                  </div>
                  <div className="col-12 mb-2"> <input className="form-control"  name="bullet2-2" id="bullet2-2" type="text"
                    maxLength={50} />
                  </div>
                  <div className="col-12"> <input className="form-control"  name="bullet3-2" id="bullet3-2" type="text"
                    maxLength={50} />
                  </div>
                </div>
              </div>

            </div>
            <div>
              <hr />
              <h5>Information for {this.state.locations ? this.state.locations[2].location_name : null}</h5>
              <div className="mb-3">
                <label htmlFor="examplehtmlFormControlTextarea1" className="form-label"><b>Headline (max. 75 characters)</b></label>
                <textarea className="form-control" rows={5} name="headline-3" id="headline-3" maxLength={75}></textarea>
              </div>
              <input className="form-control" name="city3" id="city3" type="hidden"/>
              <div className="mb-3">
                <label className="form-label"><b>3 bullet points (max. 50 characters each)</b></label>
                <div className="row">
                  <div className="col-12 mb-2"> <input className="form-control"  name="bullet1-3" id="bullet1-3" type="text"
                    maxLength={50} />
                  </div>
                  <div className="col-12 mb-2"> <input className="form-control"  name="bullet2-3" id="bullet2-3" type="text"
                    maxLength={50} />
                  </div>
                  <div className="col-12"> <input className="form-control"  name="bullet3-3" id="bullet3-3" type="text"
                    maxLength={50} />
                  </div>
                </div>
              </div>

            </div> 
            </>
            : null}

          </div>



          <div className="row border rounded p-4">

            <h4>Event App information</h4>

            <div className="mb-3">
              <label htmlFor="companyname" className="form-label"><b>Company name</b></label>
              <input type="text"  name="companyname" className="form-control" id="companyname" />
            </div>

            <div className="mb-3 row">
              <label htmlFor="htmlFormFileMultiple" className="form-label"><b>Documents (maximum of 3 documents of less than 5MB
                each)</b></label>

              <div className="col">
                <input className="form-control" type="file" name="document1" id="document1" multiple />
                <input style={{ "display": "none" }} id="document1up" className="btn btn-danger btn-send" data-action='submit'
                  type="submit" value="Upload Document 1"></input>
              </div>


              <div className="col">
                <input className="form-control" type="file" name="document2" id="document2" multiple />

              </div>
              <div className="col">
                <input className="form-control" type="file" name="document3" id="document3" multiple />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label"><b>Videos (URL and no more than 2)</b></label>
              <div className="row">
                <div className="col-6 mb-2"> <input type="text"  className="form-control" id="video1" name="video1" /></div>
                <div className="col-6"> <input type="text"  className="form-control" id="video2" name="video2" /></div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="contactemail" className="form-label"><b>Contact email</b></label>
              <input type="email" className="form-control"  name="contactemail" id="contactemail" />
            </div>
            <div className="mb-3">
              <label className="form-label"><b>Company description (max. 1250
                characters)</b></label>

              <textarea className="form-control" name="companydescription" id="companydescription" rows={7}
                maxLength={1250}></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="companywebsite" className="form-label"><b>Company website</b></label>
              <input type="text" className="form-control"  name="companywebsite" id="companywebsite" />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label"><b>Social media links</b></label>
              <div className="row">
                <div className="col"> <input type="text" className="form-control"  name="socialmedia1" id="socialmedia1" />
                </div>
                <div className="col"> <input type="text" className="form-control"  name="socialmedia2" id="socialmedia2" />
                </div>
                <div className="col"> <input type="text" className="form-control"  name="socialmedia3" id="socialmedia3" />
                </div>
                <div className="col"> <input type="text" className="form-control"  name="socialmedia4" id="socialmedia4" />
                </div>
                <div className="col"> <input type="text" className="form-control"  name="socialmedia5" id="socialmedia5" />
                </div>

              </div>
            </div>

            <div className="mb-3">
              <button type="submit" className="btn btn-dark"> Submit </button>

            </div>

          </div>
        </form>

      </div>
    );
  }
}
