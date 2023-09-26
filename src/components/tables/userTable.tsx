import React from "react";
import RequestsRoutes from "../../http/requests";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import { Delete } from "@mui/icons-material";

interface IProps {
  userFormState: any
}

interface IState {
  usersRows: JSX.Element[]
  route: string | null
  firstPageURL: string | null
  prevPageURL: string | null
  nextPageURL: string | null
  search: string
}

export default class UserTable extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      usersRows: [],
      route: "users",
      firstPageURL: null,
      prevPageURL: null,
      nextPageURL: null,
      search: ''
    };
  }

  getUsers(): void {
    new RequestsRoutes().get(this.state.route).then((response) => {

      let usersRow: JSX.Element[] = [];
      response.data.data.forEach((data: any, i: any) => {

        usersRow.push(
          <tr key={i} className="p-2 align-middle">
            <th scope="col">
              <h6 className="m-0">
                <b>{data.contact}</b>
              </h6>
            </th>
     
            <th scope="col">
              <p className="m-0"><b>{data.name}</b></p>
            </th>
            <th scope="col">
              <p className="m-0">{data.user_type == 1 ? "Admin" : "User"}</p>
            </th>
            <th scope="col">
              <p className="m-0">{data.email}</p>
            </th>
            <th scope="col">
              <div className="d-flex">
             
                <button type="button" className="btn btn-dark btn-sm">
                  <EditIcon />
                </button>
                <button type="button" className="btn btn-dark btn-sm">
                  <Delete />
                </button>
              </div>
            </th>
          </tr>
        );
        
      });

      this.setState({ usersRows: usersRow });


      response.data.first_page_url != null
        ? this.setState({
            firstPageURL: response.data.first_page_url.split("api/")[1],
          })
        : this.setState({ firstPageURL: null });
      response.data.prev_page_url != null
        ? this.setState({
            prevPageURL: response.data.prev_page_url.split("api/")[1],
          })
        : this.setState({ prevPageURL: null });
      response.data.next_page_url != null
        ? this.setState({
            nextPageURL: response.data.next_page_url.split("api/")[1],
          })
        : this.setState({ nextPageURL: null });

    });
  }

  componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: any
  ): void {
    prevState.route != this.state.route ? this.getUsers() : null;
  }

  componentDidMount(): void {
    this.getUsers();
  }

  render(): React.ReactNode {
    return (
      <>
        <div className="d-flex search mt-4 mb-4">

          <h3 className="m-0">Users</h3>

          <button onClick={this.props.userFormState}
              className="btn btn-outline-secondary btn-dark text-light ms-4"
              type="button">
              Create user
            </button>
            

          <div className="input-group w-50 ms-4">
            <input onChange={(e)=>{
              this.setState({search: e.target.value})
            }}
            onKeyDown={(e)=>{
              (e.code == "Enter" || e.code == "NumpadEnter") ? (this.state.search == '' ? this.setState({route: 'users'}) : this.setState({route:  "users/search/" + this.state.search})) : null
            }}
              type="text"
              className="form-control"
              placeholder="Find by User Number or Company Name"
            />
            <button
              className="btn btn-outline-secondary btn-dark text-light "
              type="button"
      
              onClick={()=>{
                
                this.state.search ? this.setState({route:  "users/search/" + this.state.search}) : this.setState({route: 'users'})
              }}
            >
              Search
            </button>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Company Name</th>
              <th scope="col">Name</th>
              <th scope="col">User type</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{this.state.usersRows}</tbody>
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
      </>
    );
  }
}
