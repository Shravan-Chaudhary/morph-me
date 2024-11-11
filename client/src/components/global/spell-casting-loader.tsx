import React from 'react'

// Define custom CSS properties interface
interface CustomCSSProperties extends React.CSSProperties {
  '--delay'?: string
  '--orbit-radius'?: string
  '--float-x1'?: string
  '--float-y1'?: string
  '--float-x2'?: string
  '--float-y2'?: string
  '--float-x3'?: string
  '--float-y3'?: string
}

const SpellcastingLoader: React.FC = () => {
  return (
    <div className='flex items-center justify-center w-full h-64'>
      <div className='relative w-32 h-32 rounded-full bg-gradient-to-br from-pink-50 via-violet-50 to-cyan-50 shadow-xl flex items-center justify-center border border-pink-100/30 backdrop-blur-sm'>
        <div className='absolute w-full h-full rounded-full bg-gradient-to-tr from-pink-100/20 via-purple-100/10 to-blue-100/20 blur-sm'></div>
        <div className='relative w-24 h-24'>
          <svg
            width='100%'
            height='100%'
            viewBox='-12 -12 48 48'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <style>
              {`
                @keyframes spellcastMotion {
                  0% { transform: translate(0, 0) rotate(15deg) scale(1); }
                  25% { transform: translate(2px, -2px) rotate(25deg) scale(0.95); }
                  50% { transform: translate(0, -4px) rotate(15deg) scale(0.9); }
                  75% { transform: translate(-2px, -2px) rotate(5deg) scale(0.95); }
                  100% { transform: translate(0, 0) rotate(15deg) scale(1); }
                }

                @keyframes orbitMotion {
                  0% {
                    transform: rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg);
                  }
                  33% {
                    transform: rotate(120deg) translateX(calc(var(--orbit-radius) * 1.2)) rotate(-120deg);
                  }
                  66% {
                    transform: rotate(240deg) translateX(var(--orbit-radius)) rotate(-240deg);
                  }
                  100% {
                    transform: rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg);
                  }
                }

                @keyframes floatOffset {
                  0% {
                    transform: translate(0, 0);
                  }
                  25% {
                    transform: translate(var(--float-x1), var(--float-y1));
                  }
                  50% {
                    transform: translate(var(--float-x2), var(--float-y2));
                  }
                  75% {
                    transform: translate(var(--float-x3), var(--float-y3));
                  }
                  100% {
                    transform: translate(0, 0);
                  }
                }

                @keyframes sparkleEffect {
                  0% {
                    stroke: #FFD700;
                    filter: drop-shadow(0 0 2px #FFD700);
                    scale: 0.9;
                    opacity: 0.9;
                  }
                  25% {
                    stroke: #FFC125;
                    filter: drop-shadow(0 0 4px #FFC125);
                    scale: 1.1;
                    opacity: 1;
                  }
                  50% {
                    stroke: #FFD700;
                    filter: drop-shadow(0 0 3px #FFD700);
                    scale: 0.95;
                    opacity: 0.95;
                  }
                  75% {
                    stroke: #FFE55C;
                    filter: drop-shadow(0 0 3px #FFE55C);
                    scale: 1.05;
                    opacity: 1;
                  }
                  100% {
                    stroke: #FFD700;
                    filter: drop-shadow(0 0 2px #FFD700);
                    scale: 0.9;
                    opacity: 0.9;
                  }
                }

                @keyframes wandGlow {
                  0% {
                    stroke: #2D3436;
                    filter: drop-shadow(0 0 2px rgba(45, 52, 54, 0.5));
                  }
                  50% {
                    stroke: #636E72;
                    filter: drop-shadow(0 0 3px rgba(99, 110, 114, 0.6));
                  }
                  100% {
                    stroke: #2D3436;
                    filter: drop-shadow(0 0 2px rgba(45, 52, 54, 0.5));
                  }
                }

                .wand {
                  transform-origin: 4px 6px;
                  animation: spellcastMotion 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }

                .wand path {
                  animation: wandGlow 2s ease-in-out infinite;
                }

                .particle-container {
                  transform-origin: center;
                  animation: floatOffset 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                  animation-delay: calc(var(--delay) * -1s);
                }

                .magical-particle {
                  transform-origin: center;
                  animation: orbitMotion 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                  animation-delay: calc(var(--delay) * -1s);
                }

                .sparkle-effect {
                  animation: sparkleEffect 2s ease-in-out infinite;
                  animation-delay: calc(var(--delay) * -1s);
                }
              `}
            </style>

            <g className='wand' transform='translate(4, 6) rotate(15)'>
              <path
                d='M3.84453 7.92226C2.71849 6.79623 2.71849 4.97056 3.84453 3.84453C4.97056 2.71849 6.79623 2.71849 7.92226 3.84453L20.1555 16.0777C21.2815 17.2038 21.2815 19.0294 20.1555 20.1555C19.0294 21.2815 17.2038 21.2815 16.0777 20.1555L3.84453 7.92226Z'
                strokeWidth='1.5'
              />
              <path
                opacity='0.7'
                d='M6 10L10 6'
                strokeWidth='1.5'
                strokeLinecap='round'
              />
            </g>

            {[...Array(5)].map((_, i) => {
              const delay = i * 0.3
              const angle = (i * Math.PI * 2) / 5
              const floatDistance = 2.5

              const containerStyle: CustomCSSProperties = {
                '--delay': `${delay}`,
                '--float-x1': `${Math.cos(angle) * floatDistance}px`,
                '--float-y1': `${Math.sin(angle) * floatDistance}px`,
                '--float-x2': `${
                  Math.cos(angle + Math.PI / 2) * floatDistance
                }px`,
                '--float-y2': `${
                  Math.sin(angle + Math.PI / 2) * floatDistance
                }px`,
                '--float-x3': `${Math.cos(angle + Math.PI) * floatDistance}px`,
                '--float-y3': `${Math.sin(angle + Math.PI) * floatDistance}px`,
                transform: `translate(24px, 10px)`,
              }

              const particleStyle: CustomCSSProperties = {
                '--orbit-radius': `${4 + Math.sin(i * 1.5) * 0.8}px`,
                '--delay': `${delay}`,
              }

              const sparkleStyle: CustomCSSProperties = {
                '--delay': `${delay}`,
              }

              return (
                <g
                  key={i}
                  className='particle-container'
                  style={containerStyle}
                >
                  <g className='magical-particle' style={particleStyle}>
                    <path
                      className='sparkle-effect'
                      d='M0 -2L0.5 -0.5L2 0L0.5 0.5L0 2L-0.5 0.5L-2 0L-0.5 -0.5Z'
                      style={sparkleStyle}
                    />
                  </g>
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    </div>
  )
}

export default SpellcastingLoader
