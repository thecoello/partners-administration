import React from 'react';
import RequestsRoutes from '../http/requests';

interface IProps {
}

interface IState {
  userId?: any
  invoiceId?: any
  passwordReset: boolean
  password?: string
  passwordr?: string
}

export default class Login extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      passwordReset: false
    }
  }

  componentDidMount(): void {
    window.location.href.includes('passwordreset') ? this.setState({passwordReset: true}) : this.setState({passwordReset: false})
  }

  login(e: any) {
    e.preventDefault()
    new RequestsRoutes().login('login', e.target).then((response) => {
      if (response?.status === 200) {
        localStorage.setItem('Authtoken', response.data.Authtoken)
        window.location.reload()
      } else {
        alert("Wrong email or password")
      }
    }).catch((error) => {
      alert(error)
    })
  }

  resetPassword(e: any) {
    e.preventDefault()
    if (this.state.password == this.state.passwordr) {

      new RequestsRoutes()
      .resetPass('resetpass', e.target).then((response) => {
        if (response.status === 200) {
          alert('Password changed')
          window.location.href = ''
        }else{
          alert('User does not exist or password does not match')

        }
      }).catch((error) => {
        alert(error)
      })

    } else {
      alert("Passwords do not match")
    }
  }

  resetPasswordForm(): React.ReactNode {
    return (
      <form  className='needs-validation d-flex align-items-start justify-content-center flex-column w-100' onSubmit={this.resetPassword.bind(this)} style={{ padding: '8rem' }}>

        <span className='text-left'><a className='text-dark text-decoration-none' onClick={() => { this.setState({ passwordReset: false }) }}> <b>{'<'} Back to Login</b></a>
          <br />   <br />
          <h2 className='text-dark text-uppercase'>Partner summit for sme</h2>
          <p className='text-dark'>Sponsor administration</p>
        </span>
        <br />
        <p><b>Password reset</b></p>
        <div className='mb-3 w-100'>
          <input type="email" className="form-control" name="email" id="email" placeholder='Email' aria-describedby="email" required />
        </div>
        <div className='mb-3 w-100'>
          <input onChange={(e) => {
            this.setState({ password: e.target.value })
          }} type="password" className="form-control" name="password" id="password" placeholder='Password' aria-describedby="password" required /></div>
        <div className='mb-3 w-100'>
          <input onChange={(e) => {
            this.setState({ passwordr: e.target.value })
          }} type="password" className="form-control" name="passwordr" id="passwordr" aria-describedby="passwordr" placeholder='Repeat Password' required /></div>
        <button type='submit' className='btn btn-dark'> Reset Password </button>
      </form>
    )
  }

  loginForm(): React.ReactNode {
    return (
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
    )
  }

  render(): React.ReactNode {
    return (
      <>
        <div className='d-flex align-items-center justify-content-center w-100 login'>

          <div className='w-50 d-flex align-items-center justify-content-center flex-column '>
          </div>
          <div className='w-50' id='login-form'>

            {this.state.passwordReset ? this.resetPasswordForm() : this.loginForm()}

          </div>
        </div>
      </>
    )
  }
}