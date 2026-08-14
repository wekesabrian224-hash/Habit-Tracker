import { useState } from "react";
import "../styles/garden.css";

const DEFAULT_HABITS = [
  { id: 1, title: "Morning walk", category: "Exercise", progress: 40, streak: 3, completedToday: false },
  { id: 2, title: "Read 20 pages", category: "Reading", progress: 70, streak: 5, completedToday: false },
  { id: 3, title: "Journal", category: "Journal", progress: 100, streak: 8, completedToday: true },
  { id: 4, title: "Drink water", category: "Health", progress: 15, streak: 1, completedToday: false },
];

// Simple growth stages shown as emoji instead of custom SVG art.
const STAGE_EMOJI = ["🌰", "🌱", "🌿", "🪴", "🌳", "🌸"];

function stageFromProgress(progress = 0) {
  if (progress >= 95) return 5; // Blooming
  if (progress >= 75) return 4; // Mature
  if (progress >= 55) return 3; // Young
  if (progress >= 35) return 2; // Seedling
  if (progress >= 15) return 1; // Sprout
  return 0; // Seed
}

export function GardenView({ habits: habitsProp, userName = "there", onWaterHabit }) {
  const [internalHabits, setInternalHabits] = useState(DEFAULT_HABITS);
  const habits = habitsProp ?? internalHabits;

  const waterHabit = (id) => {
    if (onWaterHabit) {
      onWaterHabit(id);
      return;
    }
    setInternalHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              completedToday: true,
              progress: Math.min(100, h.progress + 20),
              streak: h.completedToday ? h.streak : h.streak + 1,
            }
          : h
      )
    );
  };

  const completedCount = habits.filter((h) => h.completedToday).length;
  const bloomPercentage = habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0;

  return (
    <div className="garden-view">
      <header className="garden-header">
        <h1>Hi {userName}, your garden is waiting 🌱</h1>
        <p>
          You've tended {completedCount} of {habits.length} habits today.{" "}
          {bloomPercentage >= 80 ? "In full bloom!" : "Keep watering to help them grow."}
        </p>
        <div className="bloom-bar">
          <div className="bloom-bar-fill" style={{ width: `${bloomPercentage}%` }} />
        </div>
      </header>

      <div className="garden-grid">
        {habits.map((habit) => {
          const stage = stageFromProgress(habit.progress);
          return (
            <div key={habit.id} className={`plot ${habit.completedToday ? "plot-done" : ""}`}>
              <div className="plot-top">
                <span className="plot-category">{habit.category}</span>
                {habit.completedToday ? (
                  <span className="plot-check" title="Watered today">✓</span>
                ) : (
                  <button
                    className="plot-water-btn"
                    onClick={() => waterHabit(habit.id)}
                    title="Water this habit"
                  >
                    💧
                  </button>
                )}
              </div>

              <div className="plot-plant" style={{ fontSize: 48, textAlign: "center" }}>
                {STAGE_EMOJI[stage]}
              </div>

              <h3 className="plot-title">{habit.title}</h3>
              <span className="plot-streak">
                {habit.completedToday ? "Done today ✨" : `${habit.streak} day streak`}
              </span>

              <div className="plot-progress">
                <div className="plot-progress-fill" style={{ width: `${habit.progress}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GardenView;