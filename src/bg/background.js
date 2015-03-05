chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        sendResponse();
        if (request.title !== undefined) {
            chrome.storage.sync.get(null, function (resp) {
                for (var key in resp) {
                    chrome.tabs.getSelected(null, function (tab) {
                        var replace = tab.url.replace('https://www.youtube.com/watch?', '');
                        var queryString = QueryString(replace);
                        if (queryString.v !== undefined && queryString.t === undefined) {
                            var obj = resp[key];
                            if (request.title.search(obj.url) !== -1 || request.description.search(obj.url) !== -1) {
                                var newUrl = tab.url + '&t=' + buildTime(obj);
                                chrome.tabs.update(sender.tab.id, {url: newUrl});
                                return false;
                            }
                        } else {
                            //console.log('has t');
                        }

                    });
                }
            });
        }
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