"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var Room = /** @class */ (function () {
    function Room() {
        this.player1 = null;
        this.player2 = null;
        this.turn = null;
        this.state = [
            ["-", "-", "-"],
            ["-", "-", "-"],
            ["-", "-", "-"],
        ];
    }
    Room.prototype.joinRoom = function (ws) {
        var playerId = (0, uuid_1.v4)();
        if (this.player1 === null)
            this.player1 = { id: playerId, ws: ws };
        else if (this.player2 === null)
            this.player2 = { id: playerId, ws: ws };
        else
            ws.send(JSON.stringify({ type: "error", error: "Room Full" }));
        ws.send(JSON.stringify({ type: "joinRoom", playerId: playerId }));
        // once both players have joined
        if (this.player1 !== null && this.player2 !== null) {
            // start the game
            this.startGame();
        }
    };
    Room.prototype.startGame = function () {
        var _a, _b, _c, _d, _e, _f;
        (_a = this.player1) === null || _a === void 0 ? void 0 : _a.ws.send(JSON.stringify({ type: "startGame" }));
        (_b = this.player2) === null || _b === void 0 ? void 0 : _b.ws.send(JSON.stringify({ type: "startGame" }));
        // choose a random starting player
        this.turn = Math.random() < 0.5 ? this.player1 : this.player2;
        (_c = this.player1) === null || _c === void 0 ? void 0 : _c.ws.send(JSON.stringify({
            type: "playTurn",
            turn: (_d = this.turn) === null || _d === void 0 ? void 0 : _d.id,
            state: this.state,
        }));
        (_e = this.player2) === null || _e === void 0 ? void 0 : _e.ws.send(JSON.stringify({
            type: "playTurn",
            turn: (_f = this.turn) === null || _f === void 0 ? void 0 : _f.id,
            state: this.state,
        }));
    };
    // TODO: handle case when a player is not present or has not joined
    Room.prototype.playTurn = function (playerId, move) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        if (((_a = this.turn) === null || _a === void 0 ? void 0 : _a.id) == playerId &&
            this.state[move.rowIdx][move.colIdx] == "-") {
            if (((_b = this.turn) === null || _b === void 0 ? void 0 : _b.id) == ((_c = this.player1) === null || _c === void 0 ? void 0 : _c.id)) {
                this.state[move.rowIdx][move.colIdx] = "X";
                this.turn = this.player2;
            }
            else if (((_d = this.turn) === null || _d === void 0 ? void 0 : _d.id) == ((_e = this.player2) === null || _e === void 0 ? void 0 : _e.id)) {
                this.state[move.rowIdx][move.colIdx] = "O";
                this.turn = this.player1;
            }
            var result = this.checkWin();
            if (result) {
                if (result === "draw") {
                    (_f = this.player1) === null || _f === void 0 ? void 0 : _f.ws.send(JSON.stringify({
                        type: "gameOver",
                        result: result,
                        state: this.state,
                    }));
                    (_g = this.player2) === null || _g === void 0 ? void 0 : _g.ws.send(JSON.stringify({
                        type: "gameOver",
                        result: result,
                        state: this.state,
                    }));
                }
                else {
                    (_h = this.player1) === null || _h === void 0 ? void 0 : _h.ws.send(JSON.stringify({
                        type: "gameOver",
                        result: "win",
                        winner: result.id,
                        state: this.state,
                    }));
                    (_j = this.player2) === null || _j === void 0 ? void 0 : _j.ws.send(JSON.stringify({
                        type: "gameOver",
                        result: "win",
                        winner: result.id,
                        state: this.state,
                    }));
                }
            }
            else {
                (_k = this.player1) === null || _k === void 0 ? void 0 : _k.ws.send(JSON.stringify({
                    type: "playTurn",
                    turn: (_l = this.turn) === null || _l === void 0 ? void 0 : _l.id,
                    state: this.state,
                }));
                (_m = this.player2) === null || _m === void 0 ? void 0 : _m.ws.send(JSON.stringify({
                    type: "playTurn",
                    turn: (_o = this.turn) === null || _o === void 0 ? void 0 : _o.id,
                    state: this.state,
                }));
            }
        }
    };
    Room.prototype.checkWin = function () {
        var _this = this;
        // check row
        this.state.forEach(function (row) {
            if (row[0] === row[1] && row[1] === row[2] && row[2] === "X") {
                return _this.player1;
            }
            else if (row[0] === row[1] && row[1] === row[2] && row[2] === "O") {
                return _this.player2;
            }
        });
        // check column
        for (var i = 0; i <= 2; i++) {
            if (this.state[0][i] === this.state[1][i] &&
                this.state[1][i] === this.state[2][i]) {
                if (this.state[0][i] === "X") {
                    return this.player1;
                }
                else if (this.state[0][i] === "O") {
                    return this.player2;
                }
            }
        }
        // check diagonal
        if (this.state[0][0] === this.state[1][1] && this.state[1][1] === this.state[2][2]) {
            if (this.state[0][0] === "X") {
                return this.player1;
            }
            else if (this.state[0][0] === "O") {
                return this.player2;
            }
        }
        if (this.state[0][2] === this.state[1][1] && this.state[1][1] === this.state[2][0]) {
            if (this.state[0][2] === "X") {
                return this.player1;
            }
            else if (this.state[0][2] === "O") {
                return this.player2;
            }
        }
        var isDraw = true;
        this.state.forEach(function (row) {
            if (row.includes("-")) {
                isDraw = false;
            }
        });
        return isDraw ? "draw" : null;
    };
    return Room;
}());
exports.default = Room;
