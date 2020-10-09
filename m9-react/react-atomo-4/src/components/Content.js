import React from 'react';

let title = 'Mi primer sitio con React JS';
let paragraph = require('../data/articulo.js').texto;
let image = 'https://placeimg.com/500/240/nature';

function Content() {
    return (
        <div className="row my-3">
            <div className="col">
                <div className="row">
                    <div className="col">
                        <h1>{title}</h1>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-md-4">
                        <img style={{width:'100%'}} src={image} alt={'article'}/>
                        <a target="_blank" className="text-secondary" href={image}>Fuente: {image}</a>
                    </div>
                    <div className="col-md-8">
                        <p>{paragraph}</p>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col">
                        <p>{paragraph}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;