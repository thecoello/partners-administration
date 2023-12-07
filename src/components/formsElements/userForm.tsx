import React from 'react'
import RequestsRoutes from '../../http/requests'
import User from '../../models/users/model.users'

interface IProps {
  getUserId: any
}

interface IState {
  route: null | string
  title: string
  loaded: boolean
}

export default class UserForm extends React.Component<IProps, IState> {

  _user = new User()

  constructor(props: IProps) {
    super(props)
    this.state = {
      route: 'users',
      title: '',
      loaded: false
    }
  }

  getUserData = (id: any) => {
    new RequestsRoutes().get(this.state.route + '/' + id).then((response) => {
      this._user = response.data[0]
    })
  }

  formCreate(e: any) {
    e.preventDefault()
    new RequestsRoutes().post(this.state.route, e.target).then((response) => {
      if (response.status === 200) {
        alert('User created')
        window.location.href = '/users'
      }
    }).catch((error) => {
      alert(error)
    })
  }

  formUpdate(e: any) {
    e.preventDefault()
    new RequestsRoutes()
      .put(this.state.route + '/' + this.props.getUserId(), e.target).then((response) => {
        if (response.status === 200) {
          alert('User Updated')
          window.location.href = '/users'
        }
      }).catch((error) => {
        alert(error)
      })
  }

  componentDidMount(): void {
    if (this.props.getUserId()) {
      this.setState({ title: 'Update user' })
      this.getUserData(this.props.getUserId())
      this.loadTime()
    } else {
      this.setState({ title: 'Create user' })
      this.loadTime()
    }
  }

  loadTime() {
    this.setState({ loaded: false })
    setTimeout(() => {
      this.setState({ loaded: true })
    }, 500);
  }

  preRender() {
    let user: JSX.Element[] = []
    user.push(
      <div key={`${Math.floor((Math.random() * 1000))}-min`}>
        <div className='d-flex search mt-4 mb-4'>
          <h3 className='m-0'>{this.state.title}</h3>
          <a
            href='/users'
            className='btn btn-outline-secondary btn-dark text-light ms-4'
            type='button'
          >
            Cancel
          </a>
        </div>

        <form
          className='needs-validation'
          onSubmit={
            this.props.getUserId()
              ? this.formUpdate.bind(this)
              : this.formCreate.bind(this)
          }
        >
          <div className='row' >
            <div className='col-4'>
              <div className='mb-3'>
                <label htmlFor='contact' className='form-label'>
                  Company Name {this.props.getUserId() ? null : '*'}
                </label>
                <input
                  onChange={(e) => {
                    this._user.contact = e.target.value
                  }}
                  defaultValue={
                    this.props.getUserId() ? this._user.contact : undefined
                  }
                  required={this.props.getUserId() ? false : true}
                  type='text'
                  className='form-control'
                  id='contact'
                  name='contact'
                />
              </div>
            </div>
            <div className='col-4'>
              <div className='mb-3'>
                <label htmlFor='name' className='form-label'>
                  Name {this.props.getUserId() ? null : '*'}
                </label>
                <input
                  onChange={(e) => {
                    this._user.name = e.target.value
                  }}
                  defaultValue={this.props.getUserId() ? this._user.name : undefined}
                  required={this.props.getUserId() ? false : true}
                  type='text'
                  className='form-control'
                  id='name'
                  name='name'
                />
              </div>
            </div>
            <div className='col-4'>
              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>
                  Email {this.props.getUserId() ? null : '*'}
                </label>
                <input
                  onChange={(e) => {
                    this._user.email = e.target.value
                  }}
                  defaultValue={this.props.getUserId() ? this._user.email : undefined}
                  required={this.props.getUserId() ? false : true}
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-4'>
              <div className='mb-3'>
                <label htmlFor='password' className='form-label'>
                  Password {this.props.getUserId() ? null : '*'}
                </label>
                <input
                  onChange={(e) => {
                    this._user.password = e.target.value
                  }}
                  defaultValue={
                    this.props.getUserId() ? this._user.password : undefined
                  }
                  required={this.props.getUserId() ? false : true}
                  type='password'
                  className='form-control'
                  id='password'
                  name='password'
                />
              </div>
            </div>
            <div className='col-4'>
              <div className='mb-3'>
                <label htmlFor='user_type' className='form-label'>
                  User Type {this.props.getUserId() ? null : '*'}
                </label>

                <select
                  onChange={(e) => {
                    this._user.user_type = Number(e.target.value)
                  }}
                  defaultValue={
                    this.props.getUserId() ? this._user.user_type : undefined
                  }
                  className='form-select'
                  name='user_type'
                  required
                >
                  <option value=''>Select option</option>
                  <option value='0'>User</option>
                  <option value='1'>Admin</option>
                </select>
              </div>
            </div>
          </div>
          <hr />

          <button type='submit' className='btn btn-dark'>
            Submit
          </button>
        </form>
      </div>
    )

    return user
  }



  public render(): React.ReactNode {

    return (
      <>
        {(this.state.loaded && this._user) ? this.preRender() : <div className='d-flex align-items-center justify-content-center' style={{ width: '100%', height: '80vh' }}><div className='spinner-border text-dark' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div></div>}
      </>
    )
  }
}