import React, { useState, useEffect } from 'react';
import * as orderActions from '../../actions/order.action';
import { server } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import loading from '../../assets/image/loading.gif';
import Table from '../Table';
import * as moment from 'moment';
import _ from 'lodash';

export default (props) => {
  const orderReducer = useSelector(({ orderReducer }) => orderReducer);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push('/login');
    }
    dispatch(orderActions.Index());
  }, []);

  function confirmDelete(id) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this data!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(orderActions.remove(id));
        swal('Poof! Your POS Machine data has been deleted!', {
          icon: 'success',
        });
      }
    });
  }

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

      /////////////////
      {
        Header: 'Print_product',
        id: 'hidden_name',
        accessor: (data) => {
          let output = [];
          _.map(data.order_list, (order_list) => {
            output.push(order_list.name);
          });
          return output.join(', ');
        },
      },
      {
        Header: 'Print_kuantitas',
        id: 'hidden_qty',
        accessor: (data) => {
          let output = [];
          _.map(data.order_list, (order_list) => {
            output.push(order_list.qty);
          });
          return output.join(', ');
        },
      },
      {
        Header: 'Print_harga',
        id: 'hidden_price',
        accessor: (data) => {
          let output = [];
          _.map(data.order_list, (order_list) => {
            output.push(order_list.price);
          });
          return output.join(', ');
        },
      },
      {
        Header: 'Print_total',
        id: 'hidden_total',
        accessor: 'total',
      },

      ///////////////////
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

      {
        Header: 'Action',
        accessor: '_id',
        Cell: ({ cell: { value } }) => {
          // alert(id)
          return (
            <>
              <Link
                to={'/order/receipt/' + value}
                type='button'
                class='btn btn-primary'
                style={{ 'margin-right': '5px' }}
                onClick={() => dispatch(orderActions.clearState())}
              >
                Receipt
              </Link>
              <Link
                type='button'
                class='btn btn-danger'
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
    if (orderReducer.result) {
      return <Table columns={columns} data={orderReducer.result} />;
    } else {
      return <img class='img-fluid img-rounded' src={loading} width='30%' />;
    }
  };

  return (
    <div className='content-wrapper'>
      {/* Content Header (Page header) */}
      <div className='content-header'>
        <div className='container-fluid'>
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <h1 className='m-0 text-dark'>Orders Data</h1>
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      <section className='content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <div className='card'>
                <div className='card-header'>
                  <h3 className='card-title'></h3>
                  <div className='card-tools'>
                    <div className='input-group input-group-sm'>
                      <Link to='/order/create'>
                        <button type='submit' className='btn btn-default'>
                          <i className='fas fa-plus' />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* /.card-header */}
                <div className='card-body table-responsive p-0'>
                  {Holdon(columns, data)}
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
