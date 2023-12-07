import React from 'react';
import RequestsRoutes from '../../http/requests';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import InvoicePDF from '../formsElements/invoiceElements/invoicePDF';
import { Link } from 'react-router-dom';
import { Square, Warning } from '@mui/icons-material';
import Invoice from '../../models/invoices/model.invoice';
import Event from '../../models/event/model.event';
import ExportExcel from '../formsElements/invoiceElements/exportExcel';

interface IProps {
  setInvoiceId: any
  userType: any
  userIdLogged: any
}

interface IState {
  route: string | null
  firstPageURL: string | null
  prevPageURL: string | null
  nextPageURL: string | null
  search: string
  invoiceDataExport?: any
}

export default class InvoiceTable extends React.Component<IProps, IState> {

  _invoices?: Array<Invoice>
  _event = new Event()

  constructor(props: IProps) {
    super(props);
    this.state = {
      route: 'invoices',
      firstPageURL: null,
      prevPageURL: null,
      nextPageURL: null,
      search: '',
      invoiceDataExport: undefined
    };
  }

  componentDidMount(): void {
    if(this.props.userType() != 1 ){
       this.getInvoices('invoices/' + this.props.userIdLogged())
      }else{
        this.getInvoices('invoices');
      }

  }

  getInvoices(route: any): void {
    new RequestsRoutes().get(route).then((response) => {

      this._invoices = response.data.invoices.data
      this._event = response.data.eventinfo[0]

      response.data.invoices.first_page_url != null
        ? this.setState({
          firstPageURL: response.data.invoices.first_page_url.split('api/')[1],
        })
        : this.setState({ firstPageURL: null });
      response.data.invoices.prev_page_url != null
        ? this.setState({
          prevPageURL: response.data.invoices.prev_page_url.split('api/')[1],
        })
        : this.setState({ prevPageURL: null });
      response.data.invoices.next_page_url != null
        ? this.setState({
          nextPageURL: response.data.invoices.next_page_url.split('api/')[1],
        })
        : this.setState({ nextPageURL: null });

    });
  }

  componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: any
  ): void {

    if(prevState.route != this.state.route && this.props.userType() == 1){
      this.getInvoices(this.state.route)
    }

    if(prevState.route != this.state.route && this.props.userType() == 0){
      this.getInvoices(this.state.route)
    }

  }


  preRender() {

    let invoicesRow: JSX.Element[] = []

    this._invoices?.forEach((data: any, i: any) => {
      invoicesRow.push(
        <tr key={i} className='p-2 align-middle'>
          <th scope='col'>

            {data.company_name && data.address && data.zip && data.country && data.vat ? <h6 className='m-0'>
              <b>{data.company_name}</b>
            </h6> : <h6 className='m-0'>
              <b><Warning /> Missing tax information</b>
            </h6>}
            <p className='m-0' style={{ fontSize: '0.8rem' }}>{data.name}</p>
          </th>
          <th scope='col'>
            <p className='m-0'>{data.invoice_number}</p>

            {data.payment_status == 'Payed' ? (
              <><span className='badge rounded-pill text-bg-success'>
                Payed
              </span>

              {data.voucher ? <span className='badge rounded-pill text-bg-warning'>
                  Proof of payment
                </span> :null }
              </>
            ) : (
              <>
              <span className='badge rounded-pill text-bg-danger'>
                Unpayed
              </span>
              {data.voucher ? <span className='badge rounded-pill text-bg-warning'>
              Proof of payment
            </span> :null }
          </>
            )}
          </th>
          <th scope='col'>
            <p className='m-0'><b>{data.category}</b></p>
            <p className='m-0' style={{ fontSize: '0.8rem' }}>{data.location}</p>
          </th>
          <th scope='col'>
            <p className='m-0'>{data.email}</p>
          </th>
          <th scope='col'>
            <p className='m-0'>{data.total + this._event.symbol}</p>
            <p className='m-0' style={{ fontSize: '0.8rem' }}>Price type: {data.pricetype}</p>

          </th>
          <th scope='col'>
            <div className='d-flex'>
              {data.company_name && data.address && data.zip && data.country && data.vat ? <button
                type='button'
                className='btn btn-dark btn-sm'
                onClick={() => {
                  new InvoicePDF(data, this._event).generateInvoice();
                }}
              >
                <DownloadIcon />
              </button> : <div className='btn btn-warning btn-sm disabled'><Warning /></div>}

              {this.props.userType() == 1 ? <Link to={{ pathname: '/invoices/form' }} onClick={(e) => {
                this.props.setInvoiceId(data.id)
              }} type='button' className='btn btn-dark btn-sm'>
                <EditIcon />
              </Link> : <Link to={{ pathname: '/invoices/updatepartner' }} onClick={(e) => {
                this.props.setInvoiceId(data.id)
              }} type='button' className='btn btn-primary btn-sm'>
                <EditIcon />
              </Link> }
            </div>
          </th>
        </tr>
      );

    });
    return invoicesRow
  }

  render(): React.ReactNode {
    return (
      <>
        <div className='d-flex search mt-4 mb-4 justify-content-between'>

          <div className='d-flex'><h3 className='m-0'>Invoices</h3>

          {this.props.userType() == 1 ? <a href='/invoices/form' className='btn btn-outline-secondary btn-dark text-light ms-4' type='button'> Create invoice </a>: null}

          {this.props.userType() == 1 ? <a onClick={() => {
                  new ExportExcel().exportInvoice(this._invoices, this._event)
                 
                }} className='btn btn-outline-dark btn-dark-outline' type='button'>Export all</a>: null}

          </div> 

          {this.props.userType() == 1 ? <div className='input-group w-50 ms-4'>
            <input onChange={(e) => {
              this.setState({ search: e.target.value })
            }}
              onKeyDown={(e) => {
                (e.code == 'Enter' || e.code == 'NumpadEnter') ? (this.state.search == '' ? this.setState({ route: 'invoices' }) : this.setState({ route: 'invoices/search/' + this.state.search })) : null
              }}
              type='text' className='form-control' placeholder='Find by Invoice Number or Company Name' />
            <button className='btn btn-outline-secondary btn-dark text-light ' type='button'
              onClick={() => {
                this.state.search ? this.setState({ route: 'invoices/search/' + this.state.search }) : this.setState({ route: 'invoices' })
              }}
            >Search </button>
          </div> : null}
        </div>

        <div className='rounded-4 '>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Company Name</th>
                <th scope='col'>Invoice #</th>
                <th scope='col'>Pack and Location</th>
                <th scope='col'>Email</th>
                <th scope='col'>Total</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>{this.preRender()}</tbody>
          </table>

          <div>
            <ul className='pagination'>
              {this.state.firstPageURL != null ? (
                <li className='page-item '>
                  <a
                    className='page-link bg-dark text-light'
                    onClick={() => {
                      this.setState({ route: this.state.firstPageURL });
                    }}
                  > First page </a>
                </li>
              ) : null}
              {this.state.prevPageURL != null ? (
                <li className='page-item'>
                  <a className='page-link text-dark'
                    onClick={() => {
                      this.setState({ route: this.state.prevPageURL });
                    }}
                  >{' '}Previous page{' '} </a>
                </li>
              ) : null}
              {this.state.nextPageURL != null ? (
                <li className='page-item'>
                  <a className='page-link text-dark' onClick={() => {
                    this.setState({ route: this.state.nextPageURL });
                  }} >{' '}Next page{' '}</a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

      </>
    );
  }
}