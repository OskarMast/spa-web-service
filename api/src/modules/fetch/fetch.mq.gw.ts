import { Component } from "@nestjs/common";
import { FetchExploreResultDto, FetchResultDto, FetchMessageDto } from "./dto/fetch.dto";
import { FetchMessage, MessageStatus } from "./dto/fetch.message";
import PersonCoreDto from "../person/person.dto";
import { MqGwDecorators } from "../../../../lib/mq-gw-api/src/decorators/mq.gw.decorators";
import MqGwProducer = MqGwDecorators.MqGwProducer;
import MqGwConsumer = MqGwDecorators.MqGwConsumer;


@Component()
export class FetchResultsGw {

    private static THIS: FetchResultsGw;

    constructor() {
        FetchResultsGw.THIS = this;
        // const obj = {
        //     person: {
        //         status: MessageStatus.OK,
        //         clientName: 'beagleWeb',
        //     }
        // }
        // setTimeout(() => this.publishMessage(obj), 5000);
    }


    @MqGwProducer({ name: 'fetchExplore', gateway: 'person.clientName' })
    async publishFetchExploreResult(fetchExploreResultDto: FetchExploreResultDto) {
        console.log("publishFetchExplore: " + JSON.stringify(fetchExploreResultDto));
        return fetchExploreResultDto;
    }

    @MqGwProducer({ name: 'fetchResult', gateway: 'person.clientName' })
    async publishFetchResult(fetchResultDto: FetchResultDto) {
        console.log("publishFetchResult" + JSON.stringify(fetchResultDto))
        return fetchResultDto
    }

    @MqGwProducer({ name: 'fetchMessage', gateway: 'person.clientName' })
    async publishMessage(message: any, person?: any) {
        let fetchMessage: FetchMessageDto = { message: message, person: person };
        console.log("publishMessage" + JSON.stringify(fetchMessage))
        return message;
    }

    @MqGwConsumer({ name: 'fetchMessage', gateway: 'person.clientName' })
    async consumeMessage(message: any) {
        console.log("THIS: ", this);
        console.log("MESSAGE:" + message.status);
    }

}
