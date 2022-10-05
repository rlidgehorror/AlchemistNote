import {
    world,
    MinecraftEffectTypes,
    Player,
    Vector
} from "mojang-minecraft"
import { consoleTimeout } from "../../util/delay"
import { tickingEvent } from "../../util/ticking";
import {
    skillscroll
} from './skillscroll'
import { runCmd } from '../../util/command'
let goldencity = new skillscroll('rb:goldencity', 60);
let curseofmurder = new skillscroll('rb:curseofmurder', 60);
let nightlost = new skillscroll('rb:nightlost', 60);
let flamearray = new skillscroll('rb:flamearray', 60);
let ds = new skillscroll('minecraft:diamond_sword', 60)

world.events.beforeItemUse.subscribe((event) => {
    const player = event.source;
    const item = event.item;

    switch (item.id) {
        case goldencity.id:
            goldencity.cooldownShow(player);
            goldencity.setSkill(() => {
                player.addEffect(MinecraftEffectTypes.absorption, 1200, 4);
                player.addEffect(MinecraftEffectTypes.resistance, 100, 4);
                clearItem(player, goldencity.id);
            }, 0)
            goldencity.runSKillAsync(player);
            break;

        case curseofmurder.id:
            curseofmurder.cooldownShow(player);
            curseofmurder.setSkill(() => {
                if ((Math.random() * 10 > 9)) {
                    player.addEffect(MinecraftEffectTypes.wither, 100, 5);
                    try {
                        player.runCommand(`kill @e[r=5,name=!"${player.nameTag}"]`);
                        player.runCommand(`kill @e[r=5,type=item"]`);
                    } catch (error) { };
                };
                clearItem(player, curseofmurder.id);
            }, 0);
            curseofmurder.runSKillAsync(player);
            break;

        case nightlost.id:
            nightlost.cooldownShow(player);
            nightlost.setSkill(() => {
                player.runCommand(`effect @e[r=3] blindness 10 0 false`);
                player.runCommand(`effect @e[r=3] strength 50 0 false`);
                clearItem(player, nightlost.id);
            }, 0);
            nightlost.runSKillAsync(player);
            break;

        case flamearray.id:
            flamearray.cooldownShow(player);
            flamearray.setSkill(() => {
                player.runCommand(`particle rb:flamearray ~ ~ ~`);
                player.runCommand(`summon rb:mark "markArray" ~ ~256 ~`);
                tickingEvent(() => {
                    try {
                        player.runCommand(`execute @e[type=rb:mark,name="markArray"] ~ ~-256 ~ damage @e[r=4,name=!"${player.nameTag}"] 2 fire`);
                        player.runCommand(`execute @e[type=rb:mark,name="markArray"] ~ ~-256 ~ execute @e[r=4,name=!"${player.nameTag}"] ~ ~ ~ particle minecraft:mobflame_single ~ ~1 ~`)
                    } catch (error) { }
                }, 200)
                    .then(() => {
                        try {
                            player.runCommand(`kill @e[type=rb:mark,name="markArray"]`)
                        } catch (error) { }
                    })
                clearItem(player, flamearray.id);
            }, 0);
            flamearray.runSKillAsync(player);
            break;
        case 'minecraft:diamond_sword':
            player.setVelocity(new Vector(0, 1, 0));
            for(const e of player.getEntitiesFromViewVector()) {
                e.setVelocity(new Vector(0, 1, 0))
            }
            break;
        default:
            break;
    }

})
/**
 * 
 * @param {Player} player 
 * @param {string} item 
 */
function clearItem(player, item) {
    try {
        player.runCommand(`clear "${player.nameTag}" ${item} 0 1`)
    } catch (error) {
        consoleTimeout(`${error}`)
    }
};