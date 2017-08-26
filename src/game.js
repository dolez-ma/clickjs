var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add('play', {
    preload: function() {
        /*game.load.image('forest-back', 'assets/images/background01/layer_01_redim.png');
        game.load.image('forest-cloud', 'assets/images/background01/layer_02_redim.png');
        game.load.image('forest-mountain', 'assets/images/background01/layer_03_redim.png');
        game.load.image('forest-tree', 'assets/images/background01/layer_04_redim.png');
        game.load.image('forest-floor', 'assets/images/background01/layer_05_redim.png');*/
    
        game.load.image('forest-back', 'assets/images/background03/layer_07.png');
        game.load.image('forest-cloud', 'assets/images/background03/layer_06.png');
        game.load.image('forest-mountain', 'assets/images/background03/layer_05.png');
        game.load.image('forest-tree', 'assets/images/background03/layer_04.png');
        game.load.image('forest-floor', 'assets/images/background03/layer_03.png');
    
        /*game.load.image('skeleton', 'assets/images/allacrost_enemy_sprites/skeleton.png');
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
        game.load.image('stygian_lizard', 'assets/images/allacrost_enemy_sprites/stygian_lizard.png');*/
    
        game.load.spritesheet('flower-plant', 'assets/images/monsters/flower-plant_200x266.png', 200, 266, 2);
        game.load.spritesheet('green-horn-monster', 'assets/images/monsters/green-horn-monster_200x179.png', 200, 179, 2);
        game.load.spritesheet('green-horn-zombie', 'assets/images/monsters/green-horn-zombie_200x227.png', 200, 227, 2);
        game.load.spritesheet('horn_skull', 'assets/images/monsters/horn_skull_200x216.png', 200, 216, 2);
        game.load.spritesheet('land-monster', 'assets/images/monsters/land-monster_200x266.png', 200, 266, 2);
        game.load.spritesheet('orange-land-monster', 'assets/images/monsters/orange-land-monster-200x149.png', 200, 149, 2);
        game.load.spritesheet('pink-monster', 'assets/images/monsters/pink-monster_200x170.png', 200, 170, 2);
        game.load.spritesheet('red-zombie', 'assets/images/monsters/red-zombie_200x219.png', 200, 219, 2);
        game.load.spritesheet('shadow-skull', 'assets/images/monsters/shadow-skull_200x216.png', 200, 216, 2);
        game.load.spritesheet('skull-land-monster', 'assets/images/monsters/skull-land-monster_200x192.png', 200, 192, 2);
        game.load.spritesheet('underground-worm', 'assets/images/monsters/underground-worm_200x221.png', 200, 221, 2);
        game.load.spritesheet('walking-monster', 'assets/images/monsters/walking-monster_200x232.png', 200, 232, 2);
        game.load.spritesheet('walking-green-monster', 'assets/images/monsters/walking-green-monster_200x211.png', 200, 211, 2);
        game.load.spritesheet('blue-monster', 'assets/images/monsters/blue-monster_200x237.png', 200, 237, 2);
        game.load.spritesheet('fly-monster', 'assets/images/monsters/fly-monster_200x155.png', 200, 155, 3);
        game.load.spritesheet('land-monster2', 'assets/images/monsters/land-monster2_200x158.png', 200, 158, 2);
        game.load.spritesheet('spiky-land-monster', 'assets/images/monsters/spiky-land-monster_200x200.png', 200, 200, 2);

    
        game.load.image('gold_coin', 'assets/images/496_RPG_icons/I_GoldCoin.png');
        
        var bmd = this.game.add.bitmapData(250, 500);
        bmd.ctx.fillStyle = '#9a783d';
        bmd.ctx.strokeStyle = '#35371c';
        bmd.ctx.lineWidth = 12;
        bmd.ctx.fillRect(0, 0, 250, 500);
        bmd.ctx.strokeRect(0, 0, 250, 500);
        this.game.cache.addBitmapData('upgradePanel', bmd);
        
        var buttonImage = this.game.add.bitmapData(476, 48);
        buttonImage.ctx.fillStyle = '#e6dec7';
        buttonImage.ctx.strokeStyle = '#35371c';
        buttonImage.ctx.lineWidth = 4;
        buttonImage.ctx.fillRect(0, 0, 225, 48);
        buttonImage.ctx.strokeRect(0, 0, 225, 48);
        this.game.cache.addBitmapData('button', buttonImage);
    
    },
    create: function() {
        var state = this;
    
        // Background management:
        this.utils().createBackground(this);
        
        // Monsters
        this.utils().createMonsters(this);
        
        // The main player
        this.utils().createPlayer();
    
        // Create Monster info
        this.utils().createMonsterInfo();
        
        // Initialize damage
        this.utils().createDamage();
    
        // Initialize gold
        this.utils().createGold();
        
        // Build upgrade panel
        this.utils().createUpdatePanel(this);
        
    
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
    },
    utils: function () {
        var self = this;
        
        return {
            createBackground: function (state) {
                self.background = self.game.add.group();
    
                ['forest-back', 'forest-cloud', 'forest-mountain', 'forest-tree', 'forest-floor']
                    .forEach(function (image) {
                        let bg = state.game.add.tileSprite(0, 0, state.game.world.width,
                            state.game.world.height, image, '', state.background);
                        bg.tileScale.setTo(0.8, 0.8);
                    });
            },
            
            createMonsters: function (state) {
                /*const monsterData = [
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
                ];*/

                const monsterData = [
                    {name: 'Flower Plant',      sprite: 'flower-plant',          maxHealth: 8},
                    {name: 'Green Horn',        sprite: 'green-horn-monster',    maxHealth: 20},
                    {name: 'Green Horn Zombie', sprite: 'green-horn-zombie',     maxHealth: 30},
                    {name: 'Horn Skull',        sprite: 'horn_skull',            maxHealth: 13},
                    {name: 'Landy',             sprite: 'land-monster',          maxHealth: 2},
                    {name: 'Orange Land',       sprite: 'orange-land-monster',   maxHealth: 5},
                    {name: 'Pinkette',          sprite: 'pink-monster',          maxHealth: 15},
                    {name: 'Red Zombie',        sprite: 'red-zombie',            maxHealth: 15},
                    {name: 'Shadow Skull',      sprite: 'shadow-skull',          maxHealth: 30},
                    {name: 'Skull Land',        sprite: 'skull-land-monster',    maxHealth: 8},
                    {name: 'Underground Worm',  sprite: 'underground-worm',      maxHealth: 20},
                    {name: 'Walking Freak',     sprite: 'walking-monster',       maxHealth: 10},
                    {name: 'Walking Green',     sprite: 'walking-green-monster', maxHealth: 15},
                    {name: 'Bluggu',            sprite: 'blue-monster',          maxHealth: 4},
                    {name: 'Birdy',             sprite: 'fly-monster',           maxHealth: 23},
                    {name: 'Bigi',              sprite: 'land-monster2',         maxHealth: 25},
                    {name: 'Spiky',             sprite: 'spiky-land-monster',    maxHealth: 27},
                ];
    
                self.monsters = self.game.add.group();
                let monster;
                monsterData.forEach(function (data) {
                    // Create a sprite of each monster out of screen
                    monster = state.monsters.create(1000, state.game.world.centerY, data.sprite);
                    // Center anchor
                    monster.anchor.setTo(0.5);
                    // ref to the database
                    monster.details = data;
    
                    //  Here we add a new animation called 'walk'
                    //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'mummy' sprite sheet
                    monster.animations.add('walk');
    
                    //  And this starts the animation playing by using its key ("walk")
                    //  30 is the frame rate (30fps)
                    //  true means it will loop when it finishes
                    monster.animations.play('walk', 3, true);
        
                    monster.health = monster.maxHealth = data.maxHealth;
        
                    // enable input so we can click it
                    monster.inputEnabled = true;
                    monster.events.onInputDown.add(state.onClickMonster, state);
                    monster.events.onKilled.add(state.onKilledMonster, state);
                    monster.events.onRevived.add(state.onReviveMonster, state);
                });
    
                self.currentMonster = self.monsters.getRandom();
                self.currentMonster.position.set(self.game.world.centerX + 100, self.game.world.centerY);
            },
            createMonsterInfo: function () {
                self.monsterInfoUI = self.game.add.group();
                self.monsterInfoUI.position.setTo(self.currentMonster.x - 220, self.currentMonster.y + 120);
                self.monsterNameText = self.monsterInfoUI.addChild(self.game.add.text(0, 0, self.currentMonster.details.name, {
                    font: '48px Arial Black',
                    fill: '#fff',
                    strokeThickness: 4
                } ));
                self.monsterHealthText = self.monsterInfoUI.addChild(self.game.add.text(0, 80, self.currentMonster.health + 'HP', {
                    font: '32px Arial Black',
                    fill: '#ff0000',
                    strokeThickness: 4
                } ));
            },
            createPlayer: function () {
                self.player = {
                    clickDmg: 1,
                    gold: 0
                };
            },
            createDamage: function () {
                self.dmgTextPool = self.add.group();
                let dmgText;
    
                for(let d=0; d<50; d++){
                    dmgText = self.add.text(0,0,'1', {
                        font: '64px Arial Black',
                        fill: '#fff',
                        strokeThickness: 4
                    });
                    dmgText.exists = false;
                    dmgText.tween = game.add.tween(dmgText)
                        .to({
                            alpha: 0,
                            y: 100,
                            x: self.game.rnd.integerInRange(100, 700)
                        }, 1000, Phaser.Easing.Cubic.Out);
        
                    dmgText.tween.onComplete.add(function (text, tween) {
                        text.kill();
                    });
                    self.dmgTextPool.add(dmgText);
                }
            },
            createGold: function (state) {
                self.coins = self.add.group();
                self.coins.createMultiple(50, 'gold_coin', '', false);
                self.coins.setAll('inputEnabled', true);
                self.coins.setAll('goldValue', 1);
                self.coins.callAll('events.onInputDown.add', 'events.onInputDown', self.onClickCoin, self);
    
                self.playerGoldText = self.add.text(30, 30, 'Money: ' + self.player.gold, {
                    font: '24px Arial Black',
                    fill: '#fff',
                    strokeThickness: 4
                });
            },
            createUpdatePanel: function (state) {
                state.upgradePanel = state.game.add.image(10, 70, state.game.cache.getBitmapData('upgradePanel'));
            }
        }
    }
});

game.state.start('play');