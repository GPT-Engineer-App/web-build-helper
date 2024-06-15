import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, Text } from "@chakra-ui/react";
import { QRCode } from "qrcode.react";
import { auth } from "../firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const CreateMemorial = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pictures, setPictures] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");

  const handleFileUpload = async (files, setFiles) => {
    const storage = getStorage();
    const uploadedFiles = [];

    for (const file of files) {
      const storageRef = ref(storage, `memorials/${uuidv4()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      uploadedFiles.push(downloadURL);
    }

    setFiles(uploadedFiles);
  };

  const handleSubmit = async () => {
    if (!title || !description) {
      setError("Title and description are required.");
      return;
    }

    // Generate unique QR code
    const qrCodeValue = uuidv4();
    setQrCode(qrCodeValue);

    // Save memorial data to database (not implemented in this example)
    // ...

    setError("");
  };

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
          <Input type="file" multiple accept="image/*" onChange={(e) => handleFileUpload(e.target.files, setPictures)} />
        </FormControl>
        <FormControl id="videos">
          <FormLabel>Videos</FormLabel>
          <Input type="file" multiple accept="video/*" onChange={(e) => handleFileUpload(e.target.files, setVideos)} />
        </FormControl>
        <FormControl id="audios">
          <FormLabel>Audios</FormLabel>
          <Input type="file" multiple accept="audio/*" onChange={(e) => handleFileUpload(e.target.files, setAudios)} />
        </FormControl>
        {error && <Text color="red.500">{error}</Text>}
        <Button onClick={handleSubmit}>Create Memorial</Button>
        {qrCode && (
          <Box mt={4}>
            <Text>QR Code:</Text>
            <QRCode value={qrCode} />
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default CreateMemorial;