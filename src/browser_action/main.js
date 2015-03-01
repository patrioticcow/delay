function getValues() {
    var url = document.getElementById('url').value;
    var sec = document.getElementById('sec').value;
    var min = document.getElementById('min').value;
    var hour = document.getElementById('hour').value;
    var random = Math.floor((Math.random() * 1000) + (Math.random() * 1000));

    if (url !== '' && hour !== '' && min !== '' && sec !== '') {
        var obj = {};
        obj[random] = {'url': url, 'sec': sec, 'min': min, 'hour': hour};

        saveChanges(obj, random);

        setError('');
    } else {
        setError('Please fill in all fields');
    }
}

function setError(message) {
    var error = document.getElementById('error');
    error.innerHTML = '<div style="margin: 10px 0;color: red;">' + message + '</div>';
}

function getNewHtml(obj, key) {
    return '<tr id="tr_' + key + '"><td><button id="' + key + '">x</button></td><td>https://www.youtube.com/watch?v=' + obj['url'] + '</td><td>' + obj['hour'] + 'h' + obj['min'] + 'm' + obj['sec'] + 's</td></tr>';
}

function saveChanges(obj, key) {
    chrome.storage.sync.set(obj, function () {
        var result = document.getElementById('result');
        var html = getNewHtml(obj[key], key);
        result.innerHTML = html + result.innerHTML;
    });
}

function getData() {
    chrome.storage.sync.get(null, function (resp) {
        var html = '';
        for (var key in resp) {
            var obj = resp[key];
            html += getNewHtml(obj, key);
        }
        var result = document.getElementById('result');
        result.innerHTML = html;

        removeEntries();
    });
}

function removeEntries() {
    var buttons = document.getElementsByTagName("button");
    for (var i = 0; i <= buttons.length; i++) {
        var button = buttons[i];

        if (button !== undefined) {
            button.onclick = function () {
                if (this.hasAttribute('id')) {
                    var id = this.getAttribute("id");

                    if (id === 'add') getValues();

                    if (id !== 'add') {
                        var trId = document.getElementById('tr_' + id);

                        chrome.storage.sync.remove(id, function () {
                            trId.parentNode.removeChild(trId);
                        });
                    }
                }
            };
        }
    }
}

var help = document.getElementById("help");
help.onclick = function () {
    var helpContainer = document.getElementById("helpContainer");
    helpContainer.innerHTML = '<p>https://www.youtube.com/watch?v=<strong style="font-size: 14px;">vOTURWqJyhU</strong>&list=PLdouy2YpLox4e_mLf1i</p>';

    return false;
};


removeEntries();
getData();
