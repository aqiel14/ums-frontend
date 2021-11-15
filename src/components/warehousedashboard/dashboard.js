import React, { useEffect, useState } from "react";
import { server } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { Chart, Line, Pie } from "react-chartjs-2";
import * as InventorystatActions from "../../actions/inventorystat.action";
import "chartjs-plugin-datalabels";
import moment from "moment";
import swal from "sweetalert";
import loading from "../../assets/image/loading.gif";
import Table from "../Table";
import _ from "lodash";
require("moment-recur");

export default (props) => {
  const [stockData, setStockData] = useState([]);
  const stockstatReducer = useSelector(
    ({ stockstatReducer }) => stockstatReducer
  );
  const statReducer = useSelector(({ statReducer }) => statReducer);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const today = moment();
  const initialstock = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push("/login");
    }
    dispatch(InventorystatActions.getCurrentInventoryStat());
  }, []);

  useEffect(() => {
    if (statReducer.result) {
      let name = statReducer.result.flat().map((item) => {
        return item.name;
      });
      let stock = statReducer.result.flat().map((item) => {
        return item.stock;
      });
      setStockData({ name: name, stock: stock });
      // console.log(result);
    }
  }, [statReducer.result]);

  //   useEffect(() => {
  //     if (stockstatReducer.result) {
  //       chart();
  //       console.log(monthlyData());
  //       insertData(monthlyData());
  //       console.log(initialstock);
  //     }
  //   }, [stockstatReducer.result]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "name",
        id: "alias", // accessor is the "key" in the data
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
    ],
    []
  );
  const Holdon = (columns) => {
    if (statReducer.result) {
      return <Table columns={columns} data={statReducer.result} />;
    } else {
      return <img class="img-fluid img-rounded" src={loading} width="30%" />;
    }
  };

  const doughnut_data = {
    labels: stockData.name,
    datasets: [
      {
        label: "# of Stock",
        data: stockData.stock,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  function convertToRupiah(angka) {
    var rupiah = "";
    var angkarev = angka.toString().split("").reverse().join("");
    for (var i = 0; i < angkarev.length; i++)
      if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
    return (
      "Rp. " +
      rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("")
    );
  }

  function hitungStockHarian() {
    let day = today.format("d");
    if (statReducer.result) {
      let dailyStock = 0;
      statReducer.result.map((data) => {
        let thatdaysorder = moment(data.created).format("d");

        if (thatdaysorder == day) {
          dailyStock += data.stock;
        }
      });
      return dailyStock;
    }
  }

  function hitungStockMingguan() {
    let day = today.format("d");
    var seven_days_ago = moment().subtract(7, "days");
    if (statReducer.result) {
      let weeklyStock = 0;
      statReducer.result.map((data) => {
        let bool = moment(data.created).isAfter(seven_days_ago);
        if (bool == true) {
          weeklyStock += data.stock;
        }
      });
      return weeklyStock;
    }
  }

  function hitungStockBulanan() {
    var thirty_days_ago = moment().subtract(30, "days");
    if (statReducer.result) {
      let monthlyStock = 0;
      statReducer.result.map((data) => {
        let bool = moment(data.created).isAfter(thirty_days_ago);
        if (bool == true) {
          monthlyStock += data.stock;
        }
      });
      return monthlyStock;
    }
  }

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Dashboard v1</li>
              </ol>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* Small boxes (Stat box) */}
          <div className="row">
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{hitungStockHarian()}</h3>
                  <p>Today's Stock</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                <a href="#" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{hitungStockMingguan()}</h3>
                  <p>Last 7 days Stock</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <a href="#" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{hitungStockBulanan()}</h3>
                  <p>Last 30 days Stock</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph" />
                </div>
                <a href="#" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>

            {/* ./col */}
          </div>
          {/* /.row */}
          {/* Main row */}
          <div className="row">
            {/* Left col */}
            <section className="col-lg-7 connectedSortable">
              {/* Custom tabs (Charts with tabs)*/}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-chart-pie mr-1" />
                    Current Stock Inventory
                  </h3>
                  {statReducer.result && <Pie data={doughnut_data} />}
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <div className="tab-content p-0">
                    {/* Morris chart - Sales */}
                    <div
                      className="chart tab-pane active"
                      id="revenue-chart"
                      style={{ position: "relative", height: 300 }}
                    >
                      <canvas
                        id="revenue-chart-canvas"
                        height={300}
                        style={{ height: 300 }}
                      />
                    </div>
                    <div
                      className="chart tab-pane"
                      id="sales-chart"
                      style={{ position: "relative", height: 300 }}
                    >
                      <canvas
                        id="sales-chart-canvas"
                        height={300}
                        style={{ height: 300 }}
                      />
                    </div>
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}

              {/* <div className='card'>
                <div className='card-header'>
                  <h3 className='card-title'>
                    <i className='ion ion-clipboard mr-1' />
                    Orders
                  </h3>
                  <div className='card-tools'>
                    <ul className='pagination pagination-sm'>
                      <li className='page-item'>
                        <a href='#' className='page-link'>
                          «
                        </a>
                      </li>
                      <li className='page-item'>
                        <a href='#' className='page-link'>
                          1
                        </a>
                      </li>
                      <li className='page-item'>
                        <a href='#' className='page-link'>
                          2
                        </a>
                      </li>
                      <li className='page-item'>
                        <a href='#' className='page-link'>
                          3
                        </a>
                      </li>
                      <li className='page-item'>
                        <a href='#' className='page-link'>
                          »
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
            
                <div className='card-body'>{Holdon(columns, data)}</div>
           
                <div className='card-footer clearfix'>
                  <button
                    type='button'
                    className='btn btn-primary float-right'
                    href='/'
                  >
                    <i className='fas fa-plus' /> Cashier Page
                  </button>
                </div>
              </div> */}
              {/* /.card */}
            </section>
            {/* /.Left col */}
            {/* right col (We are only adding the ID to make the widgets sortable)*/}
            <section className="col-lg-5 connectedSortable">
              {/* Map card */}
              <div className="card border-info mb-3">
                <div className="card-header border-0">
                  <h3 className="card-title">
                    <i className="ion ion-clipboard mr-1" />
                    Warehouse
                  </h3>
                  {/* card tools */}
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      data-card-widget="collapse"
                      title="Collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                  {/* /.card-tools */}
                </div>
                <div className="card-body">{Holdon(columns, data)}</div>
              </div>
              {/* /.card */}

              {/* /.card */}
              {/* /.card */}
            </section>
            {/* right col */}
          </div>
          {/* /.row (main row) */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};
