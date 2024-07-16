import { useDispatch, useSelector } from 'react-redux'

import { Link, useParams, useNavigate } from 'react-router-dom'

import { useEffect, useState } from 'react'

import { gameService } from '../../services/game.service.js'
import { saveGame } from '../../store/actions/game.actions.js'
import { loadGames } from '../../store/actions/game.actions.js'

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
  const navigate = useNavigate()

  const [game, setGame] = useState({ labels: [], companies: [] })
  const [editGame, setEditGame] = useState(game)

  const filterBy = useSelector(
    (selectorState) => selectorState.gameModule.filterBy
  )

  useEffect(() => {
    console.log(game)
    loadGame()
  }, [params.gameId])

  function loadGame() {
    gameService
      .getById(params.gameId)
      .then((game) => {
        setEditGame({ ...game })
        setGame({ ...game })
      })
      .catch((err) => {
        console.error('err:', err)
        showErrorMsg('Cannot load game')
        navigate('/game')
      })
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    let checkedButton = target.id

    let newCompanies = []
    let newLabels = []

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        if (field === 'companies') {
          if (editGame.companies.includes(checkedButton)) {
            const idx = editGame.companies.findIndex(
              (company) => company === checkedButton
            )
            editGame.companies.splice(idx, 1)
            newCompanies = editGame.companies
          } else {
            newCompanies = editGame.companies.push(checkedButton)
          }
          setEditGame({ ...editGame, newCompanies })
        }
        if (field === 'labels') {
          if (editGame.labels.includes(checkedButton)) {
            const idx = editGame.labels.findIndex(
              (label) => label === checkedButton
            )
            editGame.labels.splice(idx, 1)
            newLabels = editGame.labels
          } else {
            newLabels = editGame.labels.push(checkedButton)
          }
          setEditGame({ ...editGame, newLabels })
        }
        return
        break

      default:
        break
    }

    setEditGame({ ...editGame, [field]: value })
  }

  function onSaveGame(ev) {
    ev.preventDefault()
    const { name, price, labels, companies } = editGame
    // todoService.save(todoToEdit)
    saveGame(editGame)
      .then((savedTodo) => {
        console.log(savedTodo)
        loadGames(filterBy).then(() => {
          navigate(`/game/${game._id}`)
        })
      })
      .catch((err) => {
        showErrorMsg('Cannot save todo')
        console.log('err:', err)
      })
  }

  return (
    <section className='section-container'>
      {/* {game && <h2>Edit{` - ${game.name}`}</h2>} */}
      {game && <img src={game.cover} alt='' className='game-cover-edit' />}

      <form action='' className='game-edit-form' onSubmit={onSaveGame}>
        <div>
          <label htmlFor=''>Game Title:</label>
          <input
            onChange={handleChange}
            name='name'
            type='text'
            value={editGame.name}
            style={{ width: 200 }}
          />
        </div>
        <div>
          <label htmlFor=''>Game Price:</label>
          <input
            name='price'
            onChange={handleChange}
            type='number'
            value={editGame.price}
            style={{ width: 50 }}
          />
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
                    onChange={handleChange}
                    type='checkbox'
                    checked={editGame.companies.includes(company)}
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
                    onChange={handleChange}
                    checked={editGame.labels.includes(label)}
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
