/* globals getHTTPObject */
/* globals ActiveXObject */

/*
  AUTHOR: John Freeman <jfreeman@e-quantum.com>

  The following functions are available:

  addFormElement(formToAdd, name, value)
  compareNumbers(a, b)
  getHTTPObject()
  HTMLEncode(str)
  QN_GetMaxZ()
  QNET_CallAjax_POST(scriptName,callbackFunc,paramlist)
  qnet_escapeHTML(string);
  stripNodes(oEle)
  strToPlainText(inStr)
*/

// --------------------------------------------------------
function addFormElement(formToAdd, name, value)
{
  var newElement = document.createElement('input');
  newElement.type = 'hidden';
  newElement.name = name;
  newElement.value = value;
  formToAdd.appendChild(newElement);
}

// --------------------------------------------------------
function compareNumbers(a, b)
{
  return a - b;
}

// --------------------------------------------------------
function getHTTPObject()
{
  if (window.XMLHttpRequest) // code for IE7+, Firefox, Chrome, Opera, Safari
    { return(new XMLHttpRequest()); }
  else // code for IE6, IE5
    { return(new ActiveXObject("Microsoft.XMLHTTP")); }
}

// ------------------------------------------------------------------
function HTMLEncode(str)
{
  var i = str.length;
  var aRet = [];

  while (i--)
  {
    var iC = str.charCodeAt(i);
    if (iC < 65 || iC > 127 || (iC>90 && iC<97))
    {
      aRet[i] = '&#'+iC+';';
    }
    else
    {
      aRet[i] = str[i];
    }
  }

  return aRet.join('');
}

// --------------------------------------------------------
function HTMLEncode161 (str)
{
  // str = str.replace('•', '&#8226;');

  // return(str);

  var i = str.length;
  var aRet = [];

  while (i--)
  {
    var iC = str.charCodeAt(i);
    // if (iC < 65 || iC > 127 || (iC>90 && iC<97) && (iC != 160) && (iC != 38))
    if (iC > 160)
    {
      aRet[i] = '&#'+iC+';';
    }
    else
    {
      aRet[i] = str[i];
    }
  }

  return aRet.join('');
}

// --------------------------------------------------------
function QN_GetMaxZ()
{
  var elems = document.getElementsByTagName('div');
  var highest = 0;
  for (var i = 0; i < elems.length; i++)
  {
    var zindex = document.defaultView.getComputedStyle(elems[i], null).getPropertyValue("z-index");
    if ((zindex > highest) && (zindex != 'auto'))
    {
      highest = zindex;
    }
  }
  return highest;
}

// --------------------------------------------------------
function QNET_CallAjax_POST(scriptName,callbackFunc,paramlist,passthru)
{
  var ts = new Date();

  if (typeof paramlist === 'object') {
    paramlist.append('ts',ts.getTime());
  } else {
    paramlist += ((typeof paramlist != 'undefined')&&(paramlist !== '')) ? '&ts='+ts.getTime() : 'ts='+ts.getTime();
  }

  var httpObject = getHTTPObject();
  httpObject.open("POST",scriptName, true);
  httpObject.onreadystatechange = function() { if (httpObject.readyState==4) { callbackFunc(httpObject,passthru); } };
  if (typeof paramlist === 'object') {
    httpObject.setRequestHeader("Content-type", "multipart/form-data");
  } else {
    httpObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  }
  httpObject.send(paramlist);
}

// --------------------------------------------------------
function qnet_escapeHTML(string)
{
  var pre = document.createElement('pre');
  var text = document.createTextNode( string );
  pre.appendChild(text);
  return pre.innerHTML;
}

// --------------------------------------------------------
function stripNodes(oEle)
{
  if ( oEle.hasChildNodes() )
  {
    while ( oEle.childNodes.length >= 1 )
      { oEle.removeChild( oEle.firstChild ); }
  }
}

// ------------------------------------------------------------------
function strToPlainText(inStr)
{
  var outStr = '';
  if (inStr)
  {
    var el = document.createElement('div');
    el.innerHTML = unescape(inStr);
    // el.innerHTML = decodeURI(inStr);
    if (el.firstChild)
    {
      outStr = el.firstChild.data;
    }
  }
  return outStr;
}
