!(function (y) { "use strict"; y.subformRepeatable = function (e, t) { if (this.$container = y(e), this.$container.data("subformRepeatable")) return o; this.$container.data("subformRepeatable", o), this.options = y.extend({}, y.subformRepeatable.defaults, t), this.template = "", this.prepareTemplate(), this.$containerRows = this.options.rowsContainer ? this.$container.find(this.options.rowsContainer) : this.$container; var o = this; this.$container.on("click", this.options.btAdd, (function (e) { e.preventDefault(); var t = y(this).parents(o.options.repeatableElement); t.length || (t = null), o.addRow(t) })), this.$container.on("click", this.options.btRemove, (function (e) { e.preventDefault(); var t = y(this).parents(o.options.repeatableElement); o.removeRow(t) })), this.options.btMove && this.$containerRows.sortable({ items: this.options.repeatableElement, handle: this.options.btMove, tolerance: "pointer" }), this.$container.trigger("subform-ready") }, y.subformRepeatable.prototype.prepareTemplate = function () { if (this.options.rowTemplateSelector) this.template = y.trim(this.$container.find(this.options.rowTemplateSelector).last().html()) || ""; else { var e = this.$container.find(this.options.repeatableElement).get(0), t = y(e).clone(); try { this.clearScripts(t) } catch (e) { window.console && console.log(e) } this.template = t.prop("outerHTML") } }, y.subformRepeatable.prototype.addRow = function (e) { var t = this.$containerRows.find(this.options.repeatableElement).length; if (t >= this.options.maximum) return null; var o = y.parseHTML(this.template); e ? y(e).after(o) : this.$containerRows.append(o); var r = y(o); r.attr("data-new", "true"), this.fixUniqueAttributes(r, t); try { this.fixScripts(r) } catch (e) { window.console && console.log(e) } return this.$container.trigger("subform-row-add", r), r }, y.subformRepeatable.prototype.removeRow = function (e) { this.$containerRows.find(this.options.repeatableElement).length <= this.options.minimum || (this.$container.trigger("subform-row-remove", e), e.remove()) }, y.subformRepeatable.prototype.fixUniqueAttributes = function (e, t, o, r) { var a = void 0 === o ? e.attr("data-group") : o, i = void 0 === r ? e.attr("data-base-name") : r, n = void 0 === t ? 0 : t, s = i + n; e.attr("data-group", s); for (var l = e.find("[name]"), p = {}, f = 0, c = l.length; f < c; f++) { var u = y(l[f]), h = u.attr("name"), d = h.replace(/(\[\]$)/g, "").replace(/(\]\[)/g, "__").replace(/\[/g, "_").replace(/\]/g, ""), m = h.replace("[" + a + "][", "[" + s + "]["), b = d.replace(a, s), v = 0, w = d; "checkbox" === u.prop("type") && h.match(/\[\]$/) ? ((v = p[d] ? p[d].length : 0) || (u.closest("fieldset.checkboxes").attr("id", b), e.find('label[for="' + d + '"]').attr("for", b).attr("id", b + "-lbl")), w += v, b += v) : "radio" === u.prop("type") && ((v = p[d] ? p[d].length : 0) || (u.closest("fieldset.radio").attr("id", b), e.find('label[for="' + d + '"]').attr("for", b).attr("id", b + "-lbl")), w += v, b += v), p[d] ? p[d].push(!0) : p[d] = [!0], u.attr("name", m), u.attr("id", b), e.find('label[for="' + w + '"]').attr("for", b).attr("id", b + "-lbl") } for (var g = e.find(this.options.rowTemplateSelector), R = 0; R < g.length; R++) { var $ = y(y(g[R]).prop("content")); this.fixUniqueAttributes($, n, a, i) } }, y.subformRepeatable.prototype.clearScripts = function (e) { y.fn.chosen && e.find("select.chzn-done").each((function () { var e = y(this); e.next(".chzn-container").remove(), e.show().addClass("fix-chosen") })) }, y.subformRepeatable.prototype.fixScripts = function (e) { e.find('a[onclick*="jInsertFieldValue"]').each((function () { var e = y(this), t = e.siblings('input[type="text"]').attr("id"), o = e.prev(), r = o.attr("href"); e.attr("onclick", "jInsertFieldValue('', '" + t + "');return false;"), o.attr("href", r.replace(/&fieldid=(.+)&/, "&fieldid=" + t + "&")) })), y.fn.fieldUser && e.find(".field-user-wrapper").fieldUser() }, y.subformRepeatable.defaults = { btAdd: ".group-add", btRemove: ".group-remove", btMove: ".group-move", minimum: 0, maximum: 10, repeatableElement: ".subform-repeatable-group", rowTemplateSelector: "template.subform-repeatable-template-section", rowsContainer: null }, y.fn.subformRepeatable = function (e) { return this.each((function () { var e = e || {}, t = y(this).data(); if (!t.subformRepeatable) { for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]); var r = new y.subformRepeatable(this, e); y(this).data("subformRepeatable", r) } })) }, y((function (o) { function e(e, t) { o(t || document).find("div.subform-repeatable").subformRepeatable() } e(), o(document).on("subform-row-add", e) })) })(jQuery);

