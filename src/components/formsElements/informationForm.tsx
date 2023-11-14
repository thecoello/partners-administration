import React from "react";
import CountrySelector from "./selectors";
import RequestsRoutes from "../../http/requests";
import { useLocation } from "react-router-dom";

interface IProps {
  getUserId: any
}
interface IState {
}

export default class InhtmlFormationForm extends React.Component<IProps, IState> {


  constructor(props: IProps) {
    super(props);


  }

  componentDidMount(): void {

    if (this.props.getUserId()) {
      console.log(this.props.getUserId())
    }

  }

  public render(): React.ReactNode {

    return (

      <div className="d-flex align-item-center justify-content-center">
        <form style={{ 'width': '70%' }}>

          <div className="row border rounded p-4 mb-4">


            <h4>Booth information</h4>

            <div className="mb-3">
              <label htmlFor="logo" className="form-label"><b>Company or Solution Logo</b> <span style={{ 'fontSize': '0.8rem' }}>that you want to be displayed
                on your booth. Please upload a vectorized htmlFormat (eps. Illustrator) or a high resolution image (jpg,
                tiff). <b>Less than 5MB</b></span></label>
              <div className="row">
                <div className="col-12">
                  <input className="form-control" type="file" name="logo" id="logo" multiple />
                </div>
              </div>
            </div>

            <div>
              <h5>Information City 1</h5>
              <div className="mb-3">
                <label htmlFor="examplehtmlFormControlTextarea1" className="form-label"><b>Headline (max. 75 characters)</b></label>
                <textarea className="form-control" rows={5} name="headline" id="headline" maxLength={75}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label"><b>3 bullet points (max. 50 characters each)</b></label>
                <div className="row">
                  <div className="col-12 mb-2"> <input className="form-control" value="" name="bullet1" id="bullet1" type="text"
                    maxLength={50} />
                  </div>
                  <div className="col-12 mb-2"> <input className="form-control" value="" name="bullet2" id="bullet2" type="text"
                    maxLength={50} />
                  </div>
                  <div className="col-12"> <input className="form-control" value="" name="bullet3" id="bullet3" type="text"
                    maxLength={50} />
                  </div>
                </div>
              </div>

            </div>
            <div>
              <hr />
              <h5>Information City 2</h5>
              <div className="mb-3">
                <label htmlFor="examplehtmlFormControlTextarea1" className="form-label"><b>Headline (max. 75 characters)</b></label>
                <textarea className="form-control" rows={5} name="headline" id="headline" maxLength={75}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label"><b>3 bullet points (max. 50 characters each)</b></label>
                <div className="row">
                  <div className="col-12 mb-2"> <input className="form-control" value="" name="bullet1" id="bullet1" type="text"
                    maxLength={50} />
                  </div>
                  <div className="col-12 mb-2"> <input className="form-control" value="" name="bullet2" id="bullet2" type="text"
                    maxLength={50} />
                  </div>
                  <div className="col-12"> <input className="form-control" value="" name="bullet3" id="bullet3" type="text"
                    maxLength={50} />
                  </div>
                </div>
              </div>

            </div>
            <div>
              <hr />
              <h5>Information City 3</h5>
              <div className="mb-3">
                <label htmlFor="examplehtmlFormControlTextarea1" className="form-label"><b>Headline (max. 75 characters)</b></label>
                <textarea className="form-control" rows={5} name="headline" id="headline" maxLength={75}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label"><b>3 bullet points (max. 50 characters each)</b></label>
                <div className="row">
                  <div className="col-12 mb-2"> <input className="form-control" value="" name="bullet1" id="bullet1" type="text"
                    maxLength={50} />
                  </div>
                  <div className="col-12 mb-2"> <input className="form-control" value="" name="bullet2" id="bullet2" type="text"
                    maxLength={50} />
                  </div>
                  <div className="col-12"> <input className="form-control" value="" name="bullet3" id="bullet3" type="text"
                    maxLength={50} />
                  </div>
                </div>
              </div>

            </div>

          </div>



          <div className="row border rounded p-4">

            <h4>Event App information</h4>

            <div className="mb-3">
              <label htmlFor="sponsorname" className="form-label"><b>Company name</b></label>
              <input type="text" value="" name="sponsorname" className="form-control" id="sponsorname" />
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
                <div className="col-6 mb-2"> <input type="text" value="" className="form-control" id="video1" name="video1" /></div>
                <div className="col-6"> <input type="text" value="" className="form-control" id="video2" name="video2" /></div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="contactemail" className="form-label"><b>Contact email</b></label>
              <input type="email" className="form-control" value="" name="contactemail" id="contactemail" />
            </div>
            <div className="mb-3">
              <label className="form-label"><b>Company description (max. 1250
                characters)</b></label>

              <textarea className="form-control" name="companydescription" id="companydescription" rows={7}
                maxLength={1250}></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="website" className="form-label"><b>Company website</b></label>
              <input type="text" className="form-control" value="" name="website" id="website" />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label"><b>Social media links</b></label>
              <div className="row">
                <div className="col"> <input type="text" className="form-control" value="" name="social1" id="social1" />
                </div>
                <div className="col"> <input type="text" className="form-control" value="" name="social2" id="social2" />
                </div>
                <div className="col"> <input type="text" className="form-control" value="" name="social3" id="social3" />
                </div>
                <div className="col"> <input type="text" className="form-control" value="" name="social4" id="social4" />
                </div>
                <div className="col"> <input type="text" className="form-control" value="" name="social5" id="social5" />
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
