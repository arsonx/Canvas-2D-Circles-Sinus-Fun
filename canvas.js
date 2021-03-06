const canvas = document.getElementById('canvas')
const pCtx = canvas.getContext('2d')

const q = 25
const mf = 3
let frame = 0
let fps = 0
let tA = 0;

(function drawFrame () {
  const t = Date.now()
  requestAnimationFrame(drawFrame)

  const width = window.innerWidth
  const height = window.innerHeight

  const qwidth = width / q
  const qheight = height / q

  canvas.width = width
  canvas.height = height

  const factx = 40 * Math.cos(t / 2000)
  const facty = 40 * Math.sin(t / 2000)

  pCtx.clearRect(0, 0, width, height)
  for (let y = 2 * mf; y < qheight - 2 * mf; y++) {
    for (let x = 2 * mf; x < qwidth - 2 * mf; x++) {
      const xx = q * x
      const yy = q * y
      const r = mf * q * Math.sin((qwidth / mf - x) / factx + (qheight / mf - y) / facty)
      const er = mf * q + r
      pCtx.beginPath()
      pCtx.arc(xx, yy, er, 0, 2 * Math.PI)
      pCtx.stroke()
    }
  }
  const sfact = (width + height) / 80
  const fsize = sfact > 20 ? sfact : 20
  if (!(frame % 10)) {
    const tB = Date.now()
    const mspframe = tB - tA
    fps = Math.round(10000 / mspframe)
    tA = Date.now()
  }
  pCtx.font = `${fsize}px monospace`
  pCtx.fillText(`${fps}fps ${frame}frame`, fsize / 2, fsize)
  frame++
})()
