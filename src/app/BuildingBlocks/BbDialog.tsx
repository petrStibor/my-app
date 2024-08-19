'use client'
import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import BbText from './BbText'

type BbDialogProps = {
  children: React.ReactNode
  icon?: React.ReactNode
  title?: string
}

const BbDialog: React.FC<BbDialogProps> = ({
  children,
  icon,
  title = 'Upload',
}) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        {icon && <span className='me-2'>{icon}</span>}
        <BbText variant='text'>Upload data file</BbText>
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <BbText>{title}</BbText>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {React.cloneElement(children as React.ReactElement<any>, {
            onClose: handleClose,
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default BbDialog
