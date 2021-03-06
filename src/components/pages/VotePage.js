import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { Link } from 'react-router-dom'

import { connect, useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

import ListKandidat from '../vote/ListKandidat'
import { submitVote } from '../../store/actions/voteActions'

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}))

const steps = ['Universitas']

function getStepContent(step, listKandidat, pilihan, setPilihan) {
  switch (step) {
    case 0:
      return (
        <ListKandidat
          listKandidat={listKandidat}
          pilihan={pilihan}
          setPilihan={setPilihan}
        />
      )
    default:
      throw new Error('Unknown step')
  }
}

function VotePage(props) {
  const { mhs, vote, err_code, submitVote } = props
  const classes = useStyles()

  useFirestoreConnect([{ collection: 'calon' }])
  const listKandidat = useSelector(state => {
    return state.firestore.ordered.calon || null
  })

  const [activeStep, setActiveStep] = useState(0)
  const [pilihan, setPilihan] = useState('')

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleSubmit = () => {
    setActiveStep(activeStep + 1)
    submitVote(pilihan, mhs.nim, vote[pilihan] + 1)
  }

  const errorPage = () => (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Anda telah melakukan pemilihan
        </Typography>
        <Typography component="h1" variant="h5" align="center">
          <Link to="/publik">
            <Typography align="center" variant="subtitle1">
              Lihat Statistik
            </Typography>
          </Link>
        </Typography>
      </div>
    </Container>
  )

  return (
    <>
      {err_code ? (
        errorPage()
      ) : (
        <>
          <CssBaseline />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="center">
                Pilih Kandidat
              </Typography>
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <>
                {activeStep === steps.length ? (
                  <>
                    {/* Bagian Sukses */}
                    <Typography variant="h5" gutterBottom>
                      Sukses. <br /> Terima kasih, {mhs.nama} telah menyalurkan
                      suara Anda
                    </Typography>
                    <Link to="/publik">
                      <Typography align="center" variant="subtitle1">
                        Lihat Statistik
                      </Typography>
                    </Link>
                  </>
                ) : (
                  <>
                    {getStepContent(
                      activeStep,
                      listKandidat,
                      pilihan,
                      setPilihan
                    )}
                    <div className={classes.buttons}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} className={classes.button}>
                          Back
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        // onClick={handleNext}
                        disabled={!pilihan}
                        className={classes.button}
                      >
                        {/* {activeStep === steps.length - 1 ? 'Selesai' : 'Lanjutkan'} */}
                        Selesai
                      </Button>
                    </div>
                  </>
                )}
              </>
            </Paper>
          </main>
        </>
      )}
    </>
  )
}

const mapStateToprops = state => {
  return {
    mhs: state.public.mhs,
    vote: state.vote,
    err_code: state.public.err_code,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitVote: (pilihan, nim, vote) =>
      dispatch(submitVote(pilihan, nim, vote)),
  }
}

export default connect(mapStateToprops, mapDispatchToProps)(VotePage)
