describe("uiIndeterminate",function(){var e,t,n;beforeEach(module("ui.indeterminate")),beforeEach(inject(function(n,r){t=r,e=n.$new()})),it("should watch ui-indeterminate and toggle the indeterminate property",function(){n=t('<input type="checkbox" ui-indeterminate="isUnknown" />')(e),expect(n[0].indeterminate).toBeFalsy(),e.isUnknown=!0,e.$apply(),expect(n[0].indeterminate).toBe(!0),e.isUnknown=!1,e.$apply(),expect(n[0].indeterminate).toBe(!1)}),it("should do nothing if not attached to input[type=checkbox]",function(){n=t('<input ui-indeterminate="isUnknown" />')(e),expect(n[0].indeterminate).toBeFalsy(),e.isUnknown=!0,e.$apply(),expect(n[0].indeterminate).toBeFalsy(),e.isUnknown=!1,e.$apply(),expect(n[0].indeterminate).toBeFalsy()})});