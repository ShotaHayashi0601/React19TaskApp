"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = formatDate;
exports.formatDateTime = formatDateTime;
const date_fns_1 = require("date-fns");
function formatDate(date) {
    return (0, date_fns_1.format)(date, 'yyyy-MM-dd');
}
function formatDateTime(date) {
    return (0, date_fns_1.format)(date, 'yyyy-MM-dd HH:mm');
}
