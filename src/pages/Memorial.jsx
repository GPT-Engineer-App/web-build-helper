import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, VStack, Image, Video, Audio, Button } from "@chakra-ui/react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Memorial = () => {
  const { id } = useParams();
  const [memorial, setMemorial] = useState(null);
  const [error, setError] = useState("");
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchMemorial = async () => {
      try {
        const docRef = doc(db, "memorials", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setMemorial(docSnap.data());
        } else {
          setError("No such memorial page found.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMemorial();
  }, [id, db]);

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  if (!memorial) {
    return <Text>Loading...</Text>;
  }

  const user = auth.currentUser;
  const isOwner = user && user.uid === memorial.owner;

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <Text fontSize="2xl">{memorial.title}</Text>
        <Text>{memorial.description}</Text>
        {memorial.pictures.map((pic, index) => (
          <Image key={index} src={URL.createObjectURL(pic)} alt={`Picture ${index + 1}`} />
        ))}
        {memorial.videos.map((vid, index) => (
          <Video key={index} src={URL.createObjectURL(vid)} controls />
        ))}
        {memorial.audios.map((aud, index) => (
          <Audio key={index} src={URL.createObjectURL(aud)} controls />
        ))}
        {isOwner && (
          <Button>Purchase Products with QR Code</Button>
        )}
      </VStack>
    </Box>
  );
};

export default Memorial;