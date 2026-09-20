import React, { useState } from "react";
import {
  User,
  Mail,
  MapPin,
  Edit3,
  Save,
  X,
  Code2,
  Trophy,
  Users,
  FolderKanban,
  Calendar,
  CheckCircle2,
} from "lucide-react";

import "./Profile.css";

const initialProfile = {
  firstName: "Sanika",
  lastName: "Haridas Pandhare",
  email: "sanika@example.com",
  phone: "+91 98765 43210",
  role: "Full Stack Developer",
  location: "India",
  bio: "Full Stack Developer interested in building innovative products and collaborating on hackathon projects.",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/",
  skills: [
    "React",
    "JavaScript",
    "Node.js",
    "Spring Boot",
    "PostgreSQL",
  ],
  domains: [
    "AI / ML",
    "Web Development",
    "Healthcare",
  ],
};

const projects = [
  {
    name: "AI Study Assistant",
    domain: "AI / Education",
    progress: 72,
    status: "Active",
  },
  {
    name: "Smart Healthcare Platform",
    domain: "Healthcare / AI",
    progress: 45,
    status: "Active",
  },
  {
    name: "Hackathon Buddy",
    domain: "Web Platform",
    progress: 82,
    status: "Active",
  },
];

const stats = [
  {
    icon: Trophy,
    value: "12",
    label: "Hackathons",
    color: "purple",
  },
  {
    icon: Users,
    value: "2",
    label: "Teams",
    color: "green",
  },
  {
    icon: FolderKanban,
    value: "3",
    label: "Projects",
    color: "orange",
  },
  {
    icon: Code2,
    value: "87%",
    label: "Skill Match",
    color: "blue",
  },
];

function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [formData, setFormData] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSkillsChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      skills: event.target.value
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    }));
  };

  const handleDomainsChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      domains: event.target.value
        .split(",")
        .map((domain) => domain.trim())
        .filter(Boolean),
    }));
  };

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="profile-page">

      {/* ================= HEADER ================= */}

      <div className="profile-page-header">
        <div>
          <span className="profile-eyebrow">
            ACCOUNT
          </span>

          <h1>My Profile</h1>

          <p>
            Manage your profile, skills and collaboration
            preferences.
          </p>
        </div>

        {!isEditing ? (
          <button
            className="profile-edit-btn"
            onClick={handleEdit}
          >
            <Edit3 size={18} />
            Edit Profile
          </button>
        ) : (
          <div className="profile-action-buttons">

            <button
              className="profile-cancel-btn"
              onClick={handleCancel}
            >
              <X size={18} />
              Cancel
            </button>

            <button
              className="profile-save-btn"
              onClick={handleSave}
            >
              <Save size={18} />
              Save Changes
            </button>

          </div>
        )}
      </div>

      {/* ================= HERO ================= */}

      <section className="profile-hero-card">

        <div className="profile-avatar">
          {profile.firstName.charAt(0).toUpperCase()}
        </div>

        <div className="profile-hero-content">

          {!isEditing ? (
            <>
              <h2>
                {profile.firstName} {profile.lastName}
              </h2>

              <div className="profile-role">
                {profile.role}
              </div>

              <div className="profile-meta">

                <span>
                  <Mail size={16} />
                  {profile.email}
                </span>

                <span>
                  <MapPin size={16} />
                  {profile.location}
                </span>

              </div>
            </>
          ) : (
            <div className="hero-edit-fields">

              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
              />

              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
              />

              <input
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Your role"
              />

            </div>
          )}

        </div>

        <div className="profile-completion">

          <div className="completion-header">
            <span>Profile completion</span>
            <strong>85%</strong>
          </div>

          <div className="completion-bar">
            <div style={{ width: "85%" }} />
          </div>

          <small>
            Complete your profile to get better teammate
            matches.
          </small>

        </div>

      </section>

      {/* ================= STATS ================= */}

      <section className="profile-stats-grid">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              className={`profile-stat-card ${stat.color}`}
              key={stat.label}
            >
              <div className="stat-icon">
                <Icon size={22} />
              </div>

              <div>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            </div>
          );
        })}

      </section>

      {/* ================= MAIN CONTENT ================= */}

      <div className="profile-content-grid">

        {/* ================= LEFT ================= */}

        <div className="profile-main-column">

          {/* PERSONAL INFORMATION */}

          <section className="profile-section-card">

            <div className="section-title">

              <div>
                <h3>Personal Information</h3>

                <p>
                  Your basic profile information.
                </p>
              </div>

              <User size={22} />

            </div>

            {!isEditing ? (
              <div className="information-grid">

                <div className="information-item">
                  <span>Full Name</span>

                  <strong>
                    {profile.firstName}{" "}
                    {profile.lastName}
                  </strong>
                </div>

                <div className="information-item">
                  <span>Email Address</span>

                  <strong>
                    {profile.email}
                  </strong>
                </div>

                <div className="information-item">
                  <span>Phone</span>

                  <strong>
                    {profile.phone}
                  </strong>
                </div>

                <div className="information-item">
                  <span>Location</span>

                  <strong>
                    {profile.location}
                  </strong>
                </div>

              </div>
            ) : (
              <div className="edit-form-grid">

                <div className="form-field">
                  <label>First Name</label>

                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label>Last Name</label>

                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label>Email</label>

                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label>Phone</label>

                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label>Location</label>

                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label>Role</label>

                  <input
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  />
                </div>

              </div>
            )}

          </section>

          {/* ABOUT */}

          <section className="profile-section-card">

            <div className="section-title">
              <div>
                <h3>About Me</h3>

                <p>
                  Tell teammates what you are interested in.
                </p>
              </div>
            </div>

            {isEditing ? (
              <textarea
                className="profile-bio-input"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="5"
              />
            ) : (
              <p className="profile-bio">
                {profile.bio}
              </p>
            )}

          </section>

          {/* SKILLS */}

          <section className="profile-section-card">

            <div className="section-title">

              <div>
                <h3>Technical Skills</h3>

                <p>
                  These skills are used by the matching engine.
                </p>
              </div>

              <Code2 size={22} />

            </div>

            {isEditing ? (
              <div className="form-field">

                <label>
                  Skills — separate with commas
                </label>

                <input
                  value={formData.skills.join(", ")}
                  onChange={handleSkillsChange}
                />

              </div>
            ) : (
              <div className="skill-list">

                {profile.skills.map((skill) => (
                  <span key={skill}>
                    {skill}
                  </span>
                ))}

              </div>
            )}

          </section>

          {/* DOMAINS */}

          <section className="profile-section-card">

            <div className="section-title">

              <div>
                <h3>Project Domains</h3>

                <p>
                  Areas you are interested in working on.
                </p>
              </div>

            </div>

            {isEditing ? (
              <div className="form-field">

                <label>
                  Domains — separate with commas
                </label>

                <input
                  value={formData.domains.join(", ")}
                  onChange={handleDomainsChange}
                />

              </div>
            ) : (
              <div className="domain-list">

                {profile.domains.map((domain) => (
                  <span key={domain}>
                    {domain}
                  </span>
                ))}

              </div>
            )}

          </section>

        </div>

        {/* ================= RIGHT ================= */}

        <aside className="profile-side-column">

          {/* SOCIAL */}

          <section className="profile-section-card">

            <div className="section-title">

              <div>
                <h3>Social Profiles</h3>

                <p>
                  Connect your developer profiles.
                </p>
              </div>

            </div>

            <div className="social-links">

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >

                <div className="social-logo github-logo">
                  GH
                </div>

                <div>
                  <strong>GitHub</strong>

                  <span>
                    View repositories
                  </span>
                </div>

              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >

                <div className="social-logo linkedin-logo">
                  in
                </div>

                <div>
                  <strong>LinkedIn</strong>

                  <span>
                    View professional profile
                  </span>
                </div>

              </a>

            </div>

          </section>

          {/* CURRENT TEAM */}

          <section className="profile-section-card">

            <div className="section-title">

              <div>
                <h3>Current Team</h3>

                <p>
                  Your active collaboration.
                </p>
              </div>

            </div>

            <div className="current-team">

              <div className="team-avatar">
                AI
              </div>

              <div>
                <strong>
                  AI Study Assistant
                </strong>

                <span>
                  4 team members
                </span>
              </div>

            </div>

            <button className="outline-full-btn">
              View Team
            </button>

          </section>

          {/* STATUS */}

          <section className="profile-section-card">

            <div className="section-title">

              <div>
                <h3>Profile Status</h3>

                <p>
                  Keep your profile updated.
                </p>
              </div>

            </div>

            <div className="profile-status-item">

              <CheckCircle2 size={20} />

              <div>
                <strong>
                  Profile is active
                </strong>

                <span>
                  You are visible to teammate matching.
                </span>
              </div>

            </div>

            <div className="profile-status-item">

              <Calendar size={20} />

              <div>
                <strong>
                  Joined HackathonBuddy
                </strong>

                <span>
                  August 2026
                </span>
              </div>

            </div>

          </section>

        </aside>

      </div>

      {/* ================= PROJECTS ================= */}

      <section className="profile-project-section">

        <div className="projects-header">

          <div>

            <span className="profile-eyebrow">
              WORKSPACE
            </span>

            <h2>My Projects</h2>

            <p>
              Projects you are currently working on.
            </p>

          </div>

          <button className="view-all-btn">
            View All
          </button>

        </div>

        <div className="profile-project-grid">

          {projects.map((project) => (
            <div
              className="profile-project-card"
              key={project.name}
            >

              <div className="project-top">

                <div className="project-icon">
                  <Code2 size={21} />
                </div>

                <span className="project-status">
                  {project.status}
                </span>

              </div>

              <h3>{project.name}</h3>

              <p>{project.domain}</p>

              <div className="project-progress-header">

                <span>Progress</span>

                <strong>
                  {project.progress}%
                </strong>

              </div>

              <div className="project-progress">

                <div
                  style={{
                    width: `${project.progress}%`,
                  }}
                />

              </div>

              <button className="open-project-btn">
                Open Project →
              </button>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Profile;