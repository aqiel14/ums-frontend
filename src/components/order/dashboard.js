import React, { useEffect, useState } from 'react';
import { server } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { HorizontalBar, Bar, Doughnut, Line } from 'react-chartjs-2';
import * as StatActions from '../../actions/stat.action';
import 'chartjs-plugin-datalabels';
import moment from 'moment';
import _ from 'lodash';

export default (props) => {
  const [inventorystat, setInventorystat] = useState([]);
  const [orderstat, setOrderstat] = useState([]);
  const [chartData, setChartData] = useState([]);
  const statReducer = useSelector(({ statReducer }) => statReducer);
  const dispatch = useDispatch();
  let initialdata = [0, 0, 0, 0, 0, 0, 0];

  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push('/login');
    }
    dispatch(StatActions.getCurrentOrderStat());

    // if (statReducer.result);
  }, []);

  useEffect(() => {
    if (statReducer.result) {
      let dates = statReducer.result.flat().map((date) => {
        return date.date;
        console.log(date.date);
      });
      // let stock = statReducer.result.flat().map((item) => {
      //   return item.stock;
      // });
      setOrderstat({ dates });

      // console.log(initialdata);
      console.log(dates);
      console.log(weekly());
      dates.map((element) => {
        weeklydata(element);
      });

      chart();
    }
  }, [statReducer.result]);

  function weekly() {
    const dates = [];
    const NUM_OF_DAYS = 7; // get last 7 dates.

    for (let i = 0; i < NUM_OF_DAYS; i++) {
      let date = moment();
      date.subtract(i, 'day').format('DD-MM-YYYY');
      var weekDayName = moment(date).format('dddd Do MMMM');
      dates.push(weekDayName);
    }

    return dates.reverse();
  }

  function tellweeknumber(weeknumber) {
    const dates = [];
    const NUM_OF_DAYS = 7; // get last 7 dates.

    for (let i = 0; i < NUM_OF_DAYS; i++) {
      let date = moment();
      date.subtract(i, 'day').format('DD-MM-YYYY');
      var weekDayName = moment(date).format('dddd');
      dates.push(weekDayName);
    }

    return dates[weeknumber];
  }

  function weeklydata(dates) {
    let day = moment(dates).format('dddd');
    // console.log(day);
    switch (day) {
      case tellweeknumber(0):
        return (initialdata[6] += 1);
      case tellweeknumber(1):
        return (initialdata[5] += 1);
      case tellweeknumber(2):
        return (initialdata[4] += 1);
      case tellweeknumber(3):
        return (initialdata[3] += 1);
      case tellweeknumber(4):
        return (initialdata[2] += 1);
      case tellweeknumber(5):
        return (initialdata[1] += 1);
      case tellweeknumber(6):
        return (initialdata[0] += 1);
      default:
        return console.log('ERROR:' + day);
    }
  }

  const chart = () => {
    setChartData({
      labels: weekly(),
      datasets: [
        {
          label: '# of orders made',
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
          data: initialdata,
          redraw: true,
        },
      ],
    });
  };

  return (
    <div className='content-wrapper'>
      {/* Content Header (Page header) */}
      <div className='content-header'>
        <div className='container-fluid'>
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <h1 className='m-0 text-dark'>Sales Dashboard</h1>
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
          {/* Main row */}
          <div className='row'>
            {/* Left col */}
            <section className='col-lg-7 connectedSortable'>
              {/* Custom tabs (Charts with tabs)*/}
              <div className='card'>
                <div className='card-header'>
                  <h3 className='card-title'>
                    <i className='fas fa-chart-line mr-1' />
                    Weekly Sales Report : {moment().format('MMMM')}
                  </h3>
                  <div className='card-tools'>
                    <ul className='nav nav-pills ml-auto'>
                      <li className='nav-item'>
                        <a
                          className='nav-link active'
                          href='#revenue-chart'
                          data-toggle='tab'
                        >
                          Weekly
                        </a>
                      </li>
                      <li className='nav-item'>
                        <a
                          className='nav-link'
                          href='#sales-chart'
                          data-toggle='tab'
                        ></a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* /.card-header */}
                <div className='card-body'>
                  <div className='tab-content p-0'>
                    {/* Morris chart - Sales */}
                    <div
                      className='chart tab-pane active'
                      id='revenue-chart'
                      style={{ position: 'relative', height: 900 }}
                    >
                      {statReducer.result && (
                        <Line
                          data={chartData}
                          options={{ maintainAspectRatio: true }}
                        />
                      )}
                    </div>
                    <div
                      className='chart tab-pane'
                      id='sales-chart'
                      style={{ position: 'relative', height: 900 }}
                    ></div>
                  </div>
                </div>
                {/* /.card-body */}
              </div>
            </section>
            {/* /.Left col */}
          </div>
          {/* /.row (main row) */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};
