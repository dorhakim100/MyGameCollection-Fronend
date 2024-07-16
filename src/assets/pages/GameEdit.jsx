import { useDispatch, useSelector } from 'react-redux'

import { Link, useParams } from 'react-router-dom'

import { useEffect, useState } from 'react'

import { gameService } from '../../services/game.service.js'

import '../css/GameEdit.css'

export function GameEdit() {
  const labels = [
    'Adventure',
    'RPG',
    'Action',
    'Platformer',
    'Sandbox',
    'Survival',
    'Shooter',
    'Battle Royale',
    'Simulation',
    'Social',
    'Party',
    'Social Deduction',
    'Roguelike',
    'Fighting',
    'Racing',
  ]
  const companies = ['Sony', 'Nintendo', 'Microsoft']

  const params = useParams()

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
  return (
    <section className='section-container'>
      {/* {game && <h2>Edit{` - ${game.name}`}</h2>} */}
      {game && <img src={game.cover} alt='' className='game-cover-edit' />}

      <form action='' className='game-edit-form'>
        <div>
          <label htmlFor=''>Game Title:</label>
          <input type='text' value={game.name} style={{ width: 200 }} />
        </div>
        <div>
          <label htmlFor=''>Game Price:</label>
          <input type='number' value={game.price} style={{ width: 50 }} />
          <span>$</span>
        </div>
        <label htmlFor=''>Companies:</label>
        <div>
          <div className='companies-container'>
            {companies.map((company) => {
              return (
                <div className='transparent-checkbox company-container'>
                  <label htmlFor={company}>{company}</label>
                  <input
                    type='checkbox'
                    checked={game.companies.includes(company)}
                    name='companies'
                    id={company}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <label htmlFor=''>Categories:</label>
        <div>
          <div className='labels-container form'>
            {labels.map((label) => {
              return (
                <div className='transparent-checkbox label-container'>
                  <label htmlFor={label}>{label}</label>
                  <input
                    checked={game.labels.includes(label)}
                    type='checkbox'
                    name='labels'
                    id={label}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <input type='submit' value='Submit'></input>
      </form>
    </section>
  )
}
