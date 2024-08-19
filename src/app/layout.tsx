'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'
import DashboardMenu from './BuildingBlocks/layout/DashboardMenu'
import { EntityProvider } from './context/EntityContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <EntityProvider>
          <Container fluid style={{ height: '100vh', overflow: 'hidden' }}>
            <Row style={{ height: '100%' }}>
              <Col
                md={2}
                className='bg-dark text-white'
                style={{ position: 'fixed', height: '100%', overflowY: 'auto' }}
              >
                <DashboardMenu />
              </Col>
              <Col
                md={10}
                style={{
                  marginLeft: '16.67%',
                  height: '100%',
                  overflowY: 'auto',
                }}
              >
                <div className='p-3' style={{ height: '100%' }}>
                  {children}
                </div>
              </Col>
            </Row>
          </Container>
        </EntityProvider>
      </body>
    </html>
  )
}
