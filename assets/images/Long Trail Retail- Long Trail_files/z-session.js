function reLogin(sessionID,caller,theTitle,theMessage,theWidth){var thePopup='<table cellpadding="0" cellspacing="0" width=100%> \n';thePopup+="<tr><td> "+theMessage+" </td></tr>\n";thePopup+="<tr><td align='right'> <input type='password' name='newpw' id='newpw' maxlength='25' onkeypress=\"{if (event.keyCode==13) checkLogin('"+sessionID+"','"+caller+"',document.getElementById('newpw').value);}\"> </td></tr>\n";thePopup+="<tr><td align='right'> <input type='button' id='submPasswd' value='submit' onClick=\"javascript:checkLogin('"+sessionID+"','"+caller+"',document.getElementById('newpw').value);\"> </td></tr>\n";thePopup+="</table> \n";Modalbox.show(thePopup,{title:theTitle,width:theWidth,afterLoad:setTheFocus})}function setTheFocus(){document.getElementById("newpw").focus()}var httpObject;function checkLogin(sessionID,caller,newpw){if(window.ActiveXObject){httpObject=new ActiveXObject("Microsoft.XMLHTTP")}else{if(window.XMLHttpRequest){httpObject=new XMLHttpRequest()}else{alert("Your browser does not support AJAX.");return null}}var postStr="FA=checkLogin";postStr+="&SID="+sessionID;postStr+="&caller="+caller;postStr+="&newPw="+newpw;httpObject.open("POST","checkLogin.cgi",true);httpObject.onreadystatechange=backCheckLogin;httpObject.setRequestHeader("Content-type","application/x-www-form-urlencoded");httpObject.send(postStr)}function backCheckLogin(){if(httpObject.readyState==4){var res=httpObject.responseText;var rv=res.substr(0,2);if(rv=="OK"){Modalbox.hide()}else{if(rv=="NO"){}else{if(rv=="DT"){}}}}};
