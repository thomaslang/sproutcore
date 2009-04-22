// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Apple, Inc. and contributors.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

/*global module test equals context ok same notest */
var set, ret ;
module("SC.IndexSet#without", {
  setup: function() {
    set = SC.IndexSet.create(1,9);
  }
});

function iter(s) {
  var ret = [];
  s.forEach(function(k) { ret.push(k); });
  return ret ;
}

test("should return empty set when removing self", function() {
  ret = set.without(set);
  ok(ret !== set, 'is not same instance');
  same(iter(ret), []);
});

test("should return set with range removed from middle", function() {
  ret = SC.IndexSet.create(2,6);
  ret = set.without(ret);
  ok(ret !== set, 'is not same instance');
  same(iter(ret), [1,8,9]);
});

test("should return set with range removed overlapping end", function() {
  ret = set.without(SC.IndexSet.create(6,6));
  ok(ret !== set, 'is not same instance');
  same(iter(ret), [1,2,3,4,5]);
});

test("should return set with range removed overlapping beginning", function() {
  ret = set.without(SC.IndexSet.create(0,6));
  ok(ret !== set, 'is not same instance');
  same(iter(ret), [6,7,8,9]);
});


test("should return set with multiple ranges removed", function() {
  ret = set.without(SC.IndexSet.create(2,2).add(6,2));
  ok(ret !== set, 'is not same instance');
  same(iter(ret), [1,4,5,8,9]);
});

// ..........................................................
// NORMALIZED PARAMETER CASES
// 

test("passing no params should return clone", function() {
  ret = set.without();
  ok(ret !== set, 'is not same instance');
  ok(ret.isEqual(set), 'has same content');
});

test("passing single number should remove just that index", function() {
  ret = set.without(5);
  same(iter(ret), [1,2,3,4,6,7,8,9]);
});

test("passing two numbers should remove range", function() {
  ret = set.without(2,6);
  same(iter(ret), [1,8,9]);
});

test("passing range object should remove range", function() {
  ret = set.without({ start: 2, length: 6 });
  same(iter(ret), [1,8,9]);
});
