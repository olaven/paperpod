import { Input } from "@paperpod/ui";
import React from 'react'
import ReactDOM from 'react-dom'

console.log('Hello from tsx!')

ReactDOM.render(
    <>
        Her er det tekst
        <Input placeholder="test" />
    </>,
    document.getElementById('root'),
)