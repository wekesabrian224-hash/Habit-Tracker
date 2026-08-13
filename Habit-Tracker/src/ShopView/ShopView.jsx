import { motion } from "motion/react";
import { PixelPlant } from "../Garden/Plants";
import "./ShopView.css";

// These are the items that will appear in the shop
const defaultItems = [
  {
    id: 1,
    name: "Sunny Sunflower",
    description: "A cheerful plant that brightens your garden.",
    species: "sunflower",
    price: 50,
    currency: "coins",
    owned: false,
  },
  {
    id: 2,
    name: "Cozy Rose",
    description: "A beautiful flower for your peaceful garden.",
    species: "rose",
    price: 10,
    currency: "gems",
    owned: true,
  },
  {
    id: 3,
    name: "Fresh Herb",
    description: "A simple little plant for your growing collection.",
    species: "herb",
    price: 35,
    currency: "coins",
    owned: false,
  },
  {
    id: 4,
    name: "Spring Tulip",
    description: "Add a warm touch of color to your virtual garden.",
    species: "tulip",
    price: 8,
    currency: "gems",
    owned: false,
  },
];

function ShopView({ items, user, onBuyItem }) {
  // Use the items from the app.
  // If there are none, use our four shop items.
  const shopItems = items && items.length > 0 ? items : defaultItems;

  return (
    <div className="shop">
      {/* Shop heading */}
      <div className="shop-header">
        <div>
          <h1>Garden Shop</h1>

          <p>
            Unlock rare seeds, cozy pots, and decorations with your earned
            rewards.
          </p>
        </div>

        {/* Show the user's balance */}
        <div className="balance">
          <span>🪙 {user?.coins ?? 250} Coins</span>

          <span className="line"></span>

          <span>💎 {user?.gems ?? 18} Gems</span>
        </div>
      </div>

      {/* Shop items */}
      <div className="shop-items">
        {shopItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -5 }}
            className="shop-card"
          >
            {/* Plant */}
            <div className="plant-box">
              <PixelPlant stage={5} species={item.species} size={96} />

              {/* Show Owned if the user already has it */}
              {item.owned && <span className="owned">Owned</span>}
            </div>

            {/* Item information */}
            <div>
              <h3>{item.name}</h3>

              <p>{item.description}</p>
            </div>

            {/* Price and button */}
            <div className="item-bottom">
              <strong>
                {item.currency === "coins" ? "🪙" : "💎"} {item.price}
              </strong>

              <button
                onClick={() => onBuyItem && onBuyItem(item)}
                disabled={item.owned}
              >
                {item.owned ? "Equipped" : "Get Item"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ShopView;
