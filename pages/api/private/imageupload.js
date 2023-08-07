import multer from 'multer';

export const config = {
  api: {
    bodyParser: false
  }
};
const upload = multer({ dest: 'public/uploads/' }); // Specify the destination folder for uploads

export default function handler(req, res) {
  upload.single('image')(req, res, (err) => {
    if (err) {
      // Handle upload error
      return res.status(400).json({ error: err.message });
    }
    console.log(req.file)
    return res.status(200).json({ message: 'File uploaded successfully' });
  });
}