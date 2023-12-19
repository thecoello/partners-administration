import React from 'react';
import RequestsRoutes from '../../http/requests';
import InvoiceElements from './invoiceElements/invoiceElements';
import Invoice from '../../models/invoices/model.invoice';
import Event from '../../models/event/model.event';

interface IState{
  route: string
  title: string
  loaded: boolean
}

interface IProps {
  getInvoiceId: any
}

export default class InvoiceFormPartner extends React.Component<IProps, IState> {

  _invoiceElements = new InvoiceElements()
  _invoice = new Invoice()
  _event = new Event()

  constructor(props: IProps) {
    super(props);

    this.state = {
      title: '',
      route: 'invoice',
      loaded: false
    };
  }

  getInvoiceData(id: any) {
    new RequestsRoutes().get(this.state.route + '/' + id).then((response) => {
      this._invoice = response.data.invoices.data[0]
      this._event = response.data.eventinfo[0]
    });
  } 

  componentDidMount(): void {
    if (this.props.getInvoiceId()) {
      this.setState({ title: 'Fill your tax information ' })
      this.getInvoiceData(this.props.getInvoiceId())
      this.loadTime()
    } else {
      window.location.href = '/'
    }
  }

  loadTime(){
    this.setState({loaded: false})
    setTimeout(() => {
      this.setState({loaded: true})
    }, 500);
  }

  formUpdate(e: any) {
    e.preventDefault()
    if (this.props.getInvoiceId()) {
      new RequestsRoutes().putPost(this.state.route + '/user/' + this.props.getInvoiceId(), e.target).then((response) => {
        if (response.status === 200) {
          alert('Invoice Updated')
          this.getInvoiceData(this.props.getInvoiceId())
          this.loadTime()
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
      <>
        {this._invoiceElements.invoiceResume(this._invoice, this._event)}
        <div className='border rounded p-4 pt-0 mt-2'>
          <div className='d-flex search mt-4 mb-4'>
            <h3 className='m-0'>Partner invoice information</h3>
            <a href='/invoices' className='btn btn-outline-secondary btn-dark text-light ms-4' type='button' > Cancel </a>
          </div>
          <form encType='multipart/form-data' className='needs-validation' onSubmit={this.formUpdate.bind(this)}>    
            {this._invoiceElements.taxinfoInputs(this.state.title, this._invoice, this.props.getInvoiceId(),0)}
            <button type='submit' className='btn btn-dark'> Submit </button>
          </form>
        </div>
      </>
    )
  }

  public render(): React.ReactNode {
    return (
      <>
      {this.state.loaded  && this._invoice? this.preRender() : <div className='d-flex align-items-center justify-content-center' style={{ width: '100%', height: '80vh' }}><div className='spinner-border text-dark' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </div></div>}
      </>
    );
  }
}