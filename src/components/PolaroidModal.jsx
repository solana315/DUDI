import { useState, useRef, useEffect } from 'react'

export default function PolaroidModal({ memory, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const dragStartX = useRef(null)
  const dragStartY = useRef(null)
  const dragDirection = useRef(null) // 'horizontal' | 'vertical' | null
  const [dragOffset, setDragOffset] = useState(0)
  const carouselRef = useRef(null)

  const isFirst = currentIndex === 0
  const isLast = memory ? currentIndex === memory.images.length - 1 : true

  // Tranca o scroll da página de fundo enquanto o modal está aberto
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    const originalTouchAction = document.body.style.touchAction
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.touchAction = originalTouchAction
    }
  }, [])

  const goToIndex = (index) => {
    if (!memory) return
    const max = memory.images.length - 1
    const clamped = Math.max(0, Math.min(max, index))
    setCurrentIndex(clamped)
  }

  const handleDragStart = (clientX, clientY) => {
    dragStartX.current = clientX
    dragStartY.current = clientY
    dragDirection.current = null
  }

  const handleDragMove = (clientX, clientY, nativeEvent) => {
    if (dragStartX.current === null) return

    const deltaX = clientX - dragStartX.current
    const deltaY = clientY - dragStartY.current

    // Decide a direção do gesto assim que houver movimento suficiente
    if (dragDirection.current === null) {
      if (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8) return
      dragDirection.current = Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical'
    }

    // Se for gesto vertical, não interferimos (deixa o browser fazer o que quiser,
    // já que o body está trancado, isto simplesmente ignora o drag)
    if (dragDirection.current === 'vertical') {
      return
    }

    // Gesto horizontal: impede o scroll/refresh nativo do browser
    if (nativeEvent && nativeEvent.cancelable) {
      nativeEvent.preventDefault()
    }

    let offset = deltaX
    if (isFirst && offset > 0) offset = 0
    if (isLast && offset < 0) offset = 0

    setDragOffset(offset)
  }

  const handleDragEnd = () => {
    if (dragStartX.current === null) return
    const threshold = 60

    if (dragDirection.current === 'horizontal') {
      if (dragOffset < -threshold && !isLast) {
        goToIndex(currentIndex + 1)
      } else if (dragOffset > threshold && !isFirst) {
        goToIndex(currentIndex - 1)
      }
    }

    dragStartX.current = null
    dragStartY.current = null
    dragDirection.current = null
    setDragOffset(0)
  }

  // Listener de touchmove nativo com { passive: false } para o preventDefault funcionar
  useEffect(() => {
    const el = carouselRef.current
    if (!el) return

    const onTouchMove = (e) => {
      const touch = e.touches[0]
      handleDragMove(touch.clientX, touch.clientY, e)
    }

    el.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => el.removeEventListener('touchmove', onTouchMove)
  }, [currentIndex, dragOffset, isFirst, isLast])

  if (!memory) return null

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
        padding: '20px',
        overscrollBehavior: 'contain'
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
          ref={carouselRef}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            maxWidth: '100%',
            maxHeight: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: memory.images.length > 1 ? 'grab' : 'default',
            touchAction: memory.images.length > 1 ? 'pan-y' : 'auto',
            userSelect: 'none',
            overflow: 'hidden'
          }}
          onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
          onMouseMove={(e) => e.buttons === 1 && handleDragMove(e.clientX, e.clientY)}
          onMouseUp={handleDragEnd}
          onMouseLeave={() => dragStartX.current !== null && handleDragEnd()}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchEnd={handleDragEnd}
        >
          <div
            style={{
              display: 'flex',
              transform: `translateX(calc(${-(currentIndex / memory.images.length) * 100}% + ${dragOffset}px))`,
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
