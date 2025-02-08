import React, { useState } from 'react';
import { UploadOutlined, UserOutlined} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { DatePicker, Radio, Space , Input} from 'antd';
import { Button } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import useWebDataDownloader from './hooks/index'
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
const tenant = ['MT', 'DT', 'HNB', 'IR']
const placeHolderCondition = "filename like '%lotus%'"

const WebDataDownloader: React.FC = () => {
  const { token: { colorBgContainer, borderRadiusLG }} = theme.useToken();
  useWebDataDownloader() 

  const [tenantValue, setTenantValue] = useState(1);
  const [trxDate, setTrxDate] = useState()
  const [condition, setCondition] = useState(placeHolderCondition)
  const onChangeTenant = (e: RadioChangeEvent) => {setTenantValue(e.target.value)}; 

  const onSubmit = () => {
    console.log({
        tenantValue, 
        condition,
        startDate: dayjs(trxDate?.[0]).format('YYYY-MM-DD'),
        endDate: dayjs(trxDate?.[1]).format('YYYY-MM-DD')
    })
  }



  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider>
      <Layout style={{ marginInlineStart: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ overflow: 'initial', }}>
          <div
            style={{
              padding: 24, 
              justifyContent:"center",
              alignItems:"center",
              display:"flex",  
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Space direction="vertical" size={12} style={{minHeight:"100vh", gap:"30px"}}>
            <RangePicker size={'large'} onChange={(p) => {
                setTrxDate(p) 
            }} /> 
            <Radio.Group onChange={onChangeTenant} value={tenantValue} size='large'>
           {tenant.map((item, idx) => (<Radio key={idx} value={item}>{item}</Radio> ))}
            </Radio.Group>
            <Input size='large' onChange={(e) => setCondition(e.target.value)} value={condition} placeholder={placeHolderCondition} />
            <Button size='large' type="primary" onClick={onSubmit}>Download</Button>
            </Space>
          </div>  
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Nazri Haris ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};


const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
  };
  
  const items: MenuProps['items'] = [
    UserOutlined, 
    UploadOutlined, 
  ].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }));


export default WebDataDownloader;