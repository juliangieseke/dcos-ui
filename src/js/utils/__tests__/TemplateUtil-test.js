const React = require("react");
const TemplateUtil = require("../TemplateUtil");

let thisDummyPage;

describe("Template Util", function() {
  const DummyHeader = () => <h1>Header</h1>;
  const DummyHeader2 = () => <h2>Header 2</h2>;
  const DummyFooter = () => <p>Footer</p>;

  beforeEach(function() {
    thisDummyPage = () => (
      <div>
        <DummyHeader />
        <p>A regular child 1</p>
        <p>A regular child 2</p>
      </div>
    );
    TemplateUtil.defineChildren(thisDummyPage, { Header: DummyHeader });
  });

  describe("#defineChildren", function() {
    it("makes children accessible via the parent constructor", function() {
      expect(thisDummyPage.Header).toBe(DummyHeader);
    });

    it("tracks the type of each child", function() {
      TemplateUtil.defineChildren(thisDummyPage, { Footer: DummyFooter });
      expect(TemplateUtil.getTypesOfTemplateChildren(thisDummyPage)).toEqual([
        DummyHeader,
        DummyFooter
      ]);
    });

    it("allows a template children to be overridden", function() {
      TemplateUtil.defineChildren(thisDummyPage, { Header: DummyHeader2 });
      expect(thisDummyPage.Header).toBe(DummyHeader2);
    });
  });

  describe("#filterTemplateChildren", function() {
    it("returns all children of an instance which are not template children", function() {
      const children = TemplateUtil.filterTemplateChildren(thisDummyPage, [
        <DummyHeader />,
        <p>A regular child 1</p>,
        <p>A regular child 2</p>
      ]);
      expect(children.map(child => child.type)).toEqual(["p", "p"]);
    });
  });

  describe("#getChildOfType", function() {
    it("returns the first child of an instance with the appropriate type", function() {
      const child = TemplateUtil.getChildOfType(
        [<DummyHeader />, <p>A regular child 1</p>, <p>A regular child 2</p>],
        DummyHeader
      );
      expect(child.type).toBe(DummyHeader);
    });
  });
});
