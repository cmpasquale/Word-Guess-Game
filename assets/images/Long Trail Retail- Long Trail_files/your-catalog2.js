// use qnet-core

/* globals QNET_CallAjax_POST */

/*jshint scripturl:true*/

// ----------------------------------------------
// Script Name: your-catalog2.js
// Compressed:  z-your-catalog2.js
// Author: John Freeman
// ----------------------------------------------

var jsonFilters = '';

var initSearch = 1;
var initLevel1 = '';
var initLevel2 = '';
var initLevel3 = '';
var initItemOnly = 0;

var currentSearch = '';
var detailItemIndex = '';
var detailItem = '';
var detailClient = '';
var detailCatClient = '';

var yc2_SID = '';

var yc2_Add_CatID = '';

var yc2_dist = '';
var yc2_domain = '';
var yc2_catalog_domain = '';
var yc2_CatID = '';
var yc2_CatType = '';
var yc2_CCat = '';
var yc2_CustID = '';
var yc2_RetailStore = '';
var yc2_ShipTo = '';
var yc2_UserCC = '';
var yc2_UserClient = '';
var yc2_UserID = '';
var yc2_vcDBName = '';
var yc2_WsID = '';
var yc2_FavCat = '';
var yc2_PriceID = '';
var yc2_viewonly = 0;
var yc2_LoadItemID = '';

var yc2_ItemCellH = '';
var yc2_iframeMinWidth = '';
var yc2_SideBar_Width = '';
var yc2_menucat_div = '';
var yc2_menucat = '';
var yc2_hasBorder = '';
var yc2_menu_image_width = 0;
var yc2_menu_image_padleft = 0;
var yc2_menu_image_padright = 0;
var yc2_menu_image_height = 0;
var yc2_menu_image_padtop = '';
var yc2_menu_image_padbot = '';
var yc2_sublvl1_top_offset = '';
var yc2_menu_style = '';
var yc2_menu1_li_borderbottom = '';

var yc2_sidebar_TitleText = '';
var yc2_sidebar_TitleText2 = '';

var yc2_SearchHint = '';
var yc2_EnableFilters = '';

var yc2_Add_CatType = '';
var yc2_Suppress_YourCatalogSearch = '';

var _collapseSideBar = '';
var _collapseSideBarDefault = '';

var yc2_menu1_collapse = '';
var yc2_menu1_expand = '';
var yc2_menucat_mover = '';
var yc2_menu1_mover = '';
var yc2_menu2_mover = '';
var yc2_menu3_mover = '';
var yc2_menucat_mout = '';
var yc2_menu1_mout = '';
var yc2_menu2_mout = '';
var yc2_menu3_mout = '';
var yc2_menucat_a = '';
var yc2_menu1_a = '';
var yc2_menu2_a = '';
var yc2_menu3_a = '';
var yc2_menu1_li = '';
var yc2_menu2_li = '';
var yc2_menu3_li = '';

var yc2_imagePathLG = '';
var yc2_aAltImg = [];

var yc2_PriceTableHeadBg = '';
var yc2_PriceTableHeadColor = '';
var yc2_PriceTableBodyBg = '';
var yc2_PriceTableBodyColor = '';
var yc2_PriceTableOverBg = '';
var yc2_PriceTableOverColor = '';

var yc2_popupTabN_bgcolor = '';
var yc2_popupTabN_bordercolor = '';
var yc2_popupTabN_color = '';
var yc2_popupTabA_bgcolor = '';
var yc2_popupTabA_bordercolor = '';
var yc2_popupTabA_color = '';
var yc2_ViewInventory = 0;

var yc2_AttributeFilterList = '';
var yc2_AttributeFilterListDesc = '';
var yc2_CategoryFilterList = '';

var yc2_LoadAllItems = 0;

var yc2_LastCatalogObj;
var yc2_LastCatalogBeforeObj;

var yc2_SearchByFeatureTitle = '';
var yc2_loadingItems = 'Loading Items...';
var yc2_SearchAgain = "Item not available, please try your search again!";

var yc2_UseUsscoSmartSearch = 0;
var yc2_bLoadCategories = 0;

var SearchFilterList = "";
var AppliedFilterList = "";

var aLQ = []; // Load Queue

// ----------------------------------------------
// Initialize Functions
// ----------------------------------------------
function yc2_Initialize_CatID (t)
  { yc2_CatID = t; }
function yc2_Initialize_CatType (t)
  { yc2_CatType = t; }
function yc2_Initialize_Add_CatType (t)
  { yc2_Add_CatType = t; }
function yc2_Initialize_CCat (t)
  { yc2_CCat = t; }
function yc2_Initialize_collapseSideBar (t)
  { _collapseSideBar = t; }
function yc2_Initialize_collapseSideBarDefault (t)
  { _collapseSideBarDefault = t; }
function yc2_Initialize_CustID (t)
  { yc2_CustID = t; }
function yc2_Initialize_dist (t)
  { yc2_dist = t; }
function yc2_Initialize_domain (t)
  { yc2_domain = t; }
function yc2_Initialize_catalog_domain (t)
  { yc2_catalog_domain = t; }
function yc2_Initialize_menu1_collapse (t)
  { yc2_menu1_collapse = t; }
function yc2_Initialize_menu1_expand (t)
  { yc2_menu1_expand = t; }
function yc2_Initialize_menucat_mover (t)
  { yc2_menucat_mover = t; }
function yc2_Initialize_menu1_mover (t)
  { yc2_menu1_mover = t; }
function yc2_Initialize_menu2_mover (t)
  { yc2_menu2_mover = t; }
function yc2_Initialize_menu3_mover (t)
  { yc2_menu3_mover = t; }
function yc2_Initialize_menucat_mout (t)
  { yc2_menucat_mout = t; }
function yc2_Initialize_menu1_mout (t)
  { yc2_menu1_mout = t; }
function yc2_Initialize_menu2_mout (t)
  { yc2_menu2_mout = t; }
function yc2_Initialize_menu3_mout (t)
  { yc2_menu3_mout = t; }
function yc2_Initialize_menucat_a (t)
  { yc2_menucat_a = t; }
function yc2_Initialize_menu1_a (t)
  { yc2_menu1_a = t; }
function yc2_Initialize_menu2_a (t)
  { yc2_menu2_a = t; }
function yc2_Initialize_menu3_a (t)
  { yc2_menu3_a = t; }
function yc2_Initialize_menu1_li (t)
  { yc2_menu1_li = t; }
function yc2_Initialize_menu2_li (t)
  { yc2_menu2_li = t; }
function yc2_Initialize_menu3_li (t)
  { yc2_menu3_li = t; }

function yc2_Initialize_PriceTableHeadBg (t)
  { yc2_PriceTableHeadBg = t; }
function yc2_Initialize_PriceTableHeadColor (t)
  { yc2_PriceTableHeadColor = t; }
function yc2_Initialize_PriceTableBodyBg (t)
  { yc2_PriceTableBodyBg = t; }
function yc2_Initialize_PriceTableBodyColor (t)
  { yc2_PriceTableBodyColor = t; }
function yc2_Initialize_PriceTableOverBg (t)
  { yc2_PriceTableOverBg = t; }
function yc2_Initialize_PriceTableOverColor (t)
  { yc2_PriceTableOverColor = t; }
function yc2_Initialize_ViewInventory (t)
  { yc2_ViewInventory = t; }

function yc2_Initialize_popupTabN_bgcolor (t)
  { yc2_popupTabN_bgcolor = t; }
function yc2_Initialize_popupTabN_bordercolor (t)
  { yc2_popupTabN_bordercolor = t; }
function yc2_Initialize_popupTabN_color (t)
  { yc2_popupTabN_color = t; }
function yc2_Initialize_popupTabA_bgcolor (t)
  { yc2_popupTabA_bgcolor = t; }
function yc2_Initialize_popupTabA_bordercolor (t)
  { yc2_popupTabA_bordercolor = t; }
function yc2_Initialize_popupTabA_color (t)
  { yc2_popupTabA_color = t; }

function yc2_Initialize_RetailStore (t)
  { yc2_RetailStore = t; }
function yc2_Initialize_ShipTo (t)
  { yc2_ShipTo = t; }
function yc2_Initialize_UserCC (t)
  { yc2_UserCC = t; }
function yc2_Initialize_UserClient (t)
  { yc2_UserClient = t; }
function yc2_Initialize_UserID (t)
  { yc2_UserID = t; }
function yc2_Initialize_vcDBName (t)
  { yc2_vcDBName = t; }
function yc2_Initialize_WsID (t)
  { yc2_WsID = t; }

// ----------------------------------------------
function SelectSearchOpt(searchstr)
{
  goSearch(0,searchstr);
}

// ----------------------------------------------
function ClearSearch()
{
  var divCatalogNode = document.getElementById("CatalogNode");
  if (divCatalogNode)
  {
    var ESearchNode = document.getElementById("ESearchNode");
    if (ESearchNode)
    {
      divCatalogNode.removeChild(ESearchNode);
    }
  }

  var oSearch = document.getElementById("SEARCH");
  if (oSearch)
  {
    oSearch.value = '';
  }

  currentSearch = '';
  yc2_AttributeFilterList = '';
  yc2_AttributeFilterListDesc = '';
}

// ----------------------------------------------
function AddToFavorites()
{
  //detailItem = item;
  //detailClient = client;
  //detailCatClient = catclient;
  //var yc2_CatID = '';
  //var yc2_CatType = '';

  var ts = new Date();
  var tParam = '';

  if (yc2_CatID == '1049')
  {
    tParam =
      'DIST='+yc2_dist+'&UserID='+yc2_UserID+'&CustID='+yc2_CustID+'&CatType='+yc2_Add_CatType+'&CatID='+yc2_Add_CatID+
      '&Client='+detailClient+'&CCat='+detailCatClient+'&ItemID='+detailItem+'&FA=REMOVE&ts='+ts.getTime();

    //alert("AddToFavorites: tParam("+tParam+")");
    new Ajax.Request('qn-add-to-favorites.pl',
    {
      method:'post',
      parameters: tParam,
      onSuccess: function(catreturn)
      {
        var response = catreturn.responseText || "";

        if (response !== '')
        {
          window.frames["iframeItemList"].removeItemCell(detailItem);
          window.alert("Item "+detailItem+" removed from favorites");
          hideItemDetail();
        }
      },
      onFailure: function() { window.alert("Something went wrong adding to favorites"); }
    }); // End Ajax
  }
  else
  {
    tParam =
      'DIST='+yc2_dist+'&UserID='+yc2_UserID+'&CustID='+yc2_CustID+'&CatType='+yc2_CatType+'&CatID='+yc2_CatID+
      '&Client='+detailClient+'&CCat='+detailCatClient+'&ItemID='+detailItem+'&FA=&ts='+ts.getTime();

    new Ajax.Request('qn-add-to-favorites.pl',
    {
      method:'post',
      parameters: tParam,
      onSuccess: function(catreturn)
      {
        var response = catreturn.responseText || "";
        if (response !== '')
        {
          window.alert("Item "+detailItem+" added to favorites");
        }
      },
      onFailure: function() {window.alert("Something went wrong adding to favorites");}
    }); // End Ajax
  }
}

// ----------------------------------------------
function AltImageMouseOver(fullsizeImage,width,height,ext,path)
{
  var oaImgPopPic = document.getElementById('aimgPopPic');
  var oImgPopPic = document.getElementById('imgPopPic');
  if ((oImgPopPic)&&(oaImgPopPic))
  {
    oImgPopPic.removeAttribute('width');

    if (ext.toLowerCase() == '.pdf')
    {
      oImgPopPic.src = path+'thumbnails/225x250/'+fullsizeImage+'.gif';
    }
    else
    {
      oImgPopPic.src = path+'thumbnails/225x250/'+fullsizeImage+'.jpg';
      oaImgPopPic.href = path+fullsizeImage+'.jpg';
    }

    var imgLeft = parseInt((225 - width) / 2);
    var imgTop = parseInt((250 - height) / 2);

    oImgPopPic.style.left = imgLeft+"px";
    oImgPopPic.style.top = imgTop+"px";
  }
}

// ----------------------------------------------
function AltImageMouseOver2(imageUrl)
{
  var oImgPopPic = document.getElementById('imgPopPic');
  if (oImgPopPic)
  {
    oImgPopPic.src = imageUrl;
    oImgPopPic.width = "225";
  }
}

// ----------------------------------------------
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

// ----------------------------------------------
function CollapseSideBar(isOpen)
{
  isOpen = (isOpen == 0) ? 0 : 1;
  var divLeftSideFull = document.getElementById("divLeftSideFull");
  var divLeftSideCollapse = document.getElementById("divLeftSideCollapse");
  var divSideBarButton = document.getElementById("divSideBarButton");
  var tdCatCol = document.getElementById("tdCatCol");
  if ((divSideBarButton)&&(divLeftSideFull)&&(divLeftSideCollapse)&&(tdCatCol))
  {
    if (isOpen)
    {
      divLeftSideFull.style.display = "block";
      divLeftSideCollapse.style.display = "none";
      divSideBarButton.style.display = "none";
      tdCatCol.className = "catcol";
    }
    else
    {
      divLeftSideFull.style.display = "none";
      divLeftSideCollapse.style.display = "block";
      divSideBarButton.style.display = "block";
      tdCatCol.className = "sidebarc";
    }

    setIFrameSize();
  }
}

function createULNode(nodeID,noCollapse)
{
  var tReturn = "";
  var nextID = '';
  var isGood = '';
  var nextObj = '';
  var lastObj = '';

  var currentNode = document.getElementById(nodeID);
  if (currentNode)
  {
    var hasBorder = 0;
    var borderBottom = currentNode.style.borderBottom;
    if ((borderBottom !== "")&&(borderBottom != "none"))
    {
      hasBorder = 1;
    }

    var nodePart = nodeID.substr(2);
    var currentNodeImg = document.getElementById('A'+nodePart);
    var currentLvl = nodeID.substr(2,1);

    if (currentNodeImg)
    {
      var nodeType = currentNodeImg.src;
      if (nodeType.match(yc2_menu1_collapse)) // if collapsed then expand
      {
        var SubMenuExists = 0;
        currentNodeImg.src = yc2_menu1_expand;

        nextObj = currentNode.nextSibling;
        if (nextObj)
        {
          nextID = nextObj.id;
          if (nextID.length > 2)
          {
            if (nextID.substr(2,1) == (parseInt(currentLvl)+1))
            {
              SubMenuExists = 1;
            }
          }
        }

        currentNode.style.borderBottom = "none";

        if (SubMenuExists)
        {
          isGood = 1;
          var lastExpand = 1;
          lastObj = '';
          nextObj = currentNode.nextSibling;
          lastObj = nextObj;
          while (isGood)
          {
            isGood = 0;

            if (nextObj)
            {
              nextID = nextObj.id;
              if (nextID.length > 2)
              {
                if (parseInt(nextID.substr(2,1)) > (parseInt(currentLvl)))
                {
                  isGood = 1;
                  lastObj = nextObj;

                  if (parseInt(nextID.substr(2,1)) == (parseInt(currentLvl)+1))
                  {
                    nextObj.style.display = "block";

                    var nextObjID = nextObj.id;
                    var nextnodePart = nextObjID.substr(2);
                    var nextnodeImg = document.getElementById('A'+nextnodePart);
                    if (nextnodeImg)
                    {
                      var nextnodeType = nextnodeImg.src;
                      if (nextnodeType.match(yc2_menu1_collapse))
                      {
                        lastExpand = 0;
                      }
                      else
                      {
                        lastExpand = 1;
                      }
                    }
                  }
                  else if (parseInt(nextID.substr(2,1)) > (parseInt(currentLvl)+1))
                  {
                    if (lastExpand)
                    {
                      nextObj.style.display = "block";
                    }
                  }

                  nextObj = nextObj.nextSibling;
                }
              }
            }
          }

          lastObj.style.borderBottom = borderBottom;

        }
        else
        {
          tReturn = currentNode;
        }
      }
      else if (noCollapse)
      {
//              tReturn = currentNode;
      }
      else // Collapse sub menu
      {
        currentNodeImg.src = yc2_menu1_collapse;

        isGood = 1;
        nextObj = currentNode.nextSibling;
        lastObj = nextObj;
        while (isGood)
        {
          isGood = 0;

          if (nextObj)
          {
            nextID = nextObj.id;
            if (nextID.length > 2)
            {
              if (parseInt(nextID.substr(2,1)) > (parseInt(currentLvl)))
              {
                isGood = 1;
                lastObj = nextObj;
                nextObj.style.display = "none";
                nextObj = nextObj.nextSibling;
              }
            }
          }
        }

        var borderBottomSub = lastObj.style.borderBottom;
        if ((borderBottomSub !== "")&&(borderBottomSub != "none"))
        {
          currentNode.style.borderBottom = borderBottomSub;
        }
      }
    }
  }

  return(tReturn);
}

function toggleESearchFilter(id)
{
  var ESearchFilterDetail = document.getElementById("ESearchFilterDetail"+id);
  var ESearchFilterImg = document.getElementById("ESearchFilterImg"+id);
  if (ESearchFilterDetail && ESearchFilterImg)
  {
    var styleDisplay = ESearchFilterDetail.style.display;
    if ((styleDisplay == 'none')||(styleDisplay === ''))
    {
      ESearchFilterDetail.style.display = 'block';
      ESearchFilterImg.src = yc2_menu1_expand;
    }
    else
    {
      ESearchFilterDetail.style.display = 'none';
      ESearchFilterImg.src = yc2_menu1_collapse;
    }
  }

}

function toggleESearchFilterOff(id)
{
  var i=0;
  var aIDPart = [];

  var aUsedFilters = yc2_AttributeFilterList.split("~");
  var aUsedFiltersDesc = yc2_AttributeFilterListDesc.split("~");

  if (yc2_CatID == "1")
  {
    var tFilter = '';

    var aID = id.split(":");

    aIDPart = [];
    aIDPart = aID[0].split("_");
    var FilterType = aIDPart[(aIDPart.length - 1)];

    var aAttFilterList = yc2_AttributeFilterList.split("~");
    for (i=0;i<aAttFilterList.length;i++)
    {
      var aAttFilterListPart = aAttFilterList[i].split(":");
      var aTypePart = aAttFilterListPart[0].split("_");

      // alert('aID[1]('+aID[1]+') != aAttFilterListPart[1]('+aAttFilterListPart[1]+')  aAttFilterList['+i+']='+aAttFilterList[i]);

      if (aID[1] != aAttFilterListPart[1]) // Remove
      {
        if ((FilterType == 'Category')&&(aIDPart[1] < aTypePart[0]))
        {
        }
        else
        {
          if (tFilter !== '')
          {
            tFilter += '~';
          }

          tFilter += aAttFilterList[i];
        }
      }
    }

    yc2_AttributeFilterList = tFilter;
    if (yc2_AttributeFilterList === '')
    {
      loadClientCatalogs('1','S',yc2_UserClient);
      return;
    }
  }
  else if (yc2_CatID == "2")
  {
    yc2_AttributeFilterList = '';
    yc2_AttributeFilterListDesc = '';

    var excludeCategory = 0;
    var z=0;
    for (z=0;z<aUsedFilters.length;z++)
    {
      if (id.indexOf('_') === -1)
        {}
      else
      {
        var aTemp = id.split("_");
        id = aTemp[1];
      }

      var aFilterPart = id.split(":");

      // alert ('toggleESearchFilterOff: id='+id+' aUsedFilters['+z+']='+aUsedFilters[z]);

      if (id == aUsedFilters[z])
      {
        if (aFilterPart[0] == 'Category')
        {
          excludeCategory = 1;
        }
      }
      else if (!((excludeCategory)&&(aFilterPart[0] == 'Category')))
      {
        if (yc2_AttributeFilterList === '')
        {
          yc2_AttributeFilterList = aUsedFilters[z];
          yc2_AttributeFilterListDesc = aUsedFiltersDesc[z];
        }
        else
        {
          yc2_AttributeFilterList += '~'+aUsedFilters[z];
          yc2_AttributeFilterListDesc += '~'+aUsedFiltersDesc[z];
        }
      }
    }

    // alert ('toggleESearchFilterOff : id('+id+') AppliedFilterList='+AppliedFilterList);
    // alert ('toggleESearchFilterOff : id('+id+') yc2_AttributeFilterList='+yc2_AttributeFilterList);

    var aUsedApplied = AppliedFilterList.split("||");
    AppliedFilterList = '';
    yc2_AttributeFilterList = '';
    // AppliedFilterList += filterDesc+'~~'+aFilterID[0]+'~~0^^'+aValueDesc[0]+'~~'+id+'~~0';

    if (id.indexOf('_') === -1)
      {}
    else
    {
      var aTemp2 = id.split("_");
      id = aTemp2[1];
    }

    for (i=0;i<aUsedApplied.length;i++)
    {
      var aFP = aUsedApplied[i].split("^^");
      var aParts = aFP[0].split("~~");
      var aParts2 = aFP[1].split("~~");

      if (id == aParts[1])
      {
      }
      else
      {
        if (AppliedFilterList !== '')
        {
          AppliedFilterList += '||';
          yc2_AttributeFilterList += '~';
        }

        yc2_AttributeFilterList += aParts2[1];
        AppliedFilterList += aUsedApplied[i];
      }
    }
  }
  else
  {
    aIDPart = [];
    aIDPart = id.split("_");

    if (AppliedFilterList !== '')
    {
      var NewApplied = '';
      var aFProps = AppliedFilterList.split("||");
      var iFP = 0;
      for (iFP=0;iFP<aFProps.length;iFP++)
      {
        var aFPropPair = aFProps[iFP].split("^^");
        var aFilterInfo = aFPropPair[0].split("~~");
        var aPropInfo = aFPropPair[1].split("~~");

        if ((aFilterInfo[1] == aIDPart[0])&&(aPropInfo[1] == aIDPart[1]+'_'+aIDPart[2]))
        {

        }
        else
        {
          NewApplied += (NewApplied === '') ? aFProps[iFP] : '||'+aFProps[iFP];
        }
      }

      AppliedFilterList = NewApplied;
      yc2_AttributeFilterList = NewApplied;
      yc2_AttributeFilterList = (yc2_AttributeFilterList === '') ? ' ' : yc2_AttributeFilterList;
    }
  }

  goSearch(1);
}

function toggleESearchFilterValue(id)
{
  var i=0;

  var aFilterID = id.split("_");
  var filterDesc = '';
  var aUsedApplied = [];
  var aFP = [];
  var aParts2 = [];

  id = (typeof aFilterID[2] === 'undefined') ? id : aFilterID[0] + '_' + aFilterID[1];

  var ESearchFilter = document.getElementById("ESearchFilter"+aFilterID[0]);
  if (ESearchFilter)
  {
    filterDesc = ESearchFilter.textContent;
  }

  var ESearchFilterValue = document.getElementById("ESearchFilterValue"+id);
  if (ESearchFilterValue)
  {
    var valueDesc = ESearchFilterValue.innerHTML;
    var aValueDesc = valueDesc.split("(");

    // Category~~1~~0^^Office Supplies~~Category:4294594022~~3||Brand~~2~~0^^Advantus &reg~~Brand:4294027029~~3||Green~~3~~0^^Y~~ItemIndicator:4294785535~~3
    if (yc2_CatID == "2")
    {
      //toggleESearchFilterValue : id=2_Attribute:33113319%3D%3D1535740 yc2_AttributeFilterList=4_Attribute:3311122%3D%3D58~4_Attribute:3311122%3D%3D58

      if (AppliedFilterList !== '')
      {
        AppliedFilterList += '||';
      }

      // 2_Attribute:331100%3D%3D1543832
      // ESearchFilterValue2_Attribute:331100%3D%3D1543832
      AppliedFilterList += filterDesc+'~~'+aFilterID[0]+'~~0^^'+aValueDesc[0]+'~~'+id+'~~0';

      aUsedApplied = AppliedFilterList.split("||");
      AppliedFilterList = '';
      yc2_AttributeFilterList = '';

      for (i=0;i<aUsedApplied.length;i++)
      {
        aFP = aUsedApplied[i].split("^^");
        aParts2 = aFP[1].split("~~");

        if (AppliedFilterList !== '')
        {
          AppliedFilterList += '||';
        }

        if (yc2_AttributeFilterList !== '')
        {
          yc2_AttributeFilterList += '~';
        }

        yc2_AttributeFilterList += aParts2[1];
        AppliedFilterList += aUsedApplied[i];
      }
    }
    else if (yc2_CatID == "1") // USSCO
    {
      var aFilterIDPart = aFilterID[1].split(":");

      var iSeq = 1;
      if (aFilterIDPart[0] == 'Category')
      {
        var aAttFilterList = yc2_AttributeFilterList.split("~");

        for (i=0;i<aAttFilterList.length;i++)
        {
          var aAttFilterListPart = aAttFilterList[i].split(":");
          var aAttFilterListTypePart = aAttFilterListPart[0].split("_");
          if (aAttFilterListTypePart[1] == 'Category')
          {
            if (aAttFilterListTypePart[0] > iSeq)
            {
              iSeq = aAttFilterListTypePart[0];
            }
          }
        }

        iSeq++;
        id = iSeq+'_'+aFilterID[1];
      }

      if (yc2_AttributeFilterList === '')
      {
        yc2_AttributeFilterList = id;
        yc2_AttributeFilterListDesc = filterDesc+'^'+aValueDesc[0];
      }
      else
      {
        yc2_AttributeFilterList += '~'+id;
        yc2_AttributeFilterListDesc += '~'+filterDesc+'^'+aValueDesc[0];
      }
    }
    else
    {
      AppliedFilterList += (AppliedFilterList !== '') ? '||' : '';

      AppliedFilterList += (typeof aFilterID[2] === 'undefined') ? filterDesc+'~~'+aFilterID[0]+'~~0^^'+aValueDesc[0]+'~~'+id+'~~0' : filterDesc+'~~'+aFilterID[0]+'~~0^^'+aValueDesc[0]+'~~'+aFilterID[0]+'_'+aFilterID[1]+'~~0~~'+aFilterID[2];
      // AppliedFilterList += filterDesc+'~~'+aFilterID[0]+'~~0^^'+aValueDesc[0]+'~~'+id+'~~0';

      aUsedApplied = AppliedFilterList.split("||");
      AppliedFilterList = '';
      yc2_AttributeFilterList = '';

      for (i=0;i<aUsedApplied.length;i++)
      {
        aFP = aUsedApplied[i].split("^^");
        aParts2 = aFP[1].split("~~");

        if (AppliedFilterList !== '')
        {
          AppliedFilterList += '||';
        }

        if (yc2_AttributeFilterList !== '')
        {
          yc2_AttributeFilterList += '~';
        }

        yc2_AttributeFilterList += aParts2[1];
        AppliedFilterList += aUsedApplied[i];
      }
    }

    goSearch(1,'');
  }
}

function displayEnhancedSearch(isOn)
{
  var i=0;
  var j=0;
  var img1 = '';
  var span1 = '';
  var fONC = '';
  var divCatalogNode = '';
  var divFilterValue = '';
  var divFilterHd = '';
  var ESearchNode = '';

  if (isOn)
  {
    if ((yc2_CatID == "2")||(yc2_CatID == "1")||((yc2_CatID == "1000")&&((SearchFilterList !== '')||(AppliedFilterList !== ''))))
    {
      if (yc2_CatID == "1")
      {
        yc2_AttributeFilterList = '';
      }

      divCatalogNode = document.getElementById("CatalogNode");
      if (divCatalogNode)
      {
        ESearchNode = document.getElementById("ESearchNode");
        if (ESearchNode)
        {
          divCatalogNode.removeChild(ESearchNode);
        }

        var divESearchNode = document.createElement('div');
        divESearchNode.setAttribute("id","ESearchNode");
        divESearchNode.setAttribute("class","ESearchTitle");

        // var aUID = [];

        var aAppliedFilter = AppliedFilterList.split("||");
        if ((AppliedFilterList !== '')&&(aAppliedFilter.length > 0))
        {
          var divESearchNodeTitle2 = document.createElement('div');
          divESearchNodeTitle2.setAttribute("id","ESearchNodeTitle2");
          divESearchNodeTitle2.setAttribute("class","ESearchTitle");
          divESearchNodeTitle2.innerHTML = "Selected Features";
          divESearchNode.appendChild(divESearchNodeTitle2);

          var tFilterID = '';

          for (i=0;i<aAppliedFilter.length;i++)
          {
            var aSubFilter = aAppliedFilter[i].split("^^");

            for (j=0;j<aSubFilter.length;j++)
            {
              var aPartFilter = aSubFilter[j].split("~~");
              var pattern = /qncl/;

              if (!pattern.test(aPartFilter[0]))
              {
                if (j === 0)
                {
                  tFilterID = aPartFilter[1];
                  divFilterHd = document.createElement('div');
                  divFilterHd.setAttribute("id","ESearchUsed"+aPartFilter[1]);
                  divFilterHd.setAttribute("class","ESearchFilterHd");
                  divFilterHd.innerHTML = aPartFilter[0];
                  divESearchNode.appendChild(divFilterHd);
                }
                else
                {
                  if (yc2_AttributeFilterList === '')
                  {
                    yc2_AttributeFilterList = aPartFilter[1];
                    // yc2_AttributeFilterListDesc = filterDesc+'^'+aValueDesc[0];
                    yc2_AttributeFilterListDesc = aPartFilter[0]+'^'+aPartFilter[0];
                  }
                  else
                  {
                    yc2_AttributeFilterList += '~'+aPartFilter[1];
                    yc2_AttributeFilterListDesc += '~'+aPartFilter[0]+'^'+aPartFilter[0];
                  }

                  divFilterValue = document.createElement('div');
                  divFilterValue.setAttribute("id","ESearchUsedValue"+tFilterID+'_'+aPartFilter[1]);
                  divFilterValue.setAttribute("class","ESearchFilterValue");
                  divFilterValue.style.padding = '2px 2px 2px 5px';

                  fONC = "toggleESearchFilterOff('"+tFilterID+'_'+aPartFilter[1]+"')";
                  divFilterValue.onclick = new Function (fONC);

                  img1 = document.createElement('img');
                  img1.setAttribute("src",'./qn_images/exit.gif');
                  img1.style.cursor = "pointer";
                  img1.style.border = "1px #cccccc solid";
                  img1.style.marginRight = "5px";

                  span1 = document.createElement('span');
                  span1.innerHTML = aPartFilter[0];

                  divFilterValue.appendChild(img1);
                  divFilterValue.appendChild(span1);
                  divESearchNode.appendChild(divFilterValue);
                }
              }
            }
          }
        }

        var divESearchNodeTitle = document.createElement('div');
        divESearchNodeTitle.setAttribute("id","ESearchNodeTitle1");
        divESearchNodeTitle.setAttribute("class","ESearchTitle");
        divESearchNodeTitle.innerHTML = yc2_SearchByFeatureTitle; //Search By Feature
        divESearchNode.appendChild(divESearchNodeTitle);

        var aFilter = SearchFilterList.split("||");

        for (i=0;i<aFilter.length;i++)
        {
          var isFilterOk = 0;
          divFilterHd = document.createElement('div');
          var divFilterDetail = document.createElement('div');
          if (divFilterHd && divFilterDetail)
          {
            var FilterID = '';
            var aRec = aFilter[i].split("^^");

            for (j=0;j<aRec.length;j++)
            {
              var aVal = aRec[j].split("~~");

              // if (aUID.indexOf(aVal[1].toString()) < 0)
              if (1)
              {
                if (j === 0)
                {
                  isFilterOk = 1;
                  FilterID = aVal[1];
                  divFilterHd.setAttribute("id","ESearchFilter"+aVal[1]);
                  divFilterHd.setAttribute("class","ESearchFilterHd");

                  fONC = "toggleESearchFilter('"+aVal[1]+"')";
                  divFilterHd.onclick = new Function (fONC);

                  img1 = document.createElement('img');
                  img1.setAttribute("id","ESearchFilterImg"+aVal[1]);
                  img1.setAttribute("src",yc2_menu1_collapse);
                  img1.style.cursor = "pointer";

                  span1 = document.createElement('span');
                  span1.innerHTML = aVal[0];

                  divFilterHd.appendChild(img1);
                  divFilterHd.appendChild(span1);

                  divFilterDetail.setAttribute("id","ESearchFilterDetail"+aVal[1]);
                  divFilterDetail.setAttribute("class","ESearchFilterDetail");
                }
                else
                {
                  divFilterValue = document.createElement('div');
                  if (divFilterValue)
                  {
                    divFilterValue.setAttribute("id","ESearchFilterValue"+FilterID+'_'+aVal[1]);
                    divFilterValue.setAttribute("class","ESearchFilterValue");
                    divFilterValue.innerHTML = (aVal[2] > 0) ? aVal[0]+' ('+aVal[2]+')' : aVal[0];

                    fONC = (typeof aVal[3] === 'undefined') ? "toggleESearchFilterValue('"+FilterID+'_'+aVal[1]+"')" : "toggleESearchFilterValue('"+FilterID+'_'+aVal[1]+'_'+aVal[3]+"')";
                    divFilterValue.onclick = new Function (fONC);

                    divFilterDetail.appendChild(divFilterValue);
                  }
                }
              }
            }

            if (isFilterOk)
            {
              divESearchNode.appendChild(divFilterHd);
              divESearchNode.appendChild(divFilterDetail);
            }
          }
        }

        if (divCatalogNode.firstChild)
        {
          divCatalogNode.insertBefore(divESearchNode,divCatalogNode.firstChild);
        }
        else
        {
          divCatalogNode.appendChild(divESearchNode);
        }
      }
    }
  }
  else
  {
    if ((yc2_CatID == "2")||(yc2_CatID == "1000"))
    {
      yc2_AttributeFilterList = '';
      divCatalogNode = document.getElementById("CatalogNode");
      if (divCatalogNode)
      {
        ESearchNode = document.getElementById("ESearchNode");
        if (ESearchNode)
        {
          divCatalogNode.removeChild(ESearchNode);
        }
      }
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

  return [curleft,curtop];
}

function get_nextsibling(n)
{
  var x = n.nextSibling;
  if (x)
  {
    while (x.nodeType!=1)
    {
      x=x.nextSibling;
    }
  }

  return x;
}

// --------------------------------------------------------
function getKeyText (e)
{
  var code = '';

  if (!e)
    { e = window.event; }

  if (e.keyCode)
  {
    code = e.keyCode;
  }
  else if (e.which)
  {
    code = e.which;
  }

  if (code == 13)
  {
    var oFieldHint = document.getElementById("Field_Hint");
    if (oFieldHint)
    {
      if (oFieldHint.style.display == "none")
      {
        goSearch();
      }
      else
      {
        var iLoop = 1;
        var iCnt = 0;
        while(iLoop)
        {
          var li = document.getElementById("TA_"+iCnt);
          if (li)
          {
            if (li.className == 'TA_Keyword selected')
            {
              var txt = li.textContent || li.innerText;
              goSearch(0,txt);
              iLoop = 0;
            }
            else
            {
              iCnt++;
            }
          }
          else
          {
            iLoop = 0;
          }
        }
      }
    }
    else
    {
      goSearch();
    }
  }
}

// --------------------------------------------------------
function getStyleValue (strStyle, attrib)
{
  var aStyle = strStyle.split(";");
  var i=0;
  for (i=0;i<aStyle.length;i++)
  {
    var aPair = aStyle[i].split(":");
    if (aPair[0] == attrib)
    {
      return (aPair[1]);
    }
  }

  return ("");
}

function goEnhancedSearch ()
{
}

function goSearch (override,searchstr)
{
  var ESearchNode;
  var endRootNode;
  var divCatalogNode = '';
  var i = 0;
  var aR = [];

  if (searchstr === undefined)
  {
    searchstr = '';
  }

  var SearchKeyWord = 0;
  var SearchShort = 0;
  var SearchLong = 0;

  SearchItemList = '';
  SearchFilterList = '';

  oSearchKeyWord = document.getElementById('cbSearchKeyWord');
  if (oSearchKeyWord)
  {
    if (oSearchKeyWord.checked === true)
    {
      SearchKeyWord = 1;
    }
  }
  oSearchShort = document.getElementById('cbSearchShort');
  if (oSearchShort)
  {
    if (oSearchShort.checked === true)
    {
      SearchShort = 1;
    }
  }
  oSearchLong = document.getElementById('cbSearchLong');
  if (oSearchLong)
  {
    if (oSearchLong.checked === true)
    {
      SearchLong = 1;
    }
  }

  // default
  SearchKeyWord = 1;
  SearchShort = 1;

  var PreviousSearch = currentSearch;

  var oSearch = document.getElementById("SEARCH");
  if (oSearch)
  {
    if (searchstr !== '')
    {
      currentSearch = searchstr;
    }
    else
    {
      currentSearch = oSearch.value;
    }

    if (currentSearch == 'Keyword or Item #')
    {
      currentSearch = '';
    }

    //alert ("PreviousSearch="+PreviousSearch+" currentSearch="+currentSearch);
    if ((yc2_CatID == '1')&&(yc2_UseUsscoSmartSearch == 1))
    {
      oSearch.value = '';
      if (currentSearch !== '')
      {
        // alert('currentSearch='+currentSearch);
        divCatalogNode = document.getElementById("CatalogNode");
        if (divCatalogNode)
        {
          ESearchNode = document.getElementById("ESearchNode");
          if (ESearchNode)
          {
            divCatalogNode.removeChild(ESearchNode);
          }
        }
        yc2_CategoryFilterList = '';
        yc2_AttributeFilterList = '';
        yc2_AttributeFilterListDesc = '';
        SearchItemList = "";
        SearchFilterList = "";
      }
    }
    else
    {
      if (PreviousSearch.toLowerCase() != currentSearch.toLowerCase())
      {
        PagePos = 1;
        RecOffset = 0;

        divCatalogNode = document.getElementById("CatalogNode");
        if (divCatalogNode)
        {
          ESearchNode = document.getElementById("ESearchNode");
          if (ESearchNode)
          {
            divCatalogNode.removeChild(ESearchNode);
          }
        }
        yc2_CategoryFilterList = '';
        yc2_AttributeFilterList = '';
        yc2_AttributeFilterListDesc = '';
        AppliedFilterList = "";
        SearchItemList = "";
        SearchFilterList = "";
      }
    }
  }

  var oDivAdvSearch = document.getElementById("divAdvSearch");
  if (oDivAdvSearch)
  {
    oDivAdvSearch.style.display = "none";
  }

  if (currentSearch == 'Keyword or Item #')
  {
    currentSearch = '';
  }

  if ((currentSearch !== '')||(yc2_AttributeFilterList !== '')||(override == 1))
  {
    var oRootNode = document.getElementById("rootNode");
    if (oRootNode)
    {
      if ( (yc2_CatID == '2')||((yc2_CatID == '1')&&(yc2_UseUsscoSmartSearch))||((yc2_CatID == '1000')&&(yc2_AttributeFilterList !== '')&&(PreviousSearch == currentSearch)) )
      {
      }
      else
      {
        endRootNode = document.getElementById('endRootNode');
        if (endRootNode)
        {
          endRootNode.style.display = "block";
        }

        stripNodes (oRootNode);
      }

      startItemIndicator(yc2_loadingItems);

      SearchItemList = '';
      SearchFilterList = '';

      sortby = 'KR';

      if (((yc2_CatID == '1')&&(yc2_UseUsscoSmartSearch == 1))||(yc2_CatID == '2'))
      {
        var aCL = yc2_CategoryFilterList.split(" ");
        if (aCL[0] === undefined)
        {
          aCL[0] = '';
        }
        if (aCL[1] === undefined)
        {
          aCL[1] = '';
        }
        if (aCL[2] === undefined)
        {
          aCL[2] = '';
        }

        if ((currentSearch === '')&&(yc2_CategoryFilterList == 'CONTRACT'))
        {
          aCL[0] = yc2_CategoryFilterList;
        }

        // alert('loadItemsOnlyProcess('+yc2_CCat+','+aCL[0]+','+aCL[1]+','+aCL[2]+',\'\',\'\',\' \')');
        loadItemsOnlyProcess(yc2_CCat,aCL[0],aCL[1],aCL[2],'','',' ');
      }
      else if (yc2_CatType == "S")
      {
        initSearch = 1;
        var ts = new Date();

        // alert("goSearch:parameters="+'DIST='+yc2_dist+'&UserID='+yc2_UserID+'&Client='+yc2_UserClient+'&CatType='+yc2_CatType+'&CatID='+yc2_CatID+'&CCat='+yc2_CCat+'&ShipTo='+yc2_ShipTo+'&Level1=&Level2=&Level3=&OrderBy=&RecOffset=0&PerPage=500&RetailStore='+yc2_RetailStore+'&SearchString='+currentSearch+'&hasSearchKeyWord=1&hasSearchShort=0&hasSearchLong=0&vcDBName='+yc2_vcDBName+'&ts='+ts.getTime());

        var ajaxParams = 'DIST='+yc2_dist+'&UserID='+yc2_UserID+'&WsID='+yc2_WsID+'&Client='+yc2_UserClient+'&CatType='+yc2_CatType+'&CatID='+yc2_CatID+
          '&CCat='+yc2_CCat+'&ShipTo='+yc2_ShipTo+'&Level1=&Level2=&Level3=&OrderBy=&RecOffset=0&PerPage='+PerPage+'&RetailStore='+yc2_RetailStore+
          '&SearchString='+escape(HTMLEncode(currentSearch))+'&hasSearchKeyWord=1&hasSearchShort='+SearchShort+'&hasSearchLong='+SearchLong+
          '&vcDBName='+yc2_vcDBName+'&SearchFilters='+yc2_AttributeFilterList+'&ts='+ts.getTime();

        new Ajax.Request('qn-load-items.pl',
        {
          method:'post',
          parameters:ajaxParams,
          onSuccess: function(catreturn)
          {
            var response = catreturn.responseText || "";
            //alert("response="+response);
            if (response === '')
            {
              stopItemIndicator();

              if (currentSearch !== '')
              {
                initSearch = 0;
                alert (strToPlainText(yc2_SearchAgain));
              }

              currentSearch = '';
            }

            if (yc2_CatID == '2')
            {
              aR = [];
              aR = response.split("||");
              for (i=0;i<aR.length;i++)
              {
                if (i === 0)
                {
                  catitemcount = aR[i];
                }
                else if (i == 1)
                {
                  SearchItemList = aR[i];
                }
                else
                {
                  if (SearchFilterList !== '')
                  {
                    SearchFilterList += '||';
                  }

                  SearchFilterList += aR[i];
                }
              }

              loadItemsOnlyProcess(yc2_CCat,'','','','',catitemcount,SearchItemList);
              displayEnhancedSearch(1);
            }
            else if ((yc2_CatID == "1")&&(yc2_UseUsscoSmartSearch))
            {
              aR = [];
              aR = response.split("||");
              for (i=0;i<aR.length;i++)
              {
                if (i === 0)
                {
                  SearchItemList = aR[i];
                }
                else
                {
                  if (SearchFilterList !== '')
                  {
                    SearchFilterList += '||';
                  }

                  SearchFilterList += aR[i];
                }
              }

              loadCategories(yc2_CCat,'','','',1);
              displayEnhancedSearch(1);
            }
            else
            {
              initSearch = 1;
              loadCategories(yc2_CCat,'','','',1);
            }
          },
          onFailure: function() {alert("Something went wrong loading items");}
        }); // End Ajax
      }
      else
      {
        if (yc2_CatID == "1049")
        {
          initSearch = 1;
          loadFavoriteCatalogs();
        }
        else
        {
          initSearch = 1;
          var divCurrentCatalog = document.getElementById('CAT~'+yc2_CCat+'~'+yc2_CatType+'~'+yc2_CatID+'~');
          if (divCurrentCatalog)
          {
            var jsonData = JSON.parse(jsonFilters);

            // if ((yc2_EnableFilters == 'Y')&&(PreviousSearch != currentSearch)) // New Search
            if ((PreviousSearch != currentSearch)) // New Search
            {
              jsonData['level1'] = '';
              jsonData['level2'] = '';
              jsonData['level3'] = '';
            }

            var level1 = (jsonData['level1'] !== '') ? jsonData['level1'] : '';
            var level2 = (jsonData['level2'] !== '') ? jsonData['level2'] : '';
            var level3 = (jsonData['level3'] !== '') ? jsonData['level3'] : '';

            loadCategories(yc2_CCat,level1,level2,level3,1);

            if ((yc2_AttributeFilterList !== '')&&(PreviousSearch == currentSearch))
            {
              loadItemsOnly(yc2_CCat,level1,level2,level3,'',last_catitemcount);
              yc2_AttributeFilterList = (yc2_AttributeFilterList === ' ') ? '' : yc2_AttributeFilterList;
            }
          }
          else
          {
            stopItemIndicator();
            if (endRootNode)
            {
              endRootNode.style.display = "none";
            }
          }
        }
      }
    }
  }
}

function hideItemDetail()
{
  hidePopup("divItemDetailPopup");
}

function hidePopup(PopUpID)
{
  qnHidePopup(PopUpID,"divBlockoutIDZZ");
}

// ------------------------------------------------------------------
function initializePage()
{
  if (typeof scw_SetZIndex == 'function')
  {
    scw_SetZIndex(12000); // Date Picker
  }

  startItemIndicator("Loading Catalog...");

  var buttonAddToFav = document.getElementById("buttonAddToFav");
  if (buttonAddToFav)
  {
    if (yc2_CatID == '1049')
    {
      buttonAddToFav.value="Remove from Favorites";
    }
    else
    {
      buttonAddToFav.value="Add to Favorites";
    }
  }

  if ((yc2_CCat !== "")&&(yc2_CatID != '1049'))
  {
    loadCatalogs('',1);
  }
  else
  {
    loadCatalogs();
  }

  if (yc2_CatID == '2')
  {
    // loadItemsOnlyProcess(yc2_CCat,'','','','','',' ');
  }
  else if (yc2_LoadItemID !== '')
  {
    var aStr = yc2_LoadItemID.split("||");

    if (aStr[4] == 'V')
    {
      aStr[1] = aStr[5];
      aStr[2] = aStr[5];
    }

    showItemDetail(aStr[0],aStr[1],aStr[2],aStr[3],aStr[4],aStr[5]);
    yc2_LoadItemID = '';
  }

  stopItemIndicator();
}

// ------------------------------------------------------------------
function loadFavorites()
{
  yc2_CatID = '1049';

  initializePage();
}

function loadBctItem(bct_username,bct_password,UserName,item,catclient,bct_height)
{
  var logoffurl = yc2_domain+'/cgi-bin/bct-cancel.cgi';
  logoffurl = URLEncode(logoffurl);
  var encUserName = URLEncode(UserName);

  var bctlink =
    "https://www.orderprinting.com/remote.asp?username="+bct_username+"&password="+bct_password+
    "&name="+encUserName+"&start=orderform&po=&memo1="+
    "&url="+yc2_domain+"/cgi-bin/qnet-punchout-bct-cart.cgi&"+
    "logoffurl="+logoffurl+"&layout="+item+"&topframe=no&Line1=&Line2=&Line3=&Line4=&Line5=&Line6=&"+
    "Line7=&Line8=&Line9=&Line10=&Line11=&Line12=&Line13=&Line14=&Line15=&Line16=&Line17=&Line18=&"+
    "Line19=&Line20=&Line21=&Line22=&Line23=&Line24=&Line25=&"+
    "displaygetshippingpage=Yes&displayOrderInfoTable=No&displayYourInfoTable=No&"+
    "displayShippingInfoTable=No&displayPostOrderConfirmation=No&displayCompanyInfoLink=No&"+
    "displayForShoppingCart=Yes&ud0="+yc2_UserID+"&ud1="+yc2_WsID+"&ud2="+yc2_dist+"&ud3="+catclient;

  // alert(bctlink);

  window.frames["iframeItemList"].location = bctlink;

  if (_collapseSideBarDefault == "YES")
  {
    if (!_collapseSideBar)
    {
      CollapseSideBar();
    }
  }

  bct_height = parseInt(bct_height);

  if (bct_height > 499)
  {
    setIFrameHeight(parseInt(bct_height));
  }
  else
  {
    setIFrameHeight('2000');
  }

  var iframeItemList = document.getElementById("iframeItemList");
  if (iframeItemList)
  {
    iframeItemList.style.minWidth = "998px";
  }
}

function loadQDesignItem(client,catclient,item,TID,vcDBName,VendorDuns,PriceID,DynamicEdit)
{
  startItemIndicator("Loading Item...");
  window.scroll(0,0);

  var qdesignlink =
    "qnet-imprint-form.cgi?DIST="+yc2_dist+"&WsID="+yc2_WsID+"&UserID="+yc2_UserID+"&ItemNum="+escape(item)+"&TID="+TID+
    "&CLIENT="+client+"&CCat="+catclient+"&CC="+yc2_UserCC+"&MgrMode=1010&LiveMode=Y&RFA=YourCatalog&"+
    "QDiFrame=Y&vcDBName="+vcDBName+"&vcID="+yc2_CatID+"&vcDuns="+VendorDuns+"&PriceID="+PriceID;

  //"QDiFrame=Y&vcDBName="+yc2_vcDBName+"&vcID="+yc2_CatID;

  if (DynamicEdit == 1)
  {
    //VendorDuns test 8615
    qdesignlink =
      "qdesign-builder.cgi?DIST="+yc2_dist+"&WsID="+yc2_WsID+"&UserID="+yc2_UserID+"&ItemID="+escape(item)+"&TID="+TID+
      "&vcDBName="+yc2_vcDBName+"&vcID="+yc2_CatID+"&Client="+client+"&CCat="+catclient+
      "&CatID="+yc2_CatID+"&CatType="+yc2_CatType+"&RetailStore="+yc2_RetailStore+"&vcDuns="+VendorDuns+"&PriceID="+PriceID;
  }

  //alert("qdesignlink="+qdesignlink);

  window.frames["iframeItemList"].location = qdesignlink;
}

function loadClientCatalogs(catid,cattype,ccat)
{
  // Clear on Catalog Load
  aLQ = [];
  AppliedFilterList = '';
  yc2_AttributeFilterList = '';

  var inputSearch = document.getElementById("SEARCH");
  if (inputSearch)
  {
    currentSearch = '';
    yc2_AttributeFilterList = '';
    yc2_AttributeFilterListDesc = '';
    inputSearch.value = '';
  }

  var oRootNode = document.getElementById("rootNode");
  if (oRootNode)
  {
    var endRootNode = document.getElementById('endRootNode');
    if (endRootNode)
    {
      endRootNode.style.display = "block";
    }

    stripNodes (oRootNode);
  }

  var buttonAddToFav = document.getElementById("buttonAddToFav");
  if (buttonAddToFav)
  {
    buttonAddToFav.value="Add to Favorites";
  }

  yc2_CatID = catid;
  yc2_CatType = cattype;
  yc2_Add_CatType = cattype;
  yc2_CCat = ccat;
  yc2_FavCat = '';

  setActiveCatalog (catid,cattype,ccat);

  var tID = 'CAH~'+ccat+'~'+cattype+'~'+catid+'~';
  var oText = document.getElementById(tID);
  if (oText)
  {
    var CategoryTitle = oText.value;

    var oCategoryTitle = document.getElementById("CategoryTitle");
    if (oCategoryTitle)
    {
      oCategoryTitle.innerHTML = CategoryTitle;
    }
  }

  loadCategories(ccat,'','','',1);
  loadItemsOnlyProcess(ccat,'','','','','',' ');

  stopItemIndicator();
}

function setActiveCatalog(catid,cattype,ccat)
{
  var divCatalogNode = document.getElementById('CatalogNode');
  var endRootNode = document.getElementById('endRootNode');
  var rootNode = document.getElementById('rootNode');
  var catNode = document.getElementById('CAT~'+ccat+'~'+cattype+'~'+catid+'~');

  if (catNode)
  {
    catNode.appendChild(rootNode);
    catNode.appendChild(endRootNode);

    if (divCatalogNode)
    {
      var ESearchNode = document.getElementById("ESearchNode");
      if (ESearchNode)
      {
        divCatalogNode.removeChild(ESearchNode);
      }

      if (yc2_LastCatalogObj)
      {
        if (yc2_LastCatalogBeforeObj)
        {
          divCatalogNode.insertBefore(yc2_LastCatalogObj,yc2_LastCatalogBeforeObj);
        }
        else
        {
          divCatalogNode.appendChild(yc2_LastCatalogObj);
        }
      }

      yc2_LastCatalogObj = catNode;
      if (catNode.nextSibling)
      {
        yc2_LastCatalogBeforeObj = catNode.nextSibling;
      }
      else
      {
        yc2_LastCatalogBeforeObj = 0;
      }

      if (divCatalogNode.firstChild)
      {
        divCatalogNode.insertBefore(catNode,divCatalogNode.firstChild);
      }
    }
  }

  window.scrollTo(0,0);
}

// ------------------------------------------------------------------
function loadFavoriteCatalogs()
{
  var endRootNode;
  var levelClass = 'yc2Level1';

  if (initSearch === 0)
  {
    var inputSearch = document.getElementById("SEARCH");
    if (inputSearch)
    {
      currentSearch = '';
      inputSearch.value = '';
    }
  }

  initSearch = 0;

  var oRootNode = document.getElementById("rootNode");
  if (oRootNode)
  {
    endRootNode = document.getElementById('endRootNode');
    if (endRootNode)
    {
      endRootNode.style.display = "block";
    }

    stripNodes (oRootNode);
  }

  var buttonAddToFav = document.getElementById("buttonAddToFav");
  if (buttonAddToFav)
  {
    buttonAddToFav.value="Remove from Favorites";
  }

  yc2_CatID = "1049";
  yc2_CatType = '';
  yc2_FavCat = '';

  setActiveCatalog (yc2_CatID,'O',yc2_UserClient);

  var totalCnt = 0;
  var ts = new Date();

  var tParam =
    'DIST='+yc2_dist+'&UserID='+yc2_UserID+'&CustID='+yc2_CustID+'&ShipTo='+yc2_ShipTo+'&Client='+yc2_UserClient+
    '&SearchString='+escape(HTMLEncode(currentSearch))+'&ts='+ts.getTime();

  new Ajax.Request('qn-load-favorites-catalogs.pl',
  {
    method: 'post',
    parameters: tParam,
    onSuccess: function(catreturn)
    {
      var response = catreturn.responseText || "";
      if (response !== '')
      {
        var rootNode = document.getElementById('rootNode');
        var favNode = document.getElementById('CAT~'+yc2_UserClient+'~O~1049~');
        favNode.appendChild(rootNode);

        var aCatRec = response.split("^^");
        var i=0;
        for (i=0;i<aCatRec.length;i++)
        {
          var aKey = [];
          var aCatParts = aCatRec[i].split("~");
          var j=0;
          for (j=0;j<aCatParts.length;j++)
          {
            var aKV = aCatParts[j].split("=");
            var z=0;
            for (z=2;z<aKV.length;z++)
            {
              aKV[1] += "="+aKV[z];
            }

            aKey[aKV[0]] = aKV[1];
          }

          //alert("type="+aKey["type"]+" len="+aCatRec.length+" yc2_menu1_li="+yc2_menu1_li+" yc2_menu1_a="+yc2_menu1_a);

          var divL = document.createElement('div');
          divL.setAttribute("id","FAV0~"+aKey["clientid"]+"~"+aKey["catclient"]+"~"+aKey["type"]+"~"+aKey["catnum"]);
          divL.setAttribute("class",levelClass);

          var newA = document.createElement('a');
          newA.setAttribute("id","BFAV0~"+aKey["clientid"]+"~"+aKey["catclient"]+"~"+aKey["type"]+"~"+aKey["catnum"]);
          newA.setAttribute("href","javascript:window.frames['iframeItemList'].resetPagePos();loadFavItems('"+yc2_CCat+"','','','','','"+aKey["catcnt"]+"','"+aKey["clientid"]+"~"+aKey["catclient"]+"~"+aKey["type"]+"~"+aKey["catnum"]+"');");

          if (aKey["catcnt"] > 0)
          {
            totalCnt += parseInt(aKey["catcnt"]);

            var img1 = document.createElement('img');
            img1.setAttribute("id","A0~"+aKey["clientid"]+"~"+aKey["catclient"]+"~"+aKey["type"]+"~"+aKey["catnum"]);
            img1.setAttribute("src",yc2_menu1_collapse);

            var fONC = 'window.frames["iframeItemList"].resetPagePos();loadFavoriteCategories(0,\''+aKey["clientid"]+"~"+aKey["catclient"]+"~"+aKey["type"]+"~"+aKey["catnum"]+'\',\'\',\'\',\'\')';
            img1.onclick = new Function (fONC);

            divL.appendChild(img1);

            // newA.innerHTML = aKey["name"]+" ("+aKey["catcnt"]+")";
            newA.innerHTML = aKey["name"];
          }
          else
          {
            var aText = document.createTextNode(aKey["name"]);
            newA.appendChild(aText);
          }

          divL.appendChild(newA);
          rootNode.appendChild(divL);
        }

        endRootNode = document.getElementById('endRootNode');
        if (endRootNode)
        {
          endRootNode.style.display = "none";
        }

        stopItemIndicator();
        loadItemsOnly(yc2_UserClient,'','','','',totalCnt);
      }
      else
      {
        endRootNode = document.getElementById('endRootNode');
        if (endRootNode)
        {
          endRootNode.style.display = "none";

        if (currentSearch !== '')
        {
          initSearch = 1;
          alert (strToPlainText(yc2_SearchAgain));
          currentSearch = '';
          loadFavoriteCatalogs();
        }

          stopItemIndicator();
        }

        stopItemIndicator();
      }
    },
    onFailure: function() {alert("Something went wrong loading favorites");}
  }); // End Ajax
}

// ------------------------------------------------------------------
function loadFavoriteCategories(loaditems,favcat,level1,level2,level3)
{
  var isGood;
  var x;
  var levelClass = '';

  var rootNode = document.getElementById('rootNode');
  if (rootNode)
  {
    var refLevel = '0';
    var refID = "FAV"+refLevel+"~"+favcat;
    var refaID = "A"+refLevel+"~"+favcat;
    var catLevel = '0';
    if (level1 === '')
    {
      catLevel = '1';
      refLevel = '0';
      refID = "FAV"+refLevel+"~"+favcat;
      refaID = "A"+refLevel+"~"+favcat;
    }
    else if (level2 === '')
    {
      catLevel = '2';
      refLevel = '1';
      refID = "FAV"+refLevel+"~"+level1;
      refaID = "A"+refLevel+"~"+level1;
    }
    else if (level3 === '')
    {
      catLevel = '3';
      refLevel = '2';
      refID = "FAV"+refLevel+"~"+level2;
      refaID = "A"+refLevel+"~"+level2;
    }
    else
    {
      catLevel = '4';
      refLevel = '3';
      refID = "FAV"+refLevel+"~"+level3;
      refaID = "A"+refLevel+"~"+level3;
    }

    var refNode = document.getElementById(refID);
    if (refNode)
    {
      // alert("refID="+refID+" refaID="+refaID+" loaditems="+loaditems+" favcat="+favcat+" level1="+level1+" level2="+level2+" level3="+level3);

      var do_create = 1;
      var img1 = document.getElementById(refaID);
      if (img1) // has sub categories
      {
        //alert("has sub categories")
        var nodeType = img1.src;
        if (nodeType.match(yc2_menu1_collapse)) // if collapsed then expand
        {
          img1.src = yc2_menu1_expand;
          if (refNode.nextSibling)
          {
            x = get_nextsibling(refNode);
            if (x.id.substr(0,4) == "FAV"+catLevel)
            {
              do_create = 0;
              isGood = 1;
              x = refNode;
              while (isGood)
              {
                isGood = 0;
                x = get_nextsibling(x);
                if (x.id.substr(0,3) == "FAV")
                {
                  if (x.id.substr(3,1) >= catLevel)
                  {
                    do_create = 0;
                    x.style.display = "block";

                    if (x.nextSibling)
                    {
                      isGood = 1;
                    }
                  }
                }
              }
            }
          }
        }
        else if ((nodeType.match(yc2_menu1_expand))&&(loaditems == '1'))
        {
          do_create = 0;
        }
        else if (loaditems != '1')
        {
          img1.src = yc2_menu1_collapse;

          if (refNode.nextSibling)
          {
            isGood = 1;
            x = refNode;
            while (isGood)
            {
              isGood = 0;

              x = get_nextsibling(x);
              if (x.id.substr(0,3) == "FAV")
              {
                if (x.id.substr(3,1) >= catLevel)
                {
                  do_create = 0;
                  x.style.display = "none";

                  if (x.nextSibling)
                  {
                    isGood = 1;
                  }
                }
              }
            }
          }
        }
      }

      if (do_create)
      {
        var ts = new Date();

        var tParam =
          'DIST='+yc2_dist+'&UserID='+yc2_UserID+'&CustID='+yc2_CustID+'&Client='+yc2_UserClient+'&ShipTo='+yc2_ShipTo+
          '&FavCat='+favcat+'&Level1='+level1+'&Level2='+level2+'&Level3='+level3+
          '&SearchString='+escape(HTMLEncode(currentSearch))+'&ts='+ts.getTime();

        new Ajax.Request('qn-load-favorites-catalogs.pl',
        {
          method:'post',
          parameters: tParam,
          onSuccess: function(catreturn)
          {
            var response = catreturn.responseText || "";

            if (response !== '')
            {
              var srcNode = document.getElementById(refID);
              if (srcNode)
              {
                var aCatRec = response.split("~");
                var i=0;
                for (i=0;i<aCatRec.length;i++)
                {
                  var aCatParts = aCatRec[i].split("^");

                  var catLevel1 = '';
                  var catLevel2 = '';
                  var catLevel3 = '';
                  var marginLeft = '';

                  if (level1 === '')
                  {
                    levelClass = 'yc2Level2';
                    catLevel1 = aCatParts[0];
                  }
                  else if (level2 === '')
                  {
                    levelClass = 'yc2Level3';
                    catLevel1 = level1;
                    catLevel2 = aCatParts[0];
                  }
                  else if (level3 === '')
                  {
                    levelClass = 'yc2Level3';
                    catLevel1 = level1;
                    catLevel2 = level2;
                    catLevel3 = aCatParts[0];
                    marginLeft = '10px';
                  }
                  else
                  {
                    levelClass = 'yc2Level3';
                    catLevel1 = level1;
                    catLevel2 = level2;
                    catLevel3 = level3;
                  }

                  tID = "FAV"+catLevel+"~"+aCatParts[0];
                  var divL = document.createElement('div');
                  divL.setAttribute("id",tID);
                  divL.setAttribute("class",levelClass);

                  var newA = document.createElement('a');
                  newA.setAttribute("id","B"+tID);
                  newA.setAttribute("href","javascript:loadFavItems('"+yc2_CCat+"','"+catLevel1+"','"+catLevel2+"','"+catLevel3+"','','"+aCatParts[2]+"','"+favcat+"');");

                  if (marginLeft !== '')
                  {
                    newA.style.marginLeft = marginLeft;
                  }

                  if (aCatParts[3] > 0)
                  {
                    var img1 = document.createElement('img');
                    img1.setAttribute("id","A"+catLevel+"~"+aCatParts[0]);
                    img1.setAttribute("src",yc2_menu1_collapse);
                    // img1.style.cursor = "pointer";

                    var fONC = 'loadFavoriteCategories(0,\''+favcat+'\',\''+catLevel1+'\',\''+catLevel2+'\',\''+catLevel3+'\')';
                    img1.onclick = new Function (fONC);

                    divL.appendChild(img1);

                    // newA.innerHTML = aCatParts[1]+" ("+aCatParts[2]+")";
                    newA.innerHTML = aCatParts[1];
                  }
                  else
                  {
                    // newA.innerHTML = aCatParts[1]+" ("+aCatParts[2]+")";
                    newA.innerHTML = aCatParts[1];
                  }

                  divL.appendChild(newA);
                  refNode.parentNode.insertBefore(divL,refNode.nextSibling);
                }
              }
            }
          },
          onFailure: function() {alert("Something went wrong loading favorites categories");}
        }); // End Ajax
      }
    }
  }
}

// ------------------------------------------------------------------
function loadFavItems(ccat,level1,level2,level3,sortby,catitemcount,favcat)
{
  yc2_FavCat = favcat;
  loadItemsOnly(ccat,level1,level2,level3,sortby,catitemcount);
//  loadFavoriteCategories('1',favcat,'','','');
  loadFavoriteCategories('1',favcat,level1,level2,level3);
}

// ------------------------------------------------------------------
function loadItems(ccat,level1,level2,level3,sortby,catitemcount)
{
  startItemIndicator(yc2_loadingItems);

  var jsonData = (jsonFilters !== '') ? JSON.parse(jsonFilters) : {};

  if (sortby === '')
  {
    sortby = last_sortby;
  }

  PagePos = 1;
  RecOffset = 0;

  if (yc2_CatID == "2")
  {
    initSearch = 0;
    currentSearch = '';
    var inputSearch = document.getElementById('SEARCH');
    if (inputSearch)
    {
      inputSearch.value = '';
    }

    displayEnhancedSearch(0);
    loadCategories(ccat,level1,level2,level3,1);
    // loadItemsOnly(ccat,level1,level2,level3,sortby,catitemcount);
    loadItemsOnlyProcess(ccat,level1,level2,level3,sortby,catitemcount,' ');
  }
  else if ((yc2_CatID == "1")&&(yc2_UseUsscoSmartSearch))
  {
    initSearch = 0;
    // if (level1 == 'CONTRACT')
    // {
    //   yc2_AttributeFilterList = '4_Contract:4293807835';
    // }

    if (level1 !== '')
    {
      if (yc2_AttributeFilterList === '')
      {
        yc2_AttributeFilterList = '1_Category:'+level1;
        yc2_AttributeFilterListDesc = '1_Category^'+level1;
      }
      else
      {
        yc2_AttributeFilterList = '~1_Category:'+level1;
        yc2_AttributeFilterListDesc = '~1_Category^'+level1;
      }
    }
    if (level2 !== '')
    {
      if (yc2_AttributeFilterList === '')
      {
        yc2_AttributeFilterList = '2_Category:'+level2;
        yc2_AttributeFilterListDesc = '2_Category^'+level2;
      }
      else
      {
        yc2_AttributeFilterList += '~2_Category:'+level2;
        yc2_AttributeFilterListDesc += '~2_Category^'+level2;
      }
    }
    if (level3 !== '')
    {
      if (yc2_AttributeFilterList === '')
      {
        yc2_AttributeFilterList = '3_Category:'+level3;
        yc2_AttributeFilterListDesc = '3_Category^'+level3;
      }
      else
      {
        yc2_AttributeFilterList += '~3_Category:'+level3;
        yc2_AttributeFilterListDesc += '~3_Category^'+level3;
      }
    }

    // goSearch(1,'');
    loadCategories(ccat,level1,level2,level3,1);
    loadItemsOnlyProcess(ccat,level1,level2,level3,sortby,catitemcount,' ');
  }
  else if (yc2_CatID == "1")
  {
    initSearch = 0;
    loadCategories(ccat,level1,level2,level3,1);
    loadItemsOnly(ccat,level1,level2,level3,sortby,catitemcount);
    // loadItemsOnlyProcess(ccat,level1,level2,level3,sortby,catitemcount,' ');
  }
  else if (yc2_CatID == "1049")
  {
    loadItemsOnly(ccat,level1,level2,level3,sortby,catitemcount);
  }
  else
  {
    if (AppliedFilterList !== '')
    {
      if ((level1 === '')||
          (jsonData['level1'] != level1)||
          ((level2 === '')&&(jsonData['level2'] != level2))||
          ((level3 === '')&&(jsonData['level3'] != level3))||
          ((level2 !== '')&&(jsonData['level2'] !== '')&&(jsonData['level2'] != level2))||
          ((level3 !== '')&&(jsonData['level3'] !== '')&&(jsonData['level3'] != level3)))
      {
        AppliedFilterList = '';

        // var oRootNode = document.getElementById("rootNode");
        // if (oRootNode)
        // {
        //   stripNodes (oRootNode);
        // }
      }
    }

    loadCategories(ccat,level1,level2,level3,1);
    loadItemsOnly(ccat,level1,level2,level3,sortby,catitemcount);
  }
}

// ------------------------------------------------------------------
function loadItemsOnly(ccat,level1,level2,level3,sortby,catitemcount)
{
  var CategoryTitle;
  var tID = '';
  var oText;
  var liCatID = '';
  var oLiCat;
  var oAppliedList = {};
  var jsonFilterData = (jsonFilters !== '') ? JSON.parse(jsonFilters) : {};

  if (yc2_CatID == "2")
  {
    return;
  }

  sortby = (sortby === '') ? last_sortby : sortby;

  last_ccat = ccat;
  last_level1 = level1;
  last_level2 = level2;
  last_level3 = level3;
  last_sortby = sortby;
  last_catitemcount = catitemcount;

  var CatLevel = level1;
  var CatLevelNum = 1;

  if (level3 !== "")
  {
    CatLevel = level3;
    CatLevelNum = 3;
  }
  else if (level2 !== "")
  {
    CatLevel = level2;
    CatLevelNum = 2;
  }

  if ((yc2_CatID == '1000')&&(AppliedFilterList !== ''))
  {
    var aFProps = AppliedFilterList.split("||");
    var iFP = 0;
    for (iFP=0;iFP<aFProps.length;iFP++)
    {
      var aFPropPair = aFProps[iFP].split("^^");
      var aFilterInfo = aFPropPair[0].split("~~");
      var aPropInfo = aFPropPair[1].split("~~");

      oAppliedList[aFilterInfo[0]] = aPropInfo[0]+'|'+aPropInfo[3];
    }
  }

  var divItems = document.getElementById("divItems");
  if (divItems)
  {
    stripNodes (divItems);

    var SearchItemNum = 1;
    var SearchKeyWord = 0;
    var SearchShort = 0;
    var SearchLong = 0;
    if (currentSearch !== '')
    {
      oSearchKeyWord = document.getElementById('cbSearchKeyWord');
      if (oSearchKeyWord)
      {
        if (oSearchKeyWord.checked === true)
        {
          SearchKeyWord = 1;
        }
      }
      oSearchShort = document.getElementById('cbSearchShort');
      if (oSearchShort)
      {
        if (oSearchShort.checked === true)
        {
          SearchShort = 1;
        }
      }
      oSearchLong = document.getElementById('cbSearchLong');
      if (oSearchLong)
      {
        if (oSearchLong.checked === true)
        {
          SearchLong = 1;
        }
      }
    }

    SearchKeyWord = 1;
    SearchShort = 1;

    var ts = new Date();
    var tParam =
      'DIST='+yc2_dist+'&UserID='+yc2_UserID+'&WsID='+yc2_WsID+'&Client='+yc2_UserClient+'&CatType='+yc2_CatType+'&CatID='+yc2_CatID+
      '&CCat='+yc2_CCat+'&ShipTo='+yc2_ShipTo+'&Level1='+level1+'&Level2='+level2+'&Level3='+level3+'&OrderBy='+sortby+
      '&RecOffset='+RecOffset+'&PerPage='+PerPage+'&RetailStore='+yc2_RetailStore+'&SearchString='+escape(HTMLEncode(currentSearch))+
      '&hasSearchKeyWord='+SearchKeyWord+'&hasSearchShort='+SearchShort+'&hasSearchLong='+SearchLong+
      '&vcDBName='+yc2_vcDBName+'&SearchItemList='+SearchItemList+'&FavCat='+yc2_FavCat+'&AppliedFilterList='+escape(JSON.stringify(oAppliedList))+
      '&ts='+ts.getTime();

    // alert ("loadItemsOnly:tParam="+tParam);

    new Ajax.Request('qn-load-items.pl',
    {
      method:'post',
      parameters: tParam,
      onSuccess: function(catreturn)
      {
        var response = catreturn.responseText || "";
        // alert("loadItemsOnly:response="+"\n"+response+"\n");
        if (response === '')
        {
          stopItemIndicator();
        }

        if (yc2_CatID == '2')
        {
          var aRec = response.split("||");
          catitemcount = aRec[0];
          response = aRec[1];
        }

        var oCategoryTitle = document.getElementById("CategoryTitle");
        if (oCategoryTitle)
        {
          if (yc2_CatID == '2')
          {
            liCatID = 'B'+CatLevelNum+'~'+CatLevel;
            oLiCat = document.getElementById(liCatID);
            if (oLiCat)
            {
              CategoryTitle = oLiCat.innerHTML;
              oCategoryTitle.innerHTML = CategoryTitle+" ("+catitemcount+")";
            }
          }
          else if (yc2_CatID == '1049')
          {
            if (yc2_FavCat === "")
            {
              tID = 'CAH~'+yc2_UserClient+'~O~'+yc2_CatID+'~';
              oText = document.getElementById(tID);
              if (oText)
              {
                CategoryTitle = oText.value;
                oCategoryTitle.innerHTML = CategoryTitle;
              }
            }
            else
            {
              if (level1 === "")
              {
                tID = 'BFAV0~'+yc2_FavCat;
                oText = document.getElementById(tID);
                if (oText)
                {
                  CategoryTitle = oText.innerHTML;
                  oCategoryTitle.innerHTML = CategoryTitle;
                }
              }
              else
              {
                tID = 'BFAV'+CatLevelNum+'~'+CatLevel;
                oText = document.getElementById(tID);
                if (oText)
                {
                  CategoryTitle = oText.innerHTML;
                  oCategoryTitle.innerHTML = CategoryTitle;
                }
              }
            }
          }
          else
          {
            liCatID = 'B'+CatLevelNum+'~'+CatLevel;
            oLiCat = document.getElementById(liCatID);
            if (oLiCat)
            {
              CategoryTitle = oLiCat.innerHTML;
              oCategoryTitle.innerHTML = CategoryTitle;
            }
          }
        }

        loadItemsOnlyProcess (ccat,level1,level2,level3,sortby,catitemcount,response);
      },
      onFailure: function() {alert("Something went wrong loading items");}
    }); // End Ajax
  }
}

// ------------------------------------------------------------------
function loadItemsOnlyProcess(ccat,level1,level2,level3,sortby,catitemcount,response)
{
  var tLink = '';
  var iframeItemList = document.getElementById("iframeItemList");

  if (response !== '')
  {
    if (level1 !== '')
    {
      yc2_CategoryFilterList = level1;
    }
    if (level2 !== '')
    {
      yc2_CategoryFilterList += ' '+level2;
    }
    if (level3 !== '')
    {
      yc2_CategoryFilterList += ' '+level3;
    }

    var useSearch = 0;
    if (currentSearch.length > 0)
    {
      useSearch = 1;
    }
    else
    {
      SearchItemList = '';
      SearchFilterList = '';
    }

    var frameOK = 'true';

    if (iframeItemList)
    {
      if (checkIframe(iframeItemList) === false)
      {
        frameOK = 'false';
      }

      if (frameOK === 'true')
      {
        if (typeof iframeItemList.contentWindow.loadItems == 'function')
          { }
        else
        {
          frameOK = 'false';
        }
      }
    }
    else
    {
      var divIFrameItemList = document.getElementById("divIFrameItemList");
      if (divIFrameItemList)
      {
        var iframeItems = document.createElement('iframe');
        iframeItems.setAttribute("id","iframeItemList");
        iframeItems.setAttribute("name","iframeItemList");
        iframeItems.setAttribute("frameborder","0");
        iframeItems.setAttribute("scrolling","NO");

        tLink =
          "iframe-item-list.cgi?DIST="+yc2_dist+"&WsID="+yc2_WsID+"&UserID="+yc2_UserID+"&CustID="+yc2_CustID+"&ItemList="+response+
          "&CCat="+ccat+"&Level1="+level1+"&Level2="+level2+"&Level3="+level3+"&ItemCnt="+catitemcount+
          "&RetailStore="+yc2_RetailStore+"&PagePos="+PagePos+"&PerPage="+PerPage+"&CatType="+yc2_CatType+"&CatID="+yc2_CatID+"&useSearch="+useSearch+
          "&vcDBName="+yc2_vcDBName+"&vcID="+yc2_CatID+"&SearchString="+escape(currentSearch)+"&SearchFilters"+yc2_AttributeFilterList+
          "&SID="+yc2_SID;

        iframeItems.setAttribute("src",tLink);
        iframeItems.style.width = '100%';
        iframeItems.style.height = '4000px';

        var fONLOAD = "parent.setIFrameSize()";
        iframeItems.onload = new Function (fONLOAD);

        divIFrameItemList.appendChild(iframeItems);
      }

      frameOK = 'new';
    }

    var divMainAdPage = document.getElementById("divMainAdPage");
    if (divMainAdPage)
    {
      divMainAdPage.parentNode.removeChild(divMainAdPage);
    }

    if (frameOK == 'false')
    {
      tLink =
        "iframe-item-list.cgi?DIST="+yc2_dist+"&WsID="+yc2_WsID+"&UserID="+yc2_UserID+"&CustID="+yc2_CustID+"&ItemList="+response+
        "&CCat="+ccat+"&Level1="+level1+"&Level2="+level2+"&Level3="+level3+"&ItemCnt="+catitemcount+
        "&RetailStore="+yc2_RetailStore+"&PagePos="+PagePos+"&PerPage="+PerPage+"&CatType="+yc2_CatType+"&CatID="+yc2_CatID+"&useSearch="+useSearch+
        "&vcDBName="+yc2_vcDBName+"&vcID="+yc2_CatID+"&SearchString="+escape(currentSearch)+"&SearchFilters"+yc2_AttributeFilterList+
        "&SID="+yc2_SID;

      window.frames["iframeItemList"].location = tLink;
    }
    else if (frameOK == 'new')
    {
    }
    else
    {
      if (catitemcount === '')
      {
        var iLevel = 0;
        var cLevel = '';
        if (level3 !== '')
        {
          iLevel = 3;
          cLevel = level3;
        }
        else if (level2 !== '')
        {
          iLevel = 2;
          cLevel = level2;
        }
        else if (level1 !== '')
        {
          iLevel = 1;
          cLevel = level1;
        }

        if (iLevel > 0)
        {
          var id = 'B'+iLevel+'~'+cLevel;
          oNode = document.getElementById(id);
          if (oNode)
          {
            var lastPos1 = oNode.innerHTML.lastIndexOf("(");
            var lastPos2 = oNode.innerHTML.lastIndexOf(")");
            lastPos1++;
            var lastLen = lastPos2 - lastPos1;
            var lastNum = oNode.innerHTML.substr(lastPos1,lastLen);

            catitemcount = parseInt(lastNum);
          }
        }
      }

      if (catitemcount < 1)
      {
        var aResults = response.split("^^");
        catitemcount = aResults.length;
        last_catitemcount = catitemcount;
      }

      iframeItemList.contentWindow.loadItems(response,ccat,level1,level2,level3,catitemcount,useSearch,yc2_CatID,currentSearch,yc2_AttributeFilterList,yc2_CatType);
    }
  }
  else
  {
    if (iframeItemList)
    {
      iframeItemList.parentNode.removeChild(iframeItemList);
    }
  }
}

// ------------------------------------------------------------------
function checkIframe(ifr)
{
  var key = new Date() + "" + Math.random();
  try
  {
    var global = ifr.contentWindow;
    global[key] = "asd";
    return global[key] === "asd";
  }
  catch( e )
  {
    return false;
  }
}

function mouseOutCategory(nodeID)
{
  var bcolor = '';
  var fcolor = '';
  var nodeA = '';
  var lastObj;

  var currentNode = document.getElementById(nodeID);
  if (currentNode)
  {
    var isCatalog = nodeID.substr(0,3);
    if (isCatalog == 'CAD')
    {
      bcolor = getStyleValue (yc2_menucat_mout, "backgroundColor");
      fcolor = getStyleValue (yc2_menucat_a, "color");

      lastObj = nodeID.substr(3);
      nodeA = document.getElementById('CAA'+lastObj);
    }
    else
    {
      lastObj = nodeID.substr(2);
      var currentLvl = nodeID.substr(2,1);
      nodeA = document.getElementById('B'+lastObj);

      if (currentLvl == '1')
      {
        bcolor = getStyleValue (yc2_menu1_mout, "backgroundColor");
        fcolor = getStyleValue (yc2_menu1_a, "color");
      }
      else if (currentLvl == '2')
      {
        bcolor = getStyleValue (yc2_menu2_mout, "backgroundColor");
        fcolor = getStyleValue (yc2_menu2_a, "color");
      }
      else if (currentLvl == '3')
      {
        bcolor = getStyleValue (yc2_menu3_mout, "backgroundColor");
        fcolor = getStyleValue (yc2_menu3_a, "color");
      }
    }

    if (bcolor !== '')
    {
      currentNode.style.backgroundColor = bcolor;
      nodeA.style.color = fcolor;
    }
  }
}

function mouseOutItemDiv(id)
{
  var currentNode = document.getElementById(id);
  if (currentNode)
  {
    currentNode.style.display = "none";
  }
}

function mouseOverCategory(nodeID)
{
  var bcolor = '';
  var fcolor = '';
  var nodeA = '';
  var lastObj;

  var currentNode = document.getElementById(nodeID);
  if (currentNode)
  {
    var isCatalog = nodeID.substr(0,3);
    if (isCatalog == 'CAD')
    {
      bcolor = getStyleValue (yc2_menucat_mover, "backgroundColor");
      fcolor = getStyleValue (yc2_menucat_mover, "color");

      lastObj = nodeID.substr(3);
      nodeA = document.getElementById('CAA'+lastObj);
    }
    else
    {
      lastObj = nodeID.substr(2);
      var currentLvl = nodeID.substr(2,1);
      nodeA = document.getElementById('B'+lastObj);

      if (currentLvl == '1')
      {
        bcolor = getStyleValue (yc2_menu1_mover, "backgroundColor");
        fcolor = getStyleValue (yc2_menu1_mover, "color");
      }
      else if (currentLvl == '2')
      {
        bcolor = getStyleValue (yc2_menu2_mover, "backgroundColor");
        fcolor = getStyleValue (yc2_menu2_mover, "color");
      }
      else if (currentLvl == '3')
      {
        bcolor = getStyleValue (yc2_menu3_mover, "backgroundColor");
        fcolor = getStyleValue (yc2_menu3_mover, "color");
      }
    }

    if (bcolor !== '')
    {
      currentNode.style.background = bcolor;
      nodeA.style.color = fcolor;
    }
  }
}

function mouseOverItemDiv(id)
{
  var currentNode = document.getElementById(id);
  if (currentNode)
  {
    currentNode.style.display = "block";
  }
}

function onclickSearch ()
{
  var oSEARCH = document.getElementById("SEARCH");
  if (oSEARCH)
  {
    if (oSEARCH.value == yc2_SearchHint) // 'Keyword or Item #'
    {
      oSEARCH.value='';
    }
  }
}

function padleft(val, ch, num)
{
  var re = new RegExp(".{" + num + "}\$");
  var pad = "";
  if (!ch) ch = " ";
  do
  {
    pad += ch;
  } while(pad.length < num);
  return re.exec(pad + val)[0];
}

function padright(val, ch, num)
{
  var re = new RegExp("^.{" + num + "}");
  var pad = "";
  if (!ch) ch = " ";
  do
  {
    pad += ch;
  } while (pad.length < num);
  return re.exec(val + pad)[0];
}

function popDisplayMoreInfo ()
{
  var oInfoDiv = document.getElementById("divMoreInfo");
  var oPropDiv = document.getElementById("divProperties");
  var oExDiv = document.getElementById("divExDesc");
  var oRelatedDiv = document.getElementById("divRelated");

  if (oPropDiv)
  {
    oPropDiv.style.display = "none";
  }
  if (oExDiv)
  {
    oExDiv.style.display = "none";
  }
  if (oInfoDiv)
  {
    oInfoDiv.style.display = "block";
  }
  if (oRelatedDiv)
  {
    oRelatedDiv.style.display = "none";
  }

  tabNotActive ("bPopViewTab");
  tabNotActive ("bPopPropTab");
  tabActive ("bPopInfoTab");
  tabNotActive ("bPopRelatedTab");
}

function popDisplayOverview ()
{
  var oInfoDiv = document.getElementById("divMoreInfo");
  var oPropDiv = document.getElementById("divProperties");
  var oExDiv = document.getElementById("divExDesc");
  var oRelatedDiv = document.getElementById("divRelated");

  if (oExDiv)
  {
    oExDiv.style.display = "block";
  }

  if (oPropDiv)
  {
    oPropDiv.style.display = "none";
  }

  if (oInfoDiv)
  {
    oInfoDiv.style.display = "none";
  }
  if (oRelatedDiv)
  {
    oRelatedDiv.style.display = "none";
  }

  tabActive ("bPopViewTab");
  tabNotActive ("bPopPropTab");
  tabNotActive ("bPopInfoTab");
  tabNotActive ("bPopRelatedTab");
}

function popDisplayProperties ()
{
  var oInfoDiv = document.getElementById("divMoreInfo");
  var oPropDiv = document.getElementById("divProperties");
  var oExDiv = document.getElementById("divExDesc");
  var oRelatedDiv = document.getElementById("divRelated");

  if (oPropDiv)
  {
    oPropDiv.style.display = "block";
  }

  if (oExDiv)
  {
    oExDiv.style.display = "none";
  }

  if (oInfoDiv)
  {
    oInfoDiv.style.display = "none";
  }
  if (oRelatedDiv)
  {
    oRelatedDiv.style.display = "none";
  }

  tabNotActive ("bPopViewTab");
  tabActive ("bPopPropTab");
  tabNotActive ("bPopInfoTab");
  tabNotActive ("bPopRelatedTab");
}

function popDisplayRelated ()
{
  var oInfoDiv = document.getElementById("divMoreInfo");
  var oPropDiv = document.getElementById("divProperties");
  var oExDiv = document.getElementById("divExDesc");
  var oRelatedDiv = document.getElementById("divRelated");

  if (oPropDiv)
  {
    oPropDiv.style.display = "none";
  }
  if (oExDiv)
  {
    oExDiv.style.display = "none";
  }
  if (oInfoDiv)
  {
    oInfoDiv.style.display = "none";
  }
  if (oRelatedDiv)
  {
    oRelatedDiv.style.display = "block";
  }

  tabNotActive ("bPopViewTab");
  tabNotActive ("bPopPropTab");
  tabNotActive ("bPopInfoTab");
  tabActive ("bPopRelatedTab");
}

function popupOriginalImage()
{
  var slash = '';
  var aSrc = [];
  var tFilename = '';
  var extension = '';

  var oImg = document.getElementById("imgPopPic");
  if (oImg)
  {
    var dot = '';
    var tSrc = oImg.src;
    if (tSrc.match("/thumbnails"))
    {
      aSrc = tSrc.split("/images/");
      slash = tSrc.lastIndexOf("/");
      tFilename = tSrc.substr(slash, tSrc.length);

      tSrc = aSrc[0] + '/images' + tFilename;
//      tSrc = tSrc.replace("/thumbnails","");

      dot = tSrc.lastIndexOf(".");
      if (dot == -1)
        {}
      else
      {
        extension = tSrc.substr(dot, tSrc.length);
        tSrc = tSrc.replace(extension,"");
      }
    }

    if (yc2_Add_CatID == '1')
    {
      aSrc = tSrc.split("/images/");
      slash = tSrc.lastIndexOf("/");
      tFilename = tSrc.substr(slash, tSrc.length);
      tSrc = 'http://content.oppictures.com/Master_Images/Master_Variants/Variant_500/' + tFilename;
    }
    else if (yc2_Add_CatID == '2')
    {
      tSrc = oImg.src;
    }

    dot = tSrc.lastIndexOf(".");
    if (dot != -1)
    {
      extension = tSrc.substr(dot, tSrc.length);
      if (extension.toLowerCase() == ".pdf")
      {
        window.open(tSrc,"ImagePopup","status=1,height=480,width=640,resizable=1");
      }
      else
      {
        window.open(tSrc,"ImagePopup","status=1,height=480,width=640,resizable=1");
      }
    }
  }
}

function priceTableOver(id,tcount)
{
  var i=0;
  for (i=0;i<tcount;i++)
  {
    var divBodyCol = document.getElementById('PriceTableCol'+i);
    if (divBodyCol)
    {
      var divBR1 = document.getElementById('PriceTableColH'+i);
      if (divBR1)
      {
        if (id == i)
        {
          divBodyCol.style.backgroundColor = yc2_PriceTableOverBg;
          divBodyCol.style.color = yc2_PriceTableOverColor;
          divBR1.style.backgroundColor = yc2_PriceTableOverBg;
          divBR1.style.color = yc2_PriceTableOverColor;
        }
        else
        {
          divBodyCol.style.backgroundColor = yc2_PriceTableBodyBg;
          divBodyCol.style.color = yc2_PriceTableBodyColor;
          divBR1.style.backgroundColor = yc2_PriceTableHeadBg;
          divBR1.style.color = yc2_PriceTableHeadColor;
        }
      }
    }
  }
}

function RefreshBCT()
{
  if (_collapseSideBar)
  {
    CollapseSideBar();
  }

  updateCartCount(1);
  loadItems (last_ccat,last_level1,last_level2,last_level3,last_sortby,last_catitemcount);
}

function RefreshCatalog(addCnt)
{
  updateCartCount(addCnt);
  loadItemsOnly (last_ccat,last_level1,last_level2,last_level3,last_sortby,last_catitemcount);
}

function reloadItems()
{
  loadItems(last_ccat,last_level1,last_level2,last_level3,last_sortby,last_catitemcount);
}

function resetIFrame()
{
//  alert ("resetIFrame");
  var divIFrameItemList = document.getElementById("divIFrameItemList");
  if (divIFrameItemList)
  {
    var iframeItemList = document.getElementById("iframeItemList");
    if (iframeItemList)
    {
      divIFrameItemList.appendChild(iframeItemList);
    }
  }
}

function setCatMode (ModeType) // ModeType (TABLE,LIST)
{
  var ts = new Date();
  new Ajax.Request('ajax-user-option.pl',
  {
    method:'post',
    parameters:'DIST='+yc2_dist+'&FA=SAVE&UserID='+yc2_UserID+'&CustID='+yc2_CustID+'&optKey=YourCatalog_CatalogMode&optValue='+ModeType+'&ts='+ts.getTime(),
    onSuccess: function(savecatmode)
    {
      var response = savecatmode.responseText;
      //alert("response="+response);

      document.fCatalog.CatMode.value=ModeType;
      document.fCatalog.submit();
    },
    onFailure: function() {alert("Something went wrong");}
  });
}

function setIFrameHeight(frameH)
{
  var iframeItemList = document.getElementById("iframeItemList");
  if (iframeItemList)
  {
//alert ("2 setIFrameHeight:frameH="+frameH);
    iframeItemList.style.height = frameH+"px";
  }
}

function setIFrameWidth(frameW)
{
  var iframeItemList = document.getElementById("iframeItemList");
  if (iframeItemList)
  {
    iframeItemList.style.width = frameW+"px";
  }
}

function showPopup(PopUpID)
{
  qnShowPopup(PopUpID,"divBlockoutIDZZ","middle");
}

function SortBy (tSort)
{
  document.fCatalog.ITEM_ID.value = "";

  if (tSort)
    {}
  else
  {
    var SortBox = document.getElementById("SortCombo");
    var tSortIndex = SortBox.selectedIndex;
    tSort = SortBox.options[tSortIndex].value;
  }

  //alert ("parent tSort="+tSort);
  document.fCatalog.OrderBy.value=tSort;
  document.fCatalog.PagePos.value="1";
  document.fCatalog.submit();
}

function startItemIndicator(tMessage)
{
  var IpopTop = '';
  var IpopLeft = '';

  var divItemIndicator = document.getElementById('divItemIndicator');
  if (divItemIndicator)
  {
    var divItemIndicatorText = document.getElementById('divItemIndicatorText');
    if (divItemIndicatorText)
    {
      if (tMessage === '')
      {
        tMessage = yc2_loadingItems;
      }

      divItemIndicatorText.innerHTML = tMessage;
    }

    if (document.getElementById && !document.all) // Detect FF
    {
      IpopTop = (window.innerHeight - divItemIndicator.offsetHeight)/2;
      IpopLeft = (window.innerWidth - divItemIndicator.offsetWidth)/2;

      var iL = (parseInt(IpopLeft) + parseInt(window.pageXOffset));
      var iT = (parseInt(IpopTop) + parseInt(window.pageYOffset));
      divItemIndicator.style.left = iL+"px";
      divItemIndicator.style.top = iT+"px";
    }
    else
    {
      IpopTop = ((document.documentElement.clientHeight - divItemIndicator.offsetHeight) / 2) + document.documentElement.scrollTop;
      IpopLeft = ((document.documentElement.clientWidth - divItemIndicator.offsetWidth) / 2) + document.documentElement.scrollLeft;
      divItemIndicator.style.left = IpopLeft + "px";
      divItemIndicator.style.top = IpopTop + "px";
    }

    divItemIndicator.style.display = "block";
  }
}

function stopItemIndicator()
{
  var divItemIndicator = document.getElementById('divItemIndicator');
  if (divItemIndicator)
  {
    divItemIndicator.style.display = "none";
  }
}

function stripNodes(oEle)
{
  if ( oEle.hasChildNodes() )
  {
    while ( oEle.childNodes.length >= 1 )
      { oEle.removeChild( oEle.firstChild ); }
  }
}

function tabActive (id)
{
  var bcolor = yc2_popupTabA_bgcolor;
  var bdcolor = yc2_popupTabA_bordercolor;
  var fcolor = yc2_popupTabA_color;

  var part1 = id+"1";
  var part1a = id+"1a";
  var part2 = id+"2";
  var part2a = id+"2a";
  var part3 = id+"3";
  var part4 = id+"4";
  var part5 = id+"5";
  var part6 = id+"6";
  // var part7 = id+"7";
  var partDiv = id+"Div";
  var partA = id+"A";

  var oPart1 = document.getElementById(part1);
  var oPart1a = document.getElementById(part1a);
  var oPart2 = document.getElementById(part2);
  var oPart2a = document.getElementById(part2a);
  var oPart3 = document.getElementById(part3);
  var oPart4 = document.getElementById(part4);
  var oPart5 = document.getElementById(part5);
  var oPart6 = document.getElementById(part6);
  var oPartDiv = document.getElementById(partDiv);
  var oPartA = document.getElementById(partA);

  oPart1.style.backgroundColor = bcolor;
  oPart1a.style.backgroundColor = bcolor;
  oPart2.style.backgroundColor = bcolor;
  oPart2a.style.backgroundColor = bcolor;
  oPart3.style.backgroundColor = bcolor;
  oPart4.style.backgroundColor = bcolor;
  oPart5.style.backgroundColor = bcolor;
  oPart6.style.backgroundColor = bcolor;
  oPartDiv.style.backgroundColor = bcolor;
  oPartA.style.backgroundColor = bcolor;

  oPart1.style.borderColor = bdcolor;
  oPart1a.style.borderColor = bdcolor;
  oPart2.style.borderColor = bdcolor;
  oPart2a.style.borderColor = bdcolor;
  oPart3.style.borderColor = bdcolor;
  oPart4.style.borderColor = bdcolor;
  oPart5.style.borderColor = bdcolor;
  oPart6.style.borderColor = bdcolor;

  oPartDiv.style.borderColor = bdcolor;

  oPartDiv.style.color = fcolor;
  oPartA.style.color = fcolor;
}

function tabNotActive (id)
{
  var bcolor = yc2_popupTabN_bgcolor;
  var bdcolor = yc2_popupTabN_bordercolor;
  var fcolor = yc2_popupTabN_color;

  var part1 = id+"1";
  var part1a = id+"1a";
  var part2 = id+"2";
  var part2a = id+"2a";
  var part3 = id+"3";
  var part4 = id+"4";
  var part5 = id+"5";
  var part6 = id+"6";
  var partDiv = id+"Div";
  var partA = id+"A";

  var oPart1 = document.getElementById(part1);
  var oPart1a = document.getElementById(part1a);
  var oPart2 = document.getElementById(part2);
  var oPart2a = document.getElementById(part2a);
  var oPart3 = document.getElementById(part3);
  var oPart4 = document.getElementById(part4);
  var oPart5 = document.getElementById(part5);
  var oPart6 = document.getElementById(part6);
  var oPartDiv = document.getElementById(partDiv);
  var oPartA = document.getElementById(partA);

  oPart1.style.backgroundColor = bcolor;
  oPart1a.style.backgroundColor = bcolor;
  oPart2.style.backgroundColor = bcolor;
  oPart2a.style.backgroundColor = bcolor;
  oPart3.style.backgroundColor = bcolor;
  oPart4.style.backgroundColor = bcolor;
  oPart5.style.backgroundColor = bcolor;
  oPart6.style.backgroundColor = bcolor;
  oPartDiv.style.backgroundColor = bcolor;
  oPartA.style.backgroundColor = bcolor;

  oPart1.style.borderColor = bdcolor;
  oPart1a.style.borderColor = bdcolor;
  oPart2.style.borderColor = bdcolor;
  oPart2a.style.borderColor = bdcolor;
  oPart3.style.borderColor = bdcolor;
  oPart4.style.borderColor = bdcolor;
  oPart5.style.borderColor = bdcolor;
  oPart6.style.borderColor = bdcolor;

  oPartDiv.style.borderColor = bdcolor;

  oPartDiv.style.color = fcolor;
  oPartA.style.color = fcolor;
}

function updateCartCount(incValue)
{
  var objCartCnt = document.getElementById("spanCartCnt");
  if (objCartCnt)
  {
    var cartCnt = objCartCnt.innerHTML;
    cartCnt = parseInt(cartCnt) + incValue;
    objCartCnt.innerHTML = cartCnt;
    var oCartCntDesc = document.getElementById("spanCartCntDesc");
    if (oCartCntDesc)
    {
      oCartCntDesc.style.display = "block";
    }
  }
}

function usePriceMatrix ()
{
  var oBoxPriceMatrix = document.getElementById("boxPriceMatrix");
  if (oBoxPriceMatrix)
  {

    var oDivItemDetailPopup = document.getElementById("divItemDetailPopup");
    var oDivAddArea = document.getElementById("divAddArea");
    var oDivAddAreaInner = document.getElementById("divAddAreaInner");
    var oDivMatrixInner = document.getElementById("divMatrixInner");
    var bPMAddToCart = document.getElementById("bPMAddToCart");
    var divSuggestedSell = document.getElementById("divSuggestedSell");

    if (oBoxPriceMatrix.checked)
    {
      if (itemHasAds === 0)
      {
        oDivItemDetailPopup.style.height = "575px";
      }
      else
      {
        oDivItemDetailPopup.style.height = "672px";
        if (divSuggestedSell)
        {
          divSuggestedSell.style.top = "497px";
        }
      }

      oDivAddArea.style.left = "5px";
      oDivAddArea.style.width = "585px";
      oDivAddArea.style.height = "192px";
      oDivMatrixInner.style.height = "162px";

      oDivMatrixInner.style.display = "block";
      oDivAddAreaInner.style.display = "none";

      if (bPMAddToCart)
      {
        if (yc2_viewonly)
          { bPMAddToCart.style.display = 'none'; }
        else
          { bPMAddToCart.style.display = 'block'; }
      }
    }
    else
    {
      if (itemHasAds === 0)
      {
        oDivItemDetailPopup.style.height = "400px";

        if (divSuggestedSell)
        {
          divSuggestedSell.style.top = "405px";
        }
      }
      else
      {
        oDivItemDetailPopup.style.height = "580px";
        if (divSuggestedSell)
        {
          divSuggestedSell.style.top = "405px";
        }
      }

      oDivAddArea.style.left = "231px";
      oDivAddArea.style.width = "360px";
      oDivAddArea.style.height = "100px";
      oDivMatrixInner.style.height = "70px";
      oDivMatrixInner.style.display = "none";
      oDivAddAreaInner.style.display = "block";

      if (bPMAddToCart)
      {
        bPMAddToCart.style.display = 'none';
      }
    }
  }
}

function usePriceTable (isOn)
{
  var oDivItemDetailPopup = document.getElementById("divItemDetailPopup");
  var oDivAddArea = document.getElementById("divAddArea");
  var oDivAddAreaInner = document.getElementById("divAddAreaInner");

  if (oDivAddArea)
  {
    if (isOn)
    {
      if (itemHasAds === 0)
      {
        oDivItemDetailPopup.style.height = "434px";
      }

      oDivAddArea.style.height = "126px";
      oDivAddAreaInner.style.height = "120px";
      oDivAddAreaInner.style.width = "581px";
      oDivAddArea.style.left = "5px";
      oDivAddArea.style.width = "585px";
    }
    else
    {
      oDivAddArea.style.height = "90px";
      oDivAddAreaInner.style.height = "84px";
      oDivAddArea.style.left = "231px";
      oDivAddAreaInner.style.width = "356px";
      oDivAddArea.style.width = "360px";
    }
  }

  var oDivPopShortDesc = document.getElementById("divPopShortDesc");
  if (oDivPopShortDesc)
  {
    if (AltImageCnt > 1)
    {
      oDivPopShortDesc.style.top = "309px";
      oDivPopShortDesc.style.height = "90px";
    }
    else
    {
      oDivPopShortDesc.style.top = "257px";
      oDivPopShortDesc.style.height = "142px";
    }
  }
}

function setFrameTitle (id,count)
{
  var oCategoryTitle = document.getElementById("CategoryTitle");
  if (oCategoryTitle)
  {
    var aID = id.split("|");
    if (aID[0] === 0)
    {
      if ((typeof count !== 'undefined')&&(count !== ''))
      {
        oCategoryTitle.innerHTML = aID[1]+" ("+count+")";
      }
      else
      {
        oCategoryTitle.innerHTML = aID[1];
      }
    }
    else
    {
      var liCatID = 'B'+aID[0]+'~'+aID[1];
      var oLiCat = document.getElementById(liCatID);
      if (oLiCat)
      {
        var CategoryTitle = oLiCat.innerHTML;

        if ((typeof count !== 'undefined')&&(count !== ''))
        {
          oCategoryTitle.innerHTML = CategoryTitle+" ("+count+")";
        }
        else
        {
          oCategoryTitle.innerHTML = CategoryTitle;
        }
      }
    }
  }
}

function showItemDetail(item,client,catclient,itemcnt,sid_CatType,sid_CatID)
{
  if (typeof UD_showItemDetail == 'function') { UD_showItemDetail(item,client,catclient,itemcnt,sid_CatType,sid_CatID); }
  if (typeof(sid_CatType) == "undefined") { sid_CatType = yc2_CatType; }
  if (typeof(sid_CatID) == "undefined") { sid_CatID = yc2_CatID; }

  yc2_Add_CatType = sid_CatType;
  yc2_Add_CatID = sid_CatID;

  detailItemIndex = itemcnt;
  detailItem = item;
  detailClient = client;
  detailCatClient = catclient;

  aDetailInput = [];

  enablePriceMatrix = 0;

  var quotItem = item.replace(/"/g, "&quot;");

  var oDiv = document.getElementById("divItemDetailPopup");
  if (oDiv)
  {
    var oImgWait = document.getElementById("imgPopPic");
    if (oImgWait)
    {
      oImgWait.src = "";
    }

    kit_LoadPopup (yc2_dist,yc2_UserID,yc2_WsID,client,catclient,item,sid_CatType,sid_CatID,yc2_RetailStore,yc2_vcDBName,yc2_domain,yc2_catalog_domain,itemcnt,yc2_CustID);
  }
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

// ------------------------------------------------------------------
function yc2_updatecount(incValue,lineIndex,canUpdateCartCount)
{
  window.frames["iframeItemList"].setCartCnt(lineIndex,incValue);

  if (parseInt(canUpdateCartCount) === 0)
  {
    updateCartCount(1);
  }
}

// ------------------------------------------------------------------
function initializeCategory()
{
  last_ccat = yc2_CCat;
  if (initLevel1 !== '')
  {
    initItemOnly = 1;
    last_level1 = initLevel1;
    initLevel1 = '';

    if (initLevel2 === '')
    {
      initItemOnly = 0;
      loadItems(yc2_CCat,last_level1,'','','','');
    }
    else
    {
      loadCategories(yc2_CCat,last_level1,'','');
    }
  }
  else if (initLevel2 !== '')
  {
    initItemOnly = 1;
    last_level2 = initLevel2;
    initLevel2 = '';

    if (initLevel2 === '')
    {
      initItemOnly = 0;
      loadItems(yc2_CCat,last_level1,last_level2,'','','');
    }
    else
    {
      loadCategories(yc2_CCat,last_level1,last_level2,'');
    }
  }
  else if (initLevel3 !== '')
  {
    initItemOnly = 1;
    last_level3 = initLevel3;
    initLevel3 = '';

    if (initLevel2 === '')
    {
      initItemOnly = 0;
      loadItems(yc2_CCat,last_level1,last_level2,last_level3,'','');
    }
    else
    {
      loadCategories(yc2_CCat,last_level1,last_level2,last_level3);
    }
  }
  else if (initItemOnly)
  {
    initItemOnly = 0;
    loadItemsOnly (last_ccat,last_level1,last_level2,last_level3,last_sortby,last_catitemcount);
  }
}

// ------------------------------------------------------------------
function createItemBlock(divItems,itemList)
{
  var tFunc = '';
  var aRec = itemList.split("^^");
  var itemID = aRec[0];
  var i=0;
  itemList = "";
  for (i=1;i<aRec.length;i++)
  {
    if (itemList === "")
    {
      itemList = aRec[i];
    }
    else
    {
      itemList += "^^"+aRec[i];
    }
  }

  var ts = new Date();
  new Ajax.Request('qn-get-item.pl',
  {
    method:'post',
    parameters:'DIST='+yc2_dist+'&UserID='+yc2_UserID+'&Client='+yc2_UserClient+'&CCat='+yc2_CCat+'&ItemID='+escape(itemID)+'&CatType='+yc2_CatType+'&CatID='+yc2_CatID+'&RetailStore='+yc2_RetailStore+'&vcDBName='+yc2_vcDBName+'&qnet_domain='+yc2_domain+'&qnet_catalog_domain='+yc2_catalog_domain+'&ts='+ts.getTime(),
    onSuccess: function(catreturn)
    {
      var response = catreturn.responseText || "";

      if (response !== '')
      {
        var aHash = [];
        var aCol = response.split("~~");
        var j=0;
        for (j=0;j<aCol.length;j++)
        {
          var aKV = aCol[j].split("||");
          aHash[aKV[0]] = aKV[1];
        }

        var newDiv = document.createElement('div');
        newDiv.setAttribute('id','divItem-'+i);
        newDiv.style.cssFloat = "left";
        newDiv.style.styleFloat = "left";
        newDiv.style.width = "150px";
        newDiv.style.height = "300px";
        newDiv.style.cursor = "pointer";
        newDiv.style.border = "black 1px solid";
        newDiv.style.margin = "1px 1px 1px 1px";

        tFunc = 'mouseOverItemDiv("divQL-'+itemID+'")';
        newDiv.onmouseover = new Function (tFunc);

        tFunc = 'mouseOutItemDiv("divQL-'+itemID+'")';
        newDiv.onmouseout = new Function (tFunc);

        var divPic = document.createElement('div');
        divPic.setAttribute('id','divPic-'+itemID);
        divPic.style.overflow = "hidden";
        divPic.style.height = "150px";
        divPic.style.width = "150px";

        var imgPic = document.createElement('img');
        imgPic.setAttribute('id','imgPic-'+itemID);
        imgPic.setAttribute('border','0');
        imgPic.setAttribute('alt','');
        imgPic.setAttribute('src',aHash["PicFile"]);
        imgPic.setAttribute('width','100');
        divPic.appendChild(imgPic);

        var divItemID = document.createElement('div');
        divItemID.setAttribute('id','divItemID-'+itemID);
        var textItemID = document.createTextNode(itemID);
        divItemID.appendChild(textItemID);

        var divDesc = document.createElement('div');
        divDesc.setAttribute('id','divDesc-'+itemID);
        var textDesc = document.createTextNode(aHash["ShortDesc"]);
        divDesc.appendChild(textDesc);

        var divQL = document.createElement('div');
        divQL.setAttribute('id','divQL-'+itemID);
        var textQL = document.createTextNode("QuickLook");
        divQL.style.border = "black 1px solid";
        divQL.style.display = "none";
        divQL.appendChild(textQL);

        newDiv.appendChild(divPic);
        newDiv.appendChild(divDesc);
        newDiv.appendChild(divItemID);
        newDiv.appendChild(divQL);
        divItems.appendChild(newDiv);

        divQL.style.position = "absolute";
        divQL.style.top = "0px";

        divPic.style.textAlign = "center";

        if (itemList !== "")
        {
          createItemBlock(divItems,itemList);
        }
      }
    },
    onFailure: function() {alert("Something went wrong loading items");}
  }); // End Ajax
}

// ------------------------------------------------------------------
function setIFrameSize()
{
  var myWidth;
  var myHeight;

  if (typeof( window.innerWidth ) == 'number')
  {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  }
  else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight))
  {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  }
  else if (document.body && (document.body.clientWidth || document.body.clientHeight))
  {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }

  var iframeItemList = document.getElementById("iframeItemList");
  var iCW = document.body.clientWidth;
  var iframeWidth = iCW - yc2_SideBar_Width;
  if (_collapseSideBar)
  {
    iframeWidth = iCW;
  }

  // Override width to 100%
  iframeWidth = '100%';

  window.scrollTo(0,0);

  var iframeBodyH = window.frames["iframeItemList"].document.body.offsetHeight;
  var iframeBodyW = window.frames["iframeItemList"].document.body.offsetWidth;
  var frameSrc = window.frames["iframeItemList"].location;

  if (CatMode == 'TABLE')
  {
    if ((GridItemW > 0)&&(iframeBodyW > 0))
    {
      var iGridCols = iframeBodyW / GridItemW;
      iGridCols = parseInt(iGridCols);
      var iGridRows = 1;

      if (last_catitemcount < PerPage)
      {
        iGridRows = last_catitemcount / iGridCols;
      }
      else
      {
        iGridRows = PerPage / iGridCols;
      }

      iGridRows = Math.ceil(iGridRows);

      if (iframeBodyH < 1)
      {
        iframeBodyH += iGridRows * (yc2_ItemCellH + 3);
      }
    }

    if (iframeWidth < yc2_iframeMinWidth)
    {
      iframeWidth = '100%';
    }
  }
  else if (CatMode == 'LIST')
  {
    var PageAdH = 0;
    var framePageAd = window.frames["iframeItemList"].document.getElementById("PageAd");
    if (framePageAd)
    {
      PageAdH = framePageAd.offsetHeight;
    }

    var fudgeFactor = 0;
    if (last_catitemcount > 1)
    {
      if (last_catitemcount < PerPage)
      {
        fudgeFactor = ((last_catitemcount - 1) * 27);
      }
      else
      {
        fudgeFactor = ((PerPage - 1) * 27);
      }
    }
  }
  else if ((CatMode != 'TABLE')&&(iframeWidth < 800))
  {
    iframeWidth = 800;
  }

  var minH = 0;
  var CatalogNode = document.getElementById("CatalogNode");
  if (CatalogNode)
  {
    minH = CatalogNode.clientHeight;
  }

  if (iframeBodyH < minH)
  {
    iframeBodyH = minH;
  }

  iframeItemList.style.height = iframeBodyH+"px";
  iframeItemList.style.minheight = minH+"px";

  var pat1 = /nph\-imprint\-form\.cgi/;
  frameSrc += '';
  if (frameSrc.search(pat1) != -1)
  {
    var oDivWorkspace = window.frames["iframeItemList"].document.getElementById("divWorkspace");
    var frameTopTable = window.frames["iframeItemList"].document.getElementById("topTable");
    var ttH = 0;
    if (frameTopTable)
    {
      ttH = frameTopTable.clientHeight + 100;
    }

    if (oDivWorkspace)
    {
      var tH = oDivWorkspace.clientHeight + 100;
      if (tH < ttH)
      {
        tH = ttH;
      }

      iframeWidth = oDivWorkspace.clientWidth + 100;
      iframeItemList.style.height = tH+"px";
      if (iframeWidth < 800)
      {
        iframeWidth = 800;
      }
    }
  }

  if (iframeItemList)
  {
    if (iframeWidth == '100%')
    {
      iframeItemList.style.width = iframeWidth;
    }
    else
    {
      iframeItemList.style.width = iframeWidth+"px";
    }
  }
}

// ------------------------------------------------------------------
function loadCatalogs(ActiveCatalog, bLoadCategories)
{
  yc2_bLoadCategories = bLoadCategories;

  var paramlist = 'SID='+yc2_SID+'&DIST='+yc2_dist+'&UserID='+yc2_UserID;
  QNET_CallAjax_POST('qn-load-catalogs.pl',loadCatalogs_Return,paramlist);
}

// ------------------------------------------------------------------
function loadCatalogs_Return(httpObject)
{
  var response = httpObject.responseText;
  if (response !== '')
  {
    var rootNode = document.getElementById('rootNode');
    var CatalogNode = document.getElementById('CatalogNode');
    if (CatalogNode)
    {
      var aCatRec = response.split("^^");
      var i=0;
      for (i=0;i<aCatRec.length;i++)
      {
        var aKey = [];
        var aCatParts = aCatRec[i].split("~");
        var j=0;
        for (j=0;j<aCatParts.length;j++)
        {
          var aKV = aCatParts[j].split("=");
          var z=0;
          for (z=2;z<aKV.length;z++)
          {
            aKV[1] += "="+aKV[z];
          }

          aKey[aKV[0]] = aKV[1];
        }

        var newDIV = document.createElement('div');
        newDIV.setAttribute("id","CAT~"+aKey["catclient"]+"~"+aKey["type"]+"~"+aKey["catnum"]+"~"+aKey["catsubnum"]);
        attachStyles(newDIV,"cursor:pointer;");
        attachStyles(newDIV,yc2_menucat);

        var tCatNum = aKey["catnum"];
        var tClient = yc2_UserClient;
        var tCatSubNum = aKey["catsubnum"];
        if (tCatSubNum == 'undefined')
        {
          tCatSubNum = "";
        }
        if ((aKey["type"] == 'C')||(aKey["type"] == 'D'))
        {
          tCatNum =aKey["catnum"]+aKey["catclient"];
        }

        //alert ("tCatNum="+tCatNum+" tClient="+tClient+" tCatSubNum"+tCatSubNum);

        var fONC = 'CatNav("'+tCatNum+'","'+tClient+'","'+tCatSubNum+'","","","","");startItemIndicator("Loading Catalog....");';

        if (aKey["catnum"] < 10)
        {
          fONC = 'loadClientCatalogs("'+aKey["catnum"]+'","'+aKey["type"]+'","'+aKey["catclient"]+'")';
        }
        else if (aKey["catnum"] < 1000)
        {
          fONC = 'loadClientCatalogs("'+aKey["catnum"]+'","'+aKey["type"]+'","'+aKey["catclient"]+'")';
        }
        else if (aKey["catnum"] == 1000)
        {
          fONC = 'loadClientCatalogs("'+aKey["catnum"]+'","'+aKey["type"]+'","'+aKey["catclient"]+'")';
        }
        else if (aKey["catnum"] == 1003)
        {
          fONC = 'CatNav("'+tCatNum+'","'+tClient+'","'+tCatSubNum+'","","","","");startItemIndicator("Loading Catalog....");';
          if (tCatSubNum !== '')
          {
            var sageType = tCatSubNum.substr(0,1);
            var sageNum = tCatSubNum.substr(1);
            if (sageType == '1')
            {
              fONC = 'CatNav("'+tCatNum+'","'+tClient+'","'+sageNum+'","","","","");startItemIndicator("Loading Catalog....");';
            }
            else if (sageType == '2')
            {
              fONC = 'CatNav("'+tCatNum+'","'+tClient+'","","'+sageNum+'","","","");startItemIndicator("Loading Catalog....");';
            }
          }
        }
        else if (tCatNum == 1020)
        {
          fONC = 'DigitalLibrary ()';
        }
        else if (tCatNum == 1021)
        {
          fONC = 'RequestQuote ()';
        }
        else if (tCatNum == 1049)
        {
          // Favorites
          fONC = 'javascript:window.frames["iframeItemList"].resetPagePos();loadFavoriteCatalogs ()';
        }

        var newDIVA = document.createElement('div');
        newDIVA.setAttribute("id","CAD~"+aKey["catclient"]+"~"+aKey["type"]+"~"+aKey["catnum"]+"~"+aKey["catsubnum"]);
        attachStyles(newDIVA,yc2_menucat_div);
        newDIVA.onclick = new Function (fONC);

        tFunc = 'mouseOverCategory("CAD~'+aKey["catclient"]+'~'+aKey["type"]+'~'+aKey["catnum"]+'~'+aKey["catsubnum"]+'")';
        newDIVA.onmouseover = new Function (tFunc);

        tFunc = 'mouseOutCategory("CAD~'+aKey["catclient"]+'~'+aKey["type"]+'~'+aKey["catnum"]+'~'+aKey["catsubnum"]+'")';
        newDIVA.onmouseout = new Function (tFunc);

        var newA = document.createElement('a');
        newA.setAttribute("id","CAA~"+aKey["catclient"]+"~"+aKey["type"]+"~"+aKey["catnum"]+"~"+aKey["catsubnum"]);
        newA.style.textDecoration = "none";

        var hiddenName = document.createElement('input');
        hiddenName.setAttribute("id","CAH~"+aKey["catclient"]+"~"+aKey["type"]+"~"+aKey["catnum"]+"~"+aKey["catsubnum"]);
        hiddenName.setAttribute("type","hidden");
        hiddenName.setAttribute("value",aKey["name"]);

        newA.innerHTML = aKey["name"];

        attachStyles(newA,yc2_menucat_a);

        newDIVA.appendChild(newA);
        newDIVA.appendChild(hiddenName);
        newDIV.appendChild(newDIVA);

        if ((typeof aKey["customnav"] != 'undefined')&&(aKey["customnav"] !== ''))
        {
          aKey["customnav"] = aKey["customnav"].replace("&#732","~");
          newA.innerHTML = aKey["customnav"];
        }

        CatalogNode.appendChild(newDIV);

        if ((aKey["catclient"] == yc2_CCat)&&(aKey["type"] == yc2_CatType)&&(aKey["catnum"] == yc2_CatID))
        {
          newDIV.appendChild(rootNode);
          var endRootNode = document.getElementById('endRootNode');
          if (endRootNode)
          {
            newDIV.appendChild(endRootNode);
          }
        }
      }
    }

    if (yc2_CatID == "1049")
    {
      loadFavoriteCatalogs();
    }

    setActiveCatalog(yc2_CatID,yc2_CatType,yc2_CCat);

    if ((typeof yc2_bLoadCategories != 'undefined')&&(yc2_bLoadCategories == 1))
    {
      loadCategories(yc2_CCat,'','','');
      loadItemsOnlyProcess(yc2_CCat,'','','','','',' ');
    }
  }
}

// ------------------------------------------------------------------
function isJSON(str) 
{
  try { JSON.parse(str); } 
  catch (e) { return false; }

  return true;
}

// ------------------------------------------------------------------
function loadCategories(ccat,level1,level2,level3,noCollapse)
{
  var ts = new Date();
  var CatLevel = level1;
  var CatLevelNum = 1;
  var rootNode = '';
  var endRootNode = '';
  var aRec1 = '';
  var levelClass = '';
  var paramlist = '';
  var oData = {};
  var oAppliedList = {};

  if (yc2_EnableFilters != 'Y')
  {
    level1 = (typeof level1 != 'undefined') ? level1 : '';
    level2 = (typeof level2 != 'undefined') ? level2 : '';
    level3 = (typeof level3 != 'undefined') ? level3 : '';
  }

  var tKey = ccat+'~~'+level1+'~~'+level2+'~~'+level3;

  var jsonFilterData = (jsonFilters !== '') ? JSON.parse(jsonFilters) : {};

  if ((yc2_CatID == '1000')&&(AppliedFilterList !== ''))
  {
    var aFProps = AppliedFilterList.split("||");
    var iFP = 0;
    for (iFP=0;iFP<aFProps.length;iFP++)
    {
      var aFPropPair = aFProps[iFP].split("^^");
      var aFilterInfo = aFPropPair[0].split("~~");
      var aPropInfo = aFPropPair[1].split("~~");

      oAppliedList[aFilterInfo[0]] = aPropInfo[0]+'|'+aPropInfo[3];
    }
  }

  if (!(tKey in aLQ))
  {
    aLQ[tKey] = 1;

    if (yc2_Suppress_YourCatalogSearch != 'Y')
    {
      var divSearchArea2 = document.getElementById('divSearchArea2');
      if (divSearchArea2)
      {
        if (divSearchArea2.style.display == 'none')
        {
          divSearchArea2.style.display = 'block';
        }
      }
    }

    if (level3 !== "")
    {
      CatLevel = level3;
      CatLevelNum = 3;
    }
    else if (level2 !== "")
    {
      CatLevel = level2;
      CatLevelNum = 2;
    }

    var ulNode = '';

    if (level1 === '')
    {
      ulNode = document.getElementById('rootNode');
      CatLevelNum = 0;
    }
    else
    {
      ulNode = createULNode('DI'+CatLevelNum+'~'+CatLevel,noCollapse);
    }

    if (ulNode !== "")
    {
      var SearchItemNum = 1;
      var SearchKeyWord = 0;
      var SearchShort = 0;
      var SearchLong = 0;
      if (currentSearch !== '')
      {
        oSearchKeyWord = document.getElementById('cbSearchKeyWord');
        if (oSearchKeyWord)
        {
          if (oSearchKeyWord.checked === true)
          {
            SearchKeyWord = 1;
          }
        }
        oSearchShort = document.getElementById('cbSearchShort');
        if (oSearchShort)
        {
          if (oSearchShort.checked === true)
          {
            SearchShort = 1;
          }
        }
        oSearchLong = document.getElementById('cbSearchLong');
        if (oSearchLong)
        {
          if (oSearchLong.checked === true)
          {
            SearchLong = 1;
          }
        }
      }

      // override
      SearchKeyWord = 1;
      SearchShort = 1;

      var tParams =
        'DIST='+yc2_dist+'&UserID='+yc2_UserID+'&WsID='+yc2_WsID+'&CatType='+yc2_CatType+'&CatID='+yc2_CatID+'&Client='+yc2_UserClient+'&CCat='+yc2_CCat+
        '&ShipTo='+yc2_ShipTo+'&Level1='+level1+'&Level2='+level2+'&Level3='+level3+'&SearchString='+escape(HTMLEncode(currentSearch))+
        '&hasSearchKeyWord='+SearchKeyWord+'&hasSearchShort='+SearchShort+'&hasSearchLong='+SearchLong+'&RetailStore='+yc2_RetailStore+
        '&vcDBName='+yc2_vcDBName+'&SearchItemList='+SearchItemList+'&AppliedFilterList=&isJSON=1&EnableFilters='+yc2_EnableFilters+'&ts='+ts.getTime();

      new Ajax.Request('qn-load-categories.pl',
      {
        method:'post',
        parameters: tParams,
        onSuccess: function(catreturn)
        {
          var response = catreturn.responseText || "";
          if (response === '')
          {
            endRootNode = document.getElementById('endRootNode');
            if (endRootNode)
            {
              endRootNode.style.display = "none";
              stopItemIndicator();

              if (currentSearch !== '')
              {
                initSearch = 0;
                alert (strToPlainText(yc2_SearchAgain));
                currentSearch = '';
                loadCategories(ccat,level1,level2,level3,noCollapse);
              }
            }
          }
          else if (response.substring(0,3) == '|!1') // Entire Catalog Tree
          {
            response = response.substring(3);

            rootNode = document.getElementById('rootNode');
            if (rootNode)
            {
              var htmlText = '';
              var aL1 = response.split("|!1");
              var iL1 = 0;
              for (iL1=0;iL1<aL1.length;iL1++)
              {
                aRec1 = '';

                var tRec1 = aL1[iL1];
                var aGetID1 = aL1[iL1].split("~~");

                // Already exists
                var oD1 = document.getElementById('DI1~'+aGetID1[0]);
                if (oD1)
                {
                }
                else
                {
                  var aL2 = aL1[iL1].split("|!2");

                  if (aL2.length < 1)
                  {
                    aRec1 = aL1[iL1].split("~~");
                  }

                  var divL1 = document.createElement('div');
                  rootNode.appendChild (divL1);

                  var iL2 = 0;
                  for (iL2=0;iL2<aL2.length;iL2++)
                  {
                    var tRec2 = aL2[iL2];
                    var divL2 = document.createElement('div');

                    if (iL2 === 0)
                    {
                      tRec1 = aL2[0];
                      aRec1 = aL2[0].split("~~");
                    }
                    else
                    {
                      rootNode.appendChild (divL2);

                      var aL3 = aL2[iL2].split("|!3");

                      if (aL3.length < 1)
                      {
                        aRec2 = aL2[iL2].split("~~");
                      }

                      var iL3 = 0;
                      for (iL3=0;iL3<aL3.length;iL3++)
                      {
                        if (iL3 === 0) // Category 2 record
                        {
                          tRec2 = aL3[0];
                          aRec2 = aL3[0].split("~~");
                        }
                        else
                        {
                          var divL3 = document.createElement('div');
                          rootNode.appendChild (divL3);
                          var aRec3 = aL3[iL3].split("~~");
                          divL3.setAttribute("id","DI3~"+aRec3[0]);
                          divL3.setAttribute("class","yc2Level3");
                          divL3.style.display = 'none';

                          htmlText = '<a id="B3~'+aRec3[0]+'" href="javascript:ClearSearch();loadItems(\''+yc2_CCat+'\',\''+aRec1[0]+'\',\''+aRec2[0]+'\',\''+aRec3[0]+'\',\'\',\'\');">'+aRec3[1]+'</a>';

                          divL3.innerHTML = htmlText;
                        }
                      }
                    }

                    var aRec2 = tRec2.split("~~");
                    divL2.setAttribute("id","DI2~"+aRec2[0]);
                    divL2.setAttribute("class","yc2Level2");
                    divL2.style.display = 'none';

                    if (yc2_CatID == '1')
                    {
                      htmlText = '<a id="B2~'+aRec2[0]+'" href="javascript:ClearSearch();loadItems(\''+yc2_CCat+'\',\''+aRec1[0]+'\',\''+aRec2[0]+'\',\'\',\'\',\'\');">'+aRec2[1]+'</a>';
                    }
                    else
                    {
                      htmlText = '<img id="A2~'+aRec2[0]+'" name="A2~'+aRec2[0]+'" src="./qn_images/arrowright.gif" onclick="createULNode(\'DI2~'+aRec2[0]+'\',\'\');"><a id="B2~'+aRec2[0]+'" href="javascript:ClearSearch();loadItems(\''+yc2_CCat+'\',\''+aRec1[0]+'\',\''+aRec2[0]+'\',\'\',\'\',\'\');">'+aRec2[1]+'</a>';
                    }

                    divL2.innerHTML = htmlText;
                  }

                  aRec1 = tRec1.split("~~");
                  divL1.setAttribute("id","DI1~"+aRec1[0]);
                  divL1.setAttribute("class","yc2Level1");
                  divL1.setAttribute("data-category",aRec1[1].toLowerCase());

                  // attachStyles(divL1, yc2_menu1_li);

                  if (aRec1[3] === 0)
                  {
                    htmlText = '<a id="B1~'+aRec1[0]+'" href="javascript:ClearSearch();loadItems(\''+yc2_CCat+'\',\''+aRec1[0]+'\',\'\',\'\',\'\',\'\');">'+aRec1[1]+'</a>';
                  }
                  else
                  {
                    htmlText = '<img id="A1~'+aRec1[0]+'" name="A1~'+aRec1[0]+'" src="./qn_images/arrowright.gif" onclick="createULNode(\'DI1~'+aRec1[0]+'\',\'\');"><a id="B1~'+aRec1[0]+'" href="javascript:ClearSearch();loadItems(\''+yc2_CCat+'\',\''+aRec1[0]+'\',\'\',\'\',\'\',\'\');">'+aRec1[1]+'</a>';
                  }

                  divL1.innerHTML = htmlText;
                }
              }
            }

            endRootNode = document.getElementById('endRootNode');
            if (endRootNode)
            {
              endRootNode.style.display = "none";
            }

            if ((level1 === '')&&(level2 === '')&&(level3 === ''))
            {
              loadItemsOnly(yc2_CCat,'','','','',0);
            }
          }
          else
          {
            SearchFilterList = ''; // Clear SearchFilterList

            rootNode = document.getElementById('rootNode');

            var i=0;
            var j=0;

            if (isJSON(response))
            {
              jsonFilters = response;
              var jsonData = JSON.parse(response);
              var aCatRec = [];

              if (jsonData.sortOrder === '')
              {
                endRootNode = document.getElementById('endRootNode');
                if (endRootNode)
                {
                  endRootNode.style.display = "none";
                  stopItemIndicator();

                  if (currentSearch !== '')
                  {
                    delete aLQ[tKey];
                    initSearch = 0;
                    alert (strToPlainText(yc2_SearchAgain));
                    currentSearch = '';
                    loadCategories(ccat,level1,level2,level3,noCollapse);
                  }
                }
              }
              else
              {
                var aFilterSort = jsonData.filterOrder.split("|");
                for (i=0;i<aFilterSort.length;i++)
                {
                  if (aFilterSort[i] !== '')
                  {
                    SearchFilterList += (SearchFilterList !== '') ? '||' + aFilterSort[i] + '~~' + (i+1) + '~~0' : aFilterSort[i] + '~~' + (i+1) + '~~0'; 

                    var aPropertySort = jsonData.propertyOrder[aFilterSort[i]].split("|");
                    for (j=0;j<aPropertySort.length;j++)
                    {
                      if (aPropertySort[j] !== '')
                      {
                        var PropType = jsonData.Filters[aFilterSort[i]][aPropertySort[j]].Type;
                        SearchFilterList += '^^' + aPropertySort[j] + '~~' + j + '~~0~~' + PropType; 
                      }
                    }
                  }
                }

                // Only load when category is used
                if (((level1 === '')&&(currentSearch === ''))||((SearchFilterList === '')&&(AppliedFilterList === '')))
                {
                  displayEnhancedSearch(0);
                }
                else
                {
                  displayEnhancedSearch(1);
                }

                var MyCatLevelNum = parseInt(CatLevelNum) + 1;
                // var aCatRec = response.split("^^");

                var aSort = jsonData.sortOrder.split("|");
                for (i=0;i<aSort.length;i++)
                {
                  aCatRec[i] = jsonData['Category'][aSort[i]];
                }

                if (MyCatLevelNum > 1)
                {
                  aCatRec = aCatRec.reverse();
                }

                last_catitemcount = 0;
                for (i=0;i<aCatRec.length;i++)
                // for (i in aCatRec)
                {
                  var L1 = level1;
                  var L2 = level2;
                  var L3 = level3;
                  levelClass = 'yc2Level1';

                  if (level1 === "")
                  {
                    levelClass = 'yc2Level1';
                  }
                  else if (level2 === "")
                  {
                    levelClass = 'yc2Level2';
                  }
                  else if (level3 === "")
                  {
                    levelClass = 'yc2Level3';
                  }

                  // var aCatParts = aCatRec[i].split("~~");
                  var aCatParts = [];
                  aCatParts[0] = aCatRec[i]['ID'];
                  aCatParts[1] = aCatRec[i]['Name'];
                  aCatParts[2] = aCatRec[i]['Cnt'];
                  aCatParts[3] = aCatRec[i]['SubCnt'];

                  last_catitemcount += parseInt(aCatParts[2]);

                  var dataCategory = aCatParts[1];
                  aCatParts[1] = strToPlainText(aCatParts[1]);

                  // Already exists
                  var newDIV = document.getElementById("DI"+MyCatLevelNum+"~"+aCatParts[0]);
                  if (newDIV)
                  {
                  }
                  else
                  {
                    newDIV = document.createElement('div');
                    newDIV.setAttribute("id","DI"+MyCatLevelNum+"~"+aCatParts[0]);
                    newDIV.setAttribute("class",levelClass);
                    newDIV.setAttribute("data-category",dataCategory.toLowerCase());

                    var aText = document.createTextNode(aCatParts[1]+" ("+aCatParts[2]+")");

                    if (level1 === "")
                    {
                      L1 = aCatParts[0];
                      L2 = '';
                      L3 = '';
                    }
                    else if (level2 === "")
                    {
                      L2 = aCatParts[0];
                      L3 = '';
                    }
                    else if (level3 === "")
                    {
                      L3 = aCatParts[0];
                    }

                    var newA = document.createElement('a');
                    newA.setAttribute("id","B"+MyCatLevelNum+"~"+aCatParts[0]);
                    newA.setAttribute("href","javascript:loadItems('"+yc2_CCat+"','"+L1+"','"+L2+"','"+L3+"','','"+aCatParts[2]+"');");
                    newA.appendChild(aText);

                    if (aCatParts[3] > 0)
                    {
                      var newImg = document.createElement('img');
                      newImg.setAttribute("id","A"+MyCatLevelNum+"~"+aCatParts[0]);
                      newImg.setAttribute("name","A"+MyCatLevelNum+"~"+aCatParts[0]);
                      newImg.setAttribute("src",yc2_menu1_collapse);
                      // newImg.style.cursor = "pointer";

                      var fONC = 'loadCategories(yc2_CCat,"'+L1+'","'+L2+'","'+L3+'")';
                      newImg.onclick = new Function (fONC);

                      if (yc2_menu_image_width > 0)
                      {
                        newImg.style.width = yc2_menu_image_width+"px";
                      }
                      if (yc2_menu_image_height > 0)
                      {
                        newImg.style.height = yc2_menu_image_height+"px";
                      }
                      if (yc2_menu_image_padleft > 0)
                      {
                        newImg.style.marginLeft = yc2_menu_image_padleft+"px";
                      }
                      if (yc2_menu_image_padright > 0)
                      {
                        newImg.style.marginRight = yc2_menu_image_padright+"px";
                      }
                      if (yc2_menu_image_padtop > 0)
                      {
                        newImg.style.paddingTop = yc2_menu_image_padtop+"px";
                      }
                      if (yc2_menu_image_padbot > 0)
                      {
                        newImg.style.paddingBottom = yc2_menu_image_padbot+"px";
                      }

                      if (yc2_sublvl1_top_offset > 0)
                      {
                        newA.style.top = yc2_sublvl1_top_offset+"px";
                      }

                      if (yc2_menu_style == "imageLeft")
                      {
                        newDIV.appendChild(newImg);
                        newDIV.appendChild(newA);
                      }
                      else
                      {
                        newImg.style.cssFloat = "right";
                        newImg.style.styleFloat = "right";
                        newDIV.appendChild(newA);
                        newDIV.appendChild(newImg);
                      }
                    }
                    else
                    {
                      if (yc2_menu_style == "imageLeft")
                      {
                        var tOffset = yc2_menu_image_width + yc2_menu_image_padleft + yc2_menu_image_padright;
                        newA.style.margin = "0 0 0 "+tOffset+"px";
                      }
                      else
                      {
                      }

                      newDIV.appendChild(newA);
                    }

                    if (level1 === '')
                    {
                      rootNode.appendChild (newDIV);
                    }
                    else
                    {
                      rootNode.insertBefore(newDIV,ulNode.nextSibling);
                    }
                  }
                }

                if ((initSearch) && (currentSearch !== ''))
                {
                  initSearch = 0;
                  loadItemsOnly(yc2_CCat,'','','','',last_catitemcount);
                }

                if ((level1 === '')&&(level2 === '')&&(level3 === ''))
                {
                }
                else if (yc2_hasBorder == "1")
                {
                  var nodeid = ulNode.id;
                  var currentLvl = nodeid.substr(2,1);

                  var isGood = 1;
                  var nextObj = ulNode.nextSibling;
                  lastObj = nextObj;
                  while (isGood)
                  {
                    isGood = 0;

                    if (nextObj)
                    {
                      var nextID = nextObj.id;
                      if (nextID.length > 2)
                      {
                        if (parseInt(nextID.substr(2,1)) > (parseInt(currentLvl)))
                        {
                          isGood = 1;
                          lastObj = nextObj;
                          nextObj.style.display = "block";
                          nextObj = nextObj.nextSibling;
                        }
                      }
                    }
                  }

                  if (lastObj)
                  {
                    lastObj.style.borderBottom = yc2_menu1_li_borderbottom;
                  }
                }

                endRootNode = document.getElementById('endRootNode');
                if (endRootNode)
                {
                  endRootNode.style.display = "none";
                }

                if ((level1 === '')&&(level2 === '')&&(level3 === '')&&(initLevel1 === '')&&(initLevel2 === '')&&(initLevel2 === ''))
                {
                  if (yc2_LoadAllItems)
                  {
                    loadItemsOnly(yc2_CCat,'','','','',last_catitemcount);
                  }
                }

                initializeCategory();
              }
            }
            else
            {
              console.log('ERROR! : Non JSON return : '+response);
            }

            delete aLQ[tKey];
          }
        },
        onFailure: function() 
        {
          delete aLQ[tKey];
          alert("Something went wrong loading categories");
        }
      }); // End Ajax
    }
    else
    {
      delete aLQ[tKey];

      oData = {};
      oData['DIST'] = yc2_dist;
      oData['UserID'] = yc2_UserID;
      oData['WsID'] = yc2_WsID;
      oData['CatType']= yc2_CatType;
      oData['CatID']= yc2_CatID;
      oData['Client']= yc2_UserClient;
      oData['CCat']= yc2_CCat;
      oData['ShipTo']= yc2_ShipTo;
      oData['Level1']= level1;
      oData['Level2']= level2;
      oData['Level3']= level3;
      oData['FA'] = 'GetFilters';
      oData['SearchString'] = HTMLEncode(currentSearch);
      oData['RetailStore'] = yc2_RetailStore;
      oData['AppliedFilterList'] = JSON.stringify(oAppliedList);
      oData['EnableFilters']= yc2_EnableFilters;

      paramlist = 'DATA=' + escape(JSON.stringify(oData));
      QNET_CallAjax_POST('qn-json-categories.pl',loadFilters_Return,paramlist);
    }
  }
  else
  {
    // Already Loaded
    oData = {};
    oData['DIST'] = yc2_dist;
    oData['UserID'] = yc2_UserID;
    oData['WsID'] = yc2_WsID;
    oData['CatType']= yc2_CatType;
    oData['CatID']= yc2_CatID;
    oData['Client']= yc2_UserClient;
    oData['CCat']= yc2_CCat;
    oData['ShipTo']= yc2_ShipTo;
    oData['Level1']= level1;
    oData['Level2']= level2;
    oData['Level3']= level3;
    oData['FA'] = 'GetFilters';
    oData['SearchString']= HTMLEncode(currentSearch);
    oData['RetailStore']= yc2_RetailStore;
    oData['EnableFilters']= yc2_EnableFilters;

    paramlist = 'DATA=' + escape(JSON.stringify(oData));
    QNET_CallAjax_POST('qn-json-categories.pl',loadFilters_Return,paramlist);
  }
}

// ------------------------------------------------------------------
function loadFilters_Return(httpObject)
{
  var response = httpObject.responseText;
  if (response !== '')
  {
    SearchFilterList = ''; // Clear SearchFilterList
    jsonFilters = response;

    var i=0;
    var j=0;
    var jsonData = JSON.parse(response);

    if ((currentSearch === '')&&(jsonData.level1 === '')&&(jsonData.level2 === '')&&(jsonData.level3 === ''))
    {
      jsonData.filterOrder = '';
    }

    var aFilterSort = jsonData.filterOrder.split("|");

    for (i=0;i<aFilterSort.length;i++)
    {
      if (aFilterSort[i] !== '')
      {
        SearchFilterList += (SearchFilterList !== '') ? '||' + aFilterSort[i] + '~~' + (i+1) + '~~0' : aFilterSort[i] + '~~' + (i+1) + '~~0'; 

        var aPropertySort = jsonData.propertyOrder[aFilterSort[i]].split("|");
        for (j=0;j<aPropertySort.length;j++)
        {
          if (aPropertySort[j] !== '')
          {
            var PropType = jsonData.Filters[aFilterSort[i]][aPropertySort[j]].Type;
            SearchFilterList += '^^' + aPropertySort[j] + '~~' + j + '~~0~~' + PropType; 
          }
        }
      }
    }

    if ((SearchFilterList === '')&&(AppliedFilterList === ''))
    {
      displayEnhancedSearch(0);
    }
    else
    {
      displayEnhancedSearch(1);
    }
  }
  else
  {
    console.log('loadFilters_Return : NO RESULTS : '+currentSearch);
  }
}