import 'styles/ui/Button.scss';
import PropTypes from 'prop-types';
import React from 'react';

export function Button(props) {
  const {
    width, style, className, children,
  } = props;

  return (
    <button
      {...props}
      style={{ width, ...style }}
      className={`primary-button ${className}`}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  width: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  style: PropTypes.object,
  className: PropTypes.object,
};

Button.defaultProps = {
  style: {},
  className: '',
};
