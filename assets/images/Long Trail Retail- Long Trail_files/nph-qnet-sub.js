function SetStatusText (tText)
{
  var oid = document.getElementById('pStatus');
  oid.innerHTML = tText;
}

function toggleFav(tAdd,tType,tClient,tItem,tUserID,tWsID,tCustID,tQty,tRID,tIDesc)
{
  alert ("toggleFav");
  document.fFav.FA.value='AddFavorites';
  if (tAdd == 0)
  {
    document.fFav.FA.value='DeleteFavorites';
  }
  else if (tAdd == 9)
  {
    document.fFav.FA.value='AddWish';
  }

  document.fFav.RID.value=tRID;
  document.fFav.UserID.value=tUserID;
  document.fFav.WsID.value=tWsID;
  document.fFav.CustID.value=tCustID;
  document.fFav.CatalogType.value=tType;
  document.fFav.CatalogID.value=tClient;
  document.fFav.ItemID.value=tItem;
  document.fFav.QTY.value=tQty;
  document.fFav.I_DESC.value=tIDesc;

  SetStatusText ('Updating Favorites Catalog...')
  document.fFav.submit();
}

function initializeForm(tFA)
{
}
