'use client';

import { useUser } from "@clerk/nextjs";
import { Box, Button, Card, CardActionArea, CardContent, Container, Grid, TextField, Typography } from "@mui/material";
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import db from '../firebase';
import Loading3D from "../Loading/loader";

export default function FlashcardsPage() {
  const { user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [filteredFlashcards, setFilteredFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // Fetch flashcard sets from the database
  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!user) return;

      const userDocRef = doc(collection(db, 'users'), user.id);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const flashcardSets = userDocSnap.data().flashcardSets || [];
        setFlashcards(flashcardSets);
        setFilteredFlashcards(flashcardSets);
      } else {
        await setDoc(userDocRef, { flashcardSets: [] });
      }

      setLoading(false);
    };

    fetchFlashcards();
  }, [user]);

  // Filter flashcards based on the search term
  useEffect(() => {
    setFilteredFlashcards(
      searchTerm
        ? flashcards.filter(set => set.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : flashcards
    );
  }, [searchTerm, flashcards]);

  const handleCardClick = (id) => router.push(`/flashcard?id=${id}`);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
        {/* <CircularProgress color="primary" /> */}
        <Typography variant="h6" sx={{ mt: 2 }}><Loading3D/></Typography>
        {/* <Loading3D/> */}
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          backgroundColor: '#f9fcff',
backgroundImage: 'linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%);',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
        }}
      >
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
          Your Flashcards
        </Typography>


<Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    gap: 2,  // Space between search bar and button
    mb: 4,   // Margin below the flex container
  }}
>
  <TextField
    variant="outlined"
    label="Search Your Flashcards"
    fullWidth
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    sx={{
      flexGrow: 1,
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
      },
      '& .MuiInputLabel-root': {
        color: '#333',
      },
      '& .MuiInputBase-input': {
        padding: '12px 14px',
      },
    }}
  />
  <Button
    variant="contained"
    color="primary"
    sx={{
      background: `radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
                  radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);`,
      color: '#333',
      height: '56px',  // Match height with search bar
      borderRadius: '8px',
      textTransform: 'none',  // Prevent text transformation
      '&:hover': {
        backgroundColor: '#FDB931',  // Slightly different color on hover
      },
    }}
    href='/generate'
  >
    Create
  </Button>
</Box>

        <Grid container spacing={4}>
          {filteredFlashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  padding: '30px',
                  borderRadius: '12px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                  },
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  minHeight: '150px', // Ensure consistent card size
                  backgroundColor: '#ffffff',
                }}
              >
                <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                  <CardContent>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
                      {flashcard.name.charAt(0).toUpperCase() + flashcard.name.slice(1).toLowerCase()}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
