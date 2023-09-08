import { Avatar, Flex, Image, Text, Box, Divider, Button } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import MediaIcons from "../components/MediaIcons";
import { useState } from "react";
import CommentsIcons from "../components/CommentsIcons";

const PostPage = () => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/zuck-avatar.png" size={"md"} name="mark zuckerberg" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              Mark Zuckerberg
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text my={3}>Lets Talk about the threads</Text>
      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src={"/post1.png"} w={"full"} />
      </Box>
      <Flex gap={3} my={2.5}>
        <MediaIcons liked={liked} setLiked={setLiked} />
      </Flex>
      <Flex gap={2} w={"full"} alignItems={"center"} my={2}>
        <Text color={"gray.light"} fontSize={"sm"}>
          236 replies
        </Text>
        <Box w={0.5} h={0.5} bg={"gray.light"} borderRadius={"full"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {678 + (liked ? 1 : 0)} likes
        </Text>
      </Flex>
      <Divider my={3.5}/>
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>🙌🙌</Text>
          <Text color={"gray.light"}>Get the app to like, reply and post</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={3.5}/>
      <CommentsIcons comment={"looks really good"} createdAt={"1d"} likes={29} userName={'Dan Abrahmov'} userAvatar={'https://bit.ly/dan-abramov'}/>
      <CommentsIcons comment={"❤️❤️"} createdAt={"2d"} likes={20} userName={'Kola Tioluwani'} userAvatar={'https://bit.ly/ryan-florence' }/>
      <CommentsIcons comment={"wooowww"} createdAt={"3d"} likes={10} userName={'Kent Dodds'} userAvatar={'https://bit.ly/kent-c-dodds'}/>
    </>
  );
};

export default PostPage;
