import react from "react";
import "./Main.css";
class Main extends react.Component {
  state = {
    title: "",
    posts: [],
    edit: false,
    edittitle:""
  };
  ontitle = (event) => {
    this.setState({ title: event.target.value });
  };
  onedit = (event) => {
    this.setState({ edittitle: event.target.value });
  };
  componentDidMount() {
    this.fetchdata();
  }
  fetchdata = () => {
    let url = "https://jsonplaceholder.typicode.com/posts";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
      },
    })
      .then((data) => data.json())
      .then((aban) => {
        this.setState({ posts: aban });
      });
  };
  handleopenedit = () => {
    this.setState({ edit: true });
  };
  handlesave = () =>{
    // this.setState({ edit: false });

  }
  handledelete = () => {};
  render() {
    const { title, posts, edit,edittitle } = this.state;
    let editbox = "";
    if (edit) {
      editbox = (
        <div>
          <input
            className="form-control"
            value={edittitle}
            onChange={this.onedit}
          />
          <button className="btn btn-info" onClick={this.handlesave}>Save</button>
          <hr />
        </div>
      );
    }
    return (
      <div>
        <section>
          <input
            className="form-control"
            value={title}
            onChange={this.ontitle}
          />
          <button className="btn btn-info">Add</button>
        </section>
        <hr />
        {editbox}
        <table className="table-responsive">
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <th>{post.id}</th>
                <th>{post.title}</th>
                <th>
                  <button className="btn btn-info" onClick={()=>this.handleopenedit}>
                    Edit
                  </button>
                </th>
                <th>
                  <button
                    className="btn btn-danger"
                    onClick={this.handledelete}
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Main;
