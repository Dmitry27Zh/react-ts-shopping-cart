import { Button, Stack } from 'react-bootstrap'
import { useShoppingCartContext } from '../context/ShoppingCartContext'
import storeItems from '../data/items.json'
import { formatCurrency } from '../utilities/formatCurrency'

type CartItemProps = {
  id: number
  quantity: number
}

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCartContext()
  const item = storeItems.find((item) => item.id === id)

  if (item == null) {
    return
  }

  return (
    <Stack className="d-flex align-items-center" direction="horizontal" gap={2}>
      <img
        src={item.imgUrl}
        alt=""
        style={{
          width: '125px',
          height: '75px',
          objectFit: 'cover',
        }}
      />
      <div className="me-auto">
        <div>
          {item.name}{' '}
          {quantity > 1 && (
            <span
              className="text-muted"
              style={{
                fontSize: '.65rem',
              }}
            >
              x{quantity}
            </span>
          )}
        </div>
        <div
          className="text-muted"
          style={{
            fontSize: '.75rem',
          }}
        >
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(id)}>
        &times;
      </Button>
    </Stack>
  )
}

export default CartItem
