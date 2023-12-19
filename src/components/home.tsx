import React from "react";
import Step1 from '../assets/select-edit-button.jpg'
import Step2 from '../assets/fill-tax-information.jpg'
import Step3 from '../assets/download-your-invoice.jpg'
import Step4 from '../assets/proof-payment.jpg'
import Step5 from '../assets/booth-information.jpg'


export default class Home extends React.Component {

  render(): React.ReactNode {
    return (

      <div className="row">

        <div className="col-12 mb-4">
          <p className="m-0"> <span className="bg-dark badge rounded-pill" style={{ fontSize: '1rem' }}>Step 1</span> Go to <a href="/invoices" className="text-dark"><b>Invoices</b></a> and press the edit button</p>

          <img className="w-100 rounded mt-2" src={Step1} alt="Step 1" />

        </div>

        <div className="col-12 mb-4">
          <p className="m-0"> <span className="bg-dark badge rounded-pill" style={{ fontSize: '1rem' }}>Step 2</span> Fill in your company's tax information and press Submit</p>

          <img className="w-100 rounded mt-2" src={Step2} alt="Step 2" />

        </div>

        <div className="col-12 mb-4">
          <p className="m-0"> <span className="bg-dark badge rounded-pill" style={{ fontSize: '1rem' }}>Step 3</span> Download your invoice</p>

          <img className="w-100 rounded mt-2" src={Step3} alt="Step 3" />

        </div>

        <div className="col-12 mb-4">
          <p className="m-0"> <span className="bg-dark badge rounded-pill" style={{ fontSize: '1rem' }}>Step 4</span> Once the payment has been made, please upload the proof of payment and press submit</p>

          <img className="w-100 rounded mt-2" src={Step4} alt="Step 3" />

        </div>

        <div className="col-12 mb-4">
          <p className="m-0"> <span className="bg-dark badge rounded-pill" style={{ fontSize: '1rem' }}>Step 5</span> Once the payment has been verified and validated, you will be able to fill in the booth information form, go to <a href="/boothinformation" className="text-dark"><b>Booth information</b></a> and click in the edit button</p>
          
          <br />
          
          <p>In the booth information form you will be able to send and update all the information required for the booth set up, you will also be able to give us additional information that will be used in the event application.</p>
          
          <img className="w-100 rounded mt-2" src={Step5} alt="Step 3" />

        </div>

      </div>

    )
  }
}