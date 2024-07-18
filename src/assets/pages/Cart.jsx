import '../css/Cart.css'

export function Cart({ toggleCart }) {
  return (
    <div className='cart-container'>
      <i onClick={toggleCart} className='fa-solid fa-x x-button'></i>
      <h3>Cart</h3>

      <button>Clear Cart</button>
      <button>
        Checkout <i className='fa-solid fa-arrow-right'></i>
      </button>
    </div>
  )
}
