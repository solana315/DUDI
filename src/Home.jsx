import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: '#f6f2ea' }} className="min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="container text-center">
        <span className="d-block text-uppercase small fw-bold mb-2" style={{ color: '#c98a5e', letterSpacing: '0.28em' }}>
          para ti
        </span>
        <h1 className="fw-bold mb-5">o que queres ver?</h1>

        <div className="row g-4 justify-content-center">
          <div className="col-10 col-sm-5 col-md-4">
            <button
              className="btn w-100 py-4 fw-semibold fs-5 rounded-4 border-0 shadow-sm"
              style={{ backgroundColor: '#ffd1dc', color: '#7a2e40' }}
              onClick={() => navigate('/dudi')}
            >
              Ver pedido de Valentim 2026
            </button>
          </div>

          <div className="col-10 col-sm-5 col-md-4">
            <button
              className="btn w-100 py-4 fw-semibold fs-5 rounded-4 border-0 shadow-sm"
              style={{ backgroundColor: '#ddcdb8', color: '#4a3b2a' }}
              onClick={() => navigate('/galeria')}
            >
              Ver recordações
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}