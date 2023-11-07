import React from "react";
import Forms from "./selectors";
import RequestsRoutes from "../../http/requests";
import { useLocation } from "react-router-dom";

interface IProps {

}
interface IState {
}



export default class InformationForm extends React.Component<IProps, IState> {
  

  constructor(props: IProps) {
    super(props);
  
    this.state = useLocation()

  }
   
  componentDidMount(): void {
    

    console.log(this.state)
  }
  
  public render(): React.ReactNode {
    
    return (

      <p></p>

    );
  }
}
