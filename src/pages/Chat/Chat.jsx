import React, { useMemo, useState } from "react";
import "./Chat.css";

const conversations = [
  {
    id: 1,
    name: "AI Study Assistant",
    short: "AI",
    preview: "Rohan: Authentication API is ready.",
    time: "09:18 PM",
    unread: 2,
    color: "purple",
  },
  {
    id: 2,
    name: "Hackathon Team",
    short: "HT",
    preview: "Don't forget tomorrow's submission.",
    time: "08:42 PM",
    unread: 0,
    color: "blue",
  },
  {
    id: 3,
    name: "Priya Singh",
    short: "P",
    preview: "I pushed the dashboard changes.",
    time: "07:30 PM",
    unread: 1,
    color: "pink",
  },
  {
    id: 4,
    name: "Rohan Mehta",
    short: "R",
    preview: "API endpoint is working now.",
    time: "Yesterday",
    unread: 0,
    color: "navy",
  },
  {
    id: 5,
    name: "Aman Khan",
    short: "A",
    preview: "Model accuracy reached 87%.",
    time: "Yesterday",
    unread: 0,
    color: "green",
  },
];

const initialMessages = [
  {
    id: 1,
    sender: "Rohan Mehta",
    short: "R",
    type: "received",
    text: "Authentication API is ready. I have completed the login and registration endpoints.",
    time: "09:10 PM",
  },
  {
    id: 2,
    sender: "You",
    short: "S",
    type: "sent",
    text: "Great! I'll connect it with the frontend login flow.",
    time: "09:12 PM",
  },
  {
    id: 3,
    sender: "Priya Singh",
    short: "P",
    type: "received",
    text: "I pushed the updated dashboard components. Please review when you get time.",
    time: "09:15 PM",
  },
  {
    id: 4,
    sender: "Rohan Mehta",
    short: "R",
    type: "received",
    text: "Authentication API is ready.",
    time: "09:18 PM",
  },
];

const members = [
  {
    name: "Sanika Haridas Pandhare",
    role: "Full Stack Developer",
    short: "S",
    online: true,
  },
  {
    name: "Priya Singh",
    role: "UI/UX Developer",
    short: "P",
    online: true,
  },
  {
    name: "Rohan Mehta",
    role: "Backend Developer",
    short: "R",
    online: false,
  },
  {
    name: "Aman Khan",
    role: "ML Developer",
    short: "A",
    online: true,
  },
];

const files = [
  {
    name: "project-requirements.pdf",
    size: "2.4 MB",
    type: "pdf",
  },
  {
    name: "api-documentation.md",
    size: "8 KB",
    type: "code",
  },
];

function Chat() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [showMenu, setShowMenu] = useState(false);

  const currentConversation = conversations.find(
    (item) => item.id === selectedChat
  );

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) => {
      const matchesSearch =
        conversation.name.toLowerCase().includes(search.toLowerCase()) ||
        conversation.preview.toLowerCase().includes(search.toLowerCase());

      const matchesTab =
        activeTab === "All" ||
        (activeTab === "Unread" && conversation.unread > 0) ||
        activeTab === "Teams";

      return matchesSearch && matchesTab;
    });
  }, [search, activeTab]);

  const sendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    const newMessage = {
      id: Date.now(),
      sender: "You",
      short: "S",
      type: "sent",
      text: trimmedMessage,
      time: "09:20 PM",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-page">
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="chat-sidebar">
        <div className="sidebar-header">
          <div>
            <div className="section-kicker">COLLABORATION</div>
            <h1>Messages</h1>
          </div>

          <button className="new-chat-btn" title="New conversation">
            +
          </button>
        </div>

        <div className="conversation-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="chat-tabs">
          {["All", "Unread", "Teams"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="conversation-list">
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              className={`conversation-item ${
                selectedChat === conversation.id ? "selected" : ""
              }`}
              onClick={() => setSelectedChat(conversation.id)}
            >
              <div className={`conversation-avatar ${conversation.color}`}>
                {conversation.short}
                <span className="online-dot" />
              </div>

              <div className="conversation-content">
                <div className="conversation-top">
                  <strong>{conversation.name}</strong>
                  <span>{conversation.time}</span>
                </div>

                <div className="conversation-bottom">
                  <p>{conversation.preview}</p>

                  {conversation.unread > 0 && (
                    <span className="unread-count">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="sidebar-user">
          <div className="user-avatar">S</div>

          <div>
            <strong>Sanika Haridas</strong>
            <span>Online</span>
          </div>

          <span className="user-online">●</span>
        </div>
      </aside>

      {/* ================= CENTER CHAT ================= */}
      <main className="chat-main">
        {/* Header */}
        <header className="chat-header">
          <div className="chat-title-area">
            <div className="large-chat-avatar">
              {currentConversation?.short || "AI"}
              <span className="online-dot" />
            </div>

            <div>
              <h2>{currentConversation?.name || "AI Study Assistant"}</h2>
              <span>♧ 4 members</span>
            </div>
          </div>

          <div className="chat-header-actions">
            <button title="Call">☎</button>
            <button title="Video call">▣</button>
            <button title="Members">♧</button>

            <div className="more-wrapper">
              <button
                title="More"
                onClick={() => setShowMenu((prev) => !prev)}
              >
                ⋮
              </button>

              {showMenu && (
                <div className="chat-more-menu">
                  <button>Mute notifications</button>
                  <button>Search messages</button>
                  <button>Leave conversation</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Messages area */}
        <section className="messages-area">
          <div className="project-banner">
            <div className="project-banner-icon">#</div>

            <div className="project-banner-content">
              <strong>AI Study Assistant</strong>
              <span>Project collaboration channel</span>
            </div>

            <button>View Project</button>
          </div>

          <div className="today-divider">
            <span />
            <b>TODAY</b>
            <span />
          </div>

          <div className="messages-list">
            {messages.map((item) => (
              <div
                key={item.id}
                className={`message-row ${
                  item.type === "sent" ? "sent-row" : "received-row"
                }`}
              >
                {item.type === "received" && (
                  <div className="message-avatar">{item.short}</div>
                )}

                <div className="message-block">
                  <span className="message-sender">{item.sender}</span>

                  <div
                    className={`message-bubble ${
                      item.type === "sent" ? "sent-bubble" : "received-bubble"
                    }`}
                  >
                    {item.text}
                  </div>

                  <div
                    className={`message-time ${
                      item.type === "sent" ? "sent-time" : ""
                    }`}
                  >
                    {item.time}
                    {item.type === "sent" && (
                      <span className="message-check">✓✓</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom tools + composer */}
        <div className="chat-composer-wrapper">
          <div className="composer-tools">
            <button>▧ Share task</button>
            <button>&lt;/&gt; Share code</button>
            <button>▧ Share design</button>
          </div>

          <div className="composer">
            <button className="attach-btn" title="Attach file">
              ♧
            </button>

            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${currentConversation?.name || "AI Study Assistant"}...`}
              rows="1"
            />

            <button className="emoji-btn" title="Emoji">
              ☺
            </button>

            <button
              className="send-btn"
              onClick={sendMessage}
              title="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      </main>

      {/* ================= RIGHT PROJECT PANEL ================= */}
      <aside className="project-sidebar">
        <div className="project-sidebar-header">
          <span>PROJECT</span>

          <button>⋮</button>
        </div>

        <div className="project-icon">&lt;/&gt;</div>

        <h2>AI Study Assistant</h2>
        <p>Team workspace for project collaboration.</p>

        <div className="project-divider" />

        <section className="project-section">
          <div className="section-title-row">
            <h3>Team Members</h3>
            <span>4</span>
          </div>

          <div className="members-list">
            {members.map((member) => (
              <div className="member-item" key={member.name}>
                <div className="member-avatar">
                  {member.short}
                  {member.online && <span className="member-online" />}
                </div>

                <div>
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="project-divider" />

        <section className="project-section">
          <div className="section-title-row">
            <h3>Shared Files</h3>
            <button className="view-all">View all</button>
          </div>

          <div className="shared-files">
            {files.map((file) => (
              <button className="file-card" key={file.name}>
                <div className={`file-icon ${file.type}`}>
                  {file.type === "pdf" ? "▤" : "</>"}
                </div>

                <div>
                  <strong>{file.name}</strong>
                  <span>{file.size}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="project-divider" />

        <section className="project-section">
          <div className="section-title-row">
            <h3>Project Tasks</h3>
            <span>3</span>
          </div>

          <div className="task-list">
            <label className="task-item completed">
              <input type="checkbox" defaultChecked />
              <span>Setup authentication API</span>
            </label>

            <label className="task-item">
              <input type="checkbox" />
              <span>Connect frontend login flow</span>
            </label>

            <label className="task-item">
              <input type="checkbox" />
              <span>Review dashboard components</span>
            </label>
          </div>
        </section>
      </aside>
    </div>
  );
}

export default Chat;