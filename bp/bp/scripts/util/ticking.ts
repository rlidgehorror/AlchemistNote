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
export function tickingEvent(func: Function, ticktime: number = 0): Promise<any> {
    return new Promise((resolve) => {
        ticktime = ticktime | 0;
        const event = () => {
            if (ticktime > 0) {
                func();
                ticktime--;
            } else {
                world.events.tick.unsubscribe(event);
                resolve(true);
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
export function tickingPlayerCmd(cmd: string, ticktime: number = 0, player: Player) {
    return tickingEvent(() =>{
        player.runCommand(`${cmd}`)
    }, ticktime)
}