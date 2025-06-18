const Company = require('../models/Company');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerCompany = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newCompany = new Company({
            name,
            email,
            password: hashedPassword
        });
        
        await newCompany.save();
        res.status(201).json({ message: 'Company registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering company' });
    }
};

exports.loginCompany = async (req, res) => {
    const { email, password } = req.body;

    try {
        const company = await Company.findOne({ email });
        if (!company) return res.status(400).json({ message: 'Company not found!' });

        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials!' });

        const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Logged in successfully!', token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in company' });
    }
};
