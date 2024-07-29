// this is from the web-socket specification and not something that is generated
export const WEBSOCKET_MAGIC_STRING_KEY = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

export const SEVEN_BITS_INTEGER_MARKER = 125; // as byte: 01111101
export const SIXTEEN_BITS_INTEGER_MARKER = 126; // as byte: 01111110
// const SIXTYFOUR_BITS_INTEGER_MARKER = 127; // as byte: 01111111
export const MAXIMUM_SIXTEEN_BITS_INTEGER = 2 ** 16; // 2 ** 16 is 0 to 65536

export const MASK_KEY_BYTES_LENGTH = 4;
export const FIRST_BIT = 128;
export const OPCODE_TEXT = 0x01;