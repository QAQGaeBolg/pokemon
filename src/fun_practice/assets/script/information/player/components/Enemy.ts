import Player from "./Player";
import Pokemon from "../../pokemon/Pokemon";
import Team from "./Team";

export default class Enemy extends Player{
    constructor(pokemons: Pokemon[], team: Team) {
        super(pokemons, team)
    }
}