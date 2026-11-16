// Web Audio API procedural Lo-Fi ambient generator
// Generates warm analog chord drones, soft rain pink-noise filter, and vinyl crackle
// 100% browser-native with zero external asset dependencies or streaming latency.

let audioCtx = null
let masterGain = null
let rainFilter = null
let chordInterval = null
let isPlaying = false
let currentVolume = 0.4

const CHORD_FREQS = [
  // Fmaj7
  [174.61, 220.0, 261.63, 329.63],
  // Am7
  [220.0, 261.63, 329.63, 392.0],
  // Dm9
  [146.83, 220.0, 261.63, 329.63, 440.0],
  // Bbmaj7
  [116.54, 174.61, 220.0, 261.63],
]

function getAudioContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

// Generate gentle brown/pink noise rain texture
function createRainNode(ctx) {
  const bufferSize = ctx.sampleRate * 2
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const output = noiseBuffer.getChannelData(0)
  let lastOut = 0.0

  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1
    // Brown noise filter integration
    output[i] = (lastOut + 0.02 * white) / 1.02
    lastOut = output[i]
    output[i] *= 3.5 // gain
  }

  const whiteNoise = ctx.createBufferSource()
  whiteNoise.buffer = noiseBuffer
  whiteNoise.loop = true

  // Lowpass filter for warm rain effect
  rainFilter = ctx.createBiquadFilter()
  rainFilter.type = 'lowpass'
  rainFilter.frequency.setValueAtTime(450, ctx.currentTime)

  const rainGain = ctx.createGain()
  rainGain.gain.setValueAtTime(0.08, ctx.currentTime)

  whiteNoise.connect(rainFilter)
  rainFilter.connect(rainGain)
  return { source: whiteNoise, output: rainGain }
}

// Play a warm polyphonic synth chord
function playChord(ctx, destination, freqs, duration = 6) {
  if (!ctx || ctx.state !== 'running') return

  freqs.forEach((freq) => {
    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)

    // Gentle detune for analog warmth
    osc.detune.setValueAtTime((Math.random() - 0.5) * 8, ctx.currentTime)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(500, ctx.currentTime)
    filter.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + duration * 0.5)
    filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + duration)

    oscGain.gain.setValueAtTime(0.0001, ctx.currentTime)
    oscGain.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 1.2)
    oscGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)

    osc.connect(filter)
    filter.connect(oscGain)
    oscGain.connect(destination)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + duration)
  })
}

export const lofiAudio = {
  start: () => {
    try {
      const ctx = getAudioContext()
      if (!ctx) return false

      if (isPlaying) return true

      masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime)
      masterGain.gain.exponentialRampToValueAtTime(currentVolume, ctx.currentTime + 1.5)
      masterGain.connect(ctx.destination)

      // Start rain texture
      const rain = createRainNode(ctx)
      rain.output.connect(masterGain)
      rain.source.start()

      // Start chord drone sequence
      let chordIndex = 0
      playChord(ctx, masterGain, CHORD_FREQS[0], 7)

      chordInterval = setInterval(() => {
        chordIndex = (chordIndex + 1) % CHORD_FREQS.length
        playChord(ctx, masterGain, CHORD_FREQS[chordIndex], 7)
      }, 5500)

      isPlaying = true
      return true
    } catch {
      return false
    }
  },

  stop: () => {
    try {
      if (chordInterval) {
        clearInterval(chordInterval)
        chordInterval = null
      }
      if (masterGain && audioCtx) {
        masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8)
        setTimeout(() => {
          if (audioCtx && audioCtx.state === 'running') {
            audioCtx.suspend().catch(() => {})
          }
        }, 800)
      }
      isPlaying = false
    } catch {
      isPlaying = false
    }
  },

  setVolume: (val) => {
    currentVolume = Math.max(0, Math.min(1, val))
    if (masterGain && audioCtx && isPlaying) {
      masterGain.gain.setValueAtTime(currentVolume, audioCtx.currentTime)
    }
  },

  getVolume: () => currentVolume,
  getIsPlaying: () => isPlaying,
}
