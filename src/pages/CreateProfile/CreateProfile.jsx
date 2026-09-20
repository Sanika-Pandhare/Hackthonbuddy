// import { useState } from "react";
// import "./CreateProfile.css";

// function CreateProfile({ onBack, onLogin }) {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     primaryRole: "Full Stack",
//     techSkills: "",
//     projectDomains: "",
//     githubUrl: "",
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormData((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     console.log("Profile Data:", formData);

//     // Spring Boot API will be connected here later.
//   };

//   return (
//     <div className="hb-profile-page">

//       {/* Background */}
//       <div className="hb-profile-glow hb-profile-glow-left"></div>
//       <div className="hb-profile-glow hb-profile-glow-right"></div>


//       {/* Back */}
//       <button
//         type="button"
//         className="hb-profile-back"
//         onClick={onBack}
//       >
//         ← Back
//       </button>


//       {/* Main */}
//       <main className="hb-profile-wrapper">

//         {/* Brand */}
//         <div className="hb-profile-brand">

//           <div className="hb-profile-brand-icon">
//             🚀
//           </div>

//           <div className="hb-profile-brand-name">
//             HACKATHON<span>BUDDY</span>
//           </div>

//         </div>


//         {/* Heading */}
//         <h1 className="hb-profile-title">
//           JOIN THE CLUB
//         </h1>

//         <p className="hb-profile-subtitle">
//           Create your profile to get matched
//         </p>


//         {/* Form */}
//         <form
//           className="hb-profile-card"
//           onSubmit={handleSubmit}
//         >

//           {/* =====================================
//               IDENTITY
//           ===================================== */}

//           <section className="hb-profile-section">

//             <h2 className="hb-profile-section-title purple">
//               IDENTITY
//             </h2>


//             {/* Full Name */}
//             <div className="hb-profile-field">

//               <label htmlFor="fullName">
//                 FULL NAME
//               </label>

//               <input
//                 id="fullName"
//                 name="fullName"
//                 type="text"
//                 placeholder="Jane Doe"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 autoComplete="name"
//                 required
//               />

//             </div>


//             {/* Email */}
//             <div className="hb-profile-field">

//               <label htmlFor="profile-email">
//                 EMAIL
//               </label>

//               <input
//                 id="profile-email"
//                 name="email"
//                 type="email"
//                 placeholder="jane@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 autoComplete="email"
//                 required
//               />

//             </div>


//             {/* Password */}
//             <div className="hb-profile-field">

//               <label htmlFor="profile-password">
//                 PASSWORD
//               </label>

//               <input
//                 id="profile-password"
//                 name="password"
//                 type="password"
//                 placeholder="Min 6 chars"
//                 value={formData.password}
//                 onChange={handleChange}
//                 autoComplete="new-password"
//                 minLength={6}
//                 required
//               />

//             </div>


//             {/* Role */}
//             <div className="hb-profile-field">

//               <label htmlFor="primaryRole">
//                 PRIMARY ROLE
//               </label>

//               <select
//                 id="primaryRole"
//                 name="primaryRole"
//                 value={formData.primaryRole}
//                 onChange={handleChange}
//               >

//                 <option value="Full Stack">
//                   Full Stack
//                 </option>

//                 <option value="Frontend">
//                   Frontend Developer
//                 </option>

//                 <option value="Backend">
//                   Backend Developer
//                 </option>

//                 <option value="AI/ML">
//                   AI / ML Engineer
//                 </option>

//                 <option value="Data Scientist">
//                   Data Scientist
//                 </option>

//                 <option value="UI/UX">
//                   UI / UX Designer
//                 </option>

//                 <option value="DevOps">
//                   DevOps Engineer
//                 </option>

//                 <option value="Product Manager">
//                   Product Manager
//                 </option>

//               </select>

//             </div>

//           </section>


//           {/* =====================================
//               STACK
//           ===================================== */}

//           <section className="hb-profile-section">

//             <h2 className="hb-profile-section-title cyan">
//               STACK
//             </h2>


//             {/* Tech Skills */}
//             <div className="hb-profile-field">

//               <label htmlFor="techSkills">
//                 TECH SKILLS
//               </label>

//               <input
//                 id="techSkills"
//                 name="techSkills"
//                 type="text"
//                 placeholder="React, Node..."
//                 value={formData.techSkills}
//                 onChange={handleChange}
//                 required
//               />

//             </div>


//             {/* Project Domains */}
//             <div className="hb-profile-field">

//               <label htmlFor="projectDomains">
//                 PROJECT DOMAINS
//               </label>

//               <input
//                 id="projectDomains"
//                 name="projectDomains"
//                 type="text"
//                 placeholder="AI, Web3..."
//                 value={formData.projectDomains}
//                 onChange={handleChange}
//               />

//             </div>


//             {/* Github */}
//             <div className="hb-profile-field">

//               <label htmlFor="githubUrl">
//                 GITHUB URL
//               </label>

//               <input
//                 id="githubUrl"
//                 name="githubUrl"
//                 type="url"
//                 placeholder="https://github.com/..."
//                 value={formData.githubUrl}
//                 onChange={handleChange}
//               />

//             </div>

//           </section>


//           {/* Submit */}
//           <button
//             type="submit"
//             className="hb-profile-submit"
//           >
//             INITIALIZE PROFILE
//           </button>


//           {/* Divider */}
//           <div className="hb-profile-divider"></div>


//           {/* Login */}
//           <div className="hb-profile-login">

//             <span>
//               Already have an account?
//             </span>

//             <button
//               type="button"
//               onClick={onLogin}
//             >
//               Sign In
//             </button>

//           </div>

//         </form>

//       </main>

//     </div>
//   );
// }

// export default CreateProfile;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import "./CreateProfile.css";

function CreateProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    primaryRole: "Full Stack",
    techSkills: "",
    projectDomains: "",
    githubUrl: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.techSkills.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    const user = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      primaryRole: formData.primaryRole,
      techSkills: formData.techSkills,
      projectDomains: formData.projectDomains,
      githubUrl: formData.githubUrl,
    };

    localStorage.setItem(
      "hackathonBuddyUser",
      JSON.stringify(user)
    );

    console.log("========== REGISTER ==========");
    console.log("Registered User:", user);
    console.log("Name:", user.fullName);
    console.log("Email:", user.email);
    console.log("Password:", user.password);
    console.log("Role:", user.primaryRole);
    console.log("Skills:", user.techSkills);
    console.log("Domains:", user.projectDomains);
    console.log("GitHub:", user.githubUrl);
    console.log("==============================");

    alert("Profile created successfully!");

    navigate("/login");
  };

  return (
    <div className="create-profile-page">

      {/* BACK */}
      <button
        className="create-profile-back"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        <ArrowLeft size={25} />
      </button>


      {/* HEADER */}
      <header className="create-profile-header">

        <div className="create-profile-logo">

          <div className="create-profile-logo-icon">
            🚀
          </div>

          <div className="create-profile-logo-text">
            HACKATHON<span>BUDDY</span>
          </div>

        </div>


        <h1>JOIN THE CLUB</h1>

        <p>
          Create your profile to get matched
        </p>

      </header>


      {/* CARD */}
      <div className="create-profile-card">

        <form onSubmit={handleSubmit}>

          <div className="create-profile-columns">

            {/* =====================
                LEFT COLUMN
            ====================== */}

            <div className="profile-column">

              <h2 className="profile-section-title identity-title">
                IDENTITY
              </h2>


              {/* FULL NAME */}
              <div className="profile-field">

                <label htmlFor="fullName">
                  FULL NAME
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Jane Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />

              </div>


              {/* EMAIL */}
              <div className="profile-field">

                <label htmlFor="email">
                  EMAIL
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>


              {/* PASSWORD */}
              <div className="profile-field">

                <label htmlFor="password">
                  PASSWORD
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Min 6 chars"
                  value={formData.password}
                  onChange={handleChange}
                />

              </div>


              {/* PRIMARY ROLE */}
              <div className="profile-field">

                <label htmlFor="primaryRole">
                  PRIMARY ROLE
                </label>

                <select
                  id="primaryRole"
                  name="primaryRole"
                  value={formData.primaryRole}
                  onChange={handleChange}
                >
                  <option>Full Stack</option>
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>AI / ML</option>
                  <option>UI / UX</option>
                  <option>DevOps</option>
                </select>

              </div>

            </div>


            {/* =====================
                RIGHT COLUMN
            ====================== */}

            <div className="profile-column">

              <h2 className="profile-section-title stack-title">
                STACK
              </h2>


              {/* TECH SKILLS */}
              <div className="profile-field">

                <label htmlFor="techSkills">
                  TECH SKILLS
                </label>

                <input
                  id="techSkills"
                  name="techSkills"
                  type="text"
                  placeholder="React, Node..."
                  value={formData.techSkills}
                  onChange={handleChange}
                />

              </div>


              {/* PROJECT DOMAINS */}
              <div className="profile-field">

                <label htmlFor="projectDomains">
                  PROJECT DOMAINS
                </label>

                <input
                  id="projectDomains"
                  name="projectDomains"
                  type="text"
                  placeholder="AI, Web3..."
                  value={formData.projectDomains}
                  onChange={handleChange}
                />

              </div>


              {/* GITHUB */}
              <div className="profile-field">

                <label htmlFor="githubUrl">
                  GITHUB URL
                </label>

                <input
                  id="githubUrl"
                  name="githubUrl"
                  type="url"
                  placeholder="https://github.com/..."
                  value={formData.githubUrl}
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>


          {/* ERROR */}
          {error && (
            <div className="create-profile-error">
              {error}
            </div>
          )}


          {/* BUTTON */}
          <button
            type="submit"
            className="initialize-profile-button"
          >
            INITIALIZE PROFILE
          </button>


          {/* DIVIDER */}
          <div className="create-profile-divider"></div>


          {/* LOGIN */}
          <div className="already-account">

            <span>
              Already have an account?
            </span>

            <button
              type="button"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateProfile;
