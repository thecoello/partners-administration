import React from 'react';
import RequestsRoutes from "../../http/requests"
import StandsPartnerInfo from '../../models/partnersInformation/model.partnerInfo';
import Invoice from '../../models/invoices/model.invoice';
import Locations from '../../models/event/model.locations';
import User from '../../models/users/model.users';

interface IProps {
  getInvoiceId: any
}

interface IState {
  route: string
  locationType: any
  loaded: boolean
  disableDiv?: string
}

export default class InhtmlFormationForm extends React.Component<IProps, IState> {

  _standInfo: StandsPartnerInfo = new StandsPartnerInfo()
  _invoice: Invoice = new Invoice()
  _locations: Array<Locations> = []
  _user: User = new User()

  constructor(props: IProps) {
    super(props);
    this.state = {
      route: 'standinformation',
      locationType: '',
      loaded: false
    }
  }

  componentDidMount(): void {
    if (this.props.getInvoiceId()) {
      this.getStandInformation(this.props.getInvoiceId())
      this.loadTime()
    } else {
      window.location.href = '/boothinformation'
    }
  }

  getStandInformation(id: any) {
    new RequestsRoutes().get(this.state.route + '/' + id).then((response) => {
      this._standInfo = response.data.standinformation[0]
      this._invoice = response.data.invoice[0]
      this._locations = response.data.locations
      this._user = response.data.user[0]

      this._locations?.forEach((location: Locations) => {
        if (location.location_name == this._invoice.location) {
          this.setState({ locationType: location.type })
        }
      });
    })
  }

  formCreate(e: any) {
    e.preventDefault()
    if (this.props.getInvoiceId()) {
      new RequestsRoutes().post(this.state.route, e.target).then((response) => {
        if (response.status === 200) {
          alert('Booth Information created')
          this.setState({ disableDiv: ' pe-auto opacity-100 ' })
          this.getStandInformation(this.props.getInvoiceId())
        }
      }).catch((error) => {
        alert(error)
      })
    } else {
      alert('You must assign a user to the invoice')
    }
  }

  formUpdate(e: any) {
    e.preventDefault()
    if (this.props.getInvoiceId()) {
      new RequestsRoutes().putPost('standinformationput/' + this.props.getInvoiceId(), e.target).then((response) => {
        if (response.status === 200) {
          alert('Booth Information updated')
          this.getStandInformation(this.props.getInvoiceId())
          this.setState({ disableDiv: ' pe-auto opacity-100 ' })
        }
      }).catch((error) => {
        alert(error)
      })
    } else {
      alert('You must assign a user to the invoice')
    }
  }

  preRender() {
    return (
      <div className={this.state.disableDiv}>

        <div className='d-flex align-item-center justify-content-center flex-column'>

          <h4>Booth Information</h4>

          <div className='row border rounded p-4 mb-4'>

            <div className='row'>
              <div className='col-4'>
                <p><b>Invoice:</b> {this._invoice.invoice_number}</p>
              </div>
              <div className='col-4'>
                <p><b>Company name:</b> {this._invoice.company_name}</p>
              </div>
              <div className='col-4'>
                <p><b>Email:</b> {this._user.email}</p>
              </div>
            </div>

            <hr />

            <div className='row'>
              <div className='col-4'>
                <p><b>Category:</b> {this._invoice.category}</p>
              </div>
              <div className='col-8'>
                <p><b>Location(s):</b> {this._invoice.location}</p>
              </div>
            </div>
          </div>

          {this._invoice.category?.toUpperCase().includes('GOLD') || this._invoice.category?.toUpperCase().includes('SILVER') || this._invoice.category?.toUpperCase().includes('BRONZE') ? <p>Please complete the fields in the <b>Booth information</b>, <b>Event app information</b> and <b>Breakout Session information</b></p> : <p>Please complete the fields in the <b>Booth information</b> and <b>Event app information</b></p>}

          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Booth Information
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">

                  <div className='row'>
                    <div className='col-12 align-items-center justify-content-center'>
                      <form encType="multipart/form-data" className='needs-validation' onSubmit={this._standInfo ? this.formUpdate.bind(this) : this.formCreate.bind(this)}>

                        <input type='hidden' name='invoice_id' defaultValue={this.props.getInvoiceId()} />

                        <div className='row border rounded p-4 mb-4'>

                          <div className='mb-3'>
                            <label htmlFor='logo' className='form-label'><b>Company or Solution Logo</b> <span style={{ 'fontSize': '0.8rem' }}>that you want to be displayed on your booth. Please upload a vectorized format (eps. Illustrator) or a high resolution image (jpg, png, tiff). <b>Less than 5MB</b></span></label>
                            <div className='row'>
                              <div className='col-12'>
                                {this._standInfo?.logo ?
                                  <>
                                    <p className='badge rounded-pill text-bg-success'>Logo available&nbsp; <a className='text-light' href={import.meta.env.VITE_URL_SIMPLE + this._standInfo?.logo} target='_blank' type='button'><b>Download logo</b></a></p>
                                    <p>If you need to update the logo you can upload it again</p>
                                  </>
                                  : null}
                                <input onChange={(e: any) => {

                                  const fileExt = e.target.value.split('.')[e.target.value.split('.').length - 1].toUpperCase()

                                  if (!["EPS", "AI", "JPG", "JPEG", "PNG", "TIFF", "PDF"].includes(fileExt)) {
                                    e.target.value = ''
                                    alert('The Logo file must be a EPS, AI, JPG, JPEG, PNG, TIFF or a PDF file.')
                                  }

                                  if (Math.round(e.target.files[0].size / 1024) > 5000) {
                                    e.target.value = ''
                                    alert('Logo file size should not exceed 5MB')
                                  }

                                }} type="file" className="form-control" name="logo" id="logo" aria-describedby="logo" />
                              </div>
                            </div>
                          </div>

                        </div>

                        <>

                          {this._invoice.location == this._locations[0].location_name || this.state.locationType == 1 ?
                            <div className='row border rounded p-4 mb-4'>

                              <h4><span className='badge rounded-pill text-bg-primary'>Information for  {this._locations ? this._locations[0].location_name : null}</span>
                              </h4>

                              <div className='row'>

                                <div className='col-6'>
                                  <div className='mb-3'>
                                    <label htmlFor='examplehtmlFormControlTextarea1' className='form-label'><b>Headline (max. 75 characters)</b></label>
                                    <textarea className='form-control' rows={5} name='headline_1' id='headline_1' maxLength={75} defaultValue={this._standInfo?.headline_1}></textarea>
                                  </div>
                                </div>

                                <div className='col-6'>
                                  <div className='mb-3'>
                                    <label className='form-label'><b>3 bullet points (max. 50 characters each)</b></label>
                                    <div className='row'>
                                      <div className='col-12 mb-2'> <input className='form-control' name='bullet1_1' id='bullet1_1' type='text'
                                        maxLength={50} defaultValue={this._standInfo?.bullet1_1} />
                                      </div>
                                      <div className='col-12 mb-2'> <input className='form-control' name='bullet2_1' id='bullet2_1' type='text'
                                        maxLength={50} defaultValue={this._standInfo?.bullet2_1} />
                                      </div>
                                      <div className='col-12'> <input className='form-control' name='bullet3_1' id='bullet3_1' type='text'
                                        maxLength={50} defaultValue={this._standInfo?.bullet3_1} />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <input className='form-control' name='city_1' id='city_1' type='hidden' defaultValue={this._locations[0].location_name} />
                            </div>
                            : null}

                          {this._invoice.location == this._locations[1].location_name || this.state.locationType == 1 ?

                            <div className='row border rounded p-4 mb-4'>
                              <h4><span className='badge rounded-pill text-bg-primary'>Information for  {this._locations ? this._locations[1].location_name : null}</span>
                              </h4>

                              <div className='row'>
                                <div className='col-6'>
                                  <div className='mb-3'>
                                    <label htmlFor='examplehtmlFormControlTextarea1' className='form-label'><b>Headline (max. 75 characters)</b></label>
                                    <textarea className='form-control' rows={5} name='headline_2' id='headline_2' maxLength={75} defaultValue={this._standInfo?.headline_2}></textarea>
                                  </div>
                                </div>
                                <div className='col-6'>
                                  <div className='mb-3'>
                                    <label className='form-label'><b>3 bullet points (max. 50 characters each)</b></label>
                                    <div className='row'>
                                      <div className='col-12 mb-2'> <input className='form-control' name='bullet1_2' id='bullet1_2' type='text'
                                        maxLength={50} defaultValue={this._standInfo?.bullet1_2} />
                                      </div>
                                      <div className='col-12 mb-2'> <input className='form-control' name='bullet2_2' id='bullet2_2' type='text'
                                        maxLength={50} defaultValue={this._standInfo?.bullet2_2} />
                                      </div>
                                      <div className='col-12'> <input className='form-control' name='bullet3_2' id='bullet3_2' type='text'
                                        maxLength={50} defaultValue={this._standInfo?.bullet3_2} />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <input className='form-control' name='city_2' id='city_2' type='hidden' defaultValue={this._locations[1].location_name} />
                            </div>
                            : null}

                          {this._invoice.location == this._locations[2].location_name || this.state.locationType == 1 ?

                            <div className='row border rounded p-4 mb-4'>
                              <h4><span className='badge rounded-pill text-bg-primary'>Information for  {this._locations ? this._locations[2].location_name : null}</span>
                              </h4>
                              <div className='row'>
                                <div className='col-6'>
                                  <div className='mb-3'>
                                    <label htmlFor='examplehtmlFormControlTextarea1' className='form-label'><b>Headline (max. 75 characters)</b></label>
                                    <textarea className='form-control' rows={5} name='headline_3' id='headline_3' maxLength={75} defaultValue={this._standInfo?.headline_3}></textarea>
                                  </div>
                                </div>
                                <div className='col-6'>
                                  <div className='mb-3'>
                                    <label className='form-label'><b>3 bullet points (max. 50 characters each)</b></label>
                                    <div className='row'>
                                      <div className='col-12 mb-2'> <input className='form-control' name='bullet1_3' id='bullet1_3' type='text'
                                        maxLength={50} defaultValue={this._standInfo?.bullet1_3} />
                                      </div>
                                      <div className='col-12 mb-2'> <input className='form-control' name='bullet2_3' id='bullet2_3' type='text'
                                        maxLength={50} defaultValue={this._standInfo?.bullet2_3} />
                                      </div>
                                      <div className='col-12'> <input className='form-control' name='bullet3_3' id='bullet3_3' type='text'
                                        maxLength={50} defaultValue={this._standInfo?.bullet3_3} />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <input className='form-control' name='city_3' id='city_3' type='hidden' defaultValue={this._standInfo?.city_3} />
                            </div>
                            : null}
                        </>


                        <div className='mb-3'>
                          <button type='submit' className='btn btn-dark' onClick={() => {
                            this.setState({ disableDiv: ' pe-none opacity-25 ' })
                          }}> Submit booth information </button>
                        </div>

                      </form>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Event App information
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <div className='row'>
                    <div className='col-12 align-items-center justify-content-center'>
                      <form encType="multipart/form-data" className='needs-validation' onSubmit={this._standInfo ? this.formUpdate.bind(this) : this.formCreate.bind(this)}>

                        <input type='hidden' name='invoice_id' defaultValue={this.props.getInvoiceId()} />

                        <div className='row border rounded p-4'>
                          <div className='mb-3'>
                            <label htmlFor='companyname' className='form-label'><b>Company name</b></label>
                            <input type='text' name='companyname' className='form-control' id='companyname' defaultValue={this._standInfo?.companyname ? this._standInfo?.companyname : this._invoice.company_name} />
                          </div>

                          <div className='mb-3 row'>
                            <label htmlFor='htmlFormFileMultiple' className='form-label'><b>Documents (maximum of 3 documents of less than 5MB
                              each PDF or DOCX)</b></label>

                            <div className='col border rounded p-4 mb-4 text-center'>
                              {this._standInfo?.document1 ?
                                <>
                                  <span className='badge rounded-pill text-bg-success'><b>Document 1 available&nbsp;</b>
                                    <a href={import.meta.env.VITE_URL_SIMPLE + this._standInfo?.document1} target='_blank' type='button' className='text-light'>Download</a>
                                  </span>
                                  <br /><br />
                                  <p style={{ fontSize: '0.8rem' }}>If you need to update the document 1 you can upload it again</p>
                                </>
                                : null}
                              <p><b>Document 1</b></p>
                              <input onChange={(e: any) => {

                                const fileExt = e.target.value.split('.')[e.target.value.split('.').length - 1].toUpperCase()

                                if (!["PDF", "DOCX"].includes(fileExt)) {
                                  e.target.value = ''
                                  alert('The Document 1 file must be PDF or DOCX file.')
                                }
                                if (Math.round(e.target.files[0].size / 1024) > 5000) {
                                  e.target.value = ''
                                  alert('The Document 1 file size should not exceed 5MB')
                                }

                              }} className='form-control' type='file' name='document1' id='document1' multiple />
                            </div>

                            <div className='col border rounded p-4 mb-4 text-center'>
                              {this._standInfo?.document2 ?
                                <>
                                  <span className='badge rounded-pill text-bg-success'><b>Document 2 available&nbsp;</b>
                                    <a href={import.meta.env.VITE_URL_SIMPLE + this._standInfo?.document2} target='_blank' type='button' className='text-light'>Download</a>
                                  </span>
                                  <br /><br />
                                  <p style={{ fontSize: '0.8rem' }}>If you need to update the document 2 you can upload it again</p>
                                </>
                                : null}
                              <p><b>Document 2</b></p>
                              <input onChange={(e: any) => {

                                const fileExt = e.target.value.split('.')[e.target.value.split('.').length - 1].toUpperCase()

                                if (!["PDF", "DOCX"].includes(fileExt)) {
                                  e.target.value = ''
                                  alert('The Document 2 file must be PDF or DOCX file.')
                                }
                                if (Math.round(e.target.files[0].size / 1024) > 5000) {
                                  e.target.value = ''
                                  alert('The Document 2 file size should not exceed 5MB')
                                }

                              }} className='form-control' type='file' name='document2' id='document2' multiple />
                            </div>

                            <div className='col border rounded p-4 mb-4 text-center'>
                              {this._standInfo?.document3 ?
                                <>
                                  <span className='badge rounded-pill text-bg-success'><b>Document 3 available&nbsp;</b>
                                    <a href={import.meta.env.VITE_URL_SIMPLE + this._standInfo?.document3} target='_blank' type='button' className='text-light'>Download</a>
                                  </span>
                                  <br /><br />
                                  <p style={{ fontSize: '0.8rem' }}>If you need to update the document 3 you can upload it again</p>
                                </>
                                : null}
                              <p><b>Document 3</b></p>
                              <input onChange={(e: any) => {

                                const fileExt = e.target.value.split('.')[e.target.value.split('.').length - 1].toUpperCase()

                                if (!["PDF", "DOCX"].includes(fileExt)) {
                                  e.target.value = ''
                                  alert('The Document 3 file must be PDF or DOCX file.')
                                }
                                if (Math.round(e.target.files[0].size / 1024) > 5000) {
                                  e.target.value = ''
                                  alert('The Document 3 file size should not exceed 5MB')
                                }

                              }} className='form-control' type='file' name='document3' id='document3' multiple />
                            </div>
                          </div>

                          <div className='mb-3'>
                            <label htmlFor='exampleInputEmail1' className='form-label'><b>Videos (URL and no more than 2)</b></label>
                            <div className='row'>
                              <div className='col-6 mb-2'> <input type='text' className='form-control' id='video1' name='video1' defaultValue={this._standInfo?.video1} /></div>
                              <div className='col-6'> <input type='text' className='form-control' id='video2' name='video2' defaultValue={this._standInfo?.video2} /></div>
                            </div>
                          </div>

                          <div className='mb-3'>
                            <label htmlFor='contactemail' className='form-label'><b>Contact email</b></label>
                            <input type='email' className='form-control' name='contactemail' id='contactemail' defaultValue={this._standInfo?.contactemail ? this._standInfo?.contactemail : this._user.email} />
                          </div>

                          <div className='mb-3'>
                            <label className='form-label'><b>Company description (max. 1250 characters)</b></label>
                            <textarea className='form-control' name='companydescription' id='companydescription' rows={7}
                              maxLength={1250} defaultValue={this._standInfo?.companydescription}></textarea>
                          </div>

                          <div className='mb-3'>
                            <label htmlFor='companywebsite' className='form-label'><b>Company website</b></label>
                            <input type='text' className='form-control' name='companywebsite' id='companywebsite' defaultValue={this._standInfo?.companywebsite} />
                          </div>

                          <div className='mb-3'>
                            <label htmlFor='exampleInputEmail1' className='form-label'><b>Social media links</b></label>
                            <div className='row'>
                              <div className='col'> <input type='text' className='form-control' name='socialmedia1' id='socialmedia1' defaultValue={this._standInfo?.socialmedia1} />
                              </div>
                              <div className='col'> <input type='text' className='form-control' name='socialmedia2' id='socialmedia2' defaultValue={this._standInfo?.socialmedia2} />
                              </div>
                              <div className='col'> <input type='text' className='form-control' name='socialmedia3' id='socialmedia3' defaultValue={this._standInfo?.socialmedia3} />
                              </div>
                              <div className='col'> <input type='text' className='form-control' name='socialmedia4' id='socialmedia4' defaultValue={this._standInfo?.socialmedia4} />
                              </div>
                              <div className='col'> <input type='text' className='form-control' name='socialmedia5' id='socialmedia5' defaultValue={this._standInfo?.socialmedia5} />
                              </div>
                            </div>
                          </div>

                          <div className='mb-3'>
                            <button type='submit' className='btn btn-dark' onClick={() => {
                              this.setState({ disableDiv: ' pe-none opacity-25 ' })
                            }}> Submit event app information </button>
                          </div>

                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {this._invoice.category?.toUpperCase().includes('GOLD') || this._invoice.category?.toUpperCase().includes('SILVER') || this._invoice.category?.toUpperCase().includes('BRONZE') ?

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Breakout Session information
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <div className='row'>
                      <div className='col-12 align-items-center justify-content-center'>
                        <form encType="multipart/form-data" className='needs-validation' onSubmit={this._standInfo ? this.formUpdate.bind(this) : this.formCreate.bind(this)}>

                          <input type='hidden' name='invoice_id' defaultValue={this.props.getInvoiceId()} />

                          <div className='row border rounded p-4'>
                            <div className='mb-3'>
                              <label htmlFor='speakername' className='form-label'><b>Speaker’s name </b></label>
                              <input type='text' name='speakername' className='form-control' id='speakername' defaultValue={this._standInfo?.speakername ? this._standInfo?.speakername : ''} />
                            </div>
                            <div className='mb-3'>
                              <label htmlFor='speakerjobtitle' className='form-label'><b>Speaker's Job title </b></label>
                              <input type='text' name='speakerjobtitle' className='form-control' id='speakerjobtitle' defaultValue={this._standInfo?.speakerjobtitle ? this._standInfo?.speakerjobtitle : ''} />
                            </div>
                            <div className='mb-3'>
                              <label htmlFor='sessiontitle' className='form-label'><b>Session Title (75 characters) </b></label>
                              <input maxLength={75} type='text' name='sessiontitle' className='form-control' id='sessiontitle' defaultValue={this._standInfo?.sessiontitle ? this._standInfo?.sessiontitle : ''} />
                            </div>
                            <div className='mb-3'>
                              <label htmlFor='sessiondescription' className='form-label'><b>Session description (350 characters) </b></label>
                              <textarea maxLength={359} name='sessiondescription' className='form-control' id='sessiondescription' defaultValue={this._standInfo?.sessiondescription ? this._standInfo?.sessiondescription : ''}></textarea>
                            </div>
                            <div className='mb-3'>
                              <label htmlFor='speakershortbio' className='form-label'><b>Speaker’s short Bio (150 characters) </b></label>
                              <textarea maxLength={150} name='speakershortbio' className='form-control' id='speakershortbio' defaultValue={this._standInfo?.speakershortbio ? this._standInfo?.speakershortbio : ''}></textarea>
                            </div>

                            <div className='mb-3'>
                              <label htmlFor='photo' className='form-label'><b>Photo</b> <span style={{ 'fontSize': '0.8rem' }}> (jpg, jpeg, png). <b>Less than 2MB</b></span></label>
                              <div className='row'>
                                <div className='col-12'>
                                  {this._standInfo?.photo ?
                                    <>
                                      <p className='badge rounded-pill text-bg-success'>Photo available&nbsp; <a className='text-light' href={import.meta.env.VITE_URL_SIMPLE + this._standInfo?.photo} target='_blank' type='button'><b>Download photo</b></a></p>
                                      <p>If you need to update the photo you can upload it again</p>
                                    </>
                                    : null}
                                  <input onChange={(e: any) => {

                                    const fileExt = e.target.value.split('.')[e.target.value.split('.').length - 1].toUpperCase()

                                    if (!["JPG", "JPEG", "PNG"].includes(fileExt)) {
                                      e.target.value = ''
                                      alert('The Photo file must be a JPG, JPEG or a PNG file.')
                                    }

                                    if (Math.round(e.target.files[0].size / 1024) > 2000) {
                                      e.target.value = ''
                                      alert('Photo file size should not exceed 2MB')
                                    }

                                  }} className='form-control' type='file' name='photo' id='photo' />
                                </div>
                              </div>
                            </div>

                            <div className='mb-3'>
                              <label htmlFor='linkedin' className='form-label'><b>LinkedIn Link</b></label>
                              <input maxLength={75} type='text' name='linkedin' className='form-control' id='linkedin' defaultValue={this._standInfo?.linkedin ? this._standInfo?.linkedin : ''} />
                            </div>


                            <div className='mb-3'>
                              <button type='submit' className='btn btn-dark' onClick={() => {
                                this.setState({ disableDiv: ' pe-none opacity-25 ' })
                              }}> Submit Breakout session information </button>
                            </div>

                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              : null
            }
          </div>


        </div>
      </div>
    )
  }

  loadTime() {
    this.setState({ loaded: false })
    setTimeout(() => {
      this.setState({ loaded: true })
    }, 500);
  }

  public render(): React.ReactNode {
    return (
      <>
        {(this.state.loaded && this._locations) ? this.preRender() : <div className='d-flex align-items-center justify-content-center' style={{ width: '100%', height: '80vh' }}><div className='spinner-border text-dark' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div></div>}
      </>
    )
  }
}