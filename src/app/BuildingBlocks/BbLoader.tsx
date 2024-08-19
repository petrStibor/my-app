// components/BbLoader.tsx
import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

type BbLoaderProps = {
  isLoading: boolean
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
}

const BbLoader: React.FC<BbLoaderProps> = ({
  isLoading,
  variant = 'primary',
}) => {
  return isLoading ? <Spinner animation='border' variant={variant} /> : null
}

export default BbLoader
