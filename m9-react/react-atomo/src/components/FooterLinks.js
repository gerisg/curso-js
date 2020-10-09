import React from 'react'

function FooterLinks() {
    return (
        <div className="col-xs-12 col-sm-4 col-md-4">
            <h5>Mas info</h5>
            <ul className="list-unstyled quick-links">
                <li>
                    <a href="#">
                        <i className="fa fa-angle-double-right"></i>
                        &nbsp;Home
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa fa-angle-double-right"></i>
                        &nbsp;About
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa fa-angle-double-right"></i>
                        &nbsp;FAQ
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa fa-angle-double-right"></i> 
                        &nbsp;Terminos y Condiciones
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa fa-angle-double-right"></i>
                        &nbsp;Contacto
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default FooterLinks