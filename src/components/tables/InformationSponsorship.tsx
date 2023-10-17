import React from "react";
import RequestsRoutes from "../../http/requests";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import InvoicePDF from "../invoiceComponents/invoicePDF";

interface IProps {
}

interface IState {

}

export default class InvoiceTable extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
    };
  }



  render(): React.ReactNode {
    return (
      <>
        <div className="d-flex search mt-4 mb-4 justify-content-between">

          <div className="d-flex"><h3 className="m-0">sponsorship Information</h3>

            <a href="/invoices/create"
              className="btn btn-outline-secondary btn-dark text-light ms-4"
              type="button">
              Create invoice
            </a></div>


          <div className="input-group w-50 ms-4">
            <input onChange={(e) => {
              this.setState({ search: e.target.value })
            }}
              onKeyDown={(e) => {
                (e.code == "Enter" || e.code == "NumpadEnter") ? (this.state.search == '' ? this.setState({ route: 'invoices' }) : this.setState({ route: "invoices/search/" + this.state.search })) : null
              }}
              type="text"
              className="form-control"
              placeholder="Find by Invoice Number or Company Name"
            />
            <button
              className="btn btn-outline-secondary btn-dark text-light "
              type="button"

              onClick={() => {

                this.state.search ? this.setState({ route: "invoices/search/" + this.state.search }) : this.setState({ route: 'invoices' })
              }}
            >
              Search
            </button>
          </div>
        </div>

        <div className="rounded-4 ">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Company Name</th>
                <th scope="col">Invoice #</th>
                <th scope="col">Pack</th>
                <th scope="col">Email</th>
                <th scope="col">Total</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>{this.state.invoicesRows}</tbody>
          </table>

          <div>
            <ul className="pagination">
              {this.state.firstPageURL != null ? (
                <li className="page-item ">
                  <a
                    className="page-link bg-dark text-light"
                    onClick={() => {
                      this.setState({ route: this.state.firstPageURL });
                    }}
                  >
                    First page
                  </a>
                </li>
              ) : null}
              {this.state.prevPageURL != null ? (
                <li className="page-item">
                  <a
                    className="page-link text-dark"
                    onClick={() => {
                      this.setState({ route: this.state.prevPageURL });
                    }}
                  >
                    {" "}
                    Preview page{" "}
                  </a>
                </li>
              ) : null}
              {this.state.nextPageURL != null ? (
                <li className="page-item">
                  <a
                    className="page-link text-dark"
                    onClick={() => {
                      this.setState({ route: this.state.nextPageURL });
                    }}
                  >
                    {" "}
                    Next page{" "}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

      </>
    );
  }
}
