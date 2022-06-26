"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesGateway = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let RoutesGateway = class RoutesGateway {
    constructor(kafkaClient) {
        this.kafkaClient = kafkaClient;
    }
    async onModuleInit() {
        console.log('iniciou');
        this.kafkaProducer = await this.kafkaClient.connect();
        console.log(this.kafkaProducer);
    }
    handleMessage(client, payload) {
        this.kafkaProducer.send({
            topic: 'route.new-direction',
            messages: [
                {
                    key: 'route.new-direction',
                    value: JSON.stringify({
                        routeId: payload.routeId,
                        clientId: client.id,
                    }),
                },
            ],
        });
    }
    sendPosition(data) {
        const { clientId } = data, rest = __rest(data, ["clientId"]);
        const clients = this.server.sockets.connected;
        if (!(clientId in clients)) {
            console.error('Client not exists, refresh React Application and resend new direction again.');
            return;
        }
        clients[clientId].emit('new-position', rest);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], RoutesGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('new-direction'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], RoutesGateway.prototype, "handleMessage", null);
RoutesGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __param(0, (0, common_1.Inject)('KAFKA_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka])
], RoutesGateway);
exports.RoutesGateway = RoutesGateway;
//# sourceMappingURL=routes.gateway.js.map