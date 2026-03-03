import { StyleSheet, TextInput, View } from "react-native";
import { BaseColors } from "../constants/colors";

const Input = ({
  placeholder,
  leftIcon,
  onChange,
}: {
  placeholder?: string;
  leftIcon?: React.ReactNode;
  onChange?: (text: string) => void;
}) => {
  return (
    <View style={styles.container}>
      {leftIcon}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={BaseColors.neutralDarkLightest}
        onChangeText={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 49,
    backgroundColor: BaseColors.neutralLightLightest,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    borderRadius: 24,
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: BaseColors.neutralDarkDarkest,
    fontFamily: "Epilogue-Regular",
  },
});

export default Input;
