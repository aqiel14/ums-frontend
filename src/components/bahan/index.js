import React, { useState, useEffect } from 'react';
import * as bahanActions from '../../actions/bahan.action';
import { server } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import Table from '../Table';
import './bahan.css';
import loading from '../../assets/image/loading.gif';
import _ from 'lodash';
export default (props) => {
  const bahanReducer = useSelector(({ bahanReducer }) => bahanReducer);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push('/login');
    }
    dispatch(bahanActions.Index());
  }, []);
  useEffect(() => {
    setData(bahanReducer.result);
  }, [bahanReducer.result]);

  function confirmDelete(id) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this data!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(bahanActions.Remove(id));
        swal('Poof! Your Production Material data has been deleted!', {
          icon: 'success',
        });
      }
    });
  }

  const columns = React.useMemo(
    () => [
        {
            Header: 'Products Name',
            id: 'alias',
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
        //   Header: 'Product Name',
        //   id: 'name',
        //   accessor:'product',
        //   Cell: ({ cell: { value } }) => {
        //     return value.map((data) => {
        //       return (
        //         <span key={data} className='badge'>
        //           {data.name}
        //         </span>
        //       );
        //     });
        //   }
        // },
        {
          Header: 'Amount',
          accessor: (data)=>{
            return data.amount+' '+data.prounit
          },
        },
      {
        Header: 'Material Name',
        accessor: 'materialname', // accessor is the "key" in the data
      },
      
      {
        Header: 'Material needed',
        accessor: (data)=>{
          return data.materialneeded+' '+data.materialunit
        },
      },
     
     
      // {
      //   Header: 'Material Stock',
      //   accessor: 'stock',
      // },
      // {
      //   Header: 'Material Unit',
      //   accessor: 'materialunit',
      // },
      {
        Header: 'Action',
        accessor: '_id',
        Cell: ({ cell: { value } }) => {
          // alert(id)
          return (
            <>
              <Link
                to={'/bahan/update/' + value}
                type='button'
                class='btn btn-primary'
                style={{ 'margin-right': '5px' }}
                onClick={() => dispatch(bahanActions.clearState())}
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
    if (bahanReducer.result) {
      return <Table columns={columns} data={bahanReducer.result} />;
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
              <h1 className='m-0 text-dark'>Production Material Data</h1>
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
                      <Link to='/bahan/create'>
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
