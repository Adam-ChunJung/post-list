import {
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Button,
  ButtonGroup,
  Input,
  Textarea,
} from "@chakra-ui/react";

const AddPost = ({
  handleAddPost,
  handleCancel,
  addTitle,
  setAddTitle,
  addDescription,
  setAddDescription,
}) => {
  return (
    <Flex h="100%" direction="column" gap="25px">
      <Heading>ADD A NEW POST</Heading>
      <Flex direction="column" gap="30px">
        <FormControl isRequired>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            value={addTitle}
            id="title"
            type="text"
            placeholder="Enter post title ..."
            onChange={(e) => setAddTitle(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            value={addDescription}
            id="description"
            type="text"
            placeholder="Enter post description ..."
            onChange={(e) => setAddDescription(e.target.value)}
          />
        </FormControl>
        <ButtonGroup variant="outline" spacing="25px">
          <Button
            disabled={!addTitle || !addDescription}
            type="submit"
            colorScheme="facebook"
            onClick={() => handleAddPost()}
          >
            Submit
          </Button>
          <Button onClick={() => handleCancel()}>Cancel</Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
};

export default AddPost;
