import React, { useState, useEffect } from "react";
import * as materialActions from "../../actions/material.action";
import { server } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Table from "../Table";
import "./material.css";
import loading from "../../assets/image/loading.gif";
import _ from "lodash";
export default (props) => {
  const materialReducer = useSelector(({ materialReducer }) => materialReducer);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push("/login");
    }
    dispatch(materialActions.Index());
  }, []);
  useEffect(() => {
    setData(materialReducer.result);
  }, [materialReducer.result]);

  function confirmDelete(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(materialActions.Remove(id));
        swal("Poof! Your Material data has been deleted!", {
          icon: "success",
        });
      }
    });
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Material name",
        id: "alias", // accessor is the "key" in the data
        accessor: (data) => {
          let output = [];
          _.map(data.bahan, (data) => {
            output.push(data.materialname);
          });
          return output.join(", ");
        },
      },
      {
        Header: "Supplier Name",
        accessor: "suppliername",
      },
      {
        Header: "Created Date",
        accessor: "tanggal",
        Cell: ({ cell: { value } }) => {
          let sliced = value.slice(0, -14);
          return sliced;
        },
      },
      {
        Header: "Price",
        accessor: (data) => {
          return "Rp. " + data.price;
        },
      },
      {
        Header: "Quantity",
        accessor: (data) => {
          return data.qty + " " + data.unit;
        },
      },
      {
        Header: "Total Price",
        accessor: (data) => {
          let total = data.price * data.qty;
          return "Rp. " + total;
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
                to={"/material/update/" + value}
                type="button"
                class="btn btn-primary"
                style={{ "margin-right": "5px" }}
                onClick={() => dispatch(materialActions.clearState())}
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
    if (materialReducer.result) {
      return <Table columns={columns} data={materialReducer.result} />;
    } else {
      return <img class="img-fluid img-rounded" src={loading} />;
    }
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark"> Material Data</h1>
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
                      <Link to="/material/create">
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
