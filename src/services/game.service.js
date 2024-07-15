import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'gameDB'

// localStorage.clear()

if (!localStorage.getItem(STORAGE_KEY)) {
  const demoData = createDemoData()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(demoData))
  // console.log(demoData)
}

export const gameService = {
  query,
  getById,
  save,
  remove,
  getEmptygame,
  getRandomgame,
  getDefaultFilter,
}

function query(filterBy = {}) {
  return storageService.query(STORAGE_KEY).then((games) => {
    if (!filterBy.txt) filterBy.txt = ''
    if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
    const regExp = new RegExp(filterBy.txt, 'i')
    return games.filter(
      (game) => regExp.test(game.vendor) && game.price <= filterBy.maxPrice
    )
  })
}

function getById(gameId) {
  return storageService.get(STORAGE_KEY, gameId)
}

function remove(gameId) {
  // return Promise.reject('Not now!')
  return storageService.remove(STORAGE_KEY, gameId)
}

function save(game) {
  if (game._id) {
    return storageService.put(STORAGE_KEY, game)
  } else {
    // when switching to backend - remove the next line
    game.owner = userService.getLoggedinUser()
    return storageService.post(STORAGE_KEY, game)
  }
}

function getEmptygame() {
  return {
    vendor: '',
    price: '',
  }
}

function getRandomgame() {
  return {
    vendor: 'Susita-' + (Date.now() % 1000),
    price: utilService.getRandomIntInclusive(1000, 9000),
  }
}

function getDefaultFilter() {
  return { txt: '', maxPrice: '', labels: [], inStock: 'all', company: 'all' }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))

function createDemoData() {
  const games = [
    {
      _id: 't101',
      name: 'Pokemon Gold',
      price: 123,
      labels: ['Adventure', 'RPG'],
      createdAt: 1631031801011,
      inStock: true,
      company: 'Nintendo',
      cover:
        'https://m.media-amazon.com/images/I/61X24yubIHL._AC_UF1000,1000_QL80_.jpg',
    },
    {
      _id: 't102',
      name: 'The Legend of Zelda: Breath of the Wild',
      price: 60,
      labels: ['Action', 'Adventure'],
      createdAt: 1631132802011,
      inStock: true,
      company: 'Nintendo',
      cover:
        'https://m.media-amazon.com/images/I/81KGsbq8ekL._AC_UF1000,1000_QL80_.jpg',
    },
    {
      _id: 't103',
      name: 'Super Mario Odyssey',
      price: 50,
      labels: ['Platformer', 'Adventure'],
      createdAt: 1631233803011,
      inStock: false,
      company: 'Nintendo',
      cover: 'https://m.media-amazon.com/images/I/91SF0Tzmv4L.jpg',
    },
    {
      _id: 't104',
      name: `Pokemon Let's Go Pikachu`,
      price: 30,
      labels: ['Adventure', 'RPG'],
      createdAt: 1631334804011,
      inStock: true,
      company: ['Nintendo'],
      cover:
        'https://m.media-amazon.com/images/I/71w18E60zzL._AC_UF1000,1000_QL80_.jpg',
    },
    {
      _id: 't105',
      name: 'Fortnite',
      price: 0,
      labels: ['Battle Royale', 'Shooter'],
      createdAt: 1631435805011,
      inStock: true,
      company: ['Microsoft', 'Sony', 'Nintendo'],
      cover:
        'https://m.media-amazon.com/images/M/MV5BNzU2YTY2OTgtZGZjZi00MTAyLThlYjUtMWM5ZmYzOGEyOWJhXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_FMjpg_UX1000_.jpg',
    },
    {
      _id: 't106',
      name: 'Call of Duty: Modern Warfare REMASTERED',
      price: 60,
      labels: ['Shooter', 'Action'],
      createdAt: 1631536806011,
      inStock: false,
      company: ['Microsoft', 'Sony'],
      cover:
        'https://upload.wikimedia.org/wikipedia/en/d/d4/Call_of_Duty_-_Modern_Warfare_Remastered.jpeg',
    },
    {
      _id: 't107',
      name: 'Animal Crossing: New Horizons',
      price: 50,
      labels: ['Simulation', 'Social'],
      createdAt: 1631637807011,
      inStock: true,
      company: 'Nintendo',
      cover:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcSC-Jwca7M-Svlw1C49HwQsNa5QscJqSrcw&s',
    },
    {
      _id: 't108',
      name: 'Among Us',
      price: 5,
      labels: ['Party', 'Social Deduction'],
      createdAt: 1631738808011,
      inStock: true,
      company: 'Nintendo',
      cover:
        'https://upload.wikimedia.org/wikipedia/en/9/9a/Among_Us_cover_art.jpg',
    },
    {
      _id: 't109',
      name: 'Hades',
      price: 25,
      labels: ['Roguelike', 'Action'],
      createdAt: 1631839809011,
      inStock: false,
      company: ['Nintendo', 'Sony', 'Microsoft'],
      cover:
        'https://upload.wikimedia.org/wikipedia/en/c/cc/Hades_cover_art.jpg',
    },
    {
      _id: 't110',
      name: 'Cyberpunk 2077',
      price: 60,
      labels: ['RPG', 'Action'],
      createdAt: 1631940810011,
      inStock: true,
      company: ['Sony', 'Microsoft'],
      cover:
        'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg',
    },
    {
      _id: 't111',
      name: 'Spider-Man: Miles Morales',
      price: 50,
      labels: ['Action', 'Adventure'],
      createdAt: 1632041811011,
      inStock: true,
      company: 'Sony',
      cover:
        'https://image.api.playstation.com/vulcan/ap/rnd/202008/1020/PRfYtTZQsuj3ALrBXGL8MjAH.jpg',
    },
    {
      _id: 't112',
      name: 'Halo Infinite',
      price: 60,
      labels: ['Shooter', 'Action'],
      createdAt: 1632142812011,
      inStock: true,
      company: 'Microsoft',
      cover: 'https://upload.wikimedia.org/wikipedia/en/1/14/Halo_Infinite.png',
    },
    {
      _id: 't113',
      name: 'The Last of Us Part II REMASTERED',
      price: 60,
      labels: ['Action', 'Adventure'],
      createdAt: 1632243813011,
      inStock: false,
      company: 'Sony',
      cover:
        'https://m.media-amazon.com/images/I/818m9WGY0lL._AC_UF1000,1000_QL80_.jpg',
    },
    {
      _id: 't114',
      name: 'Ghost of Tsushima',
      price: 60,
      labels: ['Action', 'Adventure'],
      createdAt: 1632344814011,
      inStock: true,
      company: 'Sony',
      cover:
        'https://upload.wikimedia.org/wikipedia/en/b/b6/Ghost_of_Tsushima.jpg',
    },
    {
      _id: 't115',
      name: 'Gears 5',
      price: 50,
      labels: ['Shooter', 'Action'],
      createdAt: 1632445815011,
      inStock: true,
      company: 'Microsoft',
      cover:
        'https://store-images.s-microsoft.com/image/apps.10933.65494054591008504.4eae27ba-1cfe-4af2-950a-4af81f8cd22a.b5b2909d-8884-48d0-b25a-68d6518c9b73',
    },
    {
      _id: 't116',
      name: 'Super Smash Bros. Ultimate',
      price: 60,
      labels: ['Fighting', 'Party'],
      createdAt: 1632546816011,
      inStock: true,
      company: 'Nintendo',
      cover:
        'https://m.media-amazon.com/images/I/81aJ-R4E6gL._AC_UF1000,1000_QL80_.jpg',
    },
    {
      _id: 't117',
      name: 'Mario Kart 8 Deluxe',
      price: 60,
      labels: ['Racing', 'Party'],
      createdAt: 1632647817011,
      inStock: false,
      company: 'Nintendo',
      cover:
        'https://m.media-amazon.com/images/I/51uY0eZg+IS._SY445_SX342_.jpg',
    },
  ]
  return games
}
