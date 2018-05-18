import {Module} from '@nestjs/common';
import {BotInitService} from './services/bot.init.service';
import {BotController} from './bot.controller';
import {BotEventHandler} from './services/bot.event.handler';
import {BotEventService} from './services/bot.event.service';

@Module({
    imports: [],
    controllers: [BotController],
    providers: [BotInitService, BotEventHandler, BotEventService],
})
export class BotModule {
}
