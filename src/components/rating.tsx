import { View } from "react-native";

import StarFullIcon from "../../assets/images/icons/star-full";
import StarHalfIcon from "../../assets/images/icons/star-half";
import StarOutlinedIcon from "../../assets/images/icons/star-outlined";

export const Rating = ({ rating }: { rating: number }) => {
  return (
    <View
      style={{ flexDirection: "row", gap: 2, height: 16, alignItems: "center" }}
    >
      {Array.from({ length: 5 }, (_, index) => {
        if (index < Math.floor(rating)) {
          return <StarFullIcon key={index} />;
        } else if (index === Math.floor(rating) && rating % 1 !== 0) {
          return <StarHalfIcon key={index} />;
        } else {
          return <StarOutlinedIcon key={index} />;
        }
      })}
    </View>
  );
};
