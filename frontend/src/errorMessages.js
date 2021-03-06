import React from 'react'

const timeoutError = {
  title: 'Connection timed out',
  body:
  <>
    Connection timed out due to Reaktor
    bad API being slow. Heroku
    times out every request that takes over
    30s. The app automatically tries to fetch data again...
  </>,
  open: true
}

const notRespondingError = {
  title: 'Server did not respond',
  body:
    <>
      For some reason server did not
      respond and data could not be
      fetched. It is highly likely that
      backend server might have crashed
      or Heroku went offline.
    </>,
  open: true
}

const internalError = {
  title: 'Internal server error',
  body:
    <>
      The server failed to fulfill
      request.
    </>,
  open: true
}

export default { timeoutError, notRespondingError, internalError }