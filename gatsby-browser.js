function setVh() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`)
}

function onClientEntry() {
  setVh()
  window.addEventListener('orientationchange', setVh)
  window.addEventListener('resize', setVh)
}

exports.onClientEntry = onClientEntry
