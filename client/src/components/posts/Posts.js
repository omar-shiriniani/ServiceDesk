import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import { Table, Modal, Button, Input } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const [showModal, setShowModal] = useState(false);
  const [filterTable, setFilterTable] = useState(null);
  const [columns, setColumns] = useState([
    {
      title: 'Author',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'date',
      dataIndex: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date)
    },
    {
      title: 'Done',
      dataIndex: 'action',
      render: () => {
        return <span>is not done</span>;
      },
      sorter: (a, b) => a - b,
      sortDirections: ['descend', 'ascend']
    }
  ]);

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  const search = (value) => {
    console.log('PASS', { value });
    const filterTable = posts.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilterTable(filterTable);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Accident</h1>
      <p className="lead">
        <Button onClick={() => setShowModal(true)}>Add Accident</Button>
      </p>
      <Modal
        width={'900px'}
        title="Add accident"
        visible={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <PostForm close={() => setShowModal(false)} />
      </Modal>

      <div className="posts">
        <Input.Search
          style={{ margin: '0 0 10px 0' }}
          placeholder="Search by..."
          enterButton
          onSearch={search}
        />
        <Table
          columns={columns}
          dataSource={filterTable == null ? posts : filterTable}
          key={uuidv4()}
          onChange={onChange}
        />
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
