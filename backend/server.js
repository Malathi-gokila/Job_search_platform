// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch((err) => console.error('❌ MongoDB connection error:', err));

// // Applicant Schema
// const applicantSchema = new mongoose.Schema({
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
// });
// const Applicant = mongoose.model('Applicant', applicantSchema);

// // Recruiter Schema
// const recruiterSchema = new mongoose.Schema({
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   bio: String,
//   phoneNumber: String,
// });
// const Recruiter = mongoose.model('Recruiter', recruiterSchema);

// // Register Route
// app.post('/register', async (req, res) => {
//   const { email, password, category, bio, phoneNumber } = req.body;

//   if (!email || !password || !category) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const existingUser = await Applicant.findOne({ email }) || await Recruiter.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already in use' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     if (category === 'applicant') {
//       const newApplicant = new Applicant({ email, password: hashedPassword });
//       await newApplicant.save();
//       return res.status(201).json({ message: 'Applicant registered successfully' });
//     } else if (category === 'recruiter') {
//       const newRecruiter = new Recruiter({ email, password: hashedPassword, bio, phoneNumber });
//       await newRecruiter.save();
//       return res.status(201).json({ message: 'Recruiter registered successfully' });
//     } else {
//       return res.status(400).json({ message: 'Invalid category' });
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Server error during registration' });
//   }
// });

// // Login Route
// app.post('/login', async (req, res) => {
//   const { email, password, category } = req.body;

//   if (!email || !password || !category) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     let user;

//     if (category === 'applicant') {
//       user = await Applicant.findOne({ email });
//     } else if (category === 'recruiter') {
//       user = await Recruiter.findOne({ email });
//     } else {
//       return res.status(400).json({ message: 'Invalid category' });
//     }

//     if (!user) {
//       return res.status(404).json({ message: 'User not found. Please register first' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.email, category },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     return res.json({ token, category });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Server error during login' });
//   }
// });

// // Start the Server
// app.listen(5000, () => {
//   console.log('🚀 Server running on port 5000');
// });

const express = require('express');
const axios = require('axios');
const natural = require('natural');
const math = require('mathjs');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require("multer");
const path = require("path");
const pdf = require('pdf-parse'); // Import pdf-parse
const fs = require('fs');
const { spawn } = require('child_process'); // For running Python script
const { Resend } = require('resend');

// Initialize Resend client
const resend = new Resend('re_9hTXYy5F_HshrtsXUaw3tF3jik8hjGJcf'); // 🔥 put your API key
dotenv.config();

const app = express();
app.use(express.json());

// Allow CORS for frontend requests from specific origin
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend's URL (adjust if necessary)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Applicant Schema
const applicantSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});
const Applicant = mongoose.model('Applicant', applicantSchema);

// Recruiter Schema
const recruiterSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  bio: String,
  phoneNumber: String,
  company: { type: String, required: true }, // Company is now required
});
const Recruiter = mongoose.model('Recruiter', recruiterSchema);

// Job Schema
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter', required: true },
});
const Job = mongoose.model('Job', jobSchema);

// const resumeSchema = new mongoose.Schema({
//   fullName: String,
//   email: String,
//   phone: String,
//   resumePath: String,
//   coverLetter: String,
//   jobId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'Job',
//     required: true,
//    }, // Assuming you have a Job model
//   status: {
//     type: String,
//     enum: ['Not Selected', 'Selected', 'Interview Scheduled'],
//     default: 'Not Selected',
//   },
// });

// const Resume = mongoose.model("Resume", resumeSchema);

const resumeSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  resumePath: String,
  coverLetter: String,
  jobId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Job',
    required: true,
  },
  status: {
    type: String,
    enum: ['Not Selected', 'Selected', 'Interview Scheduled', 'Rejected'], // <-- Added "Rejected"
    default: 'Not Selected',
  },
});

const Resume = mongoose.model("Resume", resumeSchema);

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   name: String,
//   bio: String,
//   skills: String,
//   education: String, // Add education field
//   profilePic: String, // Path to the profile picture
//   contactInfo: String,
// });

// const User = mongoose.model('User', userSchema);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  bio: String,
  skills: String,
  technicalSkills: String,
  softSkills: String,
  workExperience: String,
  education: String,
  certifications: String,
  projects: String,
  resume: String, // Path to the resume file
  jobPreferences: String,
  languages: String,
  socialLinks: String,
  achievements: String,
  availability: String,
  location: String,
  contactInfo: String,
  profilePic: String, // Path to the profile picture
});

const User = mongoose.model('User', userSchema);








// const deleteAllRecords = async () => {
//   try {
//     // Remove all applicants
//     await Applicant.deleteMany({});
//     console.log("All applicants removed");

//     // Remove all recruiters
//     await Recruiter.deleteMany({});
//     console.log("All recruiters removed");

//     // Remove all jobs
//     await Job.deleteMany({});
//     console.log("All jobs removed");

//     // Remove all resumes
//     await Resume.deleteMany({});
//     console.log("All resumes removed");
//   } catch (err) {
//     console.error("Error removing records:", err);
//   }
// };

// // Call the function to delete all records
// deleteAllRecords();


const authenticate = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  // Remove "Bearer " prefix if present
  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded JWT:", decoded); // Debugging step

    if (!decoded.id) {
      return res.status(401).json({ message: "Invalid token: Missing recruiter ID" });
    }

    req.user = { id: decoded.id, email: decoded.email }; // Store recruiter ID in req.user
    console.log("✅ Middleware: Authenticated user:", req.user); // Debugging

    next();
  } catch (err) {
    console.error("❌ JWT Verification Error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};


// Register Route
app.post('/register', async (req, res) => {
  const { email, password, category, bio, phoneNumber, company } = req.body;

  if (!email || !password || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await Applicant.findOne({ email }) || await Recruiter.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (category === 'applicant') {
      const newApplicant = new Applicant({ email, password: hashedPassword });
      await newApplicant.save();
      return res.status(201).json({ message: 'Applicant registered successfully' });
    } else if (category === 'recruiter') {
      if (!company) {
        return res.status(400).json({ message: 'Company is required for recruiters' });
      }
      const newRecruiter = new Recruiter({ email, password: hashedPassword, bio, phoneNumber, company });
      await newRecruiter.save();
      return res.status(201).json({ message: 'Recruiter registered successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid category' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password, category } = req.body;

  if (!email || !password || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    let user;

    if (category === 'applicant') {
      user = await Applicant.findOne({ email });
    } else if (category === 'recruiter') {
      user = await Recruiter.findOne({ email });
    } else {
      return res.status(400).json({ message: 'Invalid category' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found. Please register first' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, category },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send token, email, and category back in the response
    return res.json({
      token,
      email: user.email,  // Send email in the response
      category,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error during login' });
  }
});


// Route to add a job (only accessible by recruiters)
app.post('/api/addJob', authenticate, async (req, res) => {
  const { title, description, location, salary } = req.body;
  const recruiterId = req.user.id; // Get recruiter ID from JWT

  if (!title || !description || !location || !salary) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }

    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyName: recruiter.company, // Use recruiter’s company name
      recruiterId,
    });

    await newJob.save();
    res.status(201).json({ message: 'Job posted successfully', job: newJob });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error during job posting' });
  }
});

app.get("/api/all-jobs", authenticate, async (req, res) => {
  try {
    console.log("🟢 Fetching all jobs...");
    
    const jobs = await Job.find(); // Fetch all jobs without filtering by recruiterId
    
    console.log("✅ Total Jobs Found:", jobs.length);
    res.json(jobs);
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



app.get("/api/jobs", authenticate, async (req, res) => {
  try {
    console.log("🟢 Received Request for Jobs - Recruiter ID:", req.user.id);

    if (!req.user.id) {
      return res.status(400).json({ message: "Recruiter ID missing from request" });
    }

    // Ensure recruiterId is an ObjectId for MongoDB
    const recruiterId = new mongoose.Types.ObjectId(req.user.id);
    const jobs = await Job.find({ recruiterId });

    console.log("✅ Jobs Found:", jobs.length); // Debugging

    res.json(jobs);
  } catch (error) {
    console.error("❌ Error fetching recruiter's jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Set up Multer storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// Post route for submitting the form
app.post("/submitApplication", upload.single("resume"), async (req, res) => {
  try {
    const { fullName, email, phone, coverLetter, jobId } = req.body;
    const resumePath = req.file ? `uploads/${req.file.filename}` : null;

    const newResume = new Resume({
      fullName,
      email,
      phone,
      resumePath,
      coverLetter,
      jobId,
      status: 'Not Selected',
    });

    await newResume.save();
    res.status(200).send("Application submitted successfully!");
  } catch (error) {
    console.error("Error saving the application:", error); // ✅ helpful log
    res.status(500).send("Error saving the application");
  }
});

// New route to get applied jobs for the user
// app.get("/api/applied-jobs", authenticate, async (req, res) => {
//   try {
//     console.log("🟢 Received Request for Applied Jobs - User Email:", req.user.email);

//     // Ensure that the user is authenticated and we have the email
//     if (!req.user.email) {
//       return res.status(400).json({ message: "User email missing from request" });
//     }

//     // Find resumes for the logged-in user
//     const resumes = await Resume.find({ email: req.user.email });

//     if (resumes.length === 0) {
//       return res.status(404).json({ message: "No applied jobs found" });
//     }

//     // Extract jobIds from the resumes
//     const jobIds = resumes.map((resume) => resume.jobId);

//     // Fetch the jobs associated with the jobIds
//     const jobs = await Job.find({ _id: { $in: jobIds } });

//     console.log("✅ Applied Jobs Found:", jobs.length); // Debugging

//     // Return the applied jobs
//     res.json(jobs);
//   } catch (error) {
//     console.error("❌ Error fetching applied jobs:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


app.get("/api/applied-jobs", authenticate, async (req, res) => {
  try {
    console.log("🟢 Received Request for Applied Jobs - User Email:", req.user.email);

    if (!req.user.email) {
      return res.status(400).json({ message: "User email missing from request" });
    }

    // Find resumes for the logged-in user and populate job data
    const resumes = await Resume.find({ email: req.user.email }).populate("jobId");

    if (resumes.length === 0) {
      return res.status(404).json({ message: "No applied jobs found" });
    }

    // Combine job info with status
    const appliedJobs = resumes.map((resume) => ({
      _id: resume._id, // Resume ID
      status: resume.status,
      job: {
        _id: resume.jobId._id,
        title: resume.jobId.title,
        description: resume.jobId.description,
        location: resume.jobId.location,
        salary: resume.jobId.salary,
        // add other job fields if needed
      },
    }));

    res.json(appliedJobs);
  } catch (error) {
    console.error("❌ Error fetching applied jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/api/resumes/:resumeId', authenticate, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.resumeId).populate('jobId');
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(200).json({
      fullName: resume.fullName,
      email: resume.email,
      jobId: resume.jobId, // Populated job object
      resumePath: resume.resumePath,
    });
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ message: 'Error fetching resume' });
  }
});

app.delete('/api/resumes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedResume = await Resume.findByIdAndDelete(id);
    
    if (!deletedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Preprocessing function
// // Preprocess function
// const preprocess = (text) => {
//   text = text.toLowerCase();
//   text = text.replace(/[^a-z\s]/g, '');
//   const tokens = text.split(' ').filter(t => t.trim() !== '');
//   return tokens;
// };

// // TF-IDF calculation
// const calculateTFIDF = (documents) => {
//   const tfidf = new natural.TfIdf();
//   documents.forEach(doc => tfidf.addDocument(doc));
//   return tfidf;
// };

// // TF-IDF vector generation
// const getTFIDFVector = (tfidf, docIndex, allTerms) => {
//   const vector = new Array(allTerms.length).fill(0);
//   tfidf.listTerms(docIndex).forEach(term => {
//     const termIndex = allTerms.indexOf(term.term);
//     if (termIndex !== -1) {
//       vector[termIndex] = term.tfidf;
//     }
//   });
//   return vector;
// };

// // Cosine similarity function
// const cosineSimilarity = (vecA, vecB) => {
//   const dotProduct = math.dot(vecA, vecB);
//   const magnitudeA = math.sqrt(math.dot(vecA, vecA));
//   const magnitudeB = math.sqrt(math.dot(vecB, vecB));
//   if (magnitudeA === 0 || magnitudeB === 0) {
//     return 0; // Handle zero magnitude
//   }
//   return dotProduct / (magnitudeA * magnitudeB);
// };

// // Endpoint to rank resumes
// app.post('/api/rank_resumes', authenticate, async (req, res) => {
//   try {
//     const { jobId, jobTitle, jobDescription } = req.body;

//     if (!jobId || !jobTitle || !jobDescription) {
//       return res.status(400).json({ message: 'Job ID, title, and description are required.' });
//     }

//     // Preprocess the job description
//     const processedJobDesc = preprocess(jobDescription);

//     // Fetch resumes
//     const recruiterEmail = req.user.email;
//     const recruiter = await Recruiter.findOne({ email: recruiterEmail });
//     if (!recruiter) {
//       return res.status(404).json({ message: 'Recruiter not found.' });
//     }

//     const jobs = await Job.find({ recruiterId: recruiter._id });
//     if (jobs.length === 0) {
//       return res.status(404).json({ message: 'No jobs found for this recruiter.' });
//     }

//     const jobIds = jobs.map(job => job._id);

//     const resumes = await Resume.find({ jobId }).populate('jobId');
//     // const resumes = await Resume.find({ jobId: { $in: jobIds } }).populate('jobId');

//     if (resumes.length === 0) {
//       return res.status(404).json({ message: 'No resumes found for the specified jobs.' });
//     }

//     const resumeTexts = {};
//     const skippedResumes = [];

//     for (const resume of resumes) {
//       const resumePath = path.join(__dirname, resume.resumePath);
//       let fullText = '';

//       try {
//         if (!fs.existsSync(resumePath)) {
//           console.warn(`Resume file not found: ${resumePath}`);
//           skippedResumes.push({ resumeId: resume._id, reason: 'File not found' });
//           continue;
//         }

//         const dataBuffer = fs.readFileSync(resumePath);
//         const data = await pdf(dataBuffer);
//         fullText = data.text;

//         if (!fullText.trim()) {
//           console.warn(`Empty text extracted from resume: ${resumePath}`);
//           skippedResumes.push({ resumeId: resume._id, reason: 'Empty text extracted' });
//           continue;
//         }

//         resumeTexts[resume._id] = preprocess(fullText);
//       } catch (pdfError) {
//         console.error(`Error extracting text from ${resume.resumePath}:`, pdfError.message);
//         skippedResumes.push({ resumeId: resume._id, reason: `PDF parsing error: ${pdfError.message}` });
//         continue;
//       }
//     }

//     if (Object.keys(resumeTexts).length === 0) {
//       return res.status(400).json({
//         message: 'No valid resumes could be processed.',
//         skippedResumes,
//       });
//     }

//     // Calculate TF-IDF
//     const allDocuments = [processedJobDesc, ...Object.values(resumeTexts)];
//     const tfidf = calculateTFIDF(allDocuments);

//     // Create a unified vocabulary
//     const allTerms = new Set();
//     for (let i = 0; i < allDocuments.length; i++) {
//       tfidf.listTerms(i).forEach(term => allTerms.add(term.term));
//     }
//     const termList = Array.from(allTerms);

//     // Generate TF-IDF vectors
//     const jobVector = getTFIDFVector(tfidf, 0, termList);
//     const resumeVectors = Object.keys(resumeTexts).map((resumeId, index) => {
//       return getTFIDFVector(tfidf, index + 1, termList);
//     });

//     // Calculate cosine similarity
//     const similarities = resumeVectors.map(resumeVector => {
//       return cosineSimilarity(jobVector, resumeVector);
//     });

//     // Combine resume IDs with their similarity scores
//     const rankedResumes = Object.keys(resumeTexts).map((resumeId, index) => ({
//       resumeId,
//       similarity: similarities[index],
//     }));

//     // Sort resumes by similarity score in descending order
//     rankedResumes.sort((a, b) => b.similarity - a.similarity);

//     return res.status(200).json({
//       rankedResumes,
//       skippedResumes,
//     });
//   } catch (error) {
//     console.error('Error ranking resumes:', error);
//     return res.status(500).json({ message: 'An error occurred while ranking resumes.' });
//   }
// });


app.patch('/:resumeId/status', async (req, res) => {
  const { resumeId } = req.params;
  const { status } = req.body; // Expected: 'Selected' or 'Rejected'

  if (!mongoose.Types.ObjectId.isValid(resumeId)) {
    return res.status(400).json({ message: 'Invalid Resume ID format' });
  }

  // Validate the status against your schema's enum
  const allowedStatuses = Resume.schema.path('status').enumValues;
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: `Invalid status. Must be one of: ${allowedStatuses.join(', ')}` });
  }

  try {
    const updatedResume = await Resume.findByIdAndUpdate(
      resumeId,
      { status: status },
      { new: true, runValidators: true } // new: true returns the updated doc, runValidators ensures enum is checked
    );

    if (!updatedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(updatedResume); // Send back the updated applicant data
  } catch (error) {
    console.error('Error updating resume status:', error);
    if (error.name === 'ValidationError') {
        return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error while updating status' });
  }
});



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Your existing preprocess function (can be simpler for BERT, but still useful for cleaning)
const preprocessTextForBert = (text) => {
  if (!text) return '';
  text = text.toLowerCase();
  // BERT is robust, so aggressive stripping might not be needed.
  // Focus on normalizing whitespace and basic cleaning.
  text = text.replace(/\s+/g, ' ').trim(); // Replace multiple spaces with single, trim
  // You might remove highly specific characters if they cause issues, but generally less is more.
  // text = text.replace(/[^a-z0-9\s.,!?'\-]/g, ''); // Example: keep some punctuation
  return text;
};


// Endpoint to rank resumes using BERT
app.post('/api/rank_resumes', authenticate, async (req, res) => {
  try {
    const { jobId, jobTitle, jobDescription } = req.body;

    if (!jobId || !jobTitle || !jobDescription) {
      return res.status(400).json({ message: 'Job ID, title, and description are required.' });
    }

    // Preprocess the job description for BERT
    const processedJobDescText = preprocessTextForBert(jobDescription);

    // Fetch resumes (similar to your existing logic)
    // const recruiterEmail = req.user.email; // Assuming authenticate middleware adds user
    // const recruiter = await Recruiter.findOne({ email: recruiterEmail });
    // if (!recruiter) {
    //   return res.status(404).json({ message: 'Recruiter not found.' });
    // }
    // const jobs = await Job.find({ recruiterId: recruiter._id });
    // if (jobs.length === 0) {
    //   return res.status(404).json({ message: 'No jobs found for this recruiter.' });
    // }
    // const jobIds = jobs.map(job => job._id);

    // Fetch resumes specifically for the given jobId
    const resumesFromDB = await Resume.find({ jobId }); // Removed .populate, not needed for text

    if (resumesFromDB.length === 0) {
      return res.status(200).json({ // Send 200 with empty array if no resumes
        rankedResumes: [],
        skippedResumes: [],
        message: 'No resumes found for the specified job.'
      });
    }

    const resumeTextsForPython = {};
    const skippedResumes = [];

    for (const resume of resumesFromDB) {
      const resumePath = path.join(__dirname, resume.resumePath);
      let fullText = '';

      try {
        if (!fs.existsSync(resumePath)) {
          console.warn(`Resume file not found: ${resumePath}`);
          skippedResumes.push({ resumeId: resume._id.toString(), reason: 'File not found' });
          continue;
        }

        const dataBuffer = fs.readFileSync(resumePath);
        const data = await pdf(dataBuffer);
        fullText = data.text;

        if (!fullText || !fullText.trim()) {
          console.warn(`Empty text extracted from resume: ${resumePath}`);
          skippedResumes.push({ resumeId: resume._id.toString(), reason: 'Empty text extracted' });
          continue;
        }
        // Preprocess resume text for BERT
        resumeTextsForPython[resume._id.toString()] = preprocessTextForBert(fullText);

      } catch (pdfError) {
        console.error(`Error extracting text from ${resume.resumePath}:`, pdfError.message);
        skippedResumes.push({ resumeId: resume._id.toString(), reason: `PDF parsing error: ${pdfError.message}` });
        continue;
      }
    }

    if (Object.keys(resumeTextsForPython).length === 0) {
      return res.status(200).json({ // Send 200
        message: 'No valid resumes could be processed.',
        rankedResumes: [],
        skippedResumes,
      });
    }

    // Call Python script for BERT-based ranking
    const pythonProcess = spawn(process.env.PYTHON_PATH || 'python', [path.join(__dirname, 'bert_similarity.py')]); // or 'python3'

    let pythonData = '';
    let pythonError = '';

    pythonProcess.stdout.on('data', (data) => {
      pythonData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      pythonError += data.toString();
    });

    pythonProcess.on('close', (code) => {
      // Primarily rely on exit code for actual Python execution errors
      if (code !== 0) {
        console.error(`Python script exited with error code ${code}. Stderr: ${pythonError}`);
        return res.status(500).json({
          message: 'Error during BERT ranking process: Python script failed.',
          error: pythonError || 'Python script exited with non-zero code.',
          skippedResumes,
        });
      }

      // If code is 0, proceed to parse output, but log stderr if present (as warnings)
      if (pythonError) {
        console.warn(`Python script stderr (exit code 0): ${pythonError}`);
        // These are likely warnings from TensorFlow/Python, not fatal errors if code is 0
      }

      // Check if pythonData is empty, which might happen if the script had no input or an issue
      if (!pythonData.trim()) {
        console.warn('Python script produced no stdout data, though it exited successfully.');
        // Decide how to handle this: maybe it's okay if resumeTextsForPython was empty
        // or it could indicate an issue if input was provided.
        return res.status(200).json({
          message: Object.keys(resumeTextsForPython).length > 0
            ? 'Ranking process completed, but no results from script. Check Python script logs.'
            : 'No resumes were processed or sent for ranking.',
          rankedResumes: [],
          skippedResumes,
        });
      }

      try {
        const result = JSON.parse(pythonData);
        // Check for an explicit 'error' field in the JSON response from Python
        if (result.error) {
            console.error('Python script returned an error in its JSON output:', result.error);
            return res.status(500).json({
              message: 'Error from BERT ranking script (JSON error field).',
              error: result.error,
              skippedResumes
            });
        }
        
        let finalRankedResumes = result.rankedResumes || [];
        finalRankedResumes.sort((a, b) => b.similarity - a.similarity);

        return res.status(200).json({
          rankedResumes: finalRankedResumes,
          skippedResumes,
        });
      } catch (parseError) {
        // This catches errors if pythonData is not valid JSON
        console.error('Error parsing Python script stdout JSON output:', parseError.message);
        console.error('Raw Python stdout data:', pythonData); // Log raw data for debugging
        return res.status(500).json({
          message: 'Error parsing ranking results from Python script.',
          error: `Failed to parse JSON: ${parseError.message}`,
          rawOutput: pythonData.substring(0, 500), // Send a snippet of raw output
          skippedResumes,
        });
      }
    });

    // Send data to Python script's stdin
    pythonProcess.stdin.write(JSON.stringify({
      jobDescription: processedJobDescText,
      resumes: resumeTextsForPython,
    }));
    pythonProcess.stdin.end();

  } catch (error) {
    console.error('Error in /api/rank_resumes endpoint:', error);
    return res.status(500).json({ message: 'An error occurred while ranking resumes.', error: error.message });
  }
});




app.post('/api/updateApplicantStatus', async (req, res) => {
  const { resumeId, status } = req.body;

  try {
    const updated = await Resume.findByIdAndUpdate(
      resumeId,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    res.json({ success: true, resume: updated });
  } catch (err) {
    console.error('Failed to update applicant status:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/api/schedule-interview', authenticate, async (req, res) => {
  console.log('Received POST /schedule-interview');
  try {
    console.log("Authenticated user:", req.user);
    const { jobId, interviewDate, interviewTime } = req.body;
    console.log("Received request body:", req.body);
    const recruiterId = req.user.id; // Extract recruiterId from token

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: 'Invalid jobId format' });
    }

    const job = await Job.findOne({ 
      _id: new mongoose.Types.ObjectId(jobId), // ✅ use 'new' here
      recruiterId 
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found or not posted by this recruiter.' });
    }

    // Find all resumes with "Selected" status for this job
    const selectedResumes = await Resume.find({ jobId, status: 'Selected' });

    if (selectedResumes.length === 0) {
      return res.status(404).json({ message: 'No selected applicants found for this job.' });
    }

    // Function to send emails and update resumes
    const sendEmailsAndUpdateResumes = async () => {
      const emailPromises = selectedResumes.map(async (resume) => {
        const applicantEmail = resume.email;
        const recruiterEmail = req.user.email; // dynamic email (will use in replyTo)
        const recruiterName = job.companyName; // fallback if name not available

        const subject = `Interview Scheduled for ${job.title}`;
        const message = `
          Dear ${resume.fullName},

          Congratulations! You have been selected for the ${job.title} position at ${job.companyName}.
          We have scheduled your interview with the following details:

          Date: ${interviewDate}
          Time: ${interviewTime}

          Please confirm your availability.

          Best Regards,
          ${job.companyName}
        `;

        try {
          // Send email using Resend
          await resend.emails.send({
            from: 'divyamaki@resend.dev', // 🔥 Your verified domain email (eg., noreply@yourcompany.com)
            to: applicantEmail,
            subject: subject,
            text: message,
            reply_to: recruiterEmail, // 🔥 Recruiter's real email (dynamic)
          });

          console.log(`Interview email sent to ${applicantEmail}`);

          // Update the status of the resume to "Interview Scheduled"
          const updated = await Resume.findByIdAndUpdate(
            resume._id,
            { status: 'Interview Scheduled' },
            { new: true }
          );

          if (!updated) {
            console.error(`Failed to update status for applicant: ${resume.email}`);
          }
        } catch (error) {
          console.error('Error sending email or updating resume:', error);
        }
      });

      await Promise.all(emailPromises);
    };

    // Call the function
    await sendEmailsAndUpdateResumes();

    res.status(200).json({ success: true, message: 'Interview scheduled and emails sent to selected applicants.' });
  } catch (error) {
    console.error('Error scheduling interview:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// const imagesDir = path.join(__dirname, 'profile_images');
// if (!fs.existsSync(imagesDir)) {
//   fs.mkdirSync(imagesDir, { recursive: true });
// }

// // Set up multer storage configuration (renamed to storage1)
// const storage1 = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, 'profile_images')); // Save images in 'server/profile_images' folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Unique file name based on timestamp
//   }
// });

// // Use 'upload1' instead of 'upload'
// const upload1 = multer({ storage: storage1 });

// app.use(express.json());
// app.use('/profile_images', express.static(path.join(__dirname, 'profile_images'))); // Serve images from 'server/profile_images' folder

// // Update profile with or without profile picture
// app.post('/api/update-profile', upload1.single('profilePic'), async (req, res) => {
//   try {
//     const { email, name, bio, skills, education, contactInfo } = req.body;

//     // Check if the image is uploaded and generate URL for it
//     let profilePicUrl = '';
//     if (req.file) {
//       profilePicUrl = `http://localhost:5000/profile_images/${req.file.filename}`; // Assuming images are saved in 'profile_images' folder
//     }

//     // Update profile information in DB
//     const updatedUser = await User.findOneAndUpdate(
//       { email },
//       { name, bio, skills, education, contactInfo, profilePic: profilePicUrl },
//       { new: true, upsert: true }
//     );

//     res.json({
//       message: 'Profile updated successfully',
//       user: updatedUser
//     });
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// app.get('/api/get-profile', async (req, res) => {
//   try {
//     const { email } = req.query;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "Profile not found" });
//     }

//     res.json({
//       name: user.name,
//       bio: user.bio,
//       skills: user.skills,
//       education: user.education,
//       contactInfo: user.contactInfo,
//       profilePic: user.profilePic || 'https://via.placeholder.com/150' // Default image if profilePic is not set
//     });
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });



// app.use("/profile_images", express.static(path.join(__dirname, "profile_images")));
// app.use("/user_resume", express.static(path.join(__dirname, "user_resume")));

// // Create directories for profile images and resumes
// const profileImagesDir = path.join(__dirname, "profile_images");
// const resumeDir = path.join(__dirname, "user_resume");

// if (!fs.existsSync(profileImagesDir)) {
//   fs.mkdirSync(profileImagesDir, { recursive: true });
// }

// if (!fs.existsSync(resumeDir)) {
//   fs.mkdirSync(resumeDir, { recursive: true });
// }

// // Multer storage for profile picture
// const profilePicStorage1 = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, profileImagesDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// // Multer storage for resume
// const resumeStorage1 = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, resumeDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// // Multer upload setup for multiple fields
// const upload1 = multer({
//   storage: multer.diskStorage({}), // Custom storage handling per field
//   fileFilter: (req, file, cb) => {
//     if (file.fieldname === "profilePic") {
//       // Allow only image files for profilePic
//       if (!file.mimetype.startsWith("image/")) {
//         return cb(new Error("Profile picture must be an image"));
//       }
//     } else if (file.fieldname === "resume") {
//       // Allow only PDF, DOC, DOCX for resume
//       if (!["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.mimetype)) {
//         return cb(new Error("Resume must be a PDF, DOC, or DOCX file"));
//       }
//     }
//     cb(null, true);
//   },
// }).fields([
//   { name: "profilePic", maxCount: 1 },
//   { name: "resume", maxCount: 1 },
// ]);

// // Custom storage handler for different fields
// upload1.storage = (req, file) => {
//   if (file.fieldname === "profilePic") {
//     return profilePicStorage1;
//   } else if (file.fieldname === "resume") {
//     return resumeStorage1;
//   }
// };

// // Update profile route
// app.post("/api/update-profile", (req, res, next) => {
//   upload1(req, res, (err) => {
//     if (err instanceof multer.MulterError) {
//       return res.status(400).json({ message: `Multer error: ${err.message}` });
//     } else if (err) {
//       return res.status(400).json({ message: err.message });
//     }
//     next();
//   });
// }, async (req, res) => {
//   try {
//     const {
//       email,
//       name,
//       bio,
//       skills,
//       technicalSkills,
//       softSkills,
//       workExperience,
//       education,
//       certifications,
//       projects,
//       jobPreferences,
//       languages,
//       socialLinks,
//       achievements,
//       availability,
//       location,
//       contactInfo,
//     } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     // Generate URLs for uploaded files
//     let profilePicUrl = "";
//     let resumeUrl = "";

//     if (req.files && req.files.profilePic) {
//       profilePicUrl = `http://localhost:5000/profile_images/${req.files.profilePic[0].filename}`;
//       console.log(profilePicUrl);
//     }

//     if (req.files && req.files.resume) {
//       resumeUrl = `http://localhost:5000/user_resume/${req.files.resume[0].filename}`;
//       console.log(resumeUrl);
//     }

//     // Update user profile in the database
//     const updatedUser = await User.findOneAndUpdate(
//       { email },
//       {
//         name,
//         bio,
//         skills,
//         technicalSkills,
//         softSkills,
//         workExperience,
//         education,
//         certifications,
//         projects,
//         resume: resumeUrl || undefined, // Only update if a new resume is uploaded
//         jobPreferences,
//         languages,
//         socialLinks,
//         achievements,
//         availability,
//         location,
//         contactInfo,
//         profilePic: profilePicUrl || undefined, // Only update if a new profile picture is uploaded
//       },
//       { new: true, upsert: true }
//     );

//     res.json({
//       message: "Profile updated successfully",
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // Get profile route
// app.get("/api/get-profile", async (req, res) => {
//   try {
//     const { email } = req.query;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "Profile not found" });
//     }

//     res.json({
//       name: user.name || "",
//       bio: user.bio || "",
//       skills: user.skills || "",
//       technicalSkills: user.technicalSkills || "",
//       softSkills: user.softSkills || "",
//       workExperience: user.workExperience || "",
//       education: user.education || "",
//       certifications: user.certifications || "",
//       projects: user.projects || "",
//       resume: user.resume || "",
//       jobPreferences: user.jobPreferences || "",
//       languages: user.languages || "",
//       socialLinks: user.socialLinks || "",
//       achievements: user.achievements || "",
//       availability: user.availability || "",
//       location: user.location || "",
//       contactInfo: user.contactInfo || "",
//       profilePic: user.profilePic || "https://via.placeholder.com/150",
//     });
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });


app.use('/profile_images', express.static(path.join(__dirname, 'profile_images')));
app.use('/user_resume', express.static(path.join(__dirname, 'user_resume')));

// Create directories for profile images and resumes
const profileImagesDir = path.join(__dirname, 'profile_images');
const resumeDir = path.join(__dirname, 'user_resume');

if (!fs.existsSync(profileImagesDir)) {
  fs.mkdirSync(profileImagesDir, { recursive: true });
}

if (!fs.existsSync(resumeDir)) {
  fs.mkdirSync(resumeDir, { recursive: true });
}

// Multer storage configuration
const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'profilePic') {
      cb(null, profileImagesDir);
    } else if (file.fieldname === 'resume') {
      cb(null, resumeDir);
    } else {
      cb(new Error('Invalid field name'), false);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Multer upload setup
const upload1 = multer({
  storage: storage1,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'profilePic') {
      // Allow only image files for profilePic
      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Profile picture must be an image'));
      }
    } else if (file.fieldname === 'resume') {
      // Allow only PDF, DOC, DOCX for resume
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.mimetype)) {
        return cb(new Error('Resume must be a PDF, DOC, or DOCX file'));
      }
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).fields([
  { name: 'profilePic', maxCount: 1 },
  { name: 'resume', maxCount: 1 },
]);

// Update profile route
app.post('/api/update-profile', authenticate, (req, res, next) => {
  upload1(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: `Multer error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, async (req, res) => {
  try {
    const {
      email,
      name,
      bio,
      skills,
      technicalSkills,
      softSkills,
      workExperience,
      education,
      certifications,
      projects,
      jobPreferences,
      languages,
      socialLinks,
      achievements,
      availability,
      location,
      contactInfo,
    } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Ensure the user can only update their own profile
    if (req.user.email !== email) {
      return res.status(403).json({ message: 'Unauthorized to update this profile' });
    }

    // Delete old files if new ones are uploaded
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (req.files.profilePic && existingUser.profilePic) {
        const oldProfilePicPath = path.join(__dirname, existingUser.profilePic);
        if (fs.existsSync(oldProfilePicPath)) {
          fs.unlinkSync(oldProfilePicPath);
        }
      }
      if (req.files.resume && existingUser.resume) {
        const oldResumePath = path.join(__dirname, existingUser.resume);
        if (fs.existsSync(oldResumePath)) {
          fs.unlinkSync(oldResumePath);
        }
      }
    }

    // Generate relative paths for uploaded files
    let profilePicPath = existingUser?.profilePic;
    let resumePath = existingUser?.resume;

    if (req.files && req.files.profilePic) {
      profilePicPath = `profile_images/${req.files.profilePic[0].filename}`;
    }

    if (req.files && req.files.resume) {
      resumePath = `user_resume/${req.files.resume[0].filename}`;
    }

    // Update user profile in the database
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        name,
        bio,
        skills,
        technicalSkills,
        softSkills,
        workExperience,
        education,
        certifications,
        projects,
        resume: resumePath,
        jobPreferences,
        languages,
        socialLinks,
        achievements,
        availability,
        location,
        contactInfo,
        profilePic: profilePicPath,
      },
      { new: true, upsert: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user: {
        name: updatedUser.name || '',
        bio: updatedUser.bio || '',
        skills: updatedUser.skills || '',
        technicalSkills: updatedUser.technicalSkills || '',
        softSkills: updatedUser.softSkills || '',
        workExperience: updatedUser.workExperience || '',
        education: updatedUser.education || '',
        certifications: updatedUser.certifications || '',
        projects: updatedUser.projects || '',
        resume: updatedUser.resume ? `http://localhost:5000/${updatedUser.resume}` : '',
        jobPreferences: updatedUser.jobPreferences || '',
        languages: updatedUser.languages || '',
        socialLinks: updatedUser.socialLinks || '',
        achievements: updatedUser.achievements || '',
        availability: updatedUser.availability || '',
        location: updatedUser.location || '',
        contactInfo: updatedUser.contactInfo || '',
        profilePic: updatedUser.profilePic ? `http://localhost:5000/${updatedUser.profilePic}` : 'https://via.placeholder.com/150',
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get profile route
app.get('/api/get-profile', authenticate, async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });

    // Return empty profile for new users
    const profile = user || {
      name: '',
      bio: '',
      skills: '',
      technicalSkills: '',
      softSkills: '',
      workExperience: '',
      education: '',
      certifications: '',
      projects: '',
      resume: '',
      jobPreferences: '',
      languages: '',
      socialLinks: '',
      achievements: '',
      availability: '',
      location: '',
      contactInfo: '',
      profilePic: '',
    };

    res.json({
      name: profile.name || '',
      bio: profile.bio || '',
      skills: profile.skills || '',
      technicalSkills: profile.technicalSkills || '',
      softSkills: profile.softSkills || '',
      workExperience: profile.workExperience || '',
      education: profile.education || '',
      certifications: profile.certifications || '',
      projects: profile.projects || '',
      resume: profile.resume ? `http://localhost:5000/${profile.resume}` : '',
      jobPreferences: profile.jobPreferences || '',
      languages: profile.languages || '',
      socialLinks: profile.socialLinks || '',
      achievements: profile.achievements || '',
      availability: profile.availability || '',
      location: profile.location || '',
      contactInfo: profile.contactInfo || '',
      profilePic: profile.profilePic ? `http://localhost:5000/${profile.profilePic}` : 'https://via.placeholder.com/150',
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the Server
app.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
});
