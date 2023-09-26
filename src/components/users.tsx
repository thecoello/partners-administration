import React from "react"
import UserForm from "./formsElements/userForm"
import UserTable from "./tables/userTable"

interface IProps {}
interface IState {
  userTable: boolean
  userForm: boolean
}

export default class Users extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      userTable: true,
      userForm: false
    }

    this.createUser = this.createUser.bind(this)  
    this.showUser = this.showUser.bind(this)  
  }

  createUser() {
    this.setState({ userTable: false })
    this.setState({ userForm: true })
  }

  showUser() {
    this.setState({ userTable: true })
    this.setState({ userForm: false })
  }

  render(): React.ReactNode {
    return (
      <div className="container">

        {this.state.userTable ? <UserTable userFormState={this.createUser} /> : null}
        {this.state.userForm ? <UserForm userTableState={this.showUser} /> : null}
        
      </div>
    )
  }
}
