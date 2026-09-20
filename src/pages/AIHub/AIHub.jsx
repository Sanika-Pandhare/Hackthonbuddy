import React, { useState } from "react";
import {
  ArrowLeft,
  Brain,
  Users,
  BarChart3,
  Lightbulb,
  Sparkles,
  Search,
  CheckCircle2,
  Target,
  Code2,
  Zap,
  RefreshCw,
} from "lucide-react";

import "./AIHub.css";

function AIHub() {
  const [activeModule, setActiveModule] = useState("matching");

  /* -----------------------------
     TEAM MATCHING STATE
  ----------------------------- */

  const [skills, setSkills] = useState("");
  const [domain, setDomain] = useState("AI / ML");
  const [role, setRole] = useState("Full Stack");

  const [matchingResults, setMatchingResults] = useState([]);

  /* -----------------------------
     SKILL GAP STATE
  ----------------------------- */

  const [skillAnalysis, setSkillAnalysis] = useState(null);

  /* -----------------------------
     PROJECT IDEA STATE
  ----------------------------- */

  const [ideaDomain, setIdeaDomain] = useState("AI / ML");
  const [technology, setTechnology] = useState("React + Python");
  const [difficulty, setDifficulty] = useState("Intermediate");

  const [generatedIdeas, setGeneratedIdeas] = useState([]);

  /* -----------------------------
     MOCK TEAMMATE DATA
     Later replace with API
  ----------------------------- */

  const teammates = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Backend Developer",
      skills: ["Java", "Spring Boot", "PostgreSQL"],
      domain: "AI / ML",
      match: 94,
    },
    {
      id: 2,
      name: "Priya Singh",
      role: "UI/UX Designer",
      skills: ["Figma", "UI/UX", "Prototyping"],
      domain: "Web",
      match: 87,
    },
    {
      id: 3,
      name: "Rohan Mehta",
      role: "ML Developer",
      skills: ["Python", "TensorFlow", "Machine Learning"],
      domain: "AI / ML",
      match: 91,
    },
  ];

  /* -----------------------------
     FIND TEAMMATES
  ----------------------------- */

  const handleFindTeammates = () => {
    const requiredSkills = skills
      .toLowerCase()
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const results = teammates
      .map((member) => {
        const matchedSkills = member.skills.filter((memberSkill) =>
          requiredSkills.some((requiredSkill) =>
            memberSkill.toLowerCase().includes(requiredSkill)
          )
        );

        let calculatedMatch = member.match;

        if (requiredSkills.length > 0) {
          calculatedMatch = Math.min(
            99,
            member.match + matchedSkills.length * 2
          );
        }

        return {
          ...member,
          calculatedMatch,
          matchedSkills,
        };
      })
      .filter((member) => {
        const domainMatch =
          domain === "All" || member.domain === domain;

        const roleMatch =
          role === "Any Role" ||
          member.role.toLowerCase().includes(role.toLowerCase());

        return domainMatch && roleMatch;
      })
      .sort((a, b) => b.calculatedMatch - a.calculatedMatch);

    setMatchingResults(results);
  };

  /* -----------------------------
     SKILL GAP ANALYSIS
  ----------------------------- */

  const handleSkillAnalysis = () => {
    const result = {
      requiredSkills: [
        "React",
        "Node.js",
        "Python",
        "Machine Learning",
        "PostgreSQL",
        "Docker",
      ],
      availableSkills: ["React", "Node.js", "PostgreSQL"],
      missingSkills: [
        "Python",
        "Machine Learning",
        "Docker",
      ],
      coverage: 50,
    };

    setSkillAnalysis(result);
  };

  /* -----------------------------
     PROJECT IDEA GENERATOR
  ----------------------------- */

  const handleGenerateIdeas = () => {
    const ideas = [
      {
        title: "AI Hackathon Teammate Matcher",
        description:
          "Build an intelligent system that recommends teammates based on skills, roles, interests and project requirements.",
        tags: ["AI", "Matching", "React"],
      },
      {
        title: "Smart Skill Gap Analyzer",
        description:
          "Analyze a team's current skills and identify the missing technical skills required to complete a project.",
        tags: ["ML", "Analytics", "Python"],
      },
      {
        title: "AI Project Recommendation Engine",
        description:
          "Generate personalized hackathon project ideas based on user skills, interests and selected technology.",
        tags: ["AI", "Recommendation", "Web"],
      },
    ];

    setGeneratedIdeas(ideas);

    localStorage.setItem(
      "hackathonBuddyGeneratedIdeas",
      JSON.stringify(ideas)
    );
  };

  return (
    <div className="aihub-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="aihub-header">

        <div>
          <div className="aihub-breadcrumb">
            HackathonBuddy / AI Hub
          </div>

          <h1>
            AI <span>HUB</span>
          </h1>

          <p>
            Intelligent tools to help you build better hackathon teams
            and projects.
          </p>
        </div>

        <div className="aihub-header-icon">
          <Brain size={34} />
        </div>

      </div>

      {/* =========================
          MODULE NAVIGATION
      ========================= */}

      <div className="aihub-module-grid">

        <button
          className={`aihub-module-card ${
            activeModule === "matching" ? "active" : ""
          }`}
          onClick={() => setActiveModule("matching")}
        >
          <div className="module-icon matching">
            <Users size={25} />
          </div>

          <div>
            <h3>AI Teammate Matching</h3>
            <p>
              Find teammates based on skills, roles and interests.
            </p>
          </div>
        </button>

        <button
          className={`aihub-module-card ${
            activeModule === "skills" ? "active" : ""
          }`}
          onClick={() => setActiveModule("skills")}
        >
          <div className="module-icon skills">
            <BarChart3 size={25} />
          </div>

          <div>
            <h3>Skill Gap Analysis</h3>
            <p>
              Discover missing skills in your project team.
            </p>
          </div>
        </button>

        <button
          className={`aihub-module-card ${
            activeModule === "ideas" ? "active" : ""
          }`}
          onClick={() => setActiveModule("ideas")}
        >
          <div className="module-icon ideas">
            <Lightbulb size={25} />
          </div>

          <div>
            <h3>Project Idea Generator</h3>
            <p>
              Generate project ideas using AI.
            </p>
          </div>
        </button>

      </div>

      {/* =========================
          AI TEAM MATCHING
      ========================= */}

      {activeModule === "matching" && (
        <section className="aihub-workspace">

          <div className="workspace-heading">

            <div>
              <span className="workspace-label">
                AI POWERED
              </span>

              <h2>
                Find Your Perfect Teammate
              </h2>

              <p>
                Tell us what your project needs and our matching
                engine will find suitable teammates.
              </p>
            </div>

            <Sparkles className="heading-sparkle" />

          </div>

          <div className="matching-layout">

            <div className="aihub-form-card">

              <div className="form-group">

                <label>
                  REQUIRED SKILLS
                </label>

                <input
                  type="text"
                  placeholder="React, Python, PostgreSQL..."
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />

                <small>
                  Separate multiple skills using commas.
                </small>

              </div>

              <div className="form-row">

                <div className="form-group">

                  <label>
                    PROJECT DOMAIN
                  </label>

                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                  >
                    <option>AI / ML</option>
                    <option>Web</option>
                    <option>Mobile</option>
                    <option>FinTech</option>
                    <option>HealthTech</option>
                    <option>Web3</option>
                    <option>All</option>
                  </select>

                </div>

                <div className="form-group">

                  <label>
                    REQUIRED ROLE
                  </label>

                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option>Full Stack</option>
                    <option>Backend</option>
                    <option>Frontend</option>
                    <option>ML Developer</option>
                    <option>UI/UX Designer</option>
                    <option>Any Role</option>
                  </select>

                </div>

              </div>

              <button
                className="ai-primary-button"
                onClick={handleFindTeammates}
              >
                <Search size={19} />
                FIND MATCHES
              </button>

            </div>

            <div className="ai-info-card">

              <Target size={30} />

              <h3>
                How matching works
              </h3>

              <p>
                The matching system evaluates technical skills,
                project domain, role compatibility and profile
                information.
              </p>

              <div className="matching-points">

                <span>
                  <CheckCircle2 size={16} />
                  Skill compatibility
                </span>

                <span>
                  <CheckCircle2 size={16} />
                  Role compatibility
                </span>

                <span>
                  <CheckCircle2 size={16} />
                  Domain compatibility
                </span>

              </div>

            </div>

          </div>

          {/* RESULTS */}

          {matchingResults.length > 0 && (
            <div className="results-section">

              <div className="results-heading">
                <h3>
                  Recommended Teammates
                </h3>

                <span>
                  {matchingResults.length} matches
                </span>
              </div>

              <div className="teammate-grid">

                {matchingResults.map((member) => (
                  <div
                    className="teammate-card"
                    key={member.id}
                  >

                    <div className="teammate-top">

                      <div className="avatar">
                        {member.name.charAt(0)}
                      </div>

                      <div>
                        <h3>{member.name}</h3>
                        <p>{member.role}</p>
                      </div>

                      <div className="match-score">
                        {member.calculatedMatch}%
                        <span>MATCH</span>
                      </div>

                    </div>

                    <div className="skill-tags">

                      {member.skills.map((skill) => (
                        <span key={skill}>
                          {skill}
                        </span>
                      ))}

                    </div>

                    <button className="connect-button">
                      CONNECT
                    </button>

                  </div>
                ))}

              </div>

            </div>
          )}

        </section>
      )}

      {/* =========================
          SKILL GAP
      ========================= */}

      {activeModule === "skills" && (
        <section className="aihub-workspace">

          <div className="workspace-heading">

            <div>
              <span className="workspace-label">
                TEAM ANALYTICS
              </span>

              <h2>
                Skill Gap Analysis
              </h2>

              <p>
                Understand whether your team has the skills required
                to complete your project.
              </p>
            </div>

            <BarChart3 className="heading-sparkle" />

          </div>

          <div className="skill-analysis-card">

            <div className="analysis-top">

              <div>
                <h3>
                  Project Skill Coverage
                </h3>

                <p>
                  AI Hackathon Project
                </p>
              </div>

              <div className="coverage-score">
                50%
              </div>

            </div>

            <div className="coverage-bar">
              <div style={{ width: "50%" }}></div>
            </div>

            <button
              className="ai-primary-button analysis-button"
              onClick={handleSkillAnalysis}
            >
              <BarChart3 size={18} />
              ANALYZE TEAM
            </button>

          </div>

          {skillAnalysis && (
            <div className="analysis-result">

              <div className="analysis-column">

                <h3>
                  Available Skills
                </h3>

                {skillAnalysis.availableSkills.map(
                  (skill) => (
                    <div
                      className="analysis-skill available"
                      key={skill}
                    >
                      <CheckCircle2 size={17} />
                      {skill}
                    </div>
                  )
                )}

              </div>

              <div className="analysis-column">

                <h3>
                  Missing Skills
                </h3>

                {skillAnalysis.missingSkills.map(
                  (skill) => (
                    <div
                      className="analysis-skill missing"
                      key={skill}
                    >
                      <Zap size={17} />
                      {skill}
                    </div>
                  )
                )}

              </div>

            </div>
          )}

        </section>
      )}

      {/* =========================
          PROJECT IDEA GENERATOR
      ========================= */}

      {activeModule === "ideas" && (
        <section className="aihub-workspace">

          <div className="workspace-heading">

            <div>
              <span className="workspace-label">
                GENERATIVE AI
              </span>

              <h2>
                Project Idea Generator
              </h2>

              <p>
                Generate hackathon-ready ideas based on your
                preferred technology and domain.
              </p>
            </div>

            <Lightbulb className="heading-sparkle" />

          </div>

          <div className="idea-generator-card">

            <div className="form-row">

              <div className="form-group">

                <label>
                  DOMAIN
                </label>

                <select
                  value={ideaDomain}
                  onChange={(e) =>
                    setIdeaDomain(e.target.value)
                  }
                >
                  <option>AI / ML</option>
                  <option>HealthTech</option>
                  <option>FinTech</option>
                  <option>EdTech</option>
                  <option>Web3</option>
                  <option>ClimateTech</option>
                </select>

              </div>

              <div className="form-group">

                <label>
                  TECHNOLOGY
                </label>

                <select
                  value={technology}
                  onChange={(e) =>
                    setTechnology(e.target.value)
                  }
                >
                  <option>React + Python</option>
                  <option>React + Node.js</option>
                  <option>Java + Spring Boot</option>
                  <option>Python + FastAPI</option>
                  <option>MERN Stack</option>
                </select>

              </div>

              <div className="form-group">

                <label>
                  DIFFICULTY
                </label>

                <select
                  value={difficulty}
                  onChange={(e) =>
                    setDifficulty(e.target.value)
                  }
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>

              </div>

            </div>

            <button
              className="ai-primary-button"
              onClick={handleGenerateIdeas}
            >
              <Sparkles size={19} />
              GENERATE IDEAS
            </button>

          </div>

          {generatedIdeas.length > 0 && (
            <div className="ideas-grid">

              {generatedIdeas.map((idea, index) => (
                <div
                  className="idea-card"
                  key={index}
                >

                  <div className="idea-number">
                    0{index + 1}
                  </div>

                  <h3>
                    {idea.title}
                  </h3>

                  <p>
                    {idea.description}
                  </p>

                  <div className="skill-tags">

                    {idea.tags.map((tag) => (
                      <span key={tag}>
                        {tag}
                      </span>
                    ))}

                  </div>

                  <button className="view-idea-button">
                    VIEW IDEA →
                  </button>

                </div>
              ))}

            </div>
          )}

        </section>
      )}

      {/* =========================
          FOOTER
      ========================= */}

      <div className="aihub-footer">
        <Code2 size={17} />
        HackathonBuddy AI Engine
        <span>•</span>
        Intelligent tools for hackers
      </div>

    </div>
  );
}

export default AIHub;