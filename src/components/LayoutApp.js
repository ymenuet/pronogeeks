import React from 'react'
import { Layout, Menu, Typography } from 'antd'
import { UploadOutlined, UserOutlined, HomeOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
const { Header, Content, Sider } = Layout
const { Title } = Typography

const LayoutApp = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh', color: 'rgb(230,232,230)' }}>
            <Header className="site-layout-sub-header-background" style={{ padding: '0 0 0 20px', backgroundColor: 'rgb(0,37,0)', display: 'flex', alignItems: 'center', height: 90 }}>
                <Title level={1} style={{ color: 'rgb(230,232,230)', margin: 0, height: '100%', display: 'flex', alignItems: 'center', padding: '20px 0' }}><img src={'/images/logo1.png'} style={{ height: '100%', objectFit: 'contain' }} /></Title>
            </Header>
            <Layout>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {children}
                    </div>
                </Content>
                <Sider
                    reverseArrow={true}
                    breakpoint="lg"
                    collapsedWidth="0"
                    style={{ backgroundColor: 'rgb(0,37,0)' }}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" style={{ backgroundColor: 'rgb(0,37,0)' }}>
                        <Menu.Item key="1" icon={<HomeOutlined />} style={{ marginTop: 0 }}>
                            <Link to='/'>Accueil</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<LoginOutlined />}>
                            <Link to='/login'>Connexion</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined />}>
                            <Link to='/signup'>Créer un compte</Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<UserOutlined />}>
                            <Link to='/profile'>Profil</Link>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<LogoutOutlined />}>
                            Déconnexion
                        </Menu.Item>
                    </Menu>
                </Sider>
            </Layout>
        </Layout>
    )
}

export default LayoutApp
