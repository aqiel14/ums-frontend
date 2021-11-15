import React, { useEffect, useState } from 'react';
import { server } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { Chart, Line } from 'react-chartjs-2';
import * as CoststatActions from '../../actions/coststat.action';
import 'chartjs-plugin-datalabels';
import moment from 'moment';
import swal from 'sweetalert';
import loading from '../../assets/image/loading.gif';
import Table from '../Table';
import _ from 'lodash';
import { eachMonthOfInterval } from 'date-fns';
require('moment-recur');

export default (props) => {
  const [costData, setCostData] = useState([]);
  const coststatReducer = useSelector(({ coststatReducer }) => coststatReducer);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const today = moment();
  const initialcost = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push('/login');
    }
    dispatch(CoststatActions.getCurrentListproCoststat());
  }, []);

  useEffect(() => {
    if (coststatReducer.result) {
      chart();
      console.log(monthlyData());
      insertData(monthlyData());
      console.log(initialcost);
    }
  }, [coststatReducer.result]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Product ID',
        // id:'hidden_productname',
        accessor: (data) => {
          let output = [];
          _.map(data.product, (data) => {
            output.push(data);
            console.log(data);
          });
          return output.join(', ');
        },
      },
      {
        Header: 'Production Date',
        id: 'alias',
        accessor: 'tanggal',
        Cell: ({ cell: { value } }) => {
          let sliced = value.slice(0, -14);
          return sliced;
        },
      },

      {
        Header: 'Quantity',
        accessor: (data) => {
          return data.quantity + ' ' + data.order;
        },
      },
      {
        Header: 'Due Date',
        accessor: 'duedate',
        Cell: ({ cell: { value } }) => {
          let sliced = value.slice(0, -14);
          return sliced;
        },
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Cost',
        accessor: (data) => {
          return 'Rp. ' + data.cost;
        },
      },
      {
        Header: 'Status',
        accessor: 'status', // accessor is the "key" in the data
      },
    ],
    []
  );
  const Holdon = (columns) => {
    if (coststatReducer.result) {
      return <Table columns={columns} data={coststatReducer.result} />;
    } else {
      return <img class='img-fluid img-rounded' src={loading} width='30%' />;
    }
  };

  const chart = () => {
    setCostData({
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      datasets: [
        {
          label: '# of production cost',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          borderWidth: 3,
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: initialcost,
          redraw: true,
        },
      ],
    });
  };

  function todaysListpros() {
    let day = today.format('d');
    if (coststatReducer.result) {
      let count = 0;
      coststatReducer.result.map((data) => {
        let thatdayslistpro = moment(data.tanggal).format('d');

        if (thatdayslistpro == day) {
          count++;
        }
      });
      return count;
    }
  }

  function dailyCost() {
    let day = today.format('d');
    if (coststatReducer.result) {
      let dailycost = 0;
      coststatReducer.result.map((data) => {
        let thatdayslistpro = moment(data.tanggal).format('d');

        if (thatdayslistpro == day) {
          dailycost += data.cost;
        }
      });
      return dailycost;
    }
  }

  function weeklyCost() {
    let day = today;
    var seven_days_ago = moment().subtract(7, 'days');
    if (coststatReducer.result) {
      let weeklycost = 0;
      coststatReducer.result.map((data) => {
        let bool = moment(data.tanggal).isBetween(seven_days_ago, day);
        if (bool == true) {
          weeklycost += data.cost;
        }
      });
      return weeklycost;
    }
  }

  function monthlyCost() {
    let day = today;
    var thirty_days_ago = moment().subtract(30, 'days');
    if (coststatReducer.result) {
      let monthlycost = 0;
      coststatReducer.result.map((data) => {
        let bool = moment(data.tanggal).isBetween(thirty_days_ago, day);
        if (bool == true) {
          monthlycost += data.cost;
        }
      });
      return monthlycost;
    }
  }

  //AMBIL 12 BULAN TERAKHIR
  function monthly() {
    const months = [];
    const NUM_OF_MONTHS = 12; // get last 7 dates.

    for (let i = 0; i < NUM_OF_MONTHS; i++) {
      let month = moment();
      month.subtract(i, 'months').format('DD MM YYYY');
      var monthname = moment(month).format('MMMM');
      months.push(monthname);
    }
    console.log(months);
    return months.reverse();
  }

  //AMBIL BULAN, PROFIT DARI TIAP BULAN

  function monthlyData() {
    if (coststatReducer.result) {
      let months = [
        coststatReducer.result.map((data) => {
          let createdmonth = moment(data.tanggal).format('M');
          return [createdmonth, data.cost];
        }),
      ];
      return months;
    }
  }

  function insertData(monthlydata) {
    if (coststatReducer.result) {
      monthlydata[0].map((data) => {
        let monthnumber = data[0];
        let cost = data[1];

        switch (monthnumber) {
          case '1':
            return (initialcost[0] += cost);
          case '2':
            return (initialcost[1] += cost);
          case '3':
            return (initialcost[2] += cost);
          case '4':
            return (initialcost[3] += cost);
          case '5':
            return (initialcost[4] += cost);
          case '6':
            return (initialcost[5] += cost);
          case '7':
            return (initialcost[5] += cost);
          case '8':
            return (initialcost[7] += cost);
          case '9':
            return (initialcost[8] += cost);
          case '10':
            return (initialcost[9] += cost);
          case '11':
            return (initialcost[10] += cost);
          case '12':
            return (initialcost[11] += cost);
          default:
            console.log('gaada hari');
        }

        // console.log('Profit order ini: ' + initialprofit);
      });
    }
  }

  function convertToRupiah(angka) {
    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++)
      if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
    return (
      'Rp. ' +
      rupiah
        .split('', rupiah.length - 1)
        .reverse()
        .join('')
    );
  }

  return (
    <div className='content-wrapper'>
      {/* Content Header (Page header) */}
      <div className='content-header'>
        <div className='container-fluid'>
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <h1 className='m-0'>Dashboard</h1>
            </div>
            {/* /.col */}
            <div className='col-sm-6'>
              <ol className='breadcrumb float-sm-right'>
                <li className='breadcrumb-item'>
                  <a href='#'>Home</a>
                </li>
                <li className='breadcrumb-item active'>Dashboard v1</li>
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
      <section className='content'>
        <div className='container-fluid'>
          {/* Small boxes (Stat box) */}
          <div className='row'>
            {/* ./col */}
            <div className='col-lg-3 col-6'>
              {/* small box */}
              <div className='small-box bg-success'>
                <div className='inner'>
                  <h3>{convertToRupiah(Number(dailyCost()))}</h3>
                  <p>Today's Cost</p>
                </div>
                <div className='icon'>
                  <i className='ion ion-stats-bars' />
                </div>
                <a href='#' className='small-box-footer'>
                  More info <i className='fas fa-arrow-circle-right' />
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className='col-lg-3 col-6'>
              {/* small box */}
              <div className='small-box bg-warning'>
                <div className='inner'>
                  <h3>{convertToRupiah(Number(weeklyCost()))}</h3>
                  <p>Last 7 days Cost</p>
                </div>
                <div className='icon'>
                  <i className='ion ion-person-add' />
                </div>
                <a href='#' className='small-box-footer'>
                  More info <i className='fas fa-arrow-circle-right' />
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className='col-lg-3 col-6'>
              {/* small box */}
              <div className='small-box bg-danger'>
                <div className='inner'>
                  <h3>{convertToRupiah(Number(monthlyCost()))}</h3>
                  <p>Last 30 days Cost</p>
                </div>
                <div className='icon'>
                  <i className='ion ion-pie-graph' />
                </div>
                <a href='#' className='small-box-footer'>
                  More info <i className='fas fa-arrow-circle-right' />
                </a>
              </div>
            </div>

            {/* ./col */}
          </div>
          {/* /.row */}
          {/* Main row */}
          <div className='row'>
            {/* Left col */}
            <section className='col-lg-7 connectedSortable'>
              {/* Custom tabs (Charts with tabs)*/}
              <div className='card'>
                <div className='card-header'>
                  <h3 className='card-title'>
                    <i className='fas fa-chart-pie mr-1' />
                    Monthly Cost in Year {today.year()}
                  </h3>

                  <Line data={costData} />
                </div>
                {/* /.card-header */}
                <div className='card-body'>
                  <div className='tab-content p-0'>
                    {/* Morris chart - Sales */}
                    <div
                      className='chart tab-pane active'
                      id='revenue-chart'
                      style={{ position: 'relative', height: 300 }}
                    >
                      <canvas
                        id='revenue-chart-canvas'
                        height={300}
                        style={{ height: 300 }}
                      />
                    </div>
                    <div
                      className='chart tab-pane'
                      id='sales-chart'
                      style={{ position: 'relative', height: 300 }}
                    >
                      <canvas
                        id='sales-chart-canvas'
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
            <section className='col-lg-5 connectedSortable'>
              {/* Map card */}
              <div className='card border-info mb-3'>
                <div className='card-header border-0'>
                  <h3 className='card-title'>
                    <i className='ion ion-clipboard mr-1' />
                    Production
                  </h3>
                  {/* card tools */}
                  <div className='card-tools'>
                    <button
                      type='button'
                      className='btn btn-primary btn-sm'
                      data-card-widget='collapse'
                      title='Collapse'
                    >
                      <i className='fas fa-minus' />
                    </button>
                  </div>
                  {/* /.card-tools */}
                </div>
                <div className='card-body'>{Holdon(columns, data)}</div>
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
