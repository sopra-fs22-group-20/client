import 'styles/ui/BaseContainer.scss';
import PropTypes from 'prop-types';
import React from 'react';

function BaseContainer(props) {
  const { className, children } = props;
  return (
    <div {...props} className={`base-container ${className ?? ''}`}>
      {children}
    </div>
  );
}

BaseContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

BaseContainer.defaultProps = {
  className: undefined,
};

export default BaseContainer;
