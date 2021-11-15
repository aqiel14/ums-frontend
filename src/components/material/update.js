import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as materialActions from "../../actions/material.action";
import { server } from "../../constants";
import Select from "react-select";
import material from ".";
export default (props) => {
  const dispatch = useDispatch();
  const [multiselect, setMultiselect] = useState([]);
  const materialReducer = useSelector(({ materialReducer }) => materialReducer);

  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push("/login");
    }
    const { id } = props.match.params;

    dispatch(materialActions.getSingleMaterial(id));
    dispatch(materialActions.clearState());
  }, []);
  useEffect(() => {
    if (materialReducer.result) {
      let initial_image = {
        file_obj: "",
        frontimage: materialReducer.result.frontimage,
      };
      showPreviewImage(initial_image);
    }
  }, [materialReducer]);
  const showPreviewImage = (values) => {
    return (
      <img
        id="frontimage"
        src={
          values.file_obj != null
            ? values.file_obj
            : process.env.REACT_APP_MATERIAL_FRONT_IMAGE_PATH +
              "/" +
              values.frontimage
        }
        class="img-fluid"
        width={300}
      />
    );
  };
  const renderSelectwithSelected = () => {
    {
      if (materialReducer.result) {
        return (
          <div class="form-group ">
            <Select
              name="bahan"
              defaultValue={
                materialReducer.result
                  ? materialReducer.result.bahan.map((val) => {
                      return {
                        value: val._id,
                        label: val.materialname,
                      };
                    })
                  : null
              }
              onChange={setMultiselect}
              isMulti
              closeMenuOnSelect={false}
              options={materialReducer.options ? materialReducer.options : null}
            />
          </div>
        );
      } else {
        return null; // or loading graphic
      }
    }
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
      <form role="form" onSubmit={handleSubmit}>
        <div class="card-body">
          <input
            type="hidden"
            name="_id"
            onChange={handleChange}
            value={values._id}
          />
          {/* <div className="form-group input-group has-feedback">
            <input
              type="text"
              name="materialname"
              onChange={handleChange}
              value={values.materialname}
              className="form-control"
              placeholder="Material Name"
              className={
                errors.materialname && touched.materialname
                  ? "form-control is-invalid"
                  : "form-control"
              }
            />

            {errors.materialname && touched.materialname ? (
              <small id="passwordHelp" class="text-danger">
                {errors.materialname}
              </small>
            ) : null}
          </div> */}
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

          {renderSelectwithSelected()}
          {/* <div class='form-group '>{showPreviewImage(values)}</div> */}

          {/* <div class='form-group '>
            <div class='input-group col-5'>
              <div class='custom-file'>
                <input
                  type='file'
                  onChange={(e) => {
                    e.preventDefault();
                    setFieldValue('frontimage', e.target.files[0]); // for upload
                    setFieldValue(
                      'file_obj',
                      URL.createObjectURL(e.target.files[0])
                    ); // for preview image
                  }}
                  name='frontimage'
                  className={
                    errors.frontimage && touched.frontimage
                      ? 'form-control is-invalid'
                      : 'form-control'
                  }
                  accept='image/*'
                  id='exampleInputFile'
                />
                <label class='custom-file-label' for='exampleInputFile'>
                  file
                </label>
              </div>
            </div>
          </div> */}

          <div class="row">
            <div class="offset-md-4 col-4">
              <button
                type="submit"
                disabled={isSubmitting}
                class="btn btn-primary btn-block"
              >
                Update
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
              <h1 className="m-0 text-dark">Update Material Data</h1>
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
            enableReinitialize={true}
            initialValues={
              materialReducer.result
                ? materialReducer.result
                : {
                    suppliername: "",
                    tanggal: "",
                    price: "",
                    qty: "",
                    unit: "",
                    bahan: "",
                  }
            }
            onSubmit={(values, { setSubmitting }) => {
              let formData = new FormData();
              formData.append("id", materialReducer.result._id);
              formData.append("suppliername", values.suppliername);
              formData.append("tanggal", values.tanggal);
              formData.append("price", values.price);
              formData.append("qty", values.qty);
              formData.append("unit", values.unit);
              let result = multiselect.map((arr) => arr.value);

              formData.append("bahan", result);
              if (values.frontimage) {
                formData.append("frontimage", values.frontimage);
              }
              dispatch(materialActions.Update(formData, props.history));
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
