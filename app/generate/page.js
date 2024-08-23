'use client'

import { useState } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
  CardActionArea,
  IconButton
} from '@mui/material'
import { collection, doc, getDoc, writeBatch } from 'firebase/firestore'
import db from '../firebase'
import { useUser } from '@clerk/nextjs'
import ResponsiveAlert from '../repsonsivealert'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Loading3D from '../Loading/loader' 


export default function Generate() {
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState({})
  const [text, setText] = useState('')
  const [setName, setSetName] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const { user, isSignedIn, isLoading } = useUser();
  const [message, setMessage] = useState();
  const [alertOpen, setAlertOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleOpenDialog = () => setDialogOpen(true)
  const handleCloseDialog = () => setDialogOpen(false)

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const saveFlashcards = async () => {
    if (!user) return  
    if (!setName.trim()) {
      setMessage("Please enter a name for your flashcard set.")
      setAlertOpen(true)
      return
    }

    try {
      const userDocRef = doc(collection(db, 'users'), user.id)
      const userDocSnap = await getDoc(userDocRef)

      const batch = writeBatch(db)

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data()
        const updatedSets = [...(userData.flashcardSets || []), { name: setName }]
        batch.update(userDocRef, { flashcardSets: updatedSets })
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] })
      }

      const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName)
      batch.set(setDocRef, { flashcards })

      await batch.commit()

      setMessage("Flashcards saved successfully!")
      setAlertOpen(true)
      handleCloseDialog()
      setSetName('')
      setText('')
    } catch (error) {
      console.error('Error saving flashcards:', error)
      setMessage("An error occurred while saving flashcards. Please try again.")
      setAlertOpen(true)
    }
  }

  const handleSubmit = async () => {
    if (!text.trim()) {
      setMessage("Please enter some text to generate flashcards.")
      setAlertOpen(true)
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: text,
      })

      if (!response.ok) {
        throw new Error('Failed to generate flashcards')
      }

      const data = await response.json()
      setFlashcards(data)
    } catch (error) {
      console.error('Error generating flashcards:', error)
      setMessage("An error occurred while generating flashcards. Please try again.")
      setAlertOpen(true)
    }
    setLoading(false)
  }

  const handleNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePreviousCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };


  if(loading)
  {
    return (<Loading3D/>)
  }
  return (
    <Container maxWidth="md" sx={{backgroundColor: '#f9fcff',
     
      background:'grey',
      backgroundImage: 'linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%);',p:6,borderRadius:'5px' }}>
      <Box
        sx={{
          mt: 4,
          mb: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >










        
        <ResponsiveAlert
          open={alertOpen}
          setAlertOpen={setAlertOpen}
          message={message}
        />
        <Typography variant="h4" component="h1" sx={{ background: `radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
                radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 1000,  // Makes the font bolder
    letterSpacing: '0.05em',  // Slightly increases the spacing between letters
    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.4), 1px 1px 2px rgba(255, 255, 255, 0.2)',  // Enhances the 3D effect with multiple shadows
    fontSize: '2.5rem',  // Adjust size for emphasis
    transform: 'translateZ(0)',  // Ensures text remains sharp
    margin: '10px 0',  // Adds spacing for balance
    textTransform: 'uppercase',  
     }} gutterBottom>
          Create Flashcards
        </Typography>

        <Paper sx={{ p: 4, mb: '10px', width: '100%' }}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Paper>
        <Button
          variant="contained"
          color="primary"
          sx={{background:`radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
                radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);`}}


          onClick={handleSubmit}
          fullWidth
        >
        Create Flashcards
        </Button>
      </Box>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Save Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name to save your flashcards.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Set Name"
            type="text"
            fullWidth
            value={setName}
            onChange={(e) => setSetName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button  sx={{background:`radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
                radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);`
              ,color:'white'
              }}
 onClick={handleCloseDialog}>Cancel</Button>
          <Button 
          sx={{background:`radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
            radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);`,
          color:'white'
          }}

          onClick={saveFlashcards} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4}}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconButton onClick={handlePreviousCard}>
              <ArrowBackIcon fontSize="large" />
            </IconButton>
            <Card sx={{ width: '100%', maxWidth: '600px', minHeight: '400px', p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <CardActionArea onClick={() => handleCardClick(currentIndex)}>
                <CardContent>
                  <Box
                    sx={{
                      perspective: '1000px',
                      '& > div': {
                        transition: 'transform 0.6s',
                        transformStyle: 'preserve-3d',
                        position: 'relative',
                        width: '100%',
                        height: '300px',
                        // boxShadow: '4px 8px rgba(0,0,0, 0.2)',
                        transform: flipped[currentIndex] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      },
                      '& > div > div': {
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 2,
                        boxSizing: 'border-box',
                      },
                      '& > div > div:nth-of-type(2)': {
                        transform: 'rotateY(180deg)',
                      },
                    }}
                  >
                    <div>
                      <div>
                        <Typography variant="h4" component="div">
                          {flashcards[currentIndex]?.front}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="h4" component="div">
                          {flashcards[currentIndex]?.back}
                        </Typography>
                      </div>
                    </div>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
            <IconButton onClick={handleNextCard}>
              <ArrowForwardIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      )}

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', }}>
        
        <Button
          variant="contained"
          color="primary"
          sx={{background:`radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
                radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);`}}


          onClick={handleOpenDialog}
          fullWidth
        >
           Save Flashcards
        </Button>
        
        
          {/* <Button
          color='white'
          onClick={handleOpenDialog}>
            Save Flashcards
          </Button> */}
        </Box>
      )}
    </Container>
  )
}
