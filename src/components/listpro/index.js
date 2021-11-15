import React, { useState, useEffect } from 'react';
import * as listproActions from '../../actions/listpro.action';
import { server } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import Table from '../Table';
import * as moment from 'moment';
import './listpro.css';
import loading from '../../assets/image/loading.gif';
import _ from 'lodash';
export default (props) => {
  const listproReducer = useSelector(({ listproReducer }) => listproReducer);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push('/login');
    }
    dispatch(listproActions.Index());
  }, []);
  useEffect(() => {
    setData(listproReducer.result);
  }, [listproReducer.result]);

  function confirmDelete(id) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this data!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(listproActions.Remove(id));
        swal('Poof! Your Production Material data has been deleted!', {
          icon: 'success',
        });
      }
    });
  }

  const columns = React.useMemo(
    () => [
        
      {
        Header: 'Production ID',
        accessor: '_id',
        id:'id', // accessor is the "key" in the data
      },
      {
        Header: 'Created Date',
        accessor: 'created',
        id: 'created',
        Cell: ({ cell: { value } }) => {
          let sliced = value.slice(0, -14);
          return sliced;
        },
      },
      {
        Header: 'Product Name',
        // id:'hidden_productname',
        accessor: (data) => {
          let output = [];
          _.map(data.product, (data) => {
            output.push(data.name);
          });
          return output.join(', ');
      }
    },
   

      // {
      //   Header: 'Products Name',
      //   accessor: 'product',
      //   Cell: ({ cell: { value } }) => {
      //     return value.map((data) => {
      //       return (
      //         <span key={data} className='badge'>
      //           {data.name}
      //         </span>
      //       );
      //     });
      //   },
      // },
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
        accessor: (data)=>{
          return data.quantity+' '+data.order
        
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
        accessor: (data)=>{
          return 'Rp. '+data.cost
        },
      },
      {
        Header: 'Status',
        accessor: 'status', // accessor is the "key" in the data
      },
      {
        Header: 'Action',
        accessor: '_id',
        Cell: ({ cell: { value } }) => {
          // alert(id)
          return (
            <>
              <Link
                to={'/listpro/update/' + value}
                type='button'
                class='btn btn-primary'
                style={{ 'margin-right': '5px' }}
                onClick={() => dispatch(listproActions.clearState())}
              >
                Edit
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
    if (listproReducer.result) {
      return <Table columns={columns} data={listproReducer.result} />;
    } else {
      return <img class='img-fluid img-rounded' src={loading} />;
    }
  };

  return (
    <div className='content-wrapper'>
      {/* Content Header (Page header) */}
      <div className='content-header'>
        <div className='container-fluid'>
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <h1 className='m-0 text-dark'>Production</h1>
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
                  <div className='card-tools'>
                    <div className='input-group input-group-sm'>
                      <Link to='/listpro/create'>
                        <button type='submit' className='btn btn-default'>
                          <i className='fas fa-plus' />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className='card card-body'>{Holdon(columns, data)}</div>
              </div>
              {/* /.card */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
