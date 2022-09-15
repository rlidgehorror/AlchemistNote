import {
    world
}
    from "mojang-minecraft";
import { runCmd } from "./util/command";
import './blocks/blockbreak/blockbreak'
import "./skill/skillscroll/main"
import './skill/weapon/sword'
import { tickingEvent, tickingPlayerCmd } from "./util/ticking";
import { commandTimeout, consoleTimeout } from "./util/delay";
world.events.beforeChat.subscribe((event) => {
    const player = event.sender;
    const msg = event.message;
    if (msg.includes("hi")) {
        tickingPlayerCmd(`say 1`, 5, player)
            .then(() => {
                player.runCommand(`say done`)
            })
    };
})
world.events.tick.subscribe((e) => {
    const player = [...world.getPlayers()];
    // const inv = player.getComponent("minecraft:inventory").container;
    // for(let i = 0;i <= inv.size; i++){
    //     consoleTimeout(`${inv.getItem(i).id}`, 10)
    // }
    for (const i of player) {
        try {
            const viewBlock = i.getBlockFromViewVector();
            i.runCommand(`titleraw ${player[0].nameTag} actionbar 
            {
                "rawtext":[
                    {"text":"方块：${viewBlock.id}\n"},
                    {"text":"坐标：(${viewBlock.x}, ${viewBlock.y}, ${viewBlock.z})\n"},
                    {"text":"是否含水：${viewBlock.isWaterlogged}\n"},
                    {"text":"是否可以含水：${viewBlock.type.canBeWaterlogged}\n"}
                ]
            } `)
        } catch (error) { }
    }
})