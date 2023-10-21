const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());

app.use(bodyParser.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully.');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const formSettingsSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  titleTextColor: String,
  subtitleTextColor: String,
  todo: String,
  color: String,
  // Add other fields as needed
});

const FormSettings = mongoose.model('FormSettings', formSettingsSchema);
const formSettings = new FormSettings({
  title: 'Form Title',
  subtitle: 'Form Subtitle',
  titleTextColor: '#000000',
  subtitleTextColor: '#000000',
  todo: 'Submit Button',
  color: '#000000',
});

formSettings.save();
// Define your API endpoint
app.post('/api/settings', async (req, res) => {
  try {
    const formData = req.body;
    const formSettings = new FormSettings(formData);
    await formSettings.save();
    res.status(201).json({ message: 'Form settings saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = process.env.PORT || 5173;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
