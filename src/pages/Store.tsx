import { Col, Row } from 'react-bootstrap'
import storeItems from '../data/items.json'

const Store = () => {
  return (
    <>
      <h1>Store</h1>
      <Row className="g-3" md={2} xs={1} lg={3}>
        {storeItems.map((item) => (
          <Col>{JSON.stringify(item)}</Col>
        ))}
      </Row>
    </>
  )
}

export default Store
