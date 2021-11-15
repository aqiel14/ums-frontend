import React, { useEffect, useState } from 'react';
import { server } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { Chart, Line } from 'react-chartjs-2';
import * as StatActions from '../../actions/stat.action';
import 'chartjs-plugin-datalabels';
import moment from 'moment';
import swal from 'sweetalert';
import loading from '../../assets/image/loading.gif';
import Table from '../Table';
import _ from 'lodash';
import { eachMonthOfInterval } from 'date-fns';
require('moment-recur');

export default (props) => {
  const [profitData, setProfitData] = useState([]);
  const statReducer = useSelector(({ statReducer }) => statReducer);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const today = moment();
  const initialprofit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push('/login');
    }
    dispatch(StatActions.getCurrentOrderStat());
  }, []);

  useEffect(() => {
    if (statReducer.result) {
      chart();
      // console.log(monthlyData());
      insertData(monthlyData());
      console.log(initialprofit);
    }
  }, [statReducer.result]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Order ID',
        accessor: 'order_id', // accessor is the "key" in the data
      },
      {
        Header: 'Created Date',
        accessor: 'created',
        id: 'alias',
        Cell: ({ cell: { value } }) => {
          let sliced = value.slice(0, -14);
          return sliced;
        },
      },

      {
        Header: 'Nama Produk',
        id: 'name',
        accessor: 'order_list',
        Cell: ({ value }) => {
          const name = value.map((x) => x.name).join('\n');
          return <pre>{name}</pre>;
        },
      },
      {
        Header: 'Kuantitas',
        id: 'qty',
        accessor: 'order_list',
        style: { overflow: 'visible' },
        Cell: ({ value }) => {
          const qty = value.map((x) => x.qty).join('\n');
          return <pre>{qty}</pre>;
        },
      },
      {
        Header: 'Harga',
        id: 'price',
        accessor: 'order_list',
        Cell: ({ value }) => {
          const price = value.map((x) => x.price).join('\n');
          return <pre>{price}</pre>;
        },
      },
      {
        Header: 'Total',
        accessor: (data) => {
          return <pre>{data.total}</pre>;
        },
      },
    ],
    []
  );
  const Holdon = (columns) => {
    if (statReducer.result) {
      return <Table columns={columns} data={statReducer.result} />;
    } else {
      return <img class='img-fluid img-rounded' src={loading} width='30%' />;
    }
  };

  const chart = () => {
    setProfitData({
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
          label: '# of profit made',
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
          data: initialprofit,
          redraw: true,
        },
      ],
    });
  };

  function todaysOrders() {
    let day = today.format('L');
    if (statReducer.result) {
      let count = 0;
      statReducer.result.map((data) => {
        let thatdaysorder = moment(data.created).format('L');

        if (thatdaysorder === day) {
          count++;
        }
      });
      return count;
    }
  }

  function dailyProfit() {
    let day = today.format('L');
    if (statReducer.result) {
      let dailyprofit = 0;
      statReducer.result.map((data) => {
        let thatdaysorder = moment(data.created).format('L');

        if (thatdaysorder === day) {
          dailyprofit += data.order_profit;
        }
      });
      return dailyprofit;
    }
  }

  function weeklyProfit() {
    let day = today.format('d');
    var seven_days_ago = moment().subtract(7, 'days');
    if (statReducer.result) {
      let weeklyprofit = 0;
      statReducer.result.map((data) => {
        let bool = moment(data.created).isAfter(seven_days_ago);

        if (bool == true) {
          weeklyprofit += data.order_profit;
        }
      });
      return weeklyprofit;
    }
  }

  function monthlyProfit() {
    var thirty_days_ago = moment().subtract(30, 'days');
    if (statReducer.result) {
      let monthlyprofit = 0;
      statReducer.result.map((data) => {
        let bool = moment(data.created).isAfter(thirty_days_ago);
        if (bool == true) {
          monthlyprofit += data.order_profit;
        }
      });
      return monthlyprofit;
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
    if (statReducer.result) {
      let months = [
        statReducer.result.map((data) => {
          let createdmonth = moment(data.created).format('M');
          return [createdmonth, data.order_profit];
        }),
      ];
      return months;
    }
  }

  function insertData(monthlydata) {
    if (statReducer.result) {
      monthlydata[0].map((data) => {
        let monthnumber = data[0];
        let profit = data[1];

        switch (monthnumber) {
          case '1':
            return (initialprofit[0] += profit);
          case '2':
            return (initialprofit[1] += profit);
          case '3':
            return (initialprofit[2] += profit);
          case '4':
            return (initialprofit[3] += profit);
          case '5':
            return (initialprofit[4] += profit);
          case '6':
            return (initialprofit[5] += profit);
          case '7':
            return (initialprofit[6] += profit);
          case '8':
            return (initialprofit[7] += profit);
          case '9':
            return (initialprofit[8] += profit);
          case '10':
            return (initialprofit[9] += profit);
          case '11':
            return (initialprofit[10] += profit);
          case '12':
            return (initialprofit[11] += profit);
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
            <div className='col-lg-3 col-6'>
              {/* small box */}
              <div className='small-box bg-info'>
                <div className='inner'>
                  <h3>#{todaysOrders()}</h3>
                  <p>Todays orders</p>
                </div>
                <div className='icon'>
                  <i className='ion ion-bag' />
                </div>
                <a href='#' className='small-box-footer'>
                  More info <i className='fas fa-arrow-circle-right' />
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className='col-lg-3 col-6'>
              {/* small box */}
              <div className='small-box bg-success'>
                <div className='inner'>
                  <h3>{convertToRupiah(Number(dailyProfit()))}</h3>
                  <p>Today's Profit</p>
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
                  <h3>{convertToRupiah(Number(weeklyProfit()))}</h3>
                  <p>Last 7 days Profit</p>
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
                  <h3>{convertToRupiah(Number(monthlyProfit()))}</h3>
                  <p>Last 30 days Profit</p>
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
                    Monthly Profits in Year {today.year()}
                  </h3>

                  <Line data={profitData} />
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
                    Orders
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
