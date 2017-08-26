var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add('play', {
    preload: function() {
        game.load.image('forest-back', 'assets/images/background01/layer_01_redim.png');
        game.load.image('forest-cloud', 'assets/images/background01/layer_02_redim.png');
        game.load.image('forest-mountain', 'assets/images/background01/layer_03_redim.png');
        game.load.image('forest-tree', 'assets/images/background01/layer_04_redim.png');
        game.load.image('forest-floor', 'assets/images/background01/layer_05_redim.png');
    
        game.load.image('skeleton', 'assets/images/allacrost_enemy_sprites/skeleton.png');
        game.load.image('aerocephal', 'assets/images/allacrost_enemy_sprites/aerocephal.png');
        game.load.image('arcana_drake', 'assets/images/allacrost_enemy_sprites/arcana_drake.png');
        game.load.image('aurum-drakueli', 'assets/images/allacrost_enemy_sprites/aurum-drakueli.png');
        game.load.image('bat', 'assets/images/allacrost_enemy_sprites/bat.png');
        game.load.image('daemarbora', 'assets/images/allacrost_enemy_sprites/daemarbora.png');
        game.load.image('deceleon', 'assets/images/allacrost_enemy_sprites/deceleon.png');
        game.load.image('demonic_essence', 'assets/images/allacrost_enemy_sprites/demonic_essence.png');
        game.load.image('dune_crawler', 'assets/images/allacrost_enemy_sprites/dune_crawler.png');
        game.load.image('green_slime', 'assets/images/allacrost_enemy_sprites/green_slime.png');
        game.load.image('nagaruda', 'assets/images/allacrost_enemy_sprites/nagaruda.png');
        game.load.image('rat', 'assets/images/allacrost_enemy_sprites/rat.png');
        game.load.image('scorpion', 'assets/images/allacrost_enemy_sprites/scorpion.png');
        game.load.image('scorpion_goliath', 'assets/images/allacrost_enemy_sprites/scorpion_goliath.png');
        game.load.image('snake', 'assets/images/allacrost_enemy_sprites/snake.png');
        game.load.image('spider', 'assets/images/allacrost_enemy_sprites/spider.png');
        game.load.image('stygian_lizard', 'assets/images/allacrost_enemy_sprites/stygian_lizard.png');
    
        game.load.image('gold_coin', 'assets/images/496_RPG_icons/I_GoldCoin.png');
    },
    create: function() {
        var state = this;
        var monsterData = [
            {name: 'Aerocephal',      image: 'aerocephal',      maxHealth: 10},
            {name: 'Arcana Drake',    image: 'arcana_drake',    maxHealth: 20},
            {name: 'Aurum Drakueli',  image: 'aurum-drakueli',  maxHealth: 30},
            {name: 'Bat',             image: 'bat',             maxHealth: 5},
            {name: 'Daemarbora',      image: 'daemarbora',      maxHealth: 10},
            {name: 'Deceleon',        image: 'deceleon',        maxHealth: 10},
            {name: 'Demonic Essence', image: 'demonic_essence', maxHealth: 15},
            {name: 'Dune Crawler',    image: 'dune_crawler',    maxHealth: 8},
            {name: 'Green Slime',     image: 'green_slime',     maxHealth: 3},
            {name: 'Nagaruda',        image: 'nagaruda',        maxHealth: 13},
            {name: 'Rat',             image: 'rat',             maxHealth: 2},
            {name: 'Scorpion',        image: 'scorpion',        maxHealth: 2},
            {name: 'Skeleton',        image: 'skeleton',        maxHealth: 6},
            {name: 'snake',           image: 'snake',           maxHealth: 4},
            {name: 'spider',          image: 'spider',          maxHealth: 4},
            {name: 'Stygian Lizard',  image: 'stygian_lizard',  maxHealth: 20}
        ]
        
        this.background = this.game.add.group();
        this.monsters = this.game.add.group();
        this.monsterInfoUI = this.game.add.group();
        
        
        ['forest-back', 'forest-cloud', 'forest-mountain', 'forest-tree', 'forest-floor']
            .forEach(function (image) {
                var bg = state.game.add.tileSprite(0, 0, state.game.world.width,
                    state.game.world.height, image, '', state.background);
                bg.tileScale.setTo(0.8, 0.8);
            });
        
        var monster;
        monsterData.forEach(function (data) {
            // Create a sprite of each monster out of screen
            monster = state.monsters.create(1000, state.game.world.centerY, data.image);
            // Center anchor
            monster.anchor.setTo(0.5);
            // ref to the database
            monster.details = data;
    
            monster.health = monster.maxHealth = data.maxHealth;
            
            // enable input so we can click it
            monster.inputEnabled = true;
            monster.events.onInputDown.add(state.onClickMonster, state);
            monster.events.onKilled.add(state.onKilledMonster, state);
            monster.events.onRevived.add(state.onReviveMonster, state);
        });
        
        this.currentMonster = this.monsters.getRandom();
        this.currentMonster.position.set(this.game.world.centerX + 100, this.game.world.centerY);
        
        // The main player
        this.player = {
            clickDmg: 1,
            gold: 0
        };
    
        this.monsterInfoUI.position.setTo(this.currentMonster.x - 220, this.currentMonster.y + 120);
        this.monsterNameText = this.monsterInfoUI.addChild(this.game.add.text(0, 0, this.currentMonster.details.name, {
            font: '48px Arial Black',
            fill: '#fff',
            strokeThickness: 4
        } ));
        this.monsterHealthText = this.monsterInfoUI.addChild(this.game.add.text(0, 80, this.currentMonster.health + 'HP', {
            font: '32px Arial Black',
            fill: '#ff0000',
            strokeThickness: 4
        } ));
        
        this.dmgTextPool = this.add.group();
        var dmgText;
        
        for(var d=0; d<50; d++){
            dmgText = this.add.text(0,0,'1', {
                font: '64px Arial Black',
                fill: '#fff',
                strokeThickness: 4
            });
            dmgText.exists = false;
            dmgText.tween = game.add.tween(dmgText)
                .to({
                    alpha: 0,
                    y: 100,
                    x: this.game.rnd.integerInRange(100, 700)
                }, 1000, Phaser.Easing.Cubic.Out);
            
            dmgText.tween.onComplete.add(function (text, tween) {
                text.kill();
            });
            this.dmgTextPool.add(dmgText);
        }
    
        this.coins = this.add.group();
        this.coins.createMultiple(50, 'gold_coin', '', false);
        this.coins.setAll('inputEnabled', true);
        this.coins.setAll('goldValue', 1);
        this.coins.callAll('events.onInputDown.add', 'events.onInputDown', this.onClickCoin, this);
        
        this.playerGoldText = this.add.text(30, 30, 'Gold: ' + this.player.gold, {
            font: '24px Arial Black',
            fill: '#fff',
            strokeThickness: 4
        });
        
    
    
    },
    render: function() {
    
    },
    onClickMonster: function (monster, pointer) {
        this.currentMonster.damage(this.player.clickDmg);
        this.monsterHealthText.text = this.currentMonster.alive ? this.currentMonster.health + ' HP' : 'DEAD';
        var dmgText = this.dmgTextPool.getFirstExists(false);
        if(dmgText){
            dmgText.text = this.player.clickDmg;
            dmgText.reset(pointer.positionDown.x, pointer.positionDown.y);
            dmgText.alpha = 1;
            dmgText.tween.start();
        }
    },
    onKilledMonster: function (monster) {
        // Move monster offscreen
        monster.position.set(1000, this.game.world.centerY);
        
        // pick a new monster
        this.currentMonster = this.monsters.getRandom();
        // Heal monster
        this.currentMonster.revive(this.currentMonster.maxHealth);
        
        var coin;
        coin = this.coins.getFirstExists(false);
        coin.reset(this.game.world.centerX + this.game.rnd.integerInRange(-100, 100), this.game.world.centerY);
        coin.goldValue = 1;
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.onClickCoin, this, coin);
    
    
    },
    onReviveMonster: function (monster) {
        monster.position.set(this.game.world.centerX + 100, this.game.world.centerY);
        this.monsterNameText.text = monster.details.name;
        this.monsterHealthText.text = monster.health + 'HP';
    },
    onClickCoin: function (coin) {
        if (!coin.alive) {
            return;
        }
        this.player.gold += coin.goldValue;
        this.playerGoldText.text = 'Gold: ' + this.player.gold;
        coin.kill();
    }
});

game.state.start('play');