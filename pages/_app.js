import "../styles/globals.css";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [addTitle, setAddTitle] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3500/posts`);
        setPosts(data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          // Not recieve response at all
          console.log(`Error: ${err.message}`);
        }
      }
    };
    getPosts();
  }, []);

  const handleAddPost = async () => {
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = {
      id,
      title: addTitle,
      datetime,
      body: addDescription,
    };
    try {
      const { data } = await axios.post("http://localhost:3500/posts", newPost);
      const allPosts = [...posts, data];
      setPosts(allPosts);
      setAddTitle("");
      setAddDescription("");
      router.push("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleUpdatePost = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = {
      id,
      title: editTitle,
      datetime,
      body: editDescription,
    };
    try {
      const { data } = await axios.put(
        `http://localhost:3500/posts/${id}`,
        updatedPost
      );
      const updatedPosts = posts.map((post) =>
        post.id.toString() === id ? { ...data } : post
      );
      setPosts(updatedPosts);
      setEditTitle("");
      setEditDescription("");
      router.push("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDeletePost = async (post) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`http://localhost:3500/posts/${post.id}`);
        const allPosts = posts.filter((p) => p.id !== post.id);
        setPosts(allPosts);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  const handleCancel = () => {
    setAddTitle("");
    setAddDescription("");
    router.push("/");
  };

  return (
    <ChakraProvider>
      <Head>
        <title>Post List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container my="50px" h="calc(100vh - 100px)" maxW="1200px" p="25px 20px">
        <Component
          {...pageProps}
          posts={posts}
          handleAddPost={handleAddPost}
          handleUpdatePost={handleUpdatePost}
          handleDeletePost={handleDeletePost}
          handleCancel={handleCancel}
          addTitle={addTitle}
          setAddTitle={setAddTitle}
          addDescription={addDescription}
          setAddDescription={setAddDescription}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          editDescription={editDescription}
          setEditDescription={setEditDescription}
        />
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
