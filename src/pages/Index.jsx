import { Box, Button, Container, IconButton, Text, VStack } from "@chakra-ui/react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { useState } from "react";

const songs = [
  { id: 1, title: "Song One", url: "https://example.com/song1.mp3" },
  { id: 2, title: "Song Two", url: "https://example.com/song2.mp3" },
  { id: 3, title: "Song Three", url: "https://example.com/song3.mp3" }
];

const Index = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useState(new Audio(songs[currentSongIndex].url))[0];

  const playPause = () => {
    if (isPlaying) {
      audioRef.pause();
    } else {
      audioRef.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipTrack = (direction) => {
    if (direction === "forward") {
      setCurrentSongIndex((currentSongIndex + 1) % songs.length);
    } else {
      setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length);
    }
    audioRef.src = songs[currentSongIndex].url;
    if (isPlaying) {
      audioRef.play();
    }
  };

  return (
    <Container maxW="container.xl" p={0}>
      <VStack spacing={4} align="stretch" h="calc(100vh - 100px)">
        <Box p={5}>
          <Text fontSize="2xl">Welcome to Your Music Player</Text>
        </Box>
      </VStack>
      <Box position="fixed" bottom="0" left="0" right="0" bg="gray.900" p={4} color="white" display="flex" alignItems="center" justifyContent="space-between">
        <IconButton icon={<FaBackward />} onClick={() => skipTrack("backward")} aria-label="Previous" />
        <IconButton icon={isPlaying ? <FaPause /> : <FaPlay />} onClick={playPause} aria-label={isPlaying ? "Pause" : "Play"} />
        <IconButton icon={<FaForward />} onClick={() => skipTrack("forward")} aria-label="Next" />
      </Box>
    </Container>
  );
};

export default Index;