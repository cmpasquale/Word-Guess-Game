// use qnet-core

/* globals QN_GetMaxZ */

/*
  AUTHOR: John Freeman <jfreeman@e-quantum.com>
  
  Script:
    qn-upload.js

  Functions:
    QD_UploadPopup (vname);
    QD_UploadPopup_Done (status,filename,vname);
    QD_UploadPopup_Close ();
    QD_UploadPopup_Start (upsid,vname);
    QD_UploadPopup_Ping(upsid,vname);
    QD_UploadPopup_Parse(upsid,vname,txt);

  Callback Functions:
    QUP_DoneCallback (status,filename,ref);

  Edit:
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <script type="text/javascript" src="./javascript/qn-upload.js"></script>
*/

var QUP_PATH = '';
var QUP_DIST = '';
var QUP_REF = '';
var QUP_CLIENT = '';
var QUP_VTYPE = '';
var QUP_TID = '';

var QUP_TITLE = 'Upload a File';
var QUP_TITLE_BGCOLOR = '#0066cc';
var QUP_TITLE_COLOR = '#ffffff';
var QUP_TITLE_FONT = 'arial';
var QUP_TITLE_FONT_SIZE = '20px';
var QUP_TITLE_FONT_WEIGHT = 'bold';
var QUP_TITLE_FONT_STYLE = 'normal';

var QUP_PROGRESS = 'Upload Progress';
var QUP_PROG_COLOR = '#0066cc';
var QUP_PROG_FONT = 'arial';
var QUP_PROG_FONT_SIZE = '20px';
var QUP_PROG_FONT_WEIGHT = 'bold';
var QUP_PROG_FONT_STYLE = 'normal';
var QD_UP_PROG_BAR_COLOR = '#0066cc';

var QUP_RECEIVED = 'Received';
var QUP_RCVD_COLOR = '#0066cc';
var QUP_RCVD_FONT = 'arial';
var QUP_RCVD_FONT_SIZE = '13px';
var QUP_RCVD_FONT_WEIGHT = 'normal';
var QUP_RCVD_FONT_STYLE = 'normal';

var QUP_UPLOAD_DONE = 'Upload Done';
var QUP_DONE_COLOR = '#0066cc';
var QUP_DONE_FONT = 'arial';
var QUP_DONE_FONT_SIZE = '20px';
var QUP_DONE_FONT_WEIGHT = 'bold';
var QUP_DONE_FONT_STYLE = 'normal';

var QUP_FILE_TYPES = 'I~jpg~gif~pdf~png~jpeg';

// ------------------------------------------------------------------
function QD_UploadPopup (dist,path,ref,client,vtype,tid)
{
  QUP_DIST = dist;
  QUP_PATH = path;
  QUP_REF = ref;
  QUP_CLIENT = client;
  QUP_VTYPE = (typeof vtype != 'undefined') ? vtype : '';
  QUP_TID = (typeof tid != 'undefined') ? tid : '';

  if (QUP_VTYPE == 'fu')
  {
    QUP_FILE_TYPES = 'X~php~pl~exe~js~java~cgi';
  }

  var maxZ = parseInt(QN_GetMaxZ()) + 1;

  var divO = document.createElement('div');
  divO.setAttribute("id","divUpload_Overlay");
  divO.style.opacity = "0.8";
  divO.style.backgroundColor = "#CCCCCC";
  divO.style.position = "fixed";
  divO.style.width = "100%";
  divO.style.height = "100%";
  divO.style.left = "0px";
  divO.style.top = "0px";
  divO.style.zIndex = maxZ;
  document.body.appendChild(divO);

  maxZ += 1;

  var divUploadPopup = document.createElement('div');
  divUploadPopup.setAttribute('id','divUploadPopup');
  // divUploadPopup.setAttribute("class","divUploadPopup");
  divUploadPopup.style.backgroundColor = '#ffffff';
  divUploadPopup.style.border = '1px outset #666666';
  divUploadPopup.style.borderRadius = '10px';
  divUploadPopup.style.webkitBorderRadius = '10px';
  divUploadPopup.style.mozBorderRadius = '10px';
  divUploadPopup.style.color = '#0066cc';
  divUploadPopup.style.height = '200px';
  divUploadPopup.style.left = '25%';
  divUploadPopup.style.overflow = 'hidden';
  divUploadPopup.style.position = 'fixed';
  divUploadPopup.style.top = '30%';
  divUploadPopup.style.width = '600px';
  divUploadPopup.style.zIndex = maxZ;

  var divUploadTitle = document.createElement('div');
  divUploadTitle.style.width = '100%';
  divUploadTitle.style.color = QUP_TITLE_COLOR;
  divUploadTitle.style.backgroundColor = QUP_TITLE_BGCOLOR;
  divUploadTitle.style.padding = '4px';
  divUploadTitle.style.textAlign = 'center';
  divUploadTitle.style.fontFamily = QUP_TITLE_FONT;
  divUploadTitle.style.fontSize = QUP_TITLE_FONT_SIZE;
  divUploadTitle.style.fontWeight = QUP_TITLE_FONT_WEIGHT;
  divUploadTitle.style.fontStyle = QUP_TITLE_FONT_STYLE;
  divUploadTitle.style.height = '30px';
  divUploadTitle.innerHTML = QUP_TITLE;

  var divUploadClose = document.createElement('div');
  // divUploadClose.style.backgroundColor = '#990000';
  // divUploadClose.style.border = '1px solid #000';
  // divUploadClose.style.borderRadius = '5px';
  // divUploadClose.style.webkitBorderRadius = '5px';
  // divUploadClose.style.mozBorderRadius = '5px';
  divUploadClose.style.cursor = 'pointer';
  divUploadClose.style.marginRight = '8px';
  divUploadClose.style.padding = '1px 4px';
  divUploadClose.style.cssFloat = "right";
  divUploadClose.style.styleFloat = "right";

  var fONC = "QD_UploadPopup_Close ();";
  divUploadClose.onclick = new Function (fONC);

  var iUploadClose = document.createElement('i');
  iUploadClose.setAttribute('class','fa fa-times-circle fa-lg');
  iUploadClose.style.color = '#ffffff';
  divUploadClose.appendChild(iUploadClose);
  divUploadTitle.appendChild(divUploadClose);
  divUploadPopup.appendChild(divUploadTitle);

  var divUploadDebug = document.createElement('div');
  divUploadDebug.setAttribute('id','divUploadDebug');
  divUploadDebug.style.fontFamily = 'arial';
  divUploadDebug.style.fontSize = '15px';
  divUploadDebug.innerHTML = 'Debug';
  divUploadDebug.style.display = 'none';
  divUploadPopup.appendChild(divUploadDebug);

  var divUploadProgress = document.createElement('div');
  divUploadProgress.setAttribute('id','divUploadProgress');
  divUploadProgress.style.width = '400px';
  divUploadProgress.style.margin = '40px auto';
  divUploadProgress.style.display = 'none';

  var legendUploadProgress = document.createElement('div');
  legendUploadProgress.style.fontFamily = QUP_PROG_FONT;
  legendUploadProgress.style.fontSize = QUP_PROG_FONT_SIZE;
  legendUploadProgress.style.fontWeight = QUP_PROG_FONT_WEIGHT;
  legendUploadProgress.style.fontStyle = QUP_PROG_FONT_STYLE;
  legendUploadProgress.style.color = QUP_PROG_COLOR;
  legendUploadProgress.innerHTML = QUP_PROGRESS;
  divUploadProgress.appendChild(legendUploadProgress);

  var divUploadTrough = document.createElement('div');
  divUploadTrough.setAttribute('id','divUploadTrough');
  divUploadTrough.style.border = '1px solid #000000';
  divUploadTrough.style.height = '20px';
  divUploadTrough.style.display = 'block';
  divUploadTrough.style.backgroundColor = '#DDDDDD';

  var divUploadBar = document.createElement('div');
  divUploadBar.setAttribute('id','divUploadBar');
  divUploadBar.style.borderRight = '1px solid #000000';
  divUploadBar.style.width = '0%';
  divUploadBar.style.height = '20px';
  divUploadBar.style.backgroundColor = QD_UP_PROG_BAR_COLOR;

  divUploadTrough.appendChild(divUploadBar);
  divUploadProgress.appendChild(divUploadTrough);

  var divUploadStats = document.createElement('div');
  divUploadStats.style.fontFamily = QUP_RCVD_FONT;
  divUploadStats.style.fontSize = QUP_RCVD_FONT_SIZE;
  divUploadStats.style.fontWeight = QUP_RCVD_FONT_WEIGHT;
  divUploadStats.style.fontStyle = QUP_RCVD_FONT_STYLE;
  divUploadStats.style.color = QUP_RCVD_COLOR;
  var spanUploadStats = document.createElement('span');
  spanUploadStats.innerHTML = QUP_RECEIVED+' ';

  var spanUploadReceived = document.createElement('span');
  spanUploadReceived.setAttribute('id','spanUploadReceived');
  spanUploadReceived.innerHTML = '0';

  var spanUploadSlash = document.createElement('span');
  spanUploadSlash.innerHTML = '/';

  var spanUploadTotal = document.createElement('span');
  spanUploadTotal.setAttribute('id','spanUploadTotal');
  spanUploadTotal.innerHTML = '0';

  var spanUploadParen1 = document.createElement('span');
  spanUploadParen1.innerHTML = '(';

  var spanUploadPercent = document.createElement('span');
  spanUploadPercent.setAttribute('id','spanUploadPercent');
  spanUploadPercent.innerHTML = '0';

  var spanUploadParen2 = document.createElement('span');
  spanUploadParen2.innerHTML = '%)';

  var buttonUploadClose = document.createElement('button');
  buttonUploadClose.setAttribute('id','buttonUploadClose');
  buttonUploadClose.setAttribute('id','buttonUploadClose');

  fONC = "QD_UploadPopup_Close ();";
  buttonUploadClose.onclick = new Function (fONC);

  buttonUploadClose.innerHTML = QUP_UPLOAD_DONE;
  buttonUploadClose.style.display = 'none';
  buttonUploadClose.style.margin = '10px auto';
  buttonUploadClose.style.fontFamily = QUP_DONE_FONT;
  buttonUploadClose.style.fontSize = QUP_DONE_FONT_SIZE;
  buttonUploadClose.style.fontWeight = QUP_DONE_FONT_WEIGHT;
  buttonUploadClose.style.fontStyle = QUP_DONE_FONT_STYLE;
  buttonUploadClose.style.color = QUP_DONE_COLOR;

  divUploadStats.appendChild(spanUploadStats);
  divUploadStats.appendChild(spanUploadReceived);
  divUploadStats.appendChild(spanUploadSlash);
  divUploadStats.appendChild(spanUploadTotal);
  divUploadStats.appendChild(spanUploadParen1);
  divUploadStats.appendChild(spanUploadPercent);
  divUploadStats.appendChild(spanUploadParen2);
  divUploadProgress.appendChild(divUploadStats);
  divUploadProgress.appendChild(buttonUploadClose);
  divUploadPopup.appendChild(divUploadProgress);

  var iframeQD_UploadFile = document.createElement('iframe');
  iframeQD_UploadFile.setAttribute('id','iframeQD_UploadFile');
  iframeQD_UploadFile.setAttribute('name','iframeQD_UploadFile');
  iframeQD_UploadFile.setAttribute('src','qn-upload-file.cgi?FA=START&PATH='+QUP_PATH+'&DIST='+QUP_DIST+'&CLIENT='+QUP_CLIENT+'&VTYPE='+QUP_VTYPE+'&TID='+QUP_TID);
  iframeQD_UploadFile.setAttribute('frameBorder','0');
  iframeQD_UploadFile.setAttribute('scrolling','NO');
  iframeQD_UploadFile.style.width = "100%";
  iframeQD_UploadFile.style.height = "100%";
  iframeQD_UploadFile.style.border = "0px solid #fff";

  divUploadPopup.appendChild(iframeQD_UploadFile);

  document.body.appendChild(divUploadPopup);
}

// ------------------------------------------------------------------
function QD_UploadPopup_Done (status,filename)
{
  // alert('QD_UploadPopup_Done status='+status+' filename='+filename);
  if (typeof QUP_DoneCallback == 'function') 
  {
    QUP_DoneCallback(status,filename,QUP_REF); 
  }
}

// ------------------------------------------------------------------
function QD_UploadPopup_Close ()
{
  var divO = document.getElementById("divUpload_Overlay");
  if (divO)
  {
    divO.parentNode.removeChild(divO);
  }

  var divUploadPopup = document.getElementById("divUploadPopup");
  if (divUploadPopup)
  {
    divUploadPopup.parentNode.removeChild(divUploadPopup);
  }
}

// ------------------------------------------------------------------
function QD_UploadPopup_Start (upsid)
{
  var iframeQD_UploadFile = document.getElementById("iframeQD_UploadFile");
  if (iframeQD_UploadFile)
  {
    iframeQD_UploadFile.style.display = 'none';
  }

  var divUploadProgress = document.getElementById("divUploadProgress");
  if (divUploadProgress)
  {
    divUploadProgress.style.display = 'block';
  }

  setTimeout("QD_UploadPopup_Ping("+upsid+")", 1000);
}

// ------------------------------------------------------------------
function QD_UploadPopup_Ping(upsid) 
{
  var ajax = new XMLHttpRequest();

  ajax.onreadystatechange = function () 
  {
    if (ajax.readyState == 4) 
    {
      // alert(ajax.responseText);
      QD_UploadPopup_Parse(upsid,ajax.responseText);
    }
  };

  ajax.open("GET", "qn-upload-file.cgi?FA=ping&sessid="+upsid+"&PATH="+QUP_PATH+"&DIST="+QUP_DIST+"&CLIENT="+QUP_CLIENT+"&VTYPE="+QUP_VTYPE+"&TID="+QUP_TID+"&rand=" + Math.floor(Math.random()*99999), true);
  ajax.send(null);
}

// ------------------------------------------------------------------
function QD_UploadPopup_Parse(upsid,txt) 
{
  var spanReceived;
  var spanTotal;
  var spanPercent;
  var divUploadBar;

  if (txt == 'DONE')
  {
    spanTotal = document.getElementById("spanUploadTotal");
    if (spanTotal)
    {
      spanReceived = document.getElementById("spanUploadReceived");
      if (spanReceived)
      {
        spanReceived.innerHTML = spanTotal.innerHTML;
      }
    }
    spanPercent = document.getElementById("spanUploadPercent");
    if (spanPercent)
    {
      spanPercent.innerHTML = '100';
    }

    divUploadBar = document.getElementById("divUploadBar");
    if (divUploadBar)
    {
      divUploadBar.style.width = "100%";
    }

    var buttonUploadClose = document.getElementById("buttonUploadClose");
    if (buttonUploadClose)
    {
      buttonUploadClose.style.display = 'block';
    }
  }
  else
  {
    var divUploadDebug = document.getElementById("divUploadDebug");
    if (divUploadDebug)
    {
      divUploadDebug.innerHTML = upsid+" : " + txt;
    }

    // bytes_read:length:percent";
    var parts = txt.split(":");
    if (parts.length == 3) 
    {
      spanReceived = document.getElementById("spanUploadReceived");
      if (spanReceived)
      {
        spanReceived.innerHTML = parts[0];
      }
      spanTotal = document.getElementById("spanUploadTotal");
      if (spanTotal)
      {
        spanTotal.innerHTML = parts[1];
      }
      spanPercent = document.getElementById("spanUploadPercent");
      if (spanPercent)
      {
        spanPercent.innerHTML = parts[2];
      }

      divUploadBar = document.getElementById("divUploadBar");
      if (divUploadBar)
      {
        divUploadBar.style.width = parts[2]+"%";
      }
    }

    // Ping again!
    setTimeout("QD_UploadPopup_Ping("+upsid+")", 300);
  }
}
