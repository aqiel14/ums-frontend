import React, { useState, useEffect } from 'react';
import * as machineActions from '../../actions/machine.action';
import { server } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import Table from '../Table';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

export default (props) => {
  const machineReducer = useSelector(({ machineReducer }) => machineReducer);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push('/login');
    }
    dispatch(machineActions.Index());
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
        dispatch(machineActions.Remove(id));
        swal('Poof! Your Machine data has been deleted!', {
          icon: 'success',
        });
      }
    });
  }
  const columns = React.useMemo(
    () => [
      {
        Header: 'Machine ID',
        accessor: '_id',
        id:'id', // accessor is the "key" in the data
      },
      {
        Header: 'Machine name',
        accessor: 'machinename',
        id:'alias', // accessor is the "key" in the data
      },
      {
        Header: 'Operator',
        accessor: 'operator'
      },
      {
        Header: 'Capacity',
        accessor: (data)=>{
          return data.capacity+' '+data.unit
        },
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Status',
        accessor: 'status'
      },
      {
        Header: 'Action',
        accessor: '_id',
        Cell: ({ cell: { value } }) => {
          // alert(id)
          return (
            <>
              <Link
                to={'/machine/update/' + value}
                type='button'
                class='btn btn-primary'
                style={{ 'margin-right': '5px' }}
                onClick={() => dispatch(machineActions.clearState())}
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
    if (machineReducer.result) {
      return (
        <Table
          columns={columns}
          data={machineReducer.result}
        />
      );
    } else {
      return <p>Loading..</p>;
    }
  };
  return (
    <div className='content-wrapper'>
      {/* Content Header (Page header) */}
      <div className='content-header'>
        <div className='container-fluid'>
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <h1 className='m-0 text-dark'>Machine Information Data</h1>
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
                      <Link to='/machine/create'>
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