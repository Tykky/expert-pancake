import React from 'react'

const timeoutError = {
  title: 'Connection timed out',
  body:
  <>
    Connection timed out due to Reaktor
    bad API being notoriously slow. Heroku
    times out every request that takes over
    30s. View more information at<> </>
    <a href="https://devcenter.heroku.com/articles/request-timeout#table-of-contents:~:text=Occasionally%20a%20web%20request%20may%20hang,longer%20than%2030%20seconds%20to%20complete.">
      Heroku Dev Center
    </a><br/>
    The app automatically tries to fetch data again...
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
      request. This is highly likely
      due to some internal issues i.e
      bad code.
    </>,
  open: true
}

export default { timeoutError, notRespondingError, internalError }