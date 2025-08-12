import React from 'react'
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'

const InputComponent = ({ title, source, placeholder, handleOnchange }) => {
    return (
        <InputGroup>
            <InputLeftAddon w={'120px'}>{title}</InputLeftAddon>
            <Input
                value={source}
                onChange={handleOnchange}
                placeholder={placeholder}
            />
        </InputGroup>
    )
}

export default InputComponent