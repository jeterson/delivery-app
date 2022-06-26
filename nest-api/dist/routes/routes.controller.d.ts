/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indizes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { OnModuleInit } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { ClientKafka } from '@nestjs/microservices';
import { RoutesGateway } from './routes.gateway';
export declare class RoutesController implements OnModuleInit {
    private readonly routesService;
    private kafkaClient;
    private routeGateway;
    private kafkaProducer;
    constructor(routesService: RoutesService, kafkaClient: ClientKafka, routeGateway: RoutesGateway);
    onModuleInit(): Promise<void>;
    create(createRouteDto: CreateRouteDto): string;
    findAll(): import("mongoose").Query<(import("./entities/route.entity").Route & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("./entities/route.entity").Route & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("./entities/route.entity").RouteDocument>;
    findOne(id: string): string;
    update(id: string, updateRouteDto: UpdateRouteDto): string;
    remove(id: string): string;
    startRoute(id: string): void;
    consumeNewPosition(message: {
        value: {
            Finished: boolean;
            ID: string;
            ClientID: string;
            Position: number[];
        };
    }): void;
}
