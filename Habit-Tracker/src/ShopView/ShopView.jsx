import { motion } from "motion/react";
import { PixelPlant } from "../garden/plants.jsx";
import "./ShopView.css";

function ShopView({ items, user, onBuyItem }) {
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
          <span>🪙 {user.coins} Coins</span>

          <span className="line"></span>

          <span>💎 {user.gems} Gems</span>
        </div>
      </div>

      {/* Display all the shop items */}
      <div className="shop-items">
        {items.map((item) => (
          <motion.div
            key={item.id}
            // Move the card up a little when hovered
            whileHover={{ y: -5 }}
            className="shop-card"
          >
            {/* Plant image */}
            <div className="plant-box">
              <PixelPlant
                stage={5}
                species={item.species || "herb"}
                size={96}
              />

              {/* Show this if the user already owns it */}
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

              <button onClick={() => onBuyItem(item)} disabled={item.owned}>
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
