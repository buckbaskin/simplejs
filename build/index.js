var x = "the other string";
simple.load("template", function (contents) {
    simple.template("content", contents);
});
simple.loadAndTemplate("template", "content");
