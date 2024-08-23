'use client';
import { Box, Card, CardActionArea, CardContent, Container, Typography, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { collection, doc, getDoc } from 'firebase/firestore';
import db from '../firebase';
import { useUser } from '@clerk/nextjs';
import { useSearchParams } from "next/navigation";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const searchParams = useSearchParams();
  const search = searchParams.get('id');

  const handleCardClick = () => {
    setFlipped((prev) => !prev);
  };

  const handleNextCard = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePreviousCard = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;

      const userDocRef = doc(db, 'users', user.id);
      const userDocSnap = await getDoc(userDocRef);

      const flashcardSetRef = doc(userDocRef, 'flashcardSets', search);
      const flashcardsSnapshot = await getDoc(flashcardSetRef);
      const docs = flashcardsSnapshot.data().flashcards;

      setFlashcards(docs);
    }
    getFlashcard();
  }, [search, user]);

  if (!flashcards.length) return null;

  const currentFlashcard = flashcards[currentIndex];

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconButton onClick={handlePreviousCard}>
          <ArrowBackIcon fontSize="large" />
        </IconButton>

        <Card sx={{ width: '100%', maxWidth: '600px', minHeight: '400px', p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <CardActionArea onClick={handleCardClick}>
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
                    boxShadow: '4px 8px rgba(0,0,0, 0.0)',
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
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
                      {currentFlashcard.front}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="h4" component="div">
                      {currentFlashcard.back}
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
    </Container>
  );
}
