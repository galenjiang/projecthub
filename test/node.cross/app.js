var xhr = new XMLHttpRequest();
xhr.open('POST','./ajax',true);
xhr.onreadystatechange = function(){
  if(xhr.readyState == 4 && xhr.status == 200){
      console.log(xhr.responseText);
  }
};
xhr.send(123);