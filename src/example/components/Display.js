
function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = ''
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return `#${color}`
}

const Display = {
  name: 'display',

  getDefaults: () => ({
    color: getRandomColor(),
    width: 40,
    height: 40,
  })
}

export default Display
