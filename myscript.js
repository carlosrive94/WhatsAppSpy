var running = false;

$(function () {
    $('body')
        .append($('<button>Start</button>').click(start))
        .append($('<button>Stop</button>').click(stop))
        .append($('<button>Draw</button>').click(draw).attr('style', 'position: absolute;border: 1px solid black;background: aqua;padding: 5px;border-radius: 3px;outline: auto;bottom: 20px;left: 20px;'))
        .append($('<div></div>').attr('id', 'charteo').attr('style','width: 75%; position: absolute; vertical-align: middle; margin: 13% 13%; border: 2px solid black; border-radius: 5px;'));
});

function stop() {
    running = false;
}

function start() {
    running = true;
    while(running) {
        var $texts = $('.pane-chat .emojitext');
        var contact = $texts.eq(0).text();
        var status = $texts.eq(1).text();

        if (status === 'en línea') {
            chrome.storage.local.get(contact, function (data) {
                var time = (new Date()).getTime();
                if (!data[contact]) data[contact] = [time];
                else data[contact].push(time);
                chrome.storage.local.set(data);
            });
        }
    }
}

function draw() {
    chrome.storage.local.get(function (data) {
        var series = [];
        $.each(data, function (contact, times) {
            series.push({name: contact, data: times});
        });
        highcharteo(series);
    });
}

function highcharteo(series) {
    console.log(series);
    Highcharts.chart('charteo', {
        title: {
            text: 'Conexiones'
        },
        credits: {
            enabled: false
        },
        series: series
    });
}