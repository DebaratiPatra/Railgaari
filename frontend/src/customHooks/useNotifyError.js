import React from 'react'
import { useToast } from '@chakra-ui/react';

const useNotifyError = () => {
    const toast = useToast();
    return (error) =>{
        if (error) {
            toast({
                title: 'invalid',
                description: error,
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }
    }
}
const useNotifySuccess = () => {
    const toast = useToast();
    return (message) =>{
        if (message) {
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true
            })
        }
    }
}

export{ useNotifyError, useNotifySuccess };