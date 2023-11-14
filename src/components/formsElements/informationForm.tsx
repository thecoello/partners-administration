import React from "react";
import CountrySelector from "./selectors";
import RequestsRoutes from "../../http/requests";
import { useLocation } from "react-router-dom";

interface IProps {
  getUserId: any
}
interface IState {
}

export default class InformationForm extends React.Component<IProps, IState> {


  constructor(props: IProps) {
    super(props);


  }

  componentDidMount(): void {

    if(this.props.getUserId()){
      console.log(this.props.getUserId())
    }

  }

  public render(): React.ReactNode {

    return (

      <p></p>

    );
  }
}
