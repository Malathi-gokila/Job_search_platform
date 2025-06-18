// import React, { useState, useEffect } from "react";
// import { useAuth } from "../AuthContext";
// import ApplicantNavbar from "./ApplicantNavbar";
// import './Profile.css';

// const Profile = () => {
//   const { userEmail } = useAuth();

//   // State variables for all profile fields
//   const [name, setName] = useState("");
//   const [bio, setBio] = useState("");
//   const [skills, setSkills] = useState("");
//   const [technicalSkills, setTechnicalSkills] = useState("");
//   const [softSkills, setSoftSkills] = useState("");
//   const [workExperience, setWorkExperience] = useState("");
//   const [education, setEducation] = useState("");
//   const [certifications, setCertifications] = useState("");
//   const [projects, setProjects] = useState("");
//   const [jobPreferences, setJobPreferences] = useState("");
//   const [languages, setLanguages] = useState("");
//   const [socialLinks, setSocialLinks] = useState("");
//   const [achievements, setAchievements] = useState("");
//   const [availability, setAvailability] = useState("");
//   const [location, setLocation] = useState("");
//   const [contactInfo, setContactInfo] = useState("");
//   const [profilePic, setProfilePic] = useState(""); // Profile picture state
//   const [resume, setResume] = useState(null); // Resume file state
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [imageFile, setImageFile] = useState(null); // State for the selected image file

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");

//       try {
//         const response = await fetch(`http://localhost:5000/api/get-profile?email=${userEmail}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setName(data.name || "");
//           setBio(data.bio || "");
//           setSkills(data.skills || "");
//           setTechnicalSkills(data.technicalSkills || "");
//           setSoftSkills(data.softSkills || "");
//           setWorkExperience(data.workExperience || "");
//           setEducation(data.education || "");
//           setCertifications(data.certifications || "");
//           setProjects(data.projects || "");
//           setJobPreferences(data.jobPreferences || "");
//           setLanguages(data.languages || "");
//           setSocialLinks(data.socialLinks || "");
//           setAchievements(data.achievements || "");
//           setAvailability(data.availability || "");
//           setLocation(data.location || "");
//           setContactInfo(data.contactInfo || "");
//           setProfilePic(data.profilePic || "https://via.placeholder.com/150"); // Default image if not set
//           setResume(data.resume || null); // Set the resume URL if available
//         } else {
//           console.error("Failed to fetch profile");
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userEmail) {
//       fetchProfile();
//     }
//   }, [userEmail]);

//   const handleSave = async () => {
//     const token = localStorage.getItem("token");

//     // FormData is used to send the image file along with other profile data
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("bio", bio);
//     formData.append("skills", skills);
//     formData.append("technicalSkills", technicalSkills);
//     formData.append("softSkills", softSkills);
//     formData.append("workExperience", workExperience);
//     formData.append("education", education);
//     formData.append("certifications", certifications);
//     formData.append("projects", projects);
//     formData.append("jobPreferences", jobPreferences);
//     formData.append("languages", languages);
//     formData.append("socialLinks", socialLinks);
//     formData.append("achievements", achievements);
//     formData.append("availability", availability);
//     formData.append("location", location);
//     formData.append("contactInfo", contactInfo);
//     formData.append("email", userEmail);

//     if (imageFile) {
//       formData.append("profilePic", imageFile); // Matches backend field name
//     }

//     if (resume) {
//       formData.append("resume", resume); // Matches backend field name
//     }

//     // Log FormData for debugging
//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}:`, value);
//     }

//     try {
//       const response = await fetch("http://localhost:5000/api/update-profile", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       if (response.ok) {
//         alert("Profile updated successfully!");
//         setIsEditing(false);
//       } else {
//         alert("Failed to update profile.");
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Error updating profile.");
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePic(reader.result); // Update the profile image preview
//       };
//       reader.readAsDataURL(file); // Convert the image file to a base64 URL
//     }
//   };

//   const handleResumeChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setResume(file); // Set the selected resume file
//     }
//   };

//   if (loading) {
//     return (
//       <div>
//         <ApplicantNavbar />
//         <div className="loading">Loading profile...</div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <ApplicantNavbar />
//       <div className="profile-container">
//         {/* Profile Section */}
//         <div className="profile-header">
//           <div className="profile-image-container">
//             <img
//               src={profilePic}
//               alt="Profile"
//               className="profile-image"
//             />
//             {isEditing && (
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="profile-image-upload"
//               />
//             )}
//           </div>
//           <div className="profile-info">
//             {!isEditing ? (
//               <h2>{name}</h2>
//             ) : (
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="name-input"
//               />
//             )}

//             {!isEditing ? (
//               <p>{bio}</p>
//             ) : (
//               <textarea
//                 value={bio}
//                 onChange={(e) => setBio(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}

//             {!isEditing ? (
//               <button
//                 className="edit-button"
//                 onClick={() => setIsEditing(true)}
//               >
//                 Edit Profile
//               </button>
//             ) : (
//               <button
//                 className="save-button"
//                 onClick={handleSave}
//               >
//                 Save Changes
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Details Section */}
//         <div className="details-section">
//           <div className="details-item">
//             <h3>Skills</h3>
//             {!isEditing ? (
//               <ul>
//                 {skills.split(",").map((skill, index) => (
//                   <li key={index}>{skill.trim()}</li>
//                 ))}
//               </ul>
//             ) : (
//               <textarea
//                 value={skills}
//                 onChange={(e) => setSkills(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Technical Skills</h3>
//             {!isEditing ? (
//               <ul>
//                 {technicalSkills.split(',').map((skill, index) => (
//                   <li key={index}>{skill.trim()}</li>  // Trim spaces if any
//                 ))}
//               </ul>
//             ) : (
//               <textarea
//                 value={technicalSkills}
//                 onChange={(e) => setTechnicalSkills(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Soft Skills</h3>
//             {!isEditing ? (
//               <ul>
//                 {softSkills.split(',').map((skill, index) => (
//                   <li key={index}>{skill.trim()}</li>  // Trim spaces if any
//                 ))}
//               </ul>
//             ) : (
//               <textarea
//                 value={softSkills}
//                 onChange={(e) => setSoftSkills(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//            <h3>Work Experience</h3>
//            {!isEditing ? (
//              <pre>{workExperience}</pre>  // Using <pre> to preserve formatting (including line breaks)
//            ) : (
//              <textarea
//                value={workExperience}
//                onChange={(e) => setWorkExperience(e.target.value)}
//                rows="6"
//                className="bio-textarea"
//              />
//            )}
//          </div>


//           <div className="details-item">
//             <h3>Education</h3>
//             {!isEditing ? (
//               <p>{education}</p>
//             ) : (
//               <textarea
//                 value={education}
//                 onChange={(e) => setEducation(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Certifications</h3>
//             {!isEditing ? (
//               <p>{certifications}</p>
//             ) : (
//               <textarea
//                 value={certifications}
//                 onChange={(e) => setCertifications(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Projects</h3>
//             {!isEditing ? (
//               <p>{projects}</p>
//             ) : (
//               <textarea
//                 value={projects}
//                 onChange={(e) => setProjects(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Job Preferences</h3>
//             {!isEditing ? (
//               <p>{jobPreferences}</p>
//             ) : (
//               <textarea
//                 value={jobPreferences}
//                 onChange={(e) => setJobPreferences(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Languages</h3>
//             {!isEditing ? (
//               <p>{languages}</p>
//             ) : (
//               <textarea
//                 value={languages}
//                 onChange={(e) => setLanguages(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Social Links</h3>
//             {!isEditing ? (
//               <p>{socialLinks}</p>
//             ) : (
//               <textarea
//                 value={socialLinks}
//                 onChange={(e) => setSocialLinks(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Achievements</h3>
//             {!isEditing ? (
//               <p>{achievements}</p>
//             ) : (
//               <textarea
//                 value={achievements}
//                 onChange={(e) => setAchievements(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Availability</h3>
//             {!isEditing ? (
//               <p>{availability}</p>
//             ) : (
//               <textarea
//                 value={availability}
//                 onChange={(e) => setAvailability(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Location</h3>
//             {!isEditing ? (
//               <p>{location}</p>
//             ) : (
//               <textarea
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Contact Info</h3>
//             {!isEditing ? (
//               <p>{contactInfo}</p>
//             ) : (
//               <textarea
//                 value={contactInfo}
//                 onChange={(e) => setContactInfo(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           {/* Resume Upload */}
//           <div className="details-item">
//             <h3>Resume</h3>
//             {isEditing ? (
//               <input
//                 type="file"
//                 accept=".pdf,.doc,.docx"
//                 onChange={handleResumeChange}
//                 className="resume-upload"
//               />
//             ) : (
//               resume && <a href={resume} download>Download Resume</a>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;







// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import ApplicantNavbar from "./ApplicantNavbar";
// import './Profile.css';

// const Profile = () => {
//   const { userEmail } = useAuth();
//   const { email } = useParams();
//   const profileEmail = email || userEmail;
//   const isOwnProfile = profileEmail === userEmail;

//   const [name, setName] = useState("");
//   const [bio, setBio] = useState("");
//   const [skills, setSkills] = useState("");
//   const [technicalSkills, setTechnicalSkills] = useState("");
//   const [softSkills, setSoftSkills] = useState("");
//   const [workExperience, setWorkExperience] = useState("");
//   const [education, setEducation] = useState("");
//   const [certifications, setCertifications] = useState("");
//   const [projects, setProjects] = useState("");
//   const [jobPreferences, setJobPreferences] = useState("");
//   const [languages, setLanguages] = useState("");
//   const [socialLinks, setSocialLinks] = useState("");
//   const [achievements, setAchievements] = useState("");
//   const [availability, setAvailability] = useState("");
//   const [location, setLocation] = useState("");
//   const [contactInfo, setContactInfo] = useState("");
//   const [profilePic, setProfilePic] = useState("");
//   const [resume, setResume] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");

//       try {
//         const response = await fetch(`http://localhost:5000/api/get-profile?email=${profileEmail}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setName(data.name || "");
//           setBio(data.bio || "");
//           setSkills(data.skills || "");
//           setTechnicalSkills(data.technicalSkills || "");
//           setSoftSkills(data.softSkills || "");
//           setWorkExperience(data.workExperience || "");
//           setEducation(data.education || "");
//           setCertifications(data.certifications || "");
//           setProjects(data.projects || "");
//           setJobPreferences(data.jobPreferences || "");
//           setLanguages(data.languages || "");
//           setSocialLinks(data.socialLinks || "");
//           setAchievements(data.achievements || "");
//           setAvailability(data.availability || "");
//           setLocation(data.location || "");
//           setContactInfo(data.contactInfo || "");
//           setProfilePic(data.profilePic || "https://via.placeholder.com/150");
//           setResume(data.resume || null);
//           setError(null);
//         } else {
//           setError("Failed to fetch profile.");
//           console.error("Failed to fetch profile");
//         }
//       } catch (error) {
//         setError("Error fetching profile.");
//         console.error("Error fetching profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (profileEmail) {
//       fetchProfile();
//     } else {
//       setError("No email provided.");
//       setLoading(false);
//     }
//   }, [profileEmail]);

//   const handleSave = async () => {
//     const token = localStorage.getItem("token");

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("bio", bio);
//     formData.append("skills", skills);
//     formData.append("technicalSkills", technicalSkills);
//     formData.append("softSkills", softSkills);
//     formData.append("workExperience", workExperience);
//     formData.append("education", education);
//     formData.append("certifications", certifications);
//     formData.append("projects", projects);
//     formData.append("jobPreferences", jobPreferences);
//     formData.append("languages", languages);
//     formData.append("socialLinks", socialLinks);
//     formData.append("achievements", achievements);
//     formData.append("availability", availability);
//     formData.append("location", location);
//     formData.append("contactInfo", contactInfo);
//     formData.append("email", profileEmail);

//     if (imageFile) {
//       formData.append("profilePic", imageFile);
//     }

//     if (resume && resume instanceof File) {
//       formData.append("resume", resume);
//     }

//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}:`, value);
//     }

//     try {
//       const response = await fetch("http://localhost:5000/api/update-profile", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       if (response.ok) {
//         alert("Profile updated successfully!");
//         setIsEditing(false);
//         // Refresh profile data after save
//         const refreshResponse = await fetch(`http://localhost:5000/api/get-profile?email=${profileEmail}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (refreshResponse.ok) {
//           const data = await refreshResponse.json();
//           setName(data.name || "");
//           setBio(data.bio || "");
//           setSkills(data.skills || "");
//           setTechnicalSkills(data.technicalSkills || "");
//           setSoftSkills(data.softSkills || "");
//           setWorkExperience(data.workExperience || "");
//           setEducation(data.education || "");
//           setCertifications(data.certifications || "");
//           setProjects(data.projects || "");
//           setJobPreferences(data.jobPreferences || "");
//           setLanguages(data.languages || "");
//           setSocialLinks(data.socialLinks || "");
//           setAchievements(data.achievements || "");
//           setAvailability(data.availability || "");
//           setLocation(data.location || "");
//           setContactInfo(data.contactInfo || "");
//           setProfilePic(data.profilePic || "https://via.placeholder.com/150");
//           setResume(data.resume || null);
//           setImageFile(null);
//         }
//       } else {
//         alert("Failed to update profile.");
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Error updating profile.");
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePic(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleResumeChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setResume(file);
//     }
//   };

//   if (loading) {
//     return (
//       <div>
//         <ApplicantNavbar />
//         <div className="loading">Loading profile...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div>
//         <ApplicantNavbar />
//         <div className="profile-container">
//           <p style={{ color: 'red' }}>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <ApplicantNavbar />
//       <div className="profile-container">
//         <div className="profile-header">
//           <div className="profile-image-container">
//             <img
//               src={profilePic}
//               alt="Profile"
//               className="profile-image"
//             />
//             {isEditing && isOwnProfile && (
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="profile-image-upload"
//               />
//             )}
//           </div>
//           <div className="profile-info">
//             {!isEditing || !isOwnProfile ? (
//               <h2>{name}</h2>
//             ) : (
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="name-input"
//               />
//             )}

//             {!isEditing || !isOwnProfile ? (
//               <p>{bio}</p>
//             ) : (
//               <textarea
//                 value={bio}
//                 onChange={(e) => setBio(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}

//             {isOwnProfile && !isEditing ? (
//               <button
//                 className="edit-button"
//                 onClick={() => setIsEditing(true)}
//               >
//                 Edit Profile
//               </button>
//             ) : isOwnProfile ? (
//               <button
//                 className="save-button"
//                 onClick={handleSave}
//               >
//                 Save Changes
//               </button>
//             ) : null}
//           </div>
//         </div>

//         <div className="details-section">
//           <div className="details-item">
//             <h3>Skills</h3>
//             {!isEditing || !isOwnProfile ? (
//               <ul>
//                 {skills.split(",").map((skill, index) => (
//                   <li key={index}>{skill.trim()}</li>
//                 ))}
//               </ul>
//             ) : (
//               <textarea
//                 value={skills}
//                 onChange={(e) => setSkills(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Technical Skills</h3>
//             {!isEditing || !isOwnProfile ? (
//               <ul>
//                 {technicalSkills.split(",").map((skill, index) => (
//                   <li key={index}>{skill.trim()}</li>
//                 ))}
//               </ul>
//             ) : (
//               <textarea
//                 value={technicalSkills}
//                 onChange={(e) => setTechnicalSkills(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Soft Skills</h3>
//             {!isEditing || !isOwnProfile ? (
//               <ul>
//                 {softSkills.split(",").map((skill, index) => (
//                   <li key={index}>{skill.trim()}</li>
//                 ))}
//               </ul>
//             ) : (
//               <textarea
//                 value={softSkills}
//                 onChange={(e) => setSoftSkills(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Work Experience</h3>
//             {!isEditing || !isOwnProfile ? (
//               <pre>{workExperience}</pre>
//             ) : (
//               <textarea
//                 value={workExperience}
//                 onChange={(e) => setWorkExperience(e.target.value)}
//                 rows="6"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Education</h3>
//             {!isEditing || !isOwnProfile ? (
//               <p>{education}</p>
//             ) : (
//               <textarea
//                 value={education}
//                 onChange={(e) => setEducation(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Certifications</h3>
//             {!isEditing || !isOwnProfile ? (
//               <p>{certifications}</p>
//             ) : (
//               <textarea
//                 value={certifications}
//                 onChange={(e) => setCertifications(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Projects</h3>
//             {!isEditing || !isOwnProfile ? (
//               <p>{projects}</p>
//             ) : (
//               <textarea
//                 value={projects}
//                 onChange={(e) => setProjects(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Job Preferences</h3>
//             {!isEditing || !isOwnProfile ? (
//               <p>{jobPreferences}</p>
//             ) : (
//               <textarea
//                 value={jobPreferences}
//                 onChange={(e) => setJobPreferences(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Languages</h3>
//             {!isEditing || !isOwnProfile ? (
//               <p>{languages}</p>
//             ) : (
//               <textarea
//                 value={languages}
//                 onChange={(e) => setLanguages(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Social Links</h3>
//             {!isEditing || !isOwnProfile ? (
//               <p>{socialLinks}</p>
//             ) : (
//               <textarea
//                 value={socialLinks}
//                 onChange={(e) => setSocialLinks(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Achievements</h3>
//             {!isEditing || !isOwnProfile ? (
//               <p>{achievements}</p>
//             ) : (
//               <textarea
//                 value={achievements}
//                 onChange={(e) => setAchievements(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Availability</h3>
//             {!isEditing || !isOwnProfile ? (
//               <p>{availability}</p>
//             ) : (
//               <textarea
//                 value={availability}
//                 onChange={(e) => setAvailability(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Location</h3>
//             {!isEditing || !isOwnProfile ? (
//               <p>{location}</p>
//             ) : (
//               <textarea
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Contact Info</h3>
//             {!isEditing || !isOwnProfile ? (
//               <p>{contactInfo}</p>
//             ) : (
//               <textarea
//                 value={contactInfo}
//                 onChange={(e) => setContactInfo(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Resume</h3>
//             {isEditing && isOwnProfile ? (
//               <input
//                 type="file"
//                 accept=".pdf,.doc,.docx"
//                 onChange={handleResumeChange}
//                 className="resume-upload"
//               />
//             ) : (
//               resume && (
//                 <a
//                   href={resume}
//                   download={`resume${resume.slice(resume.lastIndexOf('.'))}`}
//                 >
//                   Download Resume
//                 </a>
//               )
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;








// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import ApplicantNavbar from "./ApplicantNavbar";
// import RecruiterNavbar from "./RecruiterNavbar"; // Import RecruiterNavbar
// import './Profile.css';

// const Profile = () => {
//   const { userEmail, userRole } = useAuth(); // Added userRole
//   const { email } = useParams();
//   const profileEmail = email || userEmail;
//   const isOwnProfile = profileEmail === userEmail;
//   const isRecruiter = userRole === 'recruiter'; // Check if user is a recruiter

//   const [name, setName] = useState("");
//   const [bio, setBio] = useState("");
//   const [skills, setSkills] = useState("");
//   const [technicalSkills, setTechnicalSkills] = useState("");
//   const [softSkills, setSoftSkills] = useState("");
//   const [workExperience, setWorkExperience] = useState("");
//   const [education, setEducation] = useState("");
//   const [certifications, setCertifications] = useState("");
//   const [projects, setProjects] = useState("");
//   const [jobPreferences, setJobPreferences] = useState("");
//   const [languages, setLanguages] = useState("");
//   const [socialLinks, setSocialLinks] = useState("");
//   const [achievements, setAchievements] = useState("");
//   const [availability, setAvailability] = useState("");
//   const [location, setLocation] = useState("");
//   const [contactInfo, setContactInfo] = useState("");
//   const [profilePic, setProfilePic] = useState("");
//   const [resume, setResume] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");

//       try {
//         const response = await fetch(`http://localhost:5000/api/get-profile?email=${profileEmail}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setName(data.name || "");
//           setBio(data.bio || "");
//           setSkills(data.skills || "");
//           setTechnicalSkills(data.technicalSkills || "");
//           setSoftSkills(data.softSkills || "");
//           setWorkExperience(data.workExperience || "");
//           setEducation(data.education || "");
//           setCertifications(data.certifications || "");
//           setProjects(data.projects || "");
//           setJobPreferences(data.jobPreferences || "");
//           setLanguages(data.languages || "");
//           setSocialLinks(data.socialLinks || "");
//           setAchievements(data.achievements || "");
//           setAvailability(data.availability || "");
//           setLocation(data.location || "");
//           setContactInfo(data.contactInfo || "");
//           setProfilePic(data.profilePic);
//           setResume(data.resume || null);
//           setError(null);
//         } else {
//           setName("");
//           setBio("");
//           setSkills("");
//           setTechnicalSkills("");
//           setSoftSkills("");
//           setWorkExperience("");
//           setEducation("");
//           setCertifications("");
//           setProjects("");
//           setJobPreferences("");
//           setLanguages("");
//           setSocialLinks("");
//           setAchievements("");
//           setAvailability("");
//           setLocation("");
//           setContactInfo("");
//           setProfilePic("https://via.placeholder.com/150");
//           setResume(null);
//           setError(null);
//           // setError("Failed to fetch profile.");
//           // console.error("Failed to fetch profile");
//         }
//       } catch (error) {
//         setError("Error fetching profile.");
//         console.error("Error fetching profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (profileEmail) {
//       fetchProfile();
//     } else {
//       setError("No email provided.");
//       setLoading(false);
//     }
//   }, [profileEmail]);

//   const handleSave = async () => {
//     const token = localStorage.getItem("token");

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("bio", bio);
//     formData.append("skills", skills);
//     formData.append("technicalSkills", technicalSkills);
//     formData.append("softSkills", softSkills);
//     formData.append("workExperience", workExperience);
//     formData.append("education", education);
//     formData.append("certifications", certifications);
//     formData.append("projects", projects);
//     formData.append("jobPreferences", jobPreferences);
//     formData.append("languages", languages);
//     formData.append("socialLinks", socialLinks);
//     formData.append("achievements", achievements);
//     formData.append("availability", availability);
//     formData.append("location", location);
//     formData.append("contactInfo", contactInfo);
//     formData.append("email", profileEmail);

//     if (imageFile) {
//       formData.append("profilePic", imageFile);
//     }

//     if (resume && resume instanceof File) {
//       formData.append("resume", resume);
//     }

//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}:`, value);
//     }

//     try {
//       const response = await fetch("http://localhost:5000/api/update-profile", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       if (response.ok) {
//         alert("Profile updated successfully!");
//         setIsEditing(false);
//         const refreshResponse = await fetch(`http://localhost:5000/api/get-profile?email=${profileEmail}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (refreshResponse.ok) {
//           const data = await refreshResponse.json();
//           setName(data.name || "");
//           setBio(data.bio || "");
//           setSkills(data.skills || "");
//           setTechnicalSkills(data.technicalSkills || "");
//           setSoftSkills(data.softSkills || "");
//           setWorkExperience(data.workExperience || "");
//           setEducation(data.education || "");
//           setCertifications(data.certifications || "");
//           setProjects(data.projects || "");
//           setJobPreferences(data.jobPreferences || "");
//           setLanguages(data.languages || "");
//           setSocialLinks(data.socialLinks || "");
//           setAchievements(data.achievements || "");
//           setAvailability(data.availability || "");
//           setLocation(data.location || "");
//           setContactInfo(data.contactInfo || "");
//           setProfilePic(data.profilePic || "https://via.placeholder.com/150");
//           setResume(data.resume || null);
//           setImageFile(null);
//         }
//       } else {
//         alert("Failed to update profile.");
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Error updating profile.");
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePic(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleResumeChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setResume(file);
//     }
//   };

//   if (loading) {
//     return (
//       <div>
//         {isRecruiter ? <RecruiterNavbar /> : <ApplicantNavbar />}
//         <div className="loading">Loading profile...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div>
//         {isRecruiter ? <RecruiterNavbar /> : <ApplicantNavbar />}
//         <div className="profile-container">
//           <p style={{ color: 'red' }}>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {isRecruiter ? <RecruiterNavbar /> : <ApplicantNavbar />}
//       <div className="profile-container">
//         <div className="profile-header">
//           <div className="profile-image-container">
//             <img
//               src={profilePic ? `http://localhost:5000${profilePic}` : 'https://via.placeholder.com/150'}
//               alt="Profile"
//               className="profile-image"
//             />
//             {isEditing && isOwnProfile && !isRecruiter && (
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="profile-image-upload"
//               />
//             )}
//           </div>
//           <div className="profile-info">
//             {!isEditing || isRecruiter || !isOwnProfile ? (
//               <h2>{name}</h2>
//             ) : (
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="name-input"
//               />
//             )}

//             {!isEditing || isRecruiter || !isOwnProfile ? (
//               <p>{bio}</p>
//             ) : (
//               <textarea
//                 value={bio}
//                 onChange={(e) => setBio(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}

//             {!isRecruiter && isOwnProfile && !isEditing ? (
//               <button
//                 className="edit-button"
//                 onClick={() => setIsEditing(true)}
//               >
//                 Edit Profile
//               </button>
//             ) : !isRecruiter && isOwnProfile ? (
//               <button
//                 className="save-button"
//                 onClick={handleSave}
//               >
//                 Save Changes
//               </button>
//             ) : null}
//           </div>
//         </div>

//         <div className="details-section">
//           <div className="details-item">
//             <h3>Skills</h3>
//             {!isEditing || isRecruiter || !isOwnProfile ? (
//               <ul>
//                 {skills.split(",").map((skill, index) => (
//                   <li key={index}>{skill.trim()}</li>
//                 ))}
//               </ul>
//             ) : (
//               <textarea
//                 value={skills}
//                 onChange={(e) => setSkills(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Technical Skills</h3>
//             {!isEditing || isRecruiter || !isOwnProfile ? (
//               <ul>
//                 {technicalSkills.split(",").map((skill, index) => (
//                   <li key={index}>{skill.trim()}</li>
//                 ))}
//               </ul>
//             ) : (
//               <textarea
//                 value={technicalSkills}
//                 onChange={(e) => setTechnicalSkills(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Soft Skills</h3>
//             {!isEditing || isRecruiter || !isOwnProfile ? (
//               <ul>
//                 {softSkills.split(",").map((skill, index) => (
//                   <li key={index}>{skill.trim()}</li>
//                 ))}
//               </ul>
//             ) : (
//               <textarea
//                 value={softSkills}
//                 onChange={(e) => setSoftSkills(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Work Experience</h3>
//             {!isEditing || isRecruiter || !isOwnProfile ? (
//               <pre>{workExperience}</pre>
//             ) : (
//               <textarea
//                 value={workExperience}
//                 onChange={(e) => setWorkExperience(e.target.value)}
//                 rows="6"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Education</h3>
//             {!isEditing || isRecruiter || !isOwnProfile ? (
//               <p>{education}</p>
//             ) : (
//               <textarea
//                 value={education}
//                 onChange={(e) => setEducation(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Certifications</h3>
//             {!isEditing || isRecruiter || !isOwnProfile ? (
//               <p>{certifications}</p>
//             ) : (
//               <textarea
//                 value={certifications}
//                 onChange={(e) => setCertifications(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Projects</h3>
//             {!isEditing || isRecruiter || !isOwnProfile ? (
//               <p>{projects}</p>
//             ) : (
//               <textarea
//                 value={projects}
//                 onChange={(e) => setProjects(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Job Preferences</h3>
//             {!isEditing || isRecruiter || !isOwnProfile ? (
//               <p>{jobPreferences}</p>
//             ) : (
//               <textarea
//                 value={jobPreferences}
//                 onChange={(e) => setJobPreferences(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Languages</h3>
//             {!isEditing || isRecruiter || !isOwnProfile ? (
//               <p>{languages}</p>
//             ) : (
//               <textarea
//                 value={languages}
//                 onChange={(e) => setLanguages(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Social Links</h3>
//             {!isEditing || isRecruiter || !isOwnProfile ? (
//               <p>{socialLinks}</p>
//             ) : (
//               <textarea
//                 value={socialLinks}
//                 onChange={(e) => setSocialLinks(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Achievements</h3>
//             {!isEditing || isRecruiter || !isOwnProfile ? (
//               <p>{achievements}</p>
//             ) : (
//               <textarea
//                 value={achievements}
//                 onChange={(e) => setAchievements(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Availability</h3>
//             {!isEditing || isRecruiter || !isOwnProfile ? (
//               <p>{availability}</p>
//             ) : (
//               <textarea
//                 value={availability}
//                 onChange={(e) => setAvailability(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Location</h3>
//             {!isEditing || isRecruiter || !isOwnProfile ? (
//               <p>{location}</p>
//             ) : (
//               <textarea
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Contact Info</h3>
//             {!isEditing || isRecruiter || !isOwnProfile ? (
//               <p>{contactInfo}</p>
//             ) : (
//               <textarea
//                 value={contactInfo}
//                 onChange={(e) => setContactInfo(e.target.value)}
//                 rows="4"
//                 className="bio-textarea"
//               />
//             )}
//           </div>

//           <div className="details-item">
//             <h3>Resume</h3>
//             {isEditing && isOwnProfile && !isRecruiter ? (
//               <input
//                 type="file"
//                 accept=".pdf,.doc,.docx"
//                 onChange={handleResumeChange}
//                 className="resume-upload"
//               />
//             ) : (
//               resume && (
//                 <a
//                   href={resume}
//                   download={`resume${resume.slice(resume.lastIndexOf('.'))}`}
//                 >
//                   Download Resume
//                 </a>
//               )
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;



import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";
import ApplicantNavbar from "./ApplicantNavbar";
import RecruiterNavbar from "./RecruiterNavbar";
import './Profile.css';

const Profile = () => {
  const { userEmail, userRole } = useAuth();
  const { email } = useParams();
  const profileEmail = email || userEmail;
  const isOwnProfile = profileEmail === userEmail;
  const isRecruiter = userRole === 'recruiter';

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
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/150");
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`http://localhost:5000/api/get-profile?email=${profileEmail}`, {
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
          setResume(data.resume || "");
          setError(null);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch profile.");
        }
      } catch (error) {
        setError("Error fetching profile.");
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (profileEmail) {
      fetchProfile();
    } else {
      setError("No email provided.");
      setLoading(false);
    }
  }, [profileEmail]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("email", profileEmail);
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("skills", skills);
    formData.append("technicalSkills", technicalSkills);
    formData.append("softSkills", softSkills);
    formData.append("workExperience", workExperience);
    formData.append("education", education);
    formData.append("certifications", certifications);
    formData.append("projects", projects);
    formData.append("jobPreferences", jobPreferences);
    formData.append("languages", languages);
    formData.append("socialLinks", socialLinks);
    formData.append("achievements", achievements);
    formData.append("availability", availability);
    formData.append("location", location);
    formData.append("contactInfo", contactInfo);

    if (imageFile) {
      formData.append("profilePic", imageFile);
    }

    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    try {
      const response = await fetch("http://localhost:5000/api/update-profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert("Profile updated successfully!");
        setIsEditing(false);
        setName(result.user.name || "");
        setBio(result.user.bio || "");
        setSkills(result.user.skills || "");
        setTechnicalSkills(result.user.technicalSkills || "");
        setSoftSkills(result.user.softSkills || "");
        setWorkExperience(result.user.workExperience || "");
        setEducation(result.user.education || "");
        setCertifications(result.user.certifications || "");
        setProjects(result.user.projects || "");
        setJobPreferences(result.user.jobPreferences || "");
        setLanguages(result.user.languages || "");
        setSocialLinks(result.user.socialLinks || "");
        setAchievements(result.user.achievements || "");
        setAvailability(result.user.availability || "");
        setLocation(result.user.location || "");
        setContactInfo(result.user.contactInfo || "");
        setProfilePic(result.user.profilePic || "https://via.placeholder.com/150");
        setResume(result.user.resume || "");
        setImageFile(null);
        setResumeFile(null);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setResume(URL.createObjectURL(file)); // Temporary URL for display
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Optionally refetch profile to reset changes
    setImageFile(null);
    setResumeFile(null);
    // Trigger refetch by resetting profilePic and resume to last saved values
    setProfilePic(profilePic); // Revert to last saved
    setResume(resume); // Revert to last saved
  };

  if (loading) {
    return (
      <div>
        {isRecruiter ? <RecruiterNavbar /> : <ApplicantNavbar />}
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {isRecruiter ? <RecruiterNavbar /> : <ApplicantNavbar />}
        <div className="profile-container">
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {isRecruiter ? <RecruiterNavbar /> : <ApplicantNavbar />}
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-image-container">
            <img
              src={profilePic}
              alt="Profile"
              className="profile-image"
            />
            {isEditing && isOwnProfile && !isRecruiter && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="profile-image-upload"
              />
            )}
          </div>
          <div className="profile-info">
            {!isEditing || isRecruiter || !isOwnProfile ? (
              <h2>{name || "No Name Provided"}</h2>
            ) : (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="name-input"
                placeholder="Enter your name"
              />
            )}

            {!isEditing || isRecruiter || !isOwnProfile ? (
              <p>{bio || "No bio provided"}</p>
            ) : (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="4"
                className="bio-textarea"
                placeholder="Enter your bio"
              />
            )}

            {!isRecruiter && isOwnProfile && !isEditing ? (
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : !isRecruiter && isOwnProfile ? (
              <div className="button-group">
                <button
                  className="save-button"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
                <button
                  className="cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="details-section">
          <div className="details-item">
            <h3>Skills</h3>
            {!isEditing || isRecruiter || !isOwnProfile ? (
              <ul>
                {skills ? skills.split(",").map((skill, index) => (
                  <li key={index}>{skill.trim()}</li>
                )) : <p>No skills provided</p>}
              </ul>
            ) : (
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                rows="4"
                className="bio-textarea"
                placeholder="Enter skills (comma-separated)"
              />
            )}
          </div>

          <div className="details-item">
            <h3>Technical Skills</h3>
            {!isEditing || isRecruiter || !isOwnProfile ? (
              <ul>
                {technicalSkills ? technicalSkills.split(",").map((skill, index) => (
                  <li key={index}>{skill.trim()}</li>
                )) : <p>No technical skills provided</p>}
              </ul>
            ) : (
              <textarea
                value={technicalSkills}
                onChange={(e) => setTechnicalSkills(e.target.value)}
                rows="4"
                className="bio-textarea"
                placeholder="Enter technical skills (comma-separated)"
              />
            )}
          </div>

          <div className="details-item">
            <h3>Soft Skills</h3>
            {!isEditing || isRecruiter || !isOwnProfile ? (
              <ul>
                {softSkills ? softSkills.split(",").map((skill, index) => (
                  <li key={index}>{skill.trim()}</li>
                )) : <p>No soft skills provided</p>}
              </ul>
            ) : (
              <textarea
                value={softSkills}
                onChange={(e) => setSoftSkills(e.target.value)}
                rows="4"
                className="bio-textarea"
                placeholder="Enter soft skills (comma-separated)"
              />
            )}
          </div>

          <div className="details-item">
            <h3>Work Experience</h3>
            {!isEditing || isRecruiter || !isOwnProfile ? (
              <pre>{workExperience || "No work experience provided"}</pre>
            ) : (
              <textarea
                value={workExperience}
                onChange={(e) => setWorkExperience(e.target.value)}
                rows="6"
                className="bio-textarea"
                placeholder="Enter work experience"
              />
            )}
          </div>

          <div className="details-item">
            <h3>Education</h3>
            {!isEditing || isRecruiter || !isOwnProfile ? (
              <p>{education || "No education provided"}</p>
            ) : (
              <textarea
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                rows="4"
                className="bio-textarea"
                placeholder="Enter education details"
              />
            )}
          </div>

          <div className="details-item">
            <h3>Certifications</h3>
            {!isEditing || isRecruiter || !isOwnProfile ? (
              <p>{certifications || "No certifications provided"}</p>
            ) : (
              <textarea
                value={certifications}
                onChange={(e) => setCertifications(e.target.value)}
                rows="4"
                className="bio-textarea"
                placeholder="Enter certifications"
              />
            )}
          </div>

          <div className="details-item">
            <h3>Projects</h3>
            {!isEditing || isRecruiter || !isOwnProfile ? (
              <p>{projects || "No projects provided"}</p>
            ) : (
              <textarea
                value={projects}
                onChange={(e) => setProjects(e.target.value)}
                rows="4"
                className="bio-textarea"
                placeholder="Enter project details"
              />
            )}
          </div>

          <div className="details-item">
            <h3>Job Preferences</h3>
            {!isEditing || isRecruiter || !isOwnProfile ? (
              <p>{jobPreferences || "No job preferences provided"}</p>
            ) : (
              <textarea
                value={jobPreferences}
                onChange={(e) => setJobPreferences(e.target.value)}
                rows="4"
                className="bio-textarea"
                placeholder="Enter job preferences"
              />
            )}
          </div>

          <div className="details-item">
            <h3>Languages</h3>
            {!isEditing || isRecruiter || !isOwnProfile ? (
              <p>{languages || "No languages provided"}</p>
            ) : (
              <textarea
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                rows="4"
                className="bio-textarea"
                placeholder="Enter languages"
              />
            )}
          </div>

          <div className="details-item">
            <h3>Social Links</h3>
            {!isEditing || isRecruiter || !isOwnProfile ? (
              <p>{socialLinks || "No social links provided"}</p>
            ) : (
              <textarea
                value={socialLinks}
                onChange={(e) => setSocialLinks(e.target.value)}
                rows="4"
                className="bio-textarea"
                placeholder="Enter social links"
              />
            )}
          </div>

          <div className="details-item">
            <h3>Achievements</h3>
            {!isEditing || isRecruiter || !isOwnProfile ? (
              <p>{achievements || "No achievements provided"}</p>
            ) : (
              <textarea
                value={achievements}
                onChange={(e) => setAchievements(e.target.value)}
                rows="4"
                className="bio-textarea"
                placeholder="Enter achievements"
              />
            )}
          </div>

          <div className="details-item">
            <h3>Availability</h3>
            {!isEditing || isRecruiter || !isOwnProfile ? (
              <p>{availability || "No availability provided"}</p>
            ) : (
              <textarea
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                rows="4"
                className="bio-textarea"
                placeholder="Enter availability"
              />
            )}
          </div>

          <div className="details-item">
            <h3>Location</h3>
            {!isEditing || isRecruiter || !isOwnProfile ? (
              <p>{location || "No location provided"}</p>
            ) : (
              <textarea
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                rows="4"
                className="bio-textarea"
                placeholder="Enter location"
              />
            )}
          </div>

          <div className="details-item">
            <h3>Contact Info</h3>
            {!isEditing || isRecruiter || !isOwnProfile ? (
              <p>{contactInfo || "No contact info provided"}</p>
            ) : (
              <textarea
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                rows="4"
                className="bio-textarea"
                placeholder="Enter contact info"
              />
            )}
          </div>

          <div className="details-item">
            <h3>Resume</h3>
            {isEditing && isOwnProfile && !isRecruiter ? (
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                className="resume-upload"
              />
            ) : (
              resume ? (
                <a
                  href={resume}
                  download
                  className="resume-link"
                >
                  Download Resume
                </a>
              ) : (
                <p>No resume uploaded</p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;