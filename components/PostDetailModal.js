import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  Text,
  Flex,
  Divider,
} from "@chakra-ui/react";

const PostDetailModal = ({ isOpen, onClose, selectedPost }) => {
  const { title, datetime, body } = selectedPost;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxH="80%" maxW="80%" py="25px">
        <ModalHeader>Post Detail</ModalHeader>
        <ModalCloseButton />
        <ModalBody py="16px">
          <Flex direction="column" gap="25px">
            <Heading>{title}</Heading>
            <Text>Updated: {datetime}</Text>
            <Divider />
            <Text fontSize="20px" letterSpacing="0.5px">
              {body}
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostDetailModal;
