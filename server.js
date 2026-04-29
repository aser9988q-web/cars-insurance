import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// تقديم الملفات الثابتة من المجلد الحالي
app.use(express.static(__dirname, {
  maxAge: '1d',
  etag: false
}));

// تقديم مجلد assets بشكل صريح
app.use('/assets', express.static(join(__dirname, 'assets'), {
  maxAge: '1d',
  etag: false
}));

// جميع الطلبات الأخرى ترجع index.html (للتطبيقات أحادية الصفحة)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving static files from ${__dirname}`);
});
