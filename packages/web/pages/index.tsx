import { CREATED, post } from "node-kall";
import { models } from "common";
import { useState } from "react";

const postUser = async (user: models.User) => {};

const Login = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const onClick = async () => {
    const [status, retrieved] = await post("/authentication/users", {
      email,
      password_hash: password, //TODO: hash on server or client?
    });

    if (status === CREATED) {
      console.log("created a user: ", retrieved);
    }
  };
  return (
    <>
      email:
      <input type="email" onChange={(event) => setEmail(event.target.value)} />
      password:
      <input
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={onClick}>done</button>
    </>
  );
};

const Index = () => (
  <div>
    <Login />
  </div>
);
export default Index;
