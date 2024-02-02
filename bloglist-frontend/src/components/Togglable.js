import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef(({ children, buttonLabel = 'Show' }, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <div>
      <button onClick={toggleVisibility} aria-expanded={visible}>
        {visible ? 'Hide' : buttonLabel}
      </button>
      {visible && (
        <div className="togglableContent">
          {children}
        </div>
      )}
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Togglable;
