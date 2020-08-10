import React, { Fragment } from 'react';
import { Result } from 'antd';

const NotFound = () => {
  return (
    <Fragment>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </Fragment>
  );
};

export default NotFound;
