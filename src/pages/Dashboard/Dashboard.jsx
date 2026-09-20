import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Trophy,
  Users,
  Brain,
  FolderKanban,
  MessageSquare,
  Bell,
  User,
  ClipboardList,
  CalendarDays,
  Settings,
  Search,
  ChevronDown,
  MoreHorizontal,
  Plus,
  CheckCircle,
  Sparkles,
  Lightbulb,
  Target,
  Wrench,
  TrendingUp,
  ArrowRight,
  UserPlus,
} from "lucide-react";

import "./Dashboard.css";

function Dashboard() {
  const currentUser =
    JSON.parse(
      localStorage.getItem("hackathonBuddyCurrentUser")
    ) || {};

  const userName =
    currentUser.fullName ||
    currentUser.name ||
    "Hackathon User";

  const userRole =
    currentUser.primaryRole ||
    currentUser.role ||
    "Full Stack";

  const firstLetter =
    userName.charAt(0).toUpperCase();

  const skills = currentUser.techSkills
    ? currentUser.techSkills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];

  const domains = currentUser.projectDomains
    ? currentUser.projectDomains
        .split(",")
        .map((domain) => domain.trim())
        .filter(Boolean)
    : [];

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      active: true,
    },
    {
      label: "Hackathons",
      icon: Trophy,
      path: "/hackathons",
    },
    {
      label: "Teams",
      icon: Users,
      path: "/teams",
    },
    {
      label: "AI Hub",
      icon: Brain,
      path: "/ai-hub",
    },
    {
      label: "Projects",
      icon: FolderKanban,
      path: "/projects",
    },
    {
      label: "Chat",
      icon: MessageSquare,
      path: "/chat",
    },
    {
      label: "Notifications",
      icon: Bell,
      path: "/notifications",
    },
    {
      label: "Profile",
      icon: User,
      path: "/profile",
    },
    {
      label: "My Registrations",
      icon: ClipboardList,
      path: "/registrations",
    },
    {
      label: "Calendar",
      icon: CalendarDays,
      path: "/calendar",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  const handleNavigation = (path) => {
    console.log("Navigate:", path);
    window.location.href = path;
  };

  const stats = [
    {
      icon: Trophy,
      value: "12",
      title: "Hackathons",
      subtitle: "Registered: 3",
      type: "purple",
    },
    {
      icon: Users,
      value: "2",
      title: "My Teams",
      subtitle: "Active Teams",
      type: "green",
    },
    {
      icon: Lightbulb,
      value: "8",
      title: "Project Ideas",
      subtitle: "Generated",
      type: "yellow",
    },
    {
      icon: TrendingUp,
      value: "87%",
      title: "Skill Match",
      subtitle: "Average Score",
      type: "blue",
    },
  ];

  const hackathons = [
    {
      title: "AI Innovation Challenge 2024",
      category: "AI/ML",
      date: "18 Aug 2024",
      prize: "₹5,00,000",
      match: "92%",
      type: "ai",
    },
    {
      title: "Smart City Hackathon",
      category: "Smart City",
      date: "25 Aug 2024",
      prize: "₹3,00,000",
      match: "86%",
      type: "city",
    },
    {
      title: "FinTech Challenge",
      category: "FinTech",
      date: "02 Sep 2024",
      prize: "₹4,00,000",
      match: "81%",
      type: "fintech",
    },
  ];

  const teammates = [
    {
      name: userName,
      role: userRole,
      letter: firstLetter,
      you: true,
    },
    {
      name: "Priya Singh",
      role: "UI/UX Designer",
      letter: "P",
    },
    {
      name: "Rohan Mehta",
      role: "ML Developer",
      letter: "R",
    },
    {
      name: "Aman Khan",
      role: "DevOps Engineer",
      letter: "A",
    },
  ];

  const upcomingHackathons = [
    {
      short: "AI",
      title: "AI Innovation Challenge",
      date: "18 Aug 2024",
      status: "Registered",
      statusType: "registered",
    },
    {
      short: "SC",
      title: "Smart City Hackathon",
      date: "25 Aug 2024",
      status: "Register",
      statusType: "register",
    },
    {
      short: "FT",
      title: "FinTech Challenge",
      date: "02 Sep 2024",
      status: "Register",
      statusType: "register",
    },
  ];

  const activities = [
    {
      icon: CheckCircle,
      text: "You registered for AI Innovation Challenge",
      time: "2 hours ago",
      type: "success",
    },
    {
      icon: Users,
      text: "Priya Singh accepted your team invite",
      time: "5 hours ago",
      type: "purple",
    },
    {
      icon: Trophy,
      text: "New teammate match found: 92% compatible",
      time: "1 day ago",
      type: "yellow",
    },
    {
      icon: Lightbulb,
      text: "Project idea generated: AI Study Assistant",
      time: "1 day ago",
      type: "blue",
    },
    {
      icon: MessageSquare,
      text: "New message in CodeCrafters team",
      time: "2 days ago",
      type: "green",
    },
  ];

  return (
    <div className="dashboard-page">

      {/* =====================================================
          SIDEBAR
          ===================================================== */}

      <aside className="dashboard-sidebar">

        {/* LOGO */}

        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            🚀
          </div>

          <div className="sidebar-logo-text">
            Hackathon
            <span>Buddy</span>
          </div>
        </div>


        {/* MENU */}

        <nav className="sidebar-menu">

          {menuItems.map(
            ({
              label,
              icon: Icon,
              path,
              active,
            }) => (

              <button
                key={label}
                type="button"
                className={`sidebar-menu-item ${
                  active ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation(path)
                }
              >

                <Icon size={21} />

                <span>
                  {label}
                </span>

              </button>

            )
          )}

        </nav>

        {/* IMPORTANT:
            NO PURPLE BOTTOM CARD HERE.
            SIDEBAR ENDS AFTER SETTINGS.
        */}

      </aside>


      {/* =====================================================
          MAIN AREA
          ===================================================== */}

      <main className="dashboard-main">


        {/* ===================================================
            TOP HEADER
            =================================================== */}

        <header className="dashboard-header">

          <div className="header-left">

            <button
              className="mobile-menu-button"
              type="button"
            >
              ☰
            </button>

            <h1>
              Dashboard
            </h1>

          </div>


          {/* SEARCH */}

          <div className="dashboard-search">

            <input
              type="text"
              placeholder="Search hackathons, teams, skills..."
            />

            <Search size={21} />

          </div>


          {/* HEADER RIGHT */}

          <div className="header-right">

            <button
              className="header-icon-button"
              type="button"
            >
              <Bell size={22} />

              <span className="notification-count">
                5
              </span>
            </button>


            <button
              className="header-icon-button"
              type="button"
            >
              <MessageSquare size={22} />

              <span className="notification-count">
                3
              </span>
            </button>


            <div className="header-profile">

              <div className="header-avatar">
                {firstLetter}
              </div>

              <div className="header-user-info">

                <strong>
                  {userName}
                </strong>

                <span>
                  {userRole}
                </span>

              </div>

              <ChevronDown size={18} />

            </div>

          </div>

        </header>


        {/* ===================================================
            DASHBOARD CONTENT
            =================================================== */}

        <div className="dashboard-content">


          {/* WELCOME */}

          <section className="welcome-section">

            <div className="welcome-content">

              <h2>
                Good Evening,{" "}
                {userName}
                ! 👋
              </h2>

              <p>
                Discover hackathons, build your dream
                team,
                <br />
                and create innovative solutions.
              </p>


              <div className="welcome-buttons">

                <button
                  type="button"
                  className="primary-action"
                  onClick={() =>
                    handleNavigation("/hackathons")
                  }
                >
                  <Search size={18} />
                  Find Hackathons
                </button>


                <button
                  type="button"
                  className="secondary-action"
                  onClick={() =>
                    handleNavigation("/matching")
                  }
                >
                  <UserPlus size={18} />
                  Find Teammates
                </button>

              </div>

            </div>


            <div className="welcome-illustration">

              <div className="illustration-person">
                👨‍💻
              </div>

              <div className="illustration-person second">
                👩‍💻
              </div>

              <div className="illustration-person third">
                👨‍💻
              </div>

            </div>

          </section>


          {/* =================================================
              STATISTICS
              ================================================= */}

          <section className="stats-grid">

            {stats.map(
              ({
                icon: Icon,
                value,
                title,
                subtitle,
                type,
              }) => (

                <div
                  className={`stat-card ${type}`}
                  key={title}
                >

                  <div className="stat-icon">
                    <Icon size={24} />
                  </div>

                  <strong className="stat-value">
                    {value}
                  </strong>

                  <span className="stat-title">
                    {title}
                  </span>

                  <span className="stat-subtitle">
                    {subtitle}
                  </span>

                  <div className="stat-chart">
                    ╱╲╱╲╱╲
                  </div>

                </div>

              )
            )}

          </section>


          {/* =================================================
              RECOMMENDED + AI HUB
              ================================================= */}

          <section className="middle-grid">


            {/* RECOMMENDED HACKATHONS */}

            <div className="dashboard-panel">

              <div className="panel-header">

                <h2>
                  Recommended Hackathons
                </h2>

                <button
                  type="button"
                  onClick={() =>
                    handleNavigation("/hackathons")
                  }
                >
                  View All
                </button>

              </div>


              <div className="hackathon-cards">

                {hackathons.map(
                  (hackathon) => (

                    <div
                      className="hackathon-card"
                      key={hackathon.title}
                    >

                      <div
                        className={`hackathon-image ${hackathon.type}`}
                      >
                        {hackathon.type === "ai" &&
                          "AI"}

                        {hackathon.type === "city" &&
                          "CITY"}

                        {hackathon.type === "fintech" &&
                          "FINTECH"}
                      </div>


                      <h3>
                        {hackathon.title}
                      </h3>


                      <span className="category-tag">
                        {hackathon.category}
                      </span>


                      <p>
                        📅 {hackathon.date}
                      </p>

                      <p>
                        Prize Pool: {hackathon.prize}
                      </p>


                      <div className="hackathon-footer">

                        <strong>
                          {hackathon.match} Match
                        </strong>

                        <button
                          type="button"
                        >
                          View Details
                        </button>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>


            {/* AI HUB */}

            <div className="dashboard-panel">

              <div className="panel-header">

                <h2>
                  AI Hub
                </h2>

              </div>


              <div className="ai-hub-grid">


                <div className="ai-card purple">

                  <div className="ai-card-icon">
                    👥
                  </div>

                  <h3>
                    AI Teammate
                    <br />
                    Matching
                  </h3>

                  <p>
                    Find the perfect teammates
                    based on skills and interests.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      handleNavigation("/matching")
                    }
                  >
                    Find Teammates
                  </button>

                </div>


                <div className="ai-card green">

                  <div className="ai-card-icon">
                    📊
                  </div>

                  <h3>
                    Skill Gap
                    <br />
                    Analysis
                  </h3>

                  <p>
                    Analyze your team skills
                    and discover missing skills.
                  </p>

                  <button
                    type="button"
                  >
                    Analyze Team
                  </button>

                </div>


                <div className="ai-card yellow">

                  <div className="ai-card-icon">
                    💡
                  </div>

                  <h3>
                    Project Idea
                    <br />
                    Generator
                  </h3>

                  <p>
                    Get AI-powered project ideas
                    for your next hackathon.
                  </p>

                  <button
                    type="button"
                  >
                    Generate Ideas
                  </button>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              BOTTOM GRID
              ================================================= */}

          <section className="bottom-grid">


            {/* MY TEAM */}

            <div className="dashboard-panel team-panel">

              <div className="panel-header">

                <h2>
                  My Team - CodeCrafters
                </h2>

                <button
                  type="button"
                >
                  View Team
                </button>

              </div>


              <div className="team-members">

                {teammates.map(
                  (member) => (

                    <div
                      className="team-member"
                      key={member.name}
                    >

                      <div className="team-avatar">
                        {member.letter}
                      </div>

                      <strong>
                        {member.name}
                      </strong>

                      <span>
                        {member.role}
                      </span>

                      {member.you && (
                        <small>
                          You
                        </small>
                      )}

                    </div>

                  )
                )}


                <button
                  type="button"
                  className="add-member"
                >
                  <Plus size={27} />
                  <span>
                    Add Member
                  </span>
                </button>

              </div>


              <div className="team-divider" />


              <div className="skill-coverage">

                <div className="coverage-header">

                  <strong>
                    Team Skill Coverage
                  </strong>

                  <strong>
                    82%
                  </strong>

                </div>

                <div className="progress-bar">

                  <div
                    className="progress-value"
                    style={{
                      width: "82%",
                    }}
                  />

                </div>

              </div>


              <div className="missing-skills">

                <strong>
                  Missing Skills
                </strong>

                <div className="skill-tags">

                  <span>
                    Docker
                  </span>

                  <span>
                    AWS
                  </span>

                  <span>
                    Kubernetes
                  </span>

                </div>


                <button
                  type="button"
                  className="skill-gap-button"
                >
                  Skill Gap Analysis
                </button>

              </div>

            </div>


            {/* UPCOMING */}

            <div className="dashboard-panel">

              <div className="panel-header">

                <h2>
                  Upcoming Hackathons
                </h2>

                <button
                  type="button"
                >
                  View Calendar
                </button>

              </div>


              <div className="upcoming-list">

                {upcomingHackathons.map(
                  (item) => (

                    <div
                      className="upcoming-item"
                      key={item.title}
                    >

                      <div className="upcoming-icon">
                        {item.short}
                      </div>


                      <div className="upcoming-info">

                        <strong>
                          {item.title}
                        </strong>

                        <span>
                          📅 {item.date}
                        </span>

                      </div>


                      {item.statusType ===
                      "registered" ? (

                        <span className="registered-status">
                          ✓ Registered
                        </span>

                      ) : (

                        <button
                          type="button"
                          className="register-button"
                        >
                          Register
                        </button>

                      )}

                    </div>

                  )
                )}

              </div>


              <button
                type="button"
                className="see-all-button"
                onClick={() =>
                  handleNavigation("/hackathons")
                }
              >
                See All Hackathons
                <ArrowRight size={18} />
              </button>

            </div>


            {/* RECENT ACTIVITY */}

            <div className="dashboard-panel">

              <div className="panel-header">

                <h2>
                  Recent Activity
                </h2>

                <button
                  type="button"
                >
                  View All
                </button>

              </div>


              <div className="activity-list">

                {activities.map(
                  ({
                    icon: Icon,
                    text,
                    time,
                    type,
                  }) => (

                    <div
                      className="activity-item"
                      key={text}
                    >

                      <div
                        className={`activity-icon ${type}`}
                      >
                        <Icon size={18} />
                      </div>


                      <div className="activity-content">

                        <strong>
                          {text}
                        </strong>

                        <span>
                          {time}
                        </span>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;