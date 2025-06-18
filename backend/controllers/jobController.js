const Job = require('../models/Job');

exports.addJob = async (req, res) => {
    const { title, description, companyId } = req.body;

    try {
        const newJob = new Job({
            title,
            description,
            company: companyId
        });

        await newJob.save();
        res.status(201).json({ message: 'Job added successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding job' });
    }
};

exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('company', 'name');
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching jobs' });
    }
};
