/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _iinbin = __webpack_require__(1);

var _iinbin2 = _interopRequireDefault(_iinbin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iinbin = new _iinbin2.default();
iinbin.type;
iinbin.value;
iinbin.methods;
iinbin.value = document.getElementById('iin').value = '901123300254'; //this is invalid iin

console.log(iinbin.type);

document.getElementById('iin').onchange = function (e) {
    iinbin.value = e.target.value;
};

document.getElementById('value').onclick = function () {
    return console.info(iinbin.value);
};
document.getElementById('get-type').onclick = function () {
    return console.info(iinbin.type);
};
document.getElementById('results').onclick = function () {
    console.log('<---------------------------------------------------------------------->');
    if (iinbin.type === 'IIN') {

        console.info('gender: ' + iinbin.methods.gender());
        console.info('registrationNumber: ' + iinbin.methods.registrationNumber());
        console.info('birthCentury: ' + iinbin.methods.birthCentury());

        console.info('birthDay: ' + iinbin.methods.birthDay());
        console.info('birthMonth: ' + iinbin.methods.birthMonth());
        console.info('birthYear: ' + iinbin.methods.birthYear());

        console.info('birthDate: ' + iinbin.methods.birthDate());
        console.info('birthDateLocale-ru: ' + iinbin.methods.birthDateLocale('ru', _iinbin.options));
        console.info('birthDateLocale-kz: ' + iinbin.methods.birthDateLocale('kz', _iinbin.options));
        console.info('birthDateLocale-en: ' + iinbin.methods.birthDateLocale('en', _iinbin.options));
        console.dir(iinbin.data);
    }
    if (iinbin.type === 'BIN') {
        console.info('regMonth: ' + iinbin.methods.regMonth());
        console.info('regYear: ' + iinbin.methods.regYear());
        console.info('legalEntityType: ' + iinbin.methods.legalEntityType());

        console.info('legalEntityAttribute: ' + iinbin.methods.legalEntityAttribute());
        console.dir(iinbin.data);
    }
    document.getElementById('result').innerHTML = JSON.stringify(iinbin.data, undefined, 2);
};
console.dir(iinbin.methods);
document.getElementById('results').onclick();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var options = exports.options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
};

var IinBin = function () {
    function IinBin() {
        _classCallCheck(this, IinBin);

        this._value, this._type, this._seventhNumber, this._seventhNumber, this._fifthNumber = null;

        this._array = [];
        this._isEmpty = function (val) {
            return !(val || false);
        };
    }

    _createClass(IinBin, [{
        key: 'type',
        get: function get() {
            if (this._isEmpty(this._type)) {
                console.warn('Type doesn\'t calculated!');
                return;
            }
            return ('' + this._type).toUpperCase();
        }
    }, {
        key: 'value',
        get: function get() {
            if (this._isEmpty(this._value)) {
                console.warn('Value doesn\'t setted!');
                return;
            }
            return this._value;
        },
        set: function set(newValue) {
            var _this = this;

            try {
                if (newValue.length !== 12) throw new Error('Length should be 12 symbols!');
                if (!/[0-9]{12}/.test(newValue)) throw new Error('Value should include only numbers!');
                //check control number
                var firstControlSet = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
                var secondControlSet = [3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2];
                var controll = 0;
                this._array = Array.from(newValue).map(function (el, i) {
                    if (i < 11) controll += el * firstControlSet[i];
                    return parseInt(el);
                });
                controll = controll % 11;
                if (controll === 10) {
                    controll = 0;
                    this._array.map(function (el, i) {
                        return controll += el * secondControlSet[i];
                    });
                    controll = controll % 11;
                }
                if (controll !== this._array[11]) {
                    throw new Error('Invalid control number!');
                }
                this._type = function () {
                    var checkiinOrBinArray = [0, 1, 2, 3];
                    _this._fifthNumber = _this._array[4];
                    return checkiinOrBinArray.indexOf(_this._fifthNumber) !== -1 ? 'iin' : 'bin';
                }();
                this._value = newValue;
                this._seventhNumber = this._array[6];
                console.info(this._value + ' is ' + this._type);
            } catch (exception) {
                console.error(exception);
            }
        }
    }, {
        key: 'data',
        get: function get() {
            var result = {
                value: this.value,
                type: this.type
            };
            var methods = this.methods;
            if (this.type === 'IIN') {
                return _extends({}, result, {
                    gender: methods.gender(),
                    birthCentury: methods.birthCentury(),
                    registrationNumber: methods.registrationNumber(),
                    birthDay: methods.birthDay(),
                    birthMonth: methods.birthMonth(),
                    birthYear: methods.birthYear(),
                    birthDate: methods.birthDate()
                });
            } else if (this.type === 'BIN') {
                return _extends({}, result, {
                    regMonth: methods.regMonth(),
                    regYear: methods.regYear(),
                    legalEntityType: methods.legalEntityType(),
                    legalEntityAttribute: methods.legalEntityAttribute()
                });
            }
        }
    }, {
        key: 'methods',
        get: function get() {
            var _this2 = this;

            if (this.type === 'IIN') {
                return {
                    //пол
                    gender: function gender() {
                        return _this2._seventhNumber % 2 == 1 ? 'male' : 'female';
                    },
                    //век рождения
                    birthCentury: function birthCentury() {
                        switch (_this2._seventhNumber) {
                            case 1:
                            case 2:
                                return '19';
                                break;
                            case 3:
                            case 4:
                                return '20';
                                break;
                            case 5:
                            case 6:
                                return '21';
                                break;
                        }
                    },
                    //номер регистрации
                    registrationNumber: function registrationNumber() {
                        return _this2._value.substring(7, 10);
                    },
                    //день рождения
                    birthDay: function birthDay() {
                        return _this2._value.substring(4, 6);
                    },
                    //год рождения
                    birthYear: function birthYear() {
                        var century = _this2.methods.birthCentury();
                        return parseInt(century - 1) * 100 + parseInt(_this2._value.substring(0, 2));
                    },
                    //месяц рождения
                    birthMonth: function birthMonth() {
                        return parseInt(_this2._value.substring(2, 4));
                    },
                    //дата рождения
                    birthDate: function birthDate() {
                        return new Date(Date.UTC(_this2.methods.birthYear(), _this2.methods.birthMonth() - 1, _this2.methods.birthDay()));
                    },
                    //дата рождения(локализация, опции)
                    birthDateLocale: function birthDateLocale(locale, options) {
                        var date = _this2.methods.birthDate();
                        var formatter = new Intl.DateTimeFormat(locale, options);
                        return formatter.format(date);
                    }
                };
            } else if (this.type === 'BIN') {
                return {
                    //месяц регистрации
                    regMonth: function regMonth() {
                        return parseInt(_this2._value.substring(2, 4));
                    },
                    //год регистрации
                    regYear: function regYear() {
                        return parseInt(_this2._value.substring(0, 2));
                    },
                    //Тип юридического лица
                    legalEntityType: function legalEntityType() {
                        switch (_this2._fifthNumber) {
                            case 4:
                                return 'resident'; //для юридических лиц-резидентов
                                break;
                            case 5:
                                return 'non-resident'; //для юридических лиц-нерезидентов
                                break;
                            case 6:
                                return 'individual-entrepreneurs'; //для индивидуальных предпринимателей, осуществляющих деятельность на основе совместного предпринимательства
                                break;
                            case 7:
                            case 8:
                            case 9:
                                return 'reserved'; //резервные значения
                                break;
                        }
                    },
                    //детализация юридического лица
                    legalEntityAttribute: function legalEntityAttribute() {
                        var sixthNumber = parseInt(_this2._array[5]);
                        switch (sixthNumber) {
                            case 0:
                                return 'head-office'; //признак головного подразделения ЮЛ или ИП(С);
                                break;
                            case 1:
                                return 'branch-office'; //признак филиала ЮЛ или ИП(С);
                                break;
                            case 2:
                                return 'representative-office'; //признак представительства ЮЛ или ИП(С);
                                break;
                            case 3:
                                return 'another-isolated-structural-unit'; //признак иного обособленного структурного подразделения ЮЛ или ИП(С);
                                break;
                            case 4:
                                return 'peasant-farming'; //признак крестьянского (фермерского) хозяйства, осуществляющего деятельность на основе совместного предпринимательства;
                                break;
                        }
                    }
                };
            }
        }
    }]);

    return IinBin;
}();

exports.default = IinBin;

/***/ })
/******/ ]);