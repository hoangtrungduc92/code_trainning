function addInput(element) {
    var newId=0;
    var button = element;
    var parent = element.parentElement;
    var inputs = parent.querySelectorAll('input');    
    var inputID = inputs[inputs.length-1].id.split('-');
    newId= Number(inputID[1]) +1;
    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('placeholder', 'Enter a number');
    input.setAttribute('id', `input-${newId}`);
    parent.appendChild(input);    
    parent.removeChild(element);
    parent.appendChild(button);
}
function mergeColumns() {
    var inputs = document.querySelectorAll('input[type="number"]');
    var values = [];


    
    
    inputs.forEach(function(input) {
        if(input.value)
        {
            values.push(Number(input.value));
            console.log(input.value);            
        }
    });
    //Cach 1
    // numbers = values.sort(function(a, b) {
    //     return a - b;
    // });
   
    //     numbers[i] = values[i];
    // }
    //Cach 2
    for (var i = 0; i < values.length - 1; i++) {
        for (var j = 0; j < values.length - 1 - i; j++) {
            if (values[j] > values[j + 1]) {
                var temp = values[j];
                values[j] = values[j + 1];
                values[j + 1] = temp;
            }
        }
    }
    
   
    // for (var i=0; i<values.length;i++) {
    //     values.forEach(function (value,index){
    //         if(value> values[index+1]){
    //             var temp = value;
    //             values[index] = values[index+1];
    //             values[index+1] = temp;
    //         }
    //     })
    // }
    console.log(values);
    document.getElementById('merge-result').innerText= values.join(' <= ');
   
    
    // console.log(lengthNmbers);
    // console.log(numbers);
    // document.getElementById('merge-result').innerText= numbers.join(' <= ');
}