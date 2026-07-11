import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sim from './Sim.jsx'
import img5 from './assets/img5.jpeg'
import backIcon from './assets/11541959.png'

const styles = `
  img[data-polaroid="true"] {
    width: clamp(100px, 30vw, 200px) !important;
    height: clamp(100px, 30vw, 200px) !important;
  }
  
  .polaroid-card {
    padding: clamp(0.75rem, 4vw, 2rem) !important;
  }
  
  .polaroid-card h1 {
    font-size: clamp(1rem, 5vw, 2rem) !important;
    margin-bottom: clamp(0.5rem, 2vw, 1rem) !important;
  }
  
  .polaroid-card p.fs-3 {
    font-size: clamp(0.75rem, 3vw, 1.5rem) !important;
    margin-bottom: clamp(0.5rem, 2vw, 1rem) !important;
  }
  
  .polaroid-card .btn {
    padding: clamp(0.35rem, 1.5vw, 0.5rem) clamp(0.5rem, 2vw, 1rem) !important;
    font-size: clamp(0.75rem, 2vw, 1rem) !important;
  }
  
  @media (max-width: 700px) {
    .container-md {
      width: 90% !important;
      max-width: 90% !important;
    }
  }
`

export default function Dudi() {
  const navigate = useNavigate()
  const [showSim, setShowSim] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const moveButton = () => {
    const buttonWidth = 120
    const buttonHeight = 50
    const marginBottom = 150
    const maxX = (window.innerWidth - buttonWidth) / 2
    const maxY = (window.innerHeight - buttonHeight - marginBottom) / 2
    const randomX = Math.floor(Math.random() * maxX * 2 - maxX)
    const randomY = Math.floor(Math.random() * maxY - maxY * 0.5)
    setPosition({ x: randomX, y: randomY })
  }

  const handleClickSim = () => {
    setShowModal(true)
  }

  if (showSim) {
    return <Sim onVoltar={() => setShowSim(false)} />
  }


  return (
    <>
      <style>{styles}</style>
      <div style={{backgroundColor: '#FFD1DC', overflow: 'hidden'}} className="min-vh-100 d-flex align-items-center justify-content-center">
      <button 
        className="btn position-fixed top-0 start-0 m-3 rounded-circle" 
        onClick={() => navigate('/')}
        style={{zIndex: 1000, width: '55px', height: '55px', padding: 0, border: 'none', backgroundColor: 'transparent'}}
      >
        <img src={backIcon} alt="Voltar" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
      </button>
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            maxWidth: '500px',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '28px',
                cursor: 'pointer',
                color: '#999',
                padding: '0',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
            <h2 className="text-danger mb-3">Não eras capaz de recusar</h2>
            <p className="fs-5 text-dark mb-4">Fico contente e á espera de um jantar fora bebe &lt;3</p>
            <button 
              className="btn btn-danger btn-lg"
              onClick={() => setShowSim(true)}
            >
              Avançar
            </button>
          </div>
        </div>
      )}
      
      <div className="container-md" style={{position: 'relative'}}>
        <div className="bg-white rounded-5 shadow-lg p-5 polaroid-card">
          <div className="text-center mb-4">
            <img src={img5} alt="Foto" data-polaroid="true" style={{width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover'}} />
          </div>
          <h1 className="text-center mb-4 text-dark">Dudi Badudi</h1>
          <p className="text-center text-secondary mb-4 fs-3">Queres ser o meu Valentim?</p>
          <div className="text-center d-flex gap-3 justify-content-center">
            <button className="btn btn-danger btn-lg" onClick={handleClickSim}>
              Sim amor da minha vida
            </button>
            <button 
              className="btn btn-secondary btn-lg" 
              onClick={moveButton}
              onMouseEnter={moveButton}
              onTouchStart={moveButton}
              style={{
                position: 'relative',
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: 'transform 0.3s ease'
              }}
            >
              Não
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}