chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            var $title = $('.yt-user-info a');
            var $description = $('#eow-description');

            var title = $title.length ? $title.html() : '';
            var description = $description.length ? $description.html() : '';

            chrome.runtime.sendMessage({title: title, description: description});

            clearInterval(readyStateCheckInterval);
        }
    }, 10);
});