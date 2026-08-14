

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AVATAR_OPTIONS = ["🌱", "🌻", "🌵", "🍀", "🌷", "🪴", "🌸", "🌳", "🦔", "🐝", "🦋", "🐌"];

function ProfilePage() {
  const navigate = useNavigate();

  // Get the saved user from localStorage
  const savedUser = JSON.parse(localStorage.getItem("hg_user")) || {};

  const [user, setUser] = useState(savedUser);

  const [darkMode, setDarkMode] = useState(
    savedUser.darkMode || false
  );

  const [reminders, setReminders] = useState(
    savedUser.reminders ?? true
  );

  // Edit profile state 
  const [isEditing, setIsEditing] = useState(false);
  const [nameDraft, setNameDraft] = useState(savedUser.name || "");
  const [emailDraft, setEmailDraft] = useState(savedUser.email || "");
  const [avatarDraft, setAvatarDraft] = useState(savedUser.avatar || "");

  // Update user information
  const updateUser = (changes) => {
    const updatedUser = {
      ...user,
      ...changes,
    };

    setUser(updatedUser);
    localStorage.setItem("hg_user", JSON.stringify(updatedUser));
  };

  const startEditing = () => {
    setNameDraft(user.name || "");
    setEmailDraft(user.email || "");
    setAvatarDraft(user.avatar || "");
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const saveProfile = () => {
    updateUser({
      name: nameDraft.trim() || "Garden Keeper",
      email: emailDraft.trim(),
      avatar: avatarDraft,
    });
    setIsEditing(false);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newValue = !darkMode;

    setDarkMode(newValue);

    updateUser({
      darkMode: newValue,
    });
  };

  // Toggle reminders
  const toggleReminders = () => {
    const newValue = !reminders;

    setReminders(newValue);

    updateUser({
      reminders: newValue,
    });
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("hg_loggedIn");
    navigate("/login");
  };

  // Profile data
  const profile = {
    name: user.name || "Garden Keeper",
    email: user.email || "No email added",
    avatar: user.avatar || "",
    habit: user.currentHabit || "Drink Water",
    streak: user.streak || 0,
    checkIns: user.checkIns || 0,
    growth: user.plantGrowth || 0,
    points: user.points || 0,
  };

  // Achievements
  const achievements = [
    {
      icon: "🌱",
      title: "First Seed",
      description: "Complete your first habit check-in.",
      unlocked: profile.checkIns >= 1,
    },
    {
      icon: "🔥",
      title: "7-Day Streak",
      description: "Maintain a 7-day habit streak.",
      unlocked: profile.streak >= 7,
    },
    {
      icon: "🌿",
      title: "Growing Strong",
      description: "Reach 50% plant growth.",
      unlocked: profile.growth >= 50,
    },
  ];

  // Plant changes according to growth
  const getPlant = () => {
    if (profile.growth >= 75) return "🌳";
    if (profile.growth >= 50) return "🌿";
    if (profile.growth >= 25) return "🌱";

    return "🌰";
  };

  return (
    <div className={`profile-page ${darkMode ? "dark" : ""}`}>

      <style>{`
        .profile-page {
          min-height: 100vh;
          padding: 40px 20px;
          background: #f5f8f3;
          color: #29432c;
          font-family: Arial, sans-serif;
        }

        .profile-container {
          width: 100%;
          max-width: 1000px;
          margin: auto;
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 25px;
          margin-bottom: 30px;
          background: white;
          border: 1px solid #e1eadf;
          border-radius: 20px;
        }

        .profile-header-info {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .profile-avatar {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #d8ead2;
          color: #356b35;
          font-size: 32px;
          font-weight: bold;
          flex-shrink: 0;
        }

        .profile-header h1 {
          margin: 0;
          font-size: 28px;
        }

        .profile-header p {
          margin: 7px 0 0;
          color: #718071;
        }

        .edit-btn {
          padding: 10px 18px;
          border: 1px solid #70a970;
          border-radius: 12px;
          background: white;
          color: #356b35;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
        }

        .edit-btn:hover {
          background: #eaf3e8;
        }

        /* ---- Edit mode ---- */

        .edit-form {
          width: 100%;
        }

        .edit-field {
          margin-bottom: 14px;
        }

        .edit-field label {
          display: block;
          margin-bottom: 6px;
          font-size: 13px;
          font-weight: bold;
          color: #718071;
        }

        .edit-field input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #e1eadf;
          border-radius: 10px;
          font-size: 14px;
          box-sizing: border-box;
        }

        .avatar-picker {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 6px;
        }

        .avatar-option {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          border-radius: 50%;
          background: #f0f5ee;
          border: 2px solid transparent;
          cursor: pointer;
        }

        .avatar-option.selected {
          border-color: #70a970;
          background: #d8ead2;
        }

        .edit-actions {
          display: flex;
          gap: 10px;
          margin-top: 16px;
        }

        .save-btn,
        .cancel-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
        }

        .save-btn {
          background: #70a970;
          color: white;
        }

        .cancel-btn {
          background: #eceee9;
          color: #444;
        }

        .section {
          margin-bottom: 30px;
        }

        .section-title {
          margin-bottom: 15px;
          font-size: 21px;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }

        .stat {
          padding: 20px;
          background: white;
          border: 1px solid #e1eadf;
          border-radius: 16px;
        }

        .stat-icon {
          font-size: 27px;
        }

        .stat-number {
          margin: 10px 0 3px;
          font-size: 24px;
          font-weight: bold;
        }

        .stat-label {
          margin: 0;
          color: #718071;
          font-size: 13px;
        }

        .habit-card {
          display: flex;
          align-items: center;
          gap: 25px;
          padding: 25px;
          background: white;
          border: 1px solid #e1eadf;
          border-radius: 18px;
        }

        .plant {
          font-size: 70px;
        }

        .habit-content {
          flex: 1;
        }

        .habit-content h3 {
          margin: 0 0 6px;
          font-size: 20px;
        }

        .habit-content p {
          margin: 0 0 15px;
          color: #718071;
        }

        .progress-background {
          width: 100%;
          height: 10px;
          overflow: hidden;
          border-radius: 20px;
          background: #e4e9e3;
        }

        .progress {
          height: 100%;
          border-radius: 20px;
          background: #70a970;
        }

        .progress-text {
          display: block;
          margin-top: 7px;
          color: #718071;
          font-size: 12px;
        }

        .achievements {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }

        .achievement {
          display: flex;
          gap: 15px;
          padding: 20px;
          background: white;
          border: 1px solid #e1eadf;
          border-radius: 16px;
        }

        .achievement.locked {
          opacity: 0.45;
        }

        .achievement-icon {
          font-size: 32px;
        }

        .achievement h3 {
          margin: 0;
          font-size: 16px;
        }

        .achievement p {
          margin: 7px 0;
          color: #718071;
          font-size: 13px;
        }

        .achievement-status {
          font-size: 12px;
        }

        .preferences {
          overflow: hidden;
          background: white;
          border: 1px solid #e1eadf;
          border-radius: 16px;
        }

        .preference {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          border-bottom: 1px solid #e1eadf;
        }

        .preference:last-child {
          border-bottom: none;
        }

        .preference h3 {
          margin: 0;
          font-size: 16px;
        }

        .preference p {
          margin: 5px 0 0;
          color: #718071;
          font-size: 13px;
        }

        .toggle {
          width: 50px;
          height: 28px;
          padding: 3px;
          border: none;
          border-radius: 20px;
          background: #c8d0c7;
          cursor: pointer;
        }

        .toggle-circle {
          display: block;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: white;
          transition: 0.2s;
        }

        .toggle.active {
          background: #70a970;
        }

        .toggle.active .toggle-circle {
          transform: translateX(22px);
        }

        .logout {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 12px;
          background: #d96c6c;
          color: white;
          font-size: 15px;
          cursor: pointer;
        }

        /* DARK MODE */

        .profile-page.dark {
          background: #172118;
          color: #e6f1e3;
        }

        .dark .profile-header,
        .dark .stat,
        .dark .habit-card,
        .dark .achievement,
        .dark .preferences {
          background: #223024;
          border-color: #344635;
        }

        .dark .profile-header p,
        .dark .stat-label,
        .dark .habit-content p,
        .dark .progress-text,
        .dark .achievement p,
        .dark .preference p {
          color: #aab9a8;
        }

        .dark .preference {
          border-color: #344635;
        }

        .dark .profile-avatar {
          background: #314b32;
          color: #bde0b8;
        }

        .dark .edit-btn {
          background: #223024;
          color: #bde0b8;
        }

        .dark .edit-field input {
          background: #172118;
          border-color: #344635;
          color: #e6f1e3;
        }

        .dark .edit-field label {
          color: #aab9a8;
        }

        .dark .avatar-option {
          background: #223024;
        }

        .dark .avatar-option.selected {
          background: #314b32;
        }

        .dark .cancel-btn {
          background: #223024;
          color: #e6f1e3;
        }

        @media (max-width: 750px) {
          .stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .achievements {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 500px) {
          .profile-page {
            padding: 25px 15px;
          }

          .profile-header {
            padding: 20px;
            flex-direction: column;
            align-items: flex-start;
          }

          .profile-avatar {
            width: 60px;
            height: 60px;
            font-size: 24px;
          }

          .profile-header h1 {
            font-size: 22px;
          }

          .stats {
            grid-template-columns: 1fr;
          }

          .habit-card {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      <div className="profile-container">

        

        <section className="profile-header">
          {isEditing ? (
            <div className="edit-form">
              <div className="edit-field">
                <label>Avatar</label>
                <div className="avatar-picker">
                  {AVATAR_OPTIONS.map((emoji) => (
                    <button
                      type="button"
                      key={emoji}
                      className={`avatar-option ${avatarDraft === emoji ? "selected" : ""}`}
                      onClick={() => setAvatarDraft(emoji)}
                      aria-label={`Choose avatar ${emoji}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="edit-field">
                <label>Name</label>
                <input
                  type="text"
                  value={nameDraft}
                  onChange={(e) => setNameDraft(e.target.value)}
                  placeholder="Garden Keeper"
                />
              </div>

              <div className="edit-field">
                <label>Email</label>
                <input
                  type="email"
                  value={emailDraft}
                  onChange={(e) => setEmailDraft(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>

              <div className="edit-actions">
                <button type="button" className="save-btn" onClick={saveProfile}>
                  Save changes
                </button>
                <button type="button" className="cancel-btn" onClick={cancelEditing}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="profile-avatar">
                {profile.avatar || profile.name.charAt(0).toUpperCase()}
              </div>

              <div className="profile-header-info">
                <div>
                  <h1>{profile.name}</h1>
                  <p>{profile.email}</p>
                </div>

                <button type="button" className="edit-btn" onClick={startEditing}>
                  ✏️ Edit Profile
                </button>
              </div>
            </>
          )}
        </section>

        {/* GARDEN STATS */}
        <section className="section">
          <h2 className="section-title">My Garden 🌿</h2>

          <div className="stats">

            <div className="stat">
              <span className="stat-icon">🔥</span>
              <p className="stat-number">{profile.streak}</p>
              <p className="stat-label">Day Streak</p>
            </div>

            <div className="stat">
              <span className="stat-icon">💧</span>
              <p className="stat-number">{profile.checkIns}</p>
              <p className="stat-label">Check-ins</p>
            </div>

            <div className="stat">
              <span className="stat-icon">🌱</span>
              <p className="stat-number">{profile.growth}%</p>
              <p className="stat-label">Plant Growth</p>
            </div>

            <div className="stat">
              <span className="stat-icon">🪙</span>
              <p className="stat-number">{profile.points}</p>
              <p className="stat-label">Garden Points</p>
            </div>

          </div>
        </section>

        
        <section className="section">
          <h2 className="section-title">Current Habit 🌱</h2>

          <div className="habit-card">
            <div className="plant">
              {getPlant()}
            </div>

            <div className="habit-content">
              <h3>{profile.habit}</h3>

              <p>
                Your plant is {profile.growth}% grown.
              </p>

              <div className="progress-background">
                <div
                  className="progress"
                  style={{
                    width: `${Math.min(profile.growth, 100)}%`,
                  }}
                />
              </div>

              <span className="progress-text">
                {profile.growth}% complete
              </span>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="section">
          <h2 className="section-title">Achievements 🏆</h2>

          <div className="achievements">

            {achievements.map((achievement) => (
              <div
                key={achievement.title}
                className={`achievement ${
                  achievement.unlocked ? "" : "locked"
                }`}
              >
                <div className="achievement-icon">
                  {achievement.icon}
                </div>

                <div>
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>

                  <span className="achievement-status">
                    {achievement.unlocked
                      ? "Unlocked ✓"
                      : "Locked 🔒"}
                  </span>
                </div>
              </div>
            ))}

          </div>
        </section>

        
        <section className="section">
          <h2 className="section-title">Preferences ⚙️</h2>

          <div className="preferences">

            <div className="preference">
              <div>
                <h3>🌙 Dark Mode</h3>
                <p>Use a darker appearance for your garden.</p>
              </div>

              <button
                type="button"
                className={`toggle ${darkMode ? "active" : ""}`}
                onClick={toggleDarkMode}
              >
                <span className="toggle-circle" />
              </button>
            </div>

            <div className="preference">
              <div>
                <h3>🔔 Habit Reminders</h3>
                <p>Receive reminders to complete your habits.</p>
              </div>

              <button
                type="button"
                className={`toggle ${reminders ? "active" : ""}`}
                onClick={toggleReminders}
              >
                <span className="toggle-circle" />
              </button>
            </div>

          </div>
        </section>

        {/* LOGOUT */}
        <section className="section">
          <button
            type="button"
            className="logout"
            onClick={handleLogout}
          >
            🚪 Log Out
          </button>
        </section>

      </div>
    </div>
  );
}

export default ProfilePage;