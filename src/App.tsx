import React from 'react';
import Menu from './components/menu';

import UserTable from './components/tables/userTable';
import UserForm from './components/formsElements/userForm';

import InvoiceTable from './components/tables/invoiceTable';
import InvoiceForm from './components/formsElements/invoiceForm';
import InformationTable from './components/tables/InformationTable';
import InformationForm from './components/formsElements/informationForm';

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import InvoiceFormPartner from './components/formsElements/invoiceFormPartner';
import EventInfoForm from './components/formsElements/enventInfoForm';
import Login from './components/login';
import RequestsRoutes from './http/requests';
import Home from './components/home';

interface IProps {
}

interface IState {
  userId: any
  userType: number | null
  userName: string | null
  userIdLogged: number | null
  invoiceId: any
  logged: boolean
  loaded: boolean
}

export default class App extends React.Component<IProps, IState> {
  router: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      userId: '',
      userType: null,
      userIdLogged: null,
      invoiceId: '',
      logged: false,
      loaded: false,
      userName: ''
    }
  }

  generateRouter(){
    this.router = createBrowserRouter([
      {
        path: '/',
        element: this.state.userType == 1  ? <InvoiceTable userIdLogged={this.getUserIdLogged} userType={this.getUserType} setInvoiceId={this.setInvoiceId} /> : <Home/>
      },
      {
        path: '/home',
        element: <Home/>
      },
      {
        path: '/invoices',
        element: <InvoiceTable userIdLogged={this.getUserIdLogged} userType={this.getUserType} setInvoiceId={this.setInvoiceId} />,
      },
      {
        path: '/invoices/form',
        element: this.state.userType == 1 ? <InvoiceForm getInvoiceId={this.getInvoiceId} /> : <InvoiceTable userIdLogged={this.getUserIdLogged} userType={this.getUserType} setInvoiceId={this.setInvoiceId} />,
      },
      {
        path: '/invoices/updatepartner',
        element: <InvoiceFormPartner getInvoiceId={this.getInvoiceId} />,
      },
      {
        path: '/users',
        element: this.state.userType ? <UserTable setUserID={this.setUserId}  /> : <InvoiceTable userIdLogged={this.getUserIdLogged} userType={this.getUserType} setInvoiceId={this.setInvoiceId} />,
      },
      {
        path: '/users/form',
        element: this.state.userType == 1 ? <UserForm getUserId={this.getUserId} />: <InvoiceTable userIdLogged={this.getUserIdLogged} userType={this.getUserType} setInvoiceId={this.setInvoiceId} />,
      },
      {
        path: '/boothinformation',
        element: <InformationTable userIdLogged={this.getUserIdLogged} userType={this.getUserType} setInvoiceD={this.setUserId} />,
      },
      {
        path: '/boothinformation/create',
        element: <InformationForm getInvoiceId={this.getUserId} />,
      },
      {
        path: '/eventinformation',
        element: this.state.userType == 1 ? <EventInfoForm /> : <InvoiceTable userIdLogged={this.getUserIdLogged} userType={this.getUserType} setInvoiceId={this.setInvoiceId} />,
      },
    ]);
  }

  authUser() {
    new RequestsRoutes().authUser().then((response) => {
        
      if(response?.status == 200){
        this.setState({ userType: response.data.user_type })
        this.setState({ userName: response.data.name })
        this.setState({ userIdLogged: response.data.id })
      }else{
        localStorage.removeItem('Authorization')
        localStorage.removeItem('user_id')
      }
    });
  }

  loadTime() {
    this.setState({ loaded: false })
    setTimeout(() => {
      this.setState({ loaded: true })
      this.generateRouter()
    }, 500);
  }


  componentDidMount(): void {
    this.authUser()
    this.loadTime()
    if(localStorage.getItem('Authorization')){
      this.setState({ logged: true })
    }else{
      this.setState({ logged: false })
    }
  }

  getUserIdLogged = () =>{
    return this.state.userIdLogged
  }

  getUserType = () => {
    return this.state.userType
  }

  setUserId = (id: any) => {
    this.setState({ userId: id })
  }

  getUserId = () => {
    return this.state.userId
  }

  setInvoiceId = (id: any) => {
    this.setState({ invoiceId: id })
  }

  getInvoiceId = () => {
    return this.state.invoiceId
  }

  preRender() {
    return (
      <><Menu userName={this.state.userName} userType={this.state.userType} />
        <div className='cotainerfluid'>
          <div className='row'>
            <div className='col-12' id='content-view'>
              <div className='container'>
                <RouterProvider router={this.router} />
              </div>
            </div>
          </div>
        </div></>
    )
  }

  render(): React.ReactNode {
    return (
      <>
        {this.state.logged ?

          <>
            {(this.state.loaded && this.state.userType != null) ? this.preRender() : <div className='d-flex align-items-center justify-content-center' style={{ width: '100%', height: '80vh' }}><div className='spinner-border text-dark' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div></div>}
          </>

          : <Login />
        }

      </>
    );
  }
}
