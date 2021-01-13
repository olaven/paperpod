const Test = () => {
  const onClick = async () => {
    const response = await fetch("/authentication/users/me", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJwN3hjd3UzNHVCd09RS29scUdtOEgiLCJlbWFpbCI6Im9sYXZAc3VuZGZvZXIuY29tIiwicGFzc3dvcmRfaGFzaCI6IiQyYiQxMCRhWldIWTIwSmtwWHR5UktVdE05SG91VWQycVpvL1V3em1aYnVPM3psN3QvLlRHaVBGbm1kTyIsImlhdCI6MTYxMDM5OTQ5NiwiZXhwIjoxNjEwNDAwMzk2fQ.Fzqr5DNPkApiBjOqomNxq_2yvNmKL-1zc9mYVbfAFX4",
      },
    });

    console.log(response.status);
    if (response.status === 200) {
      const user = await response.json();
      console.log("User: from web token", user);
    }
  };
  return <button onClick={onClick}>Fetch /me with token</button>;
};

export default Test;
