export function uuidV4(): string {
    const hex = Array.from({ length: 16 }, () => Math.floor(Math.random() * 256));

    // 设置 version 和 variant
    hex[6] = (hex[6] & 0x0f) | 0x40; // version 4
    hex[8] = (hex[8] & 0x3f) | 0x80; // variant 10xx

    const toHex = (n: number) => n.toString(16).padStart(2, '0');

    return [
        toHex(hex[0]), toHex(hex[1]), toHex(hex[2]), toHex(hex[3]), '-',
        toHex(hex[4]), toHex(hex[5]), '-',
        toHex(hex[6]), toHex(hex[7]), '-',
        toHex(hex[8]), toHex(hex[9]), '-',
        toHex(hex[10]), toHex(hex[11]), toHex(hex[12]), toHex(hex[13]), toHex(hex[14]), toHex(hex[15])
    ].join('');
}
