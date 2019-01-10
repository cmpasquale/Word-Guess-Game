/*
  AUTHOR: John Freeman <jfreeman@e-quantum.com>
  
  The following functions are available:

  attachStyles(oNode,strStyle)
  findPos(obj)
  ohBuildDivArea()
  ohBuildOrderHistoryLine(recdata)
  ohEnableScreenBlock(divBlockoutID)
  ohHidePopup(PopUpID)
  ohLoadOrderHistory(dist,client,cc,userid,itemclient,linetype,item, refID)
  ohSetDivAreaID(id)
  stripNodes(oEle)

*/

var ohDivAreaID = 'oh_divAreaID';
var ohDivBlockoutID = 'divBlockoutIDMGR';
var ohDivW = '800';
var ohDivH = '300';
var ohRefTopOffset = -100;
var ohDetailColor1 = '#ffffff';
var ohDetailColor2 = '#dddddd';
var ohCurrentColor = '#dddddd';
var ohRecordLimit = '20';
var enableResupply = 0;
var showResupply = 0;

var oh_dist = '';
var oh_client = '';
var oh_cc = '';
var oh_userid = '';
var oh_itemclient = '';
var oh_linetype = '';
var oh_item = '';
var oh_refID = '';
var oh_mgrMode = '';
var oh_itemtype = '';

function attachStyles(oNode,strStyle)
{
  var aStyle = strStyle.split(";");
  var i=0;
  for (i=0;i<aStyle.length;i++)
  {
    if (aStyle[i] !== "")
    {
      var aPair = aStyle[i].split(":");
      oNode.style[aPair[0]] = aPair[1];
    }
  }
}

function findPos(obj)
{
  var curleft = 0;
  var curtop = 0;
  if (obj.offsetParent)
  {
    do
    {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
  }
//   alert("curleft="+curleft+"=\ncurtop="+curtop+"=");

  return [curleft,curtop];
}

function ohBuildDivArea()
{
  var oDiv = document.getElementById(ohDivAreaID);
  if (oDiv)
  {
    return (oDiv);
  }
  else
  {
    var fONC = '';

    var ohDivMain = document.createElement('div');
    ohDivMain.setAttribute("id",ohDivAreaID);
    attachStyles(ohDivMain,"display:none;position:absolute;border:1px #000000 solid;backgroundColor:#ffffff;zIndex:11001;");

    var ohDivHead = document.createElement('div');
    attachStyles(ohDivHead,"fontFamily:arial;fontSize:13px;fontWeight:bold;backgroundColor:#333333;color:#ffffff;width:100\%;paddingBottom:1px;");

    var ohButtonCloseMain = document.createElement('button');
    attachStyles(ohButtonCloseMain,"cssFloat:right;styleFloat:right;margin:2px 5px 0 0;fontFamily:arial;fontSize:11px;");
    fONC = 'ohHidePopup("popupOrderHistory")';
    ohButtonCloseMain.onclick = new Function (fONC);
    var ohTextButtonCloseMain = document.createTextNode("Close");
    ohButtonCloseMain.appendChild(ohTextButtonCloseMain);
    ohDivHead.appendChild(ohButtonCloseMain);
    var ohButtonResupply = document.createElement('button');
    ohButtonResupply.setAttribute("id","ohButtonResupply");
    attachStyles(ohButtonResupply,"cssFloat:right;styleFloat:right;margin:2px 5px 0 0;fontFamily:arial;fontSize:11px;");
    fONC = 'ohViewHistory("1")';
    ohButtonResupply.onclick = new Function (fONC);
    var ohTextButtonResupply = document.createTextNode("View Resupply History");
    ohButtonResupply.appendChild(ohTextButtonResupply);
    ohDivHead.appendChild(ohButtonResupply);

    var ohButtonOrder = document.createElement('button');
    ohButtonOrder.setAttribute("id","ohButtonOrder");
    attachStyles(ohButtonOrder,"cssFloat:right;styleFloat:right;margin:2px 5px 0 0;fontFamily:arial;fontSize:11px;");
    fONC = 'ohViewHistory("0")';
    ohButtonOrder.onclick = new Function (fONC);
    var ohTextButtonOrder = document.createTextNode("View Order History");
    ohButtonOrder.appendChild(ohTextButtonOrder);
    ohDivHead.appendChild(ohButtonOrder);

    var ohDivTitle = document.createElement('div');
    ohDivTitle.setAttribute("id","divOHTitle");
    attachStyles(ohDivTitle,"fontSize:15px;width:200px;textAlign:left;padding:2px 0 2px 5px;");
    ohDivHead.appendChild(ohDivTitle);

    var ohDivItemDesc = document.createElement('div');
    ohDivItemDesc.setAttribute("id","divOHItemDesc");
    attachStyles(ohDivItemDesc,"fontSize:15px;width:700px;textAlign:left;padding:2px 0 2px 5px;");
    ohDivHead.appendChild(ohDivItemDesc);

    var ohDivCol1 = document.createElement('div');
    attachStyles(ohDivCol1,"cssFloat:left;styleFloat:left;width:60px;textAlign:center;padding:2px;");
    var ohTextCol1 = document.createTextNode("OrderID");
    ohDivCol1.appendChild(ohTextCol1);
    ohDivHead.appendChild(ohDivCol1);

    var ohDivCol2 = document.createElement('div');
    attachStyles(ohDivCol2,"cssFloat:left;styleFloat:left;width:80px;textAlign:center;padding:2px;");
    var ohTextCol2 = document.createTextNode("OrderDate");
    ohDivCol2.appendChild(ohTextCol2);
    ohDivHead.appendChild(ohDivCol2);

    var ohDivCol3 = document.createElement('div');
    attachStyles(ohDivCol3,"cssFloat:left;styleFloat:left;width:50px;textAlign:center;padding:2px;");
    var ohTextCol3 = document.createTextNode("Qty");
    ohDivCol3.appendChild(ohTextCol3);
    ohDivHead.appendChild(ohDivCol3);

    var ohDivCol4 = document.createElement('div');
    attachStyles(ohDivCol4,"cssFloat:left;styleFloat:left;width:60px;textAlign:center;padding:2px;");
    var ohTextCol4 = document.createTextNode("UOM");
    ohDivCol4.appendChild(ohTextCol4);
    ohDivHead.appendChild(ohDivCol4);

    var ohDivCol5 = document.createElement('div');
    attachStyles(ohDivCol5,"cssFloat:left;styleFloat:left;width:60px;textAlign:right;marginLeft:2px;marginRight:4px;");
    var ohTextCol5 = document.createTextNode("Price");
    ohDivCol5.appendChild(ohTextCol5);
    ohDivHead.appendChild(ohDivCol5);

    var ohDivCol6 = document.createElement('div');
    attachStyles(ohDivCol6,"cssFloat:left;styleFloat:left;width:200px;textAlign:left;marginLeft:4px;marginRight:4px;");
    var ohTextCol6 = document.createTextNode("ShipTo");
    ohDivCol6.appendChild(ohTextCol6);
    ohDivHead.appendChild(ohDivCol6);

    var ohDivCol7 = document.createElement('div');
    attachStyles(ohDivCol7,"cssFloat:left;styleFloat:left;width:100px;textAlign:left;marginLeft:4px;marginRight:2px;");
    var ohTextCol7 = document.createTextNode("User");
    ohDivCol7.appendChild(ohTextCol7);
    ohDivHead.appendChild(ohDivCol7);

    var ohDivCol8 = document.createElement('div');
    attachStyles(ohDivCol8,"clear:both;");
    ohDivHead.appendChild(ohDivCol8);

    ohDivMain.appendChild(ohDivHead);

    var ohDivDetail = document.createElement('div');
    ohDivDetail.setAttribute("id","divOHDetail");
    attachStyles(ohDivDetail,"fontFamily:arial;fontSize:13px;width:100\%;height:100px;overflow:auto;");
    ohDivMain.appendChild(ohDivDetail);

    document.body.appendChild(ohDivMain);

    return(ohDivMain);
  }
}

function ohBuildOrderHistoryLine(recdata)
{
  var oDetailOH = document.getElementById("divOHDetail");
  var div1;
  var text1;
  if (oDetailOH)
  {
    if (recdata !== '')
    {
      if (ohCurrentColor == ohDetailColor1)
        { ohCurrentColor = ohDetailColor2; }
      else
        { ohCurrentColor = ohDetailColor1; }
          
      //alert ("recdata="+recdata);
      // OrderID^OrderDate^UserID^Qty^MQty^Price^UnitCode^Units^cc^ccname^username
      // OrderID^OrderDate^UserID^Qty^MQty^Price^UnitCode^Units^username^hshiptoid^mshiptoid^ccname
      var aLine = recdata.split("^");

      var aOrderDate = aLine[1].split("-");

      var tQty = aLine[3];
      if (aLine[4] > 0)
      {
        tQty = aLine[4];
      }
      var divLine = document.createElement('div');
      attachStyles(divLine,"width:100\%;backgroundColor:"+ohCurrentColor+";paddingTop:2px;paddingBottom:2px;");

      div1 = document.createElement('div');
      attachStyles(div1,"cssFloat:left;styleFloat:left;width:60px;textAlign:center;marginLeft:2px;marginRight:2px;");
      text1 = document.createTextNode(aLine[0]);
      div1.appendChild(text1);
      divLine.appendChild(div1);

      var div2 = document.createElement('div');
      attachStyles(div2,"cssFloat:left;styleFloat:left;width:80px;textAlign:center;marginLeft:2px;marginRight:2px;");
      var text2 = document.createTextNode(aOrderDate[1]+'-'+aOrderDate[2]+'-'+aOrderDate[0]);
      div2.appendChild(text2);
      divLine.appendChild(div2);

      var div3 = document.createElement('div');
      attachStyles(div3,"cssFloat:left;styleFloat:left;width:50px;textAlign:center;marginLeft:2px;marginRight:2px;");
      div3.innerHTML = aLine[4];
      divLine.appendChild(div3);

      var div4 = document.createElement('div');
      attachStyles(div4,"cssFloat:left;styleFloat:left;width:60px;textAlign:right;marginLeft:2px;marginRight:4px;");
      div4.innerHTML = aLine[6];
      divLine.appendChild(div4);

      var div5 = document.createElement('div');
      attachStyles(div5,"cssFloat:left;styleFloat:left;width:60px;textAlign:right;marginLeft:2px;marginRight:4px;");
      div5.innerHTML = aLine[5];
      divLine.appendChild(div5);

      var div6 = document.createElement('div');
      attachStyles(div6,"cssFloat:left;styleFloat:left;width:200px;textAlign:left;fontSize:11px;marginLeft:4px;marginRight:4px;overflow:hidden;height:18px;whiteSpace:nowrap;");
      div6.innerHTML = "["+aLine[8]+"] "+aLine[9];
      divLine.appendChild(div6);

      var div7 = document.createElement('div');
      attachStyles(div7,"cssFloat:left;styleFloat:left;width:100px;textAlign:left;fontSize:11px;marginLeft:4px;marginRight:2px;overflow:hidden;height:18px;whiteSpace:nowrap;");
      div7.innerHTML = aLine[7];
      divLine.appendChild(div7);

      var div8 = document.createElement('div');
      attachStyles(div8,"clear:both;");
      divLine.appendChild(div8);

      oDetailOH.appendChild(divLine);
    }
    else
    {
      div1 = document.createElement('div');
      attachStyles(div1,"width:100\%;textAlign:center;font-style:italic;font-weight:bold;");
      text1 = document.createTextNode("Order History Unavailable");
      div1.appendChild(text1);

      if (showResupply == 1)
      {
        div1.innerHTML = "Resupply History Unavailable";
      }

      oDetailOH.appendChild(div1);
    }
  }
}

function ohEnableScreenBlock(divBlockoutID)
{
  var divBlockout = document.getElementById(divBlockoutID);
  if (divBlockout)
  {
  }
  else
  {
    divBlockout = document.createElement('div');
    divBlockout.setAttribute('id',divBlockoutID);
  }

  if (divBlockout)
  {
    var myWidth;
    var myHeight;

    myHeight = document.body.scrollHeight;
    myWidth = document.body.scrollWidth;

//alert ("myWidth="+myWidth+" myHeight="+myHeight);

    divBlockout.style.backgroundColor = "#000000";
    divBlockout.style.position = "absolute";
    divBlockout.style.top = "0px";
    divBlockout.style.left = "0px";
    divBlockout.style.opacity = ".6";
    divBlockout.style.filter = "alpha (opacity=60)";
    divBlockout.style.height = myHeight+"px";
    divBlockout.style.width = myWidth+"px";
    divBlockout.style.zIndex = "11000";
//    divBlockout.style.height = document.body.clientHeight+"px";
//    divBlockout.style.width = document.body.clientWidth+"px";
    document.body.appendChild(divBlockout);
  }
}

function ohHidePopup(PopUpID)
{
  var oDiv = document.getElementById(ohDivAreaID);
  if (oDiv)
  {
    oDiv.style.visibility = "visible";
    oDiv.style.display = "none";
  }

  var oBlockout = document.getElementById(ohDivBlockoutID);
  if (oBlockout)
  {
    document.body.removeChild(oBlockout);
  }
}

function ohLoadOrderHistory(dist,client,cc,userid,itemclient,linetype,item,refID,mgrMode,itemtype,overrideResupply)
{
//  alert('dist='+dist+"=\nclient="+client+"=\ncc="+cc+"=\nuserId="+userid+"=\nitemClient="+itemclient+"=\nlineType="+linetype+"=\nitem="+item+"=\nrefID="+refID+"=\nmgrMode="+mgrMode+"=\nitemType"+itemtype+"=\noverrideResupply"+overrideResupply+'=');

  oh_dist = dist;
  oh_client = client;
  oh_cc = cc;
  oh_userid = userid;
  oh_itemclient = itemclient;
  oh_linetype = linetype;
  oh_item = item;
  oh_refID = refID;
  oh_mgrMode = mgrMode;
  oh_itemtype = itemtype;
  showResupply = 0;

  var oDiv = ohBuildDivArea();
  if (oDiv)
  {
    if (itemtype == 2)
    {
      enableResupply = 1;
    }
    else
    {
      enableResupply = 0;
    }

    if (typeof(overrideResupply) != "undefined")
    {
      if (overrideResupply === 0)
      {
        showResupply = 0;
      }
      else if (overrideResupply == 1)
      {
        showResupply = 1;
      }
    }

    oDiv.style.width = ohDivW+"px";

    var oDetailOH = document.getElementById("divOHDetail");
    if (oDetailOH)
    {
      var oOHTitle = document.getElementById("divOHTitle");
      if (oOHTitle)
      {
        if (showResupply == 1)
        {
          oOHTitle.innerHTML = 'Viewing Resupply History';
        }
        else
        {
          oOHTitle.innerHTML = 'Viewing Order History';
        }
      }

      var oOHItemDesc = document.getElementById("divOHItemDesc");
      if (oOHItemDesc)
      {
        oOHItemDesc.innerHTML = item;
      }

      stripNodes(oDetailOH);
    }

    var oButtonOrder = document.getElementById("ohButtonOrder");
    var oButtonResupply = document.getElementById("ohButtonResupply");
    if ((oButtonResupply)&&(oButtonResupply))
    {
      if (enableResupply)
      {
        oButtonResupply.style.display = "block";
        oButtonOrder.style.display = "block";
      }
      else
      {
        oButtonResupply.style.display = "none";
        oButtonOrder.style.display = "none";
      }
    }

    ohCurrentColor = ohDetailColor2;

    var ts = new Date();
    var varpar = 'DIST='+dist+'&CLIENT='+escape(client)+'&CC='+escape(cc)+'&UserID='+userid+'&ITEMCLIENT='+escape(itemclient)+'&LineType='+linetype+'&ITEM='+escape(item)+'&MgrMode='+mgrMode+'&RecLimit='+ohRecordLimit+'&ItemType='+itemtype+'&showResupply='+showResupply+'&ts='+ts.getTime();
//    alert(varpar);
    QNET_CallAjax_POST ('qn-load-order-history.pl',backohLoadOrderHistory,varpar, refID);
  }
}

function backohLoadOrderHistory(ajaxreturn, refID) {
  var oDiv = ohBuildDivArea();
  var response = ajaxreturn.responseText;
  // alert("ohLoadOrderHistory:response="+response);
  if (response === 'No order history for this item.') {
    var divLine = document.createElement('div');
    attachStyles(divLine,"width:100\%;backgroundColor:"+ohCurrentColor+";paddingTop:2px;paddingBottom:2px;");
    text1 = document.createTextNode('No Resupply History for this item.');
    divLine.appendChild(text1);
    document.getElementById("divOHDetail").appendChild(divLine);
  } else { 
    var aRec = response.split("~");
    var i=0;
    for (i=0;i<aRec.length;i++)
    {
      ohBuildOrderHistoryLine(aRec[i]);
    }
  }

  ohEnableScreenBlock(ohDivBlockoutID);

  document.body.appendChild(oDiv);
  oDiv.style.display = "block";

  var IpopLeft = (document.body.clientWidth - oDiv.offsetWidth) / 2;

  var oRef = document.getElementById(refID);
  if (oRef)
  {
    var aPos = findPos(oRef);
    var offLeft = aPos[0];
    var offTop = aPos[1] + ohRefTopOffset;

    if (offTop < 0)
    {
      offTop = 0;
    }
//   alert("if:offTop="+offTop+"=\nIpopLeft="+IpopLeft+"=");

    oDiv.style.top = offTop+"px";
    oDiv.style.left = IpopLeft+"px";

    //alert("ohLoadOrderHistory:IpopLeft="+IpopLeft+" offTop="+offTop+" body.scrollHeight="+document.body.scrollHeight+" body.scrollWidth="+document.body.scrollWidth);
  }
  else
  {
    var sLeft = 0;
    var sTop = 0;
    if ('pageXOffset' in window) 
    { // all browsers, except IE before version 9
      sLeft =  window.pageXOffset;
      sTop = window.pageYOffset;
    }
    else 
    { // Internet Explorer before version 9
      var factor = 1;
      if (document.body.getBoundingClientRect)
      {
        // rect is only in physical pixel size in IE before version 8 
        var rect = document.body.getBoundingClientRect ();
        var physicalW = rect.right - rect.left;
        var logicalW = document.body.offsetWidth;

        // the zoom level is always an integer percent value
        factor = Math.round ((physicalW / logicalW) * 100) / 100;
      }

      sLeft = Math.round (document.documentElement.scrollLeft / factor);
      sTop = Math.round (document.documentElement.scrollTop / factor);
    }

    // console.log("else : sTop("+sTop+") IpopLeft("+IpopLeft+")");

    oDiv.style.top = sTop+"px";
    oDiv.style.left = IpopLeft+"px";
  }

  oDiv.style.visibility = "visible";
}

function ohSetDivAreaID(id)
{
  ohDivAreaID = id;
}

function stripNodes(oEle)
{
  if ( oEle.hasChildNodes() )
  {
    while ( oEle.childNodes.length >= 1 )
      { oEle.removeChild( oEle.firstChild ); }
  }
}

function ohViewHistory(historytype)
{
  ohLoadOrderHistory (oh_dist,oh_client,oh_cc,oh_userid,oh_itemclient,oh_linetype,oh_item,oh_refID,oh_mgrMode,oh_itemtype,historytype);
}
