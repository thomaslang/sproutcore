// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            portions copyright @2009 Apple Inc.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

/*global module test equals context ok same htmlbody Q$ */

var pane, view ;
module("SC.Checkbox", {
  setup: function() {
    SC.RunLoop.begin();
    pane = SC.MainPane.create({
      childViews: [
        SC.CheckboxView.extend({
          layout: { right: 20, bottom: 20, width: 100, height: 23 },
          title: "First Name",
          value: YES 
        })]
    });
    pane.append(); // make sure there is a layer...
    SC.RunLoop.end();
    
    view = pane.childViews[0];
  }, 
  
  teardown: function() {
    pane.remove();
    pane = view = null ;
  }
});

test("renders an input tag with appropriate attributes", function() {
  equals(view.get('value'), YES, 'precon - value should be YES');

  var q = Q$('input', view.get('layer'));
  equals(q.attr('type'), 'checkbox', 'should have type=checkbox');
  equals(q.attr('name'), SC.guidFor(view), 'should have name=view_guid');
  equals(q.attr('checked'), YES, 'should be checked');
});

test("should have span with title inside", function() {
  var q = Q$('span', view.get('layer'));
  ok(view.get('displayTitle').length>0, 'precond - display title should not be empty');
  equals(q.text(), view.get('displayTitle'), 'should have display title');
});

test("changing the title should update the span", function() {
  var oldDisplayTitle = view.get('displayTitle');
  SC.RunLoop.begin();
  view.set('title', 'Last Name');
  SC.RunLoop.end();

  ok(view.get('displayTitle') !== oldDisplayTitle, 'precond - should have changed display title');

  var q = Q$('span', view.get('layer'));
  equals(q.text(), view.get('displayTitle'), 'should have display title');
});

test("isEnabled=NO should add disabled class", function() {
  SC.RunLoop.begin();
  view.set('isEnabled', NO);
  SC.RunLoop.end();
  
  ok(view.$().hasClass('disabled'), 'should have disabled class');
});


test("isSelected should alter sel classname and sync with value property", function() {

  // check initial render state
  ok(view.get('isSelected'), 'isSelected should match value');
  ok(view.$().hasClass('sel'), 'should have sel class');

  // update value -- make sure isSelected changes.  
  SC.RunLoop.begin();
  view.set('value', 0); // make falsy. (but not NO exactly)
  SC.RunLoop.end();
  
  ok(!view.get('isSelected'), 'isSelected should now be NO');
  ok(!view.$().hasClass('sel'), 'should no longer have sel class');
  ok(!view.$('input').attr('checked'), 'input should not be checked');
  
  // update isSelected -- make sure it edits the value
  SC.RunLoop.begin();
  view.set('isSelected', YES);
  SC.RunLoop.end();
  
  ok(view.get('isSelected'), 'isSelected should match value');
  ok(view.$().hasClass('sel'), 'should have sel class');
  ok(view.$('input').attr('checked'), 'input should be checked');
});

test("clicking on the checkbox will change toggle the value", function() {

  ok(view.get('value'), 'precond - value should be YES');
  view.$('input').get(0).click();
  ok(!view.get('value'), 'value should now be NO');
});


test("pressing mouseDown and then mouseUp anywhere in the checkbox should toggle the selection", function() {

  var elem = view.get('layer'), input = SC.$('input', elem);
  
  SC.Event.trigger(elem, 'mousedown');
  ok(view.get('isActive'), 'view should be active');
  ok(view.get('value'), 'value should not change yet');
  
  // simulate mouseUp and browser-native change to control
  SC.Event.trigger(elem,'mouseup');
  input.attr('checked', NO);
  SC.Event.trigger(input.get(0),'click');
  
  ok(!view.get('isActive'), 'view should no longer be active');
  ok(!view.get('value'), 'value should change to NO');
  
  input = elem = null ;
});

test("isEnabled=NO should add disabled attr to input", function() {
  SC.RunLoop.begin();
  view.set('isEnabled', NO);
  SC.RunLoop.end();
  
  ok(view.$input().attr('disabled'), 'should have disabled attr');
  
  ok(view.get('value'), 'precond - value should be true');
  view.$input().get(0).click();
  ok(view.get('value'), 'value should not change when clicked');
});












