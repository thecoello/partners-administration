import React from "react";
import Home from "./components/Home";
import CreateUser from "./components/users";
import FileUpload from "./components/fileUpload";
import Invoice from "./components/invoice";
import Menu from "./components/menu";
import axios from "axios";
import qs from "qs";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;

interface IProps {}

interface IState {
  home?: boolean;
  invoices?: boolean;
  filesUpload?: boolean;
  createUser?: boolean;
  userType?: any;
  userID?: any;
  logged?: boolean;
  email?: string;
  password?: string;
}

export default class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      home: false,
      invoices: true,
      filesUpload: false,
      createUser: false,
      userType: 1,
      userID: 1,
      logged: true,
    };
  }

  logOutAction = () => {
    var data = qs.stringify({
      token: import.meta.env.VITE_TOKEN,
    });

    axios
      .post(import.meta.env.VITE_URL, data, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ userID: "" });
          this.setState({ userType: "" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loginAction = () => {
    var data = qs.stringify({
      email: this.state.email,
      password: this.state.password,
      token: import.meta.env.VITE_TOKEN,
    });

    var config = {
      method: "post",
      url: import.meta.env.VITE_URL,
      data: data,
      withCredentials: true,
    };

    const instance = axios.create({
      baseURL: import.meta.env.VITE_URL,
      withCredentials: true,
    });

    instance(config)
      .then((response) => {
        if (response.status === 200) {
          this.setState({ userID: response.data.id });
          this.setState({ userType: response.data.user_type });
          if (response.data.user_type == 1) {
            this.setState({ home: false });
            this.setState({ invoices: true });
          } else {
            this.setState({ home: true });
            this.setState({ invoices: false });
          }
          this.setState({ logged: true });
          document.cookie = "logged=true";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount(): void {
    
  }

  render(): React.ReactNode {
    return (
      <>
        <Menu />
        <div className="cotainerfluid">
          <div className="row">
            <div className="col-12" id="content-view">
                {this.state.invoices ? <Invoice /> : null}
            </div>
          </div>
        </div>
      </>
    );
  }
}
