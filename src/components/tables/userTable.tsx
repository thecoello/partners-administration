import React from 'react'
import RequestsRoutes from '../../http/requests'
import EditIcon from '@mui/icons-material/Edit'
import { Delete } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import User from '../../models/users/model.users'

interface IProps {
  setUserID: any
}

interface IState {
  usersRows: JSX.Element[]
  route: string | null
  firstPageURL: string | null
  prevPageURL: string | null
  nextPageURL: string | null
  search: string
}


export default class UserTable extends React.Component<IProps, IState> {

  _user?: Array<User>

  constructor(props: IProps) {
    super(props)
    this.state = {
      usersRows: [],
      route: 'users',
      firstPageURL: null,
      prevPageURL: null,
      nextPageURL: null,
      search: '',
    }
  }

  componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: any
  ): void {
    prevState.route != this.state.route ? this.getUsers() : null
  }

  componentDidMount(): void {
    this.getUsers()
  }

  getUsers(): void {
    new RequestsRoutes().get(this.state.route).then((response) => {
      this._user = response.data.data

      response.data.first_page_url != null
        ? this.setState({
          firstPageURL: response.data.first_page_url.split('api/')[1],
        })
        : this.setState({ firstPageURL: null })
      response.data.prev_page_url != null
        ? this.setState({
          prevPageURL: response.data.prev_page_url.split('api/')[1],
        })
        : this.setState({ prevPageURL: null })
      response.data.next_page_url != null
        ? this.setState({
          nextPageURL: response.data.next_page_url.split('api/')[1],
        })
        : this.setState({ nextPageURL: null })
    })
  }

  preRender() {
    let usersRow: JSX.Element[] = []
    this._user?.forEach((user: User, i: any) => {
      usersRow.push(
        <tr key={i} className='p-2 align-middle'>
          <th scope='col'>
            <h6 className='m-0'>
              <b>{user.contact}</b>
            </h6>
          </th>
          <th scope='col'>
            <p className='m-0'>
              <b>{user.name}</b>
            </p>
          </th>
          <th scope='col'>
            <p className='m-0'>{user.user_type == 1 ? 'Admin' : 'User'}</p>
          </th>
          <th scope='col'>
            <p className='m-0'>{user.email}</p>
          </th>
          <th scope='col'>
            <div className='d-flex'>

              <Link to={{ pathname: '/users/form' }} onClick={(e) => {
                this.props.setUserID(user.id)
              }} type='button' className='btn btn-dark btn-sm'>
                <EditIcon />
              </Link>

              <button onClick={(e) => {
                e.preventDefault()
                if (confirm('Are you sure you want to delete the user ' + user.name)) {
                  new RequestsRoutes().delete('users/' + user.id)
                    .then((response) => {
                      if (response.status === 200) {
                        alert('User ' + user.name + ' delete')
                        window.location.reload()
                      }
                    }).catch((error) => {
                      alert(error)
                    })
                }
              }} type='button' className='btn btn-dark btn-sm'>
                <Delete />
              </button>
            </div>
          </th>
        </tr>
      )
    })
    return usersRow
  }



  render(): React.ReactNode {
    return (
      <>
        <div className='d-flex search mt-4 mb-4 justify-content-between'>
          <div className='d-flex'>
            <h3 className='m-0'>Users</h3>
            <a href='./users/form' className='btn btn-outline-secondary btn-dark text-light ms-4' type='button'>Create user</a>
          </div>

          <div className='input-group w-50 ms-4'>
            <input
              onChange={(e) => {
                this.setState({ search: e.target.value })
              }}
              onKeyDown={(e) => {
                e.code == 'Enter' || e.code == 'NumpadEnter'
                  ? this.state.search == ''
                    ? this.setState({ route: 'users' })
                    : this.setState({
                      route: 'users/search/' + this.state.search,
                    })
                  : null
              }}
              type='text' className='form-control' placeholder='Find by User name, email or Company Name' />
            <button
              className='btn btn-outline-secondary btn-dark text-light' type='button'
              onClick={() => {
                this.state.search
                  ? this.setState({
                    route: 'users/search/' + this.state.search,
                  })
                  : this.setState({ route: 'users' })
              }}>
              Search</button>
          </div>
        </div>

        <div className='rounded-4 '>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Company Name</th>
                <th scope='col'>Name</th>
                <th scope='col'>User type</th>
                <th scope='col'>Email</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>{this.preRender()}</tbody>
          </table>

          <div>
            <ul className='pagination'>
              {this.state.firstPageURL != null ? (
                <li className='page-item '>
                  <a className='page-link bg-dark text-light'
                    onClick={() => {
                      this.setState({ route: this.state.firstPageURL })
                    }}> First page </a>
                </li>
              ) : null}
              {this.state.prevPageURL != null ? (
                <li className='page-item'>
                  <a className='page-link text-dark'
                    onClick={() => {
                      this.setState({ route: this.state.prevPageURL })
                    }}>{' '}Previous page{' '} </a>
                </li>
              ) : null}
              {this.state.nextPageURL != null ? (
                <li className='page-item'>
                  <a className='page-link text-dark'
                    onClick={() => {
                      this.setState({ route: this.state.nextPageURL })
                    }} >{' '} Next page{' '} </a>
                </li>) : null}
            </ul>
          </div>
        </div>
      </>
    )
  }
}