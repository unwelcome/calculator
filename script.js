$(document).ready(function(){
    var btn = $(".calc_button");
    btn.on("click", function(){
        let input = $(this).text();
        alert(input);
});
});