// create the simple object in the global namespace
let simple = (function(window, document) {
    let simple = {
        init: undefined,
        template: undefined,
        load: undefined,
        loadAndTemplate: undefined,
    };
    let init_ran = false;
    simple.init = function init() {
        // run code when the window loads
        if (!init_ran) { // run once
            init_ran = true;
        }
    };

    let validate = function validate(html: string) {
        let temp = document.createElement("div");
        temp.innerHTML = html;
        if (temp.innerHTML !== html) {
            // console.log(">" + html + "<");
            // console.log(">" + temp.innerHTML + "<");
        }

        return true;
        // return temp.innerHTML === html;
    };

    simple.template = function template(cls: string, innerHtml: string) {
        if (!validate(innerHtml)) {
            return false;
        } else {}
        let elements = document.getElementsByClassName(cls);
        let count = 0;
        if (elements.length === 0) {
            console.log("No elements found");
        }
        while (elements.length > 0 && count < 100) {
            elements[0].innerHTML = innerHtml;
            elements = document.getElementsByClassName(cls);
            count += 1;
        }
    };

    simple.load = function load(resourceId: string, callback: Function) {
        let xhr = new XMLHttpRequest();
        // let start time = now();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                // Everything is good, the response was received.
                // let complete time = now();
                if (xhr.status === 200) {
                    if (callback) {
                        callback(xhr.responseText);
                    }
                } else {
                    // check other status codes and handle them
                    // call an event with .on("404") or something
                }
            } else {
                // Not ready yet.
            }
        };
        xhr.open("GET", resourceId + ".html", true);
        xhr.send();
    };

    simple.loadAndTemplate = function loadAndTemplate(
        resourceId: string, cls: string) {
        console.log("load and template");
        simple.load(resourceId, function (content) {
            simple.template(cls, content);
        });
    };

    return simple;
})(window, document);
window.addEventListener("load", simple.init);
