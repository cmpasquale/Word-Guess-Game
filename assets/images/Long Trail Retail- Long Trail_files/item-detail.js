// use qnet-core

/* globals escape */
/* globals QNET_CallAjax_POST */
/* globals URLDecode */
/* globals strToPlainText */
/* globals stripNodes */
/* globals aQDHash */
/* globals QD_CheckRequiredFields */
/* globals QD_GetDataString */

/*
  AUTHOR: John Freeman <jfreeman@e-quantum.com>

  The following functions are available:

  getHTTPObject()
  initializePopupValues()
  kit_BuildMask()
  kit_BuildPopup()
  kit_GetData()
  kit_HidePopup()
  kit_LoadData()
  kit_LoadPopup(dist,userid,client,catclient,item,cattype,catid,retailstore,vcdbname,qnetdomain,qnetcatalogdomain)


  Edit:
  <script type="text/javascript" src="./javascript/item-detail.js"></script>

  kit_callback_function = 'yc2_addtocart_callback';
  kit_updatecount_function = 'yc2_updatecount';

  qnetdomain = "https://"+"$hSite->{'QNET_DOMAIN'}";
  qnetcatalogdomain = "https://"+"$hSite->{'QNET_CATALOG_DOMAIN'}";

  kit_LoadPopup_Edit (dist,userid,wsid,linenum,retailstore,qnetdomain,qnetcatalogdomain)
*/

var kit_callback_function;
var kit_updatecount_function;

var kitDivAreaID = "divKitArea";
var kitDivAreaIDSub = "divKitAreaSub";
var kitDivMask = "kit_div_mask";
var kitDivMaskSub = "kit_div_mask_sub";

var kit_isEdit = 0;
var kit_EditLineNum = 0;

// Parameters for qn-get-item.pl
var kit_SID = "";
var kit_Dist = "";
var kit_User_CC = "";
var kit_UserID = "";
var kit_CustID = "";
var kit_WsID = "";
var kit_OrderID = "";
var kit_Client = "";
var kit_CatClient = "";
var kit_ItemID = "";
var kit_CatType = "";
var kit_CatID = "";
var kit_RetailStore = "";
var kit_vcDBName = "";
var kit_QnetDomain = "";
var kit_QnetCatalogDomain = "";
var kit_PriceDec = 2;
var kit_listitemref = 0;
var kit_viewonly = 0;
var kit_hasPricing = 0;

// Sub Parameters for qn-get-item.pl
var kit_isSub = 0;
var kit_sub_Client = "";
var kit_sub_CatClient = "";
var kit_sub_ItemID = "";
var kit_sub_CatType = "";
var kit_sub_CatID = "";
var kit_sub_Ref = "";
var kit_sub_Ref_Part = "";
var kit_sub_Ref_Last = "";
var kit_sub_Ref_Part_Last = "";
var kit_sub_viewonly = 0;

// Price Table
var kit_PriceLabel1 = "";
var kit_PriceLabel2 = "";
var kit_PriceLabel3 = "";
var kit_PriceLabel4 = "";
var kit_ZeroPrice = "Call ";
var kit_PriceBreak = "Price Break";
var kit_SelectQty = "Select Quantity";
var kit_ZeroPricePopup = "";

// Price Grid
var kit_Grid_x = "";
var kit_Grid_y = "";
var kit_GridId_x = "";
var kit_GridId_y = "";
var kit_ItemPrice = 0;
var kit_isMatrix = 0;
var kit_MatrixQtyTotal = 0;

// Customized labels: Bug 8054/8007/8054
var idpItemnum = 'Item No.';
var idpZoom = 'Zoom';
var idpAttach = 'Attach File:';
var idpAttrUnit = 'unit';
var idpFav = 'Favorites';
// var kit_SelectQty = "Select Quantity";
// var kit_PriceBreak = "Price Break";
var idpWeight = 'Weight';
var mxMinQtyLbl = 'Minimum Quantity';
var hdQtyLbl = 'Quantity';
var hdPriceLbl = 'Price';
var hdTotLbl = 'Total';
var sbText = 'Select';
var sbTextSelected = 'Selected';
var mxHDUPLbl = 'Unit Price';
var mxHDFCLbl = 'Flat Charge';

var kit_MainLineNum = '';
var kit_Type = '';
var kit_index = '';
var kit_indexsub = '';

var aDetailHash = [];
var aKH = [];
var aKHD = [];
var aKDH = [];
var aKDD = [];
var aKHedit = [];
var aKDDedit = [];
var aInit = [];
var aUDEF = [];

var kit_ViewInventory = 0;
var kit_InvQtyPrompt = '';

var kit_AddToCartText = "Add To Cart";
var kit_AddToKitText = "Update Kit Item";
var kit_UpdateCartText = "Update Cart";
var kit_PleaseWaitText = "Please Wait";
var kit_WarnPriceGridQty = "Warning! Quantity must be selected in the price grid.";

var QD_PreviewRequiredText = 'Preview required';
var QD_WaitPreviewText = 'Wait for preview to finish';
var QD_FieldRequired = 'is required';

var kit_AddingItemToCart = "Adding Item to Cart...";

var kit_UserClient = "";
var kit_UserCC = "";

var aHasTab = [];
aHasTab[0] = 0;
aHasTab[1] = 1;
aHasTab[2] = 0;
aHasTab[3] = 0;
aHasTab[4] = 0;
aHasTab[5] = 0;

var CurSym = '&#36;';
var aHashEdit = [];

var aDetailInput = []; // id^required(YorN)
var aDetailInput_SUB = []; // id^required(YorN)

var has_ItemStats = 0;
var timeoutID = '';

var iAddAtt1 = 0;
var iAddAtt2 = 0;
var aAddAtt1 = [];
var aAddAtt2 = [];

var _ZeroPrice     = "Zero Price";
var _PriceBreak    = "Price Break";

var _PriceBreakOrMore = "Price Break";

// ------------------------------------------------------------------
function initializePopup(dist,client,cc,userid,custid,wsid)
{
  kit_Dist = dist;
  kit_User_CC = cc;

  var paramlist = 'DIST='+kit_Dist+'&Client='+client+'&CC='+cc+'&UserID='+userid+'&CustID='+custid+'&WsID='+wsid;
  QNET_CallAjax_POST('qn-init-item-popup.pl',initializePopup_Return,paramlist);
}

// ------------------------------------------------------------------
function initializePopup_Return(httpObject)
{
  var response = httpObject.responseText;
  if (response !== '')
  {
    var aKVP = response.split("~~");
    var i=0;
    for (i=0;i<aKVP.length;i++)
    {
      var aKV = aKVP[i].split("||");
      aInit[aKV[0]] = aKV[1];
    }
  }
}

// ------------------------------------------------------------------
function ITMD_SetFunctionTimer(delay)
{
  timeoutID = window.setTimeout(kit_pricePopupOpen,delay);
}

// ------------------------------------------------------------------
function ITMD_ClearFunctionTimer()
{
  window.clearTimeout(timeoutID);
}

// ------------------------------------------------------------------
function kit_AddKitToCart() 
{
  var paramlist = '';
  if (kit_index<aKH.length) 
  {
    var aKP = aKHD[kit_index].split("^"); //EZ^EZ^C900^1000^1^Y^EZPort Authority Cap     zero weight^Each^Y^

    if (aKP[5] == 'N') 
    {
      paramlist = aKDD[kit_index + '_' + aKH[kit_index]];
      paramlist = (typeof paramlist == 'undefined') ? aKDD[kit_index] : paramlist;
      paramlist = (typeof paramlist == 'undefined') ? 'DIST='+kit_Dist : paramlist + '&KitRef='+kit_MainLineNum;
    } 
    else 
    {
      if (kit_indexsub === '') { // set to first
        var aList = aKH[kit_index].toString().split("~");
        kit_indexsub = aList[0];
      }
      paramlist = aKDD[kit_index+'_'+kit_indexsub];
      if (typeof paramlist == 'undefined') {
        paramlist = 'DIST='+kit_Dist;
      } else {
        paramlist += '&KitRef='+kit_MainLineNum;
      }
    }

    QNET_CallAjax_POST('qn-addcart-your-catalog.pl',kit_AddKitToCart_Return,paramlist);
  } 
  else 
  {
    if ((kit_callback_function !== '')&&(kit_callback_function !== undefined))
    {
      if (kit_isEdit)
      {
        window[kit_callback_function]('e');
      }
      else
      {
        window[kit_callback_function]('a');
      }
    }

    kit_HidePopup ();
  }
}

// ------------------------------------------------------------------
function kit_AddKitToCart_Return(httpObject) {
  var response = httpObject.responseText;
  if (response !== '')
  {
    response = URLDecode(response);


    if (kit_indexsub === '')
    {
      kit_index++;
      kit_AddKitToCart();
    }
    else
    {
      var aList = aKH[kit_index].toString().split("~");
      var ik=0;

      for (ik=0;ik<aList.length;ik++)
      {
        if (aList[ik] == kit_indexsub)
        {
          if ((ik+1) < aList.length)
          {
            kit_indexsub = aList[ik+1];
            ik = aList.length;
          }
          else
          {
            kit_index++;
            kit_indexsub = '';
          }
        }
      }

      kit_AddKitToCart();
    }
  }
}

// ------------------------------------------------------------------
function kit_AddKitToCartMain_Return(httpObject)
{
  var response = httpObject.responseText;
  if (response !== '')
  {
    response = URLDecode(response);

    kit_MainLineNum = '';
    kit_index = 0;
    kit_indexsub = '';

    var aHash = [];

    var aKV = response.split("~");
    var i=0;
    for (i=0;i<aKV.length;i++)
    {
      var aKVP = aKV[i].split("=");
      if (aKVP[0] == 'LineNum')
      {
        kit_MainLineNum = aKVP[1];
      }

      aHash[aKVP[0]] = aKVP[1];
    }

    if (aHash["found"] != 1)
    {
      if ((kit_updatecount_function !== '')&&(kit_updatecount_function !== undefined))
      {
        window[kit_updatecount_function](aHash["TOTQTY"],kit_listitemref);
      }
    }

    kit_AddKitToCart();
  }
}

// ------------------------------------------------------------------
function kit_AddExtraLine(iRef,QTY,isMatrix,tAttrib)
{
  var div1;

  if ((kit_Type != 'S')&&(!isMatrix))
  {
    var inputKitQty = document.getElementById('kitQty'+iRef);
    if (inputKitQty)
    {
      inputKitQty.value = parseFloat(QTY);
    }
  }

  var kitStatus2 = document.getElementById('kitStatus2'+iRef);
  if (kitStatus2)
  {
    kitStatus2.innerHTML = "&nbsp;";

    if (kitStatus2.getAttribute("class") == "kitStatus0")
    {
      kitStatus2.setAttribute("class","kitStatus1");
    }
  }

  var kitStatusR = document.getElementById('kitStatusR'+iRef);
  if (kitStatusR)
  {
    kitStatusR.style.display = 'none';
  }

  var divOver = document.getElementById("kitLine"+iRef+"_MO");
  if (divOver)
  {
    divOver.innerHTML = 'click to edit/view';
    divOver.style.backgroundColor = '#00CC00';
  }

  var divLine = document.getElementById("kitLine"+iRef);
  if ( (divLine) && (!isMatrix) ) {
    var divLineExtra = document.getElementById("kitLineExtra"+iRef);
    if (divLineExtra)
    {
      if (!isMatrix)
      {
        stripNodes(divLineExtra);
      }
    }
    else
    {
      divLineExtra = document.createElement('div');
      divLineExtra.setAttribute("id","kitLineExtra"+iRef);
      divLine.appendChild(divLineExtra);
    }

    if (divLineExtra)
    {
      var aAP = tAttrib.split("~~");
      var z = 0;
      var tLineExtra = '';
      for (z=0;(z<aAP.length)&&(z<2);z++)
      {
        var aAt = aAP[z].split("_");
        var idAt = 'ATTRIB-'+aAt[0]+'_SUB';
        var idAtP = 'divAtt-'+aAt[0]+'_SUB';
        var oAt = document.getElementById(idAt);
        var tAt = '';

        if (oAt) {
          if (isMatrix) {
            var iOpt = 0;
            for (iOpt=0;iOpt<oAt.length;iOpt++) {
              (oAt.options[iOpt].value == aAt[1]) && (tAt = oAt.options[iOpt].innerHTML);
            }
          } else {
            tAt = oAt.options[oAt.selectedIndex].innerHTML;
          }
        }

        var oAtP = document.getElementById(idAtP);
        var tAtP = '';
        if (oAtP) {
          tAtP = oAtP.innerHTML;
          (tAtP.charAt(0) == '*')  && (tAtP = tAtP.substring(1));
        }

        if (tLineExtra !== '') {
          tLineExtra += ', '+tAtP+':'+tAt;
        } else {
          tLineExtra = tAtP+':'+tAt;
        }
      }

      // ATTRIB-001_SUB
      div1 = document.createElement('div');
      div1.style.marginLeft = "85px";
      div1.innerHTML = 'qty: '+parseFloat(QTY)+'<span style="font-style:italic;margin-left:10px;">('+tLineExtra+')</span>';
      divLineExtra.appendChild(div1);
    }
  }
}

// ------------------------------------------------------------------
function kit_CheckRequiredFields ()
{
  var addOK = 1;
  var subid = '';
  var aParts = '';
  var oObj;
  var aDI = [];

  if (kit_isSub) 
  {
    subid = '_SUB';
    aDI = aDetailInput_SUB.slice(0);
  } 
  else 
  {
    aDI = aDetailInput.slice(0); // clone array
  }

  // Check for required QDesign fields
  if ((typeof aQDHash['TID'] != 'undefined')&&(aQDHash['TID'] > 0))
  {
    if (typeof aQDHash['ReqList'] != 'undefined')
    {
      if (!QD_CheckRequiredFields())
      {
        return(-1);
      }
    }

    var QDDataString = QD_GetDataString (1);

    if (QDDataString != DataPreview)
    {
      window.alert (strToPlainText(QD_PreviewRequiredText));
      return(-1);
    }
    else if (isPreviewDone === 0)
    {
      window.alert (strToPlainText(QD_WaitPreviewText));
      return(-1);
    }
  }

  // Check for required fields
  var i=0;
  for (i=0;i<aDI.length;i++)
  {
    aParts = aDI[i].split("^");

    oObj = '';

    if (aParts[0].indexOf('_SUB') !== -1) // UDEF type already includes '_SUB'
    {
      oObj = document.getElementById(aParts[0]);
    }
    else
    {
      oObj = document.getElementById(aParts[0]+subid);
    }

    if (aParts[1] == 'Y')
    {
      if (aParts[0].substring(0,6) == "ATTRIB")
      {
        oObj = document.getElementById(aParts[0]);
        if (oObj)
        {
          if ((oObj.value.replace(QDtrimSpaces,'') === '')||((oObj.value.replace(QDtrimSpaces,'') == 'NONE')))
          {
            addOK = 0;
          }
        }
      }
      else if (aParts[0].substring(0,7) == "IMPRINT")
      {
        oObj = document.getElementById(aParts[0]);
        if (oObj)
        {
          if (oObj.value === '')
          {
            addOK = 0;
          }
        }
      }
      else if (aParts[0].substring(0,4) == "UDEF")
      {
        if (oObj.value === '')
        {
          addOK = 0;
        }
      }
      else if (aParts[0].substring(0,14) == "AttachmentFile")
      {
        if (kit_isEdit)
        {

        }
        else if (oObj.value === '')
        {
          addOK = 0;
        }
      }
      else if (aParts[0].substring(0,7) == "inSPECF")
      {
        oObj = document.getElementById(aParts[0]);
        if (oObj)
        {
          if (oObj.type == "checkbox")
          {
            if (!oObj.checked)
            {
              addOK = 0;
            }
          }
          else if (oObj.value === '')
          {
            addOK = 0;
          }
        }
      }
    }
  }

  return(addOK);
}

// ----------------------------------------------------------------------------
function kit_AddToCart(tQty,isMatrix) 
{
  var divAddCart_onClick = '';
  var divAddCart_innerHTML = '';
  var ik=0;
  var tV;
  var inputKitQty;
  var aKP;
  var kit_PriceID = '';
  var iP = 0;
  var j = 0;
  var oKitLine;

  var divAddCart = document.getElementById('kit_AddToCart');
  if ((divAddCart)&&(!kit_isSub))
  {
    divAddCart_onClick = divAddCart.onclick;
    divAddCart_innerHTML = divAddCart.innerHTML;

    divAddCart.onclick = null;
    divAddCart.innerHTML = kit_PleaseWaitText;
  }

  if (typeof isMatrix == 'undefined')
    { isMatrix = ''; }

  var useNewLine = 0;
  var addOK = 1;
  var QTY = 1;
  var aDI = [];
  var subid = (kit_isSub) ? '_SUB' : '';
  var mXID = '';
  var mYID = '';
  var mXOpt = '';
  var mYOpt = '';
  var QDData = '';
  var aSP = '';
  var tAID = '';
  var oObj;
  var tAttrib = "";

  if (kit_isSub) {
    aDI = aDetailInput_SUB.slice(0);
  } else {
    aDI = aDetailInput.slice(0); // clone array
  }

  if (isMatrix.length > 0) {
    isMatrix = isMatrix.substr(3);
    var aXY = isMatrix.split("Y");
    var aX = aXY[0].split("_");
    mXID = aX[0];
    mXOpt = aX[1];
    tAttrib += ( (tAttrib === '') ? '' : "~~" ) +  mXID+"_"+mXOpt+"_0";
    if (aXY[1].length > 0) {
      var aY = aXY[1].split("_");
      mYID = aY[0];
      mYOpt = aY[1];
      tAttrib += ( (tAttrib === '') ? '' : "~~" ) +  mYID+"_"+mYOpt+"_0";
    }
  }

  if (tQty > 0) {
    QTY = tQty;
  } else {
    var inputQty = document.getElementById('kitQtyInput'+subid);
    if (inputQty) {
      QTY = ( (aInit["DecimalYN"] != 'Y') ? parseInt(inputQty.value) : parseFloat(inputQty.value) );
    }
  }

  if (aInit["DecimalYN"] != 'Y')
  {
    if ((QTY < 1)||(isNaN(QTY)))
      { QTY = 1; }
  }
  else if (QTY > 0.00001)
  {
  }
  else
    { QTY = 1; }

  addOK = kit_CheckRequiredFields();
  if (addOK == -1)
  {
    if ((divAddCart)&&(!kit_isSub))
    {
      divAddCart.onclick = divAddCart_onClick;
      divAddCart.innerHTML = divAddCart_innerHTML;
    }

    return;
  }

  // Save Kit
  if ((!kit_isSub)&&(kit_Type !== '')) 
  {
    var emptyKit = 1;

    for (ik=0;ik<aKH.length;ik++) 
    {
      aKP = aKHD[ik].split("^"); //EZ^EZ^C900^1000^1^Y^EZPort Authority Cap     zero weight^Each^Y^
      if (aKP[5] != 'N') 
      {
        var aP = aKH[ik].toString().split("~"); // 0~1~2
        for (iP=0;iP<aP.length;iP++) 
        {
          if (typeof aKDD[ik+'_'+aP[iP]] == 'undefined') {
            aKDD[ik+'_'+aP[iP]] = '';
          }

          if (kit_Type != 'S') // Not Static
          {
            inputKitQty = document.getElementById('kitQty'+ik);
            if (inputKitQty)
            {
              var tKitStatusR = 1; // isGood
              var oKitStatusR = document.getElementById("kitStatusR"+ik);
              if (oKitStatusR)
              {
                if (oKitStatusR.style.display != 'none')
                {
                  tKitStatusR = 0;
                }
              }

              var tInputKitQty = inputKitQty.value;
              if (tInputKitQty === 0) 
              {
                aKDD[ik+'_'+aP[iP]] = '0';
              }
              else if ((tKitStatusR)&&(parseFloat(tInputKitQty) > 0)&&(aKDD[ik+'_'+aP[iP]] === ''))
              {
                aKDD[ik+'_'+aP[iP]] = tInputKitQty;
              }
            }
          }

          oKitLine = document.getElementById("kitLine"+ik);
          if (oKitLine)
          {
            if (oKitLine.className == 'kitLineOff') // disable line
            {
              aKDD[ik+'_'+aP[iP]] = '';
            }
            else if (aKDD[ik+'_'+aP[iP]] === '')
            {
              addOK = 0;
            }
          }
        }
      }

      // Check for empty kit
      if (emptyKit)
      {
        if (kit_Type != 'S') // Not Static
        {
          oKitLine = document.getElementById("kitLine"+ik);
          inputKitQty = document.getElementById('kitQty'+ik);
          if ((oKitLine)&&(inputKitQty))
          {
            if ((inputKitQty.value > 0)&&(oKitLine.className != 'kitLineOff'))
            {
              emptyKit = 0;
            }

          }
        }
        else
        {
          emptyKit = 0;
        }
      }
    }

    if (emptyKit)
    {
      if ((divAddCart)&&(!kit_isSub))
      {
        divAddCart.onclick = divAddCart_onClick;
        divAddCart.innerHTML = divAddCart_innerHTML;
      }

      window.alert ("WARNING! No Items in kit");
      return;
    }
  }

  if (addOK) {
    var tSpec = "";
    var tUDEF = "";
    var tIMP = "";
    var tAttach = "";

    // Load Other Attributes Here
    for (j=0;j<aDI.length;j++)  {
      if (aDI[j].substring(0,6) == "ATTRIB") {
        useNewLine = 1;
        aSP = aDI[j].split("^");
        tAID = aSP[0].substring(7);

        var oAtt = document.getElementById(aSP[0]+subid);
        if (oAtt) {
          tV = oAtt.value;
          tAttrib += ( (tAttrib === '') ? '' : '~~') + tAID+"_"+tV+"_0";
        }
      } else if (aDI[j].substring(0,4) == "UDEF") {
        useNewLine = 1;
        aSP = aDI[j].split("^");
        tAID = aSP[0].substring(5);
        var oUDEF = document.getElementById(aSP[0]);
        if (oUDEF) {
          tV = oUDEF.value;
          tV = escape(tV);
          tUDEF += ( (tUDEF === '') ? '' : '~~') + tAID+"^^"+tV;
        }
      } else if (aDI[j].substring(0,7) == "IMPRINT") {
        useNewLine = 1;
        aSP = aDI[j].split("^");
        tAID = aSP[0].substring(8);
        var oImprint = document.getElementById(aSP[0]);
        if (oImprint) {
          tV = oImprint.value;
          tV = escape(tV);
          tIMP += ( (tIMP === '') ? '' : '~~') + tAID+"^^"+tV;
        }
      } else if (aDI[j].substring(0,14) == "AttachmentFile") {
        useNewLine = 1;
        aSP = aDI[j].split("^");
        tAID = aSP[0];
        var oAttachmentFile = document.getElementById(aSP[0]);
        if (oAttachmentFile) {
          tV = oAttachmentFile.value;
          tAttach += ( (tAttach === '') ? '' : '~~') + tAID+"^^"+tV;
        }
      } else if (aDI[j].substring(0,7) == "inSPECF") {
        useNewLine = 1;
        aSP = aDI[j].split("^");
        tAID = aSP[0].substring(8);
        oObj = document.getElementById(aSP[0]);
        if (oObj) {
          tV = oObj.value;
          tV = escape(tV);
          if (oObj.type == "checkbox") {
            tV = ( (oObj.checked) ? 'Y' : 'N');
          }
          tSpec += ( (tSpec === '') ? '' : '~~') + tAID+"_"+tV+"_0";
        }
      }
    }

    var TID = 0;
    if ((typeof aQDHash['TID'] != 'undefined')&&(aQDHash['TID'] > 0)) {
      TID = aQDHash['TID'];
      QDData = QD_GetDataString (0);
      QDData = QDData.replace(/\xa0/g,' '); // Convert to space
      QDData = escape(QDData);
      QDData = QDData.replace(/\+/g,'%2B');
    }

    var ts = new Date();
    var paramlist = '';

    if (kit_isSub) // Kit Sub Assemblies
    {
      // Clear QDesign Data Array
      var tempID = '';
      aQDHash['TID'] = 0;
      aQDHash.length = 0;

      aKP = aKHD[kit_sub_Ref].split("^"); //EZ^EZ^C900^1000^1^Y^EZPort Authority Cap     zero weight^Each^Y^

      paramlist =
        'DIST='+kit_Dist+'&UserID='+kit_UserID+'&WsID='+kit_WsID+'&OrderID='+kit_OrderID+'&Client='+aKP[0]+'&ClientOwner='+aKP[1]+
        '&ItemID='+escape(aKP[2])+'&DetailMode=1&QTY='+QTY+'&RetailStore='+kit_RetailStore+'&LineIndex=0'+
        '&useNewLine=1&Attrib='+tAttrib+'&UDEF='+tUDEF+'&IMPRINT='+tIMP+'&ATTACH='+tAttach+
        '&CatType='+aKP[8]+'&PriceID='+kit_PriceID+'&vcDBName='+kit_vcDBName+
        '&CatID='+aKP[3]+'&SPECS='+escape(tSpec)+'&TID='+TID+'&QDData='+QDData+'&ts='+ts.getTime();

      if (aKP[5] != 'N') 
      {
        // paramlist =
        //   'DIST='+kit_Dist+'&UserID='+kit_UserID+'&WsID='+kit_WsID+'&OrderID='+kit_OrderID+'&Client='+aKP[0]+'&ClientOwner='+aKP[1]+
        //   '&ItemID='+escape(aKP[2])+'&DetailMode=1&QTY='+QTY+'&RetailStore='+kit_RetailStore+'&LineIndex=0'+
        //   '&useNewLine=1&Attrib='+tAttrib+'&UDEF='+tUDEF+'&IMPRINT='+tIMP+'&ATTACH='+tAttach+
        //   '&CatType='+aKP[8]+'&PriceID='+kit_PriceID+'&vcDBName='+kit_vcDBName+
        //   '&CatID='+aKP[3]+'&SPECS='+escape(tSpec)+'&TID='+TID+'&QDData='+QDData+'&ts='+ts.getTime();

        if (kit_sub_Ref != kit_sub_Ref_Last) 
        {
          kit_sub_Ref_Last = kit_sub_Ref;
          kit_sub_Ref_Part = 0;
          aKH[kit_sub_Ref] = '0';
        } 
        else if (kit_Type != 'S') 
        {
          kit_sub_Ref_Part++;
          aKH[kit_sub_Ref] += '~'+kit_sub_Ref_Part;
        }

        tempID = kit_sub_Ref+'_'+kit_sub_Ref_Part;

        if ((kit_Type == 'S')||(TID > 0)) 
        {
          tempID = kit_sub_Ref+'_0';
        }

        aKDD[tempID] = paramlist;
        kit_AddExtraLine(kit_sub_Ref,QTY,kit_isMatrix,tAttrib);
        (!isMatrix) ? kit_HidePopup() :  kit_AddToCartMatrixEngine();
      } 
      else 
      {
        if (kit_Type != 'S') // Not Static
        {
          inputKitQty = document.getElementById('kitQty'+kit_sub_Ref);
          if (inputKitQty) 
          {
            aKH[kit_sub_Ref] = QTY;
            inputKitQty.value = QTY;
          }
        }

        tempID = kit_sub_Ref+'_'+aKH[kit_sub_Ref];
        aKDD[tempID] = paramlist;

        kit_HidePopup();
      }
    } 
    else 
    {
      if (kit_Type !== '') // Save Kit
      {
        for (ik=0;ik<aKH.length;ik++) 
        {
          aKP = aKHD[ik].split("^"); //EZ^EZ^C900^1000^1^Y^EZPort Authority Cap     zero weight^Each^Y^

          if (aKP[5] == 'N') 
          {
            var kitListQty = aKH[ik];

            if (kit_Type != 'S') // Not Static
            {
              oKitLine = document.getElementById("kitLine"+ik);
              if (oKitLine)
              {
                if (oKitLine.className == 'kitLineOff')
                {
                  kitListQty = 0;
                }
                else
                {
                  var oKitListQty = document.getElementById("kitQty"+ik);
                  if (oKitListQty)
                  {
                    kitListQty = oKitListQty.value;
                  }
                }
              }
            }

            paramlist =
              'DIST='+kit_Dist+'&UserID='+kit_UserID+'&WsID='+kit_WsID+'&OrderID='+kit_OrderID+'&Client='+aKP[0]+'&ClientOwner='+aKP[1]+
              '&ItemID='+escape(aKP[2])+'&DetailMode=1&QTY='+kitListQty+'&RetailStore='+kit_RetailStore+'&LineIndex=0'+
              '&useNewLine=1&Attrib='+tAttrib+'&UDEF='+tUDEF+'&IMPRINT='+tIMP+'&ATTACH='+tAttach+
              '&CatType='+aKP[8]+'&PriceID='+kit_PriceID+'&vcDBName='+kit_vcDBName+
              '&CatID='+aKP[3]+'&SPECS='+escape(tSpec)+'&TID='+TID+'&QDData='+QDData;

            aKDD[ik] = paramlist;
          } 
          else 
          { 
            // These should be done already 
          }
        }

        // Once the Param line are built call the kit add
        paramlist =
          'DIST='+kit_Dist+'&UserID='+kit_UserID+'&WsID='+kit_WsID+'&OrderID='+kit_OrderID+'&Client='+kit_Client+'&ClientOwner='+kit_CatClient+
          '&ItemID='+escape(kit_ItemID)+'&DetailMode=1&QTY='+QTY+'&RetailStore='+kit_RetailStore+'&LineIndex=0'+
          '&useNewLine=1&Attrib='+tAttrib+'&UDEF='+tUDEF+'&IMPRINT='+tIMP+'&ATTACH='+tAttach+
          '&CatType='+kit_CatType+'&PriceID='+kit_PriceID+'&vcDBName='+kit_vcDBName+
          '&CatID='+kit_CatID+'&SPECS='+escape(tSpec)+'&KitType='+kit_Type+'&TID='+TID+'&QDData='+QDData+'&ts='+ts.getTime();
        (kit_isEdit) && (paramlist += '&KitLineNum='+kit_EditLineNum);

        QNET_CallAjax_POST('qn-addcart-your-catalog.pl',kit_AddKitToCartMain_Return,paramlist);
      }  
      else  
      {
        paramlist =
          'DIST='+kit_Dist+'&UserID='+kit_UserID+'&WsID='+kit_WsID+'&OrderID='+kit_OrderID+'&Client='+kit_Client+'&ClientOwner='+kit_CatClient+
          '&ItemID='+escape(kit_ItemID)+'&DetailMode=1&QTY='+QTY+'&RetailStore='+kit_RetailStore+'&LineIndex=0'+
          '&useNewLine='+useNewLine+'&Attrib='+tAttrib+'&UDEF='+tUDEF+'&IMPRINT='+tIMP+'&ATTACH='+tAttach+
          '&CatType='+kit_CatType+'&PriceID='+kit_PriceID+'&vcDBName='+kit_vcDBName+
          '&CatID='+kit_CatID+'&SPECS='+escape(tSpec)+'&TID='+TID+'&QDData='+QDData+'&ts='+ts.getTime();

        if (kit_isEdit)
        {
          paramlist += '&LineNum='+kit_EditLineNum;
        }

        QNET_CallAjax_POST('qn-addcart-your-catalog.pl',kit_AddToCart_Return,paramlist);
      }
    }
  }
  else
  {
    if ((divAddCart)&&(!kit_isSub))
    {
      divAddCart.onclick = divAddCart_onClick;
      divAddCart.innerHTML = divAddCart_innerHTML;
    }

    window.alert ("Fields required");
  }
} // kit_AddToCart

// ----------------------------------------------------------------------------
function kit_AddToCart_Return(httpObject)
{
  var response = httpObject.responseText;
  if (response !== '')
  {
    response = URLDecode(response);

    var aHash = [];
    var aCol = response.split("~");
    var j=0;
    for (j=0;j<aCol.length;j++)
    {
      var aKV = aCol[j].split("=");
      aHash[aKV[0]] = aKV[1];
    }

    if ((kit_updatecount_function !== '')&&(kit_updatecount_function !== undefined))
    {
      window[kit_updatecount_function](aHash["TOTQTY"],kit_listitemref,aHash["found"]);
    }

    if ((kit_callback_function !== '')&&(kit_callback_function !== undefined))
    {
      if (kit_isEdit)
      {
        window[kit_callback_function]('e');
      }
      else
      {
        window[kit_callback_function]('a');
      }
    }

    if (!kit_isMatrix)
    {
      kit_DisplayIndicator(kit_AddingItemToCart);
      setTimeout(function() { kit_StopIndicator(); }, 2000);

      kit_HidePopup();
    }
    else
    {
      kit_AddToCartMatrixEngine();
    }
  }
}

// ----------------------------------------------------------------------------
function kit_DisplayIndicator(text)
{
  var divO = document.createElement('div');
  divO.setAttribute("id","kit_IndicatorOverlay");
  divO.style.opacity = "0.8";
  divO.style.backgroundColor = "#CCCCCC";
  divO.style.position = "fixed";
  divO.style.width = "100%";
  divO.style.height = "100%";
  divO.style.left = "0px";
  divO.style.top = "0px";
  divO.style.zIndex = "10000";
  document.body.appendChild(divO);

  var div = document.createElement('div');
  div.setAttribute("id","kit_Indicator");
  div.setAttribute("class","divLoadItemPopup");
  div.style.display = "block";
  div.style.position = "fixed";
  div.style.left = "50%";
  div.style.top = "50%";
  div.style.marginLeft = "-150px";
  div.style.zIndex = "10001";

  var img1 = document.createElement('img');
  img1.setAttribute("src","./qn_images/ajax-loader-big.gif");
  img1.style.cssFloat = "left";
  img1.style.styleFloat = "left";
  img1.style.marginTop = "15px";
  img1.style.marginLeft = "10px";

  var div1 = document.createElement('div');
  div1.style.cssFloat = "left";
  div1.style.styleFloat = "left";
  div1.style.marginTop = "20px";
  div1.style.marginLeft = "10px";
  div1.innerHTML = text;

  div.appendChild(img1);
  div.appendChild(div1);
  document.body.appendChild(div);
}

function kit_StopIndicator()
{
  var div = document.getElementById("kit_Indicator");
  if (div)
  {
    div.parentNode.removeChild(div);
  }

  var divO = document.getElementById("kit_IndicatorOverlay");
  if (divO)
  {
    divO.parentNode.removeChild(divO);
  }
}

// ------------------------------------------------------------------
function kit_AddToCartMatrixEngine()
{
  var isGood = 1;
  var tLineTotal = 0;
  var tPrevTotal = 0;
  var qtyTotal;
  var tQty;
  var oInput;
  var aOpt1 = [];
  var aOpt2 = [];
  var inputID;

  var inputKitQty = document.getElementById("kitQty"+kit_sub_Ref);
  if (inputKitQty)
  {
    tPrevTotal = inputKitQty.value;

    if (kit_Type != 'S')
    {
      inputKitQty.value = '0';
    }
  }

  if (kit_Grid_y.length > 0)
  {
    if (kit_Type == 'S')
    {
      qtyTotal = 0;
      var itAddAtt2 = 0;
      for (itAddAtt2=1;itAddAtt2<aAddAtt2.length;itAddAtt2++)
      {
        aOpt2 = [];
        aOpt2 = aAddAtt2[itAddAtt2].split("^");
        var itAddAtt1=0;

        for (itAddAtt1=1;itAddAtt1<aAddAtt1.length;itAddAtt1++)
        {
          aOpt1 = [];
          aOpt1 = aAddAtt1[itAddAtt1].split("^");

          if (parseInt(kit_RetailStore))
          {
            inputID = "PMX"+kit_GridId_x+"_"+aOpt1[0]+"_"+aOpt1[3]+"Y"+kit_GridId_y+"_"+aOpt2[0]+"_"+aOpt2[3];
          }
          else
          {
            inputID = "PMX"+kit_GridId_x+"_"+aOpt1[0]+"_"+aOpt1[2]+"Y"+kit_GridId_y+"_"+aOpt2[0]+"_"+aOpt2[2];
          }

          oInput = document.getElementById(inputID);
          if (oInput)
          {
            tQty = oInput.value;
            if (tQty > 0)
            {
              qtyTotal += ( (aInit["DecimalYN"] != 'Y') ? parseInt(tQty) : parseFloat(tQty) );
              // qtyTotal += parseFloat(tQty);
            }
          }
        }
      }

      if (tPrevTotal != qtyTotal)
      {
        isGood = 1;
      }
    }

    if (isGood)
    {
      if (iAddAtt2<aAddAtt2.length)
      {
        if (iAddAtt1<(aAddAtt1.length - 1))
        {
          iAddAtt1++;
        }
        else
        {
          iAddAtt2++;
          iAddAtt1 = 1;
        }
      }
      else
      {
        if (iAddAtt1<aAddAtt1.length)
        {
          iAddAtt1++;
        }
      }

      aOpt1 = [];
      aOpt2 = [];

      (iAddAtt2<aAddAtt2.length) && (aOpt2 = aAddAtt2[iAddAtt2].split("^"));
      (iAddAtt1<aAddAtt1.length) && (aOpt1 = aAddAtt1[iAddAtt1].split("^"));
      if ((aOpt1.length > 0)&&(aOpt2.length > 0)) 
      {
        if (parseInt(kit_RetailStore)) {
          // inputID = "PMX"+kit_GridId_x+"_"+aOpt1[0]+"_"+aOpt1[3]+"Y"+kit_GridId_y+"_"+aOpt2[0]+"_"+aOpt2[3];
          inputID = "PMX"+kit_GridId_x+"_"+aOpt1[0]+"Y"+kit_GridId_y+"_"+aOpt2[0];
        } else {
          // inputID = "PMX"+kit_GridId_x+"_"+aOpt1[0]+"_"+aOpt1[2]+"Y"+kit_GridId_y+"_"+aOpt2[0]+"_"+aOpt2[2];
          inputID = "PMX"+kit_GridId_x+"_"+aOpt1[0]+"Y"+kit_GridId_y+"_"+aOpt2[0];
        }
        oInput = document.getElementById(inputID);
        if (oInput) 
        {
          tQty = oInput.value;
          if (tQty > 0) 
          {
            tQty = ( (aInit["DecimalYN"] != 'Y') ? parseInt(tQty) : parseFloat(tQty) );

            kit_MatrixQtyTotal += tQty;
            tLineTotal += parseFloat(tQty);
            kit_AddToCart(tQty,inputID);
          } 
          else 
          {
            kit_AddToCartMatrixEngine();
          }
        } else {
          window.alert('BAD inputID='+inputID);
        }
      } 
      else 
      {
        if (kit_MatrixQtyTotal > 0)
        {
          kit_isMatrix = 0;
          kit_CloseAttributeGrid ();
          kit_HidePopup();
        }
        else
        {
          window.alert(strToPlainText(kit_WarnPriceGridQty));
        }
      }
    } else {
      window.alert('Error');
    }
  } 
  else if (kit_Grid_x.length > 0) 
  {
    if (kit_Type == 'S') {
      qtyTotal = 0;
      for (iAddAtt1=1;iAddAtt1<aAddAtt1.length;iAddAtt1++) {
        aOpt1 = [];
        aOpt1 = aAddAtt1[iAddAtt1].split("^");
        if (parseInt(kit_RetailStore)) {
          inputID = "PMX"+kit_GridId_x+"_"+aOpt1[0]+"_"+aOpt1[3]+"Y";
        } else {
          inputID = "PMX"+kit_GridId_x+"_"+aOpt1[0]+"_"+aOpt1[2]+"Y";
        }
        oInput = document.getElementById(inputID);
        if (oInput)
        {
          tQty = oInput.value;
          if (tQty > 0)
          {
            qtyTotal += ( (aInit["DecimalYN"] != 'Y') ? parseInt(tQty) : parseFloat(tQty) );
            // qtyTotal += parseFloat(tQty);
          }
        }
      }

      if (tPrevTotal != qtyTotal)
      {
        isGood = 0;
      }
    }

    if (isGood)
    {
      if (iAddAtt1<aAddAtt1.length)
      {
        iAddAtt1++;
      }

      aOpt1 = [];
      aOpt2 = [];

      if (iAddAtt1<aAddAtt1.length)
      {
        aOpt1 = aAddAtt1[iAddAtt1].split("^");
      }

      if (aOpt1.length > 0)
      {
        if (parseInt(kit_RetailStore))
        {
          // inputID = "PMX"+kit_GridId_x+"_"+aOpt1[0]+"_"+aOpt1[3]+"Y";
          inputID = "PMX"+kit_GridId_x+"_"+aOpt1[0]+"Y";
        }
        else
        {
          // inputID = "PMX"+kit_GridId_x+"_"+aOpt1[0]+"_"+aOpt1[2]+"Y";
          inputID = "PMX"+kit_GridId_x+"_"+aOpt1[0]+"Y";
        }

        oInput = document.getElementById(inputID);
        if (oInput)
        {
          tQty = oInput.value;
          if (tQty > 0)
          {
            tQty = ( (aInit["DecimalYN"] != 'Y') ? parseInt(tQty) : parseFloat(tQty) );

            kit_MatrixQtyTotal += tQty;
            tLineTotal += parseFloat(tQty);
            kit_AddToCart(tQty,inputID);
          }
          else
          {
            kit_AddToCartMatrixEngine();
          }
        }
        else
        {
          window.alert('BAD inputID='+inputID);
        }
      }
      else
      {
        if (kit_MatrixQtyTotal > 0)
        {
          kit_isMatrix = 0;
          kit_CloseAttributeGrid ();
          kit_HidePopup();
        }
        else
        {
          window.alert(strToPlainText(kit_WarnPriceGridQty));
        }
      }
    }
  }
} // kit_AddToCartMatrixEngine

// ------------------------------------------------------------------
function kit_AddToCartMatrix()
{
  kit_isMatrix = 1;
  // var aAtt1 = kit_Grid_x.split("~");
  // var aAtt2 = kit_Grid_y.split("~");
  iAddAtt1=0;
  iAddAtt2=1;

  kit_MatrixQtyTotal = 0;

  aAddAtt1 = kit_Grid_x.split("~");
  aAddAtt2 = kit_Grid_y.split("~");
  var divLineExtra = document.getElementById("kitLineExtra"+kit_sub_Ref);
  if (divLineExtra)
  {
    stripNodes(divLineExtra);
  }

  var addOK = kit_CheckRequiredFields();
  if (addOK == 1)
  {
    var divMatrixAddToCart = document.getElementById("divMatrixAddToCart");
    if (divMatrixAddToCart)
    {
      divMatrixAddToCart.innerHTML = '<img src="./qn_images/ajax-loader.gif" /> Processing';
    }

    kit_AddToCartMatrixEngine();
  }
  else if (addOK == -1)
  {
    return;
  }
  else
  {
    window.alert ("Fields required");
  }
}

// ------------------------------------------------------------------
function kit_AddToCartMatrix_____OLD()
{
  kit_isMatrix = 1;
  var totalQty = 0;
  var divLineExtra;
  var txb = document.getElementById('kit_matrixPopup').getElementsByTagName('input');
  var descriptionText = '<div style=margin-left:85px;">';
  var inputId = '';
  var dimensions = 0;
  var i = 0;
  for (i = 0; i < txb.length; i++)
  {
    if ( (txb[i].type == "text" ) &&  ( /^PMX\d+/.test(txb[i].id) ) && (/^\d+$/.test(txb[i].value) ) )
    {
      var Row;
      var Col;
      var ColRow = /^PMX\d+_(\d+)_\d+Y\d+_(\d+)_\d+$/.exec(txb[i].id);
      if (ColRow ) {
        Row=ColRow[2];
        Col=ColRow[1];
        dimensions = 2;
      } else {
        ColRow = /^PMX\d+_(\d+)_\d+Y$/.exec(txb[i].id);
        Col=ColRow[1];
        dimensions = 1;
      }
      inputId = txb[i].id;
      var cellQty=txb[i].value;
      descriptionText += 'qty: '+cellQty+' <span style="font-style:italic;margin-left:5px;">(';
      if ( (Row) && (document.getElementById('MRL_'+Row) ) ) {
        descriptionText += document.getElementById('MRL_'+Row).innerHTML;
      }
      if ( (Row) && (Col) && (document.getElementById('MRL_'+Row) ) && (document.getElementById('MCL_'+Col) ) ) {
        descriptionText += ' ';
      }
      if ( (Col) && (document.getElementById('MCL_'+Col) ) ) {
        descriptionText += document.getElementById('MCL_'+Col).innerHTML;
      }
      descriptionText += ')</span>; ';
      totalQty += parseInt(cellQty);
    }
  }

  descriptionText += '</div>';

  if ( (document.getElementById('kitQtyInput_SUB')) &&  (document.getElementById('kitQtyInput_SUB').readOnly) ) {
    var expectedQty = document.getElementById('kitQtyInput_SUB').value;
    if ( totalQty != expectedQty ) {
      window.alert ('The total quantity must be ' + expectedQty);
      return;
    } else {
      if (document.getElementById("kitLineExtra"+kit_sub_Ref) ) {
        document.getElementById("kitLineExtra"+kit_sub_Ref).innerHTML=descriptionText;
      } else {
        var divLine = document.getElementById("kitLine"+kit_sub_Ref);
        if (divLine)  {
          divLineExtra = document.createElement('div');
          divLineExtra.setAttribute("id","kitLineExtra"+kit_sub_Ref);
          divLineExtra.innerHTML=descriptionText;
          divLine.appendChild(divLineExtra);
        } else {
          window.alert ("kitLine"+kit_sub_Ref+' Not defined');
        }
      }
//           inputID = "PMX"+kit_GridId_x+"_"+aOpt1[0]+"_"+aOpt1[2]+"Y"+kit_GridId_y+"_"+aOpt2[0]+"_"+aOpt2[2];
      kit_AddToCart(totalQty,inputId);
      kit_isMatrix = 0;
      if (dimensions == 1) {
        kit_CloseAttributeGrid ();
        kit_HidePopup();
      }
    }
  } else {
    kit_AddToCart(totalQty,inputId);
    kit_isMatrix = 0;
    if (dimensions == 1) {
      kit_CloseAttributeGrid ();
      kit_HidePopup();
    }
  }
}

function kit_BuildMask()
{
  var divMask = document.createElement('div');

  if (kit_isSub)
    { divMask.setAttribute("id",kitDivMaskSub); }
  else
    { divMask.setAttribute("id",kitDivMask); }

  var maskHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );

  divMask.style.position = "absolute";
  divMask.style.top = "0";
  divMask.style.left = "0";
  divMask.style.height = maskHeight+"px";
  divMask.style.width = document.body.scrollWidth+"px";
  divMask.style.opacity = ".6";
  divMask.style.filter = "alpha (opacity=60)";
  divMask.style.background = "#000000";
  divMask.style.zIndex = "9999";

  document.body.appendChild(divMask);
}

// ------------------------------------------------------------------
function kit_BuildPopup ()
{
  var fONC = '';

  var subid = '';
  if (kit_isSub)
  {
    subid = '_SUB';
  }

  var oDiv = document.createElement('div');
  if (oDiv)
  {
    if (kit_isSub)
    {
      oDiv.setAttribute("id",kitDivAreaIDSub);
      // oDiv.style.zIndex = "11000";
      oDiv.style.zIndex = "10001";
    }
    else
    {
      oDiv.setAttribute("id",kitDivAreaID);
      oDiv.style.zIndex = "10000";
    }

    oDiv.setAttribute("class","kitArea");

    var imgClose = document.getElementById("kit_img_close"+subid);
    if (!imgClose)
    {
      imgClose = document.createElement('img');
      imgClose.setAttribute("id","kit_img_close"+subid);
      imgClose.setAttribute("src","./qn_images/exit.gif");
      imgClose.style.cursor = "pointer";
      imgClose.style.margin = "2px";
      imgClose.style.cssFloat = "right";
      imgClose.style.styleFloat = "right";

      fONC = "kit_HidePopup()";
      imgClose.onclick = new Function (fONC);
      oDiv.appendChild(imgClose);
    }

    var inFav = document.createElement('input');
    if (inFav)
    {
      inFav.setAttribute("id","kit_cb_favorite"+subid);
      inFav.setAttribute("type","checkbox");
      inFav.style.margin = "4px 0 0 8px";
      inFav.style.cssFloat = "left";
      inFav.style.styleFloat = "left";
      inFav.style.display = "none";

      fONC = "kit_setFavorites()";
      inFav.onclick = new Function (fONC);

      oDiv.appendChild(inFav);

      var divFav = document.createElement('div');
      if (divFav)
      {
        divFav.setAttribute("id","kit_div_favorite"+subid);
        divFav.style.cssFloat = "left";
        divFav.style.styleFloat = "left";
        divFav.style.margin = "2px 0 0 8px";
        divFav.style.fontSize = "15px";
        divFav.style.display = "none";
        divFav.innerHTML = idpFav;
        oDiv.appendChild(divFav);
      }
    }

    var divn1 = document.createElement('div');
    if (divn1)
    {
      divn1.style.clear = "both";
      oDiv.appendChild(divn1);
    }

    var divCol1 = document.createElement('div');
    if (divCol1)
    {
      divCol1.setAttribute("id","kitCol1"+subid);
      divCol1.setAttribute("class","kitCol1");
      oDiv.appendChild(divCol1);
    }

    var divCol2 = document.createElement('div');
    if (divCol2)
    {
      divCol2.setAttribute("id","kitCol2"+subid);
      divCol2.setAttribute("class","kitCol2");
      oDiv.appendChild(divCol2);
    }

    var divn2 = document.createElement('div');
    if (divn2)
    {
      divn2.style.clear = "both";
      oDiv.appendChild(divn2);
    }

    document.body.appendChild(oDiv);
  }
}

// ------------------------------------------------------------------
function kit_CloseAttributeGrid()
{
  var divKitArea = document.getElementById(kitDivAreaID);
  if (kit_isSub)
  {
    divKitArea = document.getElementById(kitDivAreaIDSub);
  }

  if (divKitArea)
  {
    var _div = document.getElementById("kit_matrixPopup");
    if (_div)
    {
      divKitArea.removeChild(_div);
    }
  }
}

// ------------------------------------------------------------------
function kit_DisableLineToggle (kIndex)
{
  var tClass;
  var subid = (kit_isSub) ? '_SUB' : '';

  var divKitLine = document.getElementById("kitLine"+kIndex+subid);
  if (divKitLine)
  {
    tClass = divKitLine.getAttribute("class");
    if (tClass == "kitLine")
    {
      divKitLine.className = "kitLineOff";
    }
    else
    {
      divKitLine.className = "kitLine";
    }
  }

  var divKitQty = document.getElementById("kitQty"+kIndex+subid);
  if (divKitQty)
  {
    tClass = divKitQty.getAttribute("class");
    if (tClass == "kitLineQtyOn")
    {
      divKitQty.className = "kitLineQtyOff";
    }
    else
    {
      divKitQty.className = "kitLineQtyOn";
    }
  }

  var divDisable = document.getElementById("kitLineDisableToggle"+kIndex+subid);
  if (divDisable)
  {
    tClass = divDisable.getAttribute("class");
    if (tClass == "kitDivDisableOn")
    {
      divDisable.className = "kitDivDisableOff";
      // divDisable.setAttribute("class","kitDivDisableOff");
    }
    else
    {
      divDisable.className = "kitDivDisableOn";
      // divDisable.setAttribute("class","kitDivDisableOn");
    }
  }
}

// ------------------------------------------------------------------
function kit_DisplayAttributeGrid () {
  var divClear1;
  var divDetail_x;
  var iAP1=0;
  var aOpt1;
  var itemPrice;
  var inputID;
  var fONC = '';
  var divDetail_y;
  var divDetail_y1;
  var inputDetail_y2;

  var divKitArea = document.getElementById(kitDivAreaID);
  (kit_isSub) && (divKitArea = document.getElementById(kitDivAreaIDSub));
  if (divKitArea) {
    var divAttribGrid = document.createElement('div');
    if (divAttribGrid) {
      var aAtt1 = kit_Grid_x.split("~");
      var cellW = 100;
      var areaW = cellW * 7;
      var att2W = 0;
      var cellH = 45;
      var areaH = (parseInt(cellH) * 10) + 45 + 50;
      var aAtt2 = kit_Grid_y.split("~");

      if (kit_Grid_y.length > 0) {
        att2W = cellW;
        ((aAtt2.length) < 11) && (areaH = ((parseInt(cellH) + 10) * (aAtt2.length)) + 45 + 50);
      } else {
        areaH = 180;
      }
      if (att2W > 0) {
        ((aAtt1.length - 1) < 6) && (areaW = (cellW * (aAtt1.length - 1)) + att2W);
      } else {
        ((aAtt1.length - 1) < 7) && (areaW = (cellW * (aAtt1.length - 1)) + 25);
      }
      divAttribGrid.setAttribute("class","kitPriceGridArea");
      divAttribGrid.setAttribute("id","kit_matrixPopup");
      divAttribGrid.style.top = "50px";
      divAttribGrid.style.left = "50px";
      divAttribGrid.style.width = areaW+"px";
      divAttribGrid.style.height = areaH+"px";
      divAttribGrid.style.overflow = "hidden";
      var divX = document.createElement('div');

      if (divX) {
        divX.setAttribute("class","kitPriceGridColTitle");
        divX.innerHTML = aAtt1[0];
        divAttribGrid.appendChild(divX);
        var imgClose = document.createElement('img');
        if (imgClose) {
          imgClose.style.cursor = "pointer";
          imgClose.style.margin = "2px";
          imgClose.style.cssFloat = "right";
          imgClose.style.styleFloat = "right";
          imgClose.setAttribute("src","./qn_images/exit.gif");

          fONC = "kit_CloseAttributeGrid()";
          imgClose.onclick = new Function (fONC);

          divX.appendChild(imgClose);
        }
      }

      var divAttribGridInner = document.createElement('div');
      if (divAttribGridInner)
      {
        //divAttribGridInner.style.marginTop = "15px";
        divAttribGridInner.style.overflow = "auto";
        divAttribGridInner.style.fontFamily = "arial";
        divAttribGridInner.style.fontSize = "13px";
        divAttribGridInner.style.height = (areaH - 85)+"px";
        //alert("kit_Grid_x="+kit_Grid_x);

        var divTitle_x = document.createElement('div');
        if (divTitle_x)
        {
          divTitle_x.setAttribute("class","kitPriceGrid_XH");
          divTitle_x.style.width = (((cellW + 4) * (aAtt1.length - 1)) + att2W)+"px";

          var iAP=0;
          for (iAP=0;iAP<aAtt1.length;iAP++)
          {
            if (iAP === 0)
            {
              if (att2W > 0)
              {
                var divTitle_y = document.createElement('div');
                if (divTitle_y)
                {
                  divTitle_y.setAttribute("class","kitPriceGridRowTitle");
                  divTitle_y.style.width = cellW+"px";
                  divTitle_y.style.paddingTop = "0";
                  //divTitle_y.style.position = "fixed";
                  divTitle_y.innerHTML = aAtt2[0];
                  divTitle_x.appendChild(divTitle_y);
                }
              }

            }
            else
            {
              var aOpt = aAtt1[iAP].split("^");

              var divTitleCol_x = document.createElement('div');
              if (divTitleCol_x)
              {
                divTitleCol_x.setAttribute("class","kitPriceGridCellH");

                // if ((iAP == 1) && (att2W > 0))
                // {
                //   divTitleCol_x.style.marginLeft = cellW+"px";
                // }

                divTitleCol_x.id = 'MCL_'+aOpt[0];
                divTitleCol_x.innerHTML = aOpt[1];
                //divTitleCol_x.style.width = "100px";
                //divTitleCol_x.style.cssFloat = "left";
                //divTitleCol_x.style.styleFloat = "left";

                divTitle_x.appendChild(divTitleCol_x);
              }
            }
          }

          divClear1 = document.createElement('div');
          if (divClear1)
          {
            divClear1.style.clear = "both";
            divTitle_x.appendChild(divClear1);
          }

          divAttribGridInner.appendChild(divTitle_x);
        }

        //alert('kit_Grid_y.length='+kit_Grid_y.length+' aAtt2.length='+aAtt2.length+' att2W='+att2W+' kit_Grid_x='+kit_Grid_x+' kit_Grid_y'+kit_Grid_y+' kit_GridId_x='+kit_GridId_x+' kit_GridId_y'+kit_GridId_y);

        if (att2W > 0)
        {
          var iAP2=0;
          for (iAP2=1;iAP2<aAtt2.length;iAP2++)
          {
            var aOpt2 = aAtt2[iAP2].split("^");

            var detailClass = 'kitPriceGrid_Detail2';
            if (iAP2 % 2)
              { detailClass = 'kitPriceGrid_Detail'; }

            divDetail_x = document.createElement('div');
            if (divDetail_x)
            {
              divDetail_x.setAttribute("class", detailClass);
              divDetail_x.style.width = (((cellW + 4) * (aAtt1.length - 1)) + att2W)+"px";

              var divDetailH_y = document.createElement('div');
              if (divDetailH_y)
              {
                divDetailH_y.setAttribute("class","kitPriceGrid_YH");
                divDetailH_y.id = 'MRL_'+aOpt2[0];
                divDetailH_y.style.width = cellW+"px";
                divDetailH_y.style.height = cellH+"px";
                divDetailH_y.innerHTML = aOpt2[1];
                divDetail_x.appendChild(divDetailH_y);
              }

              for (iAP1=1;iAP1<aAtt1.length;iAP1++)
              {
                aOpt1 = aAtt1[iAP1].split("^");

                itemPrice = parseFloat(kit_ItemPrice);
                inputID = "";
                if (parseInt(kit_RetailStore))
                {
                  itemPrice += parseFloat(aOpt1[3]) + parseFloat(aOpt2[3]);
                  inputID = "PMX"+kit_GridId_x+"_"+aOpt1[0]+"_"+aOpt1[3]+"Y"+kit_GridId_y+"_"+aOpt2[0]+"_"+aOpt2[3];
                }
                else
                {
                  itemPrice += parseFloat(aOpt1[2]) + parseFloat(aOpt2[2]);
                  inputID = "PMX"+kit_GridId_x+"_"+aOpt1[0]+"_"+aOpt1[2]+"Y"+kit_GridId_y+"_"+aOpt2[0]+"_"+aOpt2[2];
                }

                divDetail_y = document.createElement('div');
                if (divDetail_y)
                {
                  divDetail_y.setAttribute("class","kitPriceGrid_YD");
                  divDetail_y.style.width = cellW+"px";
                  divDetail_y.style.height = cellH+"px";

                  if (kit_hasPricing == 1)
                  {
                    divDetail_y1 = document.createElement('div');
                    if (divDetail_y1)
                    {
                      //divDetail_y1.setAttribute("class","kitPriceGrid_YH");
                      divDetail_y1.innerHTML = CurSym+(itemPrice.toFixed(kit_PriceDec));
                      divDetail_y.appendChild(divDetail_y1);
                    }
                  }

                  inputDetail_y2 = document.createElement('input');
                  if (inputDetail_y2)
                  {
                    inputDetail_y2.setAttribute("id",inputID);
                    inputDetail_y2.setAttribute("type","text");
                    inputDetail_y2.style.width = "50px";
                    divDetail_y.appendChild(inputDetail_y2);
                  }

                  divDetail_x.appendChild(divDetail_y);
                }
              }

              divClear1 = document.createElement('div');
              if (divClear1)
              {
                divClear1.style.clear = "both";
                divDetail_x.appendChild(divClear1);
              }

              divAttribGridInner.appendChild(divDetail_x);
            }
          }
        }
        else
        {
          divDetail_x = document.createElement('div');
          if (divDetail_x)
          {
            divDetail_x.setAttribute("class", 'kitPriceGrid_Detail');
            divDetail_x.style.width = (((cellW + 4) * (aAtt1.length - 1)) + att2W)+"px";

            for (iAP1=1;iAP1<aAtt1.length;iAP1++)
            {
              aOpt1 = aAtt1[iAP1].split("^");

              itemPrice = parseFloat(kit_ItemPrice);
              inputID = "";
              if (parseInt(kit_RetailStore))
              {
                itemPrice += parseFloat(aOpt1[3]);
                inputID = "PMX"+kit_GridId_x+"_"+aOpt1[0]+"_"+aOpt1[3]+"Y";
              }
              else
              {
                itemPrice += parseFloat(aOpt1[2]);
                inputID = "PMX"+kit_GridId_x+"_"+aOpt1[0]+"_"+aOpt1[2]+"Y";
              }

              divDetail_y = document.createElement('div');
              if (divDetail_y)
              {
                divDetail_y.setAttribute("class","kitPriceGrid_YD");
                divDetail_y.style.width = cellW+"px";
                divDetail_y.style.height = cellH+"px";

                if (kit_hasPricing == 1)
                {
                  divDetail_y1 = document.createElement('div');
                  if (divDetail_y1)
                  {
                    //divDetail_y1.setAttribute("class","kitPriceGrid_YH");
                    divDetail_y1.innerHTML = CurSym+(itemPrice.toFixed(kit_PriceDec));
                    divDetail_y.appendChild(divDetail_y1);
                  }
                }

                inputDetail_y2 = document.createElement('input');
                if (inputDetail_y2)
                {
                  inputDetail_y2.setAttribute("id",inputID);
                  inputDetail_y2.setAttribute("type","text");
                  inputDetail_y2.style.width = "50px";
                  divDetail_y.appendChild(inputDetail_y2);
                }

                divDetail_x.appendChild(divDetail_y);
              }
            }

            divClear1 = document.createElement('div');
            if (divClear1)
            {
              divClear1.style.clear = "both";
              divDetail_x.appendChild(divClear1);
            }

            divAttribGridInner.appendChild(divDetail_x);
          }
        }

        divAttribGrid.appendChild(divAttribGridInner);
      }

      var divAddButton = document.createElement('div');
      if (divAddButton)
      {
        divAddButton.setAttribute("class","kitPriceGridAddCart");
        divAddButton.setAttribute("id","divMatrixAddToCart");
        divAddButton.style.textAlign = 'center';

        fONC = 'kit_AddToCartMatrix()';
        divAddButton.onclick = new Function (fONC);

        if (kit_isSub)
        {
          divAddButton.innerHTML = kit_AddToKitText;
        }
        else
        {
          if (kit_isEdit)
          {
            divAddButton.innerHTML = kit_UpdateCartText;
          }
          else
          {
            divAddButton.innerHTML = kit_AddToCartText;
          }
        }
        divAddButton.id = 'kit_AddToCart';
        divAttribGrid.appendChild(divAddButton);
      }

      divKitArea.appendChild(divAttribGrid);
    }
  }
}

// ------------------------------------------------------------------
function kit_GetData ()
{
  var ts = new Date();
  var paramlist =
    'DIST='+kit_Dist+'&UserID='+kit_UserID+'&Client='+kit_Client+'&CCat='+kit_CatClient+'&ItemID='+encodeURIComponent(kit_ItemID)+
    '&CatType='+kit_CatType+'&CatID='+kit_CatID+'&RetailStore='+kit_RetailStore+'&vcDBName='+kit_vcDBName+
    '&qnet_domain='+kit_QnetDomain+'&qnet_catalog_domain='+kit_QnetCatalogDomain+'&ts='+ts.getTime();
  if (kit_isSub)
  {
    paramlist =
      'DIST='+kit_Dist+'&UserID='+kit_UserID+'&Client='+kit_sub_Client+'&CCat='+kit_sub_CatClient+'&ItemID='+kit_sub_ItemID+
      '&CatType='+kit_sub_CatType+'&CatID='+kit_sub_CatID+'&RetailStore='+kit_RetailStore+'&vcDBName='+kit_vcDBName+
      '&qnet_domain='+kit_QnetDomain+'&qnet_catalog_domain='+kit_QnetCatalogDomain+
      '&ts='+ts.getTime();
  }

  QNET_CallAjax_POST('qn-get-item.pl',kit_LoadData,paramlist);
}

// ------------------------------------------------------------------
function kit_GetTabs ()
{
  var subid = '';
  var fONC = '';

  if (kit_isSub)
  {
    subid = '_SUB';
  }

  var divCol2 = document.getElementById("kitCol2"+subid);
  if (divCol2)
  {
    var divTabBar = document.createElement('div');
    if (divTabBar)
    {
      divTabBar.style.width = "800px";

      // overview,properties,more info,accessories,suggested sell,kit items
      if (aHasTab[1] == 1)
      {
        var divTab1 = document.createElement('div');
        if (divTab1)
        {
          divTab1.setAttribute("id","kitTab1"+subid);
          divTab1.setAttribute("class","kitTab");
          divTab1.style.cursor = "pointer";
          divTab1.style.cssFloat = "left";
          divTab1.style.styleFloat = "left";

          fONC = "kit_SelectTab('1')";
          divTab1.onclick = new Function (fONC);

          divTab1.innerHTML = aInit["msgOverviewTabLabel"];
          divTabBar.appendChild(divTab1);
        }
      }

      if (aHasTab[2] == 1)
      {
        var divTab2 = document.createElement('div');
        if (divTab2)
        {
          divTab2.setAttribute("id","kitTab2"+subid);
          divTab2.setAttribute("class","kitTab");
          divTab2.style.cursor = "pointer";
          divTab2.style.cssFloat = "left";
          divTab2.style.styleFloat = "left";

          fONC = "kit_SelectTab('2')";
          divTab2.onclick = new Function (fONC);

          divTab2.innerHTML = aInit["msgPropertyTabLabel"];
          divTabBar.appendChild(divTab2);
        }
      }

      if (aHasTab[3] == 1)
      {
        var divTab3 = document.createElement('div');
        if (divTab3)
        {
          divTab3.setAttribute("id","kitTab3"+subid);
          divTab3.setAttribute("class","kitTab");
          divTab3.style.cursor = "pointer";
          divTab3.style.cssFloat = "left";
          divTab3.style.styleFloat = "left";

          fONC = "kit_SelectTab('3')";
          divTab3.onclick = new Function (fONC);

          divTab3.innerHTML = aInit["msgMoreInfoTabLabel"];
          divTabBar.appendChild(divTab3);
        }
      }

      if ((aHasTab[4] == 1)&&(!kit_isSub))
      {
        var divTab4 = document.createElement('div');
        if (divTab4)
        {
          divTab4.setAttribute("id","kitTab4"+subid);
          divTab4.setAttribute("class","kitTab");
          divTab4.style.cursor = "pointer";
          divTab4.style.cssFloat = "left";
          divTab4.style.styleFloat = "left";

          fONC = "kit_SelectTab('4')";
          divTab4.onclick = new Function (fONC);

          divTab4.innerHTML = aInit["msgKitTabLabel"];
          divTabBar.appendChild(divTab4);
        }
      }

      if (aHasTab[5] == 1)
      {
        var divTab5 = document.createElement('div');
        if (divTab5)
        {
          divTab5.setAttribute("id","kitTab5"+subid);
          divTab5.setAttribute("class","kitTab");
          divTab5.style.cursor = "pointer";
          divTab5.style.cssFloat = "left";
          divTab5.style.styleFloat = "left";

          fONC = "kit_SelectTab('5')";
          divTab5.onclick = new Function (fONC);

          divTab5.innerHTML = aInit["msgAccessoryTabLabel"];
          divTabBar.appendChild(divTab5);
        }
      }

      var divn1 = document.createElement('div');
      if (divn1)
      {
        divn1.style.clear = "both";
        divTabBar.appendChild(divn1);
      }


      divCol2.appendChild(divTabBar);
    }
  }
}

// ------------------------------------------------------------------
function kit_HidePopup ()
{
  var tAreaID = kitDivAreaID;
  var tMask = kitDivMask;

  // move calendar back to body
  var scwTable = document.getElementById('scw');
  if (scwTable)
  {
    document.body.appendChild(scwTable);
  }

  if (kit_isSub)
  {
    tAreaID = kitDivAreaIDSub;
    tMask = kitDivMaskSub;
  }

  var divPreviewArea = document.getElementById("divPreviewArea");
  if (divPreviewArea)
  {
    divPreviewArea.style.display = 'none';
  }

  var oDiv = document.getElementById(tAreaID);
  if (oDiv)
  {
    document.body.removeChild(oDiv);
  }

  var divMask = document.getElementById(tMask);
  if (divMask)
  {
    document.body.removeChild(divMask);
  }

  kit_isSub = 0;
}

// ------------------------------------------------------------------
function kit_LoadData(httpObject) 
{
  var divPriceO;
  var divPrice2;
  var divAddCart;
  var iTop;
  var iB;
  var iA;
  var tPricePopupHTML = '';
  var j=0;
  var divMsgTop;
  var aDP;
  var aDPL;
  var strLen;
  var boxW;
  var divFavoriteDiv;
  var divStat;
  var textStat;
  var divStatData;
  var spanStatData;
  var divShortDesc;
  var fOMI = '';
  var fONC = '';
  var fONF = '';
  var fONM = '';
  var fONMO = '';
  var divClear;
  var divSSLine;
  var divRItem;
  var aBreaks = [];
  var aKP;
  var aBreakPart;
  var divPricePopup;
  var tPopupWidth = '';
  var divQty;
  var inputQty;
  var divPrice;
  var optprice;
  var inputKitQty;
  var divKitStatus2;
  var oImg;
  var divfp;
  var infp;
  var iDP = 0;
  var inw;
  var imgSS;
  var divKitQtyR;
  var divDisable;
  var iAP = 0;
  var iFD = 0;
  var imgMain;
  var div1;
  var i=0;

  var response = httpObject.responseText;
  if (response !== '') 
  {
    var iTab = 1;
    aHasTab[2] = 0; // Properties
    aHasTab[3] = 0; // Item Stats
    aHasTab[4] = 0; // Kit
    aHasTab[5] = 0; // Accessories

    kit_Grid_x = "";
    kit_Grid_y = "";
    kit_GridId_x = "";
    kit_GridId_y = "";

    aQDHash = [];
    aQDHash["CustID"] = kit_CustID;

    var oDiv = document.getElementById(kitDivAreaID);
    var quotItem = kit_ItemID.replace(/"/g, "&quot;");
    var subid = '';
    if (kit_isSub) 
    {
      aDetailInput_SUB = [];
      subid = '_SUB';
      oDiv = document.getElementById(kitDivAreaIDSub);
      quotItem = kit_sub_ItemID.replace(/\"/g, "&quot;");
    } 
    else 
    {
      kit_Type = '';
      if (!kit_isEdit) 
      {
        aKH = [];
        aKHD = [];
        aKDD = [];
      }

      aDetailInput = [];
      aDetailInput_SUB = [];
    }

    var ItemNumber = '<span class="kitItemIdP">'+idpItemnum+'</span><span class="kitItemId">'+quotItem+'</span>';
    (parseInt(aInit["SuppressItemID"]) == 1) && (ItemNumber = '');
    var aCol = '';
    var iAStart = 0;
    var aHash = [];
    var aACC = [];
    var iACC = 0;
    var aAttrib = [];
    var iAttrib = 0;
    var aImprint = [];
    var iImprint = 0;
    var iKit = 0;
    var aSPECB = [];
    var iSPECB = 0;
    var aSPECF = [];
    var iSPECF = 0;
    var aSSell = [];
    var iSSell = 0;
    var aUDef = [];
    var iUDef = 0;

    aCol = response.split("~~");
    for (j=0;j<aCol.length;j++) {
      var aKV = aCol[j].split("||");
      aHash[aKV[0]] = aKV[1];
      if (aKV[0].substring(0,6) == "ATTRIB") {
        if (kit_Grid_x === "") {
          kit_Grid_x = aKV[1];
          kit_GridId_x = aKV[0].substring(6);
        } else if (kit_Grid_y === "") {
          kit_Grid_y = aKV[1];
          kit_GridId_y = aKV[0].substring(6);
        }
        aAttrib[iAttrib] = aKV[0].substring(6);
        iAttrib++;
        iTab = 2;
        aHasTab[2] = 1;
      } else if (aKV[0].substring(0,7) == "IMPRINT") {
        aImprint[iImprint] = aKV[0].substring(7);
        iImprint++;
        iTab = 2;
        aHasTab[2] = 1;
      } else if (aKV[0].substring(0,7) == "KitType") {
        (!kit_isSub) && (kit_Type = aKV[1]);
      } else if (aKV[0].substring(0,3) == "KIT") {
        iKit++;
        iTab = 4;
        aHasTab[4] = 1;
        var tKitID = aKV[0].substring(3);
        aKP = aKV[1].split("^");
        aKH[tKitID] = ( (aKP[5] == 'N') ? aKP[4] : '');
        aKHD[tKitID] = aKV[1]; //EZ^EZ^C900^1000^1^Y^EZPort Authority Cap     zero weight^Each^Y^
      } else if (aKV[0].substring(0,4) == "UDEF") {
        aUDef[iUDef] = aKV[0].substring(4);
        iUDef++;
        iTab = 2;
        aHasTab[2] = 1;
      } else if (aKV[0].substring(0,10) == "Attachment") {
        if ((aHash["Attachment"] == 'R')||(aHash["Attachment"] == 'O')) {
          iTab = 2;
          aHasTab[2] = 1;
        }
      } else if (aKV[0].substring(0,5) == "SSELL") {
        aSSell[iSSell] = aKV[0].substring(5);
        iSSell++;
      } else if (aKV[0].substring(0,3) == "ACC") {
        aACC[iACC] = aKV[0].substring(3);
        iACC++;
        aHasTab[5]=1;
      } else if (aKV[0].substring(0,5) == "SPECB") {
        aSPECB[iSPECB] = aKV[0].substring(5);
        iSPECB++;
        iTab = 2;
        aHasTab[2] = 1;
      } else if (aKV[0].substring(0,5) == "SPECF") {
        aSPECF[iSPECF] = aKV[0].substring(5);
        iSPECF++;
        iTab = 2;
        aHasTab[2] = 1;
      }
    }

    if (kit_isSub) 
    {
      kit_sub_Ref_Part = (kit_sub_Ref_Part === '') ? '0' : kit_sub_Ref_Part;

      if (typeof aKDD[kit_sub_Ref+'_'+kit_sub_Ref_Part] != 'undefined')
      {
        kit_isEdit = 1;
        var aKDDPair = aKDD[kit_sub_Ref+'_'+kit_sub_Ref_Part].split("&");
        var iKD = 0;

        for (iKD=0;iKD<aKDDPair.length;iKD++)
        {
          var aKDDQDPair = '';
          var iKDQD = 0;
          var aKDDKV = aKDDPair[iKD].split("=");

          if (aKDDKV[0] == 'QDData')
          {
            aKDDKV[1] = decodeURIComponent(aKDDKV[1]);
            aKDDQDPair = aKDDKV[1].split("~~");

            for (iKDQD=0;iKDQD<aKDDQDPair.length;iKDQD++)
            {
              var aKDDQDKV = aKDDQDPair[iKDQD].split("^^");
              aHashEdit['QD'+aKDDQDKV[0]] = aKDDQDKV[1];
            }
          }
          else if (aKDDKV[0] == 'Attrib')
          {
            aKDDKV[1] = decodeURIComponent(aKDDKV[1]);
            aKDDQDPair = aKDDKV[1].split("~~");

            for (iKDQD=0;iKDQD<aKDDQDPair.length;iKDQD++)
            {
              var aMyAtt = [];
              var aAttParts = aKDDQDPair[iKDQD].split("_");

              if (typeof aHash['ATTRIB'+aAttParts[0]] != 'undefined')
              {
                var aMainAtt = aHash['ATTRIB'+aAttParts[0]].split("~");
                var iMA = 1;
                for (iMA=1;iMA<aMainAtt.length;iMA++)
                {
                  var aMainAttParts = aMainAtt[iMA].split("^");

                  if (aMainAttParts[0] == aAttParts[1])
                  {
                    aHashEdit['ATTRIB' + parseInt(aAttParts[0], 10).toString()] = aMainAttParts[0]+'^'+aMainAttParts[1]+'^'+aMainAttParts[2]+'^'+aMainAttParts[3];
                  }
                }
              }
            }
          }
        }
      }
      else
      {
        var tKLine = aKHedit[aHash['Client']+'~'+aHash['CCat']+'~'+aHash['ItemID']];

        if (typeof aHashEdit['KIT'+tKLine] != 'undefined')
        {
          var aKParmPair = aHashEdit['KIT'+tKLine].split("&");
          for (i=0;i<aKParmPair.length;i++)
          {
            var aKPV = aKParmPair[i].split("=");
            if (aKPV[0] == 'QDData')
            {
              var aKPVAtt = aKPV[1].split("~|~");
              for (j=0;j<aKPVAtt.length;j++)
              {
                var aKPVAttV = aKPVAtt[j].split("^^");
                aHashEdit[aKPVAttV[0]] = aKPVAttV[1];
              }
            }
          }
        }
      }
    }

    (typeof aHash["kit_AddToCartText"] != 'undefined') && (kit_AddToCartText = aHash["kit_AddToCartText"]);
    (typeof aHash["kit_AddToKitText"] != 'undefined') && (kit_AddToKitText = aHash["kit_AddToKitText"]);
    (typeof aHash["kit_UpdateCartText"] != 'undefined') && (kit_UpdateCartText = aHash["kit_UpdateCartText"]);
    (typeof aHash["kit_PleaseWaitText"] != 'undefined') && (kit_PleaseWaitText = aHash["kit_PleaseWaitText"]);
    (typeof aHash["QD_PreviewRequiredText"] != 'undefined') && (QD_PreviewRequiredText = aHash["QD_PreviewRequiredText"]);
    (typeof aHash["QD_FieldRequired"] != 'undefined') && (QD_FieldRequired = strToPlainText(aHash["QD_FieldRequired"]));
    ((typeof aHash["QDEDIT"] != 'undefined')&&(aHash["QDEDIT"] == 1)) && (aHash["EnableFavorite"] = 0);
    if (
         ((aHash["AttribGrid"] == 'Y')||(aHash["AttribGrid"] == '2'))&&
         (aHash['ViewOnlyYN'] != 'Y')&&
         (kit_Grid_x !== '')&&
         (parseInt(kit_isEdit) === 0)
       ) 
    {
      iAStart = 2;
      if (kit_isSub) 
      {
        // kit subs should be picked up later
        // aDetailInput_SUB[aDetailInput_SUB.length] = 'ATTRIB-'+aAttrib[1]+'^Y';
        // aDetailInput_SUB[aDetailInput_SUB.length] = 'ATTRIB-'+aAttrib[2]+'^Y';
      } 
      else 
      {
        aDetailInput[aDetailInput.length] = 'ATTRIB-'+aAttrib[1]+'^Y';
        aDetailInput[aDetailInput.length] = 'ATTRIB-'+aAttrib[2]+'^Y';
      }
    } 
    else if ( (aHash["AttribGrid"] == '1')&&
                (aHash['ViewOnlyYN'] != 'Y')&&
                (kit_Grid_x !== '')&&
                (parseInt(kit_isEdit) === 0)
              ) 
    {
      iAStart = 1;
      kit_Grid_y = "";
      if (kit_isSub) 
      {
        // kit subs should be picked up later
        // aDetailInput_SUB[aDetailInput_SUB.length] = 'ATTRIB-'+aAttrib[1]+'^Y';
      } 
      else 
      {
        aDetailInput[aDetailInput.length] = 'ATTRIB-'+aAttrib[1]+'^Y';
      }
    }

    if (parseInt(kit_isEdit) == 1) {
      iAStart = 0;
      kit_Grid_y = "";
      kit_Grid_x = "";
    }

    if (aHash["TID"] > 0) {
      iTab = 2;
      aHasTab[2] = 1; // turn on properties tab
    }
    CurSym = (aHash["CurSym"] !== '') ? aHash["CurSym"] : ' ';
    kit_hasPricing = ( (aHash["HasPricing"] == 1) ? 1 : 0 );
    if (aHash["BCT"] == 'Y') {
      kit_HidePopup();
      if ((kit_bct_function !== '')&&(kit_bct_function !== undefined))
      {
        window[kit_bct_function](aHash["bct_username"],aHash["bct_password"],aHash["UserName"],aHash["ItemID"],aHash["CCat"],aHash["bct_height"]);
        return(0);
      }
    } else {
      kit_BuildPopup();
      triggerOnResize();

      oDiv = document.getElementById(kitDivAreaID);

      if (kit_isSub)
      {
        oDiv = document.getElementById(kitDivAreaIDSub);
      }
    }

    if (kit_isSub) {
      aHash["AttribGrid"] = 'N';
      iAStart = 0;
      kit_sub_viewonly = ( (aHash['ViewOnlyYN'] == 'Y') ? 1 : 0 );
    } else {
      kit_sub_viewonly = ( (aHash['ViewOnlyYN'] == 'Y') ? 1 : 0 );
    }

    // Attribute Grid Price
    kit_ItemPrice = aHash['Price'];

    if ((typeof aHash["PriceDetail"] !== 'undefined')&&(aHash["PriceDetail"] !== '')) {
      var aAPB = aHash["PriceDetail"].split ("~");
      if (aAPB.length > 0) {
        var aAPB1 = aAPB[0].split ("^"); // First Break
        kit_ItemPrice = aAPB1[1];
      }
    }

    (has_ItemStats == 1) && (aHasTab[3] = 1);
    //var iCol1H = 576;
    //var iCol2TabAreaH = 490;
    var iCol1H = 626;
    var iCol2TabAreaH = 535;

    if ((iSSell > 0)&&(kit_isEdit === 0)) {
      //iCol1H = 390;
      iCol1H = 440;
      //iCol2TabAreaH = 300;
      iCol2TabAreaH = 350;
    }

    var divFavorite = document.getElementById("kit_cb_favorite"+subid);
    if (divFavorite) {
      if (parseInt(aHash["EnableFavorite"]) === 0) 
      {
        divFavorite.checked = false;
        divFavorite.style.display = 'none';
        divFavoriteDiv = document.getElementById("kit_div_favorite"+subid);
        (divFavoriteDiv) && (divFavoriteDiv.style.display = 'none');
      } 
      else 
      {
        divFavorite.style.display = 'block';
        divFavoriteDiv = document.getElementById("kit_div_favorite"+subid);
        (divFavoriteDiv) && (divFavoriteDiv.style.display = 'block');
        divFavorite.checked = ( (aHash["Favorites"] == 1) ? true : false );
      }
    }

    var divPriceArea;
    if (!((typeof aHash["QDEDIT"] != 'undefined')&&(aHash["QDEDIT"] == 1))) 
    {
      var divColumn1 = document.getElementById("kitCol1"+subid);
      if (divColumn1)
      {
        divPriceArea = document.createElement('div');
        if (divPriceArea) 
        {
          divPriceArea.setAttribute("class","kitPriceArea");

          if ((aHash["TOUR"] !== undefined)&&(aHash["TOUR"] !== '')) {
            ItemNumber = '<div style="float:left;"><span class="kitItemIdP">Item No.</span><span class="kitItemId">'+quotItem+'</span></div><div style="float:right;margin-right:25px;"><img src="./qn_images/item-tour.png" onclick="window.open(\''+aHash["TOUR"]+'\',\'ImagePopup\',\'status=1,height=470,width=820,resizable=1\')" style="cursor:pointer;" /></div><div style="clear:both"></div>';
            if (parseInt(aInit["SuppressItemID"]) == 1) {
              ItemNumber = '<div style="float:right;margin-right:25px;"><img src="./qn_images/item-tour.png" onclick="window.open(\''+aHash["TOUR"]+'\',\'ImagePopup\',\'status=1,height=470,width=820,resizable=1\')" style="cursor:pointer;" /></div><div style="clear:both"></div>';
            }
          }
          if (
               ((aHash["HasPricing"] != "1")&&(aHash["PriceType"] != 'T')&&(aHash["PriceType"] != 'L')&&(aHash["PriceType"] != 'D'))||
               ((kit_isSub)&&(kit_Type == 'S'))
             ) {
            // start BUG-9196
            if (aHash["Unit"] !== '') {
              divPrice = document.createElement('div');
              if (divPrice)
              {
                divPrice.setAttribute("class","kitPriceLine");
                divPrice.setAttribute("id","divKitPriceLine");
                divPrice.innerHTML = aHash["Unit"];
                divPriceArea.appendChild(divPrice);
              }
            }

            if (aHash['ViewOnlyYN'] != 'Y') {  // BUG-9003
              if (aHash["KitType"] != 'D') {
                if (iAStart === 0) {
                  divQty = document.createElement('div');
                  if (divQty)
                  {
                    divQty.setAttribute("class","kitQtyLine");

                    inputQty = document.createElement('input');
                    if (inputQty)
                    {
                      inputQty.setAttribute("id","kitQtyInput"+subid);
                      inputQty.setAttribute("type","text");
                      inputQty.style.marginLeft = "5px";
                      inputQty.style.width = "150px";
                      inputQty.style.textAlign = "center";
                      inputQty.style.backgroundColor = aInit["qtyiBgColor"];
                      inputQty.style.color = aInit["qtyiColor"];
                      inputQty.style.fontStyle = aInit["qtyiFontStyle"];
                      inputQty.style.fontWeight = aInit["qtyiFontWeight"];
                      inputQty.style.fontSize = aInit["qtyiFontSize"];

                      if ((kit_isSub)&&(kit_Type == 'S'))
                      {
                        aKP = aKHD[kit_sub_Ref].split("^"); //EZ^EZ^C900^1000^1^Y^EZPort Authority Cap     zero weight^Each^Y^
                        inputQty.value = aKP[4];
                        inputQty.readOnly = true;
                      }
                      else
                      {
                        if (kit_isEdit)
                        {
                          inputQty.style.color = "#000000";
                          inputQty.style.fontStyle = "normal";
                          inputQty.style.fontSize = "17px";
                          inputQty.value = parseFloat(aHashEdit["qty"]);
                        }
                        else
                        {
                          var tText = aInit["qtyiText"];
                          var el = document.createElement("div");
                          el.innerHTML = tText;
                          if (el.firstChild)
                          {
                            tText = el.firstChild.data;
                          }

                          inputQty.value = tText;
                        }
                      }

                      fONF = "kit_qtyFocus()";
                      inputQty.onfocus = new Function (fONF);

                      divQty.appendChild(inputQty);
                    }
                  }

                  divPriceArea.appendChild(divQty);
                }
              }

              divAddCart = document.createElement('div');
              if (divAddCart)
              {
                divAddCart.setAttribute("class","kitAddCart");

                if (kit_isSub)
                {
                  divAddCart.innerHTML = kit_AddToKitText;
                }
                else
                {
                  if (kit_isEdit)
                  {
                    divAddCart.innerHTML = kit_UpdateCartText;
                  }
                  else
                  {
                    divAddCart.innerHTML = kit_AddToCartText;
                  }
                }

                fONC = 'kit_AddToCart()';
                if (iAStart > 0)
                {
                  fONC = 'kit_AddToCartMatrix()';
                }
                divAddCart.onclick = new Function (fONC);
                divAddCart.id = 'kit_AddToCart';
                divPriceArea.appendChild(divAddCart);
              }
            }
          } else if (aHash["PriceType"] == 'D') {
            if ((!kit_isSub)&&(kit_Type == 'D'))
            {}
            else
            {
              divPriceO = document.createElement('div');
              if (divPriceO)
              {
                divPriceO.setAttribute("class","kitPriceLine");
                divPriceO.setAttribute("id","divKitPriceLine");
                divPriceO.style.textAlign = "center";
                divPriceO.innerHTML = kit_SelectQty;

                divPrice2 = document.createElement('div');
                if (divPrice2)
                {
                  divPrice2.style.cssFloat = "right";
                  divPrice2.style.styleFloat = "right";
                  divPrice2.style.marginRight = "2px";
                  divPrice2.innerHTML = '<div class="kitPriceLink">'+aInit["pbaiIconChar"]+'</div>';
                }

                divPriceO.appendChild(divPrice2);

                fONC = 'kit_pricePopupOpen()';
                divPriceO.onclick = new Function (fONC);

                fONM = 'ITMD_SetFunctionTimer(750)';
                divPriceO.onmouseover = new Function (fONM);

                fONMO = 'ITMD_ClearFunctionTimer()';
                divPriceO.onmouseout = new Function (fONMO);

                divPriceArea.appendChild(divPriceO);
              }
            }

            tPopupWidth = '300px';
            if (aHash["HasPricing"] != "1")
            {
              tPopupWidth = '200px';
            }

            if ((typeof aHash["PriceDetail"] != 'undefined')&&(aHash["PriceDetail"] !== ''))
            {
              aBreaks = aHash["PriceDetail"].split ("~");
              for (iB=0;iB<aBreaks.length;iB++)
              {
                aBreakPart = aBreaks[iB].split ("^");

                if (aHash["HasPricing"] != "1")
                {
                  if (iB === 0)
                  {
                    tPricePopupHTML = '<div class="kitPriceBreak_Head" style="width:'+tPopupWidth+';"><div style="float:left;width:100px;">'+ hdQtyLbl + '</div><img id="kit_img_close" src="./qn_images/exit.gif" style="cursor: pointer; margin: 2px; float: right;" onclick="kit_pricePopupClose();"><div style="clear:both;"></div></div><div class="kitPriceBreak_Body" style="max-height:400px;overflow-x: hidden;overflow-y:auto;">';
                  }

                  if (aHash['ViewOnlyYN'] != 'Y') {
                    if ((kit_isEdit)&&(parseFloat(aHashEdit["originalQty"]) == parseFloat(aBreakPart[0]))) {
                      tPricePopupHTML += '<div class="kitPriceBreakLine" onmouseover="this.style.backgroundColor=\''+aInit["pbt-BodyrBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyrColor"]+'\';" onmouseout="this.style.backgroundColor=\''+aInit["pbt-BodyBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyColor"]+'\';" onclick="kit_AddToCart(\''+aBreakPart[0]+'\');"><div class="kitPriceBreakQty">'+aBreakPart[0]+'</div><div class="kitPriceBreakSelected">' + sbTextSelected + '</div><div style="clear:both;"></div></div>';
                    } else {
                      tPricePopupHTML += '<div class="kitPriceBreakLine" onmouseover="this.style.backgroundColor=\''+aInit["pbt-BodyrBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyrColor"]+'\';" onmouseout="this.style.backgroundColor=\''+aInit["pbt-BodyBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyColor"]+'\';" onclick="kit_AddToCart(\''+aBreakPart[0]+'\');"><div class="kitPriceBreakQty">'+aBreakPart[0]+'</div><div class="kitPriceBreakSelect">' + sbText + '</div><div style="clear:both;"></div></div>';
                    }
                  } else {
                    tPricePopupHTML += '<div class="kitPriceBreakLine" onmouseover="this.style.backgroundColor=\''+aInit["pbt-BodyrBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyrColor"]+'\';" onmouseout="this.style.backgroundColor=\''+aInit["pbt-BodyBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyColor"]+'\';"><div class="kitPriceBreakQty">'+aBreakPart[0]+'</div><div style="clear:both;"></div></div>';
                  }
                } 
                else 
                {
                  if (iB === 0)
                  {
                    tPricePopupHTML = '<div class="kitPriceBreak_Head" style="width:'+tPopupWidth+';"><div style="float:left;width:100px;margin-left:10px;">'+ hdQtyLbl + '</div><div style="float:left;width:100px;text-align:left;margin-left:10px;">'+ hdPriceLbl + '</div><img id="kit_img_close" src="./qn_images/exit.gif" style="cursor: pointer; margin: 2px; float: right;" onclick="kit_pricePopupClose();"><div style="clear:both;"></div></div><div class="kitPriceBreak_Body" style="max-height:400px;overflow-x: hidden;overflow-y:auto;">';
                  }

      //              tPricePopupHTML += '<div><div style="float:left;width:100px;text-align:center;">'+aBreakPart[0]+'</div><div style="float:left;width:100px;text-align:left;margin-left:10px;">\$'+aBreakPart[1]+'</div><div style="clear:both;"></div></div>';
                  if (aHash['ViewOnlyYN'] != 'Y')
                  {
                    if ((kit_isEdit)&&(parseFloat(aHashEdit["originalQty"]) == parseFloat(aBreakPart[0])))
                    {
                      tPricePopupHTML += '<div class="kitPriceBreakLine" onmouseover="this.style.backgroundColor=\''+aInit["pbt-BodyrBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyrColor"]+'\';" onmouseout="this.style.backgroundColor=\''+aInit["pbt-BodyBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyColor"]+'\';" onclick="kit_AddToCart(\''+aBreakPart[0]+'\');"><div class="kitPriceBreakQty">'+aBreakPart[0]+'</div><div class="kitPriceBreakTotal">'+CurSym+aBreakPart[1]+'</div><div class="kitPriceBreakSelected">' + sbTextSelected + '</div><div style="clear:both;"></div></div>';
                    }
                    else
                    {
                      tPricePopupHTML += '<div class="kitPriceBreakLine" onmouseover="this.style.backgroundColor=\''+aInit["pbt-BodyrBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyrColor"]+'\';" onmouseout="this.style.backgroundColor=\''+aInit["pbt-BodyBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyColor"]+'\';" onclick="kit_AddToCart(\''+aBreakPart[0]+'\');"><div class="kitPriceBreakQty">'+aBreakPart[0]+'</div><div class="kitPriceBreakTotal">'+CurSym+aBreakPart[1]+'</div><div class="kitPriceBreakSelect">' + sbText + '</div><div style="clear:both;"></div></div>';
                    }
                  }
                  else
                  {
                    tPricePopupHTML += '<div class="kitPriceBreakLine" onmouseover="this.style.backgroundColor=\''+aInit["pbt-BodyrBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyrColor"]+'\';" onmouseout="this.style.backgroundColor=\''+aInit["pbt-BodyBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyColor"]+'\';"><div class="kitPriceBreakQty">'+aBreakPart[0]+'</div><div class="kitPriceBreakTotal">'+CurSym+aBreakPart[1]+'</div><div style="clear:both;"></div></div>';
                  }
                }
              }
            }

            tPricePopupHTML += '</div><div class="kitPriceBreak_Foot"><div style="float:right;width:200px;text-align:right;margin-right:10px;">'+aHash["Unit"]+'</div><div style="clear:both;"></div></div>';

            iTop = ((9.5 * (iB + 2)) - 12);
            divPricePopup = document.createElement('div');
            if (divPricePopup)
            {
              divPricePopup.setAttribute("class","kitPrice_arrow_box");
              divPricePopup.setAttribute("id","kit_pricePopup"+subid);
              divPricePopup.style.top = "-"+iTop+"px";
              divPricePopup.style.left = "248px";
              divPricePopup.style.width = "300px";
              divPricePopup.style.mozBorderRadius = "10px";
              divPricePopup.style.webkitBorderRadius = "10px";
              divPricePopup.style.borderRadius = "10px";
              divPricePopup.style.zIndex = "10000";

              divPricePopup.innerHTML = tPricePopupHTML;
              divColumn1.parentNode.appendChild(divPricePopup);
            }
          } else if ((aHash["PriceType"] == 'T')||(aHash["PriceType"] == 'L')) { // D=DropDown T=Table L=Table minus per unit row
              if ((!kit_isSub)&&(kit_Type == 'D'))
              {}
              else
              {
                divPriceO = document.createElement('div');
                if (divPriceO)
                {
                  divPriceO.setAttribute("class","kitPriceLine");
                  divPriceO.setAttribute("id","divKitPriceLine");
                  divPriceO.style.textAlign = "center";
                  divPriceO.innerHTML = kit_SelectQty;

                  divPrice2 = document.createElement('div');
                  if (divPrice2)
                  {
                    divPrice2.style.cssFloat = "right";
                    divPrice2.style.styleFloat = "right";
                    divPrice2.style.marginRight = "2px";
                    divPrice2.innerHTML = '<div class="kitPriceLink">'+aInit["pbaiIconChar"]+'</div>';
                  }

                  divPriceO.appendChild(divPrice2);

                  fONC = 'kit_pricePopupOpen()';
                  divPriceO.onclick = new Function (fONC);

                  fONM = 'ITMD_SetFunctionTimer(750)';
                  divPriceO.onmouseover = new Function (fONM);

                  fONMO = 'ITMD_ClearFunctionTimer()';
                  divPriceO.onmouseout = new Function (fONMO);

                  divPriceArea.appendChild(divPriceO);
                }
              }

              var aC1 = [];
              var aC2 = [];
              var aC3 = [];

              if ((typeof aHash["PriceDetail"] != 'undefined')&&(aHash["PriceDetail"] !== ''))
              {
                aBreaks = aHash["PriceDetail"].split ("~");
                for (iB=0;iB<aBreaks.length;iB++)
                {
                  aBreakPart = aBreaks[iB].split ("^");
                  if (iB === 0)
                  {
                    aC1 = aBreaks[iB].split ("^");
                  }
                  else if (iB == 1)
                  {
                    aC2 = aBreaks[iB].split ("^");
                  }
                  else if (iB == 2)
                  {
                    aC3 = aBreaks[iB].split ("^");
                  }
                }
              }

              tPopupWidth = '400px';
              if (aHash["HasPricing"] != "1")
              {
                tPopupWidth = '200px';
              }
              else if (aHash["PriceType"] == 'L')
              {
                tPopupWidth = '300px';
              }

              for (iB=0;iB<aC1.length;iB++)
              {
                if (aHash["HasPricing"] != "1")
                {
                  if (iB === 0)
                  {
                    tPricePopupHTML = '<div class="kitPriceBreak_Head" style="width:'+tPopupWidth+';"><div style="float:left;width:100px;margin-left:10px;">'+ hdQtyLbl + '</div><img id="kit_img_close" src="./qn_images/exit.gif" style="cursor: pointer; margin: 2px; float: right;" onclick="kit_pricePopupClose();"><div style="clear:both;"></div></div><div class="kitPriceBreak_Body" style="max-height:360px;overflow-x: hidden;overflow-y:auto;">';
                  }

                  if (aHash['ViewOnlyYN'] != 'Y')
                  {
                    if ((kit_isEdit)&&(parseFloat(aHashEdit["originalQty"]) == parseFloat(aC1[iB])))
                    {
                      tPricePopupHTML += '<div class="kitPriceBreakLine" onmouseover="this.style.backgroundColor=\''+aInit["pbt-BodyrBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyrColor"]+'\';" onmouseout="this.style.backgroundColor=\''+aInit["pbt-BodyBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyColor"]+'\';" onclick="kit_AddToCart(\''+aC1[iB]+'\');"><div class="kitPriceBreakQty">'+aC1[iB]+'</div><div class="kitPriceBreakSelected">' + sbTextSelected + '</div><div style="clear:both;"></div></div>';
                    }
                    else
                    {
                      tPricePopupHTML += '<div class="kitPriceBreakLine" onmouseover="this.style.backgroundColor=\''+aInit["pbt-BodyrBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyrColor"]+'\';" onmouseout="this.style.backgroundColor=\''+aInit["pbt-BodyBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyColor"]+'\';" onclick="kit_AddToCart(\''+aC1[iB]+'\');"><div class="kitPriceBreakQty">'+aC1[iB]+'</div><div class="kitPriceBreakSelect">' + sbText + '</div><div style="clear:both;"></div></div>';
                    }
                  }
                  else
                  {
                    tPricePopupHTML += '<div class="kitPriceBreakLine" onmouseover="this.style.backgroundColor=\''+aInit["pbt-BodyrBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyrColor"]+'\';" onmouseout="this.style.backgroundColor=\''+aInit["pbt-BodyBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyColor"]+'\';"><div class="kitPriceBreakQty">'+aC1[iB]+'</div><div style="clear:both;"></div></div>';
                  }
                }
                else
                {
                  if (iB === 0)
                  {
                    if (aHash["PriceType"] == 'L')
                    {
                      tPricePopupHTML = '<div class="kitPriceBreak_Head" style="width:'+tPopupWidth+';"><div style="float:left;width:100px;margin-left:10px;">'+ hdQtyLbl + '</div><div style="float:left;width:100px;text-align:left;margin-left:10px;">' + hdTotLbl + '</div><img id="kit_img_close" src="./qn_images/exit.gif" style="cursor: pointer; margin: 2px; float: right;" onclick="kit_pricePopupClose();"><div style="clear:both;"></div></div><div class="kitPriceBreak_Body" style="max-height:360px;overflow-x: hidden;overflow-y:auto;">';
                    }
                    else
                    {
                      tPricePopupHTML = '<div class="kitPriceBreak_Head" style="width:'+tPopupWidth+';"><div style="float:left;width:100px;margin-left:10px;">'+ hdQtyLbl + '</div><div style="float:left;width:100px;text-align:left;margin-left:10px;">' + hdPriceLbl + '</div><div style="float:left;width:100px;text-align:left;margin-left:10px;">' + hdTotLbl + '</div><img id="kit_img_close" src="./qn_images/exit.gif" style="cursor: pointer; margin: 2px; float: right;" onclick="kit_pricePopupClose();"><div style="clear:both;"></div></div><div class="kitPriceBreak_Body" style="max-height:360px;overflow-x: hidden;overflow-y:auto;">';
                    }
                  }

                  if (aHash['ViewOnlyYN'] != 'Y')
                  {
                    if (aHash["PriceType"] == 'L')
                    {
                      if ((kit_isEdit)&&(parseFloat(aHashEdit["originalQty"]) == parseFloat(aC1[iB])))
                      {
                        tPricePopupHTML += '<div class="kitPriceBreakLine" onmouseover="this.style.backgroundColor=\''+aInit["pbt-BodyrBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyrColor"]+'\';" onmouseout="this.style.backgroundColor=\''+aInit["pbt-BodyBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyColor"]+'\';" onclick="kit_AddToCart(\''+aC1[iB]+'\');"><div class="kitPriceBreakQty">'+aC1[iB]+'</div><div class="kitPriceBreakTotal">'+CurSym+aC3[iB]+'</div><div class="kitPriceBreakSelected">' + sbTextSelected + '</div><div style="clear:both;"></div></div>';
                      }
                      else
                      {
                        tPricePopupHTML += '<div class="kitPriceBreakLine" onmouseover="this.style.backgroundColor=\''+aInit["pbt-BodyrBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyrColor"]+'\';" onmouseout="this.style.backgroundColor=\''+aInit["pbt-BodyBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyColor"]+'\';" onclick="kit_AddToCart(\''+aC1[iB]+'\');"><div class="kitPriceBreakQty">'+aC1[iB]+'</div><div class="kitPriceBreakTotal">'+CurSym+aC3[iB]+'</div><div class="kitPriceBreakSelect">' + sbText + '</div><div style="clear:both;"></div></div>';
                      }
                    }
                    else
                    {
                      if ((kit_isEdit)&&(parseFloat(aHashEdit["originalQty"]) == parseFloat(aC1[iB])))
                      {
                        tPricePopupHTML += '<div class="kitPriceBreakLine" onmouseover="this.style.backgroundColor=\''+aInit["pbt-BodyrBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyrColor"]+'\';" onmouseout="this.style.backgroundColor=\''+aInit["pbt-BodyBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyColor"]+'\';" onclick="kit_AddToCart(\''+aC1[iB]+'\');"><div class="kitPriceBreakQty">'+aC1[iB]+'</div><div class="kitPriceBreakTotal">'+CurSym+aC2[iB]+'</div><div class="kitPriceBreakTotal">'+CurSym+aC3[iB]+'</div><div class="kitPriceBreakSelected">' + sbTextSelected + '</div><div style="clear:both;"></div></div>';
                      }
                      else
                      {
                        tPricePopupHTML += '<div class="kitPriceBreakLine" onmouseover="this.style.backgroundColor=\''+aInit["pbt-BodyrBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyrColor"]+'\';" onmouseout="this.style.backgroundColor=\''+aInit["pbt-BodyBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyColor"]+'\';" onclick="kit_AddToCart(\''+aC1[iB]+'\');"><div class="kitPriceBreakQty">'+aC1[iB]+'</div><div class="kitPriceBreakTotal">'+CurSym+aC2[iB]+'</div><div class="kitPriceBreakTotal">'+CurSym+aC3[iB]+'</div><div class="kitPriceBreakSelect">' + sbText + '</div><div style="clear:both;"></div></div>';
                      }
                    }
                  }
                  else
                  {
                    if (aHash["PriceType"] == 'L')
                    {
                      tPricePopupHTML += '<div class="kitPriceBreakLine" onmouseover="this.style.backgroundColor=\''+aInit["pbt-BodyrBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyrColor"]+'\';" onmouseout="this.style.backgroundColor=\''+aInit["pbt-BodyBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyColor"]+'\';"><div class="kitPriceBreakQty">'+aC1[iB]+'</div><div class="kitPriceBreakTotal">'+CurSym+aC3[iB]+'</div><div style="clear:both;"></div></div>';
                    }
                    else
                    {
                      tPricePopupHTML += '<div class="kitPriceBreakLine" onmouseover="this.style.backgroundColor=\''+aInit["pbt-BodyrBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyrColor"]+'\';" onmouseout="this.style.backgroundColor=\''+aInit["pbt-BodyBgColor"]+'\';this.style.color=\''+aInit["pbt-BodyColor"]+'\';"><div class="kitPriceBreakQty">'+aC1[iB]+'</div><div class="kitPriceBreakTotal">'+CurSym+aC2[iB]+'</div><div class="kitPriceBreakTotal">'+CurSym+aC3[iB]+'</div><div style="clear:both;"></div></div>';
                    }
                  }
                }
              }

              tPricePopupHTML += '</div><div class="kitPriceBreak_Foot"><div style="float:right;width:200px;text-align:right;margin-right:10px;">'+aHash["Unit"]+'</div><div style="clear:both;"></div></div>';

              iTop = ((10 * (iB + 2)) - 12);
              divPricePopup = document.createElement('div');
              if (divPricePopup)
              {
                divPricePopup.setAttribute("class","kitPrice_arrow_box");
                divPricePopup.setAttribute("id","kit_pricePopup"+subid);
                divPricePopup.style.left = "248px";
                divPricePopup.style.width = tPopupWidth;
                divPricePopup.style.mozBorderRadius = "10px";
                divPricePopup.style.webkitBorderRadius = "10px";
                divPricePopup.style.borderRadius = "10px";
                divPricePopup.style.zIndex = "10000";

                if (iB > 20)
                {
                  divPricePopup.style.height = "400px";
                  divPricePopup.style.top = "-187px";
                }
                else
                {
                  divPricePopup.style.top = "-"+iTop+"px";
                }

                divPricePopup.innerHTML = tPricePopupHTML;
                divColumn1.parentNode.appendChild(divPricePopup);
              }
          } else if (aHash["PriceType"] == 'Regular_Break') {
            tPricePopupHTML = '';

            if (aHash["HasPricing"] == 1)
            {
              if ((!kit_isSub)&&(kit_Type == 'D'))
              {}
              else
              {
                divPriceO = document.createElement('div');
                if (divPriceO)
                {
                  divPriceO.setAttribute("class","kitPriceLine");
                  divPriceO.setAttribute("id","divKitPriceLine");
                  divPriceO.style.textAlign = "center";
                  divPriceO.innerHTML = aInit['pmb-text'];

                  divPrice2 = document.createElement('div');
                  if (divPrice2)
                  {
                    divPrice2.style.cssFloat = "right";
                    divPrice2.style.styleFloat = "right";
                    divPrice2.style.marginRight = "2px";
                    divPrice2.innerHTML = '<div class="kitPriceLink">'+aInit["pbaiIconChar"]+'</div>';
                  }

                  divPriceO.appendChild(divPrice2);

                  fONC = 'kit_pricePopupOpen()';
                  divPriceO.onclick = new Function (fONC);

                  fONM = 'ITMD_SetFunctionTimer(750)';
                  divPriceO.onmouseover = new Function (fONM);

                  fONMO = 'ITMD_ClearFunctionTimer()';
                  divPriceO.onmouseout = new Function (fONMO);

                  divPriceArea.appendChild(divPriceO);
                }
              }

              if (aHash['ViewOnlyYN'] != 'Y') {
                if (iAStart === 0) {
                  divQty = document.createElement('div');
                  if (divQty)
                  {
                    divQty.setAttribute("class","kitQtyLine");

                    inputQty = document.createElement('input');
                    if (inputQty)
                    {
                      inputQty.setAttribute("id","kitQtyInput"+subid);
                      inputQty.setAttribute("type","text");
                      inputQty.setAttribute("class","kitQtyLine_Input");
                      inputQty.style.marginLeft = "5px";
                      inputQty.style.width = "150px";
                      inputQty.style.textAlign = "center";
                      inputQty.style.backgroundColor = aInit["qtyiBgColor"];
                      inputQty.style.color = aInit["qtyiColor"];
                      inputQty.style.fontStyle = aInit["qtyiFontStyle"];
                      inputQty.style.fontWeight = aInit["qtyiFontWeight"];
                      inputQty.style.fontSize = aInit["qtyiFontSize"];

                      if (kit_isEdit)
                      {
                        inputQty.style.backgroundColor = aInit["qtyBgColor"];
                        inputQty.style.color = aInit["qtyColor"];
                        inputQty.style.fontStyle = aInit["qtyFontStyle"];
                        inputQty.style.fontWeight = aInit["qtyFontWeight"];
                        inputQty.style.fontSize = aInit["qtyFontSize"];
                        inputQty.value = parseFloat(aHashEdit["qty"]);
                      }
                      else
                      {
                        inputQty.value = strToPlainText(aInit["qtyiText"]);
                      }

                      fONF = "kit_qtyFocus()";
                      inputQty.onfocus = new Function (fONF);

                      divQty.appendChild(inputQty);
                    }

                    divPriceArea.appendChild(divQty);
                  }
                }

                divAddCart = document.createElement('div');
                if (divAddCart)
                {
                  divAddCart.setAttribute("class","kitAddCart");

                  if (kit_isSub)
                  {
                    divAddCart.innerHTML = kit_AddToKitText;
                  }
                  else
                  {
                    if (kit_isEdit)
                    {
                      divAddCart.innerHTML = kit_UpdateCartText;
                    }
                    else
                    {
                      divAddCart.innerHTML = kit_AddToCartText;
                    }
                  }

                  fONC = 'kit_AddToCart()';
                  if (iAStart > 0)
                  {
                    fONC = 'kit_AddToCartMatrix()';
                  }

                  divAddCart.onclick = new Function (fONC);
                  divAddCart.id = 'kit_AddToCart';
                  divPriceArea.appendChild(divAddCart);
                }
              }

              if ((typeof aHash["PriceDetail"] != 'undefined')&&(aHash["PriceDetail"] !== ''))
              {
                aBreaks = aHash["PriceDetail"].split ("~");
                for (iB=0;iB<aBreaks.length;iB++)
                {
                  aBreakPart = aBreaks[iB].split ("^");
                  if (iB === 0)
                  {
                    tPricePopupHTML = '<div class="kitPriceBreak_Head" style="width:300px;"><div style="float:left;width:100px;margin-left:10px;">'+ hdQtyLbl + '</div><div style="float:left;width:100px;text-align:left;margin-left:10px;">' + hdPriceLbl + '</div><img id="kit_img_close" src="./qn_images/exit.gif" style="cursor: pointer; margin: 2px; float: right;" onclick="kit_pricePopupClose();"><div style="clear:both;"></div></div><div class="kitPriceBreak_Body" style="max-height:360px;overflow-x: hidden;overflow-y:auto;">';
                  }

                  tPricePopupHTML += '<div><div style="float:left;width:100px;text-align:right;">'+aBreakPart[0]+' '+_PriceBreakOrMore+' </div><div style="float:left;width:100px;text-align:left;margin-left:10px;">'+CurSym+aBreakPart[1]+'</div><div style="clear:both;"></div></div>';
                }
              }

              tPricePopupHTML += '</div><div class="kitPriceBreak_Foot"><div style="float:right;width:200px;text-align:right;margin-right:10px;margin-top:2px;">'+aHash["Unit"]+'</div><div style="clear:both;"></div></div>';

              iTop = ((9.5 * (iB + 2)) - 12);
              divPricePopup = document.createElement('div');
              if (divPricePopup)
              {
                divPricePopup.setAttribute("class","kitPrice_arrow_box");
                divPricePopup.setAttribute("id","kit_pricePopup"+subid);
                divPricePopup.style.left = "248px";
                divPricePopup.style.width = "300px";
                divPricePopup.style.mozBorderRadius = "10px";
                divPricePopup.style.webkitBorderRadius = "10px";
                divPricePopup.style.borderRadius = "10px";
                divPricePopup.style.zIndex = "10000";

                if (iB > 20)
                {
                  divPricePopup.style.height = "400px";
                  divPricePopup.style.top = "-187px";
                }
                else
                {
                  divPricePopup.style.top = "-"+iTop+"px";
                }

                divPricePopup.innerHTML = tPricePopupHTML;
                divColumn1.parentNode.appendChild(divPricePopup);
              }
            }
          } 
          else // aHash["PriceType"] == 'Regular_NoBreak'
          {
            if ((parseFloat(aHash["Price"]) < 0.00001) && (kit_ZeroPricePopup !== '')) 
            {
              divPrice = document.createElement('div');
              if (divPrice)
              {
                divPrice.setAttribute("class","kitPriceLine");
                divPrice.setAttribute("id","divKitPriceLine");
                divPrice.innerHTML = kit_ZeroPrice + " / " + aHash["Unit"];

                fONC = 'kit_pricePopupOpen()';
                divPrice.onclick = new Function (fONC);

                fONM = 'ITMD_SetFunctionTimer(750)';
                divPrice.onmouseover = new Function (fONM);

                fONMO = 'ITMD_ClearFunctionTimer()';
                divPrice.onmouseout = new Function (fONMO);

                divPriceArea.appendChild(divPrice);
              }

              iB = 2;
              iTop = ((9.5 * (iB + 2)) - 12);
              divPricePopup = document.createElement('div');
              if (divPricePopup)
              {
                divPricePopup.setAttribute("class","kitPrice_arrow_box");
                divPricePopup.setAttribute("id","kit_pricePopup"+subid);
                divPricePopup.style.left = "248px";
                divPricePopup.style.width = "300px";
                divPricePopup.style.mozBorderRadius = "10px";
                divPricePopup.style.webkitBorderRadius = "10px";
                divPricePopup.style.borderRadius = "10px";
                divPricePopup.style.zIndex = "10000";

                if (iB > 20)
                {
                  divPricePopup.style.height = "400px";
                  divPricePopup.style.top = "-187px";
                }
                else
                {
                  divPricePopup.style.top = "-"+iTop+"px";
                }

                tPricePopupHTML = '<div style="font-weight:bold;width:300px;"><img id="kit_img_close" src="./qn_images/exit.gif" style="cursor: pointer; margin: 2px; float: right;" onclick="kit_pricePopupClose();"><div style="clear:both;"></div></div><div style="max-height:360px;overflow-x: hidden;overflow-y:auto;">';
                tPricePopupHTML += '<div style="height:60px;">'+kit_ZeroPricePopup+'</div>';

                divPricePopup.innerHTML = tPricePopupHTML;
                divColumn1.parentNode.appendChild(divPricePopup);
              }
            }
            else
            {
              if ((!kit_isSub)&&(kit_Type == 'D'))
              {}
              else
              {
                divPrice = document.createElement('div');
                if (divPrice)
                {
                  divPrice.setAttribute("class","kitPriceLine");
                  divPrice.setAttribute("id","divKitPriceLine");
                  divPrice.innerHTML = CurSym + aHash["Price"] + " / " + aHash["Unit"];
                  divPriceArea.appendChild(divPrice);
                }
              }
            }

            if (aHash['ViewOnlyYN'] != 'Y') 
            {
              if (iAStart === 0)
              {
                divQty = document.createElement('div');
                if (divQty)
                {
                  divQty.setAttribute("class","kitQtyLine");

                  inputQty = document.createElement('input');
                  if (inputQty)
                  {
                    inputQty.setAttribute("id","kitQtyInput"+subid);
                    inputQty.setAttribute("type","text");
                    inputQty.style.marginLeft = "5px";
                    inputQty.style.width = "150px";
                    inputQty.style.textAlign = "center";
                    inputQty.style.fontSize = aInit["qtyiFontSize"];
                    inputQty.style.backgroundColor = aInit["qtyiBgColor"];
                    inputQty.style.color = aInit["qtyiColor"];
                    inputQty.style.fontStyle = aInit["qtyiFontStyle"];
                    inputQty.style.fontWeight = aInit["qtyiFontWeight"];

                    if (kit_isEdit)
                    {
                      inputQty.style.color = "#000000";
                      inputQty.style.fontStyle = "normal";
                      inputQty.style.fontSize = "17px";
                      inputQty.value = parseFloat(aHashEdit["qty"]);
                    }
                    else
                    {
                      inputQty.value = strToPlainText(aInit["qtyiText"]);
                    }

                    fONF = "kit_qtyFocus()";
                    inputQty.onfocus = new Function (fONF);

                    divQty.appendChild(inputQty);
                  }

                  divPriceArea.appendChild(divQty);
                }
              }

              divAddCart = document.createElement('div');
              if (divAddCart)
              {
                divAddCart.setAttribute("class","kitAddCart");

                if (kit_isSub)
                {
                  divAddCart.innerHTML = kit_AddToKitText;
                }
                else
                {
                  if (kit_isEdit)
                  {
                    divAddCart.innerHTML = kit_UpdateCartText;
                  }
                  else
                  {
                    divAddCart.innerHTML = kit_AddToCartText;
                  }
                }

                fONC = 'kit_AddToCart()';
                if (iAStart > 0)
                {
                  fONC = 'kit_AddToCartMatrix()';
                }
                divAddCart.onclick = new Function (fONC);
                divAddCart.id = 'kit_AddToCart';
                divPriceArea.appendChild(divAddCart);
              }
            }
          }
        }
      }
    }

    var divCol1 = document.getElementById("kitCol1"+subid);
    if (divCol1)
    {
      divCol1.style.height = iCol1H+"px";

      var divImg = document.createElement('div');
      if (divImg)
      {
        divImg.setAttribute("class","kitImageMain");

        if ("AltImg1" in aHash) // more than 1
        {
          divImg.setAttribute("class","kitImageMain");
        }
        else
        {
          divImg.setAttribute("class","kitImageMain2");
        }

        if (aHash["TID"] > 0)
        {
          divImg.style.display = 'none';
        }
        else
        {
          divImg.style.display = 'block';
        }

        divImg.onclick = function () { loadPopupItemZoom(aHash["Client"],aHash["CCat"],aHash["CatType"],kit_CatID,aHash["vcDBName"],aHash["ItemID"]); };

        imgMain = document.createElement('img');
        if (imgMain)
        {
          imgMain.setAttribute("src",aHash["PicFile"]);
          imgMain.style.maxWidth = '225px';
          imgMain.style.maxHeight = '250px';

          divImg.appendChild(imgMain);
        }

        var divImgZoom = document.createElement('div');
        if (divImgZoom)
        {
          divImgZoom.setAttribute("class","kitImageMainZoom");

          var imgImageZoom = document.createElement('img');
          if (imgImageZoom)
          {
            imgImageZoom.setAttribute("src","./qn_images/hint.gif");
            imgImageZoom.style.cssFloat = "left";
            imgImageZoom.style.styleFloat = "left";
            imgImageZoom.style.marginTop = "2px";

            divImgZoom.appendChild(imgImageZoom);
          }
          var spanImageZoom = document.createElement('div');
          if (spanImageZoom)
          {
            spanImageZoom.innerHTML = idpZoom;
            spanImageZoom.style.cssFloat = "left";
            spanImageZoom.style.styleFloat = "left";
            spanImageZoom.style.marginLeft = "5px";
            spanImageZoom.style.marginTop = "3px";
            divImgZoom.appendChild(spanImageZoom);
          }

          divImg.appendChild(divImgZoom);
        }

        divCol1.appendChild(divImg);
      }

      var divImgT = document.createElement('div');
      if (divImgT)
      {
        if (aHash["TID"] > 0)
        {
          divImgT.style.display = 'none';
        }
        else
        {
          divImgT.style.display = 'block';
        }

        if ("AltImg1" in aHash) // more than 1
        {
          divImgT.setAttribute("class","kitImageDivTN");
          divImgT.onclick = function () { loadPopupItemZoom(aHash["Client"],aHash["CCat"],aHash["CatType"],kit_CatID,aHash["vcDBName"],aHash["ItemID"]); };

          var iAltCnt = 0;
          var altPath = aHash["imagePath"]+"thumbnails/38x45/";
          for (iAltCnt=0;iAltCnt<5;iAltCnt++)
          {
            //alert("iAltCnt="+iAltCnt);

            if ((kit_CatType == "S")&&(kit_CatID == "2"))
            {
              if ("AltImg"+iAltCnt in aHash)
              {
                oImg = document.createElement('img');
                oImg.src = aHash["AltImg"+iAltCnt];
                oImg.style.width = '45px';
                oImg.style.margin = '1px';
                divImgT.appendChild(oImg);
              }
            }
            else
            {
              if ("AltImg"+iAltCnt in aHash)
              {
                // var altExt = '.jpg';
                var altExt = '.png';
                var dot = aHash["AltImg"+iAltCnt].lastIndexOf(".");
                var imgExt = aHash["AltImg"+iAltCnt].substr(dot, aHash["AltImg"+iAltCnt].length);

                if (imgExt.toUpperCase() == ".PDF")
                {
                  altExt = '.gif';
                }

                oImg = document.createElement('img');
                oImg.src = altPath+aHash["AltImg"+iAltCnt]+altExt;
                divImgT.appendChild(oImg);
              }
            }
          }
        }
        else
        {
        }

        divCol1.appendChild(divImgT);
      }

      var divPreviewControl = document.createElement('div');
      if (divPreviewControl)
      {
        divPreviewControl.setAttribute("id","QD_PreviewDiv");
        divPreviewControl.setAttribute("class","QD_PreviewDiv");

        if (aHash["TID"] > 0)
        {
          divPreviewControl.style.display = 'block';
        }
        else
        {
          divPreviewControl.style.display = 'none';
        }

        if ((aHash['QD_SuppressPreviewPDFYN'] == 'Y')||(aHash['QD_SuppressPreviewYN'] == 'N'))
        {
          var divPreviewControlButton1 = document.createElement('div');
          if (divPreviewControlButton1)
          {
            divPreviewControlButton1.setAttribute("class","QD_PreviewButton");
            divPreviewControlButton1.style.cursor = 'pointer';
            divPreviewControlButton1.innerHTML = aHash['QD_Label_Preview'];

            fONC = "QD_CreatePDF(0)";
            divPreviewControlButton1.onclick = new Function (fONC);

            divPreviewControl.appendChild(divPreviewControlButton1);
          }
        }

        if (aHash['QD_SuppressPreviewPDFYN'] == 'N')
        {
          var divPreviewControlButton2 = document.createElement('div');
          if (divPreviewControlButton2)
          {
            divPreviewControlButton2.setAttribute("class","QD_PreviewButton");
            divPreviewControlButton2.style.cursor = 'pointer';
            divPreviewControlButton2.innerHTML = aHash['QD_Label_PreviewPDF'];

            fONC = "QD_CreatePDF(1)";
            divPreviewControlButton2.onclick = new Function (fONC);

            divPreviewControl.appendChild(divPreviewControlButton2);
          }
        }

        if ((typeof aHash["QDEDIT"] != 'undefined')&&(aHash["QDEDIT"] == 1))
        {
          divPreviewControl.style.height = '100%';

          var divPreviewControlButton3 = document.createElement('div');
          if (divPreviewControlButton3)
          {
            divPreviewControlButton3.setAttribute("class","QD_PreviewButton");
            divPreviewControlButton3.style.cursor = 'pointer';
            divPreviewControlButton3.innerHTML = 'Final PDF';

            fONC = "QD_CreatePDF(1,'Y')";
            divPreviewControlButton3.onclick = new Function (fONC);

            divPreviewControl.appendChild(divPreviewControlButton3);
          }

          var divPreviewControlButton4 = document.createElement('div');
          if (divPreviewControlButton4)
          {
            divPreviewControlButton4.setAttribute("class","QD_PreviewButton");
            divPreviewControlButton4.style.cursor = 'pointer';
            divPreviewControlButton4.style.fontSize = '15px';
            divPreviewControlButton4.style.padding = '3px 10px';
            divPreviewControlButton4.innerHTML = 'Display Default Thumbnail';

            fONC = "QD_DisplayDefaultTN();";
            divPreviewControlButton4.onclick = new Function (fONC);

            divPreviewControl.appendChild(divPreviewControlButton4);
          }

          var divPreviewControlButton5 = document.createElement('div');
          if (divPreviewControlButton5)
          {
            divPreviewControlButton5.setAttribute("class","QD_PreviewButton");
            divPreviewControlButton5.style.cursor = 'pointer';
            divPreviewControlButton5.style.fontSize = '15px';
            divPreviewControlButton5.style.padding = '3px 10px';
            divPreviewControlButton5.innerHTML = 'Set Default<br>Thumbnail';

            fONC = "QD_CreatePDF(2)";
            divPreviewControlButton5.onclick = new Function (fONC);

            divPreviewControl.appendChild(divPreviewControlButton5);
          }
        }

        divCol1.appendChild(divPreviewControl);
      }

      if (divPriceArea)
      {
        divCol1.appendChild(divPriceArea);
      }
    }

    var divCol2 = document.getElementById("kitCol2"+subid);
    if (divCol2)
    {
      divCol2.style.height = iCol1H+"px";

      var divItemId = document.createElement('div');
      if (divItemId)
      {
        divItemId.innerHTML = ItemNumber;
        divCol2.appendChild(divItemId);
      }
      divShortDesc = document.createElement('div');
      if (divShortDesc)
      {
        divShortDesc.innerHTML = aHash["ShortDesc"];
        divShortDesc.style.height = "40px";
        divShortDesc.style.overflow = "hidden";

        divCol2.appendChild(divShortDesc);
      }

      kit_GetTabs ();

      var divOverview = document.createElement('div');
      if (divOverview)
      {
        divOverview.setAttribute("class","kitTabArea");
        divOverview.style.height = iCol2TabAreaH+"px";

        var divOverviewInner = document.createElement('div');
        if (divOverviewInner)
        {
          divOverviewInner.setAttribute("id","kitTabArea1"+subid);
          divOverviewInner.style.margin = "auto 5px";
          divOverviewInner.style.display = "none";

          if (aInit['msgOverviewTabTop'] !== "")
          {
            divMsgTop = document.createElement('div');
            divMsgTop.innerHTML = aInit['msgOverviewTabTop'];
            divOverviewInner.appendChild(divMsgTop);
          }

          var tProductDesc = "Product Description";
          var tPDetails = "";
          if ((aHash["BrandImage"] !== undefined)&&(aHash["BrandImage"] !== ''))
          {
            tPDetails += '<div style="margin:2px; 0 0 4px;"><img src="'+aHash["BrandImage"]+'" style="max-height: 100px;" /></div>';
          }

          if ((aHash["SellPoints"] !== undefined)&&(aHash["SellPoints"] !== ''))
          {
            tPDetails += '<div style="font-weight:bold;"><span style="font-weight:normal;">'+aHash["SellPoints"]+'</span></div>';
          }

          if ((aHash["IndicatorIcons"] !== undefined)&&(aHash["IndicatorIcons"] !== ''))
          {
            tPDetails += '<div style="font-weight:bold;margin-top:5px;">'+aHash["IndicatorIcons"]+'</div>';
          }

          if ((aHash["Warranty"] !== undefined)&&(aHash["Warranty"] !== ''))
          {
            tPDetails += '<div style="font-weight:bold;margin-top:5px;">Warranty: <span style="font-weight:normal;">'+aHash["Warranty"]+'</span></div>';
          }

          if ((aHash["PDETAILS"] !== undefined)&&(aHash["PDETAILS"] !== ''))
          {
            if ((parseInt(tProductDesc.length) + parseInt(aHash["ExDesc"].length)) < 50)
            {
              tPDetails += '<div style="font-weight:bold;margin-top:5px;">'+tProductDesc+': <span style="font-weight:normal;">'+aHash["ExDesc"]+'</span></div>';
            }
            else
            {
              tPDetails += '<div style="font-weight:bold;margin-top:5px;">'+tProductDesc+':</div>';
              tPDetails += '<div style="margin-left:20px;">'+aHash["ExDesc"]+'</div>';
            }

            var aPD = aHash["PDETAILS"].split(":|:");
            for (j=0;j<aPD.length;j++)
            {
              var aPDP = aPD[j].split("^");

              if ((parseInt(aPDP[0].length) + parseInt(aPDP[1].length)) < 50)
              {
                tPDetails += '<div style="font-weight:bold;margin-top:5px;">'+aPDP[0]+': <span style="font-weight:normal;">'+aPDP[1]+'</span></div>';
              }
              else
              {
                if (aPDP[1].substring(0,4).toUpperCase() == "<UL>")
                {
                  tPDetails += '<div style="font-weight:bold;margin-top:5px;">'+aPDP[0]+':';
                  tPDetails += '<span style="font-weight:normal;">'+aPDP[1]+'</span></div>';
                }
                else
                {
                  tPDetails += '<div style="font-weight:bold;margin-top:5px;">'+aPDP[0]+':</div>';
                  tPDetails += '<div style="margin-left:20px;">'+aPDP[1]+'</div>';
                }
              }
            }
          }

          if ((aInit['WeightYN'] == 'Y')&&(aHash["Weight"] > 0))
          {
            aHash["ExDesc"] += '<br>' + idpWeight + ' = '+(parseFloat(aHash["Weight"]).toString());
          }

          var divExDesc = document.createElement('div');
          if (divExDesc)
          {
            if (tPDetails === "")
            {
              divExDesc.innerHTML = aHash["ExDesc"];
            }
            else
            {
              divExDesc.innerHTML = tPDetails;
            }

            divOverviewInner.appendChild(divExDesc);
          }

          divOverview.appendChild(divOverviewInner);
        }

        var divPropertyInner = document.createElement('div');
        if (divPropertyInner)
        {
          divPropertyInner.setAttribute("id","kitTabArea2"+subid);
          divPropertyInner.style.margin = "auto 5px";
          divPropertyInner.style.paddingBottom = "20px";
          divPropertyInner.style.display = "none";
          divPropertyInner.style.position = "relative";

          if (aInit['msgPropertyTabTop'] !== "")
          {
            divMsgTop = document.createElement('div');
            divMsgTop.innerHTML = aInit['msgPropertyTabTop'];
            divPropertyInner.appendChild(divMsgTop);
          }

          if (aHash["ItemMsgP"] !== "")
          {
            var divMsgP = document.createElement('div');
            divMsgP.innerHTML = aHash["ItemMsgP"];
            divPropertyInner.appendChild(divMsgP);
          }

          aDetailHash = aHash;

          if (aHash["TID"] > 0)
          {
            aQDHash = aHash;
            aQDHash["DIST"] = kit_Dist;
            aQDHash["UserID"] = kit_UserID;
            aQDHash["WsID"] = kit_WsID;
            aQDHash["CustID"] = kit_CustID;
            aQDHash["QD_Domain"] = 'https://'+aHash["QNET_DOMAIN"];

            QD_AdjustPopup(2);
            QD_CreateForm(divPropertyInner,aQDHash);
          }

          for (iA=iAStart;iA<aAttrib.length;iA++)
          {
            var aAtt = aHash["ATTRIB"+aAttrib[iA]].split("~");

            var divAtt = document.createElement('div');
            divAtt.setAttribute("class","kitPropertyP");
            divAtt.setAttribute('id','divAtt-'+aAttrib[iA]+subid);
            divAtt.style.margin = "5px 1px 1px 5px";

            divAtt.innerHTML = "*"+aAtt[0];

            // var textAtt = document.createTextNode("*"+aAtt[0]);
            // divAtt.appendChild(textAtt);

            divPropertyInner.appendChild(divAtt);

            var selAtt = document.createElement('select');
            selAtt.setAttribute("class","kitPropertyF");
            if (selAtt)
            {
              selAtt.setAttribute('id','ATTRIB-'+aAttrib[iA]+subid);

              var tDef = getKitSubData('Attrib',aAttrib[iA]);
              var optNONE = document.createElement('option');
              if (optNONE)
              {
                optNONE.innerHTML = aHash['AttribNoneDesc'];
                optNONE.value = 'NONE';

                // optNONE.setAttribute("selected","selected");

                selAtt.appendChild(optNONE);
              }

              for (iAP=1;iAP<aAtt.length;iAP++)
              {
                var aOpt = aAtt[iAP].split("^"); // [0]=ID, [1]=Label, [2]=Per Unit, [3]=Per Unit retail, [4]=flat, [5]=flat retail, [6]=enforceMin, [7]=svcprice, [8]=svctaxYN

                if (parseInt(kit_RetailStore))
                {
                  if (((parseFloat(aOpt[3]) > 0)||(parseFloat(aOpt[5]) > 0)||(parseFloat(aOpt[7]) > 0))&&(aHash["HasPricing"] == 1))
                  {
                    aOpt[1] += ' + ';
                  }

                  if (((parseFloat(aOpt[5]) > 0)||(parseFloat(aOpt[7]) > 0))&&(aHash["HasPricing"] == 1)) // Flat
                  {
                    optprice = 0;
                    if (parseFloat(aOpt[5]) > 0)
                    {
                      optprice += parseFloat(aOpt[5]);
                    }
                    if (parseFloat(aOpt[7]) > 0)
                    {
                      optprice += parseFloat(aOpt[7]);
                    }

                    aOpt[1] += CurSym+(optprice.toFixed(kit_PriceDec)) + ' ';
                  }

                  if (((parseFloat(aOpt[3]) > 0)&&(parseFloat(aOpt[5]) > 0))&&(aHash["HasPricing"] == 1))
                  {
                    aOpt[1] += ' + ';
                  }

                  if ((parseFloat(aOpt[3]) > 0)&&(aHash["HasPricing"] == 1)) // Per Unit
                  {
                    optprice = parseFloat(aOpt[3]);
                    aOpt[1] += CurSym+(optprice.toFixed(kit_PriceDec)) + '/' + idpAttrUnit;
                  }
                }
                else
                {
                  if (((parseFloat(aOpt[2]) > 0)||(parseFloat(aOpt[4]) > 0))&&(aHash["HasPricing"] == 1))
                  {
                    aOpt[1] += ' + ';
                  }

                  if (((parseFloat(aOpt[4]) > 0)||(parseFloat(aOpt[7]) > 0))&&(aHash["HasPricing"] == 1)) // Flat
                  {
                    optprice = 0;
                    if (parseFloat(aOpt[4]) > 0)
                    {
                      optprice += parseFloat(aOpt[4]);
                    }
                    if (parseFloat(aOpt[7]) > 0)
                    {
                      optprice += parseFloat(aOpt[7]);
                    }

                    aOpt[1] += CurSym+(optprice.toFixed(kit_PriceDec)) + ' ';
                  }

                  if (((parseFloat(aOpt[2]) > 0)&&(parseFloat(aOpt[4]) > 0))&&(aHash["HasPricing"] == 1))
                  {
                    aOpt[1] += ' + ';
                  }

                  if ((parseFloat(aOpt[2]) > 0)&&(aHash["HasPricing"] == 1)) // Per Unit
                  {
                    optprice = parseFloat(aOpt[2]);
                    aOpt[1] += CurSym+(optprice.toFixed(kit_PriceDec)) + '/' + idpAttrUnit;
                  }
                }

                // if ((aOpt[6] == 'Y')&&(aHash["MinQty"] > 0))
                // {
                //   aOpt[1] += ' Minimum '+aHash["MinQty"];
                // }

                var optAtt = document.createElement('option');
                if (optAtt)
                {
                  optAtt.innerHTML = aOpt[1];
                  optAtt.value = aOpt[0];

                  if (parseInt(kit_isSub))
                  {
                    if (aOpt[0]==tDef)
                    {
                      optAtt.setAttribute("selected","selected");
                    }
                  }
                  else if (parseInt(kit_isEdit))
                  {
                    var attid = parseInt(aAttrib[iA]);
                    var aAttEdit = aHashEdit["ATTRIB"+attid].split("^");
                    //alert ('aHashEdit["ATTRIB'+attid+']='+aHashEdit["ATTRIB"+attid]+' aOpt[0]='+aOpt[0]+' aAttEdit[0]='+aAttEdit[0]);
                    if (aOpt[0]==aAttEdit[0])
                    {
                      optAtt.setAttribute("selected","selected");
                    }
                  }

                  selAtt.appendChild(optAtt);
                }
              }

              divPropertyInner.appendChild(selAtt);
            }

            if (kit_isSub)
            {
              // aDetailInput_SUB[aDetailInput_SUB.length] = 'ATTRIB-'+aAttrib[iA]+'^N';
              aDetailInput_SUB[aDetailInput_SUB.length] = 'ATTRIB-'+aAttrib[iA]+'^Y';
            }
            else
            {
              // aDetailInput[aDetailInput.length] = 'ATTRIB-'+aAttrib[iA]+'^N';
              aDetailInput[aDetailInput.length] = 'ATTRIB-'+aAttrib[iA]+'^Y';
            }
          }

          for (iA=0;iA<aImprint.length;iA++)
          {
//              alert("Imprint Properties="+aHash["IMPRINT"+aImprint[iA]]);

            var aImp = aHash["IMPRINT"+aImprint[iA]].split("^");

            var divImp = document.createElement('div');
            divImp.setAttribute("class","kitPropertyP");
            divImp.setAttribute('id','divImp-'+aImprint[iA]);
            divImp.style.margin = "5px 1px 1px 5px";

            var textImp;
            if (aImp[2] == 'Y') // Required
            {
              divImp.innerHTML = "*"+aImp[0];
            }
            else
            {
              divImp.innerHTML = aImp[0];
            }

            divPropertyInner.appendChild(divImp);

            var inImp = document.createElement('input');
            inImp.setAttribute('id','IMPRINT-'+aImprint[iA]+subid);
            inImp.setAttribute('type','text');
            inImp.setAttribute('size',aImp[1]);
            inImp.setAttribute('maxlength',aImp[1]);
            inImp.setAttribute('value',"");
            inImp.setAttribute("class","kitPropertyF");

            if (parseInt(kit_isEdit))
            {
              var impid = parseInt(aImprint[iA]);
              inImp.value = aHashEdit["IMPRINT"+impid];
              //alert ('aHashEdit["IMPRINT'+impid+']='+aHashEdit["IMPRINT"+impid]);
            }

            divPropertyInner.appendChild(inImp);

            if (kit_isSub)
            {
              if (aImp[2] == 'Y') // Required
                { aDetailInput_SUB[aDetailInput_SUB.length] = 'IMPRINT-'+aImprint[iA]+subid+'^Y'; }
              else
                { aDetailInput_SUB[aDetailInput_SUB.length] = 'IMPRINT-'+aImprint[iA]+subid+'^N'; }
            }
            else
            {
              if (aImp[2] == 'Y') // Required
                { aDetailInput[aDetailInput.length] = 'IMPRINT-'+aImprint[iA]+'^Y'; }
              else
                { aDetailInput[aDetailInput.length] = 'IMPRINT-'+aImprint[iA]+'^N'; }
            }
          }

          for (iA=0;iA<aUDef.length;iA++)
          {
            //alert("User Defined Properties="+aHash["UDEF"+aUDef[iA]]);

            var tDefUDEF = getKitSubData('UDEF',aUDef[iA]);
            var aDefUDEF = tDefUDEF.split("^^");

            var aUD = aHash["UDEF"+aUDef[iA]].split("^");

            var divUdef = document.createElement('div');
            divUdef.setAttribute('id','divUdef-'+aUDef[iA]+subid);
            divUdef.setAttribute("class","kitPropertyP");
            divUdef.style.margin = "5px 1px 1px 5px";

            var textUdef;
            if (aUD[2] == 'Y') // Required
            {
              divUdef.innerHTML = "*"+aUD[0];
            }
            else
            {
              divUdef.innerHTML = aUD[0];
            }

            divPropertyInner.appendChild(divUdef);

            var inUdef;
            if (typeof aHash["UDCOMBO"+aUDef[iA]] != 'undefined')
            {
              inUdef = document.createElement('select');

              var aUDC = aHash["UDCOMBO"+aUDef[iA]].split("^");
              for (i=0;i < aUDC.length;i++)
              {
                var isSelected = false;

                if (aUDEF[aUDef[iA]] == aUDC[i])
                {
                  isSelected = true;
                }
                else if (aDefUDEF[1] == aUDC[i])
                {
                  isSelected = true;
                }

                inUdef.options[inUdef.options.length] = new Option(aUDC[i], aUDC[i], false, isSelected);
              }
            }
            else
            {
              inUdef = document.createElement('input');
              inUdef.setAttribute('type','text');
              inUdef.setAttribute('size',aUD[1]);
              inUdef.setAttribute('maxlength',aUD[1]);
              inUdef.setAttribute('value',"");
              inUdef.value = ( (aUDEF[aUDef[iA]]) ? aUDEF[aUDef[iA]] : '' );
            }

            inUdef.setAttribute('id','UDEF-'+aUDef[iA]+subid);
            inUdef.setAttribute("class","kitPropertyF");

            divPropertyInner.appendChild(inUdef);

            if (kit_isSub)
            {
              if (aUD[2] == 'Y') // Required
                { aDetailInput_SUB[aDetailInput_SUB.length] = 'UDEF-'+aUDef[iA]+subid+'^Y'; }
              else
                { aDetailInput_SUB[aDetailInput_SUB.length] = 'UDEF-'+aUDef[iA]+subid+'^N'; }
            }
            else
            {
              if (aUD[2] == 'Y') // Required
                { aDetailInput[aDetailInput.length] = 'UDEF-'+aUDef[iA]+'^Y'; }
              else
                { aDetailInput[aDetailInput.length] = 'UDEF-'+aUDef[iA]+'^N'; }
            }
          }

          // Attachment
          if ((aHash["Attachment"] == 'R')||(aHash["Attachment"] == 'O'))
          {
            //alert ("Need Attachment ("+aHash["Attachment"]+")");

            var divAttachment = document.createElement('div');
            divAttachment.setAttribute('id','divAttachment'+subid);
            divAttachment.style.margin = "5px 1px 1px 5px";
            divAttachment.setAttribute("class","kitPropertyP");

            if (aHash["Attachment"] == 'R')
            {
              divAttachment.innerHTML = '*' + idpAttach;
              if (kit_isSub)
                { aDetailInput_SUB[aDetailInput_SUB.length] = 'AttachmentFile'+subid+'^Y'; }
              else
                { aDetailInput[aDetailInput.length] = 'AttachmentFile'+'^Y'; }
            }
            else
            {
              divAttachment.innerHTML = idpAttach;
              if (kit_isSub)
                { aDetailInput_SUB[aDetailInput_SUB.length] = 'AttachmentFile'+subid+'^N'; }
              else
                { aDetailInput[aDetailInput.length] = 'AttachmentFile'+'^N'; }
            }

            var spanLoader = document.createElement('span');
            spanLoader.setAttribute('id','spanAttachmentLoader');
            spanLoader.style.margin = "0 5px 0 64px";
            spanLoader.style.color = "#00cc00";
            spanLoader.style.visibility = "hidden";
            var textLoader = document.createTextNode('Uploading');
            spanLoader.appendChild(textLoader);

            var imgLoader = document.createElement('img');
            imgLoader.setAttribute('id','imgAttachmentLoader');
            imgLoader.setAttribute('src',"./qn_images/qdesign-loader.gif");
            imgLoader.setAttribute('height',"10");
            imgLoader.setAttribute('width',"10");
            imgLoader.style.margin = "0 0 0 0";
            imgLoader.style.visibility = "hidden";

            var inAttach = document.createElement('input');
            inAttach.setAttribute('id','AttachmentFile');
            inAttach.setAttribute('name','AttachmentFile');
            inAttach.setAttribute('type','hidden');
            inAttach.setAttribute('value','');

            divAttachment.appendChild(spanLoader);
            divAttachment.appendChild(imgLoader);

            if ((parseInt(kit_isEdit))&&(typeof aHashEdit["FILE0"] != 'undefined'))
            {
              inAttach.setAttribute('value',aHashEdit["FILE0"]);

              var spanFileEdit = document.createElement('span');
              spanFileEdit.setAttribute('id','spanAttachmentFileEdit');
              spanFileEdit.innerHTML = aHashEdit["FILE0"];
              divAttachment.appendChild(spanFileEdit);
            }

            divAttachment.appendChild(inAttach);

            divPropertyInner.appendChild(divAttachment);
            var ts = new Date();
            var iframeAttachment = document.createElement('iframe');
            iframeAttachment.setAttribute('id','iframeAttachment');
            iframeAttachment.setAttribute('name','iframeAttachment');
            iframeAttachment.setAttribute('src','qn-upload-file.pl?getDIST='+kit_Dist+'&UserID='+kit_UserID+'&WsID='+kit_WsID+'&ts='+ts.getTime());
            iframeAttachment.setAttribute('frameBorder','0');
            iframeAttachment.setAttribute('scrolling','NO');
            iframeAttachment.style.width = "100%";
            iframeAttachment.style.height = "50px";
            iframeAttachment.style.border = "0px solid #fff";

            divPropertyInner.appendChild(iframeAttachment);
          }

          for (iA=0;iA<aSPECB.length;iA++)
          {
            var aSB = aHash["SPECB"+aSPECB[iA]].split("^");

            //alert("aSPECB["+aSPECB[iA]+"]="+aHash["SPECB"+aSPECB[iA]]);

            var divSB = document.createElement('div');
            divSB.setAttribute('id','divSPECB-'+aSPECB[iA]);
            divSB.setAttribute("class","kitPropertyP");
            divSB.style.margin = "5px 1px 1px 5px";
            divSB.innerHTML = aSB[0];
            divPropertyInner.appendChild(divSB);

            var aFields = aSB[1].split(" ");

            for (iFD=0;iFD<aFields.length;iFD++)
            {
              var aFP = aHash["SPECF"+aSPECB[iA]+"~"+aFields[iFD]].split("^");

              // Field Prompt
              if (aFP[0] != 'B') // Boolean
              {
                divfp = document.createElement('div');
                divfp.setAttribute('id','divSPECFP-'+aFields[iFD]+subid);
                divfp.setAttribute("class","kitPropertyP");
                divfp.style.margin = "5px 1px 1px 15px";

                if (aFP[1] == 'Y')
                {
                  divfp.innerHTML = "*"+aFP[3];
                }
                else
                {
                  divfp.innerHTML = aFP[3];
                }

                divPropertyInner.appendChild(divfp);
              }

              if (aFP[0] == 'B') // Boolean
              {
                divfp = document.createElement('div');
                divfp.setAttribute("class","kitPropertyP");

                // B^N^N^Long Neck Bottles^1^Y

                infp = document.createElement('input');
                infp.setAttribute('id','inSPECF-'+aFields[iFD]+subid);
                infp.setAttribute('type','checkbox');
                infp.setAttribute("class","kitPropertyP");
                infp.style.margin = "0px 0px 0px 15px";
                divfp.appendChild(infp);

                var spanfp = document.createElement('span');
                spanfp.style.margin = "0px 0px 0px 5px";

                if (aFP[1] == 'Y')
                {
                  spanfp.innerHTML = "*"+aFP[3];
                }
                else
                {
                  spanfp.innerHTML = aFP[3];
                }

                if (parseInt(kit_isEdit))
                {
                  if (aHashEdit["SPECF"+aSPECB[iA]+"~"+aFields[iFD]] == 'Y')
                  {
                    infp.checked = true;
                  }
                }
                else
                {
                  if (aFP[5] == 'Y')
                  {
                    infp.checked = true;
                  }
                }

                divfp.appendChild(spanfp);
                divPropertyInner.appendChild(divfp);
              }
              else if (aFP[0] == 'C') // Combo
              {
                aDP = aFP[5].split("::");
                aDPL = aDP[1].split(",,");

                var selfp = document.createElement('select');
                selfp.setAttribute('id','inSPECF-'+aFields[iFD]+subid);
                selfp.setAttribute("class","kitPropertyF");
                selfp.style.margin = "0px 0px 0px 15px";

                for (iDP=0;iDP<aDPL.length;iDP++)
                {
                  var optfp = document.createElement('option');
                  optfp.setAttribute('value',aDPL[iDP]);
                  optfp.innerHTML = aDPL[iDP];

                  if (parseInt(kit_isEdit))
                  {
                    if (aDPL[iDP] == aHashEdit["SPECF"+aSPECB[iA]+"~"+aFields[iFD]])
                    {
                      optfp.setAttribute('selected','selected');
                    }
                  }

                  selfp.appendChild(optfp);
                }

                divPropertyInner.appendChild(selfp);
              }
              else if (aFP[0] == 'E') // Editable Combo
              {
                inw = 10 * aFP[4];
                if (inw < 50)
                  { inw = 50; }
                else if (inw > 290)
                  { inw = 290; }

                if (aFP[5] !== "")
                {
                  aDP = aFP[5].split("::");
                  aDPL = aDP[1].split(",,");

                  infp = document.createElement('input');
                  infp.setAttribute('id','inSPECF-'+aFields[iFD]+subid);
                  infp.setAttribute("class","kitPropertyF");
                  infp.style.margin = "0 0 0 15px";
                  infp.style.width = inw+"px";

                  var onfoc = "openSpecChoices('inSPECF-"+aFields[iFD]+subid+"')";
                  infp.onfocus = new Function (onfoc);

                  var onfoco = "closeSpecChoices('inSPECF-"+aFields[iFD]+subid+"')";
                  infp.onblur = new Function (onfoco);

                  var imgsel = document.createElement('img');
                  imgsel.setAttribute('src','./qn_images/arrowdown.gif');
                  imgsel.style.borderTop = "1px #999999 solid";
                  imgsel.style.borderRight = "1px #cccccc solid";
                  imgsel.style.borderBottom = "1px #cccccc solid";
                  imgsel.style.paddingTop = "2px";
                  imgsel.style.paddingBottom = "2px";
                  imgsel.style.paddingLeft = "1px";
                  imgsel.style.paddingRight = "1px";
                  imgsel.style.position = "relative";
                  imgsel.style.height = "15px";
                  // imgsel.style.top = "4px";
                  imgsel.style.backgroundColor = "#ffffff";
                  var onc = "openSpecButton('inSPECF-"+aFields[iFD]+subid+"')";
                  imgsel.onclick = new Function (onc);

                  var divsel = document.createElement('div');
                  divsel.setAttribute('id','inSPECF-'+aFields[iFD]+subid+'-div');
                  // divsel.style.position = "absolute";
                  divsel.style.display = "none";
                  divsel.style.height = "50px";
                  divsel.style.overflow = "auto";
                  divsel.style.backgroundColor = "#ffffff";
                  divsel.style.width = inw+"px";
                  divsel.style.borderTop = "1px #999999 solid";
                  divsel.style.borderRight = "1px #cccccc solid";
                  divsel.style.borderBottom = "1px #cccccc solid";
                  divsel.style.borderLeft = "1px #cccccc solid";
                  divsel.style.margin = "0 0 0 15px";

                  for (iDP=0;iDP<aDPL.length;iDP++)
                  {
                    var divopt = document.createElement('div');
                    divopt.setAttribute('id','inSPECF-'+aFields[iFD]+subid+'-opt'+iDP);
                    divopt.style.cursor = "pointer";
                    divopt.innerHTML = aDPL[iDP];

                    var onmo = "this.style.backgroundColor='#3399ff';this.style.color='#ffffff';";
                    divopt.onmouseover = new Function (onmo);
                    onmo = "this.style.backgroundColor='#ffffff';this.style.color='#000000';";
                    divopt.onmouseout = new Function (onmo);
                    onmo = "selectSpecChoices('inSPECF-"+aFields[iFD]+subid+"','"+iDP+"')";
                    divopt.onclick = new Function (onmo);

                    divsel.appendChild(divopt);
                  }

                  if (parseInt(kit_isEdit))
                  {
                    infp.value = aHashEdit["SPECF"+aSPECB[iA]+"~"+aFields[iFD]];
                  }

                  var divOuter = document.createElement('div');
                  divOuter.appendChild(infp);
                  divOuter.appendChild(imgsel);
                  divOuter.appendChild(divsel);
                  divPropertyInner.appendChild(divOuter);

                  // divPropertyInner.appendChild(infp);
                  // divPropertyInner.appendChild(imgsel);
                  // divPropertyInner.appendChild(divsel);
                }
              }
              else if (aFP[0] == 'S') // String
              {
                inw = 10 * aFP[4];
                if (inw < 50)
                  { inw = 50; }
                else if (inw > 300)
                  { inw = 300; }

                infp = document.createElement('input');
                infp.setAttribute('id','inSPECF-'+aFields[iFD]+subid);
                infp.setAttribute('type','text');
                infp.setAttribute('maxlength',aFP[4]);
                infp.setAttribute("class","kitPropertyF");
                infp.style.margin = "0px 0px 0px 15px";
                infp.style.width = inw+"px";
                divPropertyInner.appendChild(infp);

                if (parseInt(kit_isEdit))
                {
                  infp.value = aHashEdit["SPECF"+aSPECB[iA]+"~"+aFields[iFD]];
                }
              }
              else if (aFP[0] == 'T') // Textbox
              {
                infp = document.createElement('textarea');
                infp.setAttribute('id','inSPECF-'+aFields[iFD]+subid);
                infp.maxLength = aFP[4];
                infp.style.height = "50px";
                infp.style.margin = "0px 0px 0px 15px";
                infp.style.width = "300px";
                divPropertyInner.appendChild(infp);

                if (parseInt(kit_isEdit))
                {
                  infp.innerHTML = aHashEdit["SPECF"+aSPECB[iA]+"~"+aFields[iFD]];
                }
              }

                    // Required Field YN

              if (kit_isSub)
                { aDetailInput_SUB[aDetailInput_SUB.length] = 'inSPECF-'+aFields[iFD]+subid+'^'+aFP[1]; }
              else
                { aDetailInput[aDetailInput.length] = 'inSPECF-'+aFields[iFD]+'^'+aFP[1]; }
            }
          }

          kit_LoadDataMatrix(divPropertyInner,iAStart,aHash,aAttrib);

          divOverview.appendChild(divPropertyInner);
        }

        if (has_ItemStats == 1)
        {
          var divMoreInfoInner = document.createElement('div');
          if (divMoreInfoInner)
          {
            divMoreInfoInner.setAttribute("id","kitTabArea3"+subid);
            divMoreInfoInner.style.margin = "auto 5px";
            divMoreInfoInner.style.display = "none";

            if (aInit['msgMoreInfoTabTop'] !== "")
            {
              divMsgTop = document.createElement('div');
              divMsgTop.innerHTML = aInit['msgMoreInfoTabTop'];
              divMoreInfoInner.appendChild(divMsgTop);
            }

            var ohClient = kit_Client + '';
            if (ohClient.length < 1)
            {
              ohClient = kit_UserClient;
            }

            var buttonOH = document.createElement('button');
            buttonOH.setAttribute('id','buttonOrderHistory');
            buttonOH.style.margin = "5px";
            buttonOH.style.fontFamily = "arial";
            buttonOH.style.fontSize = "13px";

            fONC = 'ohLoadOrderHistory("'+kit_Dist+'","'+ohClient+'","'+kit_UserCC+'","'+kit_UserID+'","'+aHash["CCat"]+'","","'+quotItem+'","","0","'+aHash["ItemType"]+'")';
            buttonOH.onclick = new Function (fONC);

            var textButtonOH = document.createTextNode("View Order History");
            buttonOH.appendChild(textButtonOH);
            divMoreInfoInner.appendChild(buttonOH);

            if (kit_ViewInventory == "1")
            {
              if (aHash["QtyOnHand"] === "")
              {
                aHash["QtyOnHand"] = 0;
              }

              if ((aHash["QtyOnHand"] !== "") && (aHash["ItemType"] == "2"))
              {
                strLen = aHash["QtyOnHand"].length;
                boxW = strLen * 12;
                if (boxW > 280)
                  { boxW = 280; }
                else if (boxW < 30)
                  { boxW = 30; }

                divStat = document.createElement('div');
                divStat.setAttribute('class','kitPropertyP');
                divStat.style.margin = "5px 1px 1px 5px";
                divStat.innerHTML = kit_InvQtyPrompt;

                divStatData = document.createElement('div');
                divStatData.setAttribute('class','kitMoreInfoF');
                divStatData.style.width = boxW+"px";

                spanStatData = document.createElement('span');
                divStatData.style.padding = "2px";
                spanStatData.innerHTML = aHash["QtyOnHand"];
                divStatData.appendChild(spanStatData);

                divMoreInfoInner.appendChild(divStat);
                divMoreInfoInner.appendChild(divStatData);
              }
            }

            if (aHash["BackOrder"] !== "")
            {
              strLen = aHash["BackOrder"].length;
              boxW = strLen * 12;
              if (boxW > 280)
                { boxW = 280; }
              else if (boxW < 30)
                { boxW = 30; }

              divStat = document.createElement('div');
              divStat.setAttribute('class','kitPropertyP');
              divStat.style.margin = "5px 1px 1px 5px";
              textStat = document.createTextNode('Back Order Quantity');
              divStat.appendChild(textStat);

              divStatData = document.createElement('div');
              divStatData.setAttribute('class','kitMoreInfoF');
              divStatData.style.width = boxW+"px";

              spanStatData = document.createElement('span');
              divStatData.style.padding = "2px";
              spanStatData.innerHTML = aHash["BackOrder"];
              divStatData.appendChild(spanStatData);

              divMoreInfoInner.appendChild(divStat);
              divMoreInfoInner.appendChild(divStatData);
            }

            if ((aHash["ItemUsage"] !== "")&&(aHash["ItemUsage"] > 0))
            {
              strLen = aHash["ItemUsage"].length;
              boxW = strLen * 12;
              if (boxW > 280)
                { boxW = 280; }
              else if (boxW < 30)
                { boxW = 30; }

              divStat = document.createElement('div');
              divStat.setAttribute('class','kitPropertyP');
              divStat.style.margin = "5px 1px 1px 5px";
              textStat = document.createTextNode('Average Monthly Usage [Item]');
              divStat.appendChild(textStat);

              divStatData = document.createElement('div');
              divStatData.setAttribute('class','kitMoreInfoF');
              divStatData.style.width = boxW+"px";

              spanStatData = document.createElement('span');
              divStatData.style.padding = "2px";
              spanStatData.innerHTML = aHash["ItemUsage"];
              divStatData.appendChild(spanStatData);

              divMoreInfoInner.appendChild(divStat);
              divMoreInfoInner.appendChild(divStatData);
            }

            if ((aHash["CcUsage"] !== "")&&(aHash["CcUsage"] > 0))
            {
              strLen = aHash["CcUsage"].length;
              boxW = strLen * 12;
              if (boxW > 280)
                { boxW = 280; }
              else if (boxW < 30)
                { boxW = 30; }

              divStat = document.createElement('div');
              divStat.setAttribute('class','kitPropertyP');
              divStat.style.margin = "5px 1px 1px 5px";
              textStat = document.createTextNode('Average Monthly Usage [CC]');
              divStat.appendChild(textStat);

              divStatData = document.createElement('div');
              divStatData.setAttribute('class','kitMoreInfoF');
              divStatData.style.width = boxW+"px";
              divStatData.style.padding = "2px";

              spanStatData = document.createElement('span');
              spanStatData.innerHTML = aHash["CcUsage"];
              divStatData.appendChild(spanStatData);

              divMoreInfoInner.appendChild(divStat);
              divMoreInfoInner.appendChild(divStatData);
            }

            if (aHash["PrevPO"] !== "")
            {
              strLen = aHash["PrevPO"].length;
              boxW = strLen * 12;
              if (boxW > 280)
                { boxW = 280; }
              else if (boxW < 30)
                { boxW = 30; }

              divStat = document.createElement('div');
              divStat.setAttribute('class','kitPropertyP');
              divStat.style.margin = "5px 1px 1px 5px";
              var textPreviousPo = document.createTextNode('Previous PO');
              divStat.appendChild(textPreviousPo);

              divStatData = document.createElement('div');
              divStatData.setAttribute('class','kitMoreInfoF');
              divStatData.style.width = boxW+"px";

              spanStatData = document.createElement('span');
              spanStatData.innerHTML = aHash["PrevPO"];
              divStatData.appendChild(spanStatData);

              divMoreInfoInner.appendChild(divStat);
              divMoreInfoInner.appendChild(divStatData);
            }

            if (aHash["LastOrder"] !== "")
            {
              strLen = aHash["LastOrder"].length;
              boxW = strLen * 12;
              if (boxW > 280)
                { boxW = 280; }
              else if (boxW < 30)
                { boxW = 30; }

              divStat = document.createElement('div');
              divStat.setAttribute('class','kitPropertyP');
              divStat.style.margin = "5px 1px 1px 5px";
              textStat = document.createTextNode('Previous PO Date');
              divStat.appendChild(textStat);

              divStatData = document.createElement('div');
              divStatData.setAttribute('class','kitMoreInfoF');
              divStatData.style.width = boxW+"px";

              spanStatData = document.createElement('span');
              divStatData.style.padding = "2px";
              spanStatData.innerHTML = aHash["LastOrder"];
              divStatData.appendChild(spanStatData);

              divMoreInfoInner.appendChild(divStat);
              divMoreInfoInner.appendChild(divStatData);
            }

            if (aHash["QtyLastOrder"] !== "")
            {
              strLen = aHash["QtyLastOrder"].length;
              boxW = strLen * 11;
              if (boxW > 280)
                { boxW = 280; }
              else if (boxW < 30)
                { boxW = 30; }

              divStat = document.createElement('div');
              divStat.setAttribute('class','kitPropertyP');
              divStat.style.margin = "5px 1px 1px 5px";
              divStat.innerHTML = 'Previous PO Quantity';

              divStatData = document.createElement('div');
              divStatData.setAttribute('class','kitMoreInfoF');
              divStatData.style.width = boxW+"px";

              spanStatData = document.createElement('span');
              divStatData.style.padding = "2px";
              spanStatData.innerHTML = aHash["QtyLastOrder"];
              divStatData.appendChild(spanStatData);

              divMoreInfoInner.appendChild(divStat);
              divMoreInfoInner.appendChild(divStatData);
            }

            if ((aHash["MinQty"] !== "")&&(aHash["MinQty"] > 0))
            {
              strLen = aHash["MinQty"].length;
              boxW = strLen * 11;
              if (boxW > 280)
                { boxW = 280; }
              else if (boxW < 30)
                { boxW = 30; }

              divStat = document.createElement('div');
              divStat.setAttribute('class','kitPropertyP');
              divStat.style.margin = "5px 1px 1px 5px";
              divStat.innerHTML = mxMinQtyLbl;

              divStatData = document.createElement('div');
              divStatData.setAttribute('class','kitMoreInfoF');
              divStatData.style.width = boxW+"px";

              spanStatData = document.createElement('span');
              divStatData.style.padding = "2px";
              spanStatData.innerHTML = aHash["MinQty"];
              divStatData.appendChild(spanStatData);

              divMoreInfoInner.appendChild(divStat);
              divMoreInfoInner.appendChild(divStatData);
            }

            if ((aHash["MaxQty"] !== "")&&(aHash["MaxQty"] > 0))
            {
              strLen = aHash["MaxQty"].length;
              boxW = strLen * 11;
              if (boxW > 280)
                { boxW = 280; }
              else if (boxW < 30)
                { boxW = 30; }

              divStat = document.createElement('div');
              divStat.setAttribute('class','kitPropertyP');
              divStat.style.margin = "5px 1px 1px 5px";
              divStat.innerHTML = 'Maximum Quantity';

              divStatData = document.createElement('div');
              divStatData.setAttribute('class','kitMoreInfoF');
              divStatData.style.width = boxW+"px";

              spanStatData = document.createElement('span');
              divStatData.style.padding = "2px";
              spanStatData.innerHTML = aHash["MaxQty"];
              divStatData.appendChild(spanStatData);

              divMoreInfoInner.appendChild(divStat);
              divMoreInfoInner.appendChild(divStatData);
            }

            divOverview.appendChild(divMoreInfoInner);
          }
        }

        if ((iKit > 0) && (!kit_isSub))
        {
          var divKitInner = document.createElement('div');
          if (divKitInner)
          {
            divKitInner.setAttribute("id","kitTabArea4"+subid);
            //divKitInner.style.margin = "auto 5px";
            divKitInner.style.display = "none";

            var divKitHead = document.createElement('div');
            if (divKitHead)
            {
              divKitHead.style.fontWeight = "bold";
              divKitHead.style.backgroundColor = "#333333";
              divKitHead.style.color = "#ffffff";
              divKitHead.style.paddingTop = "2px";
              divKitHead.style.paddingBottom = "2px";

              var divC0 = document.createElement('div');
              if (divC0)
              {
                divC0.style.width = "25px";
                divC0.style.cssFloat = "left";
                divC0.style.styleFloat = "left";
                divC0.style.textAlign = "center";
                divC0.innerHTML = "&nbsp;";
                divKitHead.appendChild(divC0);
              }

              var divC1 = document.createElement('div');
              if (divC1)
              {
                divC1.style.width = "55px";
                divC1.style.cssFloat = "left";
                divC1.style.styleFloat = "left";
                divC1.style.textAlign = "center";
                divC1.innerHTML = aInit["kitColHead1"];
                divKitHead.appendChild(divC1);
              }

              var divC2 = document.createElement('div');
              if (divC2)
              {
                divC2.style.width = "100px";
                divC2.style.cssFloat = "left";
                divC2.style.styleFloat = "left";
                divC2.style.marginLeft = "5px";
                divC2.innerHTML = aInit["kitColHead2"];
                divKitHead.appendChild(divC2);
              }

              var divC3 = document.createElement('div');
              if (divC3)
              {
                divC3.style.width = "100px";
                divC3.style.cssFloat = "left";
                divC3.style.styleFloat = "left";
                divC3.style.marginLeft = "5px";
                divC3.innerHTML = aInit["kitColHead3"];
                divKitHead.appendChild(divC3);
              }

              var divC4 = document.createElement('div');
              if (divC4)
              {
                divC4.style.width = "225px";
                divC4.style.cssFloat = "left";
                divC4.style.styleFloat = "left";
                divC4.style.marginLeft = "5px";
                divC4.innerHTML = aInit["kitColHead4"];
                divKitHead.appendChild(divC4);
              }

              divClear = document.createElement('div');
              if (divClear)
              {
                divClear.style.clear = "both";
                divKitHead.appendChild(divClear);
              }

              divKitInner.appendChild(divKitHead);
            }

            for (iA=0;iA<iKit;iA++)
            {
              var aKitParts = aHash["KIT"+iA].split("^");
              var tRequired = "";

              if ((aHash["KitType"] == 'S')&&(aKitParts[4] < 1)) // Static Kit with Qty=0
              {
              }
              else
              {
                var divKitLine = document.createElement('div');
                divKitLine.setAttribute("id","kitLine"+iA+subid);
                divKitLine.setAttribute("class","kitLine");

                fOMI = "kit_mouseIn('"+iA+subid+"','"+aKitParts[0]+"','"+aKitParts[1]+"','"+aKitParts[2]+"','"+aKitParts[8]+"','"+aKitParts[3]+"')";
                divKitLine.onmouseover = new Function (fOMI);

                fOMO = "kit_mouseOut('"+iA+subid+"')";
                divKitLine.onmouseout = new Function (fOMO);

                if (divKitLine)
                {
                  var divKitStatus1 = document.createElement('div');
                  if (divKitStatus1)
                  {
                    divKitStatus1.setAttribute("id","kitStatus"+iA+subid);
                    divKitStatus1.style.width = "25px";
                    divKitStatus1.style.textAlign = "center";
                    divKitStatus1.style.cssFloat = "left";
                    divKitStatus1.style.styleFloat = "left";
                    divKitStatus1.style.cursor = "pointer";

                    fONC = "kit_LoadPopupSub('"+aKitParts[0]+"','"+aKitParts[1]+"','"+aKitParts[2]+"','"+aKitParts[8]+"','"+aKitParts[3]+"','"+iA+"')";
                    divKitStatus1.onclick = new Function (fONC);

                    divKitStatus2 = document.createElement('div');
                    if (divKitStatus2)
                    {
                      divKitStatus2.setAttribute("id","kitStatus2"+iA+subid);

                      if (aKitParts[5] != 'Y')
                      {
                        divKitStatus2.setAttribute("class","kitStatus1");
                        divKitStatus2.innerHTML = "&nbsp;";
                      }
                      else
                      {
                        divKitStatus2.setAttribute("class","kitStatus0");
                        divKitStatus2.innerHTML = "!";
                        tRequired = 'Edit Required';
                        // divKitLine.style.backgroundColor = "#FFF3F3";
                      }

                      divKitStatus1.appendChild(divKitStatus2);
                    }

                    divKitLine.appendChild(divKitStatus1);
                  }

                  inputKitQty = document.createElement('input');
                  if (inputKitQty)
                  {
                    inputKitQty.setAttribute("id","kitQty"+iA);
                    inputKitQty.setAttribute("class","kitLineQtyOn");
                    inputKitQty.setAttribute("type","text");
                    inputKitQty.value = aKitParts[4];

                    if ((aHash["KitType"] != 'D') || (aKitParts[5] == 'Y'))
                    {
                      inputKitQty.readOnly = "true";
                    }

                    if (parseInt(kit_isEdit))
                    {
                      divKitLine.setAttribute("class","kitLineOff");
                      inputKitQty.setAttribute("class","kitLineQtyOff");
                    }

                    divKitLine.appendChild(inputKitQty);
                  }

                  var divKitLineS2 = document.createElement('div');
                  if (divKitLineS2)
                  {
                    divKitLineS2.setAttribute("id","kitLineS2"+iA+subid);
                    divKitLineS2.style.cssFloat = "left";
                    divKitLineS2.style.styleFloat = "left";
                    divKitLineS2.style.cursor = "pointer";
                    divKitLineS2.style.width = "425px";

                    fONC = "kit_LoadPopupSub('"+aKitParts[0]+"','"+aKitParts[1]+"','"+aKitParts[2]+"','"+aKitParts[8]+"','"+aKitParts[3]+"','"+iA+"')";
                    divKitLineS2.onclick = new Function (fONC);

                    var divUM = document.createElement('div');
                    if (divUM)
                    {
                      divUM.style.width = "100px";
                      divUM.style.cssFloat = "left";
                      divUM.style.styleFloat = "left";
                      divUM.style.marginLeft = "5px";
                      divUM.innerHTML = aKitParts[7];

                      divKitLineS2.appendChild(divUM);
                    }

                    var divItemID = document.createElement('div');
                    if (divItemID)
                    {
                      divItemID.style.width = "100px";
                      divItemID.style.cssFloat = "left";
                      divItemID.style.styleFloat = "left";
                      divItemID.style.marginLeft = "5px";
                      divItemID.innerHTML = aKitParts[2];

                      divKitLineS2.appendChild(divItemID);
                    }

                    divShortDesc = document.createElement('div');
                    if (divShortDesc)
                    {
                      // divShortDesc.style.width = "225px";
                      divShortDesc.style.width = "200px";
                      divShortDesc.style.cssFloat = "left";
                      divShortDesc.style.styleFloat = "left";
                      divShortDesc.style.marginLeft = "5px";
                      divShortDesc.innerHTML = aKitParts[6];

                      divKitLineS2.appendChild(divShortDesc);
                    }

                    divClear = document.createElement('div');
                    if (divClear)
                    {
                      divClear.style.clear = "both";
                      divKitLineS2.appendChild(divClear);
                    }

                    divKitLine.appendChild(divKitLineS2);
                  }

                  if (aHash["KitType"] == 'D')
                  {
                    divDisable = document.createElement('div');
                    if (divDisable)
                    {
                      divDisable.setAttribute("id","kitLineDisableToggle"+iA+subid);
                      divDisable.setAttribute("class","kitDivDisableOn");
                      divDisable.setAttribute("title","disable line item");
                      divDisable.style.cssFloat = "right";
                      divDisable.style.styleFloat = "right";
                      divDisable.style.marginRight = "5px";
                      divDisable.style.cursor = "pointer";

                      fONC = "kit_DisableLineToggle('"+iA+"')";
                      divDisable.onclick = new Function (fONC);

                      if (parseInt(kit_isEdit))
                      {
                        divDisable.setAttribute("class","kitDivDisableOff");
                      }

                      divKitLine.appendChild(divDisable);
                    }
                  }

                  divClear = document.createElement('div');
                  if (divClear)
                  {
                    divClear.style.clear = "both";
                    divKitLine.appendChild(divClear);
                  }

                  if (tRequired !== '')
                  {
                    divKitQtyR = document.createElement('div');
                    if (divKitQtyR)
                    {
                      divKitQtyR.setAttribute("id","kitStatusR"+iA+subid);
                      divKitQtyR.setAttribute("class","kitStatusR");
                      divKitQtyR.innerHTML = tRequired;
                      divKitLine.appendChild(divKitQtyR);
                    }
                  }

                  divKitInner.appendChild(divKitLine);
                }

                if (parseInt(kit_isEdit))
                {
                  //alert("aKH["+iA+"]="+aKH[iA]+" aKHD["+iA+"]="+aKHD[iA]);
                  var kititemkey = aKitParts[0]+"~"+aKitParts[1]+"~"+aKitParts[2];
                  //alert('kititemkey='+kititemkey);
                  if (typeof aKHedit[kititemkey] != 'undefined')
                  {
                    var aLParts = aKHedit[kititemkey].split("~");
                    var lp=0;
                    for (lp=0;lp<aLParts.length;lp++)
                    {
                      var isSubMatrix = 0;
                      var subAttrib = '';
                      var subQty = 0;

                      if (aLParts.length > 1)
                      {
                        isSubMatrix = 1;
                      }

                      var tKit = aHashEdit["KIT"+aLParts[lp]];
                      var aKitSubs = tKit.split("&");
                      var ks=0;
                      for (ks=0;ks<aKitSubs.length;ks++)
                      {
                        var aKitParamKV = aKitSubs[ks].split("=");
                        if (aKitParamKV[0] == 'QTY')
                        {
                          subQty = aKitParamKV[1];
                        }
                        else if (aKitParamKV[0] == 'Attrib')
                        {
                          subAttrib = aKitParamKV[1];
                        }
                      }

                      if ((kit_Type != 'S')&&(!isSubMatrix))
                      {
                        if (inputKitQty)
                        {
                          inputKitQty.value = parseFloat(subQty);
                        }
                      }

                      if (divKitStatus2)
                      {
                        divKitStatus2.innerHTML = "&nbsp;";

                        if (divKitStatus2.getAttribute("class") == "kitStatus0")
                        {
                          divKitStatus2.setAttribute("class","kitStatus1");
                        }
                      }

                      if (divKitQtyR)
                      {
                        divKitQtyR.style.display = 'none';
                      }

                      if (inputKitQty)
                      {
                        if ((aHash["KitType"] != 'D') || (aKitParts[5] == 'Y'))
                        {
                          inputKitQty.readOnly = "true";
                        }
                        else
                        {
                          inputKitQty.className = "kitLineQtyOn";
                        }
                      }

                      if (divDisable)
                      {
                        divDisable.className = "kitDivDisableOn";
                      }

                      divKitLine.className = "kitLine";

                      if ((divKitLine)&&(subAttrib !== ''))
                      {
                        var divLineExtra = document.createElement('div');
                        if (divLineExtra)
                        {
                          divLineExtra.setAttribute("id","kitLineExtra"+iA);
                          divKitLine.appendChild(divLineExtra);

                          var aAP = subAttrib.split("^");
                          var z = 0;
                          var tLineExtra = '';
                          for (z=0;(z<aAP.length)&&(z<2);z++)
                          {
                            var aAt = aAP[z].split("_");

                            if (tLineExtra !== '')
                            {
                              tLineExtra += ', '+aAt[3]+':'+aAt[4];
                            }
                            else
                            {
                              tLineExtra = aAt[3]+':'+aAt[4];
                            }
                          }

                          // ATTRIB-001_SUB
                          div1 = document.createElement('div');
                          div1.style.marginLeft = "85px";
                          div1.innerHTML = 'qty: '+parseFloat(subQty)+'<span style="font-style:italic;margin-left:10px;">('+tLineExtra+')</span>';
                          divLineExtra.appendChild(div1);
                        }

                        if ((typeof aKH[iA] === 'undefined')||(aKH[iA] === ''))
                        {
                          aKH[iA] = lp;
                        }
                        else
                        {
                          aKH[iA] += '~'+lp;
                        }

                        aKDD[iA+'_'+lp] = tKit;

                        //alert("tKit="+tKit+" aKH["+iA+"]="+aKH[iA]);
                      }
                      else
                      {
                        aKH[iA] = subQty;
                      }


                      //alert("aHashEdit['KIT'"+aLParts[lp]+"]="+aHashEdit["KIT"+aLParts[lp]]);
                    }
                  }
                }
              }
            }

            divOverview.appendChild(divKitInner);
          }
        }
        // Accessories
        var divAccInner = document.createElement('div');
        if (divAccInner)
        {
          divAccInner.setAttribute("id","kitTabArea5"+subid);
          divAccInner.style.margin = "auto 5px";
          divAccInner.style.display = "none";

          for (iA=0;iA<aACC.length;iA++)
          {
            var aACCParts = aHash["ACC"+aACC[iA]].split("^");

            divSSLine = document.createElement('div');
            var divSSImg = document.createElement('div');
            divSSImg.style.cssFloat = "left";
            divSSImg.style.styleFloat = "left";

            imgSS = document.createElement('img');
            imgSS.setAttribute("src",aACCParts[2]);
            imgSS.style.maxWidth = "150px";

            // if ((kit_CatType == "S")&&(kit_CatID == "2"))
            // {
            //   imgSS.setAttribute("width","100");
            // }

            divSSImg.appendChild(imgSS);
            divSSLine.appendChild(divSSImg);

            divRItem = document.createElement('div');
            divRItem.style.cssFloat = "left";
            divRItem.style.styleFloat = "left";
            divRItem.style.margin = "2px";
            divRItem.style.width = "calc(100% - 160px)";
            divRItem.innerHTML = aACC[iA] + '<br>' + aACCParts[0];
            divSSLine.appendChild(divRItem);

            divClear = document.createElement('div');
            divClear.style.clear = "both";
            divSSLine.appendChild(divClear);
            divSSLine.style.margin = "2px";
            divSSLine.style.cursor = "pointer";

            if (iA >= 0)
            {
              divSSLine.setAttribute("class","divAccessoriesCell");
            }

            fONC = "kit_HidePopup();kit_LoadPopup('"+kit_Dist+"','"+kit_UserID+"','"+kit_WsID+"','"+aACCParts[3]+"','"+aACCParts[4]+"','"+aACCParts[5]+"','"+aACCParts[6]+"','"+aACCParts[7]+"','"+kit_RetailStore+"','','"+kit_QnetDomain+"','"+kit_QnetCatalogDomain+"','','"+kit_CustID+"')";
            divSSLine.onclick = new Function (fONC);

            divAccInner.appendChild(divSSLine);
          }

            divOverview.appendChild(divAccInner);
        }


        divCol2.appendChild(divOverview);
      }
    }

    // alert("iSSell="+iSSell+" kit_isSub="+kit_isSub);

    if ((iSSell > 0) && (!kit_isSub)&&(kit_isEdit === 0))
    {
      if ((aHash["TITLE_SSELL"] !== undefined)&&(aHash["TITLE_SSELL"].length > 0))
      {
        var divSSTitle = document.createElement('div');
        if (divSSTitle)
        {
          divSSTitle.setAttribute("class","kitSuggestedSellTitle");
          divSSTitle.innerHTML = aHash["TITLE_SSELL"];

          if (oDiv)
          {
            oDiv.appendChild(divSSTitle);
          }
        }
      }

      var divSuggestedSell = document.createElement('div');
      if (divSuggestedSell)
      {
        divSuggestedSell.setAttribute("class","kitSuggestedSell");

        divSSLine = document.createElement('div');
        if (divSSLine)
        {
          divSSLine.style.overflowX = "auto";
          divSSLine.style.overflowY = "hidden";
          divSSLine.style.position = "relative";

          for (iA=0;iA<aSSell.length;iA++)
          {
            var aSSellParts = aHash["SSELL"+aSSell[iA]].split("^");
            if (aSSellParts[0] !== '')
            {
              var divSSBlock = document.createElement('div');
              divSSBlock.style.cssFloat = "left";
              divSSBlock.style.styleFloat = "left";
              divSSBlock.style.width = "100px";
              divSSBlock.style.textAlign = "center";
              divSSBlock.style.cursor = "pointer";

              divSSBlock.setAttribute("class","kitSuggestedCell");

              //fONC = "hideItemDetail();showItemDetail('"+aSSellParts[5]+"','"+aSSellParts[3]+"','"+aSSellParts[4]+"','','"+aSSellParts[6]+"','"+aSSellParts[7]+"')";
              fONC = "kit_HidePopup();kit_LoadPopup('"+kit_Dist+"','"+kit_UserID+"','"+kit_WsID+"','"+aSSellParts[3]+"','"+aSSellParts[4]+"','"+aSSellParts[5]+"','"+aSSellParts[6]+"','"+aSSellParts[7]+"','"+kit_RetailStore+"','','"+kit_QnetDomain+"','"+kit_QnetCatalogDomain+"','','"+kit_CustID+"')";
              divSSBlock.onclick = new Function (fONC);

              aSSellParts[0] = strToPlainText(aSSellParts[0]);

              imgSS = document.createElement('img');
              imgSS.setAttribute("src",aSSellParts[2]);
              imgSS.setAttribute("alt",aSSellParts[5]+' : '+aSSellParts[0]);
              imgSS.setAttribute("title",aSSellParts[5]+' : '+aSSellParts[0]);

              imgSS.style.maxWidth = "100px";
              imgSS.style.maxHeight = "100px";

              // if ((kit_CatType == "S")&&(kit_CatID == "2"))
              // {
              //   imgSS.setAttribute("width","100");
              //   imgSS.setAttribute("height","100");
              // }

              divRItem = document.createElement('div');
              divRItem.style.margin = "2px";
              divRItem.innerHTML = aSSellParts[0];

              divSSBlock.appendChild(imgSS);
              divSSBlock.appendChild(divRItem);
              divSSLine.appendChild(divSSBlock);
            }
          }

          var lineW = iA * 105;
          divSSLine.style.width = lineW+"px";

          divSuggestedSell.appendChild(divSSLine);
        }

        if (oDiv)
        {
          oDiv.appendChild(divSuggestedSell);
        }
      }
    }

    kit_SelectTab (iTab);
    // kit_BuildPopup();
    // triggerOnResize();

    if ((aHash["TID"] > 0)&&(kit_isEdit))
    {
      QD_CreatePDF(0);
    }
  }
}

// ------------------------------------------------------------------
function kit_GetMatrixQtyPrice()
{
  var aOpt;
  var tQty = 0;
  var id = '';
  var inputQty;
  var iAP = 0;
  var tValue;

  var matrixHeaderY = document.getElementById('matrixHeaderY');
  if (matrixHeaderY)
  {
    var tAtt1 = matrixHeaderY.getAttribute('qnAtt1');
    var tAtt2 = matrixHeaderY.getAttribute('qnAtt2');
    var tPriceBreaks = matrixHeaderY.getAttribute('qnPriceBreaks');
    var aAtt = tAtt1.split("~");
    var aAtt2 = '';
    var iRowCnt = 1;

    if (tAtt2 !== '')
    {
      aAtt2 = tAtt2.split("~");
      iRowCnt = aAtt2.length;
    }

    var iRow = 0;
    for (iRow=0;iRow<iRowCnt;iRow++) // rows
    {
      for (iAP=0;iAP<aAtt.length;iAP++) // colums
      {
        if (iRowCnt == 1)
        {
          if (iAP > 0)
          {
            aOpt = aAtt[iAP].split("^"); // [0]=ID, [1]=Label, [2]=Per Unit, [3]=Per Unit retail, [4]=flat, [5]=flat retail, [6]=enforceMin, [7]=svcprice, [8]=svctaxYN

            id = 'PMX'+kit_GridId_x+'_'+aOpt[0]+'Y';
            inputQty = document.getElementById(id);
            if (inputQty)
            {
              tValue = inputQty.value;
              if ((tValue !== "")&&(!isNaN(tValue)))
              {
                tQty += parseInt(tValue);
              }
            }
          }
        }
        else
        {
          if ((iAP > 0)&&(iRow > 0))
          {
            aOpt = aAtt[iAP].split("^"); // [0]=ID, [1]=Label, [2]=Per Unit, [3]=Per Unit retail, [4]=flat, [5]=flat retail, [6]=enforceMin, [7]=svcprice, [8]=svctaxYN
            var aOpt2 = aAtt2[iRow].split("^"); // [0]=ID, [1]=Label, [2]=Per Unit, [3]=Per Unit retail, [4]=flat, [5]=flat retail, [6]=enforceMin, [7]=svcprice, [8]=svctaxYN

            id = 'PMX'+kit_GridId_x+'_'+aOpt[0]+'Y'+kit_GridId_y+'_'+aOpt2[0];
            inputQty = document.getElementById(id);
            if (inputQty)
            {
              tValue = inputQty.value;
              if ((tValue !== "")&&(!isNaN(tValue)))
              {
                tQty += parseInt(tValue);
              }
            }
          }
        }
      }
    }

    if (tQty === 0)
    {
      tQty = 1;
    }

    var tPrice = 0;
    var aPB = tPriceBreaks.split("~");
    var iPB = 0;
    for (iPB=0;iPB<aPB.length;iPB++)
    {
      var aKV = aPB[iPB].split("^");
      if (aKV[0] <= tQty)
      {
        tPrice = aKV[1];
      }
    }

    for (iAP=0;iAP<aAtt.length;iAP++) // colums
    {
      if (iAP > 0)
      {
        aOpt = aAtt[iAP].split("^"); // [0]=ID, [1]=Label, [2]=Per Unit, [3]=Per Unit retail, [4]=flat, [5]=flat retail, [6]=enforceMin, [7]=svcprice, [8]=svctaxYN
        id = 'UPM_'+aOpt[0];
        var divPrice = document.getElementById(id);
        if (divPrice)
        {
          var addOnPrice = aOpt[2];
          if (parseInt(kit_RetailStore))
          {
            addOnPrice = aOpt[3];
          }

          var colPrice = parseFloat(tPrice) + parseFloat(addOnPrice);
          divPrice.innerHTML = CurSym + (colPrice.toFixed(kit_PriceDec));
        }
      }
    }
  }
}

// ------------------------------------------------------------------
function kit_LoadDataMatrix(divPropertyInner,iAStart,aHash,aAttrib)
{
  var iRow = 0;
  var aOpt;
  var inputID;
  var divMatrixMin1;
  var divMatrixMin2;
  var divMatrixHR1;
  var divMatrixHR2;
  var divMatrixHRFlat;
  var divMatrixRow1;
  var divMatrixRow2;
  var divClearRow2;
  var fONKEYUP;
  var tPrice = '';
  var divMatrixRow_Col;
  var divMatrixRow_Col1;
  var spanMatrixRow_Col;
  var inputMatrixRow_Col;
  var divMatrixHRFlat_Col;

  if (iAStart > 0)
  {
    var cellWidth = 75;
    var widthHdCol = 90;
    var widthBody = 410;
    var flatCharge = 0;
    var addonColY = 0;
    var tCurSym = '';

    var divCurSym = document.createElement('div');

    divCurSym.innerHTML = CurSym;
    tCurSym = divCurSym.textContent;

    var price = aHash["Price"];

    if (aHash["PriceDetail"] !== '')
    {
      var aPriceBreak = aHash["PriceDetail"].split("~");
      var aPriceQP = aPriceBreak[0].split("^");
      price = aPriceQP[1];
    }

    var aAtt = aHash["ATTRIB"+aAttrib[0]].split("~");
    var iAP=0;
    for (iAP=0;iAP<aAtt.length;iAP++) // colums
    {
      aOpt = aAtt[iAP].split("^"); // [0]=ID, [1]=Label, [2]=Per Unit, [3]=Per Unit retail, [4]=flat, [5]=flat retail, [6]=enforceMin, [7]=svcprice, [8]=svctaxYN

      if (parseInt(kit_RetailStore))
      {
        if (parseFloat(aOpt[5]) > 0)
        {
          flatCharge = 1;
        }
      }
      else
      {
        if (parseFloat(aOpt[4]) > 0)
        {
          flatCharge = 1;
        }
      }
    }

    var iRowCnt = 1;
    var aAtt2 = '';

    if ((iAStart > 1)&&("ATTRIB"+aAttrib[1] in aHash))
    {
      aAtt2 = aHash["ATTRIB"+aAttrib[1]].split("~");
      iRowCnt = aAtt2.length;

      for (iRow=0;iRow<iRowCnt;iRow++) // rows
      {
        aOpt = aAtt2[iRow].split("^"); // [0]=ID, [1]=Label, [2]=Per Unit, [3]=Per Unit retail, [4]=flat, [5]=flat retail, [6]=enforceMin, [7]=svcprice, [8]=svctaxYN

        if (parseInt(kit_RetailStore))
        {
          if ((parseFloat(aOpt[5]) > 0)||(parseFloat(aOpt[3]) > 0))
          {
            addonColY = 1;
          }
        }
        else
        {
          if ((parseFloat(aOpt[4]) > 0)||(parseFloat(aOpt[2]) > 0))
          {
            addonColY = 1;
          }
        }
      }

      if (kit_isSub)
      {
        // aDetailInput_SUB[aDetailInput_SUB.length] = 'ATTRIB-'+aAttrib[0]+'^N';
        // aDetailInput_SUB[aDetailInput_SUB.length] = 'ATTRIB-'+aAttrib[1]+'^N';
        aDetailInput_SUB[aDetailInput_SUB.length] = 'ATTRIB-'+aAttrib[0]+'^Y';
        aDetailInput_SUB[aDetailInput_SUB.length] = 'ATTRIB-'+aAttrib[1]+'^Y';
      }
      else
      {
        // aDetailInput[aDetailInput.length] = 'ATTRIB-'+aAttrib[0]+'^N';
        // aDetailInput[aDetailInput.length] = 'ATTRIB-'+aAttrib[1]+'^N';
        aDetailInput[aDetailInput.length] = 'ATTRIB-'+aAttrib[0]+'^Y';
        aDetailInput[aDetailInput.length] = 'ATTRIB-'+aAttrib[1]+'^Y';
      }
    }
    else
    {
      iAStart = 1;
    }

    if (addonColY == 1)
    {
      widthHdCol = 140;
      widthBody = 360;
    }

    var totalWidth = ((cellWidth) * aAtt.length) - cellWidth + 10;

    if (totalWidth < (parseInt(widthBody) - 2))
    {
      cellWidth = cellWidth + parseInt(((parseInt(widthBody) - 2) - totalWidth) / aAtt.length);
      totalWidth = (parseInt(widthBody) - 2);
    }

    var divMatrixInner = document.createElement('div');
    divMatrixInner.style.width = "502px";
    divMatrixInner.style.margin = "20px 5px 5px 5px";
    divMatrixInner.style.overflow = "hidden";

    divMatrixInner.style.WebkitBorderRadius = "10px";
    divMatrixInner.style.MozBorderRadius = "10px";
    divMatrixInner.style.borderRadius = "10px";
    divMatrixInner.style.border = "1px outset #666666";

    var divMatrix1 = document.createElement('div');
    divMatrix1.setAttribute("class","matrixHeaderY");
    divMatrix1.setAttribute("id","matrixHeaderY");
    divMatrix1.setAttribute("qnAtt1",aHash["ATTRIB"+aAttrib[0]]);

    if ((iAStart > 1)&&("ATTRIB"+aAttrib[1] in aHash))
    {
      divMatrix1.setAttribute("qnAtt2",aHash["ATTRIB"+aAttrib[1]]);
    }
    else
    {
      divMatrix1.setAttribute("qnAtt2","");
    }

    divMatrix1.setAttribute("qnPriceBreaks",aHash["PriceDetail"]);

    divMatrix1.style.cssFloat = "left";
    divMatrix1.style.styleFloat = "left";
    divMatrix1.style.width = widthHdCol + "px";
    // divMatrix1.style.padding = "5px 0";
    divMatrix1.style.border = "none";
    divMatrix1.style.minHeight = "82px";

    var divMatrixOuter2 = document.createElement('div');
    divMatrixOuter2.setAttribute("class","matrixBody");
    divMatrixOuter2.style.borderLeft = "1px solid #333";
    divMatrixOuter2.style.width = widthBody + "px";
    divMatrixOuter2.style.overflowX = "auto";
    // divMatrixOuter2.style.padding = "5px 0";

    var divMatrix2 = document.createElement('div');
    divMatrix2.style.cssFloat = "left";
    divMatrix2.style.styleFloat = "left";
    divMatrix2.style.width = totalWidth+"px";

    for (iRow=0;iRow<iRowCnt;iRow++) // rows
    {
      divMatrixMin1 = null;
      divMatrixMin2 = null;
      divMatrixHR1 = null;
      divMatrixHR2 = null;
      divMatrixHRFlat = null;
      divMatrixRow1 = null;
      divMatrixRow2 = null;

      if (iRow === 0)
      {
        if (aHash["MinQty"] > 0)
        {
          divMatrix1.style.minHeight = (27 + parseInt(divMatrix1.style.minHeight)) + "px";
          divMatrixMin2 = document.createElement('div');
          divMatrixMin2.setAttribute("class","matrixHdxMinQty");
          divMatrixMin2.innerHTML = '<span style="padding-left:5px;font-style:italic;">' + mxMinQtyLbl + ' ' + aHash["MinQty"] + '</span><br>';
        }

        divMatrixHR1 = document.createElement('div');
        divMatrixHR1.setAttribute("class","matrixHdxUnitPrice");
        divMatrixHR1.style.paddingTop = "5px";
        divMatrixHR2 = document.createElement('div');
        divMatrixHR2.setAttribute("class","matrixHdxAttribute");

        if ((flatCharge == 1)&&(aHash["HasPricing"] == 1))
        {
          divMatrix1.style.minHeight = (27 + parseInt(divMatrix1.style.minHeight)) + "px";
          divMatrixHRFlat = document.createElement('div');
          divMatrixHRFlat.setAttribute("class","matrixHdxFlatCharge");
          divMatrixHRFlat.style.borderBottom = "none";
        }
      }

      divMatrixRow1 = document.createElement('div');
      divMatrixRow2 = document.createElement('div');
      divMatrixRow2.setAttribute("class","matrixBodyRow");

      if (iAStart == 1) // 2 Attribute - Multiple Input line
      {
        divMatrixRow2.style.borderBottom = "none";
      }

      for (iAP=0;iAP<aAtt.length;iAP++) // colums
      {
        var divMatrixHR1_Col;
        var divMatrixHR2_Col;

        // Size~ 1^X-Small^0^0^0^0~ 2^Small^0^0^0^0~ 3^Medium^0^0^0^0~ 4^Large^0^0^0^0~ 5^X-Large^0.75^0.75^0^0~6^2X-Large^2.00009^2.00009^0^0~7^3X-Large^3.11111^3.11111^0^0~8^4X-Large^4.11111^4.11111^0^0


        if ((iAP === 0)&&(iRow === 0))
        {
          if (aHash["MinQty"] > 0)
          {
            var divMatrixMinX = document.createElement('div');
            divMatrixMinX.setAttribute("class","matrixHdxMinQty");
            divMatrixMinX.innerHTML = '<span style="padding-left:5px;">&nbsp;</span>';
            divMatrix1.appendChild(divMatrixMinX);
          }

          divMatrixHR1_Col = document.createElement('div');
          divMatrixHR1_Col.setAttribute("class","matrixHdyUnitPrice");
          divMatrixHR1_Col.setAttribute("id",'UnitPriceLabel');
          divMatrixHR1_Col.style.paddingTop = "5px";
          divMatrixHR1_Col.innerHTML = '<span style="padding-left:5px;">' + mxHDUPLbl + '</span>';

          if (aHash["HasPricing"] == 1)
          {
            divMatrix1.appendChild(divMatrixHR1_Col);
          }

          if ((flatCharge == 1)&&(aHash["HasPricing"] == 1))
          {
            divMatrixHRFlat_Col = document.createElement('div');
            divMatrixHRFlat_Col.setAttribute("class","matrixHdyFlatCharge");
            divMatrixHRFlat_Col.innerHTML = '<span style="padding-left:5px;">' + mxHDFCLbl + '</span>';
            divMatrix1.appendChild(divMatrixHRFlat_Col);
          }

          divMatrixHR2_Col = document.createElement('div');
          divMatrixHR2_Col.setAttribute("class","matrixHdyAttribute");
          divMatrixHR2_Col.innerHTML = '<span style="padding-left:5px;">' + aAtt[0] + '</span>';
          divMatrix1.appendChild(divMatrixHR2_Col);
        }
        else if (iRow === 0)
        {
          aOpt = aAtt[iAP].split("^"); // [0]=ID, [1]=Label, [2]=Per Unit, [3]=Per Unit retail, [4]=flat, [5]=flat retail, [6]=enforceMin, [7]=svcprice, [8]=svctaxYN
          var addOnPrice = aOpt[2];

          if (parseInt(kit_RetailStore))
          {
            addOnPrice = aOpt[3];
          }

          var colPrice = parseFloat(price) + parseFloat(addOnPrice);

          divMatrixHR1_Col = document.createElement('div');
          divMatrixHR1_Col.setAttribute("id",'UPM_'+aOpt[0]);
          divMatrixHR1_Col.setAttribute("qnAddOnPrice",addOnPrice);
          divMatrixHR1_Col.style.cssFloat = "left";
          divMatrixHR1_Col.style.styleFloat = "left";
          divMatrixHR1_Col.style.width = cellWidth+"px";
          divMatrixHR1_Col.style.textAlign = "center";
          divMatrixHR1_Col.innerHTML = CurSym + (colPrice.toFixed(kit_PriceDec));
          divMatrixHR1.appendChild(divMatrixHR1_Col);

          if ((flatCharge == 1)&&(aHash["HasPricing"] == 1))
          {
            var colFlat = "";
            if (parseInt(kit_RetailStore))
            {
              if (parseFloat(aOpt[5]) > 0)
              {
                tPrice = aOpt[5];
                colFlat = CurSym + (parseFloat(tPrice).toFixed(kit_PriceDec));
              }
            }
            else
            {
              if (parseFloat(aOpt[4]) > 0)
              {
                tPrice = aOpt[4];
                colFlat = CurSym + (parseFloat(tPrice).toFixed(kit_PriceDec));
              }
            }

            divMatrixHRFlat_Col = document.createElement('div');
            divMatrixHRFlat_Col.style.cssFloat = "left";
            divMatrixHRFlat_Col.style.styleFloat = "left";
            divMatrixHRFlat_Col.style.width = cellWidth+"px";
            divMatrixHRFlat_Col.style.textAlign = "center";
            divMatrixHRFlat_Col.innerHTML = colFlat;
            divMatrixHRFlat.appendChild(divMatrixHRFlat_Col);
          }

          divMatrixHR2_Col = document.createElement('div');
          divMatrixHR2_Col.style.cssFloat = "left";
          divMatrixHR2_Col.style.styleFloat = "left";
          divMatrixHR2_Col.style.width = cellWidth+"px";
          divMatrixHR2_Col.style.textAlign = "center";
          divMatrixHR2_Col.style.overflow = "hidden";
          divMatrixHR2_Col.style.whiteSpace = "nowrap";
          // divMatrixHR2_Col.style.borderBottom = "1px solid #333";
          divMatrixHR2_Col.innerHTML = aOpt[1];
          divMatrixHR2.appendChild(divMatrixHR2_Col);

          if (iAStart == 1) // 1 Attribute - 1 Input line
          {
            inputID = 'PMX'+kit_GridId_x+'_'+aOpt[0]+'Y';

            divMatrixRow_Col = document.createElement('div');
            divMatrixRow_Col.style.display = "table";
            divMatrixRow_Col.style.height = "40px";
            divMatrixRow_Col.style.cssFloat = "left";
            divMatrixRow_Col.style.styleFloat = "left";
            divMatrixRow_Col.style.width = cellWidth+"px";
            divMatrixRow_Col.style.textAlign = "center";

            spanMatrixRow_Col = document.createElement('span');
            spanMatrixRow_Col.style.display = "table-cell";
            spanMatrixRow_Col.style.verticalAlign = "middle";

            inputMatrixRow_Col = document.createElement('input');
            inputMatrixRow_Col.setAttribute("id",inputID);
            inputMatrixRow_Col.setAttribute("title",aAtt[0]+" : "+aOpt[1]);
            inputMatrixRow_Col.style.width = "40px";

            if (aHash["PriceDetail"] !== '')
            {
              fONKEYUP = "kit_GetMatrixQtyPrice()";
              inputMatrixRow_Col.onkeyup = new Function (fONKEYUP);
            }

            spanMatrixRow_Col.appendChild(inputMatrixRow_Col);
            divMatrixRow_Col.appendChild(spanMatrixRow_Col);
            divMatrixRow2.appendChild(divMatrixRow_Col);
          }
        }
        else // 2nd Attribute - Multiple Input lines
        {
          var aOptY = aAtt2[iRow].split("^"); // [0]=ID, [1]=Label, [2]=Per Unit, [3]=Per Unit retail, [4]=flat, [5]=flat retail, [6]=enforceMin, [7]=svcprice, [8]=svctaxYN
          var tLabelY = aOptY[1];

          var aOptX = aAtt[iAP].split("^"); // [0]=ID, [1]=Label, [2]=Per Unit, [3]=Per Unit retail, [4]=flat, [5]=flat retail, [6]=enforceMin, [7]=svcprice, [8]=svctaxYN
          var tLabelX = aOptX[1];

          if (iAP === 0)
          {
            var divMatrixRowOuter_Col1 = document.createElement('div');
            divMatrixRowOuter_Col1.style.height = "40px";
            divMatrixRowOuter_Col1.style.width = "100%";
            divMatrixRowOuter_Col1.style.overflow = "hidden";
            divMatrixRowOuter_Col1.style.borderBottom = "1px solid #aaa";
            divMatrixRowOuter_Col1.style.cursor = "pointer";

            divMatrixRow_Col1 = document.createElement('div');
            divMatrixRow_Col1.setAttribute("class","matrixHdRow");
            divMatrixRow_Col1.style.height = "40px";
            divMatrixRow_Col1.style.width = "100%";

            var tHtml = '<span style="vertical-align:middle;display:table-cell;">' + tLabelY + '</span>';
            var tTitle = aAtt2[0] + ' : ' + strToPlainText(tLabelY);

            divMatrixRowOuter_Col1.title = tTitle;

            if (parseInt(kit_RetailStore))
            {
              if ((parseFloat(aOptY[5]) > 0)||(parseFloat(aOptY[3]) > 0))
              {
                tHtml =
                  '<div style="white-space:nowrap;overflow:hidden;height:20px;">' + tLabelY + '</div>' +
                  '<div style="white-space:nowrap;overflow:hidden;height:20px;">';
                  // '<span style="vertical-align:middle;display:table-row;white-space:nowrap">' + tLabelY + '</span>' +
                  // '<span style="vertical-align:middle;display:table-row;white-space:nowrap">';

                if ((parseFloat(aOptY[3]) > 0)&&(aHash["HasPricing"] == 1))
                {
                  tHtml += CurSym + (parseFloat(aOptY[3]).toFixed(kit_PriceDec)) + '/' + idpAttrUnit;
                  tTitle += ' ' + tCurSym + (parseFloat(aOptY[3]).toFixed(kit_PriceDec)) + '/' + strToPlainText(idpAttrUnit);
                }

                if ((parseFloat(aOptY[5]) > 0)&&(aHash["HasPricing"] == 1))
                {
                  tHtml += ' ' + CurSym + (parseFloat(aOptY[5]).toFixed(kit_PriceDec));
                  tTitle += ' + ' + tCurSym + (parseFloat(aOptY[5]).toFixed(kit_PriceDec));
                }

                tHtml += '</span>';

                divMatrixRowOuter_Col1.title = tTitle;
              }
            }
            else
            {
              if ((parseFloat(aOptY[4]) > 0)||(parseFloat(aOptY[2]) > 0))
              {
                tHtml =
                  '<div style="white-space:nowrap;overflow:hidden;height:20px;">' + tLabelY + '</div>' +
                  '<div style="white-space:nowrap;overflow:hidden;height:20px;">';
                  // '<span style="vertical-align:middle;display:table-row;white-space:nowrap">' + tLabelY + '</span>' +
                  // '<span style="vertical-align:middle;display:table-row;white-space:nowrap">';

                if ((parseFloat(aOptY[2]) > 0)&&(aHash["HasPricing"] == 1))
                {
                  tHtml += CurSym + (parseFloat(aOptY[2]).toFixed(kit_PriceDec)) + '/' + idpAttrUnit;
                  tTitle += ' ' + tCurSym + (parseFloat(aOptY[2]).toFixed(kit_PriceDec)) + '/' + strToPlainText(idpAttrUnit);
                }

                if ((parseFloat(aOptY[4]) > 0)&&(aHash["HasPricing"] == 1))
                {
                  tHtml += ' ' + CurSym + (parseFloat(aOptY[4]).toFixed(kit_PriceDec));
                  tTitle += ' + ' + tCurSym + (parseFloat(aOptY[4]).toFixed(kit_PriceDec));
                }

                tHtml += '</div>';

                divMatrixRowOuter_Col1.title = tTitle;
              }
            }

            divMatrixRow_Col1.innerHTML = tHtml;
            divMatrixRowOuter_Col1.appendChild(divMatrixRow_Col1);
            divMatrix1.appendChild(divMatrixRowOuter_Col1);
          }
          else
          {
            inputID = 'PMX'+kit_GridId_x+'_'+aOptX[0]+'Y'+kit_GridId_y+'_'+aOptY[0];

            divMatrixRow_Col = document.createElement('div');
            divMatrixRow_Col.style.display = "table";
            divMatrixRow_Col.style.height = "40px";
            divMatrixRow_Col.style.cssFloat = "left";
            divMatrixRow_Col.style.styleFloat = "left";
            divMatrixRow_Col.style.width = cellWidth+"px";
            divMatrixRow_Col.style.textAlign = "center";

            spanMatrixRow_Col = document.createElement('span');
            spanMatrixRow_Col.style.display = "table-cell";
            spanMatrixRow_Col.style.verticalAlign = "middle";

            inputMatrixRow_Col = document.createElement('input');
            inputMatrixRow_Col.setAttribute("id",inputID);
            inputMatrixRow_Col.setAttribute("title",strToPlainText(aAtt2[0]+" : "+tLabelY+" "+aAtt[0]+" : "+tLabelX));
            inputMatrixRow_Col.style.width = "40px";

            if (aHash["PriceDetail"] !== '')
            {
              fONKEYUP = "kit_GetMatrixQtyPrice()";
              inputMatrixRow_Col.onkeyup = new Function (fONKEYUP);
            }

            spanMatrixRow_Col.appendChild(inputMatrixRow_Col);
            divMatrixRow_Col.appendChild(spanMatrixRow_Col);
            divMatrixRow2.appendChild(divMatrixRow_Col);
          }
        }
      } // End for loop columns

      if (iRow === 0)
      {
        if (aHash["MinQty"] > 0)
        {
          divMatrix2.appendChild(divMatrixMin2);
        }

        var divClearH1 = document.createElement('div');
        divClearH1.style.clear = "both";
        divClearH1.innerHTML = "";
        divMatrixHR1.appendChild(divClearH1);

        var divClearH2 = document.createElement('div');
        divClearH2.style.clear = "both";
        divClearH2.innerHTML = "";
        divMatrixHR2.appendChild(divClearH2);

        if (aHash["HasPricing"] == 1)
        {
          divMatrix2.appendChild(divMatrixHR1);
        }

        if ((flatCharge == 1)&&(aHash["HasPricing"] == 1))
        {
          var divClearHFlat = document.createElement('div');
          divClearHFlat.style.clear = "both";
          divClearHFlat.innerHTML = "";
          divMatrixHRFlat.appendChild(divClearHFlat);

          divMatrix2.appendChild(divMatrixHRFlat);
        }

        divMatrix2.appendChild(divMatrixHR2);

        if (iAStart == 1) // 1 Attribute - 1 Input line
        {
          divClearRow2 = document.createElement('div');
          divClearRow2.style.clear = "both";
          divClearRow2.innerHTML = "";
          divMatrixRow2.appendChild(divClearRow2);
          divMatrix2.appendChild(divMatrixRow2);
        }
      }
      else
      {
        divClearRow2 = document.createElement('div');
        divClearRow2.style.clear = "both";
        divClearRow2.innerHTML = "";
        divMatrixRow2.appendChild(divClearRow2);
        divMatrix2.appendChild(divMatrixRow2);
      }
    } // End for loop rows

    divMatrixInner.appendChild(divMatrix1);
    divMatrixOuter2.appendChild(divMatrix2);
    divMatrixInner.appendChild(divMatrixOuter2);

    var divClear1 = document.createElement('div');
    divClear1.style.clear = "both";
    divClear1.innerHTML = "";
    divMatrixInner.appendChild(divClear1);

    divPropertyInner.appendChild(divMatrixInner);
  }
}

// ------------------------------------------------------------------
function kit_LoadPopup (dist,userid,wsid,client,catclient,item,cattype,catid,retailstore,vcdbname,qnetdomain,qnetcatalogdomain,itemcnt,custid)
{
  var div = document.getElementById(kitDivAreaID);
  if (div)
  {
    return(0);
  }

  kit_isEdit = 0;
  kit_isSub = 0;
  kit_Dist = dist;
  kit_UserID = userid;
  kit_WsID = wsid;
  kit_Client = client;
  kit_CatClient = catclient;
  kit_ItemID = item;
  kit_CatType = cattype;
  kit_CatID = catid;
  kit_RetailStore = retailstore;
  kit_vcDBName = vcdbname;
  kit_QnetDomain = qnetdomain;
  kit_QnetCatalogDomain = qnetcatalogdomain;
  kit_listitemref = itemcnt;
  kit_sub_Ref_Last = "";
  kit_CustID = custid;

  kit_BuildMask();

  kit_GetData();
  // kit_BuildPopup();
  // triggerOnResize();
}

// ------------------------------------------------------------------
function kit_LoadPopup_Edit (dist,userid,wsid,linenum,retailstore,qnetdomain,qnetcatalogdomain, orderid)
{
  kit_isEdit = 1;
  kit_isSub = 0;
  kit_Dist = dist;
  kit_UserID = userid;
  kit_WsID = wsid;
  kit_OrderID = orderid;
  kit_EditLineNum = linenum;
  kit_RetailStore = retailstore;
  kit_vcDBName = '';
  kit_QnetDomain = qnetdomain;
  kit_QnetCatalogDomain = qnetcatalogdomain;

  aKH = [];
  aKHD = [];
  aKDD = [];

  aKHedit = [];
  aKDDedit = [];

  aHashEdit.length = 0;

  var paramlist = 'DIST='+kit_Dist+'&UserID='+kit_UserID+'&WsID='+kit_WsID+'&OrderID='+kit_OrderID+'&LineNum='+kit_EditLineNum+'&RetailStore='+kit_RetailStore;
  QNET_CallAjax_POST('qn-load-session-line.pl',kit_LoadPopup_Edit_Return,paramlist);
}

// ------------------------------------------------------------------
function kit_LoadPopup_Edit_Return (httpObject) 
{
  var response = httpObject.responseText;
  if (response != '200') 
  {
    var aResp = response.split("~~");
    var tKitItem = '';
    var j=0;
    for (j=0;j<aResp.length;j++) 
    {
      var aKV = aResp[j].split("||");
      aHashEdit[aKV[0]] = aKV[1];
      if (aKV[0].substring(0,3) == "KIT") 
      {
        var linenum = aKV[0].substring(3);
        var kitclient = '';
        var kitclientowner = '';
        var kititemid = '';
        var DetailMode = 0;

        var aKitSubs = aKV[1].split("&");
        var k=0;
        for (k=0;k<aKitSubs.length;k++) {
          var aKitParamKV = aKitSubs[k].split("=");

          if (aKitParamKV[0] == 'Client') {
            kitclient = aKitParamKV[1];
          } else if (aKitParamKV[0] == 'ClientOwner') {
            kitclientowner = aKitParamKV[1];
          } else if (aKitParamKV[0] == 'ItemID') {
            kititemid = aKitParamKV[1];
          } else if (aKitParamKV[0] == 'DetailMode') {
            DetailMode = aKitParamKV[1];
          }
        }

        var kititemkey = kitclient+'~'+kitclientowner+'~'+kititemid;
        //alert ("KIT linenum="+linenum+" kititemkey="+kititemkey)
        if (typeof aKHedit[kititemkey] == 'undefined') {
          if (tKitItem === '') {
            tKitItem = kititemkey;
          } else {
            tKitItem += '||'+kititemkey;
          }

          aKHedit[kititemkey] = linenum;
        } else {
          aKHedit[kititemkey] += '~'+linenum;
        }
      }
    }
//     var aKI = tKitItem.split("||");
//     for (j=0;j<aKI.length;j++) {
//       var aKParts = aKI[j].split("~");
//       if (typeof aKHedit[aKI[j]] != 'undefined') {
//         var aLParts = aKHedit[aKI[j]].split("~");
//         for (lp=0;lp<aLParts.length;lp++) {
//           if (aKParts[3] == 1) {
//           } else {
//           }
//         }
//       }
//     }

    for (var key in aHashEdit) 
    {
      if (key === 'client') {
        kit_Client = aHashEdit["client"];
      } else if (key === 'catclient') {
        kit_CatClient = aHashEdit["catclient"];
      } else if (key === 'itemid') {
        kit_ItemID = aHashEdit["itemid"];
      } else if (key === 'cattype') {
        kit_CatType = aHashEdit["cattype"];
      } else if (key === 'catid') {
        kit_CatID = aHashEdit["catid"];
      } else if ( key.substr(0,4) === 'UDEF') {
        aUDEF[key.substr(4)] = aHashEdit[key];
      } else if ( key === 'CustID') {
        kit_CustID = aHashEdit[key];
      }
    }

    kit_BuildMask();
    kit_GetData();
  }
}

// ------------------------------------------------------------------
function kit_LoadPopup_QD (dist,client,item,qnetdomain,tid)
{
  kit_isEdit = 0;
  kit_isSub = 0;
  kit_Dist = dist;
  kit_UserID = 0;
  kit_WsID = 0;
  kit_OrderID = 0;
  kit_EditLineNum = 0;
  kit_RetailStore = 0;
  kit_vcDBName = '';
  kit_QnetDomain = qnetdomain;
  kit_QnetCatalogDomain = '';

  kit_Client = client;
  kit_ItemID = item;

  aKH = [];
  aKHD = [];
  aKDD = [];

  aKHedit = [];
  aKDDedit = [];

  aHashEdit.length = 0;

  kit_BuildMask();

  var paramlist = 'DIST='+kit_Dist+'&Client='+client+'&ItemID='+item+'&TID='+tid;
  QNET_CallAjax_POST('qn-load-qdesign-item.pl',kit_LoadData,paramlist);
}

// ------------------------------------------------------------------
function kit_LoadPopupSub (client,catclient,item,cattype,catid,kitline_ref)
{
  var isGood = 1;
  var divDisable = document.getElementById("kitLineDisableToggle"+kitline_ref);
  if (divDisable)
  {
    isGood = 0;
    var tClass = divDisable.getAttribute("class");
    if (tClass == "kitDivDisableOn")
    {
      isGood = 1;
    }
  }

  if (isGood)
  {
    kit_isSub = 1;
    kit_sub_Client = client;
    kit_sub_CatClient = catclient;
    kit_sub_ItemID = item;
    kit_sub_CatType = cattype;
    kit_sub_CatID = catid;
    kit_sub_Ref = kitline_ref;
    kit_sub_Ref_Part = '';

    kit_BuildMask();
    kit_GetData();
  }
}

// ------------------------------------------------------------------
function kit_mouseIn (id,client,catclient,item,cattype,catid)
{
  var fONC = '';

  var divLine = document.getElementById("kitLine"+id);
  if (divLine)
  {
    var tLabel = 'click to edit/view';
    var tBgColor = '#00CC00';

    var subid = (kit_isSub) ? '_SUB' : '';
    var isGood = 1;

    var divDisable = document.getElementById("kitLineDisableToggle"+id+subid);
    if (divDisable)
    {
      isGood = 0;

      var tClass = divDisable.getAttribute("class");
      if (tClass == "kitDivDisableOn")
      {
        isGood = 1;
      }
    }

    if (isGood)
    {
      var divStatus = document.getElementById("kitStatus2"+id);
      if (divStatus)
      {
        if (divStatus.getAttribute("class") == "kitStatus0")
        {
          tBgColor = '#660000';
          tLabel = 'click to edit (required)';
        }
      }

      var divOver = document.getElementById("kitLine"+id+"_MO");
      if (!divOver)
      {
        divOver = document.createElement('div');
        if (divOver)
        {
          divOver.setAttribute("id","kitLine"+id+"_MO");
          divOver.setAttribute("class","kitLineMouseOver");
          divOver.innerHTML = tLabel;
          divOver.style.backgroundColor = tBgColor;

          fONC = "kit_LoadPopupSub('"+client+"','"+catclient+"','"+item+"','"+cattype+"','"+catid+"','"+id+"')";
          divOver.onclick = new Function (fONC);

          //divLine.appendChild(divOver);
          divLine.insertBefore(divOver,divLine.firstChild);
        }
      }
      else
      {
        divOver.style.backgroundColor = tBgColor;
        divOver.style.display = 'block';
      }
    }
  }
}

// ------------------------------------------------------------------
function kit_mouseOut (id)
{
  var divLine = document.getElementById("kitLine"+id);
  if (divLine)
  {
//    var divLineS2 = document.getElementById("kitLineS2"+id);
//    if (divLineS2)
//    {
//      divLineS2.style.opacity = "1";
//      divLineS2.style.filter = "alpha (opacity=100)";
//    }

    var divOver = document.getElementById("kitLine"+id+"_MO");
    if (divOver)
    {
      divOver.style.display = 'none';
      //divLine.removeChild(divOver);
    }
  }
}

// ------------------------------------------------------------------
function kit_pricePopupClose()
{
  var subid = '';
  if (kit_isSub)
  {
    subid = '_SUB';
  }

  var divPricePopup = document.getElementById("kit_pricePopup"+subid);
  if (divPricePopup)
  {
    divPricePopup.style.display = "none";
  }
}

// ------------------------------------------------------------------
function kit_pricePopupOpen()
{
  var subid = '';
  if (kit_isSub)
  {
    subid = '_SUB';
  }

  var divPricePopup = document.getElementById("kit_pricePopup"+subid);
  if (divPricePopup)
  {
    var kitCol1 = document.getElementById("kitCol1");
    var divKitPriceLine = document.getElementById("divKitPriceLine");
    if ((divKitPriceLine)&&(kitCol1))
    {
      var vpOffset1 = kitCol1.getBoundingClientRect();
      var vpOffset2 = divKitPriceLine.getBoundingClientRect();
      divPricePopup.style.top = (vpOffset2.top - vpOffset1.top - (vpOffset2.height / 2) - 11)+"px";
    }

    divPricePopup.style.display = "block";
  }
}

// ------------------------------------------------------------------
function kit_qtyFocus()
{
  var subid = '';
  if (kit_isSub)
  {
    subid = '_SUB';
  }

  var inputQty = document.getElementById("kitQtyInput"+subid);
  if (inputQty)
  {
    var tText = aInit["qtyiText"];
    var el = document.createElement("div");
    el.innerHTML = tText;
    if (el.firstChild)
    {
      tText = el.firstChild.data;
    }

    if (inputQty.value == tText)
    {
      inputQty.value = '';
      inputQty.style.backgroundColor = aInit["qtyBgColor"];
      inputQty.style.color = aInit["qtyColor"];
      inputQty.style.fontStyle = aInit["qtyFontStyle"];
      inputQty.style.fontSize = aInit["qtyFontSize"];
      inputQty.style.fontWeight = aInit["qtyFontWeight"];
    }
  }
}

// ------------------------------------------------------------------
function kit_SelectTab (tabid)
{
  var subid = '';
  if (kit_isSub)
  {
    subid = '_SUB';
  }

  var i=1;
  for (i=1;i<6;i++)
  {
    var divTab = document.getElementById("kitTab"+i+subid);
    var divTabArea = document.getElementById("kitTabArea"+i+subid);
    if (divTab)
    {
      if (tabid == i)
      {
        divTab.setAttribute("class","kitTabOn");
        if (divTabArea)
        {
          divTabArea.style.display = "block";
        }
      }
      else
      {
        divTab.setAttribute("class","kitTab");
        if (divTabArea)
        {
          divTabArea.style.display = "none";
        }
      }
    }
  }
}

// ------------------------------------------------------------------
function kit_setFavorites ()
{
  var subid = '';
  if (kit_isSub)
  {
    subid = '_SUB';
  }

  var favvalue = 0;
  var divFavorite = document.getElementById("kit_cb_favorite"+subid);
  if (divFavorite)
  {
    if (divFavorite.checked)
    {
      favvalue = 1;
    }
  }

  var paramlist =
    'DIST='+kit_Dist+'&UserID='+kit_UserID+'&Client='+kit_Client+'&CCat='+kit_CatClient+'&ItemID='+kit_ItemID+
    '&CatType='+kit_CatType+'&CatNum='+kit_CatID+'&FavValue='+favvalue;

  if (kit_isSub)
  {
    paramlist =
      'DIST='+kit_Dist+'&UserID='+kit_UserID+'&Client='+kit_sub_Client+'&CCat='+kit_sub_CatClient+'&ItemID='+kit_sub_ItemID+
      '&CatType='+kit_sub_CatType+'&CatNum='+kit_sub_CatID+'&FavValue='+favvalue;
  }

  QNET_CallAjax_POST('qn-update-favorites2.pl',kit_setFavoritesReturn,paramlist);
}

// ------------------------------------------------------------------
function kit_setFavoritesReturn (httpObject)
{
  var response = httpObject.responseText;
  if (response != '200')
  {
    window.alert("Unable to update item to favorites");
  }
}

// ------------------------------------------------------------------
function loadPopupItemZoom(cid,catid,cattype,catnum,vcDBName,itemid)
{
  var tParam =
    "CID="+encodeURIComponent(cid)+"&CC="+encodeURIComponent(kit_User_CC)+"&CAT_ID="+encodeURIComponent(catid)+
    "&CAT_TYPE="+cattype+"&CAT_NUM="+catnum+"&vcDBName="+vcDBName+"&ITEM_ID="+encodeURIComponent(itemid);
  window.open(kit_QnetDomain+"/cgi-bin/qn-image-zoom.cgi?"+tParam,"zoomwin","menubar=0,width=950,height=700,status=0,toolbar=0,location=0,resizable=1");
}

// ------------------------------------------------------------------
function getKitSubData(type,id)
{
  var tReturn = '';
  var i = 0;
  var j = 0;

  if (typeof aKH[kit_sub_Ref] != 'undefined')
  {
    var aList = aKH[kit_sub_Ref].toString().split("~");
    var iSub = aList[0];

    var tempID = kit_sub_Ref + '_' + parseInt(iSub).toString();

    if (typeof aKDD[tempID] == 'undefined')
    {
      if (kit_isEdit)
      {
        var tKLine = aKHedit[aDetailHash['Client']+'~'+aDetailHash['CCat']+'~'+aDetailHash['ItemID']];

        if (typeof aHashEdit['KIT'+tKLine] != 'undefined')
        {
          var aKParmPair = aHashEdit['KIT'+tKLine].split("&");
          for (i=0;i<aKParmPair.length;i++)
          {
            var aKPV = aKParmPair[i].split("=");
            if (type == 'Attrib')
            {
              if (aKPV[0] == 'ATTRIB')
              {
                var aKPVAtt = aKPV[1].split("^");
                for (j=0;j<aKPVAtt.length;j++)
                {
                  var aKPVAttV = aKPVAtt[j].split("_");
                  if (id == aKPVAttV[0])
                  {
                    tReturn = aKPVAttV[1];
                  }
                }
              }
            }
            else if (type == 'UDEF')
            {
              // tReturn = aKV[1];
            }
          }
        }
      }
    }
    else
    {
      var aPairs = aKDD[tempID].split("&");
      for (i=0;i<aPairs.length;i++)
      {
        var aKV = aPairs[i].split("=");
        if (type == aKV[0])
        {
          var aKDDQDPair = [];
          var iKDQD = 0;

          if (type == 'Attrib')
          {
            aKV[1] = decodeURIComponent(aKV[1]);
            aKDDQDPair = aKV[1].split("~~");

            for (iKDQD=0;iKDQD<aKDDQDPair.length;iKDQD++)
            {
              var aMyAtt = [];
              var aAttParts = aKDDQDPair[iKDQD].split("_");
              if (id == aAttParts[0])
              {
                tReturn = aAttParts[1];
              }
            }
          }
          else if (type == 'UDEF')
          {
            tReturn = aKV[1];
          }
          else
          {
            tReturn = aKV[1];
          }
        }
      }
    }
  }

  return (tReturn);
}

// ------------------------------------------------------------------
function triggerOnResize()
{
  var divPopup = document.getElementById("divKitArea");
  if (divPopup)
  {
    var viewportWidth  = document.documentElement.clientWidth;
    var viewportHeight = document.documentElement.clientHeight;

    if ((viewportWidth < 801)||(viewportHeight < 651))
    {
      divPopup.style.position = 'absolute';

      if (viewportHeight < 651)
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

        //alert("sTop="+sTop+" sLeft="+sLeft);

        divPopup.style.marginTop = '0';
        divPopup.style.top = sTop+'px';
      }
      else
      {
        divPopup.style.marginTop = '-325px';
        divPopup.style.top = '50%';
      }

      if (viewportWidth < 801)
      {
        divPopup.style.marginLeft = '0';
        divPopup.style.left = '0';
      }
      else
      {
        divPopup.style.marginLeft = '-400px';
        divPopup.style.left = '50%';
      }
    }
    else
    {
      divPopup.style.position = 'fixed';
      divPopup.style.marginTop = '-325px';
      divPopup.style.top = '50%';
      divPopup.style.marginLeft = '-400px';
      divPopup.style.left = '50%';
    }

    var divPreviewArea = document.getElementById("divPreviewArea");
    if (divPreviewArea)
    {
      if (divPreviewArea.style.display == 'block')
      {
        divPopup.style.left = '0px';
        divPopup.style.marginLeft = '5px';
        divPreviewArea.style.display = 'block';
      }
    }
  }
}

// ------------------------------------------------------------------
function uploadAttachment(isOn)
{
  var oSpanLoader = document.getElementById('spanAttachmentLoader');
  var oImgLoader = document.getElementById('imgAttachmentLoader');

  if (isOn)
  {
    if (oSpanLoader)
    {
      oSpanLoader.style.visibility = 'visible';
    }
    if (oImgLoader)
    {
      oImgLoader.style.visibility = 'visible';
    }
  }
  else
  {
    if (oSpanLoader)
    {
      oSpanLoader.style.visibility = 'hidden';
    }
    if (oImgLoader)
    {
      oImgLoader.style.visibility = 'hidden';
    }
  }
}

// ------------------------------------------------------------------
function uploadAttachmentDone(fName,fSize,fType)
{
  var oAttachmentFile = document.getElementById('AttachmentFile');
  if (oAttachmentFile)
  {
    oAttachmentFile.value = fName;
  }

  uploadAttachment(0);
}

// ------------------------------------------------------------------
function closeSpecChoices (id)
{
  var divList = document.getElementById(id+'-div');
  if (divList)
  {
    if (divList.style.display != 'none')
    {
      divList.style.display = 'none';
    }
  }
}

// ------------------------------------------------------------------
function selectSpecChoices (id,iopt)
{
  var inField = document.getElementById(id);
  if (inField)
  {
    var divopt = document.getElementById(id+'-opt'+iopt);
    if (divopt)
    {
      inField.value = divopt.innerHTML;
      closeSpecChoices (id);
    }
  }
}

// ------------------------------------------------------------------
function openSpecButton (id)
{
  var divList = document.getElementById(id+'-div');
  if (divList)
  {
    if (divList.style.display == 'none')
    {
      openSpecChoices (id);
    }
    else
    {
      divList.style.display = 'none';
    }
  }
}

// ------------------------------------------------------------------
function openSpecChoices (id)
{
  var inField = document.getElementById(id);
  if (inField)
  {
    var divList = document.getElementById(id+'-div');
    if (divList)
    {
      divList.style.display = "block";
      divList.style.top = (inField.offsetTop+inField.offsetHeight)+"px";
      divList.style.left = inField.offsetLeft+"px";
      //divList.style.width = inField.offsetWidth+"px";
    }
  }
}

function dump(obj, label) {
  var out = '';
  for (var i in obj) {
    out += i + ": " + obj[i] + "\n";
  }
  window.alert(label + "\n"+out);
}
