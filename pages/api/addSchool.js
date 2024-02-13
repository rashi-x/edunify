export const config = {
  api: {
    bodyParser: false
  }
}
import { connect } from '../../src/db'; 
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/schoolImages'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }); 

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const conn = await connect();

    upload.single('image')(req, res, async function(err) {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to upload image');
        return;
      }

      const { name, address, city, state, contact, email_id } = req.body;
      const image = req.file.path; 
      try {
        await conn.query(
          'INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [name, address, city, state, contact, email_id, image]
        );
        res.status(200).send('School added successfully');
      } catch (error) {
        console.error('Failed to add school:', error);
        res.status(500).send('Failed to add school');
      }
    });
  } else {
    res.status(405).end(); 
}
}