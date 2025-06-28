# Expo Router Starter Kit

Este é um projeto inicial com [Expo Router](https://expo.dev/router), configurado com suporte a temas (claro/escuro), navegação por abas, login e registro, além de componentes personalizados reutilizáveis.

## 🚀 Como iniciar

1. Instale todas as dependências com:

```bash
npm install
```

2. Inicie o projeto:

```bash
npx expo start
```

Você verá opções para abrir o app em:

- um emulador Android ou iOS,
- no seu dispositivo com o app Expo Go,
- ou no navegador (Web).

> ⚠️ Este template utiliza:
>
> - [`@mdi/js`](https://www.npmjs.com/package/@mdi/js): para paths de ícones da Material Design Icons
> - [`react-native-svg`](https://docs.expo.dev/versions/latest/sdk/svg/): para renderizar SVGs no React Native
>
> Essas dependências já são instaladas automaticamente com `npm install`.

---

## 🔐 Login de exemplo

Você pode acessar a tela inicial usando as credenciais padrão:

- **Usuário:** `user`
- **Senha:** `123`

> O login é simulado localmente e não está conectado a nenhum backend ainda.

---

## 🧱 Estrutura

A estrutura principal do projeto:

```
/app              # Rotas (Tabs, Auth, etc.)
/components       # Componentes reutilizáveis
/hooks            # Hooks personalizados
/constants        # Cores, temas
/assets           # Fontes, ícones, splash
```

O roteamento é baseado em arquivos, fornecido pelo `expo-router`.

---

## 📄 Licença

Este projeto é de código aberto, fique à vontade para usar como base e modificar conforme necessário.
