async function getbusStopInfo(busStopId) {
  const response = await fetch(`https://arrivelah2.busrouter.sg/?id=${busStopId}`)
  const result = await response.json()

  return result
}

const busStopId = document.getElementById('busStopId')
const submit = document.getElementById('submit')

submit.addEventListener('click', () => {
  console.log("clicked")
  getbusStopInfo(busStopId.value)
})