import React from 'react';
import RequestsRoutes from '../../http/requests';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit'
import ExportExcel from '../formsElements/invoiceElements/exportExcel';

interface IProps {
  setInvoiceD: any
  userType: any
  userIdLogged: any
}


interface IState {
  invoicesRows: JSX.Element[]
  route: string | null
  firstPageURL: string | null
  prevPageURL: string | null
  nextPageURL: string | null
  search: string
  userId: any
  standInformation: any
}

export default class InformationTable extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      invoicesRows: [],
      route: 'invoices',
      firstPageURL: null,
      prevPageURL: null,
      nextPageURL: null,
      search: '',
      userId: '',
      standInformation: ''
    };

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

  componentDidMount(): void {
    if(this.props.userType() != 1 ){
       this.getInvoices('invoices/' + this.props.userIdLogged())
      }else{
        this.getInvoices('invoices');
        this.getAllSponsorInformation('standsinformation')
      }

  }

  getAllSponsorInformation(route: any):any{
    new RequestsRoutes().get(route).then((response)=> {
      this.setState({standInformation: response.data})
    })
  }

  getInvoices(route: any): void {
    new RequestsRoutes().get(route).then((response) => {

      let invoicesRow: JSX.Element[] = [];

      response.data.invoices.data.forEach((data: any, i: any) => {
        
        if (data.user_type != 1 && data.company_name && data.address && data.zip && data.country && data.vat){
          invoicesRow.push(
            <tr key={i} className='p-2 align-middle'>
              <th scope='col'>
                <h6 className='m-0'>
                  <b>{data.company_name}</b>
                </h6>
                <p className='m-0' style={{ fontSize: '0.8rem' }}>{data.name}</p>
              </th>
  
              <th scope='col'>
              <p className='m-0'><b>{data.invoice_number}</b></p>
                <p className='m-0' style={{ fontSize: '0.8rem' }}> {data.category} - {data.location}</p>
                {data.voucher && data.payment_status == 'Payed' ?null: <p className='badge rounded-pill text-bg-danger m-0' style={{fontSize: '0.8rem'}}>Payment is required in order to add sponsor information  </p>}
              </th>
              <th scope='col'>
                <p className='m-0'>{data.email}</p>
                
                  
              </th>
  
              <th scope='col'>
                <div className='d-flex'>

                {data.voucher && data.payment_status == 'Payed' ? <Link to={{pathname:'/informationtable/create'}} onClick={(e) => {
                                      this.props.setInvoiceD(data.id)
                  }} type='button' className='btn btn-dark btn-sm'>
                    <EditIcon />
                  </Link>  : null}
                  
                  
                </div>
              </th>
            </tr>
          );
        }
        

      });

      this.setState({ invoicesRows: invoicesRow });

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


  render(): React.ReactNode {
    return (
      <>
        <div className='d-flex search mt-4 mb-4 justify-content-between'>

          <div className='d-flex'><h3 className='m-0'>Sponsor information</h3> &nbsp;&nbsp;
          
          {this.props.userType() == 1 ? <a onClick={() => {

                  new ExportExcel().exportStandInformation(this.state.standInformation)
                 
                }} className='btn btn-outline-dark btn-dark-outline' type='button'>Export all</a>: null}
          </div>



          {this.props.userType() == 1 ? <div className='input-group w-50 ms-4'>
            <input onChange={(e) => {
              this.setState({ search: e.target.value })
            }}
              onKeyDown={(e) => {
                (e.code == 'Enter' || e.code == 'NumpadEnter') ? (this.state.search == '' ? this.setState({ route: 'invoices' }) : this.setState({ route: 'invoices/search/' + this.state.search })) : null
              }}
              type='text'
              className='form-control'
              placeholder='Find by email or Company Name'
            />
            <button
              className='btn btn-outline-secondary btn-dark text-light '
              type='button'

              onClick={() => {

                this.state.search ? this.setState({ route: 'invoices/search/' + this.state.search }) : this.setState({ route: 'invoices' })
              }}
            >
              Search
            </button>
          </div> : null}
        </div>

        <div className='rounded-4 '>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Company Name</th>
                <th scope='col'>Pack and Location</th>
                <th scope='col'>Email</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>{this.state.invoicesRows}</tbody>
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
                  >
                    First page
                  </a>
                </li>
              ) : null}
              {this.state.prevPageURL != null ? (
                <li className='page-item'>
                  <a
                    className='page-link text-dark'
                    onClick={() => {
                      this.setState({ route: this.state.prevPageURL });
                    }}
                  >
                    {' '}
                    Previous page{' '}
                  </a>
                </li>
              ) : null}
              {this.state.nextPageURL != null ? (
                <li className='page-item'>
                  <a
                    className='page-link text-dark'
                    onClick={() => {
                      this.setState({ route: this.state.nextPageURL });
                    }}
                  >
                    {' '}
                    Next page{' '}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

      </>
    );
  }
}
