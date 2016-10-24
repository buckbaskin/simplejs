var simple = simple || {};
var pr = { nt: undefined };
pr.nt = console.log;
simple.generators = {};
simple.Element = function () {
    this.children = [];
    this.silent = {};
    this.tagName = "DIV";
};
simple.Element.prototype.special_keys = {
    hidden: 1, draggable: 1, contentEditable: 1, isContentEditable: 1,
    offsetParent: 1, offsetTop: 1, offsetLeft: 1, offsetWidth: 1,
    offsetHeight: 1, style: 1, innerText: 1, outerText: 1,
    id: 1, className: 1, classList: 1, attributes: 1, innerHTML: 1,
    outerHTML: 1, scrollTop: 1, scrollLeft: 1, scrollWidth: 1, scrollHeight: 1,
    clientTop: 1, clientLeft: 1, clientWidth: 1, clientHeight: 1, tagName: 1,
    text: 1, textContent: 1, title: 1, type: 1, src: 1, nodeName: 1,
    nodeValue: 1,
};
simple.Element.prototype.build = function build(html_element) {
    pr.nt("Element.build(" + html_element + ", " + html_element.tagName + ")");
    this.silent.element = html_element;
    for (var key in html_element) {
        if (html_element.hasOwnProperty(key)) {
            this[key] = html_element[key];
        }
        else if (this.special_keys[key] === 1) {
            this[key] = html_element[key];
        }
    }
    this.children = [];
    for (var i = html_element.childNodes.length - 1; i >= 0; i--) {
        var child = html_element.childNodes[i];
        this.children.push((new simple.Element()).build(child));
    }
    ;
    return this;
};
simple.Element.prototype.render = function render() {
    if (this.element !== undefined && this.silent.element.childNodes !== undefined) {
        pr.nt("silent element childNodes len " + this.silent.element.childNodes.length);
    }
    if (this.nodeName === "#text") {
        return this.renderAsText();
    }
    if (this.tagName === "SCRIPT") {
        return this.renderAsScript();
    }
    var startHtml = "<div>";
    var endHtml = "</div>";
    var innerHtmlList = [];
    for (var i = this.children.length - 1; i >= 0; i--) {
        var child = this.children[i];
        innerHtmlList.push(child.render());
    }
    ;
    if (innerHtmlList.length === 0) {
        this.innerHtml = "";
    }
    else {
        this.innerHtml = innerHtmlList.join("\n");
    }
    if (this.innerHtml === "") {
        this.outerHtml = startHtml + endHtml;
    }
    else {
        this.outerHtml = startHtml + "\n" + this.innerHtml + "\n" + endHtml;
    }
    return this.outerHtml;
};
simple.Element.prototype.renderAsText = function renderAsText() {
    pr.nt("renderAsText(" + this.nodeValue.trim() + ")");
    return !!this.nodeValue.trim() ? this.nodeValue.trim() : "";
};
simple.Element.prototype.renderAsScript = function renderAsScript() {
    var startHtml = "<script";
    var elements = ["async", "charset", "defer", "src", "type"];
    for (var item in elements) {
        if (this[elements[item]] !== undefined) {
            startHtml += " " + elements[item] + "=\"" + this[elements[item]] + "\"";
        }
        else {
            pr.nt("fail check " + elements[item]);
        }
    }
    startHtml += ">";
    var endHtml = "</script>";
    var innerHtmlList = [];
    for (var i = this.children.length - 1; i >= 0; i--) {
        var child = this.children[i];
        pr.nt("script child " + child);
        innerHtmlList.push(child.render());
    }
    ;
    if (innerHtmlList.length === 0) {
        this.innerHtml = "";
    }
    else {
        this.innerHtml = innerHtmlList.join("\n");
    }
    if (this.innerHtml === "") {
        this.outerHtml = startHtml + endHtml;
    }
    else {
        this.outerHtml = startHtml + "\n" + this.innerHtml + "\n" + endHtml;
    }
    return this.outerHtml;
};
simple.Element.prototype.addChild = function addChild(child) {
    pr.nt("addChild(" + child + ")");
    if (child instanceof simple.Element) {
        this.children.push(child);
    }
    return this;
};
simple.base = new simple.Element();
window.onload = function onload() {
    simple.base = new simple.Element().build(document.documentElement);
    pr.nt(simple.base.children);
    pr.nt("Render!");
    pr.nt(simple.base.children[0].render());
};
