import React from "react";
import axios, { AxiosHeaders } from "axios";
import qs from "qs";


interface IProps {

}

interface IState {

}

export default class Home extends React.Component<IProps, IState>{

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
      <p>Home</p>
    )
  }


}