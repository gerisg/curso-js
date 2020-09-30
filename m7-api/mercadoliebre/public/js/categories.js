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

    function execute (category = '') {
        apiCall(`${window.location.origin}/api/products/${category}`, (response) => { 
            let productsContainer = document.getElementById('products-container');
            productsContainer.innerHTML = '';
            response.data.forEach(product => {
                productsContainer.innerHTML += 
                    `<div class="col-12 col-sm-6 col-lg-4">
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
                    </div>`;
            });
        });
    }

    execute();

    let filters = document.getElementsByClassName('filter');
    Array.prototype.forEach.call(filters, filter => filter.addEventListener('click', function(e){
        e.preventDefault(); // Evito que se ejecute el link
        execute(filter.dataset.category); 
    }));
    
})