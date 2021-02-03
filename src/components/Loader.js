import React from 'react'
import { Spin, Space } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import '../styles/loader.css'

const Loader = ({ size = 'large', tip = 'Chargement de la page...', color = 'white', tipSize = '1.2rem', fontSize = '3rem', container = true, className, style }) => {

    return <div className={`${className} ${container ? 'loader-container' : ''}`} style={style}>

        <Space size={size}>
            <Spin
                size={size}
                tip={tip}
                style={{ color: color, fontSize: tipSize }}
                indicator={<LoadingOutlined
                    style={{ color: color, fontSize: fontSize, marginBottom: 8 }}
                    spin
                />}
            />
        </Space>

    </div>
}

export default Loader
