import { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, updateDoc } from "firebase/firestore";
import QRCode from "qrcode.react";

const CreateMemorial = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pictures, setPictures] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  const handleFileChange = (e, setFiles) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setError("You must be logged in to create a memorial page.");
        return;
      }

      const docRef = await addDoc(collection(db, "memorials"), {
        title,
        description,
        pictures,
        videos,
        audios,
        owner: user.uid,
      });

      const qrCodeUrl = `${window.location.origin}/memorial/${docRef.id}`;
      await updateDoc(docRef, { qrCodeUrl });
      setQrCode(qrCodeUrl);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (qrCode) {
      const qrCodeUrl = `${window.location.origin}/memorial/${qrCode}`;
      setQrCode(qrCodeUrl);
    }
  }, [qrCode]);

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <FormControl id="title">
          <FormLabel>Title</FormLabel>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>
        <FormControl id="pictures">
          <FormLabel>Pictures</FormLabel>
          <Input type="file" accept="image/*" multiple onChange={(e) => handleFileChange(e, setPictures)} />
        </FormControl>
        <FormControl id="videos">
          <FormLabel>Videos</FormLabel>
          <Input type="file" accept="video/*" multiple onChange={(e) => handleFileChange(e, setVideos)} />
        </FormControl>
        <FormControl id="audios">
          <FormLabel>Audios</FormLabel>
          <Input type="file" accept="audio/*" multiple onChange={(e) => handleFileChange(e, setAudios)} />
        </FormControl>
        {error && <Text color="red.500">{error}</Text>}
        <Button onClick={handleSubmit}>Create Memorial Page</Button>
        {qrCode && (
          <Box>
            <Text>Scan this QR code to view the memorial page:</Text>
            <QRCode value={qrCode} />
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default CreateMemorial;