import AsyncStorage from "@react-native-async-storage/async-storage";

export async function salvarUsuario(usuario: any) {
  await AsyncStorage.setItem(
    "usuarioLogado",
    JSON.stringify(usuario)
  );
}

export async function obterUsuario() {
  const usuario =
    await AsyncStorage.getItem("usuarioLogado");

  return usuario ? JSON.parse(usuario) : null;
}

export async function logout() {
  await AsyncStorage.removeItem("usuarioLogado");
}