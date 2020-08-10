import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [passVal, setPassVal] = useState(false);

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    if (e.target.name === 'password' || e.target.name === 'password2') {
      !isNaN(e.target.value.charAt(0)) === true
        ? setPassVal(true)
        : setPassVal(false);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="text-center dGridContentCenter">
        <h1 className="large text-primary">Sign Up</h1>
        <form className="form width500" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              required
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              required
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              className={passVal === true ? 'borderRed' : ''}
              type="password"
              placeholder="Password"
              name="password"
              required
              value={password}
              minLength="8"
              maxLength="16"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              required
              value={password2}
              minLength="8"
              maxLength="16"
              onChange={onChange}
            />
          </div>
          <input
            type="submit"
            disabled={passVal}
            className="btn btn-primary"
            value="Register"
          />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
