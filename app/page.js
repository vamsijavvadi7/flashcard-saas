'use client';

import { useRef } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Box, Card, CardActionArea, CardContent, Button, Container, Grid, Typography } from "@mui/material";
import { SignedOut, SignedIn, UserButton, useClerk } from "@clerk/nextjs";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Baby, Eye, School, FileText, Folder } from 'lucide-react'; // Added icons for the features
import Contact from './contact/contact'

export default function Home() {
  const router = useRouter();
  const { user } = useClerk();

  const learnMoreRef = useRef(null);

  useEffect(() => {
    if (user) {
      router.push('/flashcards');
    }
  }, [user, router]);

  const handleGetStartedClick = () => {
    router.push('/sign-in');
  };

  const handleLearnMoreClick = () => {
    learnMoreRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Container sx={{ maxWidth: '100vw' }}>
      <Head>
        <title>FlashCards Pro</title>
      </Head>

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, rgba(29, 147, 242, 1) 0%, rgba(42, 245, 152, 1) 50%, rgba(144, 71, 255, 1) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          Unlock Your Learning Potential
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: '#666666',
            mb: 4
          }}
        >
          Discover the power of interactive flashcards for effortless learning.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#D4AF37', '&:hover': { backgroundColor: '#B8912C' }, mx: 2 }}
            onClick={handleGetStartedClick}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            sx={{ borderColor: '#D4AF37', color: '#D4AF37', '&:hover': { backgroundColor: '#F5F5F5' }, mx: 2 }}
            onClick={handleLearnMoreClick}
          >
            Learn More
          </Button>
        </Box>
      </Box>

      {/* Sections */}
      <Box ref={learnMoreRef} sx={{ py: 12, textAlign: 'center', backgroundColor: '#FFF' }}>
        <Typography variant="h5" fontWeight="bold" sx={{ color: '#333' }}>
          Effortless Learning for All
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mt: 2 }}>
          Our flashcard platform caters to learners of all ages and abilities, from kids to the elderly.
        </Typography>

        <Grid container spacing={4} sx={{ mt: 6 }}>
          {[
            {
              title: 'For Kids',
              description: 'Engaging flashcards with colorful designs and interactive features to make learning fun for children.',
              icon: <Baby style={{ color: 'gold', fontSize: 48 }} />,
            },
            {
              title: 'For Students',
              description: 'Comprehensive flashcard sets to help students master any subject, from language learning to test preparation.',
              icon: <School style={{ color: 'gold', fontSize: 48 }} />,
            },
            {
              title: 'For the Elderly',
              description: 'Easy-to-use flashcards with large text and simple interfaces to support lifelong learning for older adults.',
              icon: <Eye style={{ color: 'gold', fontSize: 48 }} />,
            },
          ].map((section, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ backgroundColor: '#F5F5F5', p: 3 }}>
                <Box
                  className="flex h-16 w-16 items-center justify-center rounded-full"
                >
                  {section.icon}
                </Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, color: '#333' }}>
                  {section.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: '#666', textAlign: 'left' }}>
                  {section.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, textAlign: 'center', backgroundColor: '#FFF' }}>
        <Typography variant="h4" sx={{ color: '#333' }}>
          Create and Manage Flashcards
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mt: 2 }}>
          Our intuitive platform makes it easy to create, organize, and study your flashcards.
        </Typography>

        <Grid container spacing={4} sx={{ mt: 6 }}>
          {[
            {
              title: 'Create Flashcards',
              description: 'Easily generate custom flashcards by simply providing text, allowing you to quickly create study aids tailored to your learning needs.',
              icon: <FileText style={{ color: 'gold', fontSize: 48 }} /> // Added icon
            },
            {
              title: 'Organize Flashcards',
              description: 'Categorize and manage your flashcards with ease, making it simple to find and study the content you need.',
              icon: <Folder style={{ color: 'gold', fontSize: 48 }} /> // Added icon
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ backgroundColor: '#F5F5F5', p: 4 }}>
                <Box
                  className="flex h-16 w-16 items-center justify-center rounded-full"
                >
                  {feature.icon}
                </Box>
                <CardContent>
                  <Typography variant="h5" sx={{ color: '#333', mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666', maxHeight: '50px', textAlign: 'left' }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Contact />
      </Box>

      {/* Footer */}
    </Container>
  );
}
