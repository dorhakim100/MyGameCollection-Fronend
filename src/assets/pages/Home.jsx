import ps5ControllerWhite from '/ps.png'
import nintendoSwitchWhite from '/switch.png'
import xboxControllerWhite from '/xbox.png'
import ps5ControllerBlack from '/ps5Black.svg'
import nintendoSwitchBlack from '/switchBlack.svg'
import xboxControllerBlack from '/xboxBlack.svg'

import '../css/Home.css'

export function Home() {
  return (
    <section>
      <h2>Hello</h2>
      <div className='controllers-container'>
        <img src={ps5ControllerWhite} className='logo' alt='' />
        <img src={nintendoSwitchWhite} className='logo' alt='' />
        <img src={xboxControllerWhite} className='logo' alt='' />
      </div>
    </section>
  )
}
