import React from "react";
import axios, { AxiosHeaders } from "axios";
import qs from "qs";

const instance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_URL
}); 

interface IProps {
  userType?: any
  userID?: any
}

interface IState {
  url?: string
  data?: any
  paymentStatus?: any
  paymentMethod?: any
}

export default class Home extends React.Component<IProps, IState>{

  constructor(props: IProps) {
    super(props)
    this.state = {
      url: import.meta.env.VITE_URL,
      data: [],
      paymentStatus: "",
      paymentMethod: ""
    }
    

  }

  componentDidMount(): void {
    this.getUserInfo()

  }

  getUserInfo() {

    var config = {
      method: 'get',
      url: import.meta.env.VITE_URL + "/api/getuserinvoice/" + this.props.userID,
    };
   
    instance(config).then((response) => {
      this.setState({ data: response.data })
    })
  }

  user = () => {
    const listUsersDiv: JSX.Element[] = []


    this.state.data.forEach((user: any, i: number) => {


      listUsersDiv.push(
        <div key={i}>
          <h3>Hello there! {user.name}</h3>
          <p>In this platform you will be able to create your invoice for your sponsorship</p>
          <hr />
          <h5>Your information:</h5>
          <p><b>Company:</b> {user.company_name} | <b>Email:</b> {user.email} | <b>Contract:</b> <a className="text-dark" href={this.state.url + "/" + user.contract_file} target="_blank" rel="noopener noreferrer">See contract</a></p>
          <br />
          <h5>Sponsorship: </h5>
          <p><b>Location:</b> {user.location} | <b>Category:</b> {user.category}</p>
          <hr />

          {!user.invoice_number ? (<>


            <h4 className="text-primary">You have not created your invoice yet</h4>
            <p>
              <b>To create your invoice, please follow these steps:</b>

              <br />

              -Go to the invoices section and click on the button (Create invoice). <br />
              -Fill in all the fields and click Generate invoice. <br /><br />

              Your invoice will be downloaded automatically. <br /><br />

              If you have any questions do not hesitate to contact us by email: <a className="text-black" href="mailto:support@partnersummitforsme.com">support@partnersummitforsme.com</a> <br /></p></>
          ) : <>
            <h4 className="text-success"><b>Your invoice number: {user.invoice_number}</b> </h4>

            {user.payment_status ? <p>Payment method: {user.payment_method}</p> : <> <p><b>Have you already paid your sponsorship?</b> Please, select your payment method: </p>
              <select onChange={(e) => {

                if (e.target.value) {
                  this.setState({ paymentMethod: e.target.value })
                  this.setState({ paymentStatus: 1 })
                } else {
                  this.setState({ paymentMethod: "" })
                  this.setState({ paymentStatus: "" })
                }
              }} className="form-select" aria-label="Default select example">
                <option value="">Select a option</option>
                <option value="Bank transfer">Bank transfer</option>
                <option value="Bank transfer">PayPal</option>
              </select>

              <br />

              {this.state.paymentStatus == 1 ? <button onClick={(e) => {

                e.preventDefault()

                let data = qs.stringify({
                  "payment_status": this.state.paymentStatus,
                  "payment_method": this.state.paymentMethod,

                })

                instance.put(this.state.url + "/api/putpaymentsatus/" + this.props.userID, data)
                  .then((response) => {
                    if (response.status === 200) {
                      alert("Invoice " + response.data.invoice_number + " Mark as payed")
                      this.getUserInfo()

                    }
                  })
                  .catch(function (error) {
                    Object.keys(error.response.data).forEach((key: any) => {
                      alert(error.response.data[key])
                    })
                  })

              }} type="submit" className="btn btn-success" data-bs-dismiss="offcanvas">Mark as paid</button> : null}
            </>}

            <hr />
            <h5>Remember:</h5>
            <p>You can download or edit your invoice by pressing the button (Edit invoice) on the Invoices area.</p>
            <br />

            <p>    If you have any questions do not hesitate to contact us by email: <a className="text-black" href="mailto:support@partnersummitforsme.com">support@partnersummitforsme.com</a></p>
          </>}





        </div>
      )
    })

    return <>{listUsersDiv}</>
  }



  render(): React.ReactNode {
    return (
      <>
        <div className="section">
          <div id="home">
            <div className="container">
              <div className="row">

                <this.user />

              </div>
            </div>

          </div>
        </div>
      </>
    )
  }


}