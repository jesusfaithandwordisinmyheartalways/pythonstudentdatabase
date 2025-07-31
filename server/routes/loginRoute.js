import express from 'express';
import { spawn } from 'child_process';

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const python = spawn('python3', ['python/validate_login_standalone.py', username, password]);

  let output = '';
  python.stdout.on('data', (data) => {
    output += data.toString();
  });

  python.stderr.on('data', (err) => {
    console.error('Python stderr:', err.toString());
  });

  python.on('close', () => {
    if (output.includes('SUCCESS')) {
      res.status(200).json({ msg: 'Login successful' });
    } else {
      const error = output.replace('ERROR:', '').trim();
      res.status(401).json({ error });
    }
  });
});

export default router;