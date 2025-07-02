import express from 'express';
import Result from '../models/Results.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const result = new Result({
      ...req.body,
      enrollment: req.body.enrollment.toLowerCase().trim(),
      dob: req.body.dob
    });

    console.log("Saving:", JSON.stringify(result, null, 2));

    await result.save();
    res.status(201).json({ message: 'Result uploaded successfully' });
  } catch (error) {
    console.error('Error saving result:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/', async (req, res) => {
  const { enrollment, dob } = req.query;
  try {
    const student = await Result.findOne({
      enrollment: enrollment.toLowerCase().trim(),
      dob
    });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

function formatToDDMMYYYY(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}${month}${year}`;
}
