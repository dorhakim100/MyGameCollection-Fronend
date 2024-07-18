import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'

import '../css/Cart.css'

import { userService } from '../../services/user.service.js'

export function Cart({ toggleCart }) {
  const user = useSelector(
    (stateSelector) => stateSelector.userModule.loggedInUser
  )
  // const cart = useSelector(
  //   (stateSelector) => stateSelector.userModule.shoppingCart
  // )

  const navigate = useNavigate()
  const initialValue = 0
  console.log(user)
  // console.log(cart)
  return (
    <div className='cart-container'>
      <i onClick={toggleCart} className='fa-solid fa-x x-button'></i>
      <h3>Cart</h3>
      <div className='games-in-cart-container'>
        {user.gamesInCart.map((game) => {
          return (
            <div className='cart-item-container'>
              <button>
                <i className='fa-solid fa-trash'></i>
              </button>
              <Link onClick={toggleCart} to={`/game/${game._id}`}>
                <div className='game-in-cart-container'>
                  <h4 className='game-text'>{game.name}</h4>

                  <img src={game.cover} alt='' />
                  <span>{game.price}$</span>
                </div>{' '}
              </Link>
            </div>
          )
        })}
      </div>
      <div className='sum-container'>
        <p>Subtotal:</p>
        <span>
          {user.gamesInCart.reduce(
            (accu, currentGame) => accu + currentGame.price,
            initialValue
          )}
          $
        </span>
      </div>
      <button>Clear Cart</button>
      <button>
        Checkout <i className='fa-solid fa-arrow-right'></i>
      </button>
    </div>
  )
}
