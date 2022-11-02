import {
    world,
    Player
} from "mojang-minecraft";
import { runCmd } from "./command";
/**
 * 
 * @param {function} func 延迟执行函数
 * @param {number} ticktime game-tick
 * @returns {Promise}
 */
const setTimeout = function (func, ticktime = 0) {
    return new Promise((resolve) => {
        ticktime = ticktime | 0;
        const tickEvent = () => {
            if (ticktime <= 0) {
                func();
                world.events.tick.unsubscribe(tickEvent);
                resolve();
            };
            ticktime--;
        };
        world.events.tick.subscribe(tickEvent);
    })
}
/**
 * 
 * @param {string} msg 
 * @param {number} ticktime 
 * @returns {setTimeout}
 */
const consoleTimeout = function (msg, ticktime = 0) {
    return setTimeout(() => {
        runCmd.overworld(`say ${msg}`)
    }, ticktime)
}
/**
 * 
 * @param {string} cmd 
 * @param {number} ticktime 
 * @returns 
 */
const commandTimeout = function (cmd, ticktime = 0) {
    return setTimeout(() => {
        runCmd.overworld(cmd);
    }, ticktime)
}
/**
 * 
 * @param {string} cmd 
 * @param {number} ticktime 
 * @param {Player} player 
 */
const playerCmdTimeout = function (cmd, ticktime = 0, player) {
    return setTimeout(() => {
        player.runCommand(`${cmd}`)
    }, ticktime);
}
/**
 * 
 * @param {string} char1
 * @param {string} char2
 * @param {Number} num 
 * @param {Player} player 
 * @param {Number} ticktime 
 */
async function dynamicActionbar(char1, char2 = '-', num = 0, player, ticktime = 0) {
    ticktime = ticktime | 0;
    for (let i = 0; i <= num; i++) {
        let remain = num - i;
        let showChar = `${`${char2}`.repeat(i)}${char1.repeat(remain)}`;
        await commandTimeout(`title "${player.nameTag}" actionbar ${showChar}`, ticktime);
    };

}
export {
    consoleTimeout,
    setTimeout,
    commandTimeout,
    dynamicActionbar,
    playerCmdTimeout
}