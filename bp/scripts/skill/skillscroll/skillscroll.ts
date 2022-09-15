import {
    consoleTimeout,
    setTimeout,
} from '../../util/delay'
import {
    Player,
    Entity
} from 'mojang-minecraft'
import {
    runCmd
} from '../../util/command';

interface skillqueue {
    skillFunc: Function,
    time: number
}

export class skillscroll /**@class */ {
    id: string;
    time: number;
    skillfunc: Array<skillqueue> = [];
    status = true;
    pace = 0
    /**
     * 
     * @param {string} id 技能id
     * @param {Number} time 技能冷却时间game tick
     */
    constructor(id: string, time: number = 0) {
        time = time | 0;
        this.id = id;
        this.time = time
    };
    isSkillqueue(typ: skillqueue | Array<skillqueue>): typ is Array<skillqueue> {
        return (typ as Array<skillqueue>).length !== undefined
    }
    /**
     * 
     * @param {skillqueue} skillqueue
     * @returns {this}
     */
    setSkill(skillqueue: skillqueue | Array<skillqueue>): this {
        if (this.status) {
            //只有在runSkillAsync()不执行或者执行完成的时候才可以setSkill
            if (this.isSkillqueue(skillqueue)) {
                for(const i of skillqueue) {
                    this.skillfunc.push(i);
                }
            } else {
                this.skillfunc.push(skillqueue);
            }
            return this
        } else {
            return this;
        }

    };
    /**
     * 
     * @param {Entity} player 
     * @returns {void}
     */
    cooldownShow(entity: Entity): void {
        if (!this.status && this.pace == 1) {
            runCmd.playerCmd(`title "${entity.nameTag}" title 技能冷却中！`, entity)
        } else if (!this.status && this.pace > 1) {
            runCmd.playerCmd(`title "${entity.nameTag}" title 技能执行中！`, entity)
        };
    }

    /**
     * 
     * @param {Entity} entity
     * 
     */
    async runSKillAsync(entity: Entity) {
        //异步执行任务队列
        if (this.status) {
            let stime = this.time;
            this.setSkill({
                skillFunc: () => {
                    if (!this.status) {
                        this.status = true;
                        this.skillfunc = [];
                    }
                },
                time: stime
            });
            this.status = false;
            // consoleTimeout(`${this.skillfunc[this.skillfunc.length - 2].skillFunc}`)
            for (const s of this.skillfunc) {
                let sstime = s.time;
                await setTimeout(s.skillFunc, sstime)
                    .catch(err => {
                        console.warn(err);
                    });
                this.pace--;
            };
            runCmd.playerCmd(`title ${entity.nameTag} title 技能冷却完成!! `, entity);
            runCmd.playerCmd(`title ${entity.nameTag} subtitle 冷却时间:${this.time / 20}s `, entity);
        } else {
            return;
        };
    }
}