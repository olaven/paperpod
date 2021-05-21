import React, { useEffect, useImperativeHandle, useState } from "react";
import { get, OK } from "node-kall";
import { Input } from "@paperpod/ui";

const useTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {

    const getTodods = async () => {


      const [status, todos] = await get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setTodos(status === OK ? todos : []);
    }

    getTodods()
  })
   

  return todos;
};

const useName = () => {

  const [ name ,setName] = useState("Guro"); 
  return name;
}

const Child = () => {

  const name = useName(); 
  return <div>{name}</div>
}

export const Popup = () => {
  
  return (
    <div>
      <Input></Input>
    </div>
  );
};
