import { createThirdwebClient } from "thirdweb"

const clientId = "cde0bc11fe64c847292c4431ef0fd7cb"
if (!clientId) {
    throw new Error('No client id provided');
}

export const client = createThirdwebClient({
        clientId: clientId,
    });