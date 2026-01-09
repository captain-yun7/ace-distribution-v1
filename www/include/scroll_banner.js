// 배너 따라 다니기 애드콘 시작

var bNetscape4plus = (navigator.appName == "Netscape" && navigator.appVersion.substring(0,1) >= "4");
var bExplorer4plus = (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.substring(0,1) >= "4");

function CheckUIElements()
{
        var yMenuFrom, yMenuTo, yButtonFrom, yButtonTo, yOffset, timeoutNextCheck;

        if ( bNetscape4plus ) {

                yMenuFrom   = document["divMenu"].top;
                yMenuTo     = top.pageYOffset + 50;
        }
        else if ( bExplorer4plus ) {

                yMenuFrom   = parseInt (divMenu.style.top, 10);
                yMenuTo     = document.body.scrollTop + 69;
        }

        timeoutNextCheck = 500;

        if ( Math.abs (yButtonFrom - (yMenuTo + 152)) < 6 && yButtonTo < yButtonFrom ) {
                setTimeout ("CheckUIElements()", timeoutNextCheck);
                return;
        }


        if ( yButtonFrom != yButtonTo ) {
                yOffset = Math.ceil( Math.abs( yButtonTo - yButtonFrom ) / 10 );
                if ( yButtonTo < yButtonFrom )
                        yOffset = -yOffset;

                if ( bNetscape4plus )
                        document["divLinkButton"].top += yOffset;
                else if ( bExplorer4plus )
                        divLinkButton.style.top = parseInt (divLinkButton.style.top, 10) + yOffset;

                timeoutNextCheck = 10;
        }
        if ( yMenuFrom != yMenuTo ) {
                yOffset = Math.ceil( Math.abs( yMenuTo - yMenuFrom ) / 20 );
                if ( yMenuTo < yMenuFrom )
                        yOffset = -yOffset;

                if ( bNetscape4plus )
                        document["divMenu"].top += yOffset;
                else if ( bExplorer4plus )
                        divMenu.style.top = parseInt (divMenu.style.top, 10) + yOffset;

                timeoutNextCheck = 10;
        }

        setTimeout ("CheckUIElements()", timeoutNextCheck);
}

function OnLoad()
{
        var y;

        // we're not gonna be loaded in frames
        if ( top.frames.length )
                top.location.href = self.location.href;

        // setting initial UI elements positions
        if ( bNetscape4plus ) {
                document["divMenu"].top = top.pageYOffset + 50;
                document["divMenu"].visibility = "visible";
        }
        else if ( bExplorer4plus ) {
                divMenu.style.top = document.body.scrollTop + 69;
                divMenu.style.visibility = "visible";
        }

        // initializing UI update timer
        CheckUIElements();
        return true;
}
// 배너 따라 다니기 애드콘 끝 