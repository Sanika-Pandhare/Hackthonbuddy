import React, { useMemo, useState } from "react";
import "./Notifications.css";

const initialNotifications = [
  {
    id: 1,
    type: "hackathon",
    icon: "🏆",
    title: "Hackathon registration confirmed",
    message:
      "You successfully registered for AI Innovation Challenge 2026.",
    time: "10 minutes ago",
    date: "Today",
    unread: true,
    action: "View Hackathon",
  },
  {
    id: 2,
    type: "team",
    icon: "👥",
    title: "New teammate match found",
    message:
      "Aman Khan matches 92% with your required project skills.",
    time: "1 hour ago",
    date: "Today",
    unread: true,
    action: "View Match",
  },
  {
    id: 3,
    type: "project",
    icon: "🚀",
    title: "Project invitation received",
    message:
      "Rohan Mehta invited you to join the AI Study Assistant project.",
    time: "2 hours ago",
    date: "Today",
    unread: true,
    action: "View Project",
  },
  {
    id: 4,
    type: "message",
    icon: "💬",
    title: "New message from Priya Singh",
    message:
      "I pushed the updated dashboard components. Please review them.",
    time: "3 hours ago",
    date: "Today",
    unread: false,
    action: "Open Chat",
  },
  {
    id: 5,
    type: "skill",
    icon: "💡",
    title: "Skill gap detected",
    message:
      "Your project team may need Docker and Kubernetes skills.",
    time: "5 hours ago",
    date: "Today",
    unread: false,
    action: "Analyze Skills",
  },
  {
    id: 6,
    type: "hackathon",
    icon: "📅",
    title: "Hackathon starts soon",
    message:
      "Smart City Hackathon starts in 3 days. Make sure your team is ready.",
    time: "Yesterday",
    date: "Yesterday",
    unread: false,
    action: "View Details",
  },
  {
    id: 7,
    type: "team",
    icon: "🤝",
    title: "Team invitation accepted",
    message:
      "Priya Singh accepted your invitation to join your team.",
    time: "Yesterday",
    date: "Yesterday",
    unread: false,
    action: "View Team",
  },
  {
    id: 8,
    type: "project",
    icon: "📊",
    title: "Project progress updated",
    message:
      "AI Study Assistant project progress has reached 72%.",
    time: "2 days ago",
    date: "Earlier",
    unread: false,
    action: "Open Project",
  },
  {
    id: 9,
    type: "system",
    icon: "⚙️",
    title: "Profile updated successfully",
    message:
      "Your profile information and skills were successfully updated.",
    time: "3 days ago",
    date: "Earlier",
    unread: false,
    action: "View Profile",
  },
];

const tabs = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "hackathon", label: "Hackathons" },
  { id: "team", label: "Teams" },
  { id: "project", label: "Projects" },
];

function Notifications() {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        notification.title.toLowerCase().includes(searchText) ||
        notification.message.toLowerCase().includes(searchText);

      let matchesTab = true;

      if (activeTab === "unread") {
        matchesTab = notification.unread;
      } else if (
        ["hackathon", "team", "project"].includes(activeTab)
      ) {
        matchesTab = notification.type === activeTab;
      }

      return matchesSearch && matchesTab;
    });
  }, [notifications, activeTab, search]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);

    console.log(
      `Opening action: ${notification.action}`
    );

    /*
      Later connect these actions with React Router:

      View Hackathon -> /hackathons
      View Match     -> /teams
      View Project   -> /projects
      Open Chat      -> /chat
      View Team      -> /teams
      Analyze Skills -> /ai-hub
    */
  };

  const groupedNotifications = filteredNotifications.reduce(
    (groups, notification) => {
      if (!groups[notification.date]) {
        groups[notification.date] = [];
      }

      groups[notification.date].push(notification);

      return groups;
    },
    {}
  );

  return (
    <div className="notifications-page">
      {/* ============================================
          PAGE HEADER
      ============================================ */}

      <div className="notifications-header">
        <div>
          <div className="notifications-kicker">
            ACTIVITY CENTER
          </div>

          <h1>Notifications</h1>

          <p>
            Stay updated with your hackathons, teams,
            projects and activity.
          </p>
        </div>

        <div className="notification-header-actions">
          <button
            className="secondary-action"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            ✓ Mark all as read
          </button>

          <button
            className="danger-action"
            onClick={clearAll}
            disabled={notifications.length === 0}
          >
            Clear all
          </button>
        </div>
      </div>

      {/* ============================================
          SUMMARY CARDS
      ============================================ */}

      <div className="notification-summary">
        <div className="summary-card">
          <div className="summary-icon purple">
            🔔
          </div>

          <div>
            <strong>{notifications.length}</strong>
            <span>Total notifications</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon blue">
            ●
          </div>

          <div>
            <strong>{unreadCount}</strong>
            <span>Unread notifications</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon green">
            ✓
          </div>

          <div>
            <strong>
              {notifications.length - unreadCount}
            </strong>
            <span>Already viewed</span>
          </div>
        </div>
      </div>

      {/* ============================================
          MAIN NOTIFICATION CARD
      ============================================ */}

      <section className="notifications-container">
        {/* Search + tabs */}

        <div className="notification-toolbar">
          <div className="notification-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search notifications..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="clear-search"
              >
                ×
              </button>
            )}
          </div>

          <div className="notification-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={
                  activeTab === tab.id ? "active" : ""
                }
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}

                {tab.id === "unread" && unreadCount > 0 && (
                  <span>{unreadCount}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notification list */}

        <div className="notification-list">
          {Object.keys(groupedNotifications).length === 0 ? (
            <div className="empty-notifications">
              <div className="empty-icon">
                🔔
              </div>

              <h3>No notifications found</h3>

              <p>
                {search
                  ? "Try changing your search."
                  : "You're all caught up."}
              </p>

              {search && (
                <button
                  onClick={() => setSearch("")}
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            Object.entries(groupedNotifications).map(
              ([date, items]) => (
                <div
                  className="notification-group"
                  key={date}
                >
                  <div className="notification-date">
                    {date}
                  </div>

                  {items.map((notification) => (
                    <article
                      className={`notification-item ${
                        notification.unread
                          ? "unread"
                          : ""
                      }`}
                      key={notification.id}
                      onClick={() =>
                        handleNotificationClick(
                          notification
                        )
                      }
                    >
                      {/* Icon */}

                      <div
                        className={`notification-icon ${notification.type}`}
                      >
                        {notification.icon}
                      </div>

                      {/* Content */}

                      <div className="notification-content">
                        <div className="notification-title-row">
                          <h3>
                            {notification.title}
                          </h3>

                          {notification.unread && (
                            <span className="unread-dot" />
                          )}
                        </div>

                        <p>
                          {notification.message}
                        </p>

                        <div className="notification-meta">
                          <span>
                            {notification.time}
                          </span>

                          <span className="notification-type">
                            {notification.type}
                          </span>
                        </div>
                      </div>

                      {/* Action */}

                      <div className="notification-actions">
                        <button
                          className="notification-action"
                          onClick={(event) => {
                            event.stopPropagation();

                            handleNotificationClick(
                              notification
                            );
                          }}
                        >
                          {notification.action}
                          <span>→</span>
                        </button>

                        {notification.unread && (
                          <button
                            className="mark-read"
                            title="Mark as read"
                            onClick={(event) => {
                              event.stopPropagation();

                              markAsRead(
                                notification.id
                              );
                            }}
                          >
                            ✓
                          </button>
                        )}

                        <button
                          className="delete-notification"
                          title="Delete"
                          onClick={(event) => {
                            event.stopPropagation();

                            deleteNotification(
                              notification.id
                            );
                          }}
                        >
                          ×
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )
            )
          )}
        </div>
      </section>
    </div>
  );
}

export default Notifications;