import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Bot,
  Users,
  CalendarDays,
  ArrowRight,
  MoreVertical,
  X,
  Trash2,
  FolderKanban,
  CheckCircle2,
  Clock3,
  Circle,
} from "lucide-react";

import "./Projects.css";

/* =========================================================
   PROJECT DATA
========================================================= */

const INITIAL_PROJECTS = [
  {
    id: 1,
    name: "chatbot",
    domain: "AI",
    status: "Active",
    description: "An intelligent AI chatbot for real-time conversations.",
    technologies: ["React"],
    members: 3,
    createdAt: "2026-08-23",
    progress: 0,
  },

  {
    id: 2,
    name: "AI Study Assistant",
    domain: "AI / Education",
    status: "Active",
    description:
      "An AI-powered study assistant that helps students create personalized learning plans and improve productivity.",
    technologies: ["React", "Node.js", "Python", "ML"],
    members: 3,
    createdAt: "2026-08-20",
    progress: 72,
  },

  {
    id: 3,
    name: "Smart Healthcare Platform",
    domain: "Healthcare / AI",
    status: "Active",
    description:
      "A healthcare platform that connects patients, doctors and intelligent health services.",
    technologies: [
      "React",
      "Spring Boot",
      "PostgreSQL",
      "Python",
    ],
    members: 4,
    createdAt: "2026-08-15",
    progress: 45,
  },

  {
    id: 4,
    name: "Hackathon Team Matcher",
    domain: "Web / AI",
    status: "Completed",
    description:
      "A smart platform that helps hackathon participants discover compatible teammates.",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "AI",
    ],
    members: 4,
    createdAt: "2026-07-28",
    progress: 100,
  },
];

/* =========================================================
   MEMBERS
========================================================= */

const TEAM_MEMBERS = [
  {
    id: "sanika",
    name: "Sanika",
    role: "Project Lead",
    initial: "S",
  },
  {
    id: "priya",
    name: "Priya",
    role: "Frontend Developer",
    initial: "P",
  },
  {
    id: "rohan",
    name: "Rohan",
    role: "Backend Developer",
    initial: "R",
  },
  {
    id: "aman",
    name: "Aman",
    role: "ML Developer",
    initial: "A",
  },
];

/* =========================================================
   HELPER
========================================================= */

const normalizeTechnologies = (technologies) => {
  if (Array.isArray(technologies)) {
    return technologies;
  }

  if (typeof technologies === "string") {
    return technologies
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

/* =========================================================
   COMPONENT
========================================================= */

function Projects() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);

  const [searchTerm, setSearchTerm] = useState("");

  const [filter, setFilter] = useState("All");

  const [selectedProject, setSelectedProject] =
    useState(null);

  const [showAddTask, setShowAddTask] =
    useState(false);

  const [showCreateProject, setShowCreateProject] =
    useState(false);

  const [openMenu, setOpenMenu] =
    useState(null);

  /* =======================================================
     TASKS
  ======================================================= */

  const [tasks, setTasks] = useState(() => {
    try {
      const saved =
        localStorage.getItem(
          "hackathonBuddyTasks"
        );

      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 101,
              projectId: 2,
              title: "Design login screen",
              description:
                "Create the login UI and responsive layout.",
              assignedTo: "Priya",
              priority: "High",
              status: "Completed",
            },
            {
              id: 102,
              projectId: 2,
              title: "Build authentication API",
              description:
                "Implement authentication API and validation.",
              assignedTo: "Rohan",
              priority: "High",
              status: "In Progress",
            },
            {
              id: 103,
              projectId: 2,
              title: "Create recommendation model",
              description:
                "Develop the initial teammate recommendation model.",
              assignedTo: "Aman",
              priority: "Medium",
              status: "To Do",
            },
          ];
    } catch {
      return [];
    }
  });

  /* =======================================================
     NEW TASK
  ======================================================= */

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
  });

  /* =======================================================
     NEW PROJECT
  ======================================================= */

  const [newProject, setNewProject] = useState({
    name: "",
    domain: "",
    description: "",
    technologies: "",
  });

  /* =======================================================
     SAVE TASKS
  ======================================================= */

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);

    localStorage.setItem(
      "hackathonBuddyTasks",
      JSON.stringify(updatedTasks)
    );
  };

  /* =======================================================
     FILTER PROJECTS
  ======================================================= */

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const search =
        searchTerm.toLowerCase().trim();

      const technologies =
        normalizeTechnologies(
          project.technologies
        );

      const searchableText = [
        project.name,
        project.domain,
        project.description,
        ...technologies,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !search ||
        searchableText.includes(search);

      const matchesFilter =
        filter === "All" ||
        project.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [projects, searchTerm, filter]);

  /* =======================================================
     SELECTED PROJECT TASKS
  ======================================================= */

  const projectTasks = selectedProject
    ? tasks.filter(
        (task) =>
          task.projectId ===
          selectedProject.id
      )
    : [];

  const completedTasks =
    projectTasks.filter(
      (task) =>
        task.status === "Completed"
    ).length;

  const taskProgress =
    projectTasks.length > 0
      ? Math.round(
          (completedTasks /
            projectTasks.length) *
            100
        )
      : 0;

  /* =======================================================
     ADD TASK
  ======================================================= */

  const handleAddTask = (event) => {
    event.preventDefault();

    if (!selectedProject) {
      return;
    }

    if (!newTask.title.trim()) {
      alert("Please enter task title.");
      return;
    }

    if (!newTask.assignedTo) {
      alert(
        "Please select a team member."
      );
      return;
    }

    const task = {
      id: Date.now(),

      projectId: selectedProject.id,

      title: newTask.title.trim(),

      description:
        newTask.description.trim(),

      assignedTo: newTask.assignedTo,

      priority: newTask.priority,

      status: "To Do",
    };

    saveTasks([
      ...tasks,
      task,
    ]);

    setNewTask({
      title: "",
      description: "",
      assignedTo: "",
      priority: "Medium",
    });

    setShowAddTask(false);
  };

  /* =======================================================
     UPDATE TASK STATUS
  ======================================================= */

  const handleTaskStatus = (
    taskId,
    status
  ) => {
    const updatedTasks =
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status,
            }
          : task
      );

    saveTasks(updatedTasks);
  };

  /* =======================================================
     DELETE TASK
  ======================================================= */

  const handleDeleteTask = (
    taskId
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this task?"
      );

    if (!confirmed) {
      return;
    }

    const updatedTasks =
      tasks.filter(
        (task) =>
          task.id !== taskId
      );

    saveTasks(updatedTasks);
  };

  /* =======================================================
     CREATE PROJECT
  ======================================================= */

  const handleCreateProject = (
    event
  ) => {
    event.preventDefault();

    if (!newProject.name.trim()) {
      alert(
        "Please enter project name."
      );
      return;
    }

    const project = {
      id: Date.now(),

      name:
        newProject.name.trim(),

      domain:
        newProject.domain.trim() ||
        "General",

      status: "Active",

      description:
        newProject.description.trim() ||
        "New HackathonBuddy project.",

      technologies:
        newProject.technologies
          .split(",")
          .map((item) =>
            item.trim()
          )
          .filter(Boolean),

      members: 1,

      createdAt:
        new Date()
          .toISOString()
          .split("T")[0],

      progress: 0,
    };

    setProjects([
      project,
      ...projects,
    ]);

    setNewProject({
      name: "",
      domain: "",
      description: "",
      technologies: "",
    });

    setShowCreateProject(false);
  };

  /* =======================================================
     DELETE PROJECT
  ======================================================= */

  const handleDeleteProject = (
    projectId
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this project?"
      );

    if (!confirmed) {
      return;
    }

    setProjects(
      projects.filter(
        (project) =>
          project.id !==
          projectId
      )
    );

    setTasks(
      tasks.filter(
        (task) =>
          task.projectId !==
          projectId
      )
    );

    setOpenMenu(null);
  };

  /* =======================================================
     GET INITIAL
  ======================================================= */

  const getInitial = (name) => {
    return (
      name?.charAt(0)
        ?.toUpperCase() || "?"
    );
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="projects-page">

      {/* ===================================================
          PAGE HEADER
      =================================================== */}

      <div className="projects-header">

        <div>
          <span className="page-eyebrow">
            WORKSPACE
          </span>

          <h1>
            Projects
          </h1>

          <p>
            Build, manage and track your
            hackathon projects.
          </p>
        </div>

        <button
          className="create-project-button"
          onClick={() =>
            setShowCreateProject(true)
          }
        >
          <Plus size={20} />
          CREATE PROJECT
        </button>

      </div>


      {/* ===================================================
          SEARCH + FILTER
      =================================================== */}

      <div className="projects-toolbar">

        <div className="project-search">

          <Search size={21} />

          <input
            type="text"
            placeholder="Search projects, domains, technologies..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(
                event.target.value
              )
            }
          />

        </div>


        <div className="project-filters">

          {[
            "All",
            "Active",
            "Completed",
          ].map((item) => (
            <button
              key={item}
              className={
                filter === item
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() =>
                setFilter(item)
              }
            >
              {item}
            </button>
          ))}

        </div>

      </div>


      {/* ===================================================
          RESULT COUNT
      =================================================== */}

      <div className="project-result-count">
        <strong>
          {filteredProjects.length}
        </strong>{" "}
        projects found
      </div>


      {/* ===================================================
          PROJECT CARDS
      =================================================== */}

      {filteredProjects.length === 0 ? (
        <div className="no-projects">

          <FolderKanban
            size={50}
          />

          <h3>
            No projects found
          </h3>

          <p>
            Try changing your search
            or create a new project.
          </p>

        </div>
      ) : (
        <div className="projects-grid">

          {filteredProjects.map(
            (project) => {

              const technologies =
                normalizeTechnologies(
                  project.technologies
                );

              return (
                <div
                  className="project-card"
                  key={project.id}
                >

                  {/* CARD TOP */}

                  <div className="project-card-top">

                    <div className="project-icon">
                      <Bot size={30} />
                    </div>

                    <div className="project-menu-wrapper">

                      <button
                        className="project-menu-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu ===
                              project.id
                              ? null
                              : project.id
                          )
                        }
                      >
                        <MoreVertical
                          size={21}
                        />
                      </button>

                      {openMenu ===
                        project.id && (
                        <div className="project-menu">

                          <button
                            onClick={() => {
                              setSelectedProject(
                                project
                              );
                              setOpenMenu(
                                null
                              );
                            }}
                          >
                            Open Project
                          </button>

                          <button
                            className="danger-menu"
                            onClick={() =>
                              handleDeleteProject(
                                project.id
                              )
                            }
                          >
                            Delete Project
                          </button>

                        </div>
                      )}

                    </div>

                  </div>


                  {/* STATUS */}

                  <div className="project-status-row">

                    <span
                      className={
                        project.status ===
                        "Completed"
                          ? "project-status completed"
                          : "project-status active"
                      }
                    >
                      {project.status}
                    </span>

                    <span className="project-domain">
                      {project.domain}
                    </span>

                  </div>


                  {/* TITLE */}

                  <h2>
                    {project.name}
                  </h2>

                  <p className="project-description">
                    {project.description}
                  </p>


                  {/* TECHNOLOGIES */}

                  <div className="project-technologies">

                    {technologies.map(
                      (
                        technology,
                        index
                      ) => (
                        <span
                          key={`${technology}-${index}`}
                        >
                          {technology}
                        </span>
                      )
                    )}

                  </div>


                  {/* DIVIDER */}

                  <div className="project-divider" />


                  {/* META */}

                  <div className="project-meta">

                    <div>
                      <Users
                        size={19}
                      />

                      <span>
                        {project.members}{" "}
                        Members
                      </span>
                    </div>

                    <div>
                      <CalendarDays
                        size={18}
                      />

                      <span>
                        {project.createdAt}
                      </span>
                    </div>

                  </div>


                  {/* PROGRESS */}

                  <div className="project-progress-header">

                    <span>
                      Project Progress
                    </span>

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


                  {/* OPEN PROJECT */}

                  <button
                    className="open-project-button"
                    onClick={() =>
                      setSelectedProject(
                        project
                      )
                    }
                  >
                    OPEN PROJECT

                    <ArrowRight
                      size={19}
                    />

                  </button>

                </div>
              );
            }
          )}

        </div>
      )}


      {/* ===================================================
          PROJECT WORKSPACE MODAL
      =================================================== */}

      {selectedProject && (
        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedProject(null)
          }
        >

          <div
            className="project-workspace-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* WORKSPACE HEADER */}

            <div className="workspace-header">

              <div className="workspace-title-area">

                <div className="workspace-project-icon">
                  <Bot size={34} />
                </div>

                <div>

                  <div className="workspace-meta">

                    <span
                      className={
                        selectedProject.status ===
                        "Completed"
                          ? "status-badge completed"
                          : "status-badge active"
                      }
                    >
                      {
                        selectedProject.status
                      }
                    </span>

                    <span className="workspace-domain">
                      {
                        selectedProject.domain
                      }
                    </span>

                  </div>

                  <h2>
                    {
                      selectedProject.name
                    }
                  </h2>

                  <p>
                    {
                      selectedProject.description
                    }
                  </p>

                </div>

              </div>

              <button
                className="workspace-close"
                onClick={() =>
                  setSelectedProject(
                    null
                  )
                }
              >
                <X size={22} />
              </button>

            </div>


            {/* OVERVIEW */}

            <div className="workspace-overview">

              <div className="overview-box">

                <span className="overview-label">
                  PROJECT PROGRESS
                </span>

                <div className="overview-value-row">

                  <strong>
                    {
                      selectedProject.progress
                    }
                    %
                  </strong>

                  <span>
                    Overall Progress
                  </span>

                </div>

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{
                      width: `${selectedProject.progress}%`,
                    }}
                  />

                </div>

              </div>


              <div className="overview-box">

                <span className="overview-label">
                  TASK PROGRESS
                </span>

                <div className="overview-value-row">

                  <strong>
                    {taskProgress}%
                  </strong>

                  <span>
                    {completedTasks} /{" "}
                    {
                      projectTasks.length
                    } completed
                  </span>

                </div>

                <div className="progress-bar">

                  <div
                    className="task-progress-fill"
                    style={{
                      width: `${taskProgress}%`,
                    }}
                  />

                </div>

              </div>


              <div className="overview-box">

                <span className="overview-label">
                  TEAM
                </span>

                <div className="overview-big-number">
                  {
                    selectedProject.members
                  }
                </div>

                <span className="overview-small">
                  Members
                </span>

              </div>

            </div>


            {/* WORKSPACE CONTENT */}

            <div className="workspace-content">

              {/* LEFT */}

              <div className="workspace-left">

                {/* MEMBERS */}

                <div className="workspace-section">

                  <div className="section-heading">

                    <div>

                      <span className="section-eyebrow">
                        TEAM
                      </span>

                      <h3>
                        Assigned Members
                      </h3>

                    </div>

                    <span className="member-count">
                      {
                        selectedProject.members
                      }{" "}
                      Members
                    </span>

                  </div>


                  <div className="workspace-members">

                    {TEAM_MEMBERS.slice(
                      0,
                      selectedProject.members
                    ).map(
                      (
                        member,
                        index
                      ) => (
                        <div
                          className="workspace-member"
                          key={
                            member.id
                          }
                        >

                          <div
                            className={`member-avatar member-color-${index}`}
                          >
                            {
                              member.initial
                            }
                          </div>

                          <div className="member-details">

                            <strong>
                              {
                                member.name
                              }
                            </strong>

                            <span>
                              {
                                member.role
                              }
                            </span>

                          </div>

                        </div>
                      )
                    )}

                  </div>

                </div>


                {/* TECHNOLOGIES */}

                <div className="workspace-section">

                  <div className="section-heading">

                    <div>

                      <span className="section-eyebrow">
                        STACK
                      </span>

                      <h3>
                        Technologies
                      </h3>

                    </div>

                  </div>

                  <div className="workspace-technologies">

                    {normalizeTechnologies(
                      selectedProject.technologies
                    ).map(
                      (
                        technology,
                        index
                      ) => (
                        <span
                          className="workspace-tech-tag"
                          key={`${technology}-${index}`}
                        >
                          {technology}
                        </span>
                      )
                    )}

                  </div>

                </div>

              </div>


              {/* RIGHT TASKS */}

              <div className="workspace-right">

                <div className="tasks-header">

                  <div>

                    <span className="section-eyebrow">
                      WORK MANAGEMENT
                    </span>

                    <h3>
                      Project Tasks
                    </h3>

                  </div>

                  <button
                    className="add-task-button"
                    onClick={() =>
                      setShowAddTask(
                        true
                      )
                    }
                  >
                    <Plus size={18} />
                    ADD TASK
                  </button>

                </div>


                {/* TASK LIST */}

                <div className="task-list">

                  {projectTasks.length ===
                  0 ? (
                    <div className="empty-tasks">

                      <FolderKanban
                        size={40}
                      />

                      <h4>
                        No tasks yet
                      </h4>

                      <p>
                        Add tasks and
                        assign them to
                        your team members.
                      </p>

                      <button
                        className="empty-add-task"
                        onClick={() =>
                          setShowAddTask(
                            true
                          )
                        }
                      >
                        <Plus size={18} />
                        ADD FIRST TASK
                      </button>

                    </div>
                  ) : (
                    projectTasks.map(
                      (task) => (
                        <div
                          className="task-card"
                          key={
                            task.id
                          }
                        >

                          <div className="task-main">

                            <div
                              className={`task-status-icon ${task.status
                                .toLowerCase()
                                .replace(
                                  " ",
                                  "-"
                                )}`}
                            >
                              {task.status ===
                              "Completed" ? (
                                <CheckCircle2
                                  size={
                                    18
                                  }
                                />
                              ) : task.status ===
                                "In Progress" ? (
                                <Clock3
                                  size={
                                    18
                                  }
                                />
                              ) : (
                                <Circle
                                  size={
                                    18
                                  }
                                />
                              )}
                            </div>


                            <div className="task-details">

                              <div className="task-title-row">

                                <h4>
                                  {
                                    task.title
                                  }
                                </h4>

                                <span
                                  className={`priority-badge ${task.priority.toLowerCase()}`}
                                >
                                  {
                                    task.priority
                                  }
                                </span>

                              </div>

                              {task.description && (
                                <p>
                                  {
                                    task.description
                                  }
                                </p>
                              )}

                              <div className="task-assignment">

                                <div className="mini-avatar">
                                  {getInitial(
                                    task.assignedTo
                                  )}
                                </div>

                                <span>
                                  Assigned to{" "}
                                  <strong>
                                    {
                                      task.assignedTo
                                    }
                                  </strong>
                                </span>

                              </div>

                            </div>

                          </div>


                          <div className="task-actions">

                            <select
                              value={
                                task.status
                              }
                              onChange={(
                                event
                              ) =>
                                handleTaskStatus(
                                  task.id,
                                  event
                                    .target
                                    .value
                                )
                              }
                            >
                              <option>
                                To Do
                              </option>

                              <option>
                                In Progress
                              </option>

                              <option>
                                Completed
                              </option>

                            </select>

                            <button
                              className="delete-task-button"
                              onClick={() =>
                                handleDeleteTask(
                                  task.id
                                )
                              }
                            >
                              <Trash2
                                size={
                                  17
                                }
                              />
                            </button>

                          </div>

                        </div>
                      )
                    )
                  )}

                </div>

              </div>

            </div>


            {/* =================================================
                ADD TASK MODAL
            ================================================= */}

            {showAddTask && (
              <div
                className="add-task-overlay"
                onClick={() =>
                  setShowAddTask(
                    false
                  )
                }
              >

                <div
                  className="add-task-modal"
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                >

                  <div className="add-task-header">

                    <div>

                      <span>
                        PROJECT TASK
                      </span>

                      <h3>
                        Add New Task
                      </h3>

                    </div>

                    <button
                      onClick={() =>
                        setShowAddTask(
                          false
                        )
                      }
                    >
                      <X size={20} />
                    </button>

                  </div>


                  <form
                    onSubmit={
                      handleAddTask
                    }
                  >

                    <div className="task-form-group">

                      <label>
                        TASK TITLE
                      </label>

                      <input
                        type="text"
                        placeholder="Build authentication API"
                        value={
                          newTask.title
                        }
                        onChange={(
                          event
                        ) =>
                          setNewTask({
                            ...newTask,
                            title:
                              event
                                .target
                                .value,
                          })
                        }
                      />

                    </div>


                    <div className="task-form-group">

                      <label>
                        DESCRIPTION
                      </label>

                      <textarea
                        placeholder="Describe what needs to be completed..."
                        value={
                          newTask.description
                        }
                        onChange={(
                          event
                        ) =>
                          setNewTask({
                            ...newTask,
                            description:
                              event
                                .target
                                .value,
                          })
                        }
                      />

                    </div>


                    <div className="task-form-row">

                      <div className="task-form-group">

                        <label>
                          ASSIGN MEMBER
                        </label>

                        <select
                          value={
                            newTask.assignedTo
                          }
                          onChange={(
                            event
                          ) =>
                            setNewTask({
                              ...newTask,
                              assignedTo:
                                event
                                  .target
                                  .value,
                            })
                          }
                        >

                          <option value="">
                            Select member
                          </option>

                          {TEAM_MEMBERS.map(
                            (
                              member
                            ) => (
                              <option
                                value={
                                  member.name
                                }
                                key={
                                  member.id
                                }
                              >
                                {
                                  member.name
                                }{" "}
                                -{" "}
                                {
                                  member.role
                                }
                              </option>
                            )
                          )}

                        </select>

                      </div>


                      <div className="task-form-group">

                        <label>
                          PRIORITY
                        </label>

                        <select
                          value={
                            newTask.priority
                          }
                          onChange={(
                            event
                          ) =>
                            setNewTask({
                              ...newTask,
                              priority:
                                event
                                  .target
                                  .value,
                            })
                          }
                        >

                          <option>
                            Low
                          </option>

                          <option>
                            Medium
                          </option>

                          <option>
                            High
                          </option>

                        </select>

                      </div>

                    </div>


                    <div className="task-form-actions">

                      <button
                        type="button"
                        className="cancel-task-button"
                        onClick={() =>
                          setShowAddTask(
                            false
                          )
                        }
                      >
                        CANCEL
                      </button>

                      <button
                        type="submit"
                        className="save-task-button"
                      >
                        <Plus size={18} />
                        ADD TASK
                      </button>

                    </div>

                  </form>

                </div>

              </div>
            )}

          </div>

        </div>
      )}


      {/* ===================================================
          CREATE PROJECT MODAL
      =================================================== */}

      {showCreateProject && (
        <div
          className="modal-overlay"
          onClick={() =>
            setShowCreateProject(
              false
            )
          }
        >

          <div
            className="create-project-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="add-task-header">

              <div>

                <span>
                  WORKSPACE
                </span>

                <h3>
                  Create Project
                </h3>

              </div>

              <button
                onClick={() =>
                  setShowCreateProject(
                    false
                  )
                }
              >
                <X size={20} />
              </button>

            </div>


            <form
              onSubmit={
                handleCreateProject
              }
            >

              <div className="task-form-group">

                <label>
                  PROJECT NAME
                </label>

                <input
                  type="text"
                  placeholder="AI Study Assistant"
                  value={
                    newProject.name
                  }
                  onChange={(event) =>
                    setNewProject({
                      ...newProject,
                      name:
                        event.target
                          .value,
                    })
                  }
                />

              </div>


              <div className="task-form-group">

                <label>
                  PROJECT DOMAIN
                </label>

                <input
                  type="text"
                  placeholder="AI / Education"
                  value={
                    newProject.domain
                  }
                  onChange={(event) =>
                    setNewProject({
                      ...newProject,
                      domain:
                        event.target
                          .value,
                    })
                  }
                />

              </div>


              <div className="task-form-group">

                <label>
                  DESCRIPTION
                </label>

                <textarea
                  placeholder="Describe your project..."
                  value={
                    newProject.description
                  }
                  onChange={(event) =>
                    setNewProject({
                      ...newProject,
                      description:
                        event.target
                          .value,
                    })
                  }
                />

              </div>


              <div className="task-form-group">

                <label>
                  TECHNOLOGIES
                </label>

                <input
                  type="text"
                  placeholder="React, Node.js, PostgreSQL"
                  value={
                    newProject.technologies
                  }
                  onChange={(event) =>
                    setNewProject({
                      ...newProject,
                      technologies:
                        event.target
                          .value,
                    })
                  }
                />

              </div>


              <div className="task-form-actions">

                <button
                  type="button"
                  className="cancel-task-button"
                  onClick={() =>
                    setShowCreateProject(
                      false
                    )
                  }
                >
                  CANCEL
                </button>

                <button
                  type="submit"
                  className="save-task-button"
                >
                  <Plus size={18} />
                  CREATE PROJECT
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Projects;