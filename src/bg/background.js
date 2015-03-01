chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        //sendResponse();
        chrome.storage.sync.get(null, function (resp) {
            for (var key in resp) {
                var obj = resp[key];
                var baseUrl = 'https://www.youtube.com/watch?';
                var replace = sender.url.replace(baseUrl, '');
                var queryString = QueryString(replace);

                if (queryString['v'] !== undefined && queryString['t'] === undefined) {
                    var aUrl = baseUrl + 'v=' + obj.url;
                    var bUrl = sender.url;

                    if (aUrl === bUrl) {
                        var newUrl = sender.url + '&t=' + buildTime(obj);
                        //console.log(newUrl);
                        chrome.tabs.update(null, {url: newUrl});
                    }
                } else {
                    //console.log('has t');
                }
            }
        });
    });

function buildTime(obj) {
    return obj.hour + 'h' + obj.min + 'm' + obj.sec + 's'; //&t=1h30m16s
}

function QueryString(query) {
    var query_string = {};
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
        } else if (typeof query_string[pair[0]] === "string") {
            query_string[pair[0]] = [query_string[pair[0]], pair[1]];
        } else {
            query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
}