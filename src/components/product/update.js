import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../actions/product.action';
import { server } from '../../constants';
import product from '.';
export default (props) => {
  const dispatch = useDispatch();
  const productReducer = useSelector(({ productReducer }) => productReducer);
  const decodeJWT = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push('/login');
    }
    const { id } = props.match.params;
    // dispatch(productActions.getDropdownPOS())
    dispatch(productActions.getSingleProduct(id));
    dispatch(productActions.clearState());
  }, []);
  useEffect(() => {
    if (productReducer.result) {
      let initial_image = {
        file_obj: '',
        image: productReducer.result.image,
      };
      showPreviewImage(initial_image);
    }
  }, [productReducer]);
  const showPreviewImage = (values) => {
    return (
      <img
        id='image'
        src={
          values.file_obj != null
            ? values.file_obj
            : process.env.REACT_APP_PRODUCT_IMAGE_PATH + '/' + values.image
        }
        class='img-fluid'
        width={300}
      />
    );
  };

  const showForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
  }) => {
    return (
      <form role='form' onSubmit={handleSubmit}>
        <div class='card-body'>
          <div class='form-group '>{showPreviewImage(values)}</div>
          <div class='form-group '>
            <input name='id' onChange={handleChange} value={values.id} />
            <div class='input-group col-5'>
              <div class='custom-file'>
                <label class='custom-file-label' for='exampleInputFile'>
                  Choose Front Image
                </label>
                <input
                  type='file'
                  onChange={(e) => {
                    e.preventDefault();
                    setFieldValue('image', e.target.files[0]); // for upload
                    setFieldValue(
                      'file_obj',
                      URL.createObjectURL(e.target.files[0])
                    ); // for preview image
                  }}
                  name='image'
                  className={
                    errors.image && touched.image
                      ? 'form-control is-invalid'
                      : 'form-control'
                  }
                  accept='image/*'
                  id='exampleInputFile'
                />
              </div>
            </div>
          </div>

          <div className='form-group input-group has-feedback'>
            <input
              type='text'
              name='name'
              onChange={handleChange}
              value={values.name}
              className='form-control'
              placeholder='Name'
              className={
                errors.name && touched.name
                  ? 'form-control is-invalid'
                  : 'form-control'
              }
            />
          </div>
          <div className='form-group input-group has-feedback'>
            <input
              type='text'
              name='suppliername'
              onChange={handleChange}
              value={values.suppliername}
              className='form-control'
              placeholder='Supplier Name'
              className={
                errors.suppliername && touched.suppliername
                  ? 'form-control is-invalid'
                  : 'form-control'
              }
            />
          </div>
          <div className='form-group input-group has-feedback'>
            <input
              type='number'
              name='hpp'
              onChange={handleChange}
              value={values.hpp}
              className='form-control'
              placeholder='Harga Pokok Penjualan'
              className={
                errors.hpp && touched.hpp
                  ? 'form-control is-invalid'
                  : 'form-control'
              }
            />
            {errors.hpp && touched.hpp ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.hpp}
              </small>
            ) : null}
          </div>
          <div className='form-group input-group has-feedback'>
            <input
              type='text'
              name='price'
              onChange={handleChange}
              value={values.price}
              className='form-control'
              placeholder='Price'
              className={
                errors.price && touched.price
                  ? 'form-control is-invalid'
                  : 'form-control'
              }
            />
            {errors.price && touched.price ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.price}
              </small>
            ) : null}
          </div>
          <div className='form-group input-group has-feedback'>
            <input
              type='text'
              name='stock'
              onChange={handleChange}
              value={values.stock}
              className='form-control'
              placeholder='stock'
              className={
                errors.stock && touched.stock
                  ? 'form-control is-invalid'
                  : 'form-control'
              }
            />
            {errors.stock && touched.stock ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.stock}
              </small>
            ) : null}
          </div>

          <div class='row'>
            <div class='offset-md-4 col-4'>
              <button
                type='submit'
                disabled={isSubmitting}
                class='btn btn-primary btn-block'
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };
  return (
    <div className='content-wrapper'>
      <div className='content-header'>
        <div className='container-fluid'>
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <h1 className='m-0 text-dark'>Update Product Data</h1>
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      <div className='content'>
        <div class='card card-primary'>
          <div class='card-header'></div>

          <Formik
            enableReinitialize={true}
            initialValues={
              productReducer.result
                ? productReducer.result
                : {
                    name: '',
                    suppliername: '',
                    price: '',
                    stock: '',
                    id: decodeJWT(localStorage.getItem(server.TOKEN_KEY)).id,
                  }
            }
            onSubmit={(values, { setSubmitting }) => {
              let formData = new FormData();
              formData.append('id', productReducer.result._id);
              formData.append('name', values.name);
              formData.append('suppliername', values.suppliername);
              if (values.hpp) {
                formData.append('hpp', values.hpp);
              }
              formData.append('price', values.price);
              formData.append('stock', values.stock);
              if (values.image) {
                formData.append('image', values.image);
              }
              dispatch(productActions.Update(formData, props.history));
              setSubmitting(false);
            }}
            // validationSchema={Create_Schema}
          >
            {/* {this.showForm()}            */}
            {(props) => showForm(props)}
          </Formik>
        </div>
        {/* /.card */}
      </div>
    </div>
  );
};
