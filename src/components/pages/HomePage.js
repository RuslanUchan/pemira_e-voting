import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    marginTop: "0.25rem",
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}))

function HomePage() {
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img style={{ marginBottom: "0.5rem" }} width="70%" src="/logo uin.png" alt="Logo UIN Jakarta" />
        <Typography className={classes.text} component="h1" variant="h4" align="center">
          Pemilihan Umum Raya
        </Typography>
        <Typography className={classes.text} component="h1" variant="h5" align="center">
          UIN Jakarta 2019
        </Typography>
        <Link to="/tatacara">
          <Button
            className={classes.submit}
            variant="contained"
            color="primary"
          >
            Masuk
          </Button>
        </Link>
      </div>
    </Container>
  )
}

export default HomePage
