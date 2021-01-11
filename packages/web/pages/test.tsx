const Test = () => {
  const onClick = async () => {
    const response = await fetch("/authentication/test", {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9sYXZAc3VuZGZvZXIuY29tIiwiX2lkIjoiZW4gZWxsZXIgYW5uZW4gYnJ1a2VyaWQiLCJpYXQiOjE2MTAzOTYxODcsImV4cCI6MTYxMDM5NzA4N30.JMo6NVtqw8kbHLYUasa4FwAEW-LZ6j4Lc5X5bGu8YEQ",
      },
    });

    console.log(response.status);
    if (response.status === 200) {
      const user = await response.json();
      console.log("User: from web token", user);
    }
  };
  return <button onClick={onClick}>fetch token</button>;
};

export default Test;
