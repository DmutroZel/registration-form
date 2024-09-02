let db = JSON.parse(localStorage.getItem('db')) || [];
let alphabet = [];
for (let i = 97; i <= 122; i++) {
    alphabet.push(String.fromCharCode(i));
}
$('#signup').click(function(){
    let data = {
        login: $('#login').val(),
        password:chypher($('#password').val())
    };

    db.push(data);
    $('#login').val('');
    $('#password').val('');
    console.log(db);


    localStorage.setItem('db', JSON.stringify(db));
})


$('#signin').click(function(){
    let data = {
        login: $('#login').val(),
        password: $('#password').val()
    };  

    db = JSON.parse(localStorage.getItem('db'))
    let isSignin = false;
    for(let el of db){
    if(el.login == data.login && dechypher(el.password) == data.password){
        isSignin = true;
    } else if(el.login == data.login && dechypher(el.password) != data.password){
        isSignin = false;
    } 
  }
    
  if(isSignin == true){
    $('#popup').removeClass('hidden').css('opacity', '1');

    // Приховати popup через 3 секунди
    setTimeout(function() {
        $('#popup').css('opacity', '0'); // Почати приховувати з плавним переходом
        setTimeout(function() {
            $('#popup').addClass('hidden'); // Повністю приховати popup після завершення переходу
        }, 500); // Затримка 500 мс для завершення переходу
    }, 3000);
    $('.auth').css('display', 'none');
    $('.homePage').css('display', 'flex');
  }else if (isSignin == false){
    alert('Вхід заборонено');
  }

});

function chypher(password, n = 3) {
    let chypherPassword = '';
    for (let i = 0; i < password.length; i++) {
        let currentIndex = alphabet.indexOf(password[i]);
        if (currentIndex + n <= alphabet.length - 1) {
            chypherPassword += alphabet[currentIndex + n];
        } else {
            chypherPassword += alphabet[n - (alphabet.length - currentIndex)];
        }
    }
    return chypherPassword;
}

function dechypher(password, n = 3) {
    let dechypherPassword = '';
    for (let i = 0; i < password.length; i++) {
        let currentIndex = alphabet.indexOf(password[i]);
        if (currentIndex - n > 0) {
            dechypherPassword += alphabet[currentIndex - n];
        } else {
            dechypherPassword += alphabet[alphabet.length - (n - currentIndex)]
        }

    }
    return dechypherPassword;
}