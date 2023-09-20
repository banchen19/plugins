// LiteLoader-AIDS automatic generated
/// <reference path="d:\mc_bds\bds_api/dts/helperlib/src/index.d.ts"/> 

// 性别、行为动作、白名单、luguan

// 基础信息sql
const { sqlite } = require('./api/yoyoSqlite-2.0.5');
var table_name = 'player'
mc.listen("onServerStarted", () => {
    createTable()
})

function createTable() {
    /* 多个参数的时候你可以传对象 */
    var isSetConfig = sqlite.connectDb({
        path: '.\\plugins\\sql\\player.db',
        create: true,/* 不存在是否自动创建 */
    });
    /* 或者你可以这样 */
    var isSetConfig = sqlite.connectDb('.\\plugins\\luguan2\\player.db');
    if (isSetConfig) {
        log('数据库连接成功');
    } else {
        log('数据库连接失败');
    }
    let sql = sqlite.createTable(table_name, {
        realName: {
            type: 'TEXT',//字段类型
            unique: true//是否保持唯一值
        },
        gender: {
            type: 'INTEGER',//字段类型
            default: 'INTEGER DEFAULT 0 not null'//默认值是null
        }
    });
    log('表创建:', sql ? '成功' : '失败');
}


/**配置文件路径 */
const pl_luguan_data_path = ".\\plugins\\luguan2\\data.json"
/**配置文件实例 */
const CONFIG_pl_luguan_data = data.openConfig(pl_luguan_data_path, "json");
const CONFIG = data.openConfig(".\\plugins\\luguan2\\config.json", "json", JSON.stringify({
    "boy_max": 3,//单日打飞机次数限制
    "boyNumber": 10,//单词打飞机累计次数数量发放加血效果
    "boy_cd_m": 5,//cd，按照分钟计算
    "boy_ps_name": "minecraft:basic_flame_particle",
    "boy_hand_item_type": "minecraft:paper",
    "boy_msg": "呜~~呜~哼~嗯",
    "girl_max": 3,
    "girlNumber": 10,
    "girl_cd_m": 5,
    "girl_ps_name": "minecraft:water_splash_particle ",
    "girl_hand_item_type": "minecraft:lightning_rod",
    "girl_msg": "呜~~呜~哼~嗯",
    "扣血": {
        "id": 19,
        "kick": 50,
        "level": 1
    },
    "失明": {
        "id": 15,
        "kick": 300,
        "level": 1
    },
    "虚弱": {
        "id": 18,
        "kick": 800,
        "level": 1
    },
    "加血效果": {
        "id": 6,
        "kick": 100,
        "level": 1
    }
}));


mc.listen("onJoin", (pl) => {
    add_pl_data(pl.realName)
    if (getplayerrealName_gender(pl.rename) == 1) {
        pl.tell("性别：男")
    } else {
        pl.tell("性别：女")
    }
    if (CONFIG_pl_luguan_data.get(pl.realName) == null) {
        CONFIG_pl_luguan_data.set(pl.realName, { number_max: 0, time_D: system.getTimeObj().D, time_cd: system.getTimeStr() })
    } else if (CONFIG_pl_luguan_data.get(pl.realName).time_D != system.getTimeObj().D) {
        CONFIG_pl_luguan_data.set(pl.realName, { number_max: 0, time_D: system.getTimeObj().D, time_cd: system.getTimeStr() })
    }
})

//攻击方块"onAttackBlock"
mc.listen("onJump", (pl, block) => {
    const item = pl.getHand()
    if (getplayerrealName_gender(pl.realName).gender != 0) {
        //潜行低头手持纸张
        if (pl.isSneaking && pl.direction.pitch > 40 && item.type == CONFIG.get("boy_hand_item_type")) boyLuGuan(pl);
        if (pl.isSneaking && pl.direction.pitch > 40 && item.type == CONFIG.get("girl_hand_item_type")) girlLuGuan(pl);
    }
})

//粒子效果
function set_ps(pos, ps_name) {
    mc.spawnParticle(pos.x, pos.y + 0.5, pos.z, pos.dimid, ps_name);
    mc.spawnParticle(pos.x + 0.15, pos.y + 0.5, pos.z, pos.dimid, ps_name);
    mc.spawnParticle(pos.x, pos.y + 0.5, pos.z + 0.15, pos.dimid, ps_name);
    mc.spawnParticle(pos.x - 0.15, pos.y + 0.5, pos.z, pos.dimid, ps_name);
    mc.spawnParticle(pos.x, pos.y + 0.5, pos.z + 0.15, pos.dimid, ps_name);
}

/**
 * 指定玩家使其炉管
 * @param {Player} pl 执行炉管的玩家
 */
function boyLuGuan(pl) {
    //撸多了
    if (CONFIG_pl_luguan_data.get(pl.realName).number_max > CONFIG.get("boy_max")) {
        luguanTooOftenDebuff();
        return;
    }
    //撸快了
    if (calculateTimeDifferenceInMinutes(CONFIG_pl_luguan_data.get(pl.realName).time_cd) <= CONFIG.get("boy_cd_m")) {
        pl.tell("休息一下,还剩时间（分） ：" + (CONFIG.get("boy_cd_m") - calculateTimeDifferenceInMinutes(CONFIG_pl_luguan_data.get(pl.realName).time_cd)))
        return;
    }
    let number_max = CONFIG_pl_luguan_data.get(pl.realName).number_max;
    pl_lig_nb++;
    mc.runcmdEx('playsound mob.slime.big ' + pl.realName)
    let pos = pl.feetPos;
    const ps_name = CONFIG.get("boy_ps_name")
    set_ps(pos, ps_name)//粒子效果
    if (pl_lig_nb > CONFIG.get("boyNumber")) {
        let max = number_max + 1;
        //加血效果
        pl.addEffect(CONFIG.get("加血效果").id, CONFIG.get("加血效果").kick, CONFIG.get("加血效果").level, true)
        pl_lig_nb = 0;
        pl.tell(CONFIG.get("boy_msg"))
        mc.runcmdEx('clear ' + pl.realName + ' paper 0 1')
        CONFIG_pl_luguan_data.set(pl.realName, { number_max: max, time_D: system.getTimeObj().D, time_cd: system.getTimeStr() })
    }
}

/**
 * 指定玩家使其炉管
 * @param {Player} pl 执行炉管的玩家
 */
function girlLuGuan(pl) {
    //撸多了
    if (CONFIG_pl_luguan_data.get(pl.realName).number_max > CONFIG.get("girl_max")) {
        luguanTooOftenDebuff();
        return;
    }
    //撸快了
    if (calculateTimeDifferenceInMinutes(CONFIG_pl_luguan_data.get(pl.realName).time_cd) <= CONFIG.get("girl_cd_m")) {
        pl.tell("休息一下,还剩时间（分） ：" + (CONFIG.get("girl_cd_m") - calculateTimeDifferenceInMinutes(CONFIG_pl_luguan_data.get(pl.realName).time_cd)))
        return;
    }
    let number_max = CONFIG_pl_luguan_data.get(pl.realName).number_max;
    pl_lig_nb++;
    mc.runcmdEx('playsound mob.slime.big ' + pl.realName)
    let pos = pl.feetPos;
    const ps_name = CONFIG.get("girl_ps_name")
    set_ps(pos, ps_name)//粒子效果
    if (pl_lig_nb > CONFIG.get("girlNumber")) {
        let max = number_max + 1;
        //加血效果
        pl.addEffect(CONFIG.get("加血效果").id, CONFIG.get("加血效果").kick, CONFIG.get("加血效果").level, true)
        pl_lig_nb = 0;
        pl.tell(CONFIG.get("boy_msg"))
        mc.runcmdEx('clear ' + pl.realName + ' lightning_rod 0 1')
        mc.runcmdEx(`give ${pl.realName} stick 1`)
        CONFIG_pl_luguan_data.set(pl.realName, { number_max: max, time_D: system.getTimeObj().D, time_cd: system.getTimeStr() })
    }
}

/**
 * 玩家撸多了的时候执行的debuff动作
 * @param {Player} pl 撸多了的玩家
 */
function luguanTooOftenDebuff(pl) {
    //扣血
    pl.addEffect(CONFIG.get("扣血").id, CONFIG.get("扣血").kick, CONFIG.get("扣血").level, false)
    //失明
    pl.addEffect(CONFIG.get("失明").id, CONFIG.get("失明").kick, CONFIG.get("失明").level, false)
    //虚弱
    pl.addEffect(CONFIG.get("虚弱").id, CONFIG.get("虚弱").kick, CONFIG.get("虚弱").level, false)
    pl.tell("休息一下吧，明天~好不好~")
}

function calculateTimeDifferenceInMinutes(startTime) {
    let date1 = new Date(startTime);
    let date2 = new Date();

    let differenceInMilliseconds = date2 - date1;
    let differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));

    return differenceInMinutes;
}

//获取玩家性别-realName
function getplayerrealName_gender(realName) {
    var result = sqlite.table(table_name)//需要操作的完整表名
        .where('realName', realName)//获取你可以添加一些条件  (id = 1)
        .find();//查询一条数据
    return result;
}
//添加玩家性别数据
function add_pl_data(realName) {
    try {
        const randomNumber = Math.floor(Math.random() * 2);
        var result = sqlite.table(table_name)//需要操作的完整表名
            .field(['realName', 'gender'])//设置字段
            .insert([realName, randomNumber]);//添加一条数据
    } catch {

    }

}


mc.listen("onPlayerDie", (pl) => {
    const randomNumber = Math.floor(Math.random() * 2);
    var result = sqlite.table(table_name)//需要操作的完整表名
        .where('realName', 1)//获取你可以添加一些条件  (id = 1)
        .update({
            gender: randomNumber
        });
    pl.tell("已重置性别")
})