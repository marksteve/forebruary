!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Forebruary=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Forebruary,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Forebruary = (function() {
  Forebruary.prototype.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function Forebruary(options) {
    this.updateYear = __bind(this.updateYear, this);
    this.editYear = __bind(this.editYear, this);
    this.clickMonth = __bind(this.clickMonth, this);
    this.hideMonths = __bind(this.hideMonths, this);
    this.showMonths = __bind(this.showMonths, this);
    this.clickDate = __bind(this.clickDate, this);
    this.setDate = __bind(this.setDate, this);
    this.showDate = __bind(this.showDate, this);
    this.getRow = __bind(this.getRow, this);
    this.slide = __bind(this.slide, this);
    var d, i, j, li, m, ul, w, _i, _j, _k, _l, _len, _len1, _m, _ref, _ref1;
    this.element = options.element, this.date = options.date;
    this.date = this.date || new Date();
    this.c = [];
    for (i = _i = 0; _i < 6; i = ++_i) {
      w = [];
      for (j = _j = 1; _j <= 13; j = ++_j) {
        d = i * 7 + j - 6;
        switch (false) {
          case !(d < 1):
            w.push('');
            break;
          case !(d > 31):
            break;
          default:
            w.push(d);
        }
      }
      this.c.push(w);
    }
    this.header = document.createElement("div");
    this.header.classList.add("header");
    this.month = document.createElement("strong");
    this.month.classList.add("month");
    this.month.addEventListener("click", this.showMonths, false);
    this.header.appendChild(this.month);
    this.year = document.createElement("span");
    this.year.classList.add("year");
    this.year.addEventListener("click", this.editYear, false);
    this.year.addEventListener("keypress", this.updateYear, false);
    this.year.contentEditable = "true";
    this.header.appendChild(this.year);
    this.element.appendChild(this.header);
    this.container = document.createElement("div");
    this.container.classList.add("container");
    _ref = this.c;
    for (_k = 0, _len = _ref.length; _k < _len; _k++) {
      w = _ref[_k];
      ul = document.createElement("ul");
      for (_l = 0, _len1 = w.length; _l < _len1; _l++) {
        d = w[_l];
        li = document.createElement("li");
        li.innerText = d;
        li.classList.add("date-" + d);
        li.addEventListener("click", this.clickDate.bind(this, d), false);
        ul.appendChild(li);
      }
      this.container.appendChild(ul);
    }
    this.element.appendChild(this.container);
    this.months = document.createElement("ul");
    this.months.classList.add("months");
    for (m = _m = 0, _ref1 = this.monthNames.length; 0 <= _ref1 ? _m < _ref1 : _m > _ref1; m = 0 <= _ref1 ? ++_m : --_m) {
      li = document.createElement("li");
      li.classList.add("month-" + m);
      li.addEventListener("click", this.clickMonth.bind(this, m), false);
      li.innerText = this.monthNames[m].substr(0, 3);
      this.months.appendChild(li);
    }
    this.element.appendChild(this.months);
    this.showDate();
    this.hideMonths();
  }

  Forebruary.prototype.slide = function(i) {
    this.slideIndex = i;
    return this.container.style.webkitTransform = "translateX(-" + ((i - 1) * 2) + "em)";
  };

  Forebruary.prototype.getRow = function(d) {
    return Math.floor((d + 6 - this.slideIndex) / 7);
  };

  Forebruary.prototype.showDate = function(date) {
    var d, d1, el, extraDate, li, selected, uls, x, _i, _j, _k, _l, _len, _len1, _len2, _ref, _ref1;
    date = date || this.date;
    this.month.innerText = this.monthNames[date.getMonth()];
    this.year.innerText = date.getFullYear();
    d1 = new Date(date.getFullYear(), date.getMonth(), 1);
    this.slide(7 - d1.getDay());
    uls = this.container.querySelectorAll("ul");
    selected = this.container.querySelectorAll(".selected");
    if (selected) {
      for (_i = 0, _len = selected.length; _i < _len; _i++) {
        el = selected[_i];
        el.classList.remove("selected");
      }
    }
    d = date.getDate();
    uls[this.getRow(d)].querySelector(".date-" + d).classList.add("selected");
    for (x = _j = 29; _j <= 31; x = ++_j) {
      _ref = this.container.querySelectorAll(".date-" + x);
      for (_k = 0, _len1 = _ref.length; _k < _len1; _k++) {
        li = _ref[_k];
        li.style.opacity = 0;
        extraDate = new Date(date.getFullYear(), date.getMonth(), x);
        if (extraDate.getMonth() === date.getMonth()) {
          li.style.opacity = 1;
        }
      }
    }
    _ref1 = this.months.querySelectorAll("li");
    for (_l = 0, _len2 = _ref1.length; _l < _len2; _l++) {
      li = _ref1[_l];
      li.classList.remove("selected");
    }
    return this.months.querySelector(".month-" + (date.getMonth())).classList.add("selected");
  };

  Forebruary.prototype.setDate = function(date) {
    this.date = date;
    return this.showDate();
  };

  Forebruary.prototype.clickDate = function(d, e) {
    return this.setDate(new Date(this.date.getFullYear(), this.date.getMonth(), d));
  };

  Forebruary.prototype.showMonths = function(e) {
    return this.months.style.webkitTransform = "translateY(0)";
  };

  Forebruary.prototype.hideMonths = function(e) {
    return this.months.style.webkitTransform = "translateY(-" + this.element.offsetHeight + "px)";
  };

  Forebruary.prototype.clickMonth = function(m, e) {
    this.setDate(new Date(this.date.getFullYear(), m, this.date.getDate()));
    return this.hideMonths();
  };

  Forebruary.prototype.editYear = function(e) {
    return this.year.focus();
  };

  Forebruary.prototype.updateYear = function(e) {
    if (e.keyCode === 13) {
      this.setDate(new Date(this.year.innerText, this.date.getMonth(), this.date.getDate()));
      return this.year.blur();
    }
  };

  return Forebruary;

})();

module.exports = Forebruary;



},{}]},{},[1])(1)
});