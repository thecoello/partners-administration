import React from 'react';
import RequestsRoutes from '../http/requests';
import { Logout } from '@mui/icons-material';

interface IState {
}

interface IProps {
  userType: any
  userName: any
}

export default class Menu extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }


  render(): React.ReactNode {
    return (
      <>
        <nav className='navbar navbar-expand-lg bg-body-tertiary'>
          <div className='container-fluid'>
            <a className='navbar-brand text-light' href='/'>
            Partner summit for SME <span style={{fontSize:'0.8rem'}}>Sponsor Administration </span>
            </a>

            <div className='collapse navbar-collapse' id='navbarNav'>
              <ul className='navbar-nav'>
              <li className='nav-item'>
                  <a href='/home' className={window.location.href.includes('home') ? 'rounded-pill text-bg-light text-dark nav-link' : 'nav-link text-light '} aria-current='page'>
                    Home
                  </a>
                </li>
                <li className='nav-item'>
                  <a href='/invoices' className={window.location.href.includes('invoices') ? 'rounded-pill text-bg-light text-dark nav-link' : 'nav-link text-light '} aria-current='page'>
                    Invoices
                  </a>
                </li>
                <li className='nav-item'>
                  <a href='/boothinformation' className={window.location.href.includes('boothinformation') ? 'rounded-pill text-bg-light text-dark nav-link' : 'nav-link text-light '} aria-current='page'>
                    Booth information
                  </a>
                </li>

                {this.props.userType == 1 ?<><li className='nav-item'>
                  <a href='/users' className={window.location.href.includes('users') ? 'rounded-pill text-bg-light text-dark nav-link' : 'nav-link text-light '} aria-current='page'>
                    Users
                  </a>
                </li>
                <li className='nav-item'>
                  <a href='/eventinformation' className={window.location.href.includes('eventinformation') ? 'rounded-pill text-bg-light text-dark nav-link' : 'nav-link text-light '} aria-current='page'>
                    Event information
                  </a>
                </li></> : null}
                
              </ul>

            
            </div>

            <span className='text-light'>{this.props.userName}</span>

            &nbsp;&nbsp;

            <a  className='btn btn-light' href='/' onClick={(e)=>{
                if(confirm('Are you sure you want to Sign out?')){
                  localStorage.removeItem('Authorization')
                  localStorage.removeItem('user_id')
                }
              }}> <span><Logout /></span></a>
          </div>
        </nav>
      </>
    );
  }
}
