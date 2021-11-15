import React, { useState, useEffect } from 'react';
import { server } from '../../constants';
import './home.css';
import { Link } from 'react-router-dom';
export default (props) => {
  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push('/login');
    }
  }, []);

  return (
    <div className='content-wrapper'>
      {/* Content Header (Page header) */}
      <div className='content-header'>
        <div className='container-fluid'>
          <div className='row mb-2'>
            <div className='col-sm-6'></div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <div className='center'>
        <img src='https://i.imgur.com/6SMC4x1.png' alt />
      </div>
      <section className='content '>
        {/* Topic Cards */}
        <div id='cards_landscape_wrap-2'>
          <div className='container'>
            <div className='row'>
              <div className='col-sm-4'>
                <a href>
                  <div className='card-flyer'>
                    <Link to='/sales/dashboard'>
                      <div className='text-box'>
                        <div className='image-box'>
                          <img
                            src='https://i.imgur.com/4xsyGjW.png'
                            alt
                            href='/'
                          />
                        </div>
                        <div className='text-container'>
                          <h6>Sales</h6>
                          <p>
                            Modul Sales Merupakan modul yang menyediakan layanan
                            berupa fitur untuk membantu pengguna dalam mencatat
                            dan mengelola data penjualan
                          </p>
                          <p></p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </a>
              </div>
              <div className='col-sm-4'>
                <a href>
                  <div className='card-flyer'>
                    <Link to='/warehouse/dashboard'>
                      <div className='text-box'>
                        <div className='image-box'>
                          <img src='https://i.imgur.com/P8REJMG.png' alt />
                        </div>
                        <div className='text-container'>
                          <h6>Warehouse</h6>
                          <p>
                            Modul Warehouse Merupakan modul yang menyediakan
                            layanan berupa fitur untuk membantu pengguna dalam
                            mencatat dan mengelola data pergudangan
                          </p>
                          <p></p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </a>
              </div>
              <div className='col-sm-4'>
                <a href>
                  <div className='card-flyer'>
                    <Link to='/productiondashboard'>
                      <div className='text-box'>
                        <div className='image-box'>
                          <img src='https://i.imgur.com/lZac4rW.png' alt />
                        </div>
                        <div className='text-container'>
                          <h6>Production</h6>
                          <p>
                            Modul Produksi Merupakan modul yang menyediakan
                            layanan berupa fitur untuk membantu pengguna dalam
                            mencatat dan mengelola data produksi
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /.content */}
    </div>
  );
};
