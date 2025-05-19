require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Debate = require('./models/Debate');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/debateapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

const upload = multer({ dest: path.join(__dirname, 'uploads') });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// 🎙️ POST /createDebate – Transcribe with Whisper, save to Mongo, return debateId + transcript
app.post('/createDebate', upload.single('audio'), async (req, res) => {
  try {
    const { topic, rounds } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'Audio file missing' });
    }

    // 1️⃣ Transcribe with Whisper
    const whisperResp = await openai.createTranscription(
      fs.createReadStream(req.file.path),
      'whisper-1',
      '',
      'json'
    );
    const transcript = whisperResp.data.text;

    // 2️⃣ Save debate
    const debate = new Debate({
      topic,
      totalRounds: Number(rounds),
      currentRound: 1,
      initiatorRecording: req.file.path,
      transcript,
    });
    await debate.save();

    // 3️⃣ Respond
    res.json({ debateId: debate._id, transcript });
  } catch (err) {
    console.error('❌ Error in /createDebate:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 📄 GET /getDebate – Pull debate by ID
app.get('/getDebate', async (req, res) => {
  try {
    const { debateId } = req.query;
    const debate = await Debate.findById(debateId);
    if (!debate) return res.status(404).json({ error: 'Debate not found' });
    res.json(debate);
  } catch (err) {
    console.error('❌ Error fetching debate:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 50001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});