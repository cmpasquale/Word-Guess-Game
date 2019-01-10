// use qnet-core
// use scw.js

/* globals aHashEdit */
/* globals httpObject: true */
/* globals getHTTPObject */
/* globals kit_isEdit */
/* globals MagicZoomPlus */
/* globals strToPlainText */
/* globals escape */
/* globals QD_FieldRequired */
/* globals QNET_CallAjax_POST */
/* globals kit_SID */

/*
  AUTHOR: John Freeman <jfreeman@e-quantum.com>
  
  The following functions are available:

  aQDHash['QD_MSG_SelectVarNone']

  Include these:
  <link href="./magiczoomplus/magiczoomplus.css" rel="stylesheet" type="text/css" media="screen"/>
  <script src="./magiczoomplus/magiczoomplus.js" type="text/javascript"></script>
  <script type="text/javascript" src="./javascript/qdesign-detail.js"></script>

*/

var QD_Popup;
var aData;
var QD_QnetDomain = "";
var aQDHash = [];
var DataPreview = '';
var isPreviewDone = 0;
var IMG_ts = new Date();
var QD_No_File_Attached = 'No file attached';
var QDtrimSpaces = /^\s+|\s+$/;

// ------------------------------------------------------------------
function QD_KeyUp (event)
{
  var aVOptPair;
  if (typeof event.target.id !== 'undefined')
  {
    var id = event.target.id;
    var className = event.target.className;

    var aIdParts = id.split("-");
    if ((aIdParts[0] == 'divQDF')&&(className == 'QD_TextBox'))
    {
      var tText = event.target.textContent || event.target.innerText || "";
      var tLen = tText.length;

      LogConsole('QD_KeyUp 1 id:'+id+' className:'+className+' tLen:'+tLen);

      var aVOpts = [];

      if (typeof aQDHash[aIdParts[1]+'_VOpts'] != 'undefined')
      {
        aVOptPair = aQDHash[aIdParts[1]+'_VOpts'].split("~");
        var iVO = 0;
        for (iVO=0;iVO<aVOptPair.length;iVO++)
        {
          var aVOptsKV = aVOptPair[iVO].split("^");
          aVOpts[aVOptsKV[0]] = aVOptsKV[1];

          LogConsole('QD_KeyUp id:'+id+' aVOpts['+aVOptsKV[0]+']:'+aVOptsKV[1]);
        }
      }

      if (tLen > aVOpts.tbmax)
      {
        tLen = aVOpts.tbmax;

        event.target.innerHTML = tText.substring(0,aVOpts.tbmax);
      }

      var div = document.getElementById("divQDMAX-"+aIdParts[1]);
      if (div)
      {
        div.innerHTML = "("+tLen+" / "+aVOpts.tbmax+" "+aQDHash.QD_MSG_TextboxCharacters+")";
      }

      LogConsole('QD_KeyUp 2 id:'+id+' className:'+className+' tLen:'+tLen);

    }
  }
}

// ------------------------------------------------------------------
function QUP_DoneCallback (status,filename,ref)
{
  if (status == '200')
  {
    var divUploadFileName = document.getElementById("divQD-"+ref);
    if (divUploadFileName)
    {
      divUploadFileName.innerHTML = filename;
    }
  }
  else
  {
    window.alert('ERROR : '+filename);
    QD_UploadPopup_Close();
  }
}

// ------------------------------------------------------------------
function QD_OnImageLoad ()
{
  var imgSelected = document.getElementById("imgSelected");
  if (imgSelected)
  {
    var iH = imgSelected.offsetHeight;
    var iW = imgSelected.offsetWidth;

    if ((iH > 32)&&(iW > 32))
    {
      isPreviewDone = 1;
      LogConsole('Image Loaded H:'+iH+' iW:'+iW);
    }
  }
}

// ------------------------------------------------------------------
function QD_AdjustPopup (type)
{
  var divMsg;

  var divKitArea = document.getElementById("divKitArea");
  if (divKitArea)
  {
    var divPreviewArea = document.getElementById("divPreviewArea");
    if (!divPreviewArea)
    {
      divPreviewArea = document.createElement('div');
      divPreviewArea.setAttribute('id','divPreviewArea');
      divPreviewArea.setAttribute("class","PreviewArea");
      divPreviewArea.style.zIndex = '10000';

      var divInnerPreviewArea = document.createElement('div');
      divInnerPreviewArea.style.margin = "0 auto";
      divInnerPreviewArea.style.padding = "10px";
      divInnerPreviewArea.style.position = "relative";
      divInnerPreviewArea.style.textAlign = "center";

      divMsg = document.createElement('div');
      divMsg.setAttribute('id','divMsgPreviewTop');
      divMsg.style.display = "none";
      divMsg.innerHTML = '';
      divInnerPreviewArea.appendChild(divMsg);

      var divPreviewPageControls = document.createElement('div');
      divPreviewPageControls.setAttribute('id','divPreviewPageControls');
      divPreviewPageControls.style.padding = "5px";

      var aImgSelected = document.createElement('a');
      aImgSelected.setAttribute('id','aImgSelected');
      aImgSelected.setAttribute('class','MagicZoomPlus');
      aImgSelected.setAttribute('rel','disable-zoom:true;show-loading:true');
      aImgSelected.setAttribute('href','https://'+aQDHash.QNET_DOMAIN+'/cgi-bin/qn_images/ajax-loader-big.gif');

      var imgSelected = document.createElement('img');
      imgSelected.setAttribute('id','imgSelected');
      imgSelected.setAttribute('src','https://'+aQDHash.QNET_DOMAIN+'/cgi-bin/qn_images/ajax-loader-big.gif');

      var fONC = "QD_OnImageLoad()";
      imgSelected.onload = new Function (fONC);

      aImgSelected.appendChild(imgSelected);
      divInnerPreviewArea.appendChild(divPreviewPageControls);
      divInnerPreviewArea.appendChild(aImgSelected);

      divMsg = document.createElement('div');
      divMsg.setAttribute('id','divMsgPreviewBottom');
      divMsg.style.display = "none";
      divMsg.innerHTML = '';
      divInnerPreviewArea.appendChild(divMsg);
      divPreviewArea.appendChild(divInnerPreviewArea);
      divKitArea.parentNode.appendChild(divPreviewArea);

      MagicZoomPlus.start('aImgSelected');
    }
    var divKitAreaSub;
    if (divPreviewArea)
    {
      if (type == 1)
      {
        divPreviewArea.style.display = 'none';

        divKitAreaSub = document.getElementById("divKitAreaSub");
        if (divKitAreaSub)
        {
          divKitAreaSub.style.left = '50%';
          divKitAreaSub.style.marginLeft = '-400px';
          divPreviewArea.style.zIndex = '10001';
        }
        else
        {
          divKitArea.style.left = '50%';
          divKitArea.style.marginLeft = '-400px';
          divPreviewArea.style.zIndex = '10000';
        }
      }
      else if (type == 2)
      {
        divKitAreaSub = document.getElementById("divKitAreaSub");
        if (divKitAreaSub)
        {
          divKitAreaSub.style.left = '0px';
          divKitAreaSub.style.marginLeft = '5px';
          divPreviewArea.style.display = 'block';
          divPreviewArea.style.zIndex = '10001';
        }
        else
        {
          divKitArea.style.left = '0px';
          divKitArea.style.marginLeft = '5px';
          divPreviewArea.style.display = 'block';
          divPreviewArea.style.zIndex = '10000';
        }
      }

      // Template Preview Top Message
      var divMsgPreviewTop = document.getElementById("divMsgPreviewTop");
      if (divMsgPreviewTop)
      {
        if ((typeof aQDHash.QD_MSG_PreviewTop != 'undefined') && (aQDHash.QD_MSG_PreviewTop !== ''))
        {
          divMsgPreviewTop.style.display = "block";
          divMsgPreviewTop.innerHTML = aQDHash.QD_MSG_PreviewTop.replace(/\\"/g,'"');
        }
        else
        {
          divMsgPreviewTop.style.display = "none";
          divMsgPreviewTop.innerHTML = '';
        }
      }

      // Template Preview Bottom Message
      var divMsgPreviewBottom = document.getElementById("divMsgPreviewBottom");
      if (divMsgPreviewBottom)
      {
        if ((typeof aQDHash['QD_MSG_PreviewBottom'] != 'undefined') && (aQDHash['QD_MSG_PreviewBottom'] !== ''))
        {
          divMsgPreviewBottom.style.display = "block";
          divMsgPreviewBottom.innerHTML = aQDHash['QD_MSG_PreviewBottom'].replace(/\\"/g,'"');
        }
        else
        {
          divMsgPreviewBottom.style.display = "none";
          divMsgPreviewBottom.innerHTML = '';
        }
      }
    }
  }
}

// ------------------------------------------------------------------
function QD_CreatePDF (displayPDF,finalArtwork)
{
  var DataString = '';

  finalArtwork = finalArtwork || 'N';

  // Check for required QDesign fields
  if (typeof aQDHash['ReqList'] != 'undefined')
  {
    if (!QD_CheckRequiredFields())
    {
      return;
    }
  }

  MagicZoomPlus.update('aImgSelected', 'https://'+aQDHash["QNET_DOMAIN"]+'/cgi-bin/qn_images/ajax-loader-big.gif', 'https://'+aQDHash["QNET_DOMAIN"]+'/cgi-bin/qn_images/ajax-loader-big.gif', 'show-loading:true;');

  isPreviewDone = 0;
  DataString = QD_GetDataString (1);
  DataPreview = DataString;

  DataString = escape(DataString);
  DataString = DataString.replace(/%26nbsp%3B/g,'%20');
  DataString = DataString.replace(/\+/g,'%2B');

  var ts = new Date();
  IMG_ts = ts;

  var paramlist = 
    'DIST='+aQDHash['DIST']+'&TID='+aQDHash['TID']+'&WsID='+aQDHash['WsID']+'&UserID='+aQDHash['UserID']+'&FinalArtwork='+finalArtwork+
    '&vcDBName='+aQDHash['vcDBName']+'&displayPDF='+displayPDF+'&Data='+DataString;
  QNET_CallAjax_POST('qd-create-preview.pl',QD_CreatePDF_Return,paramlist);
}

// ------------------------------------------------------------------
function QD_CreatePDF_Return (httpObject)
{
  var response = httpObject.responseText;
  if (response !== '')
  {
    var ts = new Date();
    // alert('response='+response);
    aQDHash["PreviewUser"] = ts.getTime();
    QD_LoadPreviewPage(1);
    if (response == 2)
    {
      var imgDomain = aQDHash["QNET_DOMAIN"];
      if (aQDHash['vcDBName'] !== '')
      {
        var aParts = aQDHash['QNET_DOMAIN'].split("~");
        imgDomain = aParts[0]+'~'+aQDHash['vcDBName'];
      }

      var pdfLink = 'https://'+imgDomain+'/SVG/T'+aQDHash["TID"]+'/cGFX/T-'+aQDHash["TID"]+'-'+aQDHash['WsID']+'.pdf';
      if (aQDHash['WsID'] === 0)
      {
        pdfLink = 'https://'+imgDomain+'/SVG/T'+aQDHash["TID"]+'/T-'+aQDHash["TID"]+'.pdf';
      }

//       var pdfLink = '/SVG/T'+aQDHash["TID"]+'/cGFX/T-'+aQDHash["TID"]+'-'+aQDHash['WsID']+'.pdf';
      // if (aQDHash["PreviewUser"] > 0)
      // {
      // }

      window.open(pdfLink, '_blank');
    }
  }
}

// ------------------------------------------------------------------
function QDH_Search (type)
{
  var divQDHistoryLIST;

  if (type == 'INPUT')
  {
  }
  else
  {
    divQDHistoryLIST = document.getElementById('divQDHistoryLIST');
    if (divQDHistoryLIST)
    {
      if (divQDHistoryLIST.style.display != 'none')
      {
        divQDHistoryLIST.style.display = 'none';
        return;
      }
    }
  }

  var divHistorySelectText = document.getElementById('divHistorySelectText');
  if (divHistorySelectText)
  {
    LogConsole('QDH_Search : divHistorySelectText');

    var divHistorySelect = document.getElementById('divHistorySelect');
    if (divHistorySelect)
    {
      divQDHistoryLIST = document.getElementById('divQDHistoryLIST');
      if (divQDHistoryLIST)
      {
        var curleft = divHistorySelect.offsetLeft;
        var curtop = divHistorySelect.offsetTop;
        divQDHistoryLIST.style.left = curleft+"px";
        divQDHistoryLIST.style.top = (parseInt(curtop) + parseInt(divHistorySelect.style.height)) +"px";
        divQDHistoryLIST.style.backgroundColor = "#DDF1FD";
      }
    }

    LogConsole('QDH_Search : divHistorySelectText.innerHTML('+divHistorySelectText.innerHTML+') == QD_MSG_SelectFromHistory('+strToPlainText(aQDHash['QD_MSG_SelectFromHistory'])+')');

    if (divHistorySelectText.innerHTML == strToPlainText(aQDHash['QD_MSG_SelectFromHistory']))
    {
      divHistorySelectText.innerHTML = "";
      divHistorySelectText.setAttribute("contenteditable", true);
      divHistorySelectText.focus();
    }
    // alert('QDH_Search: '+inHistorySelect.value);

    var tSearch = divHistorySelectText.textContent || divHistorySelectText.innerText || "";

    var paramlist = 
      'DIST='+aQDHash['DIST']+'&TID='+aQDHash['TID']+'&UserID='+aQDHash['UserID']+'&SuppressHistYN='+aQDHash['SuppressHistYN']+
      '&SEARCH='+tSearch+'&CustID='+aQDHash['CustID'];

    QNET_CallAjax_POST('qd-search-history.pl',QDH_Search_Return,paramlist);
  }
}

// ------------------------------------------------------------------
function QDH_Search_Return (httpObject)
{
  var response = httpObject.responseText;
  if (response !== '')
  {
    var aRec = response.split("|VDATA|");

    var divForm = document.getElementById('kitTabArea2');
    if (divForm)
    {
      var divQDHistoryLIST = document.getElementById('divQDHistoryLIST');
      if (divQDHistoryLIST)
      {
        divQDHistoryLIST.innerHTML = aRec[2];
        divQDHistoryLIST.style.display = "block";
        divQDHistoryLIST.style.height = parseInt(aRec[1]*23)+"px";
      }
    }
  }
}

// ------------------------------------------------------------------
function QDH_SelectRecord (key)
{
  var paramlist = 
  'DIST='+aQDHash['DIST']+'&TID='+aQDHash['TID']+'&SID='+kit_SID+'&FA=SELECT&UserID='+aQDHash['UserID']+
  '&SuppressHistYN='+aQDHash['SuppressHistYN']+'&SEARCH='+key+'&CustID='+aQDHash['CustID'];
  QNET_CallAjax_POST('qd-search-history.pl',QDH_SelectRecord_Return,paramlist);
}

// ------------------------------------------------------------------
function QDH_SelectRecord_Return (httpObject)
{
  var aQDH_Font = [];
  var divQDText;
  var divQDTextFS;
  var inQDF;

  var response = httpObject.responseText;
  if (response !== '')
  {
    QD_ClearForm();

    var aVarPair = response.split("~~");
    var qdi=0;
    for (qdi=0;qdi<aVarPair.length;qdi++)
    {
      var aVar = aVarPair[qdi].split("^^");
      var aVarPart = aVar[0].split("|");
      var aVOpts = [];
      if (typeof aQDHash[aVarPart[0]+'_VOpts'] != 'undefined')
      {
        var aVOptPair = aQDHash[aVarPart[0]+'_VOpts'].split("~");
        var iVO = 0;
        for (iVO=0;iVO<aVOptPair.length;iVO++)
        {
          var aVOptsKV = aVOptPair[iVO].split("^");
          aVOpts[aVOptsKV[0]] = aVOptsKV[1];
        }
      }

      LogConsole('QDH_SelectRecord_Return : Pair:'+aVarPair[qdi]+' aVar[0]:'+aVar[0]+' aVar[1]:'+aVar[1]+' VType:'+aQDHash[aVarPart[0]+'_type']);

      if (typeof aQDHash[aVarPart[0]+'_type'] != 'undefined')
      {
        // alert ('aVarPart[0]='+aVarPart[0]+' aVar[0]='+aVar[0]);
        if (typeof aVarPart[1] != 'undefined') // Format Field / font-size
        {
          // alert ('Format field '+aVarPart[0]+' part='+aVarPart[1]);
          if (aVarPart[1] == 'fontsize')
          {
            divQDTextFS = document.getElementById('divQDTextFS-'+aVarPart[0]);
            if (divQDTextFS)
            {
              divQDTextFS.innerHTML = aVar[1];
            }

          }
          else
          {
            inQDF = document.getElementById('inQDF-'+aVarPart[0]+'-'+aVarPart[1]);
            if (inQDF)
            {
              aVar[1] = strToPlainText(aVar[1]);
              inQDF.value = aVar[1];
            }
          }
        }
        else if (aQDHash[aVarPart[0]+'_type'] == 'ui')
        {
          if (((typeof aVOpts["tbcol"] != 'undefined')&&(parseInt(aVOpts["tbcol"]) > 0))||
              ((typeof aVOpts["istbox"] != 'undefined')&&(parseInt(aVOpts["istbox"]) == 1)))
          {
            var divQDF = document.getElementById('divQDF-'+aVarPart[0]);
            if (divQDF)
            {
              divQDF.innerHTML = aVar[1];
            }
          }
          else
          {
            LogConsole('QDH_SelectRecord_Return : ui (before) : aVar[1]='+aVar[1]);
            // aVar[1] = strToPlainText(aVar[1]);
            var el = document.createElement('div');
            el.innerHTML = aVar[1];
            if (el.firstChild) 
            {
              aVar[1] = el.firstChild.data;
            }
            LogConsole('QDH_SelectRecord_Return : ui (after) : aVar[1]='+aVar[1]);

            inQDF = document.getElementById('inQDF-'+aVarPart[0]);
            if (inQDF)
            {
              inQDF.value = aVar[1];
            }
          }
        }
        else if (aQDHash[aVarPart[0]+'_type'] == 'cs')
        {
          QD_SelectFontColor (aVarPart[0],aVar[1]);
        }
        else if (aQDHash[aVarPart[0]+'_type'] == 'fs')
        {
          aQDH_Font = aVar[1].split("^");

          divQDText = document.getElementById('divQDText-'+aVarPart[0]);
          if (divQDText)
          {
            divQDText.innerHTML = aQDH_Font[0];
          }

          divQDTextFS = document.getElementById('divQDTextFS-'+aVarPart[0]);
          if (divQDTextFS)
          {
            divQDTextFS.innerHTML = aQDH_Font[1];
          }
        }
        else if (aQDHash[aVarPart[0]+'_type'] == 'fu')
        {
          var divQD = document.getElementById('divQD-'+aVarPart[0]);
          if (divQD)
          {
            divQD.innerHTML = aVar[1];
          }
        }
        else if (aQDHash[aVarPart[0]+'_type'] == 'is')
        {
          if (aVar[1] === '')
          {
            QD_ReturnImage (aVarPart[0],'');
          }
          else
          {
            QD_ReturnImage (aVarPart[0],aVar[1]);
          }
        }
        else if (aQDHash[aVarPart[0]+'_type'] == 'iu')
        {
          if (aVar[1] === '')
          {
            QD_ReturnImage (aVarPart[0],'');
          }
          else
          {
            QD_ReturnImage (aVarPart[0],'T-'+aQDHash["TID"]+'-'+aVar[1]);
          }
        }
        else if (aQDHash[aVarPart[0]+'_type'] == 'us')
        {
          divQDText = document.getElementById('divQDText-'+aVarPart[0]);
          if (divQDText)
          {
            divQDText.innerHTML = aVar[1];
          }
        }
        else if (aQDHash[aVarPart[0]+'_type'] == 'ul')
        {
          divQDText = document.getElementById('divQDText-'+aVarPart[0]);
          if (divQDText)
          {
            divQDText.innerHTML = aVar[1];
          }
        }
        else
        {

        }
      }
    }

    var divHistorySelectText = document.getElementById('divHistorySelectText');
    if (divHistorySelectText)
    {
      divHistorySelectText.innerHTML = aQDHash['QD_MSG_SelectFromHistory'].replace(/\\"/g,'"');
    }

    var divQDHistoryLIST = document.getElementById('divQDHistoryLIST');
    if (divQDHistoryLIST)
    {
      divQDHistoryLIST.style.display = "none";
    }
  }
}

// ------------------------------------------------------------------
function QDH_UpdateRecord ()
{
  var dataString = QD_GetDataString (2);

  dataString = dataString.replace(/\xa0/g,' '); // Convert to space
  // dataString = escape(dataString);
  // dataString = HTMLEncode161(dataString);
  dataString = escape(dataString);
  dataString = dataString.replace(/\+/g,'%2B');

  var paramlist = 
  'DIST='+aQDHash['DIST']+'&TID='+aQDHash['TID']+'&FA=UPDATE&UserID='+aQDHash['UserID']+
  '&DATA='+dataString+'&CustID='+aQDHash['CustID'];
  QNET_CallAjax_POST('qd-search-history.pl',QDH_UpdateRecord_Return,paramlist);
}

// ------------------------------------------------------------------
function QDH_UpdateRecord_Return (httpObject)
{
  var response = httpObject.responseText;
  if (response !== '')
  {
    window.alert('Record updated successfully!');
    // var aRec = response.split("|VDATA|");
    // var aVar = aRec[0].split("=");
  }
}

// ------------------------------------------------------------------
function QDLL_Search (type)
{
  var divQDHistoryLIST;

  if (type == 'INPUT')
  {
  }
  else
  {
    divQDHistoryLIST = document.getElementById('divQDHistoryLIST');
    if (divQDHistoryLIST)
    {
      if (divQDHistoryLIST.style.display != 'none')
      {
        divQDHistoryLIST.style.display = 'none';
        return;
      }
    }
  }
}

// ------------------------------------ isPDF 0=default 1=PDF 2=History
function QD_GetDataString (isPdf)
{
  var aVOpts = [];
  var divQDText;
  var divQD;
  var imgQD;
  var inQDF;
  var regex;
  var filename = '';
  var z = 0;
  var z2 = 0;

  var dataReturn = '';
  var aVar = aQDHash["FormOrder"].split("^");
  var qdi=0;
  for (qdi=0;qdi<aVar.length;qdi++)
  {
    aVOpts = [];

    if (typeof aQDHash[aVar[qdi]+'_VOpts'] != 'undefined')
    {
      var aVOptPair = aQDHash[aVar[qdi]+'_VOpts'].split("~");
      var iVO = 0;
      for (iVO=0;iVO<aVOptPair.length;iVO++)
      {
        var aVOptsKV = aVOptPair[iVO].split("^");
        aVOpts[aVOptsKV[0]] = aVOptsKV[1];
      }
    }

    if (aQDHash[aVar[qdi]+'_type'] == 'ui')
    {
      if (typeof aQDHash[aVar[qdi]+'_FormatField'] != 'undefined')
      {
        var isGood = 1;
        var iPart = 1;
        while (isGood)
        {
          isGood = 0;
          inQDF = document.getElementById('inQDF-'+aVar[qdi]+'-'+iPart);
          if (inQDF)
          {
            isGood = 1;
            if (dataReturn !== '')
            {
              dataReturn += '~~';
            }

            if (1 == isPdf)
            {
              dataReturn += 'qf';
              if (iPart < 10)
              {
                dataReturn += '0';
              }

              dataReturn += iPart+aVar[qdi]+'^^'+inQDF.value;
            }
            else
            {
              dataReturn += aVar[qdi]+'|'+iPart+'^^'+inQDF.value;
            }

            iPart++;
          }
        }
      }
      else if (((typeof aVOpts["tbcol"] != 'undefined')&&(parseInt(aVOpts["tbcol"]) > 0))||
               ((typeof aVOpts["istbox"] != 'undefined')&&(parseInt(aVOpts["istbox"]) == 1)))
      {
        var divQDF = document.getElementById('divQDF-'+aVar[qdi]);
        if (divQDF)
        {
          if (dataReturn !== '')
          {
            dataReturn += '~~';
          }

          // var tContent = divQDF.textContent || divQDF.innerText || "";
          var tContent = divQDF.innerHTML || "";

          regex = /(<([^>]+)>)/ig;

          tContent = tContent.replace(/<p><br><\/p>/g, '\n'); // empty line old ie
          tContent = tContent.replace(/<br>$/,''); // remove last <br> for edge/firefox
          tContent = tContent.replace(/<div><br><\/div>/g, '\n');
          tContent = tContent.replace(/^<div>/, ''); // remove first div at start for ie
          tContent = tContent.replace(/<\/div>/g, ''); // remove ending div tags
          tContent = tContent.replace(/<div>/g, '\n');
          tContent = tContent.replace(/<br>/g, '\n');
          tContent = tContent.replace(/<p>/g, ''); // remove ending div tags
          tContent = tContent.replace(/<\/p>/g, '\n');
          tContent = tContent.replace(regex,"");
          tContent = tContent.replace(/\&nbsp;/g,' ');
          tContent = tContent.replace(/ +$/,'');

          if (1 == isPdf)
          {
            dataReturn += 'qd00'+aVar[qdi]+'^^';
            dataReturn += tContent;
          }
          else
          {
            dataReturn += aVar[qdi]+'^^';
            dataReturn += tContent;
          }
        }
      }
      else
      {
        inQDF = document.getElementById('inQDF-'+aVar[qdi]);
        if (inQDF)
        {
          if (dataReturn !== '')
          {
            dataReturn += '~~';
          }

          if (1 == isPdf)
          {
            dataReturn += 'qd00'+aVar[qdi]+'^^'+inQDF.value;
          }
          else
          {
            dataReturn += aVar[qdi]+'^^'+inQDF.value;
          }
        }
      }
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'us')
    {
      divQDText = document.getElementById('divQDText-'+aVar[qdi]);
      if (divQDText)
      {
        if (dataReturn !== '')
        {
          dataReturn += '~~';
        }

        var tText = divQDText.textContent || divQDText.innerText || "";

        if (strToPlainText(aQDHash['QD_MSG_SelectVarNone']) == tText)
        {
          tText = '';
        }

        var aText = tText.split(" - ADD ");
        tText = aText[0];

        if (1 == isPdf)
        {
          dataReturn += 'qd00'+aVar[qdi]+'^^'+tText;
        }
        else
        {
          dataReturn += aVar[qdi]+'^^';
          dataReturn += tText;
        }
      }
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'ul')
    {
      divQDText = document.getElementById('divQDText-'+aVar[qdi]);
      if (divQDText)
      {
        if (dataReturn !== '')
        {
          dataReturn += '~~';
        }

        if (1 == isPdf)
        {
        }
        else
        {
          dataReturn += aVar[qdi]+'^^';
          dataReturn += divQDText.textContent || divQDText.innerText || "";
        }
      }
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'fu')
    {
      divQD = document.getElementById('divQD-'+aVar[qdi]);
      if (divQD)
      {
        if (dataReturn !== '')
        {
          dataReturn += '~~';
        }
        filename = divQD.textContent || divQD.innerText || "";

        dataReturn += aVar[qdi]+'^^';
        dataReturn += (filename != QD_No_File_Attached) ? filename : "";
      }
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'iu')
    {
      imgQD = document.getElementById('imgQD-'+aVar[qdi]);
      if (imgQD)
      {
        if (dataReturn !== '')
        {
          dataReturn += '~~';
        }

        regex = new RegExp("^T-" + aQDHash['TID'] + "-");
        filename= imgQD.src.replace(/^.*[\\\/]/, '');
        filename= filename.replace(regex, '');

        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(imgQD.src)[1];
        filename = filename.substr(0, filename.lastIndexOf('.')) || filename;
        var ext2 = re.exec(filename)[1]; // make sure an ext exists
        if (ext2 == 'undefined')
        {
          filename += '.' + ext;
        }

        if (filename == 'selectimg')
        {
          filename = '';
        }

        if (1 == isPdf)
        {
          // dataReturn += 'qi00'+aVar[qdi]+'^^'+filename;
          if (filename === '')
          {
            dataReturn += 'qi00'+aVar[qdi]+'^^';
          }
          else
          {
            dataReturn += 'qi00'+aVar[qdi]+'^^'+'T-'+aQDHash['TID']+'-'+filename;
          }
        }
        else
        {
          dataReturn += aVar[qdi]+'^^';
          dataReturn += filename;
        }
      }
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'is')
    {
      imgQD = document.getElementById('imgQD-'+aVar[qdi]);
      if (imgQD)
      {
        if (dataReturn !== '')
        {
          dataReturn += '~~';
        }

        filename= imgQD.src.replace(/^.*[\\\/]/, '');
        filename = filename.substr(0, filename.lastIndexOf('.')) || filename;
        if (filename == 'selectimg')
        {
          filename = '';
        }

        if (1 == isPdf)
        {
          dataReturn += 'qi00'+aVar[qdi]+'^^'+filename;
        }
        else
        {
          dataReturn += aVar[qdi]+'^^';
          dataReturn += filename;
        }
      }
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'cs')
    {
      divQDText = document.getElementById('divQDText-'+aVar[qdi]);
      if (divQDText)
      {
        var tColorDesc = divQDText.textContent || divQDText.innerText || "";
        var aFontColor = aQDHash[aVar[qdi]+'_SelectList'].split("!=!");
        for (z=0;z<aFontColor.length;z++)
        {
          var cdata = new QD_GetFontColorObject (aFontColor[z]);
          if ((tColorDesc == cdata.colorDesc)&&(tColorDesc != aQDHash['QD_MSG_SelectVarNone'])&&(tColorDesc !== ''))
          {
            if (dataReturn !== '')
            {
              dataReturn += '~~';
            }

            if (1 == isPdf)
            {
              dataReturn += 'cs00'+aVar[qdi]+'^^'+'colorDesc|'+cdata.colorDesc+'^R|'+cdata.colorR+'^G|'+cdata.colorG+'^B|'+cdata.colorB+'^Spot|'+cdata.colorSpot+'^Tint|'+cdata.colorTint+'^C|'+cdata.colorC+'^M|'+cdata.colorM+'^Y|'+cdata.colorY+'^K|'+cdata.colorK;
            }
            else
            {
              dataReturn += aVar[qdi]+'^^'+'colorDesc|'+cdata.colorDesc+'^R|'+cdata.colorR+'^G|'+cdata.colorG+'^B|'+cdata.colorB+'^Spot|'+cdata.colorSpot+'^Tint|'+cdata.colorTint+'^C|'+cdata.colorC+'^M|'+cdata.colorM+'^Y|'+cdata.colorY+'^K|'+cdata.colorK;
            }

            break;
          }
        }
      }
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'fs')
    {
      divQDText = document.getElementById('divQDText-'+aVar[qdi]);
      if (divQDText)
      {
        var fontSelect = '';
        if (divQDText.innerText)
        {
          fontSelect = divQDText.innerText;
        }
        else
        {
          fontSelect = divQDText.textContent;
        }

        if ((fontSelect != aQDHash['QD_MSG_SelectVarNone'])&&(fontSelect !== ''))
        {
          // Substitute Font Description with Font Family
          var aFontFamily = aQDHash[aVar[qdi]+'_SelectList'].split("!=!");
          for (z=0;z<aFontFamily.length;z++)
          {
            var fontFamily = '';
            var fontDesc = '';
            var fontKerning = '';

            var aFFP = aFontFamily[z].split("^");
            for (z2=0;z2<aFFP.length;z2++)
            {
              LogConsole('QD_GetDataString aFontFamily:'+aFontFamily[z]+' aFFP:'+aFFP[z2]);

              var aKV = aFFP[z2].split("|");
              if (aKV[0] == "fontFamily")
              {
                fontFamily = aKV[1];
              }
              else if (aKV[0] == "fontDesc")
              {
                fontDesc = aKV[1];
              }
              else if (aKV[0] == "kerning")
              {
                fontKerning = aKV[1];
              }
            }

            if (fontSelect == fontDesc)
            {
              fontSelect = fontFamily;
              break;
            }
          }

          if (dataReturn !== '')
          {
            dataReturn += '~~';
          }

          if (1 == isPdf)
          {
            dataReturn += 'fs00'+aVar[qdi]+'^^'+fontSelect;
            dataReturn += '~~'+aVar[qdi]+'^^'+aVar[qdi];
          }
          else
          {
            dataReturn += aVar[qdi]+'^^'+fontSelect;
          }

          if ((typeof aVOpts["fontsize"] != 'undefined')&&
              (aVOpts["fontsize"] == 'Y'))
          {
            var divQDTextFS = document.getElementById('divQDTextFS-'+aVar[qdi]);
            if (divQDTextFS)
            {
              var fontSizeSelect = '';
              if (divQDTextFS.innerText)
              {
                fontSizeSelect = divQDTextFS.innerText;
              }
              else
              {
                fontSizeSelect = divQDTextFS.textContent;
              }

              if ((fontSizeSelect != aQDHash['QD_MSG_SelectVarNone'])&&(fontSizeSelect !== ''))
              {
                if (1 == isPdf)
                {
                  if (dataReturn !== '')
                  {
                    dataReturn += '~~';
                  }

                  dataReturn += 'fsfs'+aVar[qdi]+'^^'+fontSizeSelect;
                }
                else if (2 == isPdf)
                {
                  if (dataReturn !== '')
                  {
                    dataReturn += '~~';
                  }

                  dataReturn += aVar[qdi]+'|fontsize^^'+fontSizeSelect;
                }
                else
                {
                  dataReturn += '^'+fontSizeSelect;
                }
              }
            }
          }
        }
      }
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'p2') // Data Widget
    {
      if (1 != isPdf)
      {
        divQD = document.getElementById('divQD-'+aVar[qdi]);
        if (divQD)
        {
          if (dataReturn !== '')
          {
            dataReturn += '~~';
          }

          dataReturn += aVar[qdi]+'^^'+divQD.innerHTML;
        }
      }
    }
  }

  return(dataReturn);
}

// ------------------------------------------------------------------
function QD_displayLinkVar (vname,type)
{
  var subid = '';
  if (kit_isSub)
  {
    subid = '_SUB';
  }

  var divQDLine;
  var divQD;
  var divList;
  var divQDText;
  var divQDLinkVarLIST;
  var tSearch = '';
  var paramlist = '';
  var curleftline;
  var curtopline;
  var curleft;
  var curtop;

  LogConsole ("QD_displayLinkVar("+vname+","+type+")");
  LogConsole ('QD_displayLinkVar : VOpts='+aQDHash[vname+'_VOpts']);

  var divForm = document.getElementById('kitTabArea2'+subid);
  if (divForm)
  {
    LogConsole ("QD_displayLinkVar : divForm OK");

    divQDLinkVarLIST = document.getElementById('divQDLinkVarLIST-'+vname);
    if (divQDLinkVarLIST)
    {
      if (type == 'BUTTON')
      {
        if (divQDLinkVarLIST.style.display != 'none')
        {
          divQDLinkVarLIST.style.display = 'none';
          return;
        }
      }

      if (type == 'CLICK')
      {
        if (divQDLinkVarLIST.style.display != 'none')
        {
          divQDLinkVarLIST.style.display = 'none';
          return;
        }
      }

      // if (divQDLinkVarLIST.style.display != 'block')
      // {
      //   divQDLinkVarLIST.style.display = "block";
      // }
      // else
      // {
      //   divQDLinkVarLIST.style.display = "none";
      // }
    }

    if ((typeof aQDHash[vname+'_VOpts'] != 'undefined')&&(aQDHash[vname+'_VOpts'].match(/autoc\^1/g)))
    {
      LogConsole ('QD_displayLinkVar : autoc OK');

      divQDLine = document.getElementById('divQDLine-'+vname);
      divQD = document.getElementById('divQD-'+vname);
      if ((divQDLine)&&(divQD))
      {
        curleftline = divQDLine.offsetLeft;
        curtopline = divQDLine.offsetTop;

        curleft = divQD.offsetLeft;
        curtop = divQD.offsetTop;

        LogConsole ("curleftline:"+curleftline+" curtopline:"+curtopline+" curleft:"+curleft+" curtop:"+curtop);

        curleft = curleft + curleftline;
        curtop = curtop + curtopline;

        divList = document.createElement('div');
        divList.setAttribute('id','divQDLinkVarLIST-'+vname);
        divList.setAttribute("class","QD_LinkVar_List");

        divList.style.top = (parseInt(curtop) + parseInt(divQD.style.height)) +"px";
        divList.style.left = curleft+"px";
        divList.style.display = "none";
        divList.style.backgroundColor = "#DDF1FD";

        divForm.appendChild(divList);

        divQDText = document.getElementById('divQDText-'+vname);
        if (divQDText)
        {
          if (divQDText.innerHTML == aQDHash['QD_MSG_SelectVarNone'])
          {
            divQDText.innerHTML = "";
            divQDText.focus();
          }

          tSearch = divQDText.textContent || divQDText.innerText || "";
          if (tSearch == aQDHash['QD_MSG_SelectVarNone'].replace(/\\"/g,'"'))
          {
            tSearch = '';
          }

          paramlist = 'DIST='+aQDHash['DIST']+'&TID='+aQDHash['TID']+'&UserID='+aQDHash['UserID']+'&VName='+vname+'&FA=AUTOC&SEARCH='+escape(tSearch);
          QNET_CallAjax_POST('qd-search-linkvar.pl',QD_displayLinkVar_Return,paramlist);
        }
      }
    }
    else
    {
      LogConsole ("QD_displayLinkVar : else not autoc");

      divQDLinkVarLIST = document.getElementById('divQDLinkVarLIST-'+vname);
      if (divQDLinkVarLIST)
      {
        LogConsole ("QD_displayLinkVar : if list");
      }
      else
      {
        divQDLine = document.getElementById('divQDLine-'+vname);
        divQD = document.getElementById('divQD-'+vname);
        if ((divQDLine)&&(divQD))
        {
          curleftline = divQDLine.offsetLeft;
          curtopline = divQDLine.offsetTop;

          curleft = divQD.offsetLeft;
          curtop = divQD.offsetTop;

          LogConsole ("curleftline:"+curleftline+" curtopline:"+curtopline+" curleft:"+curleft+" curtop:"+curtop);

          curleft = curleft + curleftline;
          curtop = curtop + curtopline;

          divList = document.createElement('div');
          divList.setAttribute('id','divQDLinkVarLIST-'+vname);
          divList.setAttribute("class","QD_LinkVar_List");

          divList.style.top = (parseInt(curtop) + parseInt(divQD.style.height)) +"px";
          divList.style.left = curleft+"px";
          divList.style.display = "none";
          divList.style.backgroundColor = "#DDF1FD";

          divForm.appendChild(divList);
        }
      }

      divQDText = document.getElementById('divQDText-'+vname);
      if (divQDText)
      {
        if (divQDText.innerHTML == aQDHash['QD_MSG_SelectFromHistory'])
        {
          divQDText.innerHTML = "";
          divQDText.focus();
        }

        tSearch = divQDText.textContent || divQDText.innerText || "";

        paramlist = 'DIST='+aQDHash['DIST']+'&TID='+aQDHash['TID']+'&UserID='+aQDHash['UserID']+'&VName='+vname+'&SEARCH='+escape(tSearch);
        QNET_CallAjax_POST('qd-search-linkvar.pl',QD_displayLinkVar_Return,paramlist);
      }
    }
  }
}

// ------------------------------------------------------------------
function QD_displayLinkVar_Return (httpObject)
{
  var subid = '';
  if (kit_isSub)
  {
    subid = '_SUB';
  }

  LogConsole('QD_displayLinkVar_Return : START');
  var response = httpObject.responseText;

  if (response !== '')
  {
    var aRec = response.split("|VDATA|");
    var aVar = aRec[0].split("=");

    var divForm = document.getElementById('kitTabArea2'+subid);
    if (divForm)
    {
      var divQDLinkVarLIST = document.getElementById('divQDLinkVarLIST-'+aVar[1]);
      if (divQDLinkVarLIST)
      {
        divQDLinkVarLIST.innerHTML = aRec[2];
        divQDLinkVarLIST.style.display = "block";

        if (parseInt(aRec[3]) > 1)
        {
          divQDLinkVarLIST.style.height = ((parseInt(aRec[1])*24)+35)+"px";
        }
        else
        {
          divQDLinkVarLIST.style.height = (parseInt(aRec[1])*24)+"px";
        }
      }
    }
  }
}

// ------------------------------------------------------------------
function QD_displayLinkVarPage (vname, pagenum)
{
  LogConsole('QD_displayLinkVarPage : vname='+vname+' pagenum='+pagenum);

  var divQDText = document.getElementById('divQDText-'+vname);
  if (divQDText)
  {
    if (divQDText.innerHTML == aQDHash['QD_MSG_SelectVarNone'])
    {
      divQDText.innerHTML = "";
      divQDText.focus();
    }

    var tSearch = divQDText.textContent || divQDText.innerText || "";
    if (tSearch == aQDHash['QD_MSG_SelectVarNone'].replace(/\\"/g,'"'))
    {
      tSearch = '';
    }

    var paramlist = 'DIST='+aQDHash['DIST']+'&TID='+aQDHash['TID']+'&UserID='+aQDHash['UserID']+'&VName='+vname+'&FA=AUTOC&SEARCH='+escape(tSearch)+'&PAGE='+pagenum;
    QNET_CallAjax_POST('qd-search-linkvar.pl',QD_displayLinkVar_Return,paramlist);
  }
}

// ------------------------------------------------------------------
function QD_SelectLinkVarItem (vname, id)
{
  LogConsole('QD_SelectLinkVarItem : vname='+vname+' id='+id);

  var divQDTextID = document.getElementById('divQD-'+vname+'-'+id);
  var divQDText = document.getElementById('divQDText-'+vname);
  if ((divQDText)&&(divQDTextID))
  {
    var selectedText = divQDTextID.textContent;
    if (selectedText === '')
    {
      selectedText = divQDTextID.innerText;
    }

    divQDText.textContent = selectedText;
    divQDText.innerText = selectedText;
  }

  var divQDLinkVarLIST = document.getElementById('divQDLinkVarLIST-'+vname);
  if (divQDLinkVarLIST)
  {
    divQDLinkVarLIST.style.display = "none";
  }

  var paramlist = 'DIST='+aQDHash['DIST']+'&FA=SELECT&TID='+aQDHash['TID']+'&UserID='+aQDHash['UserID']+'&VName='+vname+'&SEARCH='+id;
  QNET_CallAjax_POST('qd-search-linkvar.pl',QD_SelectLinkVarItem_Return,paramlist);
}

// ------------------------------------------------------------------
function QD_SelectLinkVarItem_Return (httpObject)
{
  var inputObj;
  var tValue = '';
  var aVOpts = [];

  var response = httpObject.responseText;
  if (response !== '')
  {
    var aRec = response.split("|VDATA|");
    var aLV = aRec[2].split("~~");
    var qdi=0;
    for (qdi=0;qdi<aLV.length;qdi++)
    {
      aVOpts = [];

      var aKV = aLV[qdi].split("^^");
      var aKVF = aKV[0].split("|");
      var vname = aKV[0];
      var iPart = 0;

      if (aKVF.length > 1) // Format
      {
        vname = aKVF[0];
        iPart = aKVF[1];
      }

      if (typeof aQDHash[vname+'_VOpts'] != 'undefined')
      {
        var aVOptPair = aQDHash[vname+'_VOpts'].split("~");
        var iVO = 0;
        for (iVO=0;iVO<aVOptPair.length;iVO++)
        {
          var aVOptsKV = aVOptPair[iVO].split("^");
          aVOpts[aVOptsKV[0]] = aVOptsKV[1];
        }
      }

      if (typeof aQDHash[vname+'_type'] != 'undefined')
      {
        if (typeof aKV[1] == 'undefined')
        {
          aKV[1] = '';
        }

        if (aQDHash[vname+'_type'] == 'ui')
        {
          tValue = aKV[1].replace(/(&amp;)/g,'&');
          tValue = tValue.replace(/(&nbsp;)/g,' ');

          if (((typeof aVOpts["tbcol"] != 'undefined')&&(parseInt(aVOpts["tbcol"]) > 0))||
              ((typeof aVOpts["istbox"] != 'undefined')&&(parseInt(aVOpts["istbox"]) == 1)))
          {
            var divQDF = document.getElementById('divQDF-'+vname);
            if (divQDF)
            {
              divQDF.innerHTML = aKV[1];
            }
          }
          else if (typeof aQDHash[vname+'_FormatField'] != 'undefined')
          {
            if (iPart > 0)
            {
              inputObj = document.getElementById('inQDF-'+vname+'-'+iPart);
              if (inputObj)
              {
                inputObj.value = strToPlainText(tValue);
              }
            }
            else
            {
              inputObj = document.getElementById('inQDF-'+vname+'-1');
              if (inputObj)
              {
                inputObj.value = strToPlainText(tValue);
              }
            }
          }
          else
          {
            inputObj = document.getElementById('inQDF-'+vname);
            if (inputObj)
            {
              inputObj.value = strToPlainText(tValue);
            }
          }
        }
        else if (aQDHash[vname+'_type'] == 'us')
        {
          var divQDText = document.getElementById('divQDText-'+vname);
          if (divQDText)
          {
            divQDText.innerHTML = aKV[1];
          }
        }
        else if (aQDHash[vname+'_type'] == 'is')
        {
          (aKV[1] === '') ? QD_ReturnImage (vname,'') : QD_ReturnImage (vname,aKV[1]);
        }
        else if (aQDHash[vname+'_type'] == 'iu')
        {
          (aKV[1] === '') ? QD_ReturnImage (vname,'') : QD_ReturnImage (vname,'T-'+aQDHash["TID"]+'-'+aKV[1]);
        }
      }
    }
  }
}

// ------------------------------------------------------------------
function QD_CheckRequiredFields ()
{
  var inputUI;
  var divIU;
  var tText = '';

  // Check for required QDesign fields
  if (typeof aQDHash['ReqList'] != 'undefined')
  {
    var aReqList = aQDHash['ReqList'].split("^");
    var i=0;
    for (i=0;i<aReqList.length;i++)
    {
      if (aQDHash[aReqList[i]+'_type'] == 'ui')
      {
        if (typeof aQDHash[aReqList[i]+'_FormatField'] != 'undefined')
        {
          var isGood = 1;
          var iPart = 1;
          while (isGood)
          {
            isGood = 0;
            inputUI = document.getElementById('inQDF-'+aReqList[i]+'-'+iPart);
            if (inputUI)
            {
              isGood = 1;
              if (inputUI.value.replace(QDtrimSpaces,'') === '')
              {
                window.alert (strToPlainText(aQDHash[aReqList[i]+'_VPrompt'])+' '+QD_FieldRequired);
                inputUI.focus();
                return(0);
              }

              iPart++;
            }
          }
        }
        else
        {
          inputUI = document.getElementById('inQDF-'+aReqList[i]);
          if (inputUI)
          {
            if (inputUI.value.replace(QDtrimSpaces,'') === '')
            {
              window.alert (strToPlainText(aQDHash[aReqList[i]+'_VPrompt'])+' '+QD_FieldRequired);
              inputUI.focus();
              return(0);
            }
          }
        }
      }
      else if (aQDHash[aReqList[i]+'_type'] == 'ul')
      {
        var divUL = document.getElementById('divQDText-'+aReqList[i]);
        if (divUL)
        {
          tText = divUL.textContent || divUL.innerText || "";

          if ((tText.replace(QDtrimSpaces,'') === '')||(tText.replace(QDtrimSpaces,'') == aQDHash['QD_MSG_SelectVarNone']))
          {
            window.alert (strToPlainText(aQDHash[aReqList[i]+'_VPrompt'])+' '+QD_FieldRequired);
            inputUI.focus();
            return(0);
          }
        }
      }
      else if (aQDHash[aReqList[i]+'_type'] == 'us')
      {
        var divUS = document.getElementById('divQDText-'+aReqList[i]);
        if (divUS)
        {
          tText = divUS.textContent || divUS.innerText || "";

          if ((tText.replace(QDtrimSpaces,'') === '')||(tText.replace(QDtrimSpaces,'') == aQDHash['QD_MSG_SelectVarNone']))
          {
            window.alert (strToPlainText(aQDHash[aReqList[i]+'_VPrompt'])+' '+QD_FieldRequired);
            inputUI.focus();
            return(0);
          }
        }
      }
      else if (aQDHash[aReqList[i]+'_type'] == 'iu')
      {
        divIU = document.getElementById('divITQD-'+aReqList[i]);
        if (divIU)
        {
          if (divIU.style.display != 'none')
          {
            window.alert (strToPlainText(aQDHash[aReqList[i]+'_VPrompt'])+' is required.');
            return(0);
          }
        }
      }
      else if (aQDHash[aReqList[i]+'_type'] == 'is')
      {
        divIU = document.getElementById('divITQD-'+aReqList[i]);
        if (divIU)
        {
          if (divIU.style.display != 'none')
          {
            window.alert (strToPlainText(aQDHash[aReqList[i]+'_VPrompt'])+' is required.');
            return(0);
          }
        }
      }
      else if (aQDHash[aReqList[i]+'_type'] == 'cs')
      {
        var divCS = document.getElementById('divQDText-'+aReqList[i]);
        if (divCS)
        {
          tText = divCS.textContent || divCS.innerText || "";
          // if ((tText.trim() == '')||(tText.trim().toLowerCase() == 'none'))
          if ((tText.replace(QDtrimSpaces,'') === '')||(tText.replace(QDtrimSpaces,'') == aQDHash['QD_MSG_SelectVarNone']))
          {
            window.alert (strToPlainText(aQDHash[aReqList[i]+'_VPrompt'])+' '+QD_FieldRequired);
            return(0);
          }
        }
      }
      else if (aQDHash[aReqList[i]+'_type'] == 'fs')
      {
        var divFS = document.getElementById('divQDText-'+aReqList[i]);
        if (divFS)
        {
          tText = divFS.textContent || divFS.innerText || "";
          if ((tText.replace(QDtrimSpaces,'') === '')||(tText.replace(QDtrimSpaces,'') == aQDHash['QD_MSG_SelectVarNone']))
          {
            window.alert (strToPlainText(aQDHash[aReqList[i]+'_VPrompt'])+' is required.');
            return(0);
          }
        }

        divFS = document.getElementById('divQDTextFS-'+aReqList[i]);
        if (divFS)
        {
          tText = divFS.textContent || divFS.innerText || "";
          if ((tText.replace(QDtrimSpaces,'') === '')||(tText.replace(QDtrimSpaces,'') == aQDHash['QD_MSG_SelectVarNone']))
          {
            window.alert (strToPlainText(aQDHash[aReqList[i]+'_VPrompt'])+' "Size" '+QD_FieldRequired);
            return(0);
          }
        }
      }
      else
      {
        // alert(aReqList[i]+' type='+aQDHash[aReqList[i]+'_type']);
      }
    }
  }

  return(1);
}

// ------------------------------------------------------------------
function QD_displayCombobox (vname,type)
{
  var subid = '';
  if (kit_isSub)
  {
    subid = '_SUB';
  }

  var divForm = document.getElementById('kitTabArea2'+subid);
  if (divForm)
  {
    // Close all open drop down lists
    var aFV = aQDHash["FormOrder"].split("^");
    var qdi=0;
    for (qdi=0;qdi<aFV.length;qdi++)
    {
      if (aQDHash[aFV[qdi]+'_type'] == 'us')
      {
        if (aFV[qdi] != vname)
        {
          var divLIST = document.getElementById('divQDComboboxLIST-'+aFV[qdi]);
          if (divLIST)
          {
            divLIST.style.display = "none";
          }
        }
      }
    }

    var divQDComboboxLIST = document.getElementById('divQDComboboxLIST-'+vname);
    if (divQDComboboxLIST)
    {
      if (type == 'BUTTON')
      {
        if (divQDComboboxLIST.style.display != 'none')
        {
          divQDComboboxLIST.style.display = 'none';
          return;
        }
      }

      if (type == 'CLICK')
      {
        if (divQDComboboxLIST.style.display != 'none')
        {
          divQDComboboxLIST.style.display = 'none';
          return;
        }
      }

      if (divQDComboboxLIST.style.display != 'block')
      {
        divQDComboboxLIST.style.display = "block";
      }
      else
      {
        divQDComboboxLIST.style.display = "none";
      }

      var oPFH = divForm.parentNode.offsetHeight;
      var oPST = divForm.parentNode.scrollTop;
      // var oFH = divForm.offsetHeight;
      // var oH = divQDComboboxLIST.offsetHeight;
      var oT = divQDComboboxLIST.offsetTop;

      // LogConsole('oFH:'+oFH+' oH:'+oH+' oT:'+oT+' oPFH:'+oPFH+' oPST:'+oPST);
      if ((oPST + oT + 100) > (oPST + oPFH))
      {
        divForm.parentNode.scrollTop += 100; 
      }
    }
    else
    {
      var divQDLine = document.getElementById('divQDLine-'+vname);
      var divQD = document.getElementById('divQD-'+vname);
      if ((divQDLine)&&(divQD))
      {
        var curleftline = divQDLine.offsetLeft;
        var curtopline = divQDLine.offsetTop;

        var curleft = divQD.offsetLeft;
        var curtop = divQD.offsetTop;

        LogConsole ("QD_displayCombobox curleftline:"+curleftline+" curtopline:"+curtopline+" curleft:"+curleft+" curtop:"+curtop);

        curleft = curleft + curleftline;
        curtop = curtop + curtopline;

        var divList = document.createElement('div');
        divList.setAttribute('id','divQDComboboxLIST-'+vname);
        divList.setAttribute("class","QD_Combo_List");

        divList.style.top = (parseInt(curtop) + parseInt(divQD.style.height)) +"px";
        divList.style.left = curleft+"px";
        divList.style.display = "none";
        divList.style.backgroundColor = "#DDF1FD";

        divForm.appendChild(divList);

        var divQDText = document.getElementById('divQDText-'+vname);
        if (divQDText)
        {
          if (divQDText.innerHTML == aQDHash['QD_MSG_SelectFromHistory'])
          {
            divQDText.innerHTML = "";
            divQDText.focus();
          }

          var tSearch = divQDText.textContent || divQDText.innerText || "";

          var paramlist = 'DIST='+aQDHash['DIST']+'&TID='+aQDHash['TID']+'&UserID='+aQDHash['UserID']+'&VName='+vname+'&SEARCH='+tSearch;
          if ((typeof aQDHash['vcDBName'] != 'undefined')&&(aQDHash['vcDBName'] !== ''))
          {
            paramlist = 'DIST='+aQDHash['vcDBName']+'&TID='+aQDHash['TID']+'&UserID='+aQDHash['UserID']+'&VName='+vname+'&SEARCH='+tSearch;
          }

          QNET_CallAjax_POST('qd-search-combobox.pl',QD_displayCombobox_Return,paramlist);
        }
      }
    }
  }
}

// ------------------------------------------------------------------
function QD_displayCombobox_Return (httpObject)
{
  var response = httpObject.responseText;
  if (response !== '')
  {
    // alert('response='+response);
    var aRec = response.split("|VDATA|");
    var aVar = aRec[0].split("=");

    var divForm = document.getElementById('kitTabArea2');
    if (divForm)
    {
      var divQDComboboxLIST = document.getElementById('divQDComboboxLIST-'+aVar[1]);
      if (divQDComboboxLIST)
      {
        divQDComboboxLIST.innerHTML = aRec[2];
        divQDComboboxLIST.style.display = "block";
        divQDComboboxLIST.style.height = parseInt(aRec[1]*23)+"px";

        var oPFH = divForm.parentNode.offsetHeight;
        var oPST = divForm.parentNode.scrollTop;
        // var oFH = divForm.offsetHeight;
        // var oH = divQDComboboxLIST.offsetHeight;
        var oT = divQDComboboxLIST.offsetTop;

        if ((oPST + oT + 100) > (oPST + oPFH))
        {
          divForm.parentNode.scrollTop += 100; 
        }
      }
    }
  }
}

// ------------------------------------------------------------------
function QD_SelectComboboxItem (vname, selectedText)
{
  var divQDText = document.getElementById('divQDText-'+vname);
  if (divQDText)
  {
    divQDText.textContent = selectedText;
    divQDText.innerText = selectedText;
  }

  var divQDComboboxLIST = document.getElementById('divQDComboboxLIST-'+vname);
  if (divQDComboboxLIST)
  {
    divQDComboboxLIST.style.display = "none";
  }
}

// ------------------------------------------------------------------
function QD_CreateForm (divForm,aData)
{
  var aVOpts = [];
  var aFontPart = [];
  var aReqList;
  var fONC = '';
  var fONKU = '';
  var fONMOUT = '';
  var fONMOVER = '';
  var divF;
  var inF;
  var imgF;
  var divClear;
  var divP;
  var divBlock;
  var divMsg;
  var iVO;
  var aVOptPair;
  var aVOptsKV;
  var iC = 0;
  var iCKV = 0;

  if (typeof aQDHash['ReqList'] != 'undefined')
  {
    aReqList = aQDHash['ReqList'].split("^");
  }

  var divPreviewPageControls = document.getElementById('divPreviewPageControls');
  if (divPreviewPageControls)
  {
    var PageControlHtml = '';
    if (aData["PageCnt"] > 1)
    {
      var iP = 1;
      for (iP=1;iP<=aData["PageCnt"];iP++)
      {
        if (typeof aData['Page'+iP] != 'undefined')
        {
          if (iP > 1)
          {
            PageControlHtml += '<span style="padding: 0 5px;">|</span>';
          }

          PageControlHtml += '<a href="javascript:QD_LoadPreviewPage(\''+iP+'\')" style="text-decoration:none;">'+iP+'</a>';
        }
      }
    }

    divPreviewPageControls.innerHTML = PageControlHtml;
  }

  // QD_LoadPreviewPage('1');

  // Template Form Top Message
  if ((typeof aQDHash['QD_MSG_FormTop'] != 'undefined') && (aQDHash['QD_MSG_FormTop'] !== ''))
  {
    divMsg = document.createElement('div');
    divMsg.innerHTML = aQDHash['QD_MSG_FormTop'].replace(/\\"/g,'"');
    divForm.appendChild(divMsg);
  }

  // Create History Select
  if ((typeof aQDHash['SuppressHistYN'] != 'undefined') && (aQDHash['SuppressHistYN'] != 'Y'))
  {
    divP = document.createElement('div');
    divP.setAttribute('id','divHistoryPrompt');
    divP.setAttribute("class","kitPropertyP");
    divP.style.margin = "5px 1px 1px 5px";

    divP.innerHTML = aQDHash['HistoryPrompt'];
    divForm.appendChild(divP);

    var divHistLine = document.createElement('div');

    var divHist = document.createElement('div');
    divHist.setAttribute('id','divHistorySelect');
    divHist.setAttribute("class","QD_History_Select");
    divHist.style.height = '26px';

    // var fONC = "QDH_Search()";
    // divHist.onclick = new Function (fONC);

    var divHistT = document.createElement('div');
    divHistT.setAttribute('id','divHistorySelectText');
    divHistT.setAttribute("class","QD_History_Text");
    divHistT.setAttribute("contenteditable","false");
    divHistT.innerHTML = aQDHash['QD_MSG_SelectFromHistory'].replace(/\\"/g,'"');

    fONKU = "QDH_Search('INPUT')";
    divHistT.onkeyup = new Function (fONKU);

    fONC = "QDH_Search('')";
    divHistT.onclick = new Function (fONC);

    divHist.appendChild(divHistT);

    var divHistA = document.createElement('div');
    divHistA.setAttribute('id','divHistoryArrow');
    divHistA.setAttribute("class","QD_History_Arrow");

    var imgHistA = document.createElement('img');
    imgHistA.setAttribute('id','imgHistoryArrow');
    imgHistA.setAttribute('src','./qn_images/dropdown-arrow.jpg');
    imgHistA.setAttribute('alt',aQDHash['QD_MSG_SelectFromHistory'].replace(/\\"/g,'"'));
    imgHistA.style.height = '100%';
    imgHistA.style.cursor = 'pointer';

    fONMOVER = "this.src='./qn_images/dropdown-arrow-on.jpg'";
    imgHistA.onmouseover = new Function (fONMOVER);

    fONMOUT = "this.src='./qn_images/dropdown-arrow.jpg'";
    imgHistA.onmouseout = new Function (fONMOUT);

    fONC = "QDH_Search('BUTTON')";
    imgHistA.onclick = new Function (fONC);

    divHistA.appendChild(imgHistA);
    divHist.appendChild(divHistA);
    divHistLine.appendChild(divHist);

    // Update to History Option
    if ((typeof aQDHash['QD_AllowHistoryYN'] != 'undefined') && 
        (aQDHash['QD_AllowHistoryYN'] == 'Y') || 
        ((typeof aQDHash["QDEDIT"] != 'undefined')&&(aQDHash["QDEDIT"] == 1)))
    {
      var divUpdateHistory = document.createElement('div');
      if (divUpdateHistory)
      {
        divUpdateHistory.setAttribute("class","QD_UpdateHistoryButton");
        divUpdateHistory.style.cursor = 'pointer';
        divUpdateHistory.innerHTML = aQDHash['QDH_BLABEL'];

        fONC = "QDH_UpdateRecord();";
        divUpdateHistory.onclick = new Function (fONC);

        divHistLine.appendChild(divUpdateHistory);
      }
    }

    var divHistClear = document.createElement('div');
    divHistClear.style.clear = "both";
    divHistLine.appendChild(divHistClear);

    divForm.appendChild(divHistLine);

    var divList = document.createElement('div');
    divList.setAttribute('id','divQDHistoryLIST');
    divList.setAttribute("class","QD_History_List");

    // divList.style.top = (parseInt(curtop) + parseInt(divHistorySelect.style.height)) +"px";
    // divList.style.left = curleft+"px";
    divList.style.zIndex = '10000';
    divList.style.display = "none";

    // Add List Items
    divList.innerHTML = "Hello";
    divForm.appendChild(divList);

    // Template After History Message
    if ((typeof aQDHash['QD_MSG_AfterHistory'] != 'undefined') && (aQDHash['QD_MSG_AfterHistory'] !== ''))
    {
      divMsg = document.createElement('div');
      divMsg.innerHTML = aQDHash['QD_MSG_AfterHistory'].replace(/\\"/g,'"');
      divForm.appendChild(divMsg);
    }
  }

  // alert('FormOrder='+aData["FormOrder"]);
  var linkvarViewOnly = '';
  var linkvarHidden = '';

  var aVar = aData["FormOrder"].split("^");
  var qdi=0;

  for (qdi=0;qdi<aVar.length;qdi++)
  {
    aVOpts = [];

    if (typeof aQDHash[aVar[qdi]+'_VOpts'] != 'undefined')
    {
      aVOptPair = aQDHash[aVar[qdi]+'_VOpts'].split("~");
      iVO = 0;
      for (iVO=0;iVO<aVOptPair.length;iVO++)
      {
        aVOptsKV = aVOptPair[iVO].split("^");
        aVOpts[aVOptsKV[0]] = aVOptsKV[1];
      }
    }

    if (aQDHash[aVar[qdi]+'_type'] == 'ul') // Linked Variable
    {
      if (typeof aVOpts["varaction"] == 'undefined')
      {
        aVOpts["varaction"] = 'V'; // A=Editable V=View Only H=Hide
      }

      if (typeof aQDHash[aVar[qdi]+'_SelectList'] != 'undefined')
      {
        var selectList = aQDHash[aVar[qdi]+'_SelectList'].replace(/\[\%/g,"");
        LogConsole('selectList='+selectList);
        var aSelectList = selectList.split("]");
        var j=0;
        for (j=0;j<aSelectList.length;j++)
        {
          if (aSelectList[j] !== '')
          {
            aQDHash[aSelectList[j]+'_action'] = aVOpts["varaction"];
          }
        }
      }
    }
  }

  for (qdi=0;qdi<aVar.length;qdi++)
  {
    aVOpts = [];
    var divVarWrapper = document.createElement('div');
    divVarWrapper.setAttribute('id','divQDLine-'+aVar[qdi]);
    divVarWrapper.style.position = 'relative';

    if (typeof aQDHash[aVar[qdi]+'_VOpts'] != 'undefined')
    {
      aVOptPair = aQDHash[aVar[qdi]+'_VOpts'].split("~");
      iVO = 0;
      for (iVO=0;iVO<aVOptPair.length;iVO++)
      {
        aVOptsKV = aVOptPair[iVO].split("^");
        aVOpts[aVOptsKV[0]] = aVOptsKV[1];
      }
    }

    var tAction = 'A';
    if (typeof aQDHash[aVar[qdi]+'_action'] != 'undefined')
    {
      tAction = aQDHash[aVar[qdi]+'_action'];
    }

    if ((typeof aQDHash[aVar[qdi]+'_VPrompt'] != 'undefined') && 
        (aQDHash[aVar[qdi]+'_type'] != 'mg') &&
        (aQDHash[aVar[qdi]+'_type'] != 'p2') &&
        (tAction != 'H') &&
        (aQDHash[aVar[qdi]+'_type'] != 'fu'))
    {
      divP = document.createElement('div');
      divP.setAttribute('id','divQDP-'+aVar[qdi]);
      divP.setAttribute("class","kitPropertyP");
      divP.style.margin = "5px 1px 1px 5px";

      var tReq = '';

      var i=0;
      for (i=0;i<aReqList.length;i++)
      {
        if (aReqList[i] == aVar[qdi])
        {
          tReq = '*';
          break;
        }
      }  

      if ((aQDHash[aVar[qdi]+'_type'] == 'ui')&&
          (((typeof aVOpts["tbcol"] != 'undefined')&&(parseInt(aVOpts["tbcol"]) > 0))||
           ((typeof aVOpts["istbox"] != 'undefined')&&(parseInt(aVOpts["istbox"]) == 1))))
      {
        divP.innerHTML = tReq+aQDHash[aVar[qdi]+'_VPrompt']+'<span id="divQDMAX-'+aVar[qdi]+'" style="margin-left:10px;font-style:italic;font-size:11px;">(0 / '+aVOpts["tbmax"]+' '+aQDHash['QD_MSG_TextboxCharacters']+')</span>';
      }
      else
      {
        divP.innerHTML = tReq+aQDHash[aVar[qdi]+'_VPrompt'];
      }

      divVarWrapper.appendChild(divP);
    }

    var divFSP;
    var divFS;
    var divFC;
    var divComboOuter;
    var divComboT;
    var divComboA;
    var imgComboA;
    var divFCT;
    var imgFCA;
    var divFCA;
    if (aQDHash[aVar[qdi]+'_type'] == 'ui')
    {
      if (typeof aQDHash[aVar[qdi]+'_FormatField'] != 'undefined')
      {
        divF = document.createElement('div');
        divF.setAttribute('id','divQDF-'+aVar[qdi]);
        divF.setAttribute("class","kitPropertyP");

        var PrevOpt = '';
        var formatsub = '';
        var iData = 0;
        var iFieldLen = 0;
        var iFieldCnt = 0;
        var iLPos=0;
        var ffi = 0;
        var hasLiteral = 0;

        for (ffi=0;aQDHash[aVar[qdi]+'_FormatField'].length > ffi;ffi++)
        {
          var tChar = aQDHash[aVar[qdi]+'_FormatField'].charAt(ffi);
          var iNum=0;
          var iLen=0;
          var iNew=0;
          var gfNum;

          if (((tChar == 'L') ||
               (tChar == 'U')) ||
              (((PrevOpt == 'L') || (PrevOpt == 'U')) && (tChar.match(/\d/))))
          {
            hasLiteral = 1;

            if ((tChar == 'L')||(tChar == 'U'))
            {
              PrevOpt = tChar;
            }

            if (iFieldLen > 0)
            {
              iFieldCnt++;

              inF = document.createElement('input');
              inF.setAttribute('id','inQDF-'+aVar[qdi]+'-'+iFieldCnt);
              inF.setAttribute('type','text');
              inF.setAttribute('size',iFieldLen);
              inF.setAttribute('maxlength',iFieldLen);
              inF.setAttribute('value',"");
              inF.setAttribute("class","kitPropertyF");
              inF.style.margin = "0 5px 1px 5px";

              fONKU = "QD_FormatCheck('inQDF-"+aVar[qdi]+"-"+iFieldCnt+"','"+aVar[qdi]+"','"+formatsub+"')";
              inF.onkeyup = new Function (fONKU);

              if (kit_isEdit)
              {
                var el = document.createElement("div");
                el.innerHTML = aHashEdit["QD"+aVar[qdi]+"|"+iFieldCnt];
                if (el.firstChild)
                {
                  aHashEdit["QD"+aVar[qdi]+"|"+iFieldCnt] = el.firstChild.data;
                }

                inF.setAttribute('value',aHashEdit["QD"+aVar[qdi]+"|"+iFieldCnt]);
              }

              divF.appendChild(inF);
            }

            iNum=0;
            iLen=0;
             iNew=0;
            if (tChar.match(/\d/)) // Is it a digit
            {
              iNum=0;
              iLen=0;
              iNew=0;

              gfNum = QD_GetFormatNum (aQDHash[aVar[qdi]+'_FormatField'],ffi);
              iNew = gfNum[0];
              iLen = gfNum[1];
              iNum = gfNum[2];

              iData += iNum;
              iNum--;        

              var vLiteral = aQDHash[aVar[qdi]+'_LiteralField'].substr (iLPos,iNum);

              inF = document.createElement('span');
              inF.style.margin = "0 1px 1px 1px";
              inF.innerHTML = vLiteral;
              divF.appendChild(inF);

              if (ffi < iNew)
                { iLPos = iNew; }

              iLPos += iNum;
            }
            else
            {
              tChar = aQDHash[aVar[qdi]+'_LiteralField'].substr (iLPos,1);
              if (tChar == ' ')
              { 
                inF = document.createElement('span');
                inF.style.margin = "0 1px 1px 1px";
                inF.innerHTML = '&nbsp;';
                divF.appendChild(inF);
              }
              else if (tChar == '|')
              { 
                inF = document.createElement('span');
                inF.style.margin = "0 1px 1px 1px";
                inF.innerHTML = '<br>';
                divF.appendChild(inF);
              }
              else
              { 
                inF = document.createElement('span');
                inF.style.margin = "0 1px 1px 1px";
                inF.innerHTML = tChar;
                divF.appendChild(inF);
              }

              iLPos++;
            }  

            iFieldLen=0;
            formatsub = '';
          }
          else
          {
            if (tChar.match(/\d/)) // Is it a digit
            {
              iNum=0;
              iLen=0;

              gfNum = QD_GetFormatNum (aQDHash[aVar[qdi]+'_FormatField'],ffi);
              ffi = gfNum[0];
              iLen = gfNum[1];
              iNum = gfNum[2];

              iFieldLen += (iNum-1);
              iData += iNum;

              formatsub += iNum;
            }
            else
            {
              formatsub += tChar;
              iFieldLen++;
              iData++;
            }

            PrevOpt = tChar;
          }

          // PrevOpt = tChar;
        }

        if (iFieldLen > 0)
        {
          iFieldCnt++;
          var fieldWidth = (parseInt(iFieldLen) * 14);
          if (fieldWidth > 495)
          {
            fieldWidth = '495px';
          }
          else
          {
            fieldWidth = fieldWidth + 'px';
          }

          inF = document.createElement('input');
          inF.setAttribute('id','inQDF-'+aVar[qdi]+'-'+iFieldCnt);
          inF.setAttribute('type','text');
          inF.setAttribute('maxlength',iFieldLen);
          inF.setAttribute('value',"");
          inF.setAttribute("class","kitPropertyF");
          inF.style.margin = "0 5px 1px 5px";

          if (hasLiteral)
          {
            inF.setAttribute('size',iFieldLen);
          }
          else
          {
            inF.style.width = fieldWidth;
          }

          fONKU = "QD_FormatCheck('inQDF-"+aVar[qdi]+"-"+iFieldCnt+"','"+aVar[qdi]+"','"+formatsub+"')";
          inF.onkeyup = new Function (fONKU);

          if (kit_isEdit)
          {
            aHashEdit["QD"+aVar[qdi]+"|"+iFieldCnt] = strToPlainText(aHashEdit["QD"+aVar[qdi]+"|"+iFieldCnt]);
            inF.setAttribute('value',aHashEdit["QD"+aVar[qdi]+"|"+iFieldCnt]);
          }

          divF.appendChild(inF);
        }

        divVarWrapper.appendChild(divF);
      }
      else if (((typeof aVOpts["tbcol"] != 'undefined')&&(parseInt(aVOpts["tbcol"]) > 0))||
               ((typeof aVOpts["istbox"] != 'undefined')&&(parseInt(aVOpts["istbox"]) == 1)))
      {
        divF = document.createElement('div');
        divF.setAttribute('id','divQDF-'+aVar[qdi]);
        divF.setAttribute("class","QD_TextBox");
        // divF.style.maxHeight = (parseInt(aVOpts["tbrow"]) * 19) +'px';
        divF.style.maxHeight = '285px';
        divF.style.minHeight = '75px';
        divF.setAttribute("contenteditable","true");
        divF.innerHTML = '';

        if (kit_isEdit)
        {
          divF.innerHTML = aHashEdit["QD"+aVar[qdi]];
        }

        divVarWrapper.appendChild(divF);
      }
      else if ((typeof aVOpts["isdate"] != 'undefined')&&(parseInt(aVOpts["isdate"]) === 1))
      {
        divF = document.createElement('div');
        divF.setAttribute('id','divQDF-'+aVar[qdi]);

        inF = document.createElement('input');
        inF.setAttribute('id','inQDF-'+aVar[qdi]);
        inF.setAttribute('name','inQDF-'+aVar[qdi]);
        inF.setAttribute('type','text');
        inF.setAttribute('value',"");
        inF.setAttribute("class","kitPropertyF");
        inF.setAttribute("readonly","yes");
        inF.style.margin = "0 1px 1px 5px";
        inF.style.width = '470px';

        fONC = "scwSetPredefinedDateOutputFormat('"+aVOpts["dateformat"]+"');scwShow(scwID('inQDF-"+aVar[qdi]+"'),scwID('inQDF-"+aVar[qdi]+"'));QD_SetCalendarPosition('kitTabArea2','divQDLine-"+aVar[qdi]+"');";
        inF.onclick = new Function (fONC);

        imgF = document.createElement('img');
        imgF.setAttribute('id','imgQDF-'+aVar[qdi]);
        imgF.setAttribute('alt','Calendar Popup');
        imgF.setAttribute('src','./qn_images/calendar.gif');
        imgF.onclick = new Function (fONC);

            // '<input type="text" id="'.$tqdID.'" name="'.$tqdID.'" value="'.$data{$tqdID}.'"'.$txtReadOnly.' size="30" maxlength="21" readonly="readonly" onclick="scwSetPredefinedDateOutputFormat('.$hVOpts{dateformat}.');scwShow(scwID(\''.$tqdID.'\'),event);" />'.
            // '<img border="0" id="'.$vName.'_CalendarButton" alt="Calendar Popup" style="vertical-align:top;cursor:pointer;" src="./qn_images/calendar.gif" onclick="scwSetPredefinedDateOutputFormat('.$hVOpts{dateformat}.');scwShow(scwID(\''.$tqdID.'\'),event);" />'.


        if (kit_isEdit)
        {
          aHashEdit["QD"+aVar[qdi]] = strToPlainText(aHashEdit["QD"+aVar[qdi]]);
          inF.setAttribute('value',aHashEdit["QD"+aVar[qdi]]);
        }

        divF.appendChild(inF);
        divF.appendChild(imgF);
        divVarWrapper.appendChild(divF);
      }
      else // Standard Field
      {
        divF = document.createElement('div');
        divF.setAttribute('id','divQDF-'+aVar[qdi]);

        inF = document.createElement('input');
        inF.setAttribute('id','inQDF-'+aVar[qdi]);
        inF.setAttribute('type','text');
        // inUdef.setAttribute('size',aUD[1]);
        // inUdef.setAttribute('maxlength',aUD[1]);
        inF.setAttribute('value',"");
        inF.setAttribute("class","kitPropertyF");
        inF.style.margin = "0 1px 1px 5px";
        inF.style.width = '495px';

        if (kit_isEdit)
        {
          aHashEdit["QD"+aVar[qdi]] = strToPlainText(aHashEdit["QD"+aVar[qdi]]);
          inF.setAttribute('value',aHashEdit["QD"+aVar[qdi]]);
        }

        divF.appendChild(inF);
        divVarWrapper.appendChild(divF);
      }
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'ul') // Linked Variable
    {
      if (typeof aVOpts["varaction"] != 'undefined')
      {
        if (aVOpts["varaction"] == 'V')
        {
          linkvarViewOnly = (linkvarViewOnly !== '') ? '~'+aVar[qdi] : aVar[qdi];
        }
        else if (aVOpts["varaction"] == 'H')
        {
          linkvarHidden = (linkvarHidden !== '') ? '~'+aVar[qdi] : aVar[qdi];
        }
      }

      divComboOuter = document.createElement('div');
      divComboOuter.setAttribute('id','divQD-'+aVar[qdi]);
      divComboOuter.setAttribute("class","QD_LinkVar_Select");
      divComboOuter.style.height = '26px';

      divComboT = document.createElement('div');
      divComboT.setAttribute('id','divQDText-'+aVar[qdi]);
      divComboT.setAttribute("class","QD_LinkVar_Text");
      divComboT.style.position = 'absolute';
      divComboT.style.height = 'calc(100% - 8px)';
      divComboT.style.width = 'calc(100% - 28px)';
      divComboT.style.margin = '4px';

      LogConsole ("Linked Var autoc:"+aVOpts["autoc"]);

      if ((typeof aVOpts["autoc"] != 'undefined')&&(aVOpts["autoc"] == 1))
      {
        divComboT.setAttribute("contenteditable","true");
      }
      else
      {
        divComboT.setAttribute("contenteditable","false");
      }

      divComboT.innerHTML = aQDHash['QD_MSG_SelectVarNone'].replace(/\\"/g,'"');

      if (kit_isEdit)
      {
        divComboT.innerHTML = aHashEdit["QD"+aVar[qdi]];

        if (typeof aHashEdit["QD"+aVar[qdi]] != 'undefined')
        {
          divComboT.innerHTML = aHashEdit["QD"+aVar[qdi]];
        }
      }

      fONC = "QD_displayLinkVar('"+aVar[qdi]+"','CLICK')";
      divComboT.onclick = new Function (fONC);

      fONKU = "QD_displayLinkVar('"+aVar[qdi]+"','')";
      divComboT.onkeyup = new Function (fONKU);

      divComboOuter.appendChild(divComboT);

        divComboA = document.createElement('div');
        divComboA.setAttribute('id','divQDArrow-'+aVar[qdi]);
        divComboA.setAttribute("class","QD_LinkVar_Arrow");

        imgComboA = document.createElement('img');
        imgComboA.setAttribute('id','imgQDArrow-'+aVar[qdi]);
        imgComboA.setAttribute('src','./qn_images/dropdown-arrow.jpg');
        imgComboA.setAttribute('alt','select a value');
        imgComboA.style.height = '100%';
        imgComboA.style.cursor = 'pointer';

        fONMOVER = "this.src='./qn_images/dropdown-arrow-on.jpg'";
        imgComboA.onmouseover = new Function (fONMOVER);

        fONMOUT = "this.src='./qn_images/dropdown-arrow.jpg'";
        imgComboA.onmouseout = new Function (fONMOUT);

        fONC = "QD_displayLinkVar('"+aVar[qdi]+"','BUTTON')";
        imgComboA.onclick = new Function (fONC);

        divComboA.appendChild(imgComboA);
        divComboOuter.appendChild(divComboA);
        divVarWrapper.appendChild(divComboOuter);
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'us') // combo selection
    {
      divComboOuter = document.createElement('div');
      divComboOuter.setAttribute('id','divQD-'+aVar[qdi]);
      divComboOuter.setAttribute("class","QD_Combo_Select");
      divComboOuter.style.height = '26px';

      divComboT = document.createElement('div');
      divComboT.setAttribute('id','divQDText-'+aVar[qdi]);
      divComboT.setAttribute("class","QD_Combo_Text");
      divComboT.innerHTML = aQDHash['QD_MSG_SelectVarNone'].replace(/\\"/g,'"');

      if (kit_isEdit)
      {
        divComboT.innerHTML = aHashEdit["QD"+aVar[qdi]];

        if (typeof aHashEdit["QDCHRG"+aVar[qdi]] != 'undefined')
        {
          divComboT.innerHTML = aHashEdit["QD"+aVar[qdi]] + aHashEdit["QDCHRG"+aVar[qdi]];
        }
      }

      fONC = "QD_displayCombobox('"+aVar[qdi]+"','CLICK')";
      divComboT.onclick = new Function (fONC);

      fONKU = "QD_displayCombobox('"+aVar[qdi]+"','')";
      divComboT.onkeyup = new Function (fONKU);

      divComboOuter.appendChild(divComboT);

      divComboA = document.createElement('div');
      divComboA.setAttribute('id','divQDArrow-'+aVar[qdi]);
      divComboA.setAttribute("class","QD_Combo_Arrow");

      imgComboA = document.createElement('img');
      imgComboA.setAttribute('id','imgQDArrow-'+aVar[qdi]);
      imgComboA.setAttribute('src','./qn_images/dropdown-arrow.jpg');
      imgComboA.setAttribute('alt','select a value');
      imgComboA.style.height = '100%';
      imgComboA.style.cursor = 'pointer';

      fONMOVER = "this.src='./qn_images/dropdown-arrow-on.jpg'";
      imgComboA.onmouseover = new Function (fONMOVER);

      fONMOUT = "this.src='./qn_images/dropdown-arrow.jpg'";
      imgComboA.onmouseout = new Function (fONMOUT);

      fONC = "QD_displayCombobox('"+aVar[qdi]+"','BUTTON')";
      imgComboA.onclick = new Function (fONC);

      divComboA.appendChild(imgComboA);
      divComboOuter.appendChild(divComboA);
      divVarWrapper.appendChild(divComboOuter);
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'iq') // qr code
    {
    }
    else if ((aQDHash[aVar[qdi]+'_type'] == 'is') || // image selection
             (aQDHash[aVar[qdi]+'_type'] == 'iu'))   // image upload
    {
      var divPrompt = document.getElementById('divQDP-'+aVar[qdi]);
      if (divPrompt)
      {
        var tPrompt = divPrompt.innerHTML;
        var tBrowse = '&nbsp;<input type="button" value="Browse" onclick="QD_ImageLibrary();" />';
        divPrompt.innerHTML = tPrompt;
      }

      var divIO = document.createElement('div');
      divIO.style.margin = '2px 0 0 5px';

      var icon = document.createElement('i');
      icon.setAttribute('class','fa fa-times-circle fa-lg');
      icon.setAttribute('aria-hidden','true');
      icon.setAttribute('title','clear image selection');
      icon.style.position = 'absolute';
      icon.style.top = '20px';
      icon.style.left = '135px';
      icon.style.color = '#660000';
      icon.style.cursor = 'pointer';
      fONC = "QD_ClearImage('"+aVar[qdi]+"');";
      icon.onclick = new Function (fONC);
      divIO.appendChild(icon);

      var divI = document.createElement('div');
      divI.setAttribute('id','divQD-'+aVar[qdi]);
      divI.setAttribute('class','QDImageDiv');
      fONC = "QD_ImageLibrary('"+aVar[qdi]+"')";
      divI.onclick = new Function (fONC);

      var img = document.createElement('img');
      img.setAttribute('id','imgQD-'+aVar[qdi]);
      img.setAttribute('src', aQDHash["QD_Domain"]+"/cgi-bin/qn_images/selectimg.gif");
      img.setAttribute('title',strToPlainText(aQDHash['QD_MSG_ChooseImage'].replace(/\\"/g,'"')));
      img.style.maxWidth = '125px';
      img.style.maxHeight = '125px';
      img.style.display = 'none';
      divI.appendChild(img);

      var divIT = document.createElement('div');
      divIT.setAttribute('id','divITQD-'+aVar[qdi]);
      divIT.innerHTML = aQDHash['QD_MSG_ChooseImage'].replace(/\\"/g,'"');
      divIT.style.width = '100px';
      divIT.style.display = 'inline-block';
      divIT.style.backgroundColor = 'transparent';
      divI.appendChild(divIT);

      if (kit_isEdit)
      {
        var imageUrl;
        if (aQDHash[aVar[qdi]+'_type'] == 'is')
        {
          LogConsole ("Image Select VName:"+aVar[qdi]);

          if ((typeof aHashEdit["QD"+aVar[qdi]] != 'undefined')&&(typeof aHashEdit["QDTN"+aVar[qdi]] != 'undefined'))
          {
            imageUrl = aQDHash["QD_Domain"]+"/SVG/TVAR/"+aVar[qdi]+"/tnail/"+aHashEdit["QD"+aVar[qdi]]+"."+aHashEdit["QDTN"+aVar[qdi]];

            img.src = imageUrl;
            divIT.style.display = 'none';
            img.style.display = 'block';
          }
        }
        else if (aQDHash[aVar[qdi]+'_type'] == 'iu')
        {
          if ((typeof aHashEdit["QD"+aVar[qdi]] != 'undefined')&&(typeof aHashEdit["QDTN"+aVar[qdi]] != 'undefined'))
          {
            imageUrl = aQDHash["QD_Domain"]+"/SVG/TVAR/"+aVar[qdi]+"/tnail/T-"+aHashEdit["TID"]+"-"+aHashEdit["QD"+aVar[qdi]]+"."+aHashEdit["QDTN"+aVar[qdi]];

            img.src = imageUrl;
            divIT.style.display = 'none';
            img.style.display = 'block';
          }
        }
      }

      divIO.appendChild(divI);
      divVarWrapper.appendChild(divIO);
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'fu') // file upload
    {
      var divUpFileBlock = document.createElement('div');

      var divUpFile = document.createElement('div');
      if (divUpFile)
      {
        divUpFile.setAttribute("class","QD_FileUploadButton");
        divUpFile.style.cursor = 'pointer';
        divUpFile.innerHTML = aQDHash[aVar[qdi]+'_VPrompt'];

        // var fONC = "QD_UploadPopup('"+aVar[qdi]+"');";
        var tPath = '/home/'+aQDHash['DIST']+'/public_html/SVG/TVAR/'+aVar[qdi];
        fONC = "QD_UploadPopup('"+aQDHash['DIST']+"','"+tPath+"','"+aVar[qdi]+"','','"+aQDHash[aVar[qdi]+'_type']+"','"+aQDHash['TID']+"');"; // dist,path,ref
        divUpFile.onclick = new Function (fONC);

        divUpFileBlock.appendChild(divUpFile);
      }

      var divUpFileName = document.createElement('div');
      divUpFileName.setAttribute("class","QD_FileUploadFileName");
      divUpFileName.setAttribute('id','divQD-'+aVar[qdi]);
      divUpFileName.innerHTML = QD_No_File_Attached;
      divUpFileBlock.appendChild(divUpFileName);

      divClear = document.createElement('div');
      divClear.style.clear = "both";
      divUpFileBlock.appendChild(divClear);

      divVarWrapper.appendChild(divUpFileBlock);
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'p1') // AccuSource
    {
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'p2') // Data Widget
    {
      var divDataWidgetOuter = document.createElement('div');
      if (divDataWidgetOuter)
      {
        var divDataWidget = document.createElement('div');
        if (divDataWidget)
        {
          divDataWidget.setAttribute("class","QD_FileUploadButton");
          divDataWidget.style.cursor = 'pointer';
          divDataWidget.innerHTML = aQDHash[aVar[qdi]+'_VPrompt'];

          fONC = "QD_DataWidget('"+aVar[qdi]+"');";
          divDataWidget.onclick = new Function (fONC);

          divDataWidgetOuter.appendChild(divDataWidget);

          var divDataWidgetInfo = document.createElement('div');
          divDataWidgetInfo.setAttribute('id','infoQD-'+aVar[qdi]);
          divDataWidgetInfo.style.cssFloat = "left";
          divDataWidgetInfo.style.styleFloat = "left";
          divDataWidgetInfo.style.margin = "10px 2px 0 10px";
          divDataWidgetInfo.innerHTML = '';
          divDataWidgetOuter.appendChild(divDataWidgetInfo);

          var divDataWidgetData = document.createElement('div');
          divDataWidgetData.setAttribute('id','divQD-'+aVar[qdi]);
          divDataWidgetData.style.display = 'none';
          divDataWidgetOuter.appendChild(divDataWidgetData);

          divClear = document.createElement('div');
          divClear.style.clear = 'both';
          divDataWidgetOuter.appendChild(divClear);
        }

        divVarWrapper.appendChild(divDataWidgetOuter);
      }
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'mg') // message
    {
      divP = document.createElement('div');
      divP.setAttribute('id','divQDP-'+aVar[qdi]);
      divP.setAttribute("class","kitPropertyP");
      divP.style.margin = "5px 1px 1px 5px";
      divP.innerHTML = aQDHash[aVar[qdi]+'_DefaultData'];
      divVarWrapper.appendChild(divP);
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'fs') // font selection
    {
      var divFCOuter = document.createElement('div');

      divFC = document.createElement('div');
      divFC.setAttribute('id','divQD-'+aVar[qdi]);
      divFC.setAttribute("class","QD_FS_Select");
      divFC.style.height = '26px';

      fONC = "QD_displayFontFamilyList('"+aVar[qdi]+"')";
      divFC.onclick = new Function (fONC);

      divFCT = document.createElement('div');
      divFCT.setAttribute('id','divQDText-'+aVar[qdi]);
      divFCT.setAttribute("class","QD_FS_Text");
      divFCT.innerHTML = aQDHash['QD_MSG_SelectVarNone'].replace(/\\"/g,'"');
      if (kit_isEdit)
      {
        aFontPart = [];
        aFontPart = aHashEdit["QD"+aVar[qdi]].split('^');
        divFCT.innerHTML = aFontPart[0];
      }
      else if (aQDHash[aVar[qdi]+'_SelectList'].indexOf('fontDefault') != -1)
      {
        var aFontDef = [];
        var ifsd = 0;
        var ifa = 0;

        aFontDef = aQDHash[aVar[qdi]+'_SelectList'].split('!=!');
        for (ifsd=0;ifsd<aFontDef.length;ifsd++)
        {
          if (aFontDef[ifsd].indexOf('fontDefault') != -1)
          {
            var aFontAtt = aFontDef[ifsd].split('^');
            for (ifa=0;ifa<aFontAtt.length;ifa++)
            {
              var aFontKV = aFontAtt[ifa].split('|');
              if (aFontKV[0] == 'fontDesc')
              {
                divFCT.innerHTML = aFontKV[1];
              }
            }
          }
        }
      }

      divFC.appendChild(divFCT);

      divFCA = document.createElement('div');
      divFCA.setAttribute('id','divQDArrow-'+aVar[qdi]);
      divFCA.setAttribute("class","QD_FS_Arrow");

      imgFCA = document.createElement('img');
      imgFCA.setAttribute('id','imgQDArrow-'+aVar[qdi]);
      imgFCA.setAttribute('src','./qn_images/dropdown-arrow.jpg');
      imgFCA.setAttribute('alt','select a font-family');
      imgFCA.style.height = '100%';
      imgFCA.style.cursor = 'pointer';

      fONMOVER = "this.src='./qn_images/dropdown-arrow-on.jpg'";
      imgFCA.onmouseover = new Function (fONMOVER);

      fONMOUT = "this.src='./qn_images/dropdown-arrow.jpg'";
      imgFCA.onmouseout = new Function (fONMOUT);

      divFCA.appendChild(imgFCA);
      divFC.appendChild(divFCA);
      divFCOuter.appendChild(divFC);

      if ((typeof aVOpts["fontsize"] != 'undefined')&&
          (aVOpts["fontsize"] == 'Y'))
      {
        // alert('min='+aVOpts["fontmin"]+' max='+aVOpts["fontmax"]);

        divFSP = document.createElement('div');
        divFSP.style.margin = "5px 2px 0 10px";
        divFSP.style.cssFloat = "left";
        divFSP.style.styleFloat = "left";
        divFSP.innerHTML = aQDHash['QD_MSG_FontSizePrompt']+':';

        divFS = document.createElement('div');
        divFS.setAttribute('id','divQDFS-'+aVar[qdi]);
        divFS.setAttribute("class","QD_FS_Select");
        divFS.style.height = '26px';
        divFS.style.width = '75px';

        fONC = "QD_displayFontSizeList('"+aVar[qdi]+"')";
        divFS.onclick = new Function (fONC);

        var divFST = document.createElement('div');
        divFST.setAttribute('id','divQDTextFS-'+aVar[qdi]);
        divFST.setAttribute("class","QD_FS_Text");
        divFST.innerHTML = aQDHash['QD_MSG_SelectVarNone'].replace(/\\"/g,'"');
        if (kit_isEdit)
        {
          aFontPart = [];
          aFontPart = aHashEdit["QD"+aVar[qdi]].split('^');
          divFST.innerHTML = aFontPart[1];
        }
        else if (typeof aVOpts["fontdef"] != 'undefined')
        {
          divFST.innerHTML = aVOpts["fontdef"];
        }

        divFS.appendChild(divFST);

        var divFSA = document.createElement('div');
        divFSA.setAttribute('id','divQDArrow-'+aVar[qdi]);
        divFSA.setAttribute("class","QD_FS_Arrow");

        var imgFSA = document.createElement('img');
        imgFSA.setAttribute('id','imgQDArrowFS-'+aVar[qdi]);
        imgFSA.setAttribute('src','./qn_images/dropdown-arrow.jpg');
        imgFSA.setAttribute('alt','select a font-size');
        imgFSA.style.height = '100%';
        imgFSA.style.cursor = 'pointer';

        fONMOVER = "this.src='./qn_images/dropdown-arrow-on.jpg'";
        imgFSA.onmouseover = new Function (fONMOVER);

        fONMOUT = "this.src='./qn_images/dropdown-arrow.jpg'";
        imgFSA.onmouseout = new Function (fONMOUT);

        divFSA.appendChild(imgFSA);
        divFS.appendChild(divFSA);
        divFCOuter.appendChild(divFSP);
        divFCOuter.appendChild(divFS);

      }

      var divFCOuterTemp = document.createElement('div');
      divFCOuterTemp.style.clear = "both";

      divFCOuter.appendChild(divFCOuterTemp);
      divVarWrapper.appendChild(divFCOuter);
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'cs') // color selection
    {
      divFC = document.createElement('div');
      divFC.setAttribute('id','divQD-'+aVar[qdi]);
      divFC.setAttribute("class","QD_CS_Select");
      divFC.style.height = '26px';

      fONC = "QD_displayFontColorList('"+aVar[qdi]+"')";
      divFC.onclick = new Function (fONC);

      var divFCS = document.createElement('div');
      divFCS.setAttribute('id','divQDSwatch-'+aVar[qdi]);
      divFCS.setAttribute("class","QD_CS_Swatch");
      divFCS.innerHTML = '&nbsp;';
      divFC.appendChild(divFCS);

      divFCT = document.createElement('div');
      divFCT.setAttribute('id','divQDText-'+aVar[qdi]);
      divFCT.setAttribute("class","QD_CS_Text");
      divFCT.innerHTML = aQDHash['QD_MSG_SelectVarNone'].replace(/\\"/g,'"');
      divFC.appendChild(divFCT);

      divFCA = document.createElement('div');
      divFCA.setAttribute('id','divQDArrow-'+aVar[qdi]);
      divFCA.setAttribute("class","QD_CS_Arrow");

      imgFCA = document.createElement('img');
      imgFCA.setAttribute('id','imgQDArrow-'+aVar[qdi]);
      imgFCA.setAttribute('src','./qn_images/dropdown-arrow.jpg');
      imgFCA.setAttribute('alt','select a color');
      imgFCA.style.height = '100%';
      imgFCA.style.cursor = 'pointer';

      fONMOVER = "this.src='./qn_images/dropdown-arrow-on.jpg'";
      imgFCA.onmouseover = new Function (fONMOVER);

      fONMOUT = "this.src='./qn_images/dropdown-arrow.jpg'";
      imgFCA.onmouseout = new Function (fONMOUT);

      if (kit_isEdit)
      {
        var iR = '';
        var iG = '';
        var iB = '';

        var aColorPart = aHashEdit["QD"+aVar[qdi]].split('^');
        for (iC=0;iC<aColorPart.length;iC++)
        {
          var aColorKV = aColorPart[iC].split('|');

          if (aColorKV[0] == 'colorDesc')
          {
            divFCT.innerHTML = aColorKV[1];
          }
          else if (aColorKV[0] == 'R')
          {
            iR = aColorKV[1];
          }
          else if (aColorKV[0] == 'G')
          {
            iG = aColorKV[1];
          }
          else if (aColorKV[0] == 'B')
          {
            iB = aColorKV[1];
          }
        }

        if ((iR !== '')&&(iG !== '')&&(iB !== ''))
        {
          divFCS.style.backgroundColor = 'rgb('+iR+','+iG+','+iB+')';
        }
        //color_test^^colorDesc|Red^R|214^G|40^B|40^Spot|PANTONE 1795 U^Tint|100^C|0^M|0^Y|0^K|0^colorDefault|Green
      }
      else // Check for default
      {
        // colorDesc|Red^R|214^G|40^B|40^Spot|PANTONE 1795 U^Tint|100^C|0^M|0^Y|0^K|0!=!
        // colorDesc|Green^R|30^G|122^B|61^Spot|PANTONE 356 U^Tint|100^C|0^M|0^Y|0^K|0^colorDefault|Green~~
        var aColors = aQDHash[aVar[qdi]+"_SelectList"].split('!=!');
        for (iC=0;iC<aColors.length;iC++)
        {
          var aColorDefault = [];
          var aCKV = aColors[iC].split('^');
          for (iCKV=0;iCKV<aCKV.length;iCKV++)
          {
            var aCDKV = aCKV[iCKV].split('|');
            aColorDefault[aCDKV[0]] = aCDKV[1];
          }

          if (typeof aColorDefault['colorDefault'] != 'undefined')
          {
            divFCT.innerHTML = aColorDefault['colorDesc'];
            divFCS.style.backgroundColor = 'rgb('+aColorDefault['R']+','+aColorDefault['G']+','+aColorDefault['B']+')';
          }
        }
      }

      divFCA.appendChild(imgFCA);
      divFC.appendChild(divFCA);
      divVarWrapper.appendChild(divFC);
    }

    if (tAction == 'V')
    {
      LogConsole('Create Block tAction:'+tAction);
      divBlock = document.createElement('div');
      divBlock.style.backgroundColor = "transparent";
      divBlock.style.height = "100%";
      divBlock.style.width = "100%";
      divBlock.style.position = "absolute";
      divBlock.style.top = "0";

      divVarWrapper.style.filter = "alpha(opacity=50)"; // IE 5,6,7,8,9
      divVarWrapper.style.opacity = 0.5; // Modern Browsers
      divVarWrapper.appendChild(divBlock);
    }
    else if (tAction == 'H')
    {
      divBlock = document.createElement('div');
      divBlock.style.backgroundColor = "transparent";
      divBlock.style.height = "100%";
      divBlock.style.width = "100%";
      divBlock.style.position = "absolute";
      divBlock.style.top = "0";
      divVarWrapper.appendChild(divBlock);

      divVarWrapper.style.visibility = 'hidden';
      divVarWrapper.style.height = '0';
    }

    divForm.appendChild(divVarWrapper);
  }

  // Template After Form Message
  if ((typeof aQDHash['QD_MSG_AfterForm'] != 'undefined') && (aQDHash['QD_MSG_AfterForm'] !== ''))
  {
    divMsg = document.createElement('div');
    divMsg.innerHTML = aQDHash['QD_MSG_AfterForm'].replace(/\\"/g,'"');
    divForm.appendChild(divMsg);
  }

  // Template Form Bottom Message
  if ((typeof aQDHash['QD_MSG_FormBottom'] != 'undefined') && (aQDHash['QD_MSG_FormBottom'] !== ''))
  {
    divMsg = document.createElement('div');
    divMsg.innerHTML = aQDHash['QD_MSG_FormBottom'].replace(/\\"/g,'"');
    divForm.appendChild(divMsg);
  }

  QD_LoadPreviewPage('1');
}

// ------------------------------------------------------------------
function QD_ExpandFormat (nFormat)
{
  var newnum = '';
  var cPrev = '';
  var myDigit = '';
  var nfLen = nFormat.length;
  var myCnt;
  var i;
  var j;

  for (i=0;i<nfLen;i++)
  {
    var cCur = nFormat.charAt(i);
    var reg = /\d/;
    if (cCur.match(reg)) // if digit
    {
      myDigit += cCur;
    }
    else
    {
      if (myDigit.length > 0)
      {
        myCnt = parseInt(myDigit);
        for (j=1;j<=myCnt;j++)
        {
          newnum += cPrev;
        }
      }
      cPrev=cCur;
      myDigit = '';
      newnum += cCur;
    }
  }

  if (myDigit.length > 0)
  {
    myCnt = parseInt(myDigit);
    for (j=1;j<=myCnt;j++)
    {
      newnum += cPrev;
    }
  }

  return(newnum);
}

// ------------------------------------------------------------------
function QD_FormatCheck (id,fname,fsub)
{
  if (typeof aQDHash[fname+'_FormatField'] != 'undefined')
  {
    var newStr = '';
    var fdata = fsub;
    var formatdata = aQDHash[fname+'_FormatField'];

    fdata = QD_ExpandFormat (fdata);

    var oCurData = document.getElementById(id);
    if (oCurData)
    {
      var curdata = oCurData.value;
      var curlen = curdata.length;

      if (curlen > 0)
      {
        // First character in format sub mask
        var firstchar =fdata.charAt(0);
        if (firstchar == 'v')
        {
        }
        else if (firstchar == 'V')
        {
          oCurData.value = curdata.toUpperCase();
        }
        else if (firstchar == 'w')
        {
          oCurData.value = curdata.toLowerCase();
        }
        else
        {
          var i;
          for (i=0;i<curlen;i++)
          {
            var cData = curdata.charAt(i);
            var cFormat = fdata.charAt(i);

            if ((cFormat == 'N') && (!(cData.match(/\d/))))
            {
              oCurData.value = curdata.substring(0,curdata.length - 1);
              window.alert ('Must be a digit');
            }
            else if (cFormat == 'A')
            {
              if (cData.match(/[a-zA-Z ]/))
              {
                newStr += cData.toUpperCase();
              }
              else
                { window.alert ('Must be a alpha character [A-Z],space'); }
            }
            else if (((cFormat == 'a'))&&(!(cData.match(/[a-zA-Z ]/))))
              { window.alert ('Must be a alpha character [a-z],space'); }
            else if (cFormat == 'b')
            {
              if (cData.match(/[a-zA-Z .]/))
              {
                newStr += cData.toLowerCase();
              }
              else
                { window.alert ('Must be a character [a-z,space,period]'); }
            }
            else if (cFormat == 'X')
            {
              if (cData.match(/[a-zA-Z0-9_ .@-]/))
              {
                newStr += cData.toUpperCase();
              }
              else
                { window.alert ('Must be a alphanumeric character [A-Z,0-9,_,space,period,@,dash]'); }
            }
            else if (((cFormat == 'x'))&&(!(cData.match(/[a-zA-Z0-9_ .@-]/))))
              { window.alert ('Must be a alphanumeric character [a-z,A-Z,0-9,_,space,period,@,dash]'); }
            else if (cFormat == 'y')
            {
              if (cData.match(/[a-zA-Z0-9_ .@-]/))
              {
                newStr += cData.toLowerCase();
              }
              else
                { window.alert ('Must be a character [a-z,A-Z,0-9,_,space,period,@,dash]'); }
            }
            else
            {
              newStr += cData;
            }
          }

          oCurData.value = newStr;
        }
      }
    }
  }
}

// ------------------------------------------------------------------
function QD_GetFormatNum (vFormat,iPos)
{
  var iNum = '';
  var iLen = 0;
  var tTemp = vFormat.substr (iPos,1);
  while (tTemp.match(/\d/)) // Is it a digit
  {
    iLen++;
    iNum += tTemp;

    iPos++; // Check Next Position
    tTemp = vFormat.substr (iPos,1);
  }

  iPos--;
  return [iPos,iLen,iNum];
}

// ------------------------------------------------------------------
function QD_LoadPreviewPage (iPage)
{
  if (typeof aQDHash['PageCnt'] != 'undefined')
  {
    var tnExt = '';
    var tnUrl = '';
    var iP = 1;
    for (iP=1;iP<=aQDHash["PageCnt"];iP++)
    {
      if (iP == iPage)
      {
        if (typeof aQDHash['Page'+iP] != 'undefined')
        {
          var imgDomain = aQDHash["QNET_DOMAIN"];
          if (aQDHash['vcDBName'] !== '')
          {
            var aParts = aQDHash['QNET_DOMAIN'].split("~");
            imgDomain = aParts[0]+'~'+aQDHash['vcDBName'];
          }

          if (aQDHash["PreviewUser"] > 0)
          {
            if (aQDHash['WsID'] === 0)
            {
              MagicZoomPlus.update('aImgSelected', 'https://'+imgDomain+'/SVG/T'+aQDHash["TID"]+'/cGFX/T-'+aQDHash["TID"]+'-tn'+iP+'.pdf.png?'+IMG_ts, 'https://'+imgDomain+'/SVG/T'+aQDHash["TID"]+'/cGFX/T-'+aQDHash["TID"]+'-tn'+iP+'.pdf.png?'+IMG_ts, 'show-loading:true;');
            }
            else
            {
              MagicZoomPlus.update('aImgSelected', 'https://'+imgDomain+'/SVG/T'+aQDHash["TID"]+'/cGFX/T-'+aQDHash["TID"]+'-'+aQDHash['WsID']+'-tn'+iP+'.png?'+IMG_ts, 'https://'+imgDomain+'/SVG/T'+aQDHash["TID"]+'/cGFX/T-'+aQDHash["TID"]+'-'+aQDHash['WsID']+'-tn'+iP+'.png?'+IMG_ts, 'show-loading:true;');
            }
          }
          else
          {
            if (kit_isEdit)
            {
              // QD_CreatePDF(0);
            }
            else
            {
              tnUrl = 'https://'+imgDomain+'/SVG/T'+aQDHash["TID"]+'/T-'+aQDHash["TID"]+'-tn'+iP+'.pdf';
              tnExt = 'png jpg gif JPG';
              QNET_SetImage('aImgSelected',tnUrl,tnExt,QNET_SetImage_CallBack);

              // MagicZoomPlus.update('aImgSelected', 'https://'+imgDomain+'/SVG/T'+aQDHash["TID"]+'/T-'+aQDHash["TID"]+'-tn'+iP+'.pdf.'+tnExt, 'https://'+imgDomain+'/SVG/T'+aQDHash["TID"]+'/T-'+aQDHash["TID"]+'-tn'+iP+'.pdf.'+tnExt, 'show-loading:true;');
            }
          }
        }
      }
    }
  }
}

// --------------------------------------------------------
function QD_ImageLibrary (vname)
{
  var PreloadImage = '';
  var img = document.getElementById('imgQD-'+vname);
  if (img)
  {
    if (img.style.display != 'none')
    {
      var imgsrc = img.src;
      PreloadImage = imgsrc.substring(imgsrc.lastIndexOf('/')+1);
    }
  }

  var tParam = 'TID='+aQDHash['TID']+'&VName='+vname+'&PreloadImage='+PreloadImage+'&UserID='+kit_UserID+'&vcDBName='+aQDHash['vcDBName']+'&WsID='+kit_WsID+'&RetailStore='+kit_RetailStore;

  var tDomain = aQDHash["QD_Domain"];
  if (window.location.protocol !== 'https:')
  {
    tDomain = tDomain.replace(/^https:/i,'http:');
  }

  LogConsole(tParam);

  QD_Popup = window.open(tDomain+"/cgi-bin/qd-image-select.cgi?"+tParam,"imageselect","menubar=0,width=900,height=600,status=0,toolbar=0,location=0,resizable=1");
  QD_Popup.focus();
}

// --------------------------------------------------------
function QD_ReturnImage (vname,imagename)
{
  var imageUrl = '';
  var img;
  var divIT;

  var qdDomain = aQDHash["QD_Domain"];

  LogConsole('QD_ReturnImage : imagename='+imagename);

  if (imagename !== '')
  {
    img = document.getElementById('imgQD-'+vname);
    if (img)
    {
      if (aQDHash['vcDBName'] !== '')
      {
        var aDom = aQDHash["QD_Domain"].split("~");
        qdDomain = aDom[0]+'~'+aQDHash['vcDBName'];
      }

      if (typeof QD_Popup != 'undefined')
      {
        imageUrl = qdDomain+"/SVG/TVAR/"+vname+"/tnail/"+imagename+".png";

        imageExists
        (imageUrl, 
          function(exists) 
          {
            if (exists === false)
            {
              imageUrl = qdDomain+"/SVG/TVAR/"+vname+"/tnail/"+imagename+".jpg";

              imageExists
              (imageUrl, 
                function(exists) 
                {
                  if (exists === false)
                  {
                    imageUrl = qdDomain+"/SVG/TVAR/"+vname+"/tnail/"+imagename+".gif";
                  }

                  img.src = imageUrl;
                }
              );
            }
            else
            {
              img.src = imageUrl;
            }
          } 
        );
      }
      else
      {
        var aImgParts = imagename.split(".");
        imageUrl = qdDomain+"/SVG/TVAR/"+vname+"/tnail/"+aImgParts[0]+'.'+aImgParts[1]+'.png';

        LogConsole('QD_ReturnImage : imagename='+imagename+' imageUrl='+imageUrl);

        imageExists
        (imageUrl, 
          function(exists) 
          {
            if (exists === false)
            {
              imageUrl = qdDomain+"/SVG/TVAR/"+vname+"/tnail/"+aImgParts[0]+'.'+aImgParts[1]+'.jpg';

              imageExists
              (imageUrl, 
                function(exists) 
                {
                  if (exists === false)
                  {
                    img.src = qdDomain+"/SVG/TVAR/"+vname+"/tnail/"+aImgParts[0]+'.'+aImgParts[1]+'.gif';
                  }
                  else
                  {
                    img.src = imageUrl;
                  }
                }
              );

            }
            else
            {
              img.src = imageUrl;
            }
          } 
        );
      }

      img.style.display = 'inline';
    }

    divIT = document.getElementById('divITQD-'+vname);
    if (divIT)
    {
      divIT.style.display = 'none';
    }
  }
  else
  {
    img = document.getElementById('imgQD-'+vname);
    if (img)
    {
      imageUrl = qdDomain+"/qn_images/selectimg.gif";
      img.src = imageUrl;

      img.style.display = 'none';
    }

    divIT = document.getElementById('divITQD-'+vname);
    if (divIT)
    {
      divIT.style.display = 'inline-block';
    }
  }

  if (typeof QD_Popup != 'undefined')
  {
    QD_Popup.close();
  }

}

// --------------------------------------------------------
function imageExists(url, callback) 
{
  var img = new Image();
  img.onload = function() { callback(true); };
  img.onerror = function() { callback(false); };
  img.src = url;
}

// --------------------------------------------------------
function QNET_SetImage(imgid,tUrl,tExt,callback,timeout)
{
  var aExt = tExt.split(' ');
  var ext = aExt.shift();
  tExt = aExt.join(' ');
 
  if (ext.length > 0)
  {
    var url = tUrl+'.'+ext;

    timeout = timeout || 5000;
    var timedOut = false, timer;
    var img = new Image();
    img.onerror = img.onabort = function() 
    {
      if (!timedOut) 
      {
        clearTimeout(timer);
        callback(imgid,tUrl,tExt, "error");
      }
    };
    img.onload = function() 
    {
      if (!timedOut) 
      {
        clearTimeout(timer);
        callback(imgid,url,'', "success");
      }
    };
    img.src = url;
    timer = setTimeout(function() 
    {
      timedOut = true;
      callback(imgid,tUrl,tExt, "timeout");
    }, timeout); 
  }
}

// --------------------------------------------------------
function QNET_SetImage_CallBack(imgid,tUrl,tExt,status)
{
  if (status == 'success')
  {
    MagicZoomPlus.update(imgid, tUrl + '?' + IMG_ts, tUrl + '?' + IMG_ts, 'show-loading:true;');
  }
  else
  {
    QNET_SetImage(imgid,tUrl,tExt,QNET_SetImage_CallBack);    
  }
}

// --------------------------------------------------------
function getImageExt(url) 
{
  var tnExt = 'png';
  var tnUrl = url+tnExt;
  imageExists (tnUrl,function(exists) 
    {
      if (exists === false)
      {
        tnExt = 'jpg';
        tnUrl = url+tnExt;
        imageExists (tnUrl,function(exists) 
          {
            if (exists === false)
            {
              tnExt = 'JPG';
              tnUrl = url+tnExt;
              imageExists (tnUrl,function(exists) 
                {
                  if (exists === false)
                  {
                    tnExt = 'gif';
                  }
                }
              );
            }
          }
        );
      }
    }
  );

  return(tnExt);
}

// --------------------------------------------------------
function QD_DataWidget (vname)
{
  var tParam = 'SID='+kit_SID+'&UserID='+kit_UserID+'&TID='+aQDHash['TID']+'&VNAME='+vname;

  QD_Popup = window.open(aQDHash["QD_Domain"]+"/cgi-bin/qd-data-widget.cgi?"+tParam,"datawidget","menubar=0,width=910,height=610,status=0,toolbar=0,location=0,resizable=1");
  QD_Popup.focus();
}

// --------------------------------------------------------
function QD_DataWidgetReturn ()
{
  if (typeof QD_Popup != 'undefined')
  {
    QD_Popup.close();
  }

  var paramlist = 'FA=GET_WIDGET&SID='+kit_SID+'&UserID='+kit_UserID;

  QNET_CallAjax_POST('qd-data-widget.cgi',QD_DataWidgetReturn_Return,paramlist);
}

// --------------------------------------------------------
function QD_DataWidgetReturn_Return (httpObject)
{
  var response = httpObject.responseText;
  if (response !== '')
  {
    LogConsole('QD_DataWidgetReturn_Return : response : '+response);

    var aData = response.split("~");

    var infoQD = document.getElementById('infoQD-'+aData[6]);
    if (infoQD)
    {
      infoQD.innerHTML = aData[1]+' list ('+aData[2]+' records) : '+CurSym+aData[3];
    }

    var divQD = document.getElementById('divQD-'+aData[6]);
    if (divQD)
    {
      divQD.innerHTML = response;
    }
  }
}

// --------------------------------------------------------
function QD_BuildPreview ()
{
  window.alert('SID='+kit_SID);
}

// --------------------------------------------------------
function QD_displayFontSizeList (vname)
{
  var fONC = '';
  var fONMOUT = '';

  var divForm = document.getElementById('kitTabArea2');
  if (divForm)
  {
    var divQDFSLIST = document.getElementById('divQDFSSLIST-'+vname);
    if (divQDFSLIST)
    {
      if (divQDFSLIST.style.display != 'block')
      {
        divQDFSLIST.style.display = "block";
      }
      else
      {
        divQDFSLIST.style.display = "none";
      }
    }
    else
    {
      var divQDLine = document.getElementById('divQDLine-'+vname);
      var divQD = document.getElementById('divQDFS-'+vname);
      if ((divQD)&&(divQDLine))
      {
        var curleft = divQD.offsetLeft;
        var curtop = divQDLine.offsetTop;
        var curheight = divQDLine.offsetHeight;

        // var curtop = divQD.offsetTop;

        var divList = document.createElement('div');
        divList.setAttribute('id','divQDFSSLIST-'+vname);
        divList.setAttribute("class","QD_FS_List");

        divList.style.top = (parseInt(curtop) + parseInt(curheight)) +"px";
        divList.style.left = curleft+"px";
        divList.style.width = "75px";
        divList.style.display = "block";
        divList.style.backgroundColor = "#DDF1FD";

        // Add List Items
        var aVOpts = [];

        if (typeof aQDHash[vname+'_VOpts'] != 'undefined')
        {
          var aVOptPair = aQDHash[vname+'_VOpts'].split("~");
          var iVO = 0;
          for (iVO=0;iVO<aVOptPair.length;iVO++)
          {
            var aVOptsKV = aVOptPair[iVO].split("^");
            aVOpts[aVOptsKV[0]] = aVOptsKV[1];
          }
        }

        var iCnt = 0;
        var z = parseInt(aVOpts["fontmin"]);
        for (z=parseInt(aVOpts["fontmin"]);z<=parseInt(aVOpts["fontmax"]);z++)
        {
          iCnt++;
          var oDivOut = document.createElement('div');
          oDivOut.style.width = "100%";

          fONC = 'QD_SelectFontSize("'+vname+'","'+z+'")';
          oDivOut.onclick = new Function (fONC);

          fONMOUT = 'this.style.backgroundColor="transparent";this.style.color="#333333";';
          oDivOut.onmouseout = new Function (fONMOUT);

          var fONMOVER = 'this.style.backgroundColor="#3399ff";this.style.color="#ffffff";';
          oDivOut.onmouseover = new Function (fONMOVER);

          var oDiv = document.createElement('div');
          oDiv.style.cursor = "pointer";
          oDiv.style.width = "50px";
          oDiv.style.overflow = "hidden";
          oDiv.style.whiteSpace = "nowrap";
          oDiv.style.marginLeft = "2px";
          oDiv.style.textAlign = "center";
          var divText = document.createTextNode(z);

          oDiv.appendChild(divText);
          oDivOut.appendChild(oDiv);
          divList.appendChild(oDivOut);
        }

        if (iCnt > 10)
        {
          iCnt = 10;
        }
        divList.style.height = parseInt(iCnt*18)+"px";

        divForm.appendChild(divList);
      }
    }
  }
}

// --------------------------------------------------------
function QD_SelectFontSize (vname,fontsize)
{
  aQDHash[vname+'_value'] = fontsize;

  var divFontSizeText = document.getElementById('divQDTextFS-'+vname);
  if (divFontSizeText)
  {
    divFontSizeText.innerHTML = fontsize;
  }

  var divQDFSSLIST = document.getElementById('divQDFSSLIST-'+vname);
  if (divQDFSSLIST)
  {
    divQDFSSLIST.style.display = "none";
  }
}

// --------------------------------------------------------
function QD_displayFontFamilyList (vname)
{
  var divForm = document.getElementById('kitTabArea2');
  if (divForm)
  {
    var divQDFSLIST = document.getElementById('divQDFSLIST-'+vname);
    if (divQDFSLIST)
    {
      if (divQDFSLIST.style.display != 'block')
      {
        divQDFSLIST.style.display = "block";
      }
      else
      {
        divQDFSLIST.style.display = "none";
      }
    }
    else
    {
      var divQDLine = document.getElementById('divQDLine-'+vname);
      var divQD = document.getElementById('divQD-'+vname);
      if ((divQD)&&(divQDLine))
      {
        var curleft = divQD.offsetLeft;
        var curtop = divQDLine.offsetTop;
        var curheight = divQDLine.offsetHeight;

        // var curleft = divQD.offsetLeft;
        // var curtop = divQD.offsetTop;

        var divList = document.createElement('div');
        divList.setAttribute('id','divQDFSLIST-'+vname);
        divList.setAttribute("class","QD_FS_List");

        divList.style.top = (parseInt(curtop) + parseInt(curheight)) +"px";
        divList.style.left = curleft+"px";
        divList.style.display = "block";
        divList.style.backgroundColor = "#DDF1FD";

        // Add List Items
        var aFontFamily = aQDHash[vname+'_SelectList'].split("!=!");
        var z = 0;
        for (z=0;z<aFontFamily.length;z++)
        {
          var fontFamily = '';
          var fontDesc = '';
          var fontKerning = '';

          var aFFP = aFontFamily[z].split("^");
          for (w=0;w<aFFP.length;w++)
          {
            var aKV = aFFP[w].split("|");
            if (aKV[0] == "fontFamily")
            {
              fontFamily = aKV[1];
            }
            else if (aKV[0] == "fontDesc")
            {
              fontDesc = aKV[1];
            }
            else if (aKV[0] == "kerning")
            {
              fontKerning = aKV[1];
            }
          }

          var oDivOut = document.createElement('div');
          oDivOut.style.width = "100%";

          var fONC = 'QD_SelectFontFamily("'+vname+'","'+aFontFamily[z]+'")';
          oDivOut.onclick = new Function (fONC);

          var fONMOUT = 'this.style.backgroundColor="transparent";this.style.color="#333333";';
          oDivOut.onmouseout = new Function (fONMOUT);

          var fONMOVER = 'this.style.backgroundColor="#3399ff";this.style.color="#ffffff";';
          oDivOut.onmouseover = new Function (fONMOVER);

          var oDiv = document.createElement('div');
          oDiv.style.cursor = "pointer";
          oDiv.style.width = "100%";
          oDiv.style.overflow = "hidden";
          oDiv.style.whiteSpace = "nowrap";
          oDiv.style.marginLeft = "2px";
          var divText = document.createTextNode(fontDesc);

          oDiv.appendChild(divText);
          oDivOut.appendChild(oDiv);
          divList.appendChild(oDivOut);
        }

        if (z > 10)
        {
          z = 10;
        }

        divList.style.height = parseInt(z*18)+"px";

        divForm.appendChild(divList);
      }
    }
  }
}

// --------------------------------------------------------
function QD_SelectFontFamily (vname,fontData)
{
  aQDHash[vname+'_value'] = fontData;

  var fontFamily = '';
  var fontDesc = '';
  var fontKerning = '';

  var aFFP = fontData.split("^");
  for (w=0;w<aFFP.length;w++)
  {
    var aKV = aFFP[w].split("|");
    if (aKV[0] == "fontFamily")
    {
      fontFamily = aKV[1];
    }
    else if (aKV[0] == "fontDesc")
    {
      fontDesc = aKV[1];
    }
    else if (aKV[0] == "kerning")
    {
      fontKerning = aKV[1];
    }
  }

  var divFontFamilyText = document.getElementById('divQDText-'+vname);
  if (divFontFamilyText)
  {
    divFontFamilyText.innerHTML = fontDesc;
  }

  var divQDFSLIST = document.getElementById('divQDFSLIST-'+vname);
  if (divQDFSLIST)
  {
    divQDFSLIST.style.display = "none";
  }
}

// --------------------------------------------------------
function QD_displayFontColorList (vname)
{
  var divForm = document.getElementById('kitTabArea2');
  if (divForm)
  {
    var divQDCSLIST = document.getElementById('divQDCSLIST-'+vname);
    if (divQDCSLIST)
    {
      if (divQDCSLIST.style.display != 'block')
      {
        divQDCSLIST.style.display = "block";
      }
      else
      {
        divQDCSLIST.style.display = "none";
      }
    }
    else
    {
      var divQDLine = document.getElementById('divQDLine-'+vname);
      var divQD = document.getElementById('divQD-'+vname);
      if ((divQD)&&(divQDLine))
      {
        var curleft = divQD.offsetLeft;
        var curtop = divQDLine.offsetTop;
        var curheight = divQDLine.offsetHeight;

        // var curtop = divQD.offsetTop;

        var divList = document.createElement('div');
        divList.setAttribute('id','divQDCSLIST-'+vname);
        divList.setAttribute("class","QD_CS_List");

        divList.style.top = (parseInt(curtop) + parseInt(curheight)) +"px";
        divList.style.left = curleft+"px";
        divList.style.display = "block";
        divList.style.backgroundColor = "#DDF1FD";

        // Add List Items
        // alert(aQDHash[vname+'_SelectList']);
        var aFontColor = aQDHash[vname+'_SelectList'].split("!=!");
        var z=0;
        for (z=0;z<aFontColor.length;z++)
        {
          var cdata = new QD_GetFontColorObject (aFontColor[z]);

          var htmlColor = rgbToHex(cdata.colorR,cdata.colorG,cdata.colorB);

          var oDivOut = document.createElement('div');
          oDivOut.style.width = "100%";

          var fONC = 'QD_SelectFontColor("'+vname+'","'+aFontColor[z]+'")';
          oDivOut.onclick = new Function (fONC);

          var fONMOUT = 'this.style.backgroundColor="transparent";this.style.color="#333333";';
          oDivOut.onmouseout = new Function (fONMOUT);

          var fONMOVER = 'this.style.backgroundColor="#3399ff";this.style.color="#ffffff";';
          oDivOut.onmouseover = new Function (fONMOVER);

          var oDiv1 = document.createElement('div');
          oDiv1.style.cursor = "pointer";
          oDiv1.style.cssFloat = "left";
          oDiv1.style.styleFloat = "left";
          oDiv1.style.width = "20px";
          oDiv1.style.height = "20px";
          oDiv1.style.marginLeft = "2px";
          oDiv1.style.marginTop = "2px";
          oDiv1.style.backgroundColor = "#"+htmlColor;

          var oDiv2 = document.createElement('div');
          oDiv2.style.cursor = "pointer";
          oDiv2.style.cssFloat = "left";
          oDiv2.style.styleFloat = "left";
          oDiv2.style.width = "245px";
          oDiv2.style.overflow = "hidden";
          oDiv2.style.whiteSpace = "nowrap";
          oDiv2.style.marginLeft = "5px";
          oDiv2.style.marginTop = "2px";
          var divText = document.createTextNode(cdata.colorDesc);
          oDiv2.appendChild(divText);

          var oDiv3 = document.createElement('div');
          oDiv3.style.clear = "both";

          oDivOut.appendChild(oDiv1);
          oDivOut.appendChild(oDiv2);
          oDivOut.appendChild(oDiv3);
          divList.appendChild(oDivOut);
        }

        if (z > 10)
        {
          z = 10;
        }

        divList.style.height = parseInt(z*23)+"px";

        divForm.appendChild(divList);
      }
    }
  }
}

// --------------------------------------------------------
function QD_GetFontColorObject (colorRec)
{
  this.colorDesc = '';
  this.colorR = '';
  this.colorG = '';
  this.colorB = '';
  this.colorC = '';
  this.colorM = '';
  this.colorY = '';
  this.colorK = '';
  this.colorSpot = '';
  this.colorTint = '';

  var aFCP = colorRec.split("^");
  for (w=0;w<aFCP.length;w++)
  {
    var aKV = aFCP[w].split("|");
    if (aKV[0] == "colorDesc")
    {
      this.colorDesc = aKV[1];
    }
    else if (aKV[0] == "R")
    {
      this.colorR = aKV[1];
    }
    else if (aKV[0] == "G")
    {
      this.colorG = aKV[1];
    }
    else if (aKV[0] == "B")
    {
      this.colorB = aKV[1];
    }
    else if (aKV[0] == "C")
    {
      this.colorC = aKV[1];
    }
    else if (aKV[0] == "M")
    {
      this.colorM = aKV[1];
    }
    else if (aKV[0] == "Y")
    {
      this.colorY = aKV[1];
    }
    else if (aKV[0] == "K")
    {
      this.colorK = aKV[1];
    }
    else if (aKV[0] == "Spot")
    {
      this.colorSpot = aKV[1];
    }
    else if (aKV[0] == "Tint")
    {
      this.colorTint = aKV[1];
    }
  }
}

// ------------------------------------------------------------------
function QD_SelectFontColor (vname,colorAttr)
{
  aQDHash[vname+'_value'] = colorAttr;

  var colorDesc = '';
  var colorR = '';
  var colorG = '';
  var colorB = '';
  var colorC = '';
  var colorM = '';
  var colorY = '';
  var colorK = '';
  var colorSpot = '';
  var colorTint = '';

  var aFCP = colorAttr.split("^");
  for (w=0;w<aFCP.length;w++)
  {
    var aKV = aFCP[w].split("|");
    if (aKV[0] == "colorDesc")
    {
      colorDesc = aKV[1];
    }
    else if (aKV[0] == "R")
    {
      colorR = aKV[1];
    }
    else if (aKV[0] == "G")
    {
      colorG = aKV[1];
    }
    else if (aKV[0] == "B")
    {
      colorB = aKV[1];
    }
    else if (aKV[0] == "C")
    {
      colorC = aKV[1];
    }
    else if (aKV[0] == "M")
    {
      colorM = aKV[1];
    }
    else if (aKV[0] == "Y")
    {
      colorY = aKV[1];
    }
    else if (aKV[0] == "K")
    {
      colorK = aKV[1];
    }
    else if (aKV[0] == "Spot")
    {
      colorSpot = aKV[1];
    }
    else if (aKV[0] == "Tint")
    {
      colorTint = aKV[1];
    }
  }

  var htmlColor = rgbToHex(colorR,colorG,colorB);

  var divFontColorText = document.getElementById('divQDText-'+vname);
  if (divFontColorText)
  {
    divFontColorText.innerHTML = colorDesc;
  }

  var divFontColorSwatch = document.getElementById('divQDSwatch-'+vname);
  if (divFontColorSwatch)
  {
    divFontColorSwatch.style.backgroundColor = '#'+htmlColor;
  }

  var divQDCSLIST = document.getElementById('divQDCSLIST-'+vname);
  if (divQDCSLIST)
  {
    divQDCSLIST.style.display = "none";
  }
}

// ------------------------------------------------------------------
function toHex(n)
{
  n = parseInt(n,10);
  if (isNaN(n))
    { return "00"; }

  n = Math.max(0,Math.min(n,255));
  return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);
}

// ------------------------------------------------------------------
function rgbToHex(R,G,B)
{
  return toHex(R)+toHex(G)+toHex(B);
}

// ------------------------------------------------------------------
function LogConsole(text)
{
  // window.console.log('qdesign-detail.js : '+text);
}

// ------------------------------------------------------------------
function HTMLEncode(str)
{
  var i = str.length;
  var aRet = [];

  while (i--) 
  {
    var iC = str[i].charCodeAt();
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
function QD_ClearImage (vname)
{
  QD_ReturnImage(vname,'');

}

// --------------------------------------------------------
function QD_SetCalendarPosition (containerID,refID)
{
  var oREF = document.getElementById(refID);
  var div = document.getElementById(containerID);
  var iframe = document.getElementById('scwIframe');
  var scwTable = document.getElementById('scw');
  if ((div)&&(iframe)&&(scwTable))
  {
    div.appendChild(scwTable);

    if (oREF)
    {
      var iTop = oREF.offsetTop - oREF.scrollTop;
      scwTable.style.top = iTop+'px';
    }
  }
}

// --------------------------------------------------------
function QD_DisplayDefaultTN ()
{
  var ts = new Date();
  IMG_ts = ts;

  aQDHash["PreviewUser"] = 0;
  QD_LoadPreviewPage (1);
}

// --------------------------------------------------------
function QD_ClearForm ()
{
  var aVOpts = [];
  var inQDF;
  var divQDText;
  var imgQD;
  var divQDSwatch;
  var aVar = aQDHash["FormOrder"].split("^");
  var qdi=0;

  for (qdi=0;qdi<aVar.length;qdi++)
  {
    aVOpts = [];

    if (typeof aQDHash[aVar[qdi]+'_VOpts'] != 'undefined')
    {
      aVOptPair = aQDHash[aVar[qdi]+'_VOpts'].split("~");
      iVO = 0;
      for (iVO=0;iVO<aVOptPair.length;iVO++)
      {
        aVOptsKV = aVOptPair[iVO].split("^");
        aVOpts[aVOptsKV[0]] = aVOptsKV[1];
      }
    }

    if (aQDHash[aVar[qdi]+'_type'] == 'ui')
    {
      if (typeof aQDHash[aVar[qdi]+'_FormatField'] != 'undefined')
      {
        iPart = 1;
        inQDF = document.getElementById('inQDF-'+aVar[qdi]+'-'+iPart);
        while (inQDF)
        {
          inQDF.value = '';

          iPart++;
          inQDF = document.getElementById('inQDF-'+aVar[qdi]+'-'+iPart);
        }
      }
      else
      {
        inQDF = document.getElementById('inQDF-'+aVar[qdi]);
        if (inQDF)
        {
          inQDF.value = '';
        }
      }
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'ul') // Linked Variable
    {
      divQDText = document.getElementById('divQDText-'+aVar[qdi]);
      if (divQDText)
      {
        divQDText.innerHTML = 'None';
      }
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'us') // combo selection
    {
      divQDText = document.getElementById('divQDText-'+aVar[qdi]);
      if (divQDText)
      {
        divQDText.innerHTML = 'None';
      }
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'iq') // qr code
    {
    }
    else if ((aQDHash[aVar[qdi]+'_type'] == 'is') || // image selection
             (aQDHash[aVar[qdi]+'_type'] == 'iu'))   // image upload
    {
      imgQD = document.getElementById('imgQD-'+aVar[qdi]);
      if (imgQD)
      {
        imgQD.style.display = 'none';
      }

      divQDText = document.getElementById('divITQD-'+aVar[qdi]);
      if (divQDText)
      {
        divQDText.style.display = 'inline-block';
      }
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'fu') // file upload
    {
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'p1') // AccuSource
    {
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'p2') // Data Widget
    {
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'mg') // message
    {
      // Ignore
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'fs') // font selection
    {
      divQDText = document.getElementById('divQDText-'+aVar[qdi]);
      if (divQDText)
      {
        divQDText.innerHTML = 'None';
      }

      divQDText = document.getElementById('divQDTextFS-'+aVar[qdi]);
      if (divQDText)
      {
        divQDText.innerHTML = 'None';
      }
    }
    else if (aQDHash[aVar[qdi]+'_type'] == 'cs') // color selection
    {
      divQDSwatch = document.getElementById('divQDSwatch-'+aVar[qdi]);
      if (divQDSwatch)
      {
        divQDSwatch.style.backgroundColor = '#ffffff';
      }

      divQDText = document.getElementById('divQDText-'+aVar[qdi]);
      if (divQDText)
      {
        divQDText.innerHTML = 'None';
      }
    }
  }
}
