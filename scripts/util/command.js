import {
    world,
    Player
} from "mojang-minecraft";
const overworld = world.getDimension("overworld");
const the_end = world.getDimension("the end");
const the_nether = world.getDimension("nether");
class runCmd {
    /**
     * 
     * @param {string} cmd 
     * @returns {Object} 属性有data statusCode statusMessage
     * 
     */
    static overworld(cmd) {
        try {
            return overworld.runCommand(cmd);
        } catch (error) {
            overworld.runCommand(`say ${error}`);
            return error;
        };
    };
    /**
     * 
     * @param {string} cmd 
     * @returns {Object} 属性有data statusCode statusMessage
     */
    static the_end(cmd) {
        try {
            return the_end.runCommand(cmd);
        } catch (error) {
            the_end.runCommand(`say ${error}`);
            return error;
        };
    };
    /**
     * 
     * @param {string} cmd 
     * @returns {Object} 属性有data statusCode statusMessage
     */
    static the_nether(cmd) {
        try {
            return the_nether.runCommand(cmd);
        } catch (error) {
            the_nether.runCommand(`say ${error}`);
            return error;
        };
    };
    /**
     * 
     * @param {string} cmd 
     * @param {Player} player 
     */
    static playerCmd(cmd, player) {
        try {
            player.dimension.runCommand(`${cmd}`)
        } catch (error) {
            player.dimension.runCommand(`say ${error}`)
        }
    };
    /**
     * 
     * @param {string} cmd 
     * @returns {Object} 有data statusCode statusMessage属性的对象
     */
    static entries(cmd) {
        const { data, statusCode, statusMessage } = this.overworld(cmd);
        return { data, statusCode, statusMessage };
    };
    /**
     * 
     * @param {any} msg 
     */
    static log(msg) {
        this.overworld(`say ${msg}`);
    };
    /**
     * 
     * @param {string} content 屏幕显示内容
     * @param {string} ori 在屏幕显示位置
     * @param {Player} player
     */
    static title(content, player, ori = middle) {
        try {
            switch (ori) {
                case "up":
                    player.runCommand(`titleraw ${player.nameTag} title {"rawtext":[{"text":"${content}\n\n\n\n\n\n\n"}]}`);
                    break;
                case "down":
                    player.runCommand(`titleraw ${player.nameTag} title {"rawtext":[{"text":"\n\n\n\n\n\n${content}"}]}`);
                    break;
                case "middle":
                    player.runCommand(`titleraw ${player.nameTag} title {"rawtext":[{"text":"${content}"}]}`);
                    break;
                case "left":
                    player.runCommand(`titleraw ${player.nameTag} title {"rawtext":[{"text":"${content}                         "}]}`);
                    break;
                case "right":
                    player.runCommand(`titleraw ${player.nameTag} title {"rawtext":[{"text":"                         ${content}"}]}`);
                    break;
                default:
                    break;
            };
        } catch (error) {  };
    }
}
export {
    runCmd
}