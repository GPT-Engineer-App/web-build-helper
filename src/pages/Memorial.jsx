import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, VStack, Image, Button, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { getFirestore, doc, getDoc, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Memorial = () => {
  const { id } = useParams();
  const [memorial, setMemorial] = useState(null);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
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

    const fetchComments = async () => {
      try {
        const q = query(collection(db, "comments"), where("memorialId", "==", id));
        const querySnapshot = await getDocs(q);
        const commentsData = querySnapshot.docs.map(doc => doc.data());
        setComments(commentsData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMemorial();
    fetchComments();
  }, [id, db]);

  const handleAddComment = async () => {
    try {
      await addDoc(collection(db, "comments"), {
        memorialId: id,
        text: newComment,
        createdAt: new Date(),
      });
      setNewComment("");
      fetchComments();
    } catch (err) {
      setError(err.message);
    }
  };

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
          <video key={index} src={URL.createObjectURL(vid)} controls />
        ))}
        {memorial.audios.map((aud, index) => (
          <audio key={index} src={URL.createObjectURL(aud)} controls />
        ))}
        <Box w="100%">
          <Text fontSize="xl">Comments</Text>
          {comments.map((comment, index) => (
            <Box key={index} p={2} borderWidth="1px" borderRadius="md" w="100%">
              <Text>{comment.text}</Text>
            </Box>
          ))}
          <FormControl id="new-comment" mt={4}>
            <FormLabel>Add a Comment</FormLabel>
            <Textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
            <Button mt={2} onClick={handleAddComment}>Submit</Button>
          </FormControl>
        </Box>
        {isOwner && (
          <Button>Purchase Products with QR Code</Button>
        )}
      </VStack>
    </Box>
  );
};

export default Memorial;