import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

async function checkAuth(): Promise<boolean> {
  // TODO: Implementar lógica de autenticação
  const userIsAuthenticated = false;
  return userIsAuthenticated;
}

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth().then((result) => {
      setIsAuthenticated(result);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/home" />;
  } else {
    return <Redirect href="/auth/login" />;
  }
}
