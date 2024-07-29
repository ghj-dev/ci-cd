// sharedWorker.js
const connections = []

self.onconnect = function (event) {
  const port = event.ports[0]
  connections.push(port)

  port.onmessage = function (event) {
    connections.forEach((conn) => conn.postMessage(event.data))
  }
}
