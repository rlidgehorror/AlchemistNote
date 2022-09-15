import { runCmd } from "../../util/command";
import {
    Player
} from 'mojang-minecraft'
export class array {
    duration: number;
    id: string
    /**
     * 
     * @param {string} id 
     * @param {number} dur 
     */
    constructor(id: string, dur: number = 0) {
        this.id = id;
        this.duration = dur;
    };
    /**
     * 
     * @param {number} dur 
     * @returns {this}
     */
    setDuration(dur: number): this {
        this.duration = dur;
        return this;
    };
}
