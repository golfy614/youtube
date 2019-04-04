import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";

import "./main.html";

Template.hello.onCreated(function helloOnCreated() {
  const template = Template.instance();
  template.search = new ReactiveVar();
});

Template.hello.helpers({
  search() {
    const template = Template.instance();
    return template.search.get();
  },
  "No": function (index) {
      index++
      return index
  }
});

Template.hello.events({
  'submit [id="search"]': function(event, template) {
    event.preventDefault();
    const keyword = event.target.search.value;
    console.log("keyword", keyword);
    Meteor.call("Search", keyword, function(err, res) {
      template.search.set(res);
    });
  }
});
