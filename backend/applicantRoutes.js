const express = require('express');
const Job = require('../models/Job');
const Resume = require('../models/Resume');
const Recruiter = require('../models/Recruiter');
const authenticate = require('../middleware/auth'); // Authentication middleware

const router = express.Router();

// Fetch applicants who applied for jobs posted by the logged-in recruiter
router.get('/applicants', authenticate, async (req, res) => {
  try {
    // Get the logged-in recruiter email from the authenticated user
    const recruiterEmail = req.user.email; // The email is stored in req.user after authentication

    // Find the recruiter by email to get the recruiterId
    const recruiter = await Recruiter.findOne({ email: recruiterEmail });
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }

    // Fetch all jobs posted by this recruiter
    const jobs = await Job.find({ recruiterId: recruiter._id });

    if (jobs.length === 0) {
      return res.status(404).json({ message: 'No jobs found for this recruiter' });
    }

    // Extract the jobIds from the fetched jobs
    const jobIds = jobs.map(job => job._id);

    // Fetch all resumes where the jobId matches the jobIds posted by the recruiter
    const applicants = await Resume.find({ jobId: { $in: jobIds } }).populate('jobId');

    // Return the applicants (resumes)
    res.status(200).json({ applicants });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch applicants' });
  }
});

module.exports = router;
