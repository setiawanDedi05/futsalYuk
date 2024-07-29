import { createServer } from 'http';
import 'dotenv/config'
import { FIRST_BIT, MASK_KEY_BYTES_LENGTH, SEVEN_BITS_INTEGER_MARKER, SIXTEEN_BITS_INTEGER_MARKER } from './helper/constants.js';
import { encodeWebsocketMsg, prepareHandshakeResponse, unmask } from './helper/utils.js';

const server = createServer((_request, response) => {
    response.writeHead(200);
    response.end("hey there");
}).listen(process.env.APP_PORT, () => console.log("Server listening on port", process.env.APP_PORT));

server.on("upgrade", (req, socket, _head) => {
    const { "sec-websocket-key": webSocketSecKey } = req.headers;

    console.log({ webSocketClientKey: webSocketSecKey });

    const response = prepareHandshakeResponse(webSocketSecKey);

    console.log({ headerResponse: response });

    socket.write(response, (err) => {
        if (err != null) {
            console.error(err);
        }
    });

    socket.on("readable", () => {
        // read the first byte this  (this contain the first to last fragment, we are not doing anything with it)
        socket.read(1);

        // read second byte and store it in a variable (this contains the payload length)
        const [markerAndPayloadLength] = socket.read(1);

        console.log({ markerAndPayloadLength });

        // Add these next lines
        const lengthIndicatorInBits = markerAndPayloadLength - FIRST_BIT;

        let messageLength = 0;

        // ws://10.240.39.203:8900/watch/dashboard-notification/

        console.log({ lengthIndicatorInBits, messageLength });

        if (lengthIndicatorInBits <= SEVEN_BITS_INTEGER_MARKER) {
            messageLength = lengthIndicatorInBits;
        } else if (lengthIndicatorInBits === SIXTEEN_BITS_INTEGER_MARKER) {
            // unsigned, big-endian 16-bit integer [0 - 65k] - 2 ** 16
            messageLength = socket.read(2).readUint16BE(0);
        } else {
            throw new Error(
                "your message is too long! we don't handle more than 125 characters in the payload"
            );
        }

        const maskKey = socket.read(MASK_KEY_BYTES_LENGTH);
        const encoded = socket.read(messageLength);
        const decoded = unmask(encoded, maskKey);
        const receivedData = decoded.toString("utf-8");

        const data = JSON.parse(receivedData);

        console.log({ maskKey, encoded, decoded, receivedData, data });

        const msg = JSON.stringify({
            message: data,
            at: new Date().toISOString(),
        });

        const encodedMsg = encodeWebsocketMsg(msg);

        socket.write(encodedMsg);
    });
});

const handleUncaughtExceptions = (err) => {
    console.error(err);
};

process.on("uncaughtException", handleUncaughtExceptions);

process.on("unhandledRejection", handleUncaughtExceptions);