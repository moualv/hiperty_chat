var _FreeApiBaseURL = 'http://api.worldweatheronline.com/free/v1/';
/*
    Please change the FreeAPIKey to your own. 
    These keys have been provided for testing only.
    If you don't have one, then register now: http://developer.worldweatheronline.com/member/register    
*/
var _FreeApiKey = 'xkq544hkar4m69qujdgujn7w';

// -------------------------------------------

function JSONP_LocalWeather(input) {
    var url = _FreeApiBaseURL + 'weather.ashx?q=' + input.query + '&format=' + input.format + '&extra=' + input.extra + '&num_of_days=' + input.num_of_days + '&date=' + input.date + '&fx=' + input.fx + '&cc=' + input.cc + '&includelocation=' + input.includelocation + '&show_comments=' + input.show_comments + '&key=' + _FreeApiKey;

    jsonP(url, input.callback);
}

function JSONP_SearchLocation(input) {
    var url = _FreeApiBaseURL + "search.ashx?q=" + input.query + "&format=" + input.format + "&timezone=" + input.timezone + "&popular=" + input.popular + "&num_of_results=" + input.num_of_results + "&key=" + _FreeApiKey;

    jsonP(url, input.callback);
}

function JSONP_TimeZone(input) {
    var url = _FreeApiBaseURL + "tz.ashx?q=" + input.query + "&format=" + input.format + "&key=" + _FreeApiKey;

    jsonP(url, input.callback);
}

function JSONP_MarineWeather(input) {
    var url = _FreeApiBaseURL + "marine.ashx?q=" + input.query + "&format=" + input.format + "&fx=" + input.fx + "&key=" + _FreeApiKey;

    jsonP(url, input.callback);
}

// -------------------------------------------

// Helper Method
function jsonP(url, callback) {
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        contentType: "application/json",
        jsonpCallback: callback,
        dataType: 'jsonp',
        success: function (json) {
            console.dir('success');
        },
        error: function (e) {
            console.log(e.message);
        }
    });
}


