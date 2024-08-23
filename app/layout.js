"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import {
  Box,
  AppBar,
  Button,
  Typography,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loading3D from "./Loading/loader";
 // Import your Loader component

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading process
    const handleRouteChange = () => setLoading(false);
    // Simulate delay for demonstration purposes
    setTimeout(handleRouteChange, 1000); // 1 second delay to mimic loading

    return () => {
      setLoading(true); // Reset loading state if needed
    };
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuList = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 2,
        }}
      >
        <IconButton onClick={toggleDrawer(false)} color="inherit">
          x
        </IconButton>
      </Box>
      <List>
        <ListItem button component={Link} href="/generate">
          <ListItemText primary="Create FlashCards" />
        </ListItem>
        <ListItem button component={Link} href="/flashcards">
          <ListItemText primary="Your FlashCards" />
        </ListItem>
        <ListItem button component={Link} href="/pricing">
          <ListItemText primary="Pricing" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* AppBar */}
          <AppBar
            sx={{
              background:
                "linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%);",
            }}
            position="fixed"
          >
            <Toolbar>
              {/* Always show Menu Icon */}
              <SignedIn>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              </SignedIn>
              <Typography
                variant="h6"
                style={{ flexGrow: 1 }}
                sx={{
                  background: "white",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 400,
                  letterSpacing: "0.05em",
                  textShadow:
                    "3px 3px 6px rgba(0, 0, 0, 0.4), 1px 1px 2px rgba(255, 255, 255, 0.2)",
                  fontSize: "1rem",
                  transform: "translateZ(0)",
                  margin: "10px 0",
                  textTransform: "uppercase",
                }}
              >
                Flashcard Pro AI
              </Typography>

              <SignedOut>
                <Button color="inherit" href="/sign-in">
                  Login
                </Button>
                <Button color="inherit" href="/sign-up">
                  Sign Up
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </Toolbar>
          </AppBar>

          {/* Drawer */}
          <SignedIn>
            <Drawer
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              sx={{
                width: 240,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: 240,
                  boxSizing: "border-box",
                  marginTop: "64px", // Offset the Drawer below the AppBar
                },
              }}
            >
              {menuList}
            </Drawer>
          </SignedIn>

          {/* Main Content Area */}
          <main
            style={{
              flex: 1,
              padding: 16,
              marginTop: "64px", // Offset content below the AppBar
            }}
          >
            {loading ? <Loading3D /> : children}
          </main>
          
          {/* Footer */}
          <Box sx={{ py: 2, textAlign: 'center', backgroundColor: '#333', color: '#FFF', marginTop: 'auto' }}>
            <Typography variant="body2">
              &copy; 2024 Flashcard Learning Platform. All rights reserved.
            </Typography>
          </Box>
        </body>
      </html>
    </ClerkProvider>
  );
}
