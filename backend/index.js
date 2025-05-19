// backend/index.js
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const Debate = require('./debateModel');

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

mongoose.connect('mongodb://127.0.0.1:27017/debateapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'));

app.use(cors());
app.use(express.json());

app.post('/createDebate', upload.single('audio'), async (req, res) => {
  try {
    const { topic, rounds } = req.body;
    const audioBuffer = req.file.buffer;

    const debate = new Debate({
      topic,
      totalRounds: parseInt(rounds),
      rounds: [{
        player1AudioUrl: 'placeholder-url',
        player1Feedback: 'Feedback pending'
      }]
    });

    await debate.save();
    res.status(200).json({ debateId: debate._id });
  } catch (err) {
    console.error('❌ Error creating debate:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getDebate', async (req, res) => {
  const { debateId } = req.query;
  try {
    const debate = await Debate.findById(debateId);
    res.status(200).json(debate);
  } catch (err) {
    console.error('❌ Error fetching debate:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(50001, () => console.log('🚀 Server running on http://localhost:50001'));