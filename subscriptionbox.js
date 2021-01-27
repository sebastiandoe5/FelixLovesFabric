function isUpperCase(str) {
    return str === str.toUpperCase();
}

function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
    return replacedText;
}

$(document).ready(function() {
    const URL = `https://crossrun.herokuapp.com/https://openapi.etsy.com/v2/listings/896057335?api_key=buepssvdyz0dclpg4nnn7caf`;
    var jqxhr = $.get(URL, function() {})
        .done(function() {
            var description = jqxhr.responseJSON.results[0].description;
            $('.price').text('Starting at £' + jqxhr.responseJSON.results[0].price);
            var descriptionLines = description.split('\n');
            for (var i = 0; i < descriptionLines.length; i++) {
                var descriptionLine = descriptionLines[i];
                var descriptionLineTrimmed = descriptionLine.trim();
                if (isUpperCase(descriptionLineTrimmed)) {
                    $("#description").append('<span class="descriptionLine bold">' + descriptionLineTrimmed + '</span><br>');
                } else {
                    $("#description").append('<span class="descriptionLine">' + descriptionLines[i] + '</span><br>');
                }
            }
        })
        .fail(function() {
            console.log("Fetch Error");
        })
});