import React from 'react'
import propTypes from 'prop-types'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

/* eslint-disable react/prop-types */
const ErrorNotification = (props) => {

  const closeNotification = () => {
    const copy = { ...props.notification }
    copy.open = false
    props.setNotification(copy)
  }

  const reloadPage = () => window.location.reload()

  return (
    <Dialog
      open={props.notification.open ? props.notification.open : false}
      onClose={closeNotification}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <span style={{ color: 'red' }}>
          {props.notification.title}
        </span></DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.notification.body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeNotification} color="primary">
        Cancel
        </Button>
        <Button onClick={reloadPage} color="primary" autoFocus>
        Retry
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ErrorNotification.PropTypes = {
  notification: propTypes.string,
  setNotification: propTypes.func
}

export default ErrorNotification