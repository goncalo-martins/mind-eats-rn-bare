import BulletIcon from "../../assets/images/icons/bullet";
import { BaseColors } from "../constants/colors";
import { typography } from "../constants/typography";
import { StyleSheet, Text, View } from "react-native";

const List = ({
  title,
  type,
  items,
}: {
  title: string;
  type: "ordered" | "bullet";
  items: string[];
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {items.map((step, index) => (
        <View style={styles.stepContainer} key={index}>
          <View
            style={{
              width: 40,
              alignItems: type === "bullet" ? "center" : "flex-start",
              justifyContent: type === "bullet" ? "center" : "flex-start",
            }}
          >
            {type === "bullet" && <BulletIcon />}
            {type === "ordered" && (
              <Text style={styles.stepIndex}>{index + 1}.</Text>
            )}
          </View>
          <Text
            key={index}
            style={[
              styles.stepText,
              { marginTop: type === "ordered" ? -2 : 0 },
            ]}
          >
            {step}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    ...typography.h2,
    paddingBottom: 16,
  },
  stepText: {
    ...typography.body,
    display: "flex",
    flex: 1,
    paddingRight: 12,
    wordWrap: "break-word",
  },
  stepContainer: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 12,
    paddingRight: 12,
  },
  stepIndex: {
    paddingLeft: 12,
    color: BaseColors.highlightDarkest,
    fontSize: 18,
    fontFamily: "Epilogue",
    fontWeight: "bold",
  },
});

export default List;
