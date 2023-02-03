# molecule

### Write 3 tasks for the colleagues coming after you that describe improvements (e.g., usability, safety, interoperability, permissioning, etc.) to the system you have just developed.

1. Use environment variables for the sensitive information such as Infura `projectId` and `projectSecret`
2. Write a decrypt function and add it to the interface, providing the token holders with the ability to decrypt their contractData on the interface.
3. The encryption key shouldn't be stored in the localStorage, store it in a database mapped to the tokenID. If the logged in user has a token with a certain tokenID in his wallet he will be able to fetch the encryption key from our database and rightfully decrypt the data, otherwise anyone would be able to access the data.
4. There is some repetitiveness in the code and it might get hard to read eventually, add getTokenURI(), addToBrightlist(), revokeFromBrightlist(), encrypt(), decrypt(), uploadToIpfs to the Utils.js file.
