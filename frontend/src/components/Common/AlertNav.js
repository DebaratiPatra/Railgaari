import { Alert, AlertIcon, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"


export const AlertNav = () => {
    const { isAuthenticated, user } = useSelector(state => state.GetUser);
    return (
        isAuthenticated && !user.isEmailVerified && <Alert status='info'>
            <AlertIcon />

            <Text>Please <Text as='a' textDecoration={'underline'} href="/verify-email" >verify</Text> this e-mail</Text>
        </Alert>
    )
}