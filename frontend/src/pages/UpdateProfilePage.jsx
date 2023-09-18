import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'

const UpdateProfilePage =() =>{
  const [user, setUser] = useRecoilState(userAtom)
  const [input, setInput] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
    password: '',
    profilePic: '',
  })
  const fileRef = useRef(null)
  return (
    <Flex
      align={'center'}
      justify={'center'} my={6}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.dark')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src={user.profilePic}/>
                
            </Center>
            <Center w="full">
              <Button w="full" onClick={()=>{fileRef.current.click()}}>Change Avatar</Button>
              <Input type='file' hidden ref={fileRef}/>
            </Center>
          </Stack>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Full name</FormLabel>
          <Input
            placeholder="John Doe"
            value={input.name}
            onChange={(e)=>{setInput({...input, name: e.target.value})}}
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="johndoe"
            value={input.username}
            onChange={(e)=>{setInput({...input, username: e.target.value})}}
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl  isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            value={input.email}
            onChange={(e)=>{setInput({...input, email: e.target.value})}}
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>
        <FormControl  isRequired>
          <FormLabel>Bio</FormLabel>
          <Input
            placeholder="your-bio"
            value={input.bio}
            onChange={(e)=>{setInput({...input, bio: e.target.value})}}
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>
        <FormControl  isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            value={input.password}
            onChange={(e)=>{setInput({...input, password: e.target.value})}}
            _placeholder={{ color: 'gray.500' }}
            type="password"
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Cancel
          </Button>
          <Button
            bg={'green.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'green.500',
            }}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}

export default UpdateProfilePage;
