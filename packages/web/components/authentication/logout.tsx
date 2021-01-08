export const Logout = () => (
  <form action="/authentication/logout" method="post">
    <div>
      <input type="submit" value="Log out" />
    </div>
  </form>
);
