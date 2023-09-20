// LiteLoader-AIDS automatic generated
/// <reference path="d:\mc_bds\bds_api/dts/helperlib/src/index.d.ts"/> 

// LiteLoader-AIDS automatic generated
// / <reference path="/media/banchen/games/mc_bds/bds_api/dts/helperlib/src/index.d.ts"/> 


const pluginOtherInformation = {
    "作者": "banchen(破晓下的尘埃)",
    "邮箱": "banchen8964@gmail.com",
    "QQ": "738270843",

}; // 其他附加信息

ll.registerPlugin("血月插件", "强化生物、自定义物品掉落（以上传背包为准） ", [1, 0, 1], pluginOtherInformation)

colorLog("blue", "————————————————————————————————————————————————————")
colorLog("pink", "插件名：", "血月插件")
colorLog("green", "作者：", "banchen")
colorLog("green", "邮箱：", "banchen8964@gmail.com")
colorLog("green", "QQ：", "738270843")
colorLog("green", "注册指令：", "days_interval")
colorLog("green", "指令别名：", "dayi")
colorLog("yellow", "添加tag背包：", "dayi add <tag背包名> ")
colorLog("yellow", "删除tag背包：", "dayi remove <tag背包名> ")
colorLog("yellow", "查询所有tag背包的tag背包名：", "dayi list ")
colorLog("yellow", "查询当前服务端时间刻度：", "dayi gettick ")
colorLog("blue", "————————————————————————————————————————————————————")

mc.listen("onServerStarted", () => {
    setup_com()
})
function setup_com() {
    let cmd = mc.newCommand("days_interval", "背包上传")
    cmd.setAlias("dayi")
    cmd.setEnum("ChangeAction", ["add", "remove", "gettick"]);
    cmd.setEnum("ListAction", ["list"]);
    cmd.mandatory("action", ParamType.Enum, "ChangeAction", 1);
    cmd.mandatory("action", ParamType.Enum, "ListAction", 1);
    cmd.mandatory("name", ParamType.RawText);
    cmd.overload(["ChangeAction", "name"]);
    cmd.overload(["ListAction"]);
    cmd.setCallback((_cmd, _ori, out, res) => {
        switch (res.action) {
            case "add":
                save_back(_ori.player, res.name)
                return out.success(`成功添加背包 "${res.name}"`);
            case "remove":
                config_tagback.delete(res.name)
                return out.success(`删除背包 "${res.name}"`);
            case "list":
                let json_ob = JSON.parse(config_tagback.read())
                return out.success(`Tag背包 List:\n ${Object.keys(json_ob)}`);
            case "gettick":
                return out.success(`当前服务器已经走过:\n ${mc.getTime(1)}`);
        }
    });
    cmd.setup();
}

mc.listen("onPlayerCmd", (pl, cmd) => {
    if (cmd.includes("time"))
        pl.tell("当前服务端时间刻度：" + mc.getTime(1))
})
// 血月配置文件
var config = new JsonConfigFile("./plugins/bc/redkill/config.json")
var config_tagback = new JsonConfigFile("./plugins/bc/redkill/config_tag_back.json")
config.init("Days_interval", 5)
config.init("time_day_number", 0)
config.init("effetc_number", 3)
config.init("play_Days_interval", 14000)
config.init("end_Days_interval", 22000)
config.init("rand_day", true)


let effect_data = {
    "迅捷": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "缓慢": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "急迫": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "挖掘疲劳": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "力量": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "瞬间治疗": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "瞬间伤害": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "跳跃提升": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "反胃": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "生命恢复": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "抗性提升": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "抗火": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "水下呼吸": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "隐身": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "失明": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "夜视": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "饥饿": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "虚弱": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "中毒": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "凋零": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "生命提升": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "伤害吸收": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "饱和": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "飘浮": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "中毒（致命）": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "潮涌能量": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "缓降": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "不祥之兆": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "村庄英雄": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    },
    "黑暗": {
        probability: 20,
        tick: 20,
        level: 2,
        showParticles: true
    }
};

config.init("effect", effect_data)
//多久轮回一次
function getconfig_Days_interval() {
    return config.get("Days_interval");
}

// 游戏刻监听
mc.listen("onTick", () => {
    //血月tick监听
    const game_sertimetick = mc.getTime(0); // 今日的tick
    const currentBloodMoon = getBloodMoon_bool(); // 今天是否是血月

    if (game_sertimetick == config.get("play_Days_interval") && currentBloodMoon) {
        setboosbar();
        mc.getOnlinePlayers().forEach((pl, id) => {
            pl.setTitle("§4§l血月已经来临！！！")
        })
        let daynumber = config.get("time_day_number");
        config.set("time_day_number", daynumber + 1);
    } else if (!currentBloodMoon) {
        mc.getOnlinePlayers().forEach((pl, id) => {
            pl.removeBossBar(738270846)
        })
    }

    let pls = mc.getOnlinePlayers();
    pls.forEach((pl, id) => {
        const currentTimeTick = mc.getTime(0); // 服务器今日的tick
        const new_sertimeday = mc.getTime(2); // 服务器已经过去了多少个游戏天
        const bloodMoonInterval = getconfig_Days_interval(); // 血月多久一次来
        const bloodMoonStartTick = config.get("play_Days_interval"); // 血月开始时的tick

        let daysRemaining = 0;
        let timeRemainingInSeconds = 0;
        timeRemainingInSeconds = Math.abs(bloodMoonStartTick - currentTimeTick)
        if (new_sertimeday < bloodMoonInterval) { daysRemaining = Math.abs(bloodMoonInterval - new_sertimeday) }
        else {
            daysRemaining = Math.abs(new_sertimeday % bloodMoonInterval)
        }
        if (!currentBloodMoon) {
            pl.tell(`§4§l血月倒计时 ${daysRemaining} 天  ${timeRemainingInSeconds} 秒`, 4);
        }

    });

})

// 监听实体生成
mc.listen("onMobSpawned", (entity, pos) => {
    if (getBloodMoon_bool()) {
        let daynumber = config.get("time_day_number");
        let data = readget_enconfigdata(daynumber, entity.type);
        if (data.tf) {
            let data_data = data.data;
            if (data_data.MaxHealth != false)
                entity.setMaxHealth(data_data.MaxHealth)
            if (data_data.health != false)
                entity.setHealth(data_data.health)
            if (data_data.Absorption != false)
                entity.setAbsorption(data_data.Absorption)
            if (data_data.AttackDamage != false)
                entity.setAttackDamage(data_data.AttackDamage)
            if (data_data.MaxAttackDamage != false)
                entity.setMaxAttackDamage(data_data.MaxAttackDamage)
            if (data_data.FollowRange != false)
                entity.setFollowRange(data_data.FollowRange)
            if (data_data.KnockbackResistance != false)
                entity.setKnockbackResistance(data_data.KnockbackResistance)
            if (data_data.Luck != false)
                entity.setLuck(data_data.Luck)
            if (data_data.MovementSpeed != false)
                entity.setMovementSpeed(data_data.MovementSpeed)
            if (data_data.LavaMovementSpeed != false)
                entity.setLavaMovementSpeed(data_data.LavaMovementSpeed)
            if (data_data.Fire != false)
                entity.setOnFire(data_data.Fire)
            if (data_data.Scale != false)
                entity.setScale(data_data.Scale)
            entity.addTag(data_data.Dropped_tag)

        }
    }
})

// 血月血条
function setboosbar() {
    if (getBloodMoon_bool()) {
        let pls = mc.getOnlinePlayers()
        pls.forEach((pl, id) => {
            const currentTick = mc.getTime(0);

            const startTime = config.get("play_Days_interval");
            const endTime = config.get("end_Days_interval");

            const percentage = Math.round(((currentTick - startTime) / (endTime - startTime)) * 100);
            pl.setBossBar(738270846, "血月", 100 - percentage, 2)
            let daynumber = config.get("time_day_number");
            if (File.getFilesList(`./plugins/bc/redkilldata`).length == daynumber) {
                config.set("time_day_number", 0)
            }
        })
    }
}

//检测是否为血月
function getBloodMoon_bool() {

    const game_sertimetick = mc.getTime(0); // 今日的tick
    const game_sertimeday = mc.getTime(2)
    if (game_sertimeday % getconfig_Days_interval() == 0 && game_sertimetick >= config.get("play_Days_interval")) {
        if (game_sertimetick < config.get("end_Days_interval")) {
            //血月
            return true;
        }
    }
    return false;
}

// 血月配置文件
var config_en = new JsonConfigFile("./plugins/bc/redkilldata/day1.json")
let de_endate =
{
    health: 20,  //设置实体的生命值! 可设置为false为不设置。
    Absorption: 2, //为实体设置伤害吸收属性! 可设置为false为不设置。
    AttackDamage: 3,//为实体设置攻击伤害属性! 可设置为false为不设置。
    MaxAttackDamage: 5,//为实体设置最大攻击伤害属性! 可设置为false为不设置。
    FollowRange: 5,//为实体设置跟随范围! 可设置为false为不设置。
    KnockbackResistance: 0,//为实体设置击退抵抗属性! 可设置为false为不设置。
    Luck: 2,//为实体设置幸运属性! 可设置为false为不设置。
    MovementSpeed: 2,//为实体设置移动速度属性! 可设置为false为不设置。
    UnderwaterMovementSpeed: 2,//为实体设置水下移动速度属性! 可设置为false为不设置。
    LavaMovementSpeed: 20,//为实体设置岩浆上移动速度属性! 可设置为false为不设置。
    MaxHealth: 50,//设置实体的最大生命值! 可设置为false为不设置。
    Fire: 3,//设置特定实体为燃烧状态! 可设置为false为不设置。
    Scale: 2,//缩放实体大小! 可设置为false为不设置。
    killen_lightning_bolt: true,//是否开启雷电
    en_effect_probability: 10,//百分比概率被攻击时激发雷电与效果
    Days_interval_tf: true,//生物生成修改参数开关
    Dropped_tag: "a0001"  //掉落tag背包
}

config_en.init("minecraft:zombie", de_endate)

//读取指定天数的配置文件
function readget_enconfigdata(day, mob_type) {

    if (File.exists(`./plugins/bc/redkilldata/day${day}.json`)) {

        if (config.get("rand_day") == 1) {
            let randnumber = File.getFilesList(`./plugins/bc/redkilldata`).length
            day = Math.floor(Math.random() * randnumber) + 1;// 返回 1 至 length  之间的数
        }
        var en_date_config = new JsonConfigFile(`./plugins/bc/redkilldata/day${day}.json`)
        if (en_date_config.get(mob_type) != null && en_date_config.get(mob_type).Days_interval_tf) {
            return {
                data: en_date_config.get(mob_type),
                tf: true
            };
        }
    }

    return {
        data: null,
        tf: false
    };
}

mc.listen("onAttackEntity", (pl, en) => {
    const width = 3; // 平面宽度
    const length = 3; // 平面长度
    const numParticles = 10; // 指定生成的粒子数量
    const particleName = "minecraft:rising_border_dust_particle";

    if (getBloodMoon_bool()) {
        let day = config.get("time_day_number");
        let Days_interval_en = readget_enconfigdata(day, en.type)
        if (!Days_interval_en.tf && Days_interval_en.en_effect_probability) {

            for (let i = 0; i < config.get("effetc_number"); i++) {

                let effetc = Math.floor(Math.random() * 30) + 1;// 返回 1 至 30 之间的数
                let effetc_str = (Object.keys(config.get("effect"))[effetc])
                let effetc_numberid = (config.get("effect")[effetc_str])
                let random_effetc_number = Math.random() * 100;
                if (effetc_numberid.probability > random_effetc_number) {
                    pl.addEffect(effetc, effetc_numberid.tick, effetc_numberid.level, effetc_numberid.showParticles)
                    if (effetc == 30 || effetc == 15) {
                        mc.runcmdEx(`playsound mob.ghast.scream "${pl.realName}"`);//失眠或黑暗效果的时候恶魂叫
                    }
                }
                mc.runcmdEx(`execute at "${pl.realName}" run summon lightning_bolt`)
            }


        }
        spawnParticlesInPlane(en.feetPos, width, length, numParticles, particleName);
    }
})


mc.listen("onMobDie", (mob, source, cause) => {
    let day = config.get("time_day_number");
    let Days_interval_en = readget_enconfigdata(day, mob.type)
    if (Days_interval_en.tf) {
        if (mob.hasTag(Days_interval_en.data.Dropped_tag)) {
            if (config_tagback.get(Days_interval_en.data.Dropped_tag) != null) {
                let arr = config_tagback.get(Days_interval_en.data.Dropped_tag)
                setitem(arr, mob.pos)
            }
        }
    }
})

//获取玩家背包
function getplayer_back(pl) {
    let pl_back_ct = pl.getInventory()
    let backarr = pl_back_ct.getAllItems()
    let arr = []
    backarr.forEach((item, id) => {
        let itemsnbt = item.getNbt().toSNBT()
        arr.push(itemsnbt)
    })
    return arr
}

//tag保存背包
function save_back(pl, tag) {
    config_tagback.set(tag, getplayer_back(pl))
}

//在指定的位置生成掉落物
function setitem(arr, pos) {
    arr.forEach((snbt, id) => {
        let nbt = NBT.parseSNBT(snbt)
        let item = mc.newItem(nbt)
        mc.spawnItem(item, pos)
    })
}

// 在平面内随机生成粒子
function spawnParticlesInPlane(centerPos, width, length, numParticles, particleName) {
    for (let i = 0; i < numParticles; i++) {
        const xOffset = (Math.random() - 0.2) * width;
        const zOffset = (Math.random() - 0.2) * length;

        const particleX = centerPos.x + (Math.random() * xOffset);
        const particleY_random = Math.floor(Math.random() * 4);
        const particleY = centerPos.y + (particleY_random);
        const particleZ = centerPos.z + (Math.random() * zOffset);

        let particlePos = new FloatPos(particleX, particleY, particleZ, centerPos.dimid);

        mc.spawnParticle(particlePos, particleName);
    }
}