let button = document.getElementById('button')
let plainInput = document.getElementById('plain-input')
let keyInput = document.getElementById('key-input')
let resultEle = document.getElementById('result')
let loading = document.getElementById('loading');
let loadingText = document.getElementById('loading-text');

function encrypt(key, plain) {
    let upperCase_key = key.toUpperCase()
    let arr_key = upperCase_key.split('')
    let new_arr_key = []
    let ascii_obj_key = []
    let result = ''
    let upperCase_plain = plain.toUpperCase()
    let arr_plain = upperCase_plain.split('')
    let ascii_obj_plain = []
    let new_arr_plain = []
    let arr_plain_space_idx = []

    if(plain == '' && key == '')
        alert("You didn\'t input anything ...")

    for (var i = 0; i < arr_plain.length; i++) {
        new_arr_key.push(arr_key[i % arr_key.length])
        if( arr_plain[i].charCodeAt() == 32 )
            arr_plain_space_idx.push(i)
        else
            new_arr_plain.push(arr_plain[i])
    }

    for (var i = 0; i < arr_key.length; i++) {
        let ascii_num = arr_key[i].charCodeAt()

        if(ascii_num !== 32)
        {
            ascii_obj_key.push({keyLetter: arr_key[i], ascii:ascii_num})
        }
    }

    for (var i = 0; i < new_arr_plain.length; i++) {
        let ascii_num = new_arr_plain[i].charCodeAt()
        ascii_obj_plain.push({plainLetter:new_arr_plain[i], ascii:ascii_num})
    }

    
    for (var i = 0; i < new_arr_plain.length; i++) {
        let currPlainAscii = new_arr_plain[i].charCodeAt();
        let currKeyAscii = new_arr_key[i % new_arr_key.length].charCodeAt()
        let simplifiedKey = currKeyAscii - 65;
        let sum = simplifiedKey + currPlainAscii;
    
        if (sum >= 65 && sum <= 90)
            result += String.fromCharCode(sum);
        else if (sum > 90)
            result += String.fromCharCode(65 + (sum % 91));
        else if (currPlainAscii == 32)
            result += String.fromCharCode(currPlainAscii);
    }
    

    resultEle.innerHTML = result
    
}
 
button.addEventListener('click', function () {
    // Hiển thị hiệu ứng loading
    loading.style.display = 'block';

    let seconds = 1;
    let intervalId = setInterval(function () {
        loadingText.innerHTML = seconds + 's';
        seconds++;
    }, 900);

    // Thực hiện mã hóa 
    setTimeout(function () {
        clearInterval(intervalId);  
        loading.style.display = 'none';
        loadingText.innerHTML = '';  
        encrypt(keyInput.value, plainInput.value);
    }, 3000);  
});
 