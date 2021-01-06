import { CREATED, get, post } from "node-kall";
import { models } from "common";
import { useState } from "react";

const Login = () => (
  <form action="/login" method="post">
    <div>
      <label>Email:</label>
      <input type="text" name="username" />
    </div>
    <div>
      <label>Password:</label>
      <input type="password" name="password" />
    </div>
    <div>
      <input type="submit" value="Log In" />
    </div>
  </form>
);

const Signup = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const onClick = async () => {
    const [status, retrieved] = await post<models.UserCredentials>(
      "/authentication/users",
      {
        email,
        password,
      }
    );

    if (status === CREATED) {
      console.log("created a user: ", retrieved);
    }
  };
  return (
    <>
      Signup: email:
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

const GetArticles = () => {
  const [status, setStatus] = useState(-1);
  const onClick = async () => {
    const [status] = await get("/api/articles");
    setStatus(status);
  };

  return (
    <>
      <button onClick={onClick}>get articles</button>
      {status}
    </>
  );
};

const Index = () => (
  <div>
    <GetArticles />
    <br />
    <Signup />
    <br />
    <Login />
  </div>
);
export default Index;
