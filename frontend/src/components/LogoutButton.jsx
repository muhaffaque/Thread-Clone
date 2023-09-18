import { Button, Toast, useToast } from '@chakra-ui/react'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from '../../Hooks/useShowToast'
import {FiLogOut} from 'react-icons/fi'

const LogoutButton = () => {
    const showToast = useShowToast()
    const setUser = useSetRecoilState(userAtom)
    const handleLogout = async()=>{
        try {
            //fetch req
            const res = await fetch("/api/users/logout",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                }
            })
            const data = await res.json()

            if(data.error){
                showToast("error", data.error, "error")
                return
            }

            localStorage.removeItem("user-threads")

            setUser(null)
        } catch (error) {
            showToast("error", error, "error")
        }
    }
  return (
    <Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={handleLogout}>
      <FiLogOut size={20}/>
    </Button>
  )
}

export default LogoutButton
