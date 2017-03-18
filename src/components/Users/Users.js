// ./src/components/Users/Users
import React from 'react';
import { connect } from 'dva';
import { Table, message, Popconfirm, Button } from 'antd';
import UserModal from './UserModal';

const Users = ({
  list: dataSource,
  loading,
  total,
  current,
  dispatch
}) => {

  function deleteHandler(id){
    console.log('DELETE:' + id);
    dispatch({
      type: 'users/remove',
      payload: id
    });
  }
  function editHandler(id, values) {
    console.log(`editHandler: ${id} + ${values}`);
    dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
  }
  function createHandler(values) {
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }
  // Define Table Name | Email | Age | Operation
  const columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a href="#">{text}</a>,
  }, {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Operation',
    key: 'operation',
    render: (text, record) => (
      <p>
        <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
          <a>Edit</a>
        </UserModal>
        <span className="ant-divider" />
        <Popconfirm
          title="Are you sure？"
          okText="Yes"
          cancelText="No"
          onConfirm={deleteHandler.bind(null, record.id)}
        >
          <a href="#">Delete</a>
        </Popconfirm>
      </p>
    ),
  }];
  // Define Pagination
  const pagination = {
    total,
    current,
    pageSize: 10,
    onChange: () => {},
  };

  return (
    <div>
      <div>
        <UserModal record={{}} onOk={createHandler}>
          <Button type="primary">Create User</Button>
        </UserModal>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        pagination={pagination}
        rowKey={record => record.id}  // ?? where come from
      />
    </div>
  );
};

function mapStateToProps(state) {
  const { list } = state.users;
  return {
    loading: state.loading.models.users,
    list,
  };
}

export default connect(mapStateToProps)(Users);
