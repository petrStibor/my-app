import React, { CSSProperties, ReactNode } from 'react'
import { Form } from 'react-bootstrap'
import { textVariants } from '../theme/theme'

type BbTextProps = {
  size?: 'sm' | 'lg'
  color?: string
  fontSize?: string | number
  variant?: keyof typeof textVariants
  className?: string
  style?: CSSProperties
  children: ReactNode
  onClick?: () => void
  align?: 'left' | 'center' | 'bottom'
  icon?: React.ReactNode
}

const BbText: React.FC<BbTextProps> = ({
  size,
  color,
  fontSize,
  variant = 'primary',
  className,
  style,
  children,
  onClick,
  align = 'center',
  icon,
}) => {
  const variantStyle = variant ? textVariants[variant] : { color, fontSize }

  const textAlign =
    align === 'left' ? 'left' : align === 'center' ? 'center' : 'right'

  const textStyle: CSSProperties = {
    color: color || variantStyle.color || 'inherit',
    fontSize: fontSize || variantStyle.fontSize || 'inherit',
    cursor: onClick ? 'pointer' : 'default',
    textAlign: textAlign,
    display: 'flex',
    alignItems: align === 'bottom' ? 'flex-end' : 'center',
    justifyContent: align === 'center' ? 'center' : 'flex-start',
    gap: 8,
    ...style,
  }

  return (
    <Form.Text
      as='div'
      className={`${className} ${size === 'sm' ? 'small' : ''} ${
        size === 'lg' ? 'large' : ''
      }`}
      style={textStyle}
      onClick={onClick}
    >
      {icon ? icon : null}
      {children}
    </Form.Text>
  )
}

export default BbText
