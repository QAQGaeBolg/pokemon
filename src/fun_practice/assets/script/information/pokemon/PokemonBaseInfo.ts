import { assert } from "cc"
import Skill, { SkillListInfo } from "../skill/Skill"
import { PokemonInfo, PokemonMap } from "./PokemonInfo"

export default class PokemonBaseInfo {
    public pokemonId: string
    public pokemonInfo: PokemonInfo
    public level: number
    public HP!: number
    public HPObserver: any[] = []
    public ATK!: number
    public ATKObserver: any[] = []
    public DEF!: number
    public DEFObserver: any[] = []
    public SP!: number
    public SPObserver: any[] = []
    public currentSkillList: Skill[]
    
    constructor (pokemonId: string, level: number, skillList: number[]) {
        this.pokemonId = pokemonId
        let pokemonInfo = PokemonMap.get(this.pokemonId)
        assert(pokemonInfo !== undefined)
        this.pokemonInfo = pokemonInfo
        this.level = level
        this.currentSkillList = []
        let skills = SkillListInfo.get(this.pokemonId) as Skill[]
        for (let i = 0; i < skillList.length; i++) {
            this.currentSkillList.push(skills[skillList[i]])
        }
        this.updateLevel()
    }

    public updateLevel() {
        assert(this.pokemonInfo !== undefined)
        this.HP = this.pokemonInfo.baseHP + this.level * this.pokemonInfo.HPIncrement
        this.ATK = this.pokemonInfo.baseATK + this.level * this.pokemonInfo.ATKIncrement
        this.DEF = this.pokemonInfo.baseDEF + this.level * this.pokemonInfo.DEFIncrement
        this.SP = this.pokemonInfo.baseSP + this.level * this.pokemonInfo.SPIncrement
    }

    public upgrade() {
        this.level += 1
        this.updateLevel()
    }
}