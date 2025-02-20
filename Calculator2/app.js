function buttonHandler () {
    var count =0;
    var btns= document.getElementsByClassName('btn');
    for (var btn of btns) {       
        btn.onclick= function () {
            if (!(this.innerHTML==='=')&&!(this.innerHTML==='CE') ){
                var result = document.getElementById('result').innerText; 
                if(result==='0')
                    {
                        document.getElementById('result').innerText=this.innerText;
                        console.log('Test');
                    } 
                    else {
                        document.getElementById('result').innerText=`${result}${this.innerText}`;
                        //count=document.getElementById('result').innerText;
                    }
            }
            else if(this.innerHTML==='CE') {
                document.getElementById('result').innerText=0;
            }
            else if(this.innerHTML==='=') {
                var exp =document.getElementById('result').innerText;
                console.log(exp);
                var expArr = exp.split('');

                var results = expArr.map( function (item) {
                    if (item==='x') {
                        return '*';
                    }
                    else if(item===':') {
                        return '/';
                    }
                    else {
                        return item;
                    }
                })
               
                count= divZeroHandler(results.join(''));
                document.getElementById('result').innerText= count; 
            }

        }
    } 
     
    //console.log(count);
}
buttonHandler();
function divZeroHandler(exp) {
    var result = eval(exp);
    if(result===Infinity || result===NaN) {
        
        return result=NaN;
    }
    else {
        return result;
    }
}
