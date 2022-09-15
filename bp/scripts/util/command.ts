import {
    world,
    Player,
    Entity
} from "mojang-minecraft";
const overworld = world.getDimension("overworld");
const the_end = world.getDimension("the end");
const the_nether = world.getDimension("nether");
interface cmdReturn {
    data: string,
    statusCode: number,
    statusMessage: string
}
class runCmd {
    /**
     * 
     * @param {string} cmd 
     * @returns {cmdReturn} 属性有data statusCode statusMessage
     * 
     */
    static overworld(cmd: string): cmdReturn {
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
     * @returns {cmdReturn} 属性有data statusCode statusMessage
     */
    static the_end(cmd: string): cmdReturn {
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
     * @returns {cmdReturn} 属性有data statusCode statusMessage
     */
    static the_nether(cmd: string): cmdReturn {
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
     * @param {entity} entity
     * @returns {cmdReturn} 属性有data statusCode statusMessage
     */
    static playerCmd(cmd: string, entity: Entity): cmdReturn {
        try {
            return entity.dimension.runCommand(`${cmd}`)
        } catch (error) {
            return entity.dimension.runCommand(`say ${error}`)
        }
    }
    /**
     * 
     * @param {string} msg 
     */
    static log(msg: string): void {
        runCmd.overworld(`say ${msg}`)
    }
}
export {
    runCmd
}