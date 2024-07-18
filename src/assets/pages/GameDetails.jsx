import { useDispatch, useSelector } from 'react-redux'

import { Link, useParams, useNavigate } from 'react-router-dom'

import { useEffect, useState } from 'react'

import { gameService } from '../../services/game.service.js'
import { removeGame } from '../../store/actions/game.actions.js'

import gameCover from '/game-cover.jpg'

import '../css/GameDetails.css'
import { showSuccessMsg } from '../../services/event-bus.service.js'
import { showErrorMsg } from '../../services/event-bus.service.js'

export function GameDetails() {
  const params = useParams()
  const navigate = useNavigate()

  const [game, setGame] = useState({ labels: [], companies: [] })

  useEffect(() => {
    console.log(game)
    loadGame()
  }, [params.gameId])

  function loadGame() {
    gameService
      .getById(params.gameId)
      .then((game) => {
        console.log(game)
        setGame({ ...game })
      })
      .catch((err) => {
        console.error('err:', err)
        showErrorMsg('Cannot load game')
        navigate('/game')
      })
  }

  function onRemoveGame(gameId) {
    console.log(gameId)
    removeGame(gameId)
      .then(() => {
        showSuccessMsg('Deleted game')
        navigate('/game')
      })
      .catch((err) => {
        console.error('err:', err)
        showErrorMsg('Cannot delete game')
      })
  }
  return (
    <section className='section-container game-details'>
      <div className='buttons-container'>
        <button>
          <Link to={`/game`} className='back-button'>
            <i className='fa-solid fa-rotate-left'></i>
          </Link>
        </button>
        <button>
          <Link to={`/game/edit/${game._id}`}>
            <i className='fa-solid fa-pen-to-square'></i>
          </Link>
        </button>
      </div>
      {!game.inStock && <span className='unavailable'>OUT OF STOCK</span>}
      <div className='cover-container'>
        <button
          onClick={() => onRemoveGame(game._id)}
          className='fa-solid fa-trash'
        ></button>
        <img className='game-details-cover' src={game.cover} alt='' />
      </div>
      <h2>{game.name}</h2>
      <h3>{game.price}$</h3>
      <p>{game.preview}</p>
      {/* {game.company.map((company) => {
        return <h4>{company}</h4>
      })} */}
      <h3>Categories:</h3>
      <div className='labels-container'>
        {game.labels.map((label) => {
          return <span key={label}>{label}</span>
        })}
      </div>
      <div className='nav-buttons-container'>
        <button>Previous</button>
        <button>Next</button>
      </div>
    </section>
  )
}
