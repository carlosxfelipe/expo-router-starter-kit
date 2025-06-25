/*
Exemplo de uso:

const warningColor = useStatusColor("warning");
const successColor = useStatusColor("success");
const errorColor = useStatusColor("error"); 
*/

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export function useStatusColor(level: "success" | "warning" | "error") {
  const theme = useColorScheme() ?? "light";
  return Colors[theme].status[level];
}
