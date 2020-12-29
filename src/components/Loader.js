import React from 'react'
import { Spin, Space } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import '../styles/loader.css'

const Loader = ({ size = 'large', tip = 'Chargement de la page...', color = 'white', fontSize = '3rem', container = true, style }) => {

    return <div className={container ? 'loader-container' : ''} style={style}>

        <Space size={size}>
            <Spin
                size={size}
                tip={tip}
                style={{ color: color, fontSize: '1.2rem' }}
                indicator={<LoadingOutlined
                    style={{ color: color, fontSize: fontSize, marginBottom: 8 }}
                    spin
                />}
            />
        </Space>

    </div>
}

export default Loader
