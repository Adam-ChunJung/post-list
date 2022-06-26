import {
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
  Box,
  Flex,
  useDisclosure,
  Text,
  Stack,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { useState } from "react";
import PostDetailModal from "../components/PostDetailModal";

const Home = ({ handleDeletePost, posts }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPost, setSelectedPost] = useState({});

  return (
    <>
      
      <Flex h="100%" direction="column" gap="50px">
        <Flex align="center" justify="space-between">
          <Stack>
            <Heading>Post List</Heading>
            <Text>There are {posts.length} posts in the database</Text>
          </Stack>
          <Button
            colorScheme="facebook"
            onClick={() => router.push("/add-post")}
          >
            Add Post
          </Button>
        </Flex>
        <Box overflow="auto">
          <Table>
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>Title</Th>
                <Th>Update</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts.map((post, i) => (
                <Tr key={i}>
                  <Td>{i + 1}</Td>
                  <Td>
                    <Button
                      onClick={() => {
                        setSelectedPost(post);
                        onOpen();
                      }}
                      variant="ghost"
                      h="min-content"
                      whiteSpace="normal"
                      textAlign="left"
                    >
                      {post.title}
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      colorScheme="facebook"
                      variant="outline"
                      onClick={() =>
                        router.push(
                          {
                            pathname: "/update-post",
                            query: post,
                          },
                          "update-post"
                        )
                      }
                    >
                      Update
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      onClick={() => {
                        handleDeletePost(post);
                      }}
                      variant="outline"
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
      <PostDetailModal
        isOpen={isOpen}
        onClose={onClose}
        selectedPost={selectedPost}
      />
    </>
  );
};

export default Home;
