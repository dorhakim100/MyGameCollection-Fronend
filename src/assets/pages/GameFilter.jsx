import { useEffect, useState, useRef } from 'react'

import { setFilterBy } from '../../store/actions/game.actions.js'

import '../css/GameFilter.css'

export function GameFilter({ filterBy }) {
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
  const [isFiltering, setIsFiltering] = useState(false)
  const [isStock, setIsStock] = useState(false)

  const [onFilterBy, setOnFilterBy] = useState(filterBy)

  //   const isCheckRef = useRef()

  useEffect(() => {
    console.log(onFilterBy)
    setFilterBy(onFilterBy)
  }, [onFilterBy])

  function onSetIsFiltering() {
    setIsFiltering((prevIsFiltering) => (prevIsFiltering = !prevIsFiltering))
  }

  function onIsSetStock() {
    console.log(isStock)
    const currentOnlyIsStock = !isStock
    if (currentOnlyIsStock) {
      console.log('works')
      setOnFilterBy({ ...onFilterBy, inStock: 'onlyInStock' })
    } else {
      setOnFilterBy({ ...onFilterBy, inStock: 'all' })
    }
    setIsStock(currentOnlyIsStock)
  }

  return (
    <div className='filtering-container'>
      <button
        className='is-filtering-button'
        onClick={() => onSetIsFiltering()}
      >
        Filter
      </button>
      <input
        className='is-filtering-checkbox'
        type='checkbox'
        name=''
        id='filter'
        checked={isFiltering}
        // ref={isCheckRef}
      />

      <div className='game-filter'>
        <button className='x-button' onClick={() => onSetIsFiltering()}>
          X
        </button>
        <h3>Filter</h3>
        <div className='text-container'>
          <label htmlFor='name'>Game Title:</label>
          <input type='search' id='name' />
        </div>
        <div className='price-container'>
          <label htmlFor='price'>Max Price</label>
          <input type='range' id='price' min={1} max={150} />
        </div>
        <div className='in-stock-container'>
          <label htmlFor='stock'>Only In Stock</label>
          <input
            onClick={() => onIsSetStock()}
            type='checkbox'
            name=''
            id='stock'
            checked={isStock}
          />
        </div>
        <h4>Company:</h4>
        <div className='companies-container'>
          {companies.map((company) => {
            return (
              <div className='transparent-checkbox company-container'>
                <label htmlFor={company}>{company}</label>
                <input type='checkbox' name='' id={company} />
              </div>
            )
          })}
        </div>
        <h4>Categories:</h4>
        <div className='labels-container'>
          {labels.map((label) => {
            return (
              <div className='transparent-checkbox label-container'>
                <label htmlFor={label}>{label}</label>
                <input type='checkbox' name='' id={label} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
// return { txt: '', maxPrice: '', labels: [], inStock: 'all', company: 'all' }
