import React from 'react';

function Main(props) {
    return(
        <main>
            <h1>{ props.title }</h1>
            <p>{ props.content }</p>
        </main>
    );
}

export default Main;