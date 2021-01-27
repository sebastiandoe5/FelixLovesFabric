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
    const categoryURL = `https://thingproxy.freeboard.io/fetch/https://openapi.etsy.com/v2/shops/FelixLovesFabric/sections/` + getURLParameter('q') + `?api_key=buepssvdyz0dclpg4nnn7caf`;
    var categoryResults = $.get(categoryURL, function() {})
        .done(function() {
            $('#categoryTitle').text(categoryResults.responseJSON.results[0].title);
        })
        .fail(function() {
            console.log("Fetch Error");
        })
    const listingsURL = `https://thingproxy.freeboard.io/fetch/https://openapi.etsy.com/v2/shops/FelixLovesFabric/sections/` + getURLParameter('q') + `/listings?api_key=buepssvdyz0dclpg4nnn7caf&includes=Images`;
    var listingsResults = $.get(listingsURL, function() {})
        .done(function() {
            var listings = listingsResults.responseJSON.results;
            listings.forEach(function (item, index) {
                if (item.state != "sold_out") {
                    if (item.state != "expired") {
                        if (item.state != "removed") {
                            if (item.state != "edit") {
                                $('.categoryItems').append(`
                                    <div class="individualProduct">
                                        <img alt="Product Image" class="individualProductImage" src="` + item.Images[0].url_570xN + `"/>
                                        <span class="individualProductTitle">` + item.title + `</span><br>
                                        <span class="individualProductPrice">£` + item.price + `</span><br>
                                        <span><span class="qtyRemaining">` + item.quantity + `</span> Remaining</span><br>
                                        <a href="` + item.url + `" target="_blank" class="smallButton etsy">Get on Etsy</a>
                                    </div>
                                `);
                                $('.noItemsFound').hide();
                            }
                        }
                    }
                }
            });
            if ($(".categoryItems").html().includes(`<span class="noItemsFound">Loading...</span>`)) {
                $('.noItemsFound').text("Sorry, it seems that we've sold out of all the fabrics in this category.");
                $('.noItemsFound').show();
            }
        })
        .fail(function() {
            console.log("Fetch Error");
        })
});

function getURLParameter(name) {
    return decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.search) || [null, ""])[1].replace(/\+/g, "%20")) || null;
}