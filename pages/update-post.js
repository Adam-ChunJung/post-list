import {
  Container,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Button,
  ButtonGroup,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const UpdatePost = ({
  handleUpdatePost,
  editTitle,
  setEditTitle,
  editDescription,
  setEditDescription,
}) => {
  const router = useRouter();
  const selectedPost = router.query;

  useEffect(() => {
    setEditTitle(selectedPost.title);
    setEditDescription(selectedPost.body);
  }, []);

  return (

      <Flex h="100%" direction="column" gap="25px">
        <Heading>UPDATE POST</Heading>
        <Flex direction="column" gap="30px">
          <FormControl isRequired>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              value={editTitle}
              id="title"
              type="text"
              placeholder="Enter post title ..."
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              value={editDescription}
              id="description"
              type="text"
              placeholder="Enter post description ..."
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </FormControl>
          <ButtonGroup variant="outline" spacing="25px">
            <Button
              disabled={!editTitle || !editDescription}
              type="submit"
              colorScheme="facebook"
              onClick={() => handleUpdatePost(selectedPost.id)}
            >
              Submit
            </Button>
            <Button onClick={() => router.push("/")}>Cancel</Button>
          </ButtonGroup>
        </Flex>
      </Flex>
  );
};

export default UpdatePost;
