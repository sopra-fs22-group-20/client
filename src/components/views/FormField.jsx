import React from 'react';
import PropTypes from 'prop-types';
import 'styles/views/Login.scss';

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
function FormField(props) {
  const {
    label, value, onChange, type,
  } = props;
  return (
    <div className="login field">
      <label className="login label">
        {label}
      </label>
      <input
        className="login input"
        placeholder="enter here.."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
      />
    </div>
  );
}

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
};

FormField.defaultProps = {
  label: '',
  value: '',
  onChange: null,
  type: 'value',
};

export default FormField;
