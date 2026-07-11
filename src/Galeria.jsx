import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import backIcon from './assets/11541959.png'
import PolaroidModal from './components/PolaroidModal.jsx'
import { memories } from './components/Memories.jsx'

const PAGE_SIZE = 12

export default function Galeria() {
  const navigate = useNavigate()
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [selectedMemory, setSelectedMemory] = useState(null)
  const visibleMemories = memories.slice(0, visibleCount)
  const hasMore = visibleCount < memories.length

  const checkerStyle = {
    backgroundColor: '#e9ecef',
    backgroundImage: 'repeating-conic-gradient(#e0dcd3 0% 25%, #f4f1ea 0% 50%)',
    backgroundSize: '16px 16px',
  }

  return (
    <div style={{ backgroundColor: '#FFD1DC' }} className="min-vh-100 py-5">
      <button
        className="btn position-fixed top-0 start-0 m-3 rounded-circle"
        onClick={() => navigate('/')}
        style={{ zIndex: 1000, width: '55px', height: '55px', padding: 0, border: 'none', backgroundColor: 'transparent' }}
      >
        <img src={backIcon} alt="Voltar" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </button>

      <PolaroidModal memory={selectedMemory} onClose={() => setSelectedMemory(null)} />

      <div className="container">
        <div className="text-center mb-5">
          <span className="d-block text-uppercase small fw-bold mb-2 text-danger" style={{ letterSpacing: '0.28em' }}>
            memórias
          </span>
          <h1 className="fw-bold mb-3 text-dark">a minha galeria</h1>
          <p className="mx-auto fst-italic fs-5 text-secondary" style={{ maxWidth: '380px' }}>
            cada polaroid guarda um pedacinho de um dia que valeu a pena lembrar.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {visibleMemories.map((memory) => (
            <div className="col-6 col-md-4 col-lg-3" key={memory.id}>
              <div
                className="bg-white rounded-4 shadow-lg p-2 h-100"
                onClick={() => setSelectedMemory(memory)}
                style={{ cursor: 'pointer' }}
              >
                <div className="ratio ratio-4x3 mb-2 rounded-3 overflow-hidden" style={checkerStyle}>
                  {memory.images[0] && (
                    <img src={memory.images[0]} alt={memory.caption} className="object-fit-cover" />
                  )}
                </div>
                <p className="fw-semibold mb-1 text-dark">{memory.caption}</p>
                <small className="text-secondary">{memory.date}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          {hasMore && (
            <button
              className="btn btn-danger btn-lg rounded-pill px-4 py-2 fw-semibold"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            >
              ver mais memórias
            </button>
          )}
        </div>
      </div>
    </div>
  )
}