import React, { useState } from 'react'
import { get, OK } from "node-kall";
import { Input, asyncEffect } from "@paperpod/ui";

const useTodos = () => {

    const [todos, setTodos] = useState([]);

    asyncEffect(async () => {

        const [status, todos] = await get("https://jsonplaceholder.typicode.com/todos");
        setTodos(status === OK ?
            todos :
            []
        );
    }, []);

    return todos;
}

export const Popup = () => {

    const todos = useTodos();

    return <div>
        <Input placeholder="Fra popup.tsx" />
        {todos.map(todo => <div>got {todo.title}</div>)}
    </div>
}