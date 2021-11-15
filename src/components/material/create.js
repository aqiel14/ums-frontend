import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import * as materialActions from "../../actions/material.action";
import { server } from "../../constants";

export default (props) => {
  const dispatch = useDispatch();
  const [multiselect, setMultiselect] = useState([]);
  const materialReducer = useSelector(({ materialReducer }) => materialReducer);
  useEffect(() => {
    console.log(multiselect);
  }, [multiselect]);

  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push("/login");
    }
    dispatch(materialActions.getDropdownBahan());
    if (materialReducer.result) {
      console.log(materialReducer.result);
    } else {
      console.log("asd");
    }
  }, []);

  const showForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
  }) => {
    return (
      <form role="form" onSubmit={handleSubmit}>
        <div class="card-body">
          <div class="form-group ">
            <Select
              placeholder={"Material Name"}
              value={multiselect}
              onChange={setMultiselect}
              isMulti
              closeMenuOnSelect={false}
              options={materialReducer.options ? materialReducer.options : null}
            />
          </div>
          <div className="form-group input-group has-feedback">
            <input
              type="text"
              name="suppliername"
              onChange={handleChange}
              value={values.suppliername}
              className="form-control"
              placeholder="Supplier Name"
              className={
                errors.suppliername && touched.suppliername
                  ? "form-control is-invalid"
                  : "form-control"
              }
            />
            {errors.suppliername && touched.suppliername ? (
              <small id="passwordHelp" class="text-danger">
                {errors.suppliername}
              </small>
            ) : null}
          </div>
          <div className="form-group input-group has-feedback">
            <input
              type="date"
              name="tanggal"
              onChange={handleChange}
              value={values.tanggal}
              className="form-control"
              placeholder="Created Date"
              className={
                errors.tanggal && touched.tanggal
                  ? "form-control is-invalid"
                  : "form-control"
              }
            />
            {errors.tanggal && touched.tanggal ? (
              <small id="passwordHelp" class="text-danger">
                {errors.tanggal}
              </small>
            ) : null}
          </div>
          <div className="form-group input-group has-feedback">
            <textarea
              name="price"
              onChange={handleChange}
              value={values.price}
              className="form-control"
              placeholder="Price"
              className={
                errors.price && touched.price
                  ? "form-control is-invalid"
                  : "form-control"
              }
            ></textarea>
            <div class="">
              <div class=""></div>
            </div>
            {errors.price && touched.price ? (
              <small id="passwordHelp" class="text-danger">
                {errors.price}
              </small>
            ) : null}
          </div>
          <div className="form-group input-group has-feedback">
            <input
              type="text"
              name="qty"
              onChange={handleChange}
              value={values.qty}
              className="form-control"
              placeholder="Quantity"
              className={
                errors.qty && touched.qty
                  ? "form-control is-invalid"
                  : "form-control"
              }
            />

            {errors.qty && touched.qty ? (
              <small id="passwordHelp" class="text-danger">
                {errors.qty}
              </small>
            ) : null}
          </div>
          <div className="form-group input-group has-feedback">
            <textarea
              name="unit"
              onChange={handleChange}
              value={values.unit}
              className="form-control"
              placeholder="Unit"
              className={
                errors.unit && touched.unit
                  ? "form-control is-invalid"
                  : "form-control"
              }
            ></textarea>
            <div class="">
              <div class=""></div>
            </div>
            {errors.unit && touched.unit ? (
              <small id="passwordHelp" class="text-danger">
                {errors.unit}
              </small>
            ) : null}
          </div>

          {/* <div className='form-group input-group has-feedback'>
            <input
              type='text'
              name='stock'
              onChange={handleChange}
              value={values.stock}
              className='form-control'
              placeholder='Material Stock'
              className={
                errors.stock && touched.stock
                  ? 'form-control is-invalid'
                  : 'form-control'
              }
            />
            <div class=''>
              <div class=''>
                
              </div>
            </div>
            {errors.stock && touched.stock ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.stock}
              </small>
            ) : null}
          </div> */}

          <div class="row">
            <div class="offset-md-4 col-4">
              <button
                type="submit"
                disabled={isSubmitting}
                class="btn btn-primary btn-block"
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
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Create Material Data</h1>
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      <div className="content">
        <div class="card card-primary">
          <div class="card-header"></div>

          <Formik
            initialValues={{
              suppliername: "",
              tanggal: "",
              price: "",
              qty: "",
              unit: "",
              bahan: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              let formData = new FormData();
              formData.append("suppliername", values.suppliername);
              formData.append("tanggal", values.tanggal);
              formData.append("price", values.price);
              formData.append("qty", values.qty);
              formData.append("unit", values.unit);
              let result = multiselect.map((arr) => arr.value);
              console.log(result);
              formData.append("bahan", result);
              dispatch(materialActions.Create(formData, props.history));
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
