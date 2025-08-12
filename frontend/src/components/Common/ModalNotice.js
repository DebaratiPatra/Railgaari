import { Button, Modal, ModalBody, ModalCloseButton, ModalContent,
     ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useEffect } from "react"

export function ModalNotice() {
    const { isOpen, onOpen, onClose } = useDisclosure()
      useEffect(()=>{
        onOpen();
      },[]);
    return (
      <>
        <Modal onClose={onClose} size={'xs'} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Important Notice</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
            Since our backend is on a free version, the first request may take up to 50 seconds. 
            After that, it should work smoothly. We aim to provide you with the best experience possible. 
            If you encounter any bugs or have suggestions for improvement,
            please let us know through the Contact Us section. Your feedback is valuable in helping us enhance the user experience.
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }