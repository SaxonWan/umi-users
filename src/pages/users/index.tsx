import React, { useCallback, useState, FC } from 'react';
import { Table, Tag, Space, Popconfirm, message, Button } from 'antd';
import { connect, Dispatch, Loading, UserStateType } from 'umi';
import UserModal from './components/UserModal';
import { deleteRemoteList } from './service'
import { UserInfoType } from './data.d';

interface UserPagePropsType {
  users: UserStateType,
  dispatch: Dispatch,
  userListLoading: boolean,
};

const userPage:FC<UserPagePropsType> = ({ users, dispatch, userListLoading }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState<UserInfoType | undefined>(undefined);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'CreateTime',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: UserInfoType) => (
        <Space size="middle">
          <a onClick={() => {
            editHandler(record);
          }}>Edit</a>

          <Popconfirm
            title='确定删除？'
            okText='是'
            cancelText='否'
            onConfirm={() => {
              onConfirm(record);
            }}
          ><a>Delete</a></Popconfirm>
        </Space>
      ),
    },
  ];

  const editHandler = (record: UserInfoType) => {
    setRecord(record);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const onFinish = (values: any) => {
    if (record) {
      const id = record.id;
      dispatch({
        type: 'users/setRemote',
        payload: { id, values },
      });
    } else {
      dispatch({
        type: 'users/addRemote',
        payload: values,
      })
    };
    setModalVisible(false);
  };

  const onConfirm = async(record: UserInfoType) => {
    setRecord(record);
    const id = record.id;
    await deleteRemoteList(id);
    await dispatch({
      type: 'users/getRemote',
    });
    // dispatch({
    //   type: 'users/deleteRemote',
    //   payload: id,
    // });
  };

  const onAdd = () => {
    setRecord(undefined);
    setModalVisible(true);
  };

  return <div className="list-table">
    <Button
      type='primary'
      onClick={onAdd}
    >ADD</Button>
    <Table
      columns={columns}
      dataSource={users.data}
      rowKey='id'
      loading={userListLoading}
    />
    <UserModal visible={modalVisible} onCancel={handleCancel} record={record} onFinish={onFinish}></UserModal>
  </div>;
}

const mapStateToProps = ({ users, loading }: {users: UserStateType, loading: Loading}) => {
  return {
    users,
    userListLoading: loading.models.users,
  };
};

// const mapStateToProps = (state) => {
//   const { users, loading } = state;
//   return {
//     users,
//     userListLoading: loading.models.users,
//   };
// };

export default connect(mapStateToProps)(userPage);

// export default connect(({ users }) => ({users}))(index);