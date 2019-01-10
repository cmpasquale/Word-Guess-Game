// use qnet-core

/*
  AUTHOR: John Freeman <jfreeman@e-quantum.com>
  see qn-tn-generator.pl for usage
*/

var aImagesTN = [];
var aAllImages = [];
var tn_dist = '';

window.addEventListener("load", QN_ValidateTN, false);

// --------------------------------------------------------
function QN_ValidateTN() 
{
  var aTemp = [];
  aAllImages = [];

  aTemp = document.getElementsByTagName('img');
  for (var i=0; i<aTemp.length; i++) 
  {
    if (aTemp[i].getAttribute('data-src')) 
    {
      aAllImages.push(aTemp[i]);
    }
  }

  QN_NotifyTN();
}

// --------------------------------------------------------
function QN_NotifyTN() 
{
  var aDelayTN = [];
  var inProcess = 0;
  aImagesTN = [];

  // console.log('TOTAL objects(img) : '+aAllImages.length);
  for (var i=0; i<aAllImages.length; i++) 
  {
    if (aAllImages[i].getAttribute('data-src')) 
    {
      if (aAllImages[i].getAttribute('data-status') == '0')
      {
        var dataTID = 0;
        if (aAllImages[i].getAttribute('data-tid')) 
        {
          dataTID = aAllImages[i].getAttribute('data-tid');
        }

        aDelayTN.unshift({dist:tn_dist,id:i,src:aAllImages[i].getAttribute('data-src'),tid:dataTID}); // Must be reverse order for splice
        inProcess = 1;
      }
      else
      {
        aAllImages[i].setAttribute('src', aAllImages[i].getAttribute('data-src'));
        aAllImages[i].removeAttribute('data-src');
        aAllImages[i].removeAttribute('data-status');
      }
    }
    else
    {
    }
  }

  if (inProcess)
  {
    var paramlist = 'DATA=' + escape(JSON.stringify(aDelayTN));
    QNET_CallAjax_POST('qn-tn-validate.pl',QN_NotifyTN_Return,paramlist);
  }
}

// --------------------------------------------------------
function QN_NotifyTN_Return(httpObject) 
{
  var response = httpObject.responseText;
  if (response !== '')
  {
    var inProcess = 0;
    var json = JSON.parse(response);
    for (var i=0;i < json.length;i++)
    {
      var oData = json[i];
      if (oData.status == '1')
      {
        aAllImages[oData.id].setAttribute('src', aAllImages[oData.id].getAttribute('data-src'));
        aAllImages[oData.id].removeAttribute('data-src');
        aAllImages[oData.id].removeAttribute('data-status');
        aAllImages.splice(oData.id,1);
      }
      else if (oData.status == '2') // No image available
      {
        aAllImages[oData.id].setAttribute('src', oData.src);
        aAllImages[oData.id].removeAttribute('data-src');
        aAllImages[oData.id].removeAttribute('data-status');
        aAllImages.splice(oData.id,1);
      }
      else
      {
        inProcess = 1;
      }
    }

    if (inProcess)
    {
      setTimeout(QN_NotifyTN(), 200);
    }
  }
}

// --------------------------------------------------------
function QN_FileExists(file_url)
{
  var http = new XMLHttpRequest();

  http.open('HEAD', file_url, false);
  http.send();

  return http.status != 404;
}

// --------------------------------------------------------
function QN_Sleep( ms )
{
  var now = new Date().getTime();
  while (new Date().getTime() < now + ms)
    { /* do nothing */ } 
}