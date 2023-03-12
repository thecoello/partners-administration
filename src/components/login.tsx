import React from "react";
import axios from "axios";
import FormData from "form-data";
import qs from "qs"

interface IProps {
  userType?: any
  userID?: any

}

interface IState {
  email?: any
  password?: any
  userType?: any
  userID?: any
  url?: any
  logged?: boolean
}

export default class Login extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      email: "",
      password: "",
      url: import.meta.env.VITE_URL,
      userID: "",
      userType: "",
      logged: false
    }
  }



  render(): React.ReactNode {
   
  }


}