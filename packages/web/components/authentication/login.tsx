import { get } from "node-kall";

export const Login = () => {
  const fetchProtectedEndpoint = async () => {
    const [status, body] = await get("/authentication/test");
    console.log("received", status, body);
  };
  return (
    <>
      <button onClick={fetchProtectedEndpoint}>fetch protected endpoint</button>
      <form action="/authentication/login" method="post">
        <div>
          <label>Email:</label>
          <input type="text" name="email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" />
        </div>
        <div>
          <input type="submit" value="Log In" />
        </div>
      </form>
    </>
  );
};
