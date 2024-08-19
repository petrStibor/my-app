import { Container, Col, Nav } from 'react-bootstrap'
import Image from 'next/image'
import logo from '../../../../public/assets/companyLogos/logo.png'
import BbDropzone from '../BbDropZone'
import { useEntities } from '@/app/context/EntityContext'
import BbDialog from '../BbDialog'
import {
  BsBarChart,
  BsChatFill,
  BsGear,
  BsPeopleFill,
  BsUpload,
} from 'react-icons/bs'
import BbText from '../BbText'

const DashboardMenu: React.FC = () => {
  const { setEntities } = useEntities()

  const handleEntitiesProcessed = (data: any[]) => {
    setEntities(data)
  }

  return (
    <Container
      fluid
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
      }}
    >
      <Col
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px 0',
        }}
      >
        <Image src={logo} alt='Company Logo' width={150} />

        <Nav className='flex-column mt-4' style={{ width: '100%' }}>
          <Nav.Item>
            <Nav.Link
              href='/'
              className='d-flex align-items-center justify-content-start'
            >
              <BbText
                icon={<BsBarChart size={20} className='me-2' />}
                variant='nav'
              >
                Dashboard
              </BbText>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href='/'
              className='d-flex align-items-center justify-content-start'
            >
              <BbText
                icon={<BsPeopleFill size={20} className='me-2' />}
                variant='nav'
              >
                Customers
              </BbText>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href='/'
              className='d-flex align-items-center justify-content-start'
            >
              <BbText
                icon={<BsChatFill size={20} className='me-2' />}
                variant='nav'
              >
                Messaging
              </BbText>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href='/'
              className='d-flex align-items-center justify-content-start'
            >
              <BbText
                icon={<BsGear size={20} className='me-2' />}
                variant='nav'
              >
                Settings
              </BbText>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>

      <Col
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          marginBottom: '20px',
        }}
      >
        <BbDialog icon={<BsUpload />}>
          <BbDropzone
            apiEndpoint='/api/analyze'
            processResponse={(data: any) => data.response.entities}
            onDataProcessed={handleEntitiesProcessed}
            onClose={() => null}
          />
        </BbDialog>

        <BbText variant='footers' className='text-center mt-3'>
          Build Version: <strong>2.25.225</strong>
        </BbText>
      </Col>
    </Container>
  )
}

export default DashboardMenu
