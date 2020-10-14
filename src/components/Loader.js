import React from 'react'
import { Spin, Space } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const Loader = ({ size = 'large', tip = 'Chargement de la page...', color = 'white', fontSize = '3rem', container = true }) => {
    return <div className={container ? 'loader-container' : ''}>
        <Space size={size}>
            <Spin size={size} tip={tip} style={{ color: color, fontSize: '1.2rem' }} indicator={<LoadingOutlined spin style={{ color: color, fontSize: fontSize, marginBottom: 8 }} />} />
        </Space>
    </div>
}

export default Loader
