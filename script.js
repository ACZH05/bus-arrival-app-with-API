// fetch bus stop id from API
async function getbusStopInfo(busStopId) {
  const response = await fetch(`https://arrivelah2.busrouter.sg/?id=${busStopId}`)
  const result = await response.json()
  return result
}

// format the bus info after fetch
function formatBusInfo(result) {
  const services = result.services

  for (const service of services) {
    const row = document.createElement('tr')
    const filterOption = document.createElement('option')

    row.innerHTML = `
    <td class="text-center">${service.no}</td>
    <td class="text-center">${service.operator}</td>
    <td class="d-flex flex-column">
      <div>${timeFormat(service?.next?.time)}</div>
      <div>${timeFormat(service?.subsequent?.time)}</div>
      <div>${timeFormat(service?.next2?.time)}</div>
      <div>${timeFormat(service?.next3?.time)}</div>
      
    </td>
    
    <td>
      <div>${msToMin(service?.next?.duration_ms)}</div>
      <div>${msToMin(service?.subsequent?.duration_ms)}</div>
      <div>${msToMin(service?.next2?.duration_ms)}</div>
      <div>${msToMin(service?.next3?.duration_ms)}</div>
      
    </td>
    `
    row.classList.add("border-bottom")

    filterOption.innerHTML = `Bus No.: ${service.no}`
    filterOption.value = service.no
    selectFilter.classList.replace('invisible', 'visible')

    busInfo.appendChild(row)
    busNo.appendChild(filterOption)
  }
}

//add bus info into the table
function addBusInfo(busInfo) {
  getbusStopInfo(busInfo).then((data) => {
    formatBusInfo(data)
  })
}

//Convert ms to minutes
function msToMin(ms) {
  if (ms === null || ms === undefined) return '-'
  const min = ms / 60000
  return Math.round(min)
}

//Check whether the value is null or underfined
function checkIsNull(input) {
  if (input === null || input === undefined) {
    return '-'
  } else {
    return input
  }
}

//Reformat the time from API
function timeFormat(input) {
  if (checkIsNull(input) === '-') return '-'
  const timeAndDate = input.slice(0, -9)
  const timeAndDateList = timeAndDate.split("T")
  const format = `${timeAndDateList[0]} ${timeAndDateList[1]}`
  return format
}

const busStopId = document.getElementById('busStopId')
const submit = document.getElementById('submit')
const busInfo = document.getElementById('busInfo')
const busNo = document.getElementById('busNo')
const selectFilter = document.getElementById('selectFilter')

submit.addEventListener('click', () => {
  console.log("clicked")
  addBusInfo(busStopId.value)
})