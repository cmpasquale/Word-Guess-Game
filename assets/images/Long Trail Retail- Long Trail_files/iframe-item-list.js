// use qnet-core

/* globals QNET_CallAjax_POST */

/*
  AUTHOR: John Freeman <jfreeman@e-quantum.com>

  Script Name: iframe-item-list.js
*/

var _dist = "";
var _UserID = "";
var _WsID = "";
var _CustID = "";
var _CCat = "";
var _Level1 = "";
var _Level2 = "";
var _Level3 = "";
var _ItemCnt = "";
var _RetailStore = "";
var _CatType = "";
var _PriceID = "";
var _vcDBName = "";
var _CatID = "";
var _PerPage = "";
var _UseUsscoSmartSearch = 0;
var itemIncart = '';

var iRecursiveCnt = 0;
var iRecursiveLine = 0;

var currentPage = 1;

if (typeof parent.stopItemIndicator == 'function')
{
  parent.stopItemIndicator();
}

// --------------------------------------------------------
function initializeItemCount (i)
{
  parent.last_catitemcount = i;
}

// --------------------------------------------------------
function loadItems(itemList,ccat,level1,level2,level3,catitemcount,hasSearch,catid,searchString,searchFilters,cattype)
{
  var oItemList  = document.getElementById("ItemList");
  var oCCat      = document.getElementById("CCat");
  var oCatType   = document.getElementById("CatType");
  var oLevel1    = document.getElementById("Level1");
  var oLevel2    = document.getElementById("Level2");
  var oLevel3    = document.getElementById("Level3");
  var oItemCnt   = document.getElementById("ItemCnt");
  var oUseSearch = document.getElementById("useSearch");
  var oCatID     = document.getElementById("CatID");

  var oSearchString = document.getElementById("SearchString");
  if (oSearchString)
  {
    oSearchString.value = searchString;
  }

  var oSearchFilters = document.getElementById("SearchFilters");
  if (oSearchFilters)
  {
    oSearchFilters.value = searchFilters;
  }

  oItemList.value = itemList;
  oCCat.value = ccat;
  oCatType.value = cattype;

  var l1 = oLevel1.value;
  var l2 = oLevel2.value;
  var l3 = oLevel3.value;

  if ((l1 != level1)||(l2 != level2)||(l3 != level3))
  {
    var oPagePos = document.getElementById("PagePos");
    if (oPagePos)
    {
      oPagePos.value = '1';
    }
  }

  oLevel1.value = level1;
  oLevel2.value = level2;
  oLevel3.value = level3;

  oItemCnt.value = catitemcount;
  oUseSearch.value = hasSearch;

  if (typeof(catid) != "undefined")
  {
    if (oCatID)
    {
      oCatID.value = catid;
    }
  }

  document.fItemList.submit();
}

// --------------------------------------------------------
function mouseoverShowD(item)
{
  var oDiv = document.getElementById("divShowD-"+item);
  if (oDiv)
  {
    oDiv.style.display = "block";
  }
}

// --------------------------------------------------------
function mouseoutShowD(item)
{
  var oDiv = document.getElementById("divShowD-"+item);
  if (oDiv)
  {
    oDiv.style.display = "none";
  }
}

// --------------------------------------------------------
function removeItemCell (id)
{
  var oDiv = document.getElementById("divItem-"+id);
  if (oDiv)
  {
    oDiv.parentNode.removeChild(oDiv);
  }
}

// --------------------------------------------------------
function showDetail(item,client,catclient,itemcnt,cattype,catid)
{
  parent.showItemDetail(item,client,catclient,itemcnt,cattype,catid);
}

// --------------------------------------------------------
function showItemCart(detailClient,detailCatClient,detailItem)
{
  parent.displayItemCart(detailClient,detailCatClient,detailItem,"Item in Shopping Cart");
}

// --------------------------------------------------------
function setCatMode (ModeType)
{
  parent.CatMode = ModeType;

  var paramlist = 'DIST='+_dist+'&FA=SAVE&UserID='+_UserID+'&CustID='+_CustID+'&optKey=YourCatalog_CatalogMode&optValue='+ModeType;
  QNET_CallAjax_POST('ajax-user-option.pl',setCatMode_Return,paramlist);
}

// --------------------------------------------------------
function setCatMode_Return (httpObject)
{
  document.fItemList.submit();
}

// --------------------------------------------------------
function SortBy (bRecOffset,iOrderBy)
{
  if (iOrderBy != 2)
    { iOrderBy = 1; }

  var tSort = '';
  var SortBox = document.getElementById("SortCombo"+iOrderBy);
  if (SortBox)
  {
    var tSortIndex = SortBox.selectedIndex;
    tSort = SortBox.options[tSortIndex].value;
  }

  var oOrderBy = document.getElementById("OrderBy");
  if (oOrderBy)
  {
    oOrderBy.value = tSort;
  }

  if (bRecOffset)
    { }
  else
  {
    parent.PagePos = 1;
    parent.RecOffset = 0;

    var oPrevPage  = document.getElementById("pagenum"+currentPage);
    if (oPrevPage)
    {
      oPrevPage.style.textDecoration = "underline";
      oPrevPage.style.fontWeight = "normal";
    }
    var oNewPage  = document.getElementById("pagenum1");
    if (oNewPage)
    {
      oNewPage.style.textDecoration = "none";
      oNewPage.style.fontWeight = "bold";
    }

    var oPagePos  = document.getElementById("PagePos");
    if (oPagePos)
    {
      oPagePos.value = 1;
    }

    currentPage = 1;
  }

  if (((_CatID == '1')&&(_UseUsscoSmartSearch))||(_CatID == '2'))
  {
    parent.loadItemsOnlyProcess(_CCat,_Level1,_Level2,_Level3,tSort,_ItemCnt,' ');
  }
  else
  {
    parent.loadItemsOnly(_CCat,_Level1,_Level2,_Level3,tSort,_ItemCnt);
  }
}

// --------------------------------------------------------
function changeItemCount (itemComboID)
{
  // Goto Page 1
  var oPagePos  = document.getElementById("PagePos");
  if (oPagePos)
  {
    oPagePos.value = 1;
  }

  // Get Items Per Page
  var ItemsCombo = document.getElementById(itemComboID);
  var tIndex = ItemsCombo.selectedIndex;
  var newCnt = ItemsCombo.options[tIndex].value;
  parent.PerPage = newCnt;

  var oPerPage = document.getElementById("PerPage");
  oPerPage.value = newCnt;

  // Get Sort Method
  var oOrderBy = document.getElementById("OrderBy");
  var tSort = oOrderBy.value;

  if (((_CatID == '1')&&(_UseUsscoSmartSearch))||(_CatID == '2'))
  {
    parent.loadItemsOnlyProcess(_CCat,_Level1,_Level2,_Level3,tSort,_ItemCnt,' ');
  }
  else
  {
    parent.loadItemsOnly(_CCat,_Level1,_Level2,_Level3,tSort,_ItemCnt);
  }
}

// --------------------------------------------------------
function doNextTab (QID)
{
  QID = parseInt(QID) + parseInt(1);
  var oDQID = document.getElementById("DQ_"+QID);
  if (oDQID)
  {
    if (oDQID.style.display == 'none')
    {
      var oSD = document.getElementById("A_"+QID);
      if (oSD)
      {
        oSD.focus();
      }
    }
    else
    {
      var oQID = document.getElementById("Q_"+QID);
      if (oQID)
      {
        oQID.focus();
      }
    }
  }
}

// --------------------------------------------------------
function AddAll (iLine)
{
  iRecursiveCnt = 1;
  iRecursiveLine = iLine;
  AddRecursive (1,iLine);
}

// --------------------------------------------------------
function AddRecursive (i,iLine)
{
  if (i <= _ItemCnt)
  {
    var oQty = document.getElementById("Q_"+i);
    if (oQty)
    {
      var tQty = oQty.value;

      tQty = (parent.yc2_DecimalYN == 'N') ? Math.floor(tQty) : tQty; // Allow Decimal Check

      if ((iLine == i)&&(tQty <= 0))
      {
        tQty = 1;
      }

      if (tQty > 0)
      {
        var tItem = '';
        var tClient = '';
        var tOwnerClient = '';
        var tCatType = '';
        var tCatID = '';

        var oHQ = document.getElementById("HQ_"+i);
        if (oHQ)
        {
          var tString = oHQ.value;
          var aString = tString.split("~~");
          tItem = aString[0];
          tClient = aString[1];
          tOwnerClient = aString[2];
          tCatType = aString[3];
          tCatID = aString[4];
        }

        var paramlist =
          'DIST='+_dist+'&UserID='+_UserID+'&WsID='+_WsID+'&Client='+tClient+'&ClientOwner='+tOwnerClient+
          '&ItemID='+escape(tItem)+'&DetailMode=0&QTY='+tQty+'&RetailStore='+_RetailStore+'&LineIndex='+i+
          '&CatType='+tCatType+'&PriceID=&vcDBName='+_vcDBName+'&CatID='+tCatID;
        QNET_CallAjax_POST('qn-addcart-your-catalog.pl',AddRecursive_Return,paramlist);
      }
      else
      {
        iRecursiveCnt++;
        AddRecursive (iRecursiveCnt,iLine);
      }
    }
  }
}

// --------------------------------------------------------
function AddRecursive_Return (httpObject)
{
  var response = httpObject.responseText;
  if (response !== '')
  {
    // var addresponse = savefuncreturn.responseText || "";
    response = URLDecode(response);

    var aHash = [];
    var aCol = response.split("~");
    var j=0;
    for (j=0;j<aCol.length;j++)
    {
      var aKV = aCol[j].split("=");
      aHash[aKV[0]] = aKV[1];
    }

    setCartCnt (aHash["LineIndex"],aHash["QTY"]);

    var oAjaxQty = document.getElementById("Q_"+aHash["LineIndex"]);
    if (oAjaxQty)
    {
      oAjaxQty.value = "";
    }

    if (aHash["found"] != 1)
    {
      parent.updateCartCount(1);
    }

    iRecursiveCnt++;
    AddRecursive (iRecursiveCnt,iRecursiveLine);
  }
}

// --------------------------------------------------------
function setCartCnt (iIndex,qty)
{
  var oCartCnt = document.getElementById("CART_"+iIndex);
  if (oCartCnt)
  {
    var matchStr = /\[%itemCartCnt\]/;
    var msgStr = itemIncart.replace(matchStr,qty);
    oCartCnt.innerHTML = msgStr;
    oCartCnt.style.display = 'inline-block';
  }
}

// --------------------------------------------------------
function GotoPage (iPage)
{
  if (iPage > 0)
  {
    var oPrevPage  = document.getElementById("pagenum"+currentPage);
    if (oPrevPage)
    {
      oPrevPage.style.textDecoration = "underline";
      oPrevPage.style.fontWeight = "normal";
    }
    var oNewPage  = document.getElementById("pagenum"+iPage);
    if (oNewPage)
    {
      oNewPage.style.textDecoration = "none";
      oNewPage.style.fontWeight = "bold";
    }

    currentPage = iPage;

    var oPagePos  = document.getElementById("PagePos");
    if (oPagePos)
    {
      oPagePos.value = iPage;
    }

    var tOffset = (iPage * parseInt(_PerPage)) - parseInt(_PerPage);
    parent.RecOffset = tOffset;

    SortBy (1);
  }
}

// --------------------------------------------------------
function resetPagePos () {
    var oPagePos  = document.getElementById("PagePos");
    if (oPagePos)
    {
      oPagePos.value = 1;
    }

    parent.PagePos = 1;
    parent.RecOffset = 0;

    currentPage = 1;
}
