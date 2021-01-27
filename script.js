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
    const URL = `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/896057335?api_key=buepssvdyz0dclpg4nnn7caf`;
    var jqxhr = $.get(URL, function() {})
        .done(function() {
            $('.price').text('Starting at £' + jqxhr.responseJSON.results[0].price);
        })
        .fail(function() {
            console.log("Fetch Error");
        })
    const shopURL = `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/shops/FelixLovesFabric?api_key=buepssvdyz0dclpg4nnn7caf`;
    var shopResults = $.get(shopURL, function() {})
        .done(function() {
            var shipping = shopResults.responseJSON.results[0].policy_shipping;
            var shipping = shipping.toString();
            var shipping = linkify(shipping);
            var shippingLines = shipping.split('\n');
            for (var i = 0; i < shippingLines.length; i++) {
                var shippingLine = shippingLines[i];
                var shippingLineTrimmed = shippingLine.trim();
                if (isUpperCase(shippingLineTrimmed)) {
                    $("#aboutShippingInfo").append('<span class="descriptionLine bold">' + shippingLineTrimmed + '</span><br>');
                } else {
                    $("#aboutShippingInfo").append('<span class="descriptionLine">' + shippingLines[i] + '</span><br>');
                }
            }
            var announcement = shopResults.responseJSON.results[0].announcement;
            var stringAnnouncement = announcement.toString();
            var stringAnnouncement = linkify(stringAnnouncement);
            if (announcement != null) {
                $('.announcementDescription').html(stringAnnouncement);
                $('#announementHolder').show();
            }
            $('.holidayDescription').html(shopResults.responseJSON.results[0].vacation_message);
            if (shopResults.responseJSON.results[0].is_vacation == true) {
                $('#vacationHolder').show();
            } else if (localStorage.forceHoliday == "true") {
                $('#vacationHolder').show();
            } else {
                $('#vacationHolder').hide();
            }
            $('.favourites').text(shopResults.responseJSON.results[0].num_favorers);
            $('.listings').text(shopResults.responseJSON.results[0].listing_active_count);
        })
        .fail(function() {
            console.log("Fetch Error");
        })
    const categoryURL = `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/shops/FelixLovesFabric/sections?api_key=buepssvdyz0dclpg4nnn7caf`;
    var categoryResults = $.get(categoryURL, function() {})
        .done(function() {
            var categories = categoryResults.responseJSON.results;
            categories.forEach(function (item, index) {
                $('.categoryFlairHolder').append('<span class="flair categoryFlair"><a class="flairLink" href="/category.html?q=' + item.shop_section_id + '">' + item.title.toUpperCase() + '</a></span>')
            });
        })
        .fail(function() {
            console.log("Fetch Error");
        })
    const shopAboutURL = `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/shops/FelixLovesFabric/about?api_key=buepssvdyz0dclpg4nnn7caf`;
    var shopAboutResults = $.get(shopAboutURL, function() {})
        .done(function() {
            var shopAbout = shopAboutResults.responseJSON.results[0];
            var title = shopAbout.story_headline;
            var story = shopAbout.story;
            var story = story.toString();
            var story = linkify(story);
            $("#aboutTitle").text(title);
            var storyLines = story.split('\n');
            for (var i = 0; i < storyLines.length; i++) {
                var storyLine = storyLines[i];
                var storyLineTrimmed = storyLine.trim();
                if (isUpperCase(storyLineTrimmed)) {
                    $("#aboutStory").append('<span class="descriptionLine bold">' + storyLineTrimmed + '</span><br>');
                } else {
                    $("#aboutStory").append('<span class="descriptionLine">' + storyLines[i] + '</span><br>');
                }
            }
        })
        .fail(function() {
            console.log("Fetch Error");
        })
});


function getURLParameter(name) {
    return decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.search) || [null, ""])[1].replace(/\+/g, "%20")) || null;
}

function toggleAbout() {
    if ($('#aboutStory').is(":visible")) {
        $('#aboutStory').hide();
        $('.material-icons.inline-about').text('add');
    } else {
        $('#aboutStory').show();
        $('.material-icons.inline-about').text('remove');
    }
}

function toggleShipping() {
    if ($('#aboutShippingInfo').is(":visible")) {
        $('#aboutShippingInfo').hide();
        $('.material-icons.inline-shipping').text('add');
    } else {
        $('#aboutShippingInfo').show();
        $('.material-icons.inline-shipping').text('remove');
    }
}