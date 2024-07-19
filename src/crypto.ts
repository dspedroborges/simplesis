import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const algorithm = 'aes-256-cbc';
const key = String(process.env.AES_KEY);  // Key must be 32 bytes for aes-256-cbc
const iv = String(process.env.AES_IV);   // Initialization vector must be 16 bytes

export function encryptAES(text: string) {
    const cipher = createCipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

export function decryptAES(encryptedData: string): string {
    // Verifica se a string está no formato hexadecimal e tem o comprimento adequado
    if (!/^[a-fA-F0-9]+$/.test(encryptedData) || encryptedData.length % 2 !== 0) {
        return encryptedData;
    }
    const decipher = createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}