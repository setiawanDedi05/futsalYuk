import { MAXIMUM_SIXTEEN_BITS_INTEGER, OPCODE_TEXT, SEVEN_BITS_INTEGER_MARKER, SIXTEEN_BITS_INTEGER_MARKER, WEBSOCKET_MAGIC_STRING_KEY } from "./constants.js";
import crypto from 'crypto';

export function createSocketAcceptHeaderValue(webSocketSecKey) {
    const hash = crypto
        .createHash("sha1")
        .update(webSocketSecKey.concat(WEBSOCKET_MAGIC_STRING_KEY))
        .digest("base64");

    return hash;
}

export function prepareHandshakeResponse(webSocketSecKey) {
    const acceptKey = createSocketAcceptHeaderValue(webSocketSecKey);

    const headerResponse = [
        "HTTP/1.1 101 Switching Protocols",
        "Upgrade: websocket",
        "Connection: Upgrade",
        `sec-webSocket-accept: ${acceptKey}`,
        // This empty line MUST be present for the response to be valid
        "",
    ]
        .map((line) => line.concat("\r\n"))
        .join("");

    return headerResponse;
}

export function unmask(encodedBuffer, maskKey) {
    // helper funcations to help log process of unmasking (the XOR operation part)
    const fillWithZeroes = (t) => t.padStart(8, "0");
    const toBinary = (t) => fillWithZeroes(t.toString(2));
    const fromBinaryToDecimal = (t) => parseInt(toBinary(t), 2);
    const getCharFromBinary = (t) =>
        String.fromCharCode(fromBinaryToDecimal(t));

    const decoded = Uint8Array.from(encodedBuffer, (element, index) => {
        const decodedElement = element ^ maskKey[index % 4];

        console.log({
            unmakingCalc: `${toBinary(element)} ^ ${toBinary(
                maskKey[index % 4]
            )} = ${toBinary(decodedElement)}`,
            decodedElement: getCharFromBinary(decodedElement),
        });

        return decodedElement;
    });

    return Buffer.from(decoded);
}

export function encodeWebsocketMsg(message) {
    const msg = Buffer.from(message);

    const messageSize = msg.length;

    // this would contain specify information defined on the websocket protocol
    let dataFrameBuffer;

    const firstByte = 0x80 | OPCODE_TEXT;

    if (messageSize <= SEVEN_BITS_INTEGER_MARKER) {
        const bytes = [firstByte];

        dataFrameBuffer = Buffer.from(bytes.concat(messageSize));
    } else if (messageSize <= MAXIMUM_SIXTEEN_BITS_INTEGER) {
        const offsetFourBytes = 4;

        const target = Buffer.allocUnsafe(offsetFourBytes);

        target[0] = firstByte;

        // this is the mask indicator (0 means unmasked)
        target[1] = SIXTEEN_BITS_INTEGER_MARKER | 0x00;

        target.writeUint16BE(messageSize, 2);

        dataFrameBuffer = target;
    } else {
        throw new Error("message is too long :(");
    }

    const totalLength = dataFrameBuffer.byteLength + messageSize;

    const target = Buffer.allocUnsafe(totalLength);
    let offset = 0;

    for (const buffer of [dataFrameBuffer, msg]) {
        target.set(buffer, offset);
        offset += buffer.length;
    }

    return target;
    //  callBack(dataFrameBuffer);
}