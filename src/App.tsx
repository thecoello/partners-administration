import React from "react";
import CreateUser from "./components/createUser";
import FileUpload from "./components/fileUpload";
import Invoice from "./components/invoice";
import Menu from "./components/menu"

export default class App extends React.Component {

  constructor(props: any) {
    super(props)
  }

  render(): React.ReactNode {
    return (

      <div className="cotainerfluid" id="main">
        <div className="row">
          <div className="col-2">
            <Menu />
          </div>
          <div className="col-10" id="content-view">
            <div className="container">

{/*               <CreateUser /> */}

              <Invoice />
            </div>

          </div>
        </div>
      </div>

    )
  }

}