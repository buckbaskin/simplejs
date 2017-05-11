// create the simple object in the global namespace
let simple = (function(window, document) {
    let simple = {
        init: undefined,
        template: undefined,
        load: undefined,
    };
    let init_ran = false;
    simple.init = function init() {
        // run code when the window loads
        if (!init_ran) { // run once
            init_ran = true;
            console.log("init ran");
        }
        console.log("init skipped");
    };

    let validate = function validate(html: string) {
        let temp = document.createElement("div");
        temp.innerHTML = html;
        if (temp.innerHTML !== html) {
            console.log(">" + html + "<", "vs");
            console.log(">" + temp.innerHTML + "<");
        }

        return true;
        // return temp.innerHTML === html;
    };

    simple.template = function template(cls: string, innerHtml: string) {
        console.log("template running");
        if (!validate(innerHtml)) {
            console.log("Failed validation");
            return false;
        } else {
            console.log("passed validation");
        }
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

    return simple;
})(window, document);
window.addEventListener("load", simple.init);
