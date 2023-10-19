import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./style.css";
const StarRatting = ({ setRate, rate }) => {
  const [hover, setHover] = useState(null);
  return (
    <div>
      {[...Array(5)]?.map((star, i) => {
        const rattingValue = i + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              className="input-star"
              value={rattingValue}
              onClick={() => setRate(rattingValue)}
            />
            <FaStar
              className="star"
              color={rattingValue <= (hover || rate) ? "#ffc107" : "#e4e5e9"}
              size={100}
              onMouseEnter={() => setHover(rattingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRatting;
