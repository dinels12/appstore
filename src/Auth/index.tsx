import React from "react";
import {
  Button,
  TextInput,
  Paragraph,
  Dialog,
  Portal,
} from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import { useForm } from "react-hook-form";
import { useMutation, gql } from "@apollo/client";
import { AuthContext } from "../../components/context";

const USER_LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      token
      message
    }
  }
`;

const USER_REGISTER = gql`
  mutation createUser(
    $name: String
    $lastname: String
    $email: String
    $password: String
  ) {
    createUser(
      input: {
        name: $name
        lastname: $lastname
        email: $email
        password: $password
      }
    ) {
      _id
      email
    }
  }
`;

type Login = {
  email: string;
  password: string;
};

interface Context {
  signIn: any;
  signOut: null;
  signUp: any;
}

interface Props {
  message: string;
  show: boolean;
}

interface Response {
  userLogin: {
    message: string;
    token: string;
  };
}

const DialogError = ({ message, show }: Props) => {
  const [visible, setVisible] = React.useState(show);

  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Paragraph>{message}</Paragraph>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const Register = () => {
  const [userLogin] = useMutation(USER_LOGIN);
  const [createUser] = useMutation(USER_REGISTER);
  const { register, errors, handleSubmit, setValue } = useForm();
  const [message, setMessage] = React.useState("Registrar");
  const { signUp }: Context = React.useContext<any>(AuthContext);

  React.useEffect(() => {
    register(
      { name: "email" },
      {
        required: true,
        pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      }
    );
    register({ name: "password" }, { required: true });
    register({ name: "name" }, { required: true, pattern: /[a-zA-Z]+$/ });
    register({ name: "lastname" }, { required: true, pattern: /[a-zA-Z]+$/ });
  }, [register]);

  const onSubmit = async ({ name, email, lastname, password }: any) => {
    const { data, errors } = await createUser({
      variables: { name, email, lastname, password },
    });
    if (errors) return console.error(errors);
    if (data) {
      const {
        data: {
          userLogin: { message, token },
        },
      } = await userLogin({ variables: { email, password } });
      setMessage(message);
      signUp(email, password, token);
    }
  };
  return (
    <View>
      <TextInput
        mode="flat"
        label="Nombre"
        error={errors.name ? true : false}
        onChangeText={(text) => setValue("name", text)}
      />
      <TextInput
        mode="flat"
        label="Apellido"
        error={errors.lastname ? true : false}
        onChangeText={(text) => setValue("lastname", text)}
      />
      <TextInput
        mode="flat"
        label="Correo electronico"
        error={errors.email ? true : false}
        onChangeText={(text) => setValue("email", text)}
      />
      <TextInput
        mode="flat"
        label="Contrasena"
        secureTextEntry={true}
        error={errors.password ? true : false}
        onChangeText={(text) => setValue("password", text)}
      />
      <View>
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          {message}
        </Button>
      </View>
    </View>
  );
};

const Login = () => {
  const { register, errors, handleSubmit, setValue } = useForm<Login>();
  const [userLogin] = useMutation(USER_LOGIN);
  const [message, setMessage] = React.useState("Iniciar Sesion");
  const { signIn }: Context = React.useContext<any>(AuthContext);

  React.useEffect(() => {
    register(
      { name: "email" },
      {
        required: true,
        pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      }
    );
    register({ name: "password" }, { required: true });
  }, [register]);

  const onSubmit = async ({ email, password }: any) => {
    const { data } = await userLogin({ variables: { email, password } });
    const {
      userLogin: { message, token },
    }: Response = data;
    if (message === "Ban") {
      setMessage("Error, Contactar a soporte.");
    } else {
      setMessage(message);
      signIn(email, password, token);
    }
  };

  return (
    <View>
      <TextInput
        mode="flat"
        label="Correo electronico"
        error={errors.email ? true : false}
        onChangeText={(text) => setValue("email", text)}
      />
      <TextInput
        mode="flat"
        label="Contrasena"
        secureTextEntry={true}
        error={errors.password ? true : false}
        onChangeText={(text) => setValue("password", text)}
      />
      <View>
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          {message}
        </Button>
      </View>
    </View>
  );
};

const Main = () => {
  const [state, setState] = React.useState(false);

  return state ? (
    <View style={styles.main}>
      <Register />
      <Button
        onPress={() => {
          setState(false);
        }}
      >
        Iniciar Sesion
      </Button>
    </View>
  ) : (
    <View style={styles.main}>
      <Login />
      <Button
        onPress={() => {
          setState(true);
        }}
      >
        Registro
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Main;
