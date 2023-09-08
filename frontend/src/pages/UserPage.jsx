import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"

const UserPage = () => {
  return (
    <>
      <UserHeader/>
      <UserPost likes={1200} replies={323} postImg={"/post1.png"} postTitle={"This is my first post"} />
      <UserPost likes={675} replies={153} postImg={"/post2.png"} postTitle={"Hey This really awesome!!!"} />
      <UserPost likes={6589} replies={678} postImg={"/post3.png"} postTitle={"Wow!!!"} />
      <UserPost likes={278} replies={67}  postTitle={"This is my first post"} />
    </>
  )
}

export default UserPage
