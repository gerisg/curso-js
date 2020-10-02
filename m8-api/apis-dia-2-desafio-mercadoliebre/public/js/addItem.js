window.addEventListener('load', () => {
    
    let form = document.getElementById('addToCartForm');
    form.addEventListener('submit', function(e){ 
        
        e.preventDefault();
        
        let quantity = e.target[0].value;
        let productId = e.target[1].value;
        
        axios.post('http://localhost:3000/api/items', { quantity, productId })
            .then(function (response) {
                if(response.status==201) {
                    window.location.href = '/users/cart';
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    });

})