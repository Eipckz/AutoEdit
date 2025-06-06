import express from 'express';
import multer from 'multer';
import { spawn } from 'child_process';
import fs from 'fs';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/api/transcribe', upload.single('video'), (req, res) => {
  const filePath = req.file?.path;
  if (!filePath) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }
  const py = spawn('python3', ['scripts/transcribe.py', filePath]);
  let out = '';
  let err = '';
  py.stdout.on('data', d => { out += d.toString(); });
  py.stderr.on('data', d => { err += d.toString(); });
  py.on('close', code => {
    fs.unlink(filePath, () => {});
    if (code !== 0) {
      console.error('transcribe.py failed', err);
      res.status(500).json({ error: err.trim() });
    } else {
      res.json({ transcript: out.trim() });
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Local backend running on port ${PORT}`);
});
