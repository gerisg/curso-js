import React from 'react';
import Main from './components/Main'
import Nav from './components/nav/Nav';
import './App.css';

function App() {
  return (
    <React.Fragment>

    <header>
      <Nav items={ ['productos', 'servicios', 'contacto'] }>
        <a href="/inicio">inicio</a>
      </Nav>
    </header>

    <Main 
      title='Un titular'
      content='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora quaerat nemo, nobis rerum accusamus consequuntur dignissimos aliquam repellat alias exercitationem reiciendis id minus placeat aut voluptas fugiat et? Harum, repellendus! Doloribus iusto magnam laudantium laboriosam dicta corrupti praesentium omnis pariatur officia assumenda harum nisi dolorem nesciunt eligendi optio dolores cupiditate earum commodi, soluta aliquid voluptatem numquam eaque! Voluptatem, iure possimus.'
    />

    <footer>
      <Nav items={ ['productos', 'servicios', 'contacto'] }>
        <a href="/inicio">inicio</a>
      </Nav>
    </footer>

    </React.Fragment>
  );
}

export default App;
