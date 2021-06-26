import React, { FC } from 'react'
import s from './PulsarBadge.module.css'

enum pulsarSize {
    small = 'small',
    medium = 'medium',
    large = 'large'
}

type pulsarProps = {
    size?: 'small' | 'medium' | 'large',
    children?: React.ReactNode | null,
    color?: string,
    pulsarColor?: string,
}

const PulsarBadge: FC<pulsarProps> = ({ size = 'medium', children = null, color = '#00cc9c', pulsarColor = color }) => {
    return (
        <div className={`${s.badge} ${s[size]}`} style={{ background: color }}>
            <div className={s.pulsar} style={{ background: pulsarColor}}></div>
            <div className={s.children}>{children}</div>
        </div>
    )
}

export default PulsarBadge