import {
    world,
    Player
} from "mojang-minecraft"

/**
 * 
 * @param {function} func 
 * @param {number} ticktime 
 * @returns {Promise}
 */
export function tickingEvent(func, ticktime = 0) {
    return new Promise((resolve) => {
        ticktime = ticktime | 0;
        const event = () => {
            if (ticktime > 0) {
                func();
                ticktime--;
            } else {
                world.events.tick.unsubscribe(event);
                resolve();
            }
        };
        world.events.tick.subscribe(event);
    })

}
/**
 * 
 * @param {string} cmd 
 * @param {number} ticktime 
 * @param {Player} player 
 */
export function tickingPlayerCmd(cmd, ticktime = 0, player) {
    return tickingEvent(() =>{
        player.runCommand(`${cmd}`)
    }, ticktime)
}