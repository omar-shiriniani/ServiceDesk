import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { Card, Avatar, Tooltip } from 'antd';
import {
  EditOutlined,
  UserAddOutlined,
  DeleteOutlined
} from '@ant-design/icons';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const { Meta } = Card;
  return (
    <Fragment>
      <Card
        cover={
          <img
            alt="example"
            src="https://i.pinimg.com/originals/2d/e8/82/2de882cd4f3992ada3d609e3a183f7a4.jpg"
          />
        }
        actions={
          profile !== null
            ? [
                <Tooltip title="Edit Profile" color="blue">
                  <Link to="/create-profile">
                    <EditOutlined />
                  </Link>
                </Tooltip>,
                <Tooltip title="Delete Profile" color="red">
                  <DeleteOutlined onClick={() => deleteAccount()} />
                </Tooltip>
              ]
            : [
                <Tooltip title="Add Profile Info" color="blue">
                  <Link to="/create-profile">
                    <UserAddOutlined />
                  </Link>
                </Tooltip>
              ]
        }
      >
        <Meta
          avatar={
            <Avatar src="https://f0.pngfuel.com/png/178/595/black-profile-icon-illustration-user-profile-computer-icons-login-user-avatars-png-clip-art.png" />
          }
          title={`Welcome ${user && user.name}`}
          description="This is the description"
        />
      </Card>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
