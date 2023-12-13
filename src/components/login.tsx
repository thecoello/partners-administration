import React from 'react';
import RequestsRoutes from '../http/requests';

interface IProps {
}

interface IState {
  userId: any
  invoiceId: any
}

export default class Login extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
  }

  login(e: any) {
    e.preventDefault()
    new RequestsRoutes().login('login', e.target).then((response) => {
      if (response.status === 200) {
        localStorage.setItem('Authorization',response.data.Authorization)
        window.location.reload()
      }else{
        alert("Wrong email or password")
      }
    }).catch((error) => {
      alert(error)
    })
  }

  render(): React.ReactNode {
    return (
      <div className='d-flex align-items-center justify-content-center w-100 login'>

        <div className='w-50 d-flex align-items-center justify-content-center flex-column '>
        </div>
        <div className='w-50' id='login-form'>

          <form encType='multipart/form-data' onSubmit={this.login.bind(this)} className='needs-validation d-flex align-items-start justify-content-center flex-column w-100' style={{ padding: '8rem' }}>
            <span className='text-left'>
              <h2 className='text-dark text-uppercase'>Partner summit for sme</h2>
              <p className='text-dark'>Sponsor administration</p>
            </span>
            <br />
            <div className='w-100'>

              <div className='mb-3 w-100'>
                <input name='email' type='email' className='form-control' id='email' placeholder='Email' aria-describedby='email' required />
              </div>
              <div className='mb-3 w-100'>
                <input name='password' type='password' className='form-control' placeholder='Password' id='password' required />
              </div>

              <button type='submit' className='btn btn-dark w-100'>Login</button>
            </div>
          </form>
        </div>

      </div>
    )
  }
}