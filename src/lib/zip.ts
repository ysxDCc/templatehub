import zlib from 'zlib';

export interface ZipFileEntry {
  path: string;
  content: string | Buffer;
}

/**
 * Creates a standard PKZIP archive buffer from a list of files using native Node.js zlib.
 * No external dependencies required.
 */
export function createZipArchive(files: ZipFileEntry[]): Buffer {
  const localFileChunks: Buffer[] = [];
  const centralDirChunks: Buffer[] = [];
  let offset = 0;

  for (const file of files) {
    const filenameBuf = Buffer.from(file.path, 'utf8');
    const uncompressedBuf = Buffer.isBuffer(file.content)
      ? file.content
      : Buffer.from(file.content, 'utf8');

    // Deflate compression
    const compressedBuf = zlib.deflateRawSync(uncompressedBuf);
    const useCompressed = compressedBuf.length < uncompressedBuf.length;
    const finalData = useCompressed ? compressedBuf : uncompressedBuf;
    const compressionMethod = useCompressed ? 8 : 0; // 8 = Deflate, 0 = Store

    const crc = crc32(uncompressedBuf);
    const now = new Date();
    const dosTime =
      ((now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1)) & 0xffff;
    const dosDate =
      (((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate()) & 0xffff;

    // --- Local File Header (PK\x03\x04) ---
    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0); // signature
    localHeader.writeUInt16LE(20, 4); // version needed (2.0)
    localHeader.writeUInt16LE(0, 6); // general purpose bit flag
    localHeader.writeUInt16LE(compressionMethod, 8);
    localHeader.writeUInt16LE(dosTime, 10);
    localHeader.writeUInt16LE(dosDate, 12);
    localHeader.writeUInt32LE(crc, 14);
    localHeader.writeUInt32LE(finalData.length, 18); // compressed size
    localHeader.writeUInt32LE(uncompressedBuf.length, 22); // uncompressed size
    localHeader.writeUInt16LE(filenameBuf.length, 26);
    localHeader.writeUInt16LE(0, 28); // extra field length

    localFileChunks.push(localHeader, filenameBuf, finalData);

    // --- Central Directory File Header (PK\x01\x02) ---
    const cdHeader = Buffer.alloc(46);
    cdHeader.writeUInt32LE(0x02014b50, 0); // signature
    cdHeader.writeUInt16LE(20, 4); // version made by
    cdHeader.writeUInt16LE(20, 6); // version needed
    cdHeader.writeUInt16LE(0, 8); // flags
    cdHeader.writeUInt16LE(compressionMethod, 10);
    cdHeader.writeUInt16LE(dosTime, 12);
    cdHeader.writeUInt16LE(dosDate, 14);
    cdHeader.writeUInt32LE(crc, 16);
    cdHeader.writeUInt32LE(finalData.length, 20);
    cdHeader.writeUInt32LE(uncompressedBuf.length, 24);
    cdHeader.writeUInt16LE(filenameBuf.length, 28);
    cdHeader.writeUInt16LE(0, 30); // extra length
    cdHeader.writeUInt16LE(0, 32); // comment length
    cdHeader.writeUInt16LE(0, 34); // disk number start
    cdHeader.writeUInt16LE(0, 36); // internal file attributes
    cdHeader.writeUInt32LE(0, 38); // external file attributes
    cdHeader.writeUInt32LE(offset, 42); // relative offset of local header

    centralDirChunks.push(cdHeader, filenameBuf);

    offset += localHeader.length + filenameBuf.length + finalData.length;
  }

  const centralDirBuffer = Buffer.concat(centralDirChunks);
  const cdOffset = offset;
  const cdLength = centralDirBuffer.length;

  // --- End of Central Directory Record (PK\x05\x06) ---
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0); // signature
  eocd.writeUInt16LE(0, 4); // disk number
  eocd.writeUInt16LE(0, 6); // disk with start of central directory
  eocd.writeUInt16LE(files.length, 8); // total entries on this disk
  eocd.writeUInt16LE(files.length, 10); // total entries
  eocd.writeUInt32LE(cdLength, 12); // size of central directory
  eocd.writeUInt32LE(cdOffset, 16); // offset of start of central directory
  eocd.writeUInt16LE(0, 20); // zip comment length

  return Buffer.concat([...localFileChunks, centralDirBuffer, eocd]);
}

/** Standard CRC32 table implementation */
let crcTable: Uint32Array | null = null;
function getCrcTable(): Uint32Array {
  if (crcTable) return crcTable;
  crcTable = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[i] = c >>> 0;
  }
  return crcTable;
}

function crc32(buf: Buffer): number {
  const table = getCrcTable();
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
