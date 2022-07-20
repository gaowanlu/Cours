'use strict';

/**
 * common static source route
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 * @param {info} context 
 * @param {string} filePath 
 */
var staticRoute = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, context, filePath) {
        var readStream, extName, contentType;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;

                        fs.accessSync(filePath, fs.constants.R_OK);
                        _context.next = 9;
                        break;

                    case 4:
                        _context.prev = 4;
                        _context.t0 = _context['catch'](0);

                        res.writeHead(404, {});
                        res.end();
                        return _context.abrupt('return');

                    case 9:
                        readStream = fs.ReadStream(filePath);
                        extName = path.extname(filePath);
                        contentType = mime.lookup(extName);

                        res.writeHead(200, {
                            'Content-Type': contentType,
                            'Accept-Ranges': 'bytes',
                            'Server': 'Works.js'
                        });
                        readStream.on('close', function () {
                            res.end();
                        });
                        readStream.pipe(res);

                    case 15:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 4]]);
    }));

    return function staticRoute(_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fs = require('fs');
var path = require('path');
var mime = require('mime-types');

module.exports = staticRoute;