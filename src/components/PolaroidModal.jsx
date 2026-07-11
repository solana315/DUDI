import { useState, useRef } from 'react'

export default function PolaroidModal({ memory, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const dragStartX = useRef(null)
  const [dragOffset, setDragOffset] = useState(0)

  if (!memory) return null

  const isFirst = currentIndex === 0
  const isLast = currentIndex === memory.images.length - 1

  const goToIndex = (index) => {
    const max = memory.images.length - 1
    const clamped = Math.max(0, Math.min(max, index))
    setCurrentIndex(clamped)
  }

  const handleDragStart = (clientX) => {
    dragStartX.current = clientX
  }

  const handleDragMove = (clientX) => {
    if (dragStartX.current === null) return
    let offset = clientX - dragStartX.current

    // Impede completamente arrastar para além da primeira ou última foto
    if (isFirst && offset > 0) {
      offset = 0
    }
    if (isLast && offset < 0) {
      offset = 0
    }

    setDragOffset(offset)
  }

  const handleDragEnd = () => {
    if (dragStartX.current === null) return
    const threshold = 60

    // Só permite avançar/recuar se não estiver a tentar ultrapassar o limite
    if (dragOffset < -threshold && !isLast) {
      goToIndex(currentIndex + 1)
    } else if (dragOffset > threshold && !isFirst) {
      goToIndex(currentIndex - 1)
    }
    dragStartX.current = null
    setDragOffset(0)
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '20px'
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'none',
          border: 'none',
          fontSize: '32px',
          cursor: 'pointer',
          color: 'white',
          padding: '0',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2001
        }}
      >
        ×
      </button>

      {memory.images.length > 0 && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            maxWidth: '100%',
            maxHeight: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: memory.images.length > 1 ? 'grab' : 'default',
            touchAction: 'pan-y',
            userSelect: 'none',
            overflow: 'hidden'
          }}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => e.buttons === 1 && handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={() => dragStartX.current !== null && handleDragEnd()}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
        >
          <div
            style={{
              display: 'flex',
              transform: `translateX(calc(${-currentIndex * 100}% + ${dragOffset}px))`,
              transition: dragStartX.current === null ? 'transform 0.3s ease' : 'none'
            }}
          >
            {memory.images.map((img, i) => (
              <div
                key={i}
                style={{
                  width: '100vw',
                  maxWidth: '600px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <img
                  src={img}
                  alt=""
                  draggable={false}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '85vh',
                    objectFit: 'contain',
                    borderRadius: '12px'
                  }}
                />
              </div>
            ))}
          </div>

          {memory.images.length > 1 && (
            <div style={{
              position: 'absolute',
              bottom: '-30px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '6px'
            }}>
              {memory.images.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: i === currentIndex ? 'white' : 'rgba(255,255,255,0.4)'
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
