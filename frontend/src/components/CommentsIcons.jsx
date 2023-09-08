import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import MediaIcons from "./MediaIcons";

const CommentsIcons = ({comment, likes, createdAt, userName, userAvatar}) => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar
          size={"xs"}
          name={userName}
          src={userAvatar}
        />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {userName}
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray.light"}>
                {createdAt}
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text>{comment}</Text>
          <MediaIcons liked={liked} setLiked={setLiked}/>
          <Text fontSize={"sm"} color={"gray.light"}>
            {likes+ (liked ? 1 : 0)} likes
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default CommentsIcons;
