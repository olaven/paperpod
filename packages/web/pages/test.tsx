import { useContext } from "react";
import { UserContext } from "../components/authentication/UserContext";

function fetchStream(reader: ReadableStreamDefaultReader) {
  
  let charsReceived = 0;

  // read() returns a promise that resolves
  // when a value has been received
  reader.read().then(function callback({ done, value }) {
    // Result objects contain two properties:
    // done  - true if the stream has already given you all its data.
    // value - some data. Always undefined when done is true.
    if (done) {
      console.log("Stream complete");
  //    para.textContent = value;
      return;
    }

    // value for fetch streams is a Uint8Array
    charsReceived += value.length;
    console.log(value);

    // Read some more, and call this function again
    return reader.read().then(callback);
  });
}

const Test = () => {
  
  
  const fileId = "600421de4db37d009debdf23"
  const { token } = useContext(UserContext);

  const onClick = async () => {

    console.log(`Fetching file ${fileId} with token ${token}`);
    const response = await fetch(`/api/files/${fileId}`, {
      headers: {
        Authorization:
          `Bearer ${token}`, 
      },
    });

  
    
    if (response.status === 200) {
      
      fetchStream(
        response.body.getReader()
      )
    }
  };
  return <button onClick={onClick}>get article file</button>;
};

export default Test;
