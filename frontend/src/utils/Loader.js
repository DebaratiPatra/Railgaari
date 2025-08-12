import { Box, Spinner } from "@chakra-ui/react";

export function Loader() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Spinner size="xl" />
        </Box>
    );
}