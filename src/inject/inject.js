chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            var $title = $('.yt-user-info a');
            var $description = $('#eow-description');

            var title = $title.length ? $title.html() : '';
            var description = $description.length ? $description.html() : '';
            var url = document.URL;

            document.addEventListener("click", function (e) {
                chrome.runtime.sendMessage({title: title, description: description, url: url});
            }, true);

            chrome.runtime.sendMessage({title: title, description: description});

            clearInterval(readyStateCheckInterval);
        }
    }, 10);
});