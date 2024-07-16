import { useDispatch, useSelector } from 'react-redux'
// import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { useEffect } from 'react'

import { loadGames } from '../../store/actions/game.actions.js'

import { GameFilter } from './GameFilter.jsx'
import { GamesList } from './GamesList.jsx'

import { setFilterBy } from '../../store/actions/game.actions.js'
import { setIsLoadingFalse } from '../../store/actions/game.actions.js'
import { utilService } from '../../services/util.service.js'

import gameCover from '/game-cover.jpg'

import '../css/GameIndex.css'

export function GameIndex() {
  const games = useSelector((storeState) => storeState.gameModule.games)
  const isLoading = useSelector((storeState) => storeState.gameModule.isLoading)
  const filterBy = useSelector((storeState) => storeState.gameModule.filterBy)

  console.log(games)
  console.log(isLoading)

  useEffect(() => {
    console.log(filterBy)
    loadGames().then(() => {
      // setIsLoadingFalse(!isLoading)
    })
  }, [filterBy])

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  function onChangePageIdx(diff) {
    if (filterBy.pageIdx === 0 && diff === -1) return
    const newPageIdx = filterBy.pageIdx + diff
    setFilterBy({ ...filterBy, pageIdx: newPageIdx })
  }

  function onSort({ target }) {
    const newSortBy = target.value.replace(' ', '')

    setFilterBy({ ...filterBy, sortBy: newSortBy, pageIdx: 0 })
  }

  return (
    <section className='section-container'>
      <div className='game-index-user-interface'>
        <GameFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <h2>My Games</h2>

        <Link to={`/game/edit`}>
          <button>Add Game</button>
        </Link>
      </div>
      <label htmlFor='sortBy'>Sort By</label>
      <input
        onChange={onSort}
        list='sortOptions'
        name='sortOption'
        id='sortOption'
      />
      <datalist id='sortOptions'>
        <option>Name Descending</option>
        <option>Name Ascending</option>
        <option>Price Descending</option>
        <option>Price Ascending</option>
        <option>Time Descending</option>
        <option>Time Ascending</option>
      </datalist>
      {!isLoading && <GamesList games={games} />}

      <div className='page-container'>
        <button onClick={() => onChangePageIdx(-1)}>Previous</button>
        <span>{filterBy.pageIdx + 1}</span>
        <button onClick={() => onChangePageIdx(1)}>Next</button>
      </div>
    </section>
  )
}
