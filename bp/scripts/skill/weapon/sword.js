import {
    world,
    Location,
    Vector
} from "mojang-minecraft"
import { consoleTimeout } from "../../util/delay";


world.events.beforeItemUse.subscribe((event) =>{
    const player = event.source;
    const item = event.item;
})