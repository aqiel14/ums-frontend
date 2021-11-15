import React, { useState, useEffect } from "react";
import * as productActions from "../../actions/product.action";
import { server } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Table from "../Table";
export default (props) => {
  const productReducer = useSelector(({ productReducer }) => productReducer);
  const data = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push("/login");
    }
    dispatch(productActions.Index());
  }, []);

  function confirmDelete(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(productActions.Remove(id));
        swal("Poof! Your Product data has been deleted!", {
          icon: "success",
        });
      }
    });
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Product Picture",
        accessor: "image",
        Cell: ({ cell: { value } }) => (
          <img
            class="img-fluid img-rounded"
            width={200}
            src={process.env.REACT_APP_PRODUCT_IMAGE_PATH + "/" + value}
          />
        ),
      },
      {
        Header: "Product Name",
        accessor: "name",
        id: "alias", // accessor is the "key" in the data
      },
      {
        Header: "Supplier Name",
        accessor: "suppliername",
      },
      {
        Header: "Stock",
        accessor: "stock",
      },
      {
        Header: "Price",
        accessor: (data) => {
          return "Rp. " + data.price;
        },
      },

      {
        Header: "Created Date",
        accessor: "created",
        Cell: ({ cell: { value } }) => {
          let sliced = value.slice(0, -14);
          return sliced;
        },
      },
      {
        Header: "Action",
        accessor: "_id",
        Cell: ({ cell: { value } }) => {
          // alert(id)
          return (
            <>
              <Link
                to={"/product/update/" + value}
                type="button"
                class="btn btn-primary"
                style={{ "margin-right": "5px" }}
                onClick={() => dispatch(productActions.clearState())}
              >
                Edit
              </Link>
              <Link
                type="button"
                class="btn btn-danger"
                onClick={() => confirmDelete(value)}
              >
                Delete
              </Link>
            </>
          );
        },
      },
    ],
    []
  );

  const Holdon = (columns) => {
    if (productReducer.result) {
      return <Table columns={columns} data={productReducer.result} />;
    } else {
      return <h1>LOADING....</h1>;
    }
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Product Data</h1>
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="card-tools">
                    <div className="input-group input-group-sm">
                      <Link to="/product/create">
                        <button type="submit" className="btn btn-default">
                          <i className="fas fa-plus" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card card-body">{Holdon(columns, data)}</div>
              </div>
              {/* /.card */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
