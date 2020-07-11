window.onload = function (){

    let color = document.getElementById("color")
    console.log(color.value);

    color.addEventListener("change", function(){
        let body = document.querySelector('body')
        body.style.backgroundColor = color.value
        console.log(color.value);
    });

}