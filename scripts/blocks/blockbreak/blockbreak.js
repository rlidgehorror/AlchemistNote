import {
    world
} from "mojang-minecraft"

world.events.blockBreak.subscribe((event) => {
    const block = event.brokenBlockPermutation.type;
    const player = event.player;
    const olt = event.brokenBlockPermutation.getProperty("old_leaf_type");
    switch (block.id) {
        case "minecraft:deepslate_gold_ore":
            if(Math.random() * 100 > 80){
                player.runCommand(`give ${player.nameTag} rb:dustyemerald`);
            };
            break;
        default:
            break;
    };
    if(olt.value == "oak" && (Math.random() * 100 > 90))
        event.player.runCommand(`give ${event.player.nameTag} rb:lightfromleaves 1`)
});
