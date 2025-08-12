import { Box, Heading, Stack, Input, Textarea, Button, useToast } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { bounceVariants } from './HomePage.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { clearUpdation, contactUsAction } from '../../redux/actions/userActions.js';
import { useNotifyError, useNotifySuccess } from '../../customHooks/useNotifyError.js';


export default function ContactUsForm() {

    const {loading,isMessageSent,error} = useSelector(state => state.IsUpdatedUser);
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");
    const [subject,setSubject] = useState("");
    const notifyError = useNotifyError();
	const notifySuccess = useNotifySuccess();
    const dispatch = useDispatch();
    const handleSubmit = ()=>{
        if(email==="" ||message==="" || subject==="") {
            notifyError("Enter all details");
            return;
        }
        dispatch(contactUsAction({
            email:email,
            subject:subject,
            message:message
        }))
    }
    useEffect(()=>{
        if(isMessageSent) {
            notifyError("Feedback sent successfully");
        }
        if(error) {
            notifyError(error);
            dispatch(clearUpdation());
        }
    },[isMessageSent,error])
    return (
        <AnimatePresence>
            <motion.div
                variants={bounceVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} as={'form'} mt={10}>
                    <Heading m={'10px'}>
                        Contact Us
                    </Heading>
                    <Stack spacing={4}>
                        <Input
                            placeholder="Email"
                            type="email"
                            bg={'gray.100'}
                            borderRadius={'md'}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="Subject"
                            bg={'gray.100'}
                            borderRadius={'md'}
                            onChange={(e)=>setSubject(e.target.value)}
                        />
                        <Textarea
                            placeholder="Message"
                            bg={'gray.100'}
                            borderRadius={'md'}
                            minHeight={'150px'}
                            onChange={(e)=>setMessage(e.target.value)}
                        />
                        <Button isLoading={loading} colorScheme="blue" onClick={handleSubmit}>
                            Send Message
                        </Button>
                    </Stack>
                </Box>
            </motion.div>
        </AnimatePresence>
    );
}