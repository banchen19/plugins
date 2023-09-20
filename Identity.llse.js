// LiteLoader-AIDS automatic generated
/// <reference path="d:\mc_bds\bds_api/dts/helperlib/src/index.d.ts"/> 

//引入年龄
const { age } = require('./bc_age.llse');
//引入性别
const { gender } = require('./bc_gender.llse');
//引入伴侣
const { partner } = require('./partner.llse');
//引入队伍
const { team } = require('./team.llse');


class player_id {
    static age(pl) {
        return age.getpl_age_old(pl);
    }
    static gender(pl) {
        return gender.getplayerrealName_gender(pl)
    }
    static partner(pl) {
        return partner.getpl_lover(pl)
    }
    static team(pl) {
        return team.getpl_team_key(pl)
    }
}

mc.listen("onJoin", (pl) => {
    log(player_id.age(pl))
    log(player_id.gender(pl))
    log(player_id.partner(pl))
    log(player_id.team(pl))
    pl.tell(""+player_id.age(pl))
})


