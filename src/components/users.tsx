import axios from "axios"
import React from "react"
import UserForm from "./formsElements/userForm"

axios.defaults.withCredentials = true


interface IProps { }

interface IState {
 
}

export default class Users extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      url: import.meta.env.VITE_URL,
    }
  }


  render(): React.ReactNode {
    return (
      <>
      {new UserForm().form()}
      </>
    )
  }
}
