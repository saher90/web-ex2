
$(document).ready(function(){
    const db = firebase.firestore()
    db.collection("users").add({
     first: "Ada",
     last: "Lovelace",
     born: 1815
    })
    .then(function(docRef) {
     console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
     console.error("Error adding document: ", error);
    });
    $('#btn-submit').click(function(){
        $('.invalid-feedback').hide()
        var isValid= true;
        var name=$('#yourName').val();
        var email=$('#yourEmail').val();
        var tel=$('#yourTel').val();
        var size=$('input[name ="size"]:checked').val();
        var deliveryType=$('#deliveryType').val();
        var extras=[];
        var extrasCount=0;
        var totalPrice=0;
        $.each($("input.extras:checked"),function(){
            extras.push($(this).val());
           extrasCount++;
       });
        extras.join(", ");
        switch(size){
            case "Small":
                totalPrice=10;
                break;
            case "Medium":
                totalPrice=15;
                break;
            case "Large":
                totalPrice=18;
                break;
            default:
        }
        totalPrice=totalPrice+extrasCount*2;
        if(deliveryType!="Take Away"){
            totalPrice+=5;
        }
        if($('#yourName').val()<1){
         $('#yourName').parent().find('.invalid-feedback').show();
         isValid=fales
        }
        if(!validEmail($('#yourEmail').val())){
         $('#yourEmail').parent().find('.invalid-feedback').show();
         isValid=fales
        }
        if($('#yourTel').val()<1 || isNaN($('#yourTel').val())){
          $('#yourTel').parent().find('.invalid-feedback').show();
          isValid=fales
        }
       
        
        if(isValid){
            $('#output').html(`<h5>Order details:</h5><hr><p>Total: ${totalPrice} $</p><hr>
            <p>Size: ${size}</p><p>Type: ${deliveryType}</p><p>Extras: ${extras}</p>
            <p>Name: ${name}</p><p>Email: ${email}</p><p>Tel: ${tel}</p>`)
            $('#form-wrap form')[0].reset()
           
        }

        return false;
    })
})

function validEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}