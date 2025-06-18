import React, { useState, useEffect } from "react";
import './Profile.css'; // Reuse Profile.css for consistent styling

const ProfileView = ({ email, onClose }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [technicalSkills, setTechnicalSkills] = useState("");
  const [softSkills, setSoftSkills] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [education, setEducation] = useState("");
  const [certifications, setCertifications] = useState("");
  const [projects, setProjects] = useState("");
  const [jobPreferences, setJobPreferences] = useState("");
  const [languages, setLanguages] = useState("");
  const [socialLinks, setSocialLinks] = useState("");
  const [achievements, setAchievements] = useState("");
  const [availability, setAvailability] = useState("");
  const [location, setLocation] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`http://localhost:5000/api/get-profile?email=${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setName(data.name || "");
          setBio(data.bio || "");
          setSkills(data.skills || "");
          setTechnicalSkills(data.technicalSkills || "");
          setSoftSkills(data.softSkills || "");
          setWorkExperience(data.workExperience || "");
          setEducation(data.education || "");
          setCertifications(data.certifications || "");
          setProjects(data.projects || "");
          setJobPreferences(data.jobPreferences || "");
          setLanguages(data.languages || "");
          setSocialLinks(data.socialLinks || "");
          setAchievements(data.achievements || "");
          setAvailability(data.availability || "");
          setLocation(data.location || "");
          setContactInfo(data.contactInfo || "");
          setProfilePic(data.profilePic || "https://via.placeholder.com/150");
          setResume(data.resume || null);
          setError(null);
        } else {
          setError("Failed to fetch profile.");
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        setError("Error fetching profile.");
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchProfile();
    } else {
      setError("No email provided.");
      setLoading(false);
    }
  }, [email]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {loading ? (
          <div className="loading">Loading profile...</div>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <div className="profile-container">
            <div className="profile-header">
              <div className="profile-image-container">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="profile-image"
                />
              </div>
              <div className="profile-info">
                <h2>{name}</h2>
                <p>{bio}</p>
              </div>
            </div>

            <div className="details-section">
              <div className="details-item">
                <h3>Skills</h3>
                <ul>
                  {skills.split(",").map((skill, index) => (
                    <li key={index}>{skill.trim()}</li>
                  ))}
                </ul>
              </div>

              <div className="details-item">
                <h3>Technical Skills</h3>
                <ul>
                  {technicalSkills.split(",").map((skill, index) => (
                    <li key={index}>{skill.trim()}</li>
                  ))}
                </ul>
              </div>

              <div className="details-item">
                <h3>Soft Skills</h3>
                <ul>
                  {softSkills.split(",").map((skill, index) => (
                    <li key={index}>{skill.trim()}</li>
                  ))}
                </ul>
              </div>

              <div className="details-item">
                <h3>Work Experience</h3>
                <pre>{workExperience}</pre>
              </div>

              <div className="details-item">
                <h3>Education</h3>
                <p>{education}</p>
              </div>

              <div className="details-item">
                <h3>Certifications</h3>
                <p>{certifications}</p>
              </div>

              <div className="details-item">
                <h3>Projects</h3>
                <p>{projects}</p>
              </div>

              <div className="details-item">
                <h3>Job Preferences</h3>
                <p>{jobPreferences}</p>
              </div>

              <div className="details-item">
                <h3>Languages</h3>
                <p>{languages}</p>
              </div>

              <div className="details-item">
                <h3>Social Links</h3>
                <p>{socialLinks}</p>
              </div>

              <div className="details-item">
                <h3>Achievements</h3>
                <p>{achievements}</p>
              </div>

              <div className="details-item">
                <h3>Availability</h3>
                <p>{availability}</p>
              </div>

              <div className="details-item">
                <h3>Location</h3>
                <p>{location}</p>
              </div>

              <div className="details-item">
                <h3>Contact Info</h3>
                <p>{contactInfo}</p>
              </div>

              <div className="details-item">
                <h3>Resume</h3>
                {resume ? (
                  <a
                    href={resume}
                    download={`resume${resume.slice(resume.lastIndexOf('.'))}`}
                  >
                    Download Resume
                  </a>
                ) : (
                  <p>No resume available</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;