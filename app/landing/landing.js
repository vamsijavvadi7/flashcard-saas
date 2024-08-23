'use client'

import { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Text3D, Center } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { motion } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@mui/material"
import { Button } from "@mui/material"
import { Input } from "@mui/material"
import { Label } from "@mui/material"
import { Textarea } from "@mui/material"
import { BookOpen, BrainCircuit, Users, Zap } from 'lucide-react'

function Box(props) {
  const mesh = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const texture = useLoader(TextureLoader, '/placeholder.svg')

  useFrame((state, delta) => (mesh.current.rotation.x += delta))

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? '#FFD700' : '#C0C0C0'} map={texture} />
    </mesh>
  )
}


const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="p-4 bg-gray-900">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gold">FlashMaster</h1>
          <ul className="flex space-x-4">
            <li><a href="#features" className="hover:text-gold transition-colors">Features</a></li>
            <li><a href="#faq" className="hover:text-gold transition-colors">FAQ</a></li>
            <li><a href="#contact" className="hover:text-gold transition-colors">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="h-screen flex items-center justify-center">
          <div className="text-center">
            <motion.h1 
              className="text-6xl font-bold mb-4 text-gold"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Welcome to FlashMaster
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 text-gray-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Master any subject with interactive flashcards
            </motion.p>
            <Canvas className="h-64">
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Suspense fallback={null}>
                <Center>
                  <Text3D
                    font="/fonts/helvetiker_regular.typeface.json"
                    size={0.5}
                    height={0.2}
                    curveSegments={12}
                  >
                    FlashMaster
                    <meshStandardMaterial color="#FFD700" />
                  </Text3D>
                </Center>
                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
              </Suspense>
              <OrbitControls />
            </Canvas>
          </div>
        </section>

        <section id="features" className="py-16 bg-gray-900">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-gold">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard 
                icon={<BookOpen className="h-12 w-12 mb-4 text-gold" />}
                title="Create Flashcards"
                description="Easily create custom flashcards for any subject or topic."
              />
              <FeatureCard 
                icon={<BrainCircuit className="h-12 w-12 mb-4 text-gold" />}
                title="Smart Learning"
                description="Our AI-powered system adapts to your learning pace."
              />
              <FeatureCard 
                icon={<Users className="h-12 w-12 mb-4 text-gold" />}
                title="Collaborative Study"
                description="Share and study with friends or classmates."
              />
              <FeatureCard 
                icon={<Zap className="h-12 w-12 mb-4 text-gold" />}
                title="Quick Quizzes"
                description="Test your knowledge with timed quizzes."
              />
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 bg-black">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-gold">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-gold">Is FlashMaster suitable for all age groups?</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Yes! FlashMaster is designed to be user-friendly for learners of all ages, from children to seniors.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-gold">Can I use FlashMaster on my mobile device?</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  FlashMaster is fully responsive and works seamlessly on smartphones and tablets.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-gold">Is there a limit to how many flashcards I can create?</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  No, there&#39;s no limit! You can create as many flashcards as you need for your studies.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-gold">Can I share my flashcards with others?</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Yes, FlashMaster allows you to share your flashcard decks with friends or classmates for collaborative learning.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section id="contact" className="py-16 bg-gray-900">
          <div className="container mx-auto max-w-md">
            <h2 className="text-4xl font-bold mb-8 text-center text-gold">Contact Us</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">Name</Label>
                <Input id="name" placeholder="Your name" className="bg-black border-gray-700 text-white" />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input id="email" type="email" placeholder="Your email" className="bg-black border-gray-700 text-white" />
              </div>
              <div>
                <Label htmlFor="message" className="text-gray-300">Message</Label>
                <Textarea id="message" placeholder="Your message" className="bg-black border-gray-700 text-white" />
              </div>
              <Button type="submit" className="w-full bg-gold text-black hover:bg-gold/90">Send Message</Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-black text-gray-300 py-8 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 FlashMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div 
      className="bg-black p-6 rounded-lg border border-gray-800"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {icon}
      <h3 className="text-xl font-semibold mb-2 text-gold">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}


export default Landing;