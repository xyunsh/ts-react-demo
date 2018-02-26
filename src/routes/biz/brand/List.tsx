import * as React from 'react';
import { Menu, Card, Badge, Divider, Button, Dropdown, Icon, Input, Row, Col } from 'antd';
import moment from 'moment';

import StandardTable from '../../../components/Table/index';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import { DatetimeColumn, Column } from '../../../components/Table/Columns';
import PopModalButton from '../../../components/Table/PopModalButton';
import Modify from './Modify';

const { Search } = Input;

export default class List extends React.PureComponent {
  
  render() {
    const menu = (
      <Menu>
        <Menu.Item key="remove">批量删除</Menu.Item>
        <Menu.Item key="approval">批量通过</Menu.Item>
      </Menu>
    );

    return (
      <PageHeaderLayout title="品牌">
        <Card bordered={false}>
            <StandardTable
              model='biz/brand'
              header={({selectedRowKeys, onSearch})=>(
                <Row>
                  <Col span={18}>
                    <PopModalButton icon="plus" type="primary" componentAssigned={Modify}>新建</PopModalButton>
                    {
                      selectedRowKeys && selectedRowKeys.length > 0 && (
                        <span>
                          <Button>批量删除</Button>
                          <Dropdown overlay={menu}>
                            <Button>
                              更多操作 <Icon type="down" />
                            </Button>
                          </Dropdown>
                        </span>
                      )
                    }
                  </Col>
                  <Col span={6}>
                    <Search onSearch={(val)=>onSearch({query:val})} placeholder="请输入查询关键字"/>
                  </Col>
                </Row>
              )}
            >
              <Column title="ID" dataIndex="id"/>
              <Column title='英文名' dataIndex='en_name' width={160}/>
              <Column title='简称' dataIndex='short_name'/>
              <Column title="名称" dataIndex="name"/>
              <DatetimeColumn title="更新时间" dataIndex="create_time"/>
              <Column title="操作" render={(val,{id}) => (
                <div>
                      <PopModalButton componentAssigned={(props) => <Modify id={id} {...props}/>}>编辑</PopModalButton>
                      <Divider type="vertical" />
                      <Dropdown overlay={<Menu>
                        <Menu.Item key="remove">删除</Menu.Item>
                        <Menu.Item key="approval">通过</Menu.Item>
                      </Menu>}>
                        <a>
                          更多<Icon type="down" />
                        </a>
                      </Dropdown>
                </div>
              )}/>
            </StandardTable>
        </Card>
      </PageHeaderLayout>
    );
  }
}
