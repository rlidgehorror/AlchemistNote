import {
    world,
    MinecraftDimensionTypes,
    Dimension,
    MinecraftItemTypes
}
    from "mojang-minecraft";
import {
    ActionFormData,
    ActionFormResponse
}
    from 'mojang-minecraft-ui';
import { runCmd } from "./util/command";
import './blocks/blockbreak/blockbreak';
import "./skill/skillscroll/main";
import './skill/weapon/sword';
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
    if (msg.includes("111")) {
        event.cancel = true
        cmdasync(`say 111`)
            .then((res) => {
                runCmd.log(res);
            })

    };
});
world.events.beforeItemUse.subscribe(args => {
    const item = args.item;
    const player = args.source;
    if (item.id == "minecraft:diamond_sword") {
        // let ui = new ActionFormData()
        //     .title("测试标题")
        //     .body("测试body")
        //     .button("测试按钮")
        // ui.show(player)
        //     .then(res => {
        //         runCmd.log("测试按钮点击");
        //     })
    }

})
async function cmdasync(cmd) {
    return await world.getDimension("overworld").runCommandAsync(cmd)
        .then(resolve => {
            return resolve.successCount
        },
            reject => {
                return 0
            });

}
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