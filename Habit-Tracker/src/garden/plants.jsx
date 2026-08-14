const PLANT_SPECIES = {
  Health: {
    name: "Sprout",
    emoji: "🌱",
  },
  Mindfulness: {
    name: "Peace Flower",
    emoji: "🌸",
  },
  Reading: {
    name: "Book Leaf",
    emoji: "🍃",
  },
  Exercise: {
    name: "Strong Sprout",
    emoji: "🌿",
  },
  Sleep: {
    name: "Moon Flower",
    emoji: "🌙",
  },
  Journal: {
    name: "Thought Flower",
    emoji: "🌷",
  },
};

export function speciesForCategory(category) {
  return PLANT_SPECIES[category] || PLANT_SPECIES.Health;
}

export function stageFromProgress(progress = 0) {
  if (progress >= 80) return 4;
  if (progress >= 55) return 3;
  if (progress >= 30) return 2;
  return 1;
}

export function PixelPlant({ stage = 1, species, size = 100 }) {
  const plant = species || PLANT_SPECIES.Health;

  const stages = {
    1: "🌱",
    2: "🌿",
    3: "🌳",
    4: "🌸",
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.65,
        lineHeight: 1,
        userSelect: "none",
      }}
      title={plant.name}
    >
      {stages[stage] || stages[1]}
    </div>
  );
}
