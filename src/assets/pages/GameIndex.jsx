import { useDispatch, useSelector } from 'react-redux'
// import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { useEffect } from 'react'

import { loadGames } from '../../store/actions/game.actions.js'

import { GameFilter } from './GameFilter.jsx'

import { setFilterBy } from '../../store/actions/game.actions.js'

import gameCover from '/game-cover.jpg'

import '../css/GameIndex.css'

export function GameIndex() {
  const games = useSelector((storeState) => storeState.gameModule.games)
  const filterBy = useSelector((storeState) => storeState.gameModule.filterBy)

  console.log(games)

  useEffect(() => {
    loadGames()
  }, [])

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  return (
    <section className='section-container'>
      <GameFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <h2>My Games</h2>
      <div className='games-container'>
        {games.map((game) => {
          return (
            <div key={game._id} className='game-container'>
              <Link to={`/game/${game._id}`}>
                <div className='hover-shadow'></div>
                <div className='game-name-container'>
                  <h3 className='game-name'>{game.name}</h3>
                </div>
                {!game.inStock && (
                  <span className='unavailable'>UNAVAILABLE</span>
                )}

                <img className='game-cover' src={gameCover} alt='' />
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
