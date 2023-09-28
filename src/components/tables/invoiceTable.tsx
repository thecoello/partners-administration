import React from "react";
import RequestsRoutes from "../../http/requests";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import InvoicePDF from "../invoiceComponents/invoicePDF";

interface IProps {
  invoiceFormState: any
}

interface IState {
  invoicesRows: JSX.Element[]
  route: string | null
  firstPageURL: string | null
  prevPageURL: string | null
  nextPageURL: string | null
  search: string
}

export default class InvoiceTable extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      invoicesRows: [],
      route: "invoices",
      firstPageURL: null,
      prevPageURL: null,
      nextPageURL: null,
      search: ''
    };
  }

  getInvoices(): void {
    new RequestsRoutes().get(this.state.route).then((response) => {

      let invoicesRow: JSX.Element[] = [];

      response.data.invoices.data.forEach((data: any, i: any) => {

        invoicesRow.push(
          <tr key={i} className="p-2 align-middle">
            <th scope="col">
              <h6 className="m-0">
                <b>{data.company_name}</b>
              </h6>
              <p className="m-0" style={{ fontSize: '0.8rem' }}>{data.name}</p>
            </th>
            <th scope="col">
              <p className="m-0">{data.invoice_number}</p>

              {data.payment_status != null ? (
                <span className="badge rounded-pill text-bg-success">
                  Payed
                </span>
              ) : (
                <span className="badge rounded-pill text-bg-danger">
                  Unpayed
                </span>
              )}
            </th>
            <th scope="col">
              <p className="m-0"><b>{data.pack_name}</b></p>
              <p className="m-0" style={{ fontSize: '0.8rem' }}>{data.location_name}</p>
            </th>
            <th scope="col">
              <p className="m-0">{data.email}</p>
            </th>
            <th scope="col">
              <p className="m-0">{data.total}{response.data.eventinfo[0].symbol}</p>
            </th>
            <th scope="col">
              <div className="d-flex">
                <button
                  type="button"
                  className="btn btn-dark btn-sm"
                  onClick={() => {
                    new InvoicePDF(data).generateInvoice();
                  }}
                >
                  <DownloadIcon />
                </button>
                <button type="button" className="btn btn-dark btn-sm">
                  <EditIcon />
                </button>
              </div>
            </th>
          </tr>
        );

      });

      this.setState({ invoicesRows: invoicesRow });

      response.data.invoices.first_page_url != null
        ? this.setState({
          firstPageURL: response.data.invoices.first_page_url.split("api/")[1],
        })
        : this.setState({ firstPageURL: null });
      response.data.invoices.prev_page_url != null
        ? this.setState({
          prevPageURL: response.data.invoices.prev_page_url.split("api/")[1],
        })
        : this.setState({ prevPageURL: null });
      response.data.invoices.next_page_url != null
        ? this.setState({
          nextPageURL: response.data.invoices.next_page_url.split("api/")[1],
        })
        : this.setState({ nextPageURL: null });

    });
  }

  componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: any
  ): void {
    prevState.route != this.state.route ? this.getInvoices() : null;
  }

  componentDidMount(): void {
    this.getInvoices();
  }

  render(): React.ReactNode {
    return (
      <>
        <div className="d-flex search mt-4 mb-4 justify-content-between">

          <div className="d-flex"><h3 className="m-0">Invoices</h3>

            <button onClick={this.props.invoiceFormState}
              className="btn btn-outline-secondary btn-dark text-light ms-4"
              type="button">
              Create invoice
            </button></div>


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

        <div className="rounded-4 shadow-lg p-4">
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
