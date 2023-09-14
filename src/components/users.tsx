import axios from "axios"
import React from "react"
import FormData from "form-data"
import qs from "qs"

axios.defaults.withCredentials = true


const instance = axios.create({
  baseURL: import.meta.env.VITE_URL,
  withCredentials: true,
})

interface IProps { }

interface IState {
 
}

export default class createAndUpdateUser extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      url: import.meta.env.VITE_URL,
    }
  }

  componentDidMount(): void {

  }

  render(): React.ReactNode {
    return (
        <p>hello</p>
    )
  }
}
