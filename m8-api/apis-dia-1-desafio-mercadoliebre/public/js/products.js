 window.addEventListener('load', () => {
    
    function apiCall(url, callback) {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(callback)
            .catch(error => {
                console.log(error);
            })
    }

    apiCall(`${window.location.origin}/api/products/offers`, (response) => { 
        let offerContainer = document.getElementById('offers-products');
        response.data.forEach(product => {
            offerContainer.innerHTML += `
                <div class="col-12 col-sm-6 col-lg-3">
                    <section class="product-box">
                        <a href="/products/detail/${ product.id } ">
                            <figure class="product-box_image">
                                <img src="/images/products/${ product.image }" alt="${ product.name }">
                            </figure>
                            <article class="product-box_data">
                                <h2>$${ product.price - product.price * product.discount / 100 }</h2>
                                <span>${ product.discount } % OFF</span>
                                <p>${ product.name }</p>
                                <i class="fas fa-truck"></i>
                            </article>
                        </a>
                    </section>
                </div>
            `;
        });
    });

    apiCall(`${window.location.origin}/api/products/latest`, (response) => { 
        let latestContainer = document.getElementById('latest-products');
        response.data.forEach(product => {
            latestContainer.innerHTML += `
                <div class="col-12 col-sm-6 col-lg-3">
                    <section class="product-box">
                        <a href="/products/detail/${ product.id }">
                            <figure class="product-box_image">
                                <img src="/images/products/${ product.image }" alt="${ product.name }">
                            </figure>
                            <article class="product-box_data">
                                <h2>$${ product.price - product.price * product.discount / 100 }</h2>
                                ${ product.discount > 0 ? `<span>${ product.discount } % OFF</span>` : `` }
                                <p>${ product.name }</p>
                                <i class="fas fa-truck"></i>
                            </article>
                        </a>
                    </section>
                </div>
            `;
        });
    });
})