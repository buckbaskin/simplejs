// create the simple object in the global namespace
var simple = (function (window, document) {
    var simple = {
        init: undefined,
        template: undefined,
        load: undefined,
    };
    var init_ran = false;
    simple.init = function init() {
        // run code when the window loads
        if (!init_ran) {
            init_ran = true;
            console.log("init ran");
        }
        console.log("init skipped");
    };
    var validate = function validate(html) {
        var temp = document.createElement("div");
        temp.innerHTML = html;
        if (temp.innerHTML !== html) {
            console.log(">" + html + "<", "vs");
            console.log(">" + temp.innerHTML + "<");
        }
        return true;
        // return temp.innerHTML === html;
    };
    simple.template = function template(cls, innerHtml) {
        console.log("template running");
        if (!validate(innerHtml)) {
            console.log("Failed validation");
            return false;
        }
        else {
            console.log("passed validation");
        }
        var elements = document.getElementsByClassName(cls);
        var count = 0;
        if (elements.length === 0) {
            console.log("No elements found");
        }
        while (elements.length > 0 && count < 100) {
            elements[0].innerHTML = innerHtml;
            elements = document.getElementsByClassName(cls);
            count += 1;
        }
    };
    simple.load = function load(resourceId, callback) {
        var xhr = new XMLHttpRequest();
        // let start time = now();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                // Everything is good, the response was received.
                // let complete time = now();
                if (xhr.status === 200) {
                    if (callback) {
                        callback(xhr.responseText);
                    }
                }
                else {
                }
            }
            else {
            }
        };
        xhr.open("GET", resourceId + ".html", true);
        xhr.send();
    };
    return simple;
})(window, document);
window.addEventListener("load", simple.init);
