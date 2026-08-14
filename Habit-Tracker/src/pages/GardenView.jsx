cat > src/pages/GardenView.jsx <<'EOF'
import { useState } from "react";
import { PlantHabitModal } from "../components/PlantHabitModal";
import { PixelPlant, speciesForCategory } from "../garden/plants.jsx";
import "../styles/garden.css";

const DEFAULT_HABITS = [
  {
    id: 1,
    title: "Morning Walk",
    category: "Exercise",
    progress: 40,
    streak: 3,
    completedToday: false,
  },
  {
    id: 2,
    title: "Read 20 Pages",
    category: "Reading",
    progress: 70,
    streak: 5,
    completedToday: false,
  },
  {
    id: 3,
    title: "Journal",
    category: "Journal",
    progress: 100,
    streak: 8,
    completedToday: true,
  },
  {
    id: 4,
    title: "Drink Water",
    category: "Health",
    progress: 15,
    streak: 1,
    completedToday: false,
  },
];

function stageFromProgress(progress = 0) {
  if (progress >= 95) return 5;
  if (progress >= 75) return 4;
  if (progress >= 55) return 3;
  if (progress >= 35) return 2;
  if (progress >= 15) return 1;
  return 0;
}

export default function GardenView({
  habits: habitsProp,
  userName = "Garden Keeper",
}) {
  const [habits, setHabits] = useState(habitsProp || DEFAULT_HABITS);
  const [isPlantModalOpen, setIsPlantModalOpen] = useState(false);

  const waterHabit = (id) => {
    setHabits((current) =>
      current.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completedToday: true,
              progress: Math.min(100, habit.progress + 20),
              streak: habit.completedToday
                ? habit.streak
                : habit.streak + 1,
            }
          : habit
      )
    );
  };

  const addHabit = (newHabit) => {
    setHabits((current) => [...current, newHabit]);
  };

  const completedCount = habits.filter(
    (habit) => habit.completedToday
  ).length;

  const bloomPercentage = habits.length
    ? Math.round((completedCount / habits.length) * 100)
    : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #fffaf3 0%, #f4f8ed 55%, #eef6e9 100%)",
        padding: "28px 20px 100px",
        color: "#29432c",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}
        <header
          style={{
            background: "rgba(255,255,255,0.82)",
            border: "1px solid #e1ead8",
            borderRadius: "28px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 10px 35px rgba(62,91,55,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-block",
                  background: "#e8f3df",
                  color: "#567550",
                  borderRadius: "999px",
                  padding: "6px 12px",
                  fontSize: "12px",
                  fontWeight: "700",
                  marginBottom: "10px",
                }}
              >
                🌱 MY LITTLE GARDEN
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(26px, 5vw, 40px)",
                  lineHeight: 1.1,
                  color: "#29432c",
                }}
              >
                Hi {userName}! 🌷
              </h1>

              <p
                style={{
                  margin: "9px 0 0",
                  color: "#718071",
                  fontSize: "15px",
                }}
              >
                Your habits are growing beautifully.
              </p>
            </div>

            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "#dcebd4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                border: "4px solid white",
                boxShadow: "0 5px 15px rgba(62,91,55,0.12)",
              }}
            >
              🌸
            </div>
          </div>

          {/* DAILY PROGRESS */}
          <div
            style={{
              marginTop: "22px",
              background: "#f4f7ef",
              borderRadius: "20px",
              padding: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "9px",
                fontSize: "13px",
                fontWeight: "700",
              }}
            >
              <span>Today's garden progress 🌿</span>
              <span>{bloomPercentage}%</span>
            </div>

            <div
              style={{
                height: "12px",
                background: "#dfe8d9",
                borderRadius: "99px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${bloomPercentage}%`,
                  height: "100%",
                  background:
                    "linear-gradient(90deg, #8eae86, #5d815b)",
                  borderRadius: "99px",
                  transition: "width .3s ease",
                }}
              />
            </div>

            <p
              style={{
                margin: "9px 0 0",
                color: "#718071",
                fontSize: "12px",
              }}
            >
              💚 {completedCount} of {habits.length} habits watered today
            </p>
          </div>
        </header>

        {/* TITLE + BUTTON */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "18px",
            gap: "12px",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "24px",
                color: "#29432c",
              }}
            >
              Your plants 🌿
            </h2>
            <p
              style={{
                margin: "5px 0 0",
                color: "#718071",
                fontSize: "13px",
              }}
            >
              Every little habit helps them grow.
            </p>
          </div>

          <button
            onClick={() => setIsPlantModalOpen(true)}
            style={{
              border: "none",
              background: "#557653",
              color: "white",
              borderRadius: "999px",
              padding: "12px 18px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 7px 18px rgba(62,91,55,.2)",
              whiteSpace: "nowrap",
            }}
          >
            + Plant Habit
          </button>
        </div>

        {/* PLANTS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "18px",
          }}
        >
          {habits.map((habit) => {
            const stage = stageFromProgress(habit.progress);
            const species = habit.species || speciesForCategory(habit.category);

            return (
              <div
                key={habit.id}
                style={{
                  background: "rgba(255,255,255,.9)",
                  border: habit.completedToday
                    ? "2px solid #b9d6aa"
                    : "1px solid #e0e8dc",
                  borderRadius: "26px",
                  padding: "18px",
                  boxShadow: "0 10px 25px rgba(62,91,55,.07)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    background: "#edf6e9",
                    right: "-25px",
                    top: "-25px",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      background: "#edf4e9",
                      color: "#557653",
                      borderRadius: "999px",
                      padding: "6px 10px",
                      fontSize: "11px",
                      fontWeight: "800",
                    }}
                  >
                    {habit.category}
                  </span>

                  <span style={{ fontSize: "13px" }}>
                    {habit.completedToday ? "✨ Done" : "🌱 Growing"}
                  </span>
                </div>

                {/* PLANT */}
                <div
                  style={{
                    height: "150px",
                    margin: "8px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "radial-gradient(circle, #f1f8eb 0%, transparent 68%)",
                  }}
                >
                  <PixelPlant
                    stage={stage}
                    species={species}
                    size={110}
                  />
                </div>

                <h3
                  style={{
                    margin: "4px 0",
                    fontSize: "19px",
                    color: "#29432c",
                  }}
                >
                  {habit.title}
                </h3>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "8px 0 12px",
                    fontSize: "12px",
                    color: "#718071",
                  }}
                >
                  <span>🔥 {habit.streak} day streak</span>
                  <strong style={{ color: "#557653" }}>
                    {habit.progress}%
                  </strong>
                </div>

                <div
                  style={{
                    height: "8px",
                    background: "#e4ebdf",
                    borderRadius: "99px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${habit.progress}%`,
                      height: "100%",
                      background: "#7fa477",
                      borderRadius: "99px",
                    }}
                  />
                </div>

                {!habit.completedToday ? (
                  <button
                    onClick={() => waterHabit(habit.id)}
                    style={{
                      width: "100%",
                      marginTop: "15px",
                      border: "none",
                      borderRadius: "15px",
                      padding: "11px",
                      background: "#e5f2df",
                      color: "#41633f",
                      fontWeight: "800",
                      cursor: "pointer",
                    }}
                  >
                    💧 Water my plant
                  </button>
                ) : (
                  <div
                    style={{
                      marginTop: "15px",
                      textAlign: "center",
                      padding: "11px",
                      borderRadius: "15px",
                      background: "#edf7e9",
                      color: "#557653",
                      fontWeight: "800",
                    }}
                  >
                    🌸 Beautifully watered!
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* EMPTY STATE */}
        {habits.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "white",
              borderRadius: "25px",
            }}
          >
            <div style={{ fontSize: "55px" }}>🌱</div>
            <h2>Your garden is waiting!</h2>
            <p>Add your first habit and watch it grow.</p>
          </div>
        )}
      </div>

      <PlantHabitModal
        isOpen={isPlantModalOpen}
        onClose={() => setIsPlantModalOpen(false)}
        onAddHabit={addHabit}
      />
    </div>
  );
}
