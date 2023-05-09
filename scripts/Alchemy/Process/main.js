import { 
    world,
    BeforeItemUseEvent
 } from "mojang-minecraft";
 import { runCmd } from "../../util/command";

 world.events.beforeItemUse.subscribe(items);

 /**
  * 
  * @param {BeforeItemUseEvent} item 
  */
 const items = (item) => {
    
 }