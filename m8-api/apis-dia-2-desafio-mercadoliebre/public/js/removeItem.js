window.addEventListener('load', () => {
    
    let forms = document.getElementsByClassName('deleteForm');
    Array.prototype.forEach.call(forms, form => {

        form.addEventListener('submit', function(e){ 
        
            e.preventDefault();
            
            let itemId = e.target[0].value;
            console.log(itemId);
            
            axios.delete('http://localhost:3000/api/items', { data: { itemId } })
                .then(function (response) {
                    if(response.status == 200) {
                        let element = document.getElementsByClassName(`item-${itemId}`)[0];
                        console.log();
                        element.remove();

                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        });

    });

})