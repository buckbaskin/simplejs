// this is a standin for TS
// tslint:disable-next-line:no-var-keyword
var QUnit = QUnit || {module: undefined, test: undefined};

QUnit.module("basic");
QUnit.test( "a basic test example", function( assert ) {
      // assert.expect(1); // expect 1 qunit test
      const value = "hello";
      // assert.equal( value, "hello", "We expect value to be hello" );
    });
QUnit.module("simplr tests", {
  beforeEach: function() {}
});
QUnit.test("the first simplr test", function( assert ) {
  // assert.strictEqual(1, 1);
  // assert.ok(simple);
  // assert.ok(simple.base);
  // assert.ok(simple.loader);
});
QUnit.test("the second simplr test", function( assert ) {
  console.log("second simplr test.");
  // simple.loader(); // "onload"
  // simple.render();
  // assert that the page is re-rendered the same as before
  // assert.equal(
  //   simple.base.inner_html.replace(/\s/g, "").toLowerCase(),
  //   simple.base.innerHTML.replace(/\s/g, "").toLowerCase(),
  //   "Check to see if the rendering is the same as the original");
});