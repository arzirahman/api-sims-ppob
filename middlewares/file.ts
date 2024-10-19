import multer from 'multer'

const storage = multer.memoryStorage();
export const file = multer({ storage });