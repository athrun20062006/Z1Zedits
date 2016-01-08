function checkAll(checkbox, checkallbox){
  h_checkbox=document.getElementsByTagName('input');
  for (i = 0; i < h_checkbox.length; i++){
    if(h_checkbox[i].name==checkbox){
      h_checkbox[i].checked = checkallbox.checked;
    }
  }
}