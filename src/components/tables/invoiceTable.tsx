import React from "react";
import RequestsRoutes from "../../http/requests";

export default class InvoiceTable extends React.Component{

  getInvoices(){
    console.log()

    new RequestsRoutes().get('/api/invoices').then(value=>{
      console.log(value)
    })
  }

  componentDidMount(): void {
    this.getInvoices()
  }

  render(): React.ReactNode {
    
    return(
      <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colSpan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
    )


  }

}