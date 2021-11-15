import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className='main-footer'>
        <div className='float-right d-none d-sm-block'>
          <b>BY Aqiel,Hakim,Ilham</b> Made with Effort
        </div>
        <strong>
          Copyright © 2021 <a href='http://adminlte.io'>UMKM-SharedService</a>.
        </strong>{' '}
        All rights reserved.
      </footer>
    );
  }
}

export default Footer;
