import { runCmd } from "../../util/command";
import {
    Player
} from 'mojang-minecraft'
export class array {
    /**
     * 
     * @param {string} id 
     * @param {number} dur 
     */
    constructor(id, dur = 0) {
        this.id = id;
        this.duration = dur;
    };
    /**
     * 
     * @param {number} dur 
     * @returns {this}
     */
    setDuration(dur) {
        this.duration = dur;
        return this;
    };
}
