// create the simple object in the global namespace
// tslint:disable-next-line:no-var-keyword
var simple = (function(window, document) {
var simple = {
    generators: undefined,
    Element: undefined,
    base: undefined,
    loader: undefined,
};

const pr = {nt: undefined};
pr.nt = console.log;

// create a generators namespace
simple.generators = {};

// define a class for the web page objects
simple.Element = function() {
    this.children = [];

    // create things that won't be in the diff
    this.silent = {};

    this.tagName = "DIV";
};

simple.Element.prototype.special_keys = {
    // generic
    accesskey: 1, class: 1, contenteditable: 1, contextmenu: 1, dir: 1,
    draggable: 1, dropzone: 1, hidden: 1, id: 1, lang: 1, spellcheck: 1,
    style: 1, tabindex: 1, title: 1, translate: 1, innerHTML: 1, outerHTML: 1,
    tagName: 1,
    // script
    async: 1, charset: 1, defer: 1, src: 1, type: 1,
    // text
    nodeName: 1, nodeValue: 1,
};

simple.Element.prototype.build = function build(html_element): Element {
    // pr.nt("Element.build(" + html_element + ", " + html_element.tagName + ")");

    this.silent.element = html_element;

    for (let key in html_element) {
        if (html_element.hasOwnProperty(key)) {
            this[key] = html_element[key];
        } else if (this.special_keys[key] === 1) {
            this[key] = html_element[key];
        }
    }

    if (html_element.tagName !== undefined) {
        if (html_element.tagName === "P") {
            // pr.nt("paragraph tag");
        }
        this.tagName === html_element.tagName;
    }

    this.children = [];
    for (let i = html_element.childNodes.length - 1; i >= 0; i--) {
        const child = html_element.childNodes[i];
        this.children.push((new simple.Element()).build(child));
    };
    return this;
};

simple.Element.prototype.render = function render(): string {
    if (this.element !== undefined && this.silent.element.childNodes !== undefined) {
        // pr.nt("silent element childNodes len " + this.silent.element.childNodes.length);
    }
    if (this.nodeName === "#text") {
        return this.renderAsText();
    }
    if (this.tagName === "SCRIPT") {
        return this.renderAsScript();
    }
    if (this.tagName === "P") {
        // pr.nt("Paragraph tag");
    }
    let start_html = "<" + this.tagName.toLowerCase() + ">";
    const end_html = "</" + this.tagName.toLowerCase() + ">";

    const inner_html_list = [];

    for (let i = this.children.length - 1; i >= 0; i--) {
        const child = this.children[i];
        inner_html_list.push(child.render());
    };
    if (inner_html_list.length === 0) {
        this.inner_html = "";
    } else {
        this.inner_html = inner_html_list.join("\n");
    }
    if (this.inner_html === "") {
        this.outer_html = start_html + end_html;
    } else {
        this.outer_html = start_html + "\n" + this.inner_html.trim() + "\n" + end_html;
    }
    return this.outer_html;
};

simple.Element.prototype.renderAsText = function renderAsText(): string {
    // pr.nt("renderAsText(" + this.nodeValue.trim() + ")");
    return !!this.nodeValue.trim() ? this.nodeValue.trim() : "";
};

simple.Element.prototype.renderAsScript = function renderAsScript(): string {
    let start_html = "<script";
    const elements = ["async", "charset", "defer", "src", "type"];
    for (let item in elements) {
        if (this[elements[item]] !== undefined && this[elements[item]] !== "") {
            start_html += " " + elements[item] + "=\"" + this[elements[item]] + "\"";
        } else {
            // pr.nt("fail check " + elements[item]);
        }
    }
    start_html += ">";
    const end_html = "</script>";
    const inner_html_list = [];
    for (let i = this.children.length - 1; i >= 0; i--) {
        const child = this.children[i];
        // pr.nt("script child " + child);
        inner_html_list.push(child.render());
    };
    if (inner_html_list.length === 0) {
        this.inner_html = "";
    }
    else {
        this.inner_html = inner_html_list.join("\n");
    }
    if (this.inner_html === "") {
        this.outer_html = start_html + end_html;
    }
    else {
        this.outer_html = start_html + "\n" + this.inner_html + "\n" + end_html;
    }
    return this.outer_html;
};
simple.Element.prototype.addChild = function addChild(child: Element): Element {
    // pr.nt("addChild(" + child + ")");
    if (child instanceof simple.Element) {
        this.children.push(child);
    }
    return this;
};

// create the base page object
pr.nt("simple.base loaded");
simple.base = new simple.Element();

simple.loader = function simple_loader() {
    // pr.nt("simple_loader load");
    simple.base = new simple.Element().build(document.documentElement);
    // pr.nt("simple.base = "+simple.base);
    // pr.nt("simple_loader done");
};
return simple;
})(window, document);

window.onload = simple.loader;